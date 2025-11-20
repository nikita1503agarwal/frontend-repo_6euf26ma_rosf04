import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function BuyerPanel() {
  const [user, setUser] = useState(null)
  const [phone, setPhone] = useState('9000000030')
  const [name, setName] = useState('Buyer')
  const [password, setPassword] = useState('')
  const [request, setRequest] = useState({ crops: ['tomato'], quantity_kg: 500, preference: 'pickup' })

  const login = async () => {
    const res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, role: 'buyer', password, language: 'en' })})
    const data = await res.json()
    setUser(data.user)
  }

  const sendRequest = async () => {
    const payload = { ...request, buyer_id: user?.id }
    const res = await fetch(`${API}/buyers/request`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)})
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
        <div className="space-y-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <h3 className="text-white font-semibold">Buyer Request</h3>
          <div className="grid grid-cols-2 gap-3">
            <input value={(request.crops||[]).join(',')} onChange={e=>setRequest(r=>({...r, crops:e.target.value.split(',').map(s=>s.trim())}))} placeholder="Crops" className="bg-slate-800 text-white px-3 py-2 rounded col-span-2"/>
            <input type="number" value={request.quantity_kg} onChange={e=>setRequest(r=>({...r, quantity_kg:+e.target.value}))} placeholder="Quantity (kg)" className="bg-slate-800 text-white px-3 py-2 rounded"/>
            <select value={request.preference} onChange={e=>setRequest(r=>({...r, preference:e.target.value}))} className="bg-slate-800 text-white px-3 py-2 rounded">
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery</option>
            </select>
          </div>
          <button onClick={sendRequest} className="px-4 py-2 bg-emerald-600 text-white rounded">Create Request</button>
        </div>
      )}
    </div>
  )
}
