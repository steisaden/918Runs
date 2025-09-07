export function useSundaysOfSeptember(year = new Date().getFullYear()){
  const dates: Date[] = []
  const start = new Date(year, 8, 1) // Sept
  const end = new Date(year, 9, 0)   // last day Sept
  for(let d=new Date(start); d<=end; d.setDate(d.getDate()+1)){
    if(d.getDay()===0) dates.push(new Date(d))
  }
  return dates
}

