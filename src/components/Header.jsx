import { useState } from 'react'

export default function Header({ currentTab, setCurrentTab }) {
  const tabs = [
    { key: 'farmer', label: 'Farmer' },
    { key: 'worker', label: 'Worker' },
    { key: 'buyer', label: 'Buyer' },
    { key: 'forecast', label: 'Forecast' },
    { key: 'advisory', label: 'Advisory' },
    { key: 'chat', label: 'Chat' },
  ]

  return (
    <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur border-b border-slate-700/50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-white font-bold tracking-tight text-xl">KrishiSetu</div>
        <nav className="flex gap-2">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setCurrentTab(t.key)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${currentTab === t.key ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-slate-800'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
