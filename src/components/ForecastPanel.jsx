import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function ForecastPanel() {
  const [commodity, setCommodity] = useState('ragi')
  const [region, setRegion] = useState('KA')
  const [curve, setCurve] = useState([])
  const [trend, setTrend] = useState('')
  const [alerts, setAlerts] = useState([])

  const load = async () => {
    const res = await fetch(`${API}/market/forecast?commodity=${commodity}&region=${region}&horizon_days=15`)
    const data = await res.json()
    setCurve(data.forecast_curve || [])
    setTrend(data.trend)
    setAlerts(data.risk_alerts || [])
  }

  useEffect(()=>{ load() }, [])

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input value={commodity} onChange={e=>setCommodity(e.target.value)} className="bg-slate-800 text-white px-3 py-2 rounded"/>
        <input value={region} onChange={e=>setRegion(e.target.value)} className="bg-slate-800 text-white px-3 py-2 rounded"/>
        <button onClick={load} className="px-4 py-2 bg-blue-600 text-white rounded">Load Forecast</button>
      </div>
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 text-blue-100">
        <div className="mb-2">Trend: <span className="font-semibold">{trend}</span></div>
        {alerts.map((a,i)=>(<div key={i} className="text-amber-300">• {a}</div>))}
        <div className="mt-4 grid grid-cols-3 md:grid-cols-5 gap-2 text-xs">
          {curve.map((p,i)=> (
            <div key={i} className="bg-slate-900/60 rounded p-2">
              <div className="text-blue-200/70">{p.date}</div>
              <div className="text-white font-semibold">₹ {p.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
