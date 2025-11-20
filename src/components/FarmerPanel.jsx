import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function FarmerPanel() {
  const [user, setUser] = useState(null)
  const [job, setJob] = useState({ task: 'harvesting', workers_needed: 3, wage_offer: 600, crop_type: 'ragi', date_time: '', instructions: '' })
  const [location, setLocation] = useState({ lat: 12.97, lon: 77.59 })
  const [matches, setMatches] = useState([])
  const [phone, setPhone] = useState('9000000001')
  const [name, setName] = useState('Ravi')
  const [password, setPassword] = useState('')

  const login = async () => {
    const res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, role: 'farmer', password, language: 'en', location })})
    const data = await res.json()
    setUser(data.user)
  }

  const createJob = async () => {
    const payload = { ...job, farmer_id: user?.id, location, date_time: job.date_time || new Date().toISOString() }
    const res = await fetch(`${API}/jobs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)})
    const data = await res.json()
    setMatches(data.matches || [])
  }

  const confirm = async (workerIds) => {
    const res = await fetch(`${API}/jobs/confirm`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ job_id: matches[0]?.worker?.job_id || '', worker_ids: workerIds })})
    await res.json()
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="bg-slate-800 text-white px-3 py-2 rounded"/>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" className="bg-slate-800 text-white px-3 py-2 rounded"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="bg-slate-800 text-white px-3 py-2 rounded"/>
        <button onClick={login} className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
      </div>
      {user && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <h3 className="text-white font-semibold">Create Job</h3>
            <div className="grid grid-cols-2 gap-3">
              <select value={job.task} onChange={e=>setJob(j=>({...j, task:e.target.value}))} className="bg-slate-800 text-white px-3 py-2 rounded">
                <option>harvesting</option>
                <option>planting</option>
                <option>sowing</option>
                <option>weeding</option>
                <option>loading</option>
                <option>transport</option>
              </select>
              <input type="number" value={job.workers_needed} onChange={e=>setJob(j=>({...j, workers_needed:+e.target.value}))} placeholder="# Workers" className="bg-slate-800 text-white px-3 py-2 rounded"/>
              <input type="number" value={job.wage_offer} onChange={e=>setJob(j=>({...j, wage_offer:+e.target.value}))} placeholder="Wage Offer" className="bg-slate-800 text-white px-3 py-2 rounded"/>
              <input value={job.crop_type} onChange={e=>setJob(j=>({...j, crop_type:e.target.value}))} placeholder="Crop" className="bg-slate-800 text-white px-3 py-2 rounded"/>
              <input value={job.date_time} onChange={e=>setJob(j=>({...j, date_time:e.target.value}))} placeholder="Date ISO" className="bg-slate-800 text-white px-3 py-2 rounded col-span-2"/>
              <input value={job.instructions} onChange={e=>setJob(j=>({...j, instructions:e.target.value}))} placeholder="Instructions" className="bg-slate-800 text-white px-3 py-2 rounded col-span-2"/>
            </div>
            <button onClick={createJob} className="px-4 py-2 bg-emerald-600 text-white rounded">Create & Match</button>
          </div>
          <div className="space-y-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <h3 className="text-white font-semibold">Matches</h3>
            <div className="space-y-2">
              {matches.map((m,idx)=> (
                <div key={idx} className="p-3 bg-slate-900/60 rounded border border-slate-700/40 text-blue-100">
                  <div className="flex justify-between"><span>{m.worker?.user_id}</span><span>Score: {m.score}</span></div>
                  <div>Distance: {m.distance_km} km</div>
                </div>
              ))}
              {matches.length===0 && <div className="text-blue-300/70">No matches yet.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
