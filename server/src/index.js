require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const { z } = require('zod')
const { insertRegistration } = require('./db')

const app = express()
const PORT = process.env.PORT || 8787

const allowedOrigins = [process.env.ALLOWED_ORIGIN, 'http://localhost:5173'].filter(Boolean)
app.use(cors({
  origin: (origin, cb) => {
    if(!origin) return cb(null, true)
    const ok = allowedOrigins.some(o => origin.startsWith(o))
    return ok ? cb(null, true) : cb(new Error('Not allowed by CORS'))
  },
  methods: ['GET','POST','OPTIONS'],
  credentials: false
}))
app.use(helmet())
app.use(compression())
app.use(express.json({ limit: '1mb' }))

const limiter = rateLimit({ windowMs: 60_000, max: 30 })
app.use(limiter)

app.get('/healthz', (_,res) => res.json({ ok:true }))

const regSchema = z.object({
  playerName: z.string().min(2).max(120),
  ageOrGrade: z.string().min(1).max(20),
  guardianName: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().regex(/^\+?\d{10,15}$|^(?:\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/),
  emergencyContact: z.string().min(2).max(200),
  waiver: z.literal(true),
  socialMedia: z.string().max(120).optional().or(z.literal('')),
  tiktok: z.string().max(60).regex(/^[\w.@-]*$/).optional().or(z.literal('')),
  instagram: z.string().max(60).regex(/^[\w.@-]*$/).optional().or(z.literal(''))
})

app.post('/api/register', async (req,res) => {
  try{
    const data = regSchema.parse(req.body)
    const id = insertRegistration(data)
    res.status(201).json({ id })
  }catch(err){
    if(err instanceof z.ZodError){
      return res.status(400).json({ error: 'ValidationError', issues: err.issues })
    }
    return res.status(400).json({ error: 'BadRequest' })
  }
})

app.post('/api/newsletter/subscribe', async (req,res) => {
  try{
    const schema = z.object({ email: z.string().email() })
    const { email } = schema.parse(req.body)
    if(!process.env.BUTTONDOWN_API_KEY) return res.status(500).json({ error:'NotConfigured' })

    const resp = await fetch('https://api.buttondown.email/v1/subscribers', {
      method:'POST',
      headers:{
        'Authorization': `Token ${process.env.BUTTONDOWN_API_KEY}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ email })
    })
    if(!resp.ok){
      const txt = await resp.text()
      return res.status(resp.status).json({ error:'UpstreamError', detail: txt })
    }
    res.status(200).json({ ok:true })
  }catch(err){
    if(err instanceof z.ZodError){
      return res.status(400).json({ error: 'ValidationError' })
    }
    res.status(500).json({ error:'ServerError' })
  }
})

app.listen(PORT, () => {
  console.log(`server listening on :${PORT}`)
})

