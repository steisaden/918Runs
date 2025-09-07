import { Suspense, lazy, useMemo } from 'react'
import Sessions from './components/bits/Sessions'
import RegisterForm from './components/bits/RegisterForm'
import Gallery from './components/bits/Gallery'
import Newsletter from './components/bits/Newsletter'
import Spinner from './components/bits/Spinner'
import CTAButton from './components/bits/CTAButton'
import SocialRow from './components/bits/SocialRow'
import logoUrl from './assets/logo.svg'
import './components/uiverse/register.css'
import './components/uiverse/cards.css'
import './components/uiverse/gallery.css'

const Metaballs = lazy(() => import('@paper-design/shaders-react').then(m => ({ default: (m as any).Metaballs })))

function Hero(){
  const shaderProps = useMemo(() => ({
    colorBack: getComputedStyle(document.documentElement).getPropertyValue('--cream').trim(),
    colors: [
      getComputedStyle(document.documentElement).getPropertyValue('--red').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--navy').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--red').trim(),
      getComputedStyle(document.documentElement).getPropertyValue('--navy').trim(),
    ],
    colorCount: 4,
    count: 20, size: 0.01, speed: 0.68, scale: 4,
    offsetX: 0.52, offsetY: -0.28, rotation: 28
  }),[])

  return (
    <section style={{position:'relative', height:'60vh', overflow:'hidden'}}>
      <div aria-hidden="true" style={{position:'absolute', inset:0}}>
        <Suspense fallback={<div className="spinner" style={{position:'absolute', top:'1rem', right:'1rem'}}/>}>
          <Metaballs {...shaderProps} />
        </Suspense>
      </div>
      <div className="container" style={{position:'relative', zIndex:1, paddingTop:'10vh'}}>
        <img src={logoUrl} alt="918 Runs" width={80} height={80} />
        <h1 style={{fontSize:'clamp(2rem, 4vw, 3.5rem)'}}>Pick-Up. Level Up.</h1>
        <p style={{maxWidth:620, color:'var(--muted)'}}>Elite runs for middle and high school athletes. Every Sunday in September.</p>
        <div style={{display:'flex', gap:12, marginTop:16}}>
          <a href="#register"><CTAButton>Register Now</CTAButton></a>
          <a href="#sessions"><CTAButton variant="secondary">See Sessions</CTAButton></a>
        </div>
        <div style={{marginTop:24}}><SocialRow/></div>
      </div>
    </section>
  )
}

export default function App(){
  return (
    <>
      <Hero />
      <Sessions onRegister={() => document.querySelector('#register')?.scrollIntoView({behavior:'smooth'})} />
      <RegisterForm />
      <Gallery />
      <Newsletter />
    </>
  )
}
