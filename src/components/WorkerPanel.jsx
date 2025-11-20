import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function WorkerPanel() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({ skills: ['harvesting'], wage_expectation: 600, availability_dates: [], max_distance_km: 25, home_location: { lat:12.98, lon:77.6 } })
  const [phone, setPhone] = useState('9000000020')
  const [name, setName] = useState('Suma')
  const [password, setPassword] = useState('')

  const login = async () => {
    const res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, role: 'worker', password, language: 'en', location: profile.home_location })})
    const data = await res.json()
    setUser(data.user)
  }

  const saveProfile = async () => {
    const payload = { ...profile, user_id: user?.id }
    const res = await fetch(`${API}/workers`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)})
    const data = await res.json()
    setProfile(prev => ({...prev, ...data.worker}))
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
        <div className="space-y-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <h3 className="text-white font-semibold">Worker Profile</h3>
          <div className="grid grid-cols-2 gap-3">
            <input value={profile.skills.join(',')} onChange={e=>setProfile(p=>({...p, skills:e.target.value.split(',').map(s=>s.trim())}))} placeholder="skills" className="bg-slate-800 text-white px-3 py-2 rounded col-span-2"/>
            <input type="number" value={profile.wage_expectation} onChange={e=>setProfile(p=>({...p, wage_expectation:+e.target.value}))} placeholder="Wage Expectation" className="bg-slate-800 text-white px-3 py-2 rounded"/>
            <input value={(profile.availability_dates||[]).join(',')} onChange={e=>setProfile(p=>({...p, availability_dates:e.target.value.split(',').map(x=>x.trim())}))} placeholder="Availability dates (YYYY-MM-DD, comma)" className="bg-slate-800 text-white px-3 py-2 rounded col-span-2"/>
            <input type="number" value={profile.max_distance_km} onChange={e=>setProfile(p=>({...p, max_distance_km:+e.target.value}))} placeholder="Max Distance (km)" className="bg-slate-800 text-white px-3 py-2 rounded"/>
          </div>
          <button onClick={saveProfile} className="px-4 py-2 bg-emerald-600 text-white rounded">Save Profile</button>
        </div>
      )}
    </div>
  )
}
