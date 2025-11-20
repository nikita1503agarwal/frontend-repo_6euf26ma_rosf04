import { useState } from 'react'
import Header from './components/Header'
import FarmerPanel from './components/FarmerPanel'
import WorkerPanel from './components/WorkerPanel'
import BuyerPanel from './components/BuyerPanel'
import ForecastPanel from './components/ForecastPanel'
import AdvisoryPanel from './components/AdvisoryPanel'
import ChatPanel from './components/ChatPanel'

function App() {
  const [currentTab, setCurrentTab] = useState('farmer')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentTab === 'farmer' && <FarmerPanel />}
        {currentTab === 'worker' && <WorkerPanel />}
        {currentTab === 'buyer' && <BuyerPanel />}
        {currentTab === 'forecast' && <ForecastPanel />}
        {currentTab === 'advisory' && <AdvisoryPanel />}
        {currentTab === 'chat' && <ChatPanel />}
      </main>
    </div>
  )
}

export default App
