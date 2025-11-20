import { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

export default function ChatPanel() {
  const [me, setMe] = useState(null)
  const [peer, setPeer] = useState('')
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [name, setName] = useState('UserA')
  const [phone, setPhone] = useState('9000000050')

  const login = async () => {
    const res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, role: 'farmer', language: 'en' })})
    const data = await res.json()
    setMe(data.user)
  }

  const send = async () => {
    if(!me || !peer || !text) return
    await fetch(`${API}/chat/send`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ from_id: me.id, to_id: peer, content: text })})
    setText('')
    load()
  }

  const load = async () => {
    if(!me || !peer) return
    const res = await fetch(`${API}/chat/with?user_id=${me.id}&peer_id=${peer}`)
    const data = await res.json()
    setMessages(data.messages || [])
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" className="bg-slate-800 text-white px-3 py-2 rounded"/>
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Your Phone" className="bg-slate-800 text-white px-3 py-2 rounded"/>
        <button onClick={login} className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
      </div>
      <div className="flex gap-3">
        <input value={peer} onChange={e=>setPeer(e.target.value)} placeholder="Peer User ID" className="bg-slate-800 text-white px-3 py-2 rounded"/>
        <button onClick={load} className="px-4 py-2 bg-slate-700 text-white rounded">Load</button>
      </div>
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 h-64 overflow-y-auto text-blue-100">
        {messages.map((m)=> (
          <div key={m.id} className={`mb-2 ${m.from_id===me?.id?'text-right':''}`}>
            <div className={`inline-block px-3 py-2 rounded ${m.from_id===me?.id?'bg-blue-600 text-white':'bg-slate-900/60'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message" className="bg-slate-800 text-white px-3 py-2 rounded w-full"/>
        <button onClick={send} className="px-4 py-2 bg-emerald-600 text-white rounded">Send</button>
      </div>
    </div>
  )
}
