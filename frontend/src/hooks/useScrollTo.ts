export function useScrollTo(){
  return (selector:string)=>{
    document.querySelector(selector)?.scrollIntoView({behavior:'smooth', block:'start'})
  }
}

