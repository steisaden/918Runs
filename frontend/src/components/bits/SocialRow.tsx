export default function SocialRow(){
  const links = [
    { href:'#', label:'Instagram', icon:'📸' },
    { href:'#', label:'TikTok', icon:'🎵' },
    { href:'#', label:'YouTube', icon:'▶️' },
  ]
  return (
    <nav aria-label="Social" style={{display:'flex', gap:12}}>
      {links.map(l => <a key={l.label} href={l.href} rel="noopener noreferrer" target="_blank" style={{color:'var(--navy)'}}>{l.icon}<span className="sr-only">{l.label}</span></a>)}
    </nav>
  )
}

