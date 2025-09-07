type Media = { publicId:string; type:'image'|'video'; alt:string }
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD || ''
function cldUrl(m:Media, width=600){
  if(!CLOUD_NAME) return ''
  const base = `https://res.cloudinary.com/${CLOUD_NAME}/${m.type}/upload/`
  const transform = m.type==='image' ? `f_auto,q_auto,w_${width}` : `f_auto,q_auto`
  return `${base}${transform}/${m.publicId}`
}
const assets:Media[] = [
  { publicId:'samples/landscapes/nature-mountains', type:'image', alt:'Placeholder' },
  { publicId:'samples/elephants', type:'video', alt:'Clip' },
]
export default function Gallery(){
  return (
    <section className="container" style={{padding:'2rem 0'}}>
      <h2>Gallery</h2>
      <div className="gallery" style={{marginTop:'1rem'}}>
        {assets.map(a => a.type==='image'
          ? <img key={a.publicId} loading="lazy" width={600} height={400} src={cldUrl(a,600)} alt={a.alt}/>
          : <video key={a.publicId} preload="none" controls width={600} height={338}>
              <source src={cldUrl(a)} type="video/mp4" />
            </video>
        )}
      </div>
      <p className="help">Uploads (if enabled) must be ≤ 5 MB for images and ≤ 25 MB for videos. Route any uploads through the backend for signing; no API keys in client.</p>
    </section>
  )
}

