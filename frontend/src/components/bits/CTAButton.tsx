type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary' }
export default function CTAButton({variant='primary', ...p}:Props){ return <button className={`btn ${variant==='secondary'?'secondary':''}`} {...p} /> }

