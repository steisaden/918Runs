import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../api/client'
import Spinner from './Spinner'

const schema = z.object({
  playerName: z.string().min(2),
  ageOrGrade: z.string().min(1).refine(v => /^[\w\s-]{1,20}$/.test(v), 'Invalid age/grade'),
  guardianName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().refine(v => /^\+?\d{10,15}$|^(?:\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/.test(v), 'Invalid phone'),
  emergencyContact: z.string().min(2),
  waiver: z.literal(true, { errorMap: () => ({ message: 'Required' }) }),
  socialMedia: z.string().max(120).optional(),
  tiktok: z.string().max(60).regex(/^[\w.@-]*$/,{message:'Invalid handle'}).optional(),
  instagram: z.string().max(60).regex(/^[\w.@-]*$/,{message:'Invalid handle'}).optional(),
})

type FormData = z.infer<typeof schema>

export default function RegisterForm(){
  const { register, handleSubmit, setError, formState:{ errors, isSubmitting }, reset } = useForm<FormData>()
  const onSubmit = async (values:FormData) => {
    const parsed = schema.safeParse(values)
    if(!parsed.success){
      parsed.error.issues.forEach(i => setError(i.path[0] as any, { message:i.message }))
      return
    }
    try{
      await api.register(parsed.data)
      reset()
      alert('Registration submitted!')
    }catch(e:any){
      alert('Error: '+ (e?.message || 'submit failed'))
    }
  }

  return (
    <form id="register" className="container form" onSubmit={handleSubmit(onSubmit)} style={{padding:'2rem 0'}}>
      <h2>Register</h2>
      <input placeholder="Player name" {...register('playerName')} aria-invalid={!!errors.playerName} />
      {errors.playerName && <div className="error">{errors.playerName.message}</div>}
      <input placeholder="Age or Grade" {...register('ageOrGrade')} aria-invalid={!!errors.ageOrGrade}/>
      {errors.ageOrGrade && <div className="error">{errors.ageOrGrade.message}</div>}
      <input placeholder="Guardian name" {...register('guardianName')} aria-invalid={!!errors.guardianName}/>
      {errors.guardianName && <div className="error">{errors.guardianName.message}</div>}
      <input type="email" placeholder="Email" {...register('email')} aria-invalid={!!errors.email}/>
      {errors.email && <div className="error">{errors.email.message}</div>}
      <input placeholder="Phone" {...register('phone')} aria-invalid={!!errors.phone}/>
      {errors.phone && <div className="error">{errors.phone.message}</div>}
      <input placeholder="Emergency contact" {...register('emergencyContact')} aria-invalid={!!errors.emergencyContact}/>
      {errors.emergencyContact && <div className="error">{errors.emergencyContact.message}</div>}

      <input placeholder="Social media (optional)" {...register('socialMedia')} />
      <input placeholder="TikTok (optional)" {...register('tiktok')} />
      <input placeholder="Instagram (optional)" {...register('instagram')} />

      <label className="checkbox">
        <input type="checkbox" {...register('waiver')} />
        <span>
          I am the participant or their legal guardian. I grant 918 Runs permission to capture and use photographs and video recordings of the participant in promotional materials (website, social media, print) without compensation. I may withdraw consent at any time by contacting the program; future use will cease, though existing published materials may remain.
        </span>
      </label>
      {errors.waiver && <div className="error">{errors.waiver.message}</div>}

      <button className="btn" disabled={isSubmitting}>{isSubmitting? <Spinner/> : 'Submit'}</button>
    </form>
  )
}

