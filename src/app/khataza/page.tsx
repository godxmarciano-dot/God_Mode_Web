"use client"

import Link from 'next/link'

export default function KhatazaTwin() {
  const twin = {
    id: 'khataza_dental',
    type: 'business',
    status: 'genesis',
    identity: {
      name: 'Khataza Dental Practice',
      purpose: 'Provide pain-free dental care to community',
      values: ['patient_comfort', 'professional_excellence', 'accessibility'],
      voice: 'warm, professional, reassuring'
    },
    assets: {
      current_monthly: 300,
      target_monthly: 999,
      services: ['cleaning', 'whitening', 'fillings', 'crowns', 'emergency']
    },
    swarm: [
      { role: 'host', status: 'idle', purpose: 'patient greeting' },
      { role: 'closer', status: 'idle', purpose: 'appointment booking' },
      { role: 'specialist', status: 'idle', purpose: 'clinical reassurance' },
      { role: 'sentinel', status: 'idle', purpose: 'practice monitoring' }
    ],
    blocker: {
      name: 'upgrade_pending',
      current: 'R300/month static website',
      target: 'R999/month Digital Workforce',
      window: '24 hours'
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#00ff88] font-mono text-sm p-4">
      <div className="border-b border-[#00ff88]/30 pb-4 mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">KHATAZA DENTAL</h1>
          <div className="text-[#00ff88]/50 text-xs">TWIN: {twin.id} | STATUS: GENESIS</div>
        </div>
        <Link href="/" className="text-xs border border-[#00ff88]/30 px-3 py-1 hover:bg-[#00ff88]/10">
          ← BACK TO GOD MODE
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="border border-[#00ff88]/30 p-3">
          <div className="text-[#00ff88]/50 text-xs mb-1">CURRENT</div>
          <div className="text-2xl">R{twin.assets.current_monthly}</div>
          <div className="text-xs text-[#00ff88]/50">Static website</div>
        </div>
        <div className="border border-green-500/50 bg-green-900/10 p-3">
          <div className="text-green-400/50 text-xs mb-1">TARGET</div>
          <div className="text-2xl text-green-400">R{twin.assets.target_monthly}</div>
          <div className="text-xs text-green-400/50">Digital Workforce</div>
        </div>
      </div>

      <div className="border border-red-500/50 bg-red-900/10 p-4 mb-4">
        <div className="text-red-400 font-bold text-xs mb-2">CRITICAL BLOCKER</div>
        <div className="text-sm mb-1">{twin.blocker.name.toUpperCase()}</div>
        <div className="text-xs text-[#00ff88]/50 mb-2">{twin.blocker.current} → {twin.blocker.target}</div>
        <div className="text-red-400 text-xs font-bold">WINDOW: {twin.blocker.window}</div>
      </div>

      <div className="border border-[#00ff88]/30 p-3 mb-4">
        <div className="text-[#00ff88]/50 text-xs mb-2">DIGITAL WORKFORCE (4 AGENTS)</div>
        <div className="space-y-2">
          {twin.swarm.map((agent, i) => (
            <div key={i} className="flex justify-between items-center border-b border-[#00ff88]/10 pb-2 last:border-0">
              <div>
                <div className="text-xs font-bold">{agent.role.toUpperCase()}</div>
                <div className="text-[#00ff88]/50 text-xs">{agent.purpose}</div>
              </div>
              <div className="text-[#00ff88]/50 text-xs border border-[#00ff88]/30 px-2 py-1">{agent.status}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-[#00ff88]/30 p-3">
        <div className="text-[#00ff88]/50 text-xs mb-2">SERVICES</div>
        <div className="flex flex-wrap gap-2">
          {twin.assets.services.map(s => (
            <span key={s} className="bg-[#00ff88]/10 px-2 py-1 text-xs">{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}