import { useState } from 'react'
import { api } from '../../api/client'
import Spinner from './Spinner'

export default function Newsletter(){
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e:React.FormEvent) => {
    e.preventDefault()
    if(!consent){ alert('Consent required'); return }
    setLoading(true)
    try{
      await api.subscribe(email)
      setEmail('')
      setConsent(false)
      alert('Subscribed!')
    }catch(e:any){
      alert('Error: '+(e?.message || 'subscribe failed'))
    }finally{ setLoading(false) }
  }

  return (
    <section className="container" style={{padding:'2rem 0'}}>
      <h2>Newsletter</h2>
      <form onSubmit={submit} className="form" aria-label="Subscribe to newsletter">
        <input type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label className="checkbox">
          <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} required />
          <span>I agree to receive email updates from 918 Runs about sessions, highlights, and programs. I understand I can unsubscribe at any time via the link in our emails. We will process your data in accordance with our <a href="/918Runs/privacy">Privacy Policy</a>.</span>
        </label>
        <button className="btn" disabled={loading}>{loading? <Spinner/> : 'Subscribe'}</button>
      </form>
    </section>
  )
}

