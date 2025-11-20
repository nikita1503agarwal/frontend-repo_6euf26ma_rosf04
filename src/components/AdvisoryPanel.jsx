import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function AdvisoryPanel() {
  const [region, setRegion] = useState('KA')
  const [season, setSeason] = useState('Kharif')
  const [soil, setSoil] = useState('red')
  const [rain, setRain] = useState(120)
  const [recs, setRecs] = useState([])

  const getRecs = async () => {
    const res = await fetch(`${API}/advisory/recommend`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ region, season, soil_type: soil, expected_rainfall_mm: rain })})
    const data = await res.json()
    setRecs(data.recommended || [])
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input value={region} onChange={e=>setRegion(e.target.value)} className="bg-slate-800 text-white px-3 py-2 rounded"/>
        <input value={season} onChange={e=>setSeason(e.target.value)} className="bg-slate-800 text-white px-3 py-2 rounded"/>
        <input value={soil} onChange={e=>setSoil(e.target.value)} className="bg-slate-800 text-white px-3 py-2 rounded"/>
        <input type="number" value={rain} onChange={e=>setRain(+e.target.value)} className="bg-slate-800 text-white px-3 py-2 rounded w-32"/>
        <button onClick={getRecs} className="px-4 py-2 bg-blue-600 text-white rounded">Get Advice</button>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {recs.map((r,i)=> (
          <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-blue-100">
            <div className="text-white font-semibold text-lg">{r.crop}</div>
            <div className="text-blue-300/80">Score: {r.score}</div>
            <div className="mt-2">Expected Price: ₹ {r.expected_price}</div>
            <div>Workers Needed: {r.workers_needed}</div>
            <ul className="mt-2 text-blue-200/80 text-sm list-disc pl-5">
              {r.rationale?.map((x,idx)=> (<li key={idx}>{x}</li>))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
