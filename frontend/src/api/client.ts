const API_BASE = import.meta.env.VITE_API_BASE?.replace(/\/+$/,'') || ''
async function apiFetch(path:string, init?:RequestInit){
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {'Content-Type':'application/json', ...(init?.headers || {})},
    ...init
  })
  if(!res.ok){ throw new Error(await res.text()) }
  return res.json().catch(()=> ({}))
}
export const api = {
  register: (data:any)=> apiFetch('/api/register', { method:'POST', body: JSON.stringify(data)}),
  subscribe: (email:string)=> apiFetch('/api/newsletter/subscribe', { method:'POST', body: JSON.stringify({email}) }),
}

