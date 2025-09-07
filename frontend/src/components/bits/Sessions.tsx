import { useSundaysOfSeptember } from '../../hooks/useSundaysOfSeptember'
import CTAButton from './CTAButton'

export default function Sessions({onRegister}:{onRegister:()=>void}){
  const sundays = useSundaysOfSeptember()
  return (
    <section id="sessions" className="container" style={{padding:'3rem 0'}}>
      <h2>Every Sunday in September</h2>
      <div className="cards" style={{marginTop:'1rem'}}>
        {sundays.map(d => (
          <article key={d.toISOString()} className="card">
            <div className="badge">{d.toLocaleDateString(undefined,{month:'short', day:'numeric'})}</div>
            <h3>6–7p (Middle School)</h3>
            <p className="help">Skill reps, small-sided games, and conditioning.</p>
            <h3 style={{marginTop:8}}>7–8:30p (High School)</h3>
            <p className="help">Varsity pace runs with coaches on site.</p>
            <div style={{marginTop:12}}><CTAButton onClick={onRegister}>Register</CTAButton></div>
          </article>
        ))}
      </div>
    </section>
  )
}

