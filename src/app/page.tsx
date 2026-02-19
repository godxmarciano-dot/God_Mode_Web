"use client"

import Link from 'next/link'
import { useState } from 'react'

export default function GodMode() {
  const [activeTab, setActiveTab] = useState('identity')

  const twin = {
    id: 'architect_godly',
    type: 'career',
    status: 'genesis',
    identity: {
      purpose: 'Build infrastructure of autonomous labor',
      values: ['sovereignty', 'speed', 'family', 'inevitability'],
      voice: 'direct, intense, visionary, occasionally poetic',
      decision_pattern: 'schema_first, sprint_execution, intensity',
      risk_tolerance: 'high'
    },
    trajectory: [
      { horizon: '90_days', target: 'R20K MRR', confidence: 0.7, critical_path: ['khataza_upgrade', 'client_2', 'client_3', 'client_4'] },
      { horizon: '2_years', target: 'Infrastructure ownership', confidence: 0.4, critical_path: ['protocol_live', 'government_pilot', 'team_5'] },
      { horizon: '5_years', target: 'Category dominance', confidence: 0.2, critical_path: ['global_expansion', 'protocol_standard', 'ipo_or_strategic'] }
    ],
    swarm: [
      { role: 'strategist', purpose: 'trajectory_optimization', status: 'active' },
      { role: 'scout', purpose: 'opportunity_detection', status: 'idle' },
      { role: 'pitcher', purpose: 'deal_presentation', status: 'idle' },
      { role: 'advocate', purpose: 'network_maintenance', status: 'idle' }
    ],
    blockers: [
      { name: 'revenue_unlock', status: 'active', recurrence: false },
      { name: 'khataza_upgrade_pending', status: 'active', recurrence: false },
      { name: 'sleep_debt_accumulating', status: 'active', recurrence: false },
      { name: 'expansion_before_proof', status: 'active', recurrence: true }
    ],
    metrics: {
      sprint_elapsed_hours: 2,
      energy_level: 'high',
      focus_quality: 'fragmented_improving',
      commands_executed: 3
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#00ff88] font-mono text-sm p-4">
      {/* Header */}
      <div className="border-b border-[#00ff88]/30 pb-4 mb-4">
        <h1 className="text-xl font-bold">GOD_MODE v0.1.0</h1>
        <div className="text-[#00ff88]/50 text-xs mt-1">
          TWIN: {twin.id} | STATUS: {twin.status.toUpperCase()} | SPRINT: HOUR {twin.metrics.sprint_elapsed_hours}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 mb-4 border-b border-[#00ff88]/30 pb-4">
        {['identity', 'trajectory', 'swarm', 'blockers'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-xs border ${activeTab === tab ? 'bg-[#00ff88]/20 border-[#00ff88]' : 'border-[#00ff88]/30 text-[#00ff88]/50'}`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'identity' && (
          <div className="space-y-3">
            <div className="border border-[#00ff88]/30 p-3">
              <div className="text-[#00ff88]/50 text-xs mb-1">PURPOSE</div>
              <div>{twin.identity.purpose}</div>
            </div>
            <div className="border border-[#00ff88]/30 p-3">
              <div className="text-[#00ff88]/50 text-xs mb-1">VALUES</div>
              <div className="flex flex-wrap gap-2">
                {twin.identity.values.map(v => (
                  <span key={v} className="bg-[#00ff88]/10 px-2 py-1 text-xs">{v}</span>
                ))}
              </div>
            </div>
            <div className="border border-[#00ff88]/30 p-3">
              <div className="text-[#00ff88]/50 text-xs mb-1">VOICE</div>
              <div className="text-xs italic">{twin.identity.voice}</div>
            </div>
            <div className="border border-[#00ff88]/30 p-3">
              <div className="text-[#00ff88]/50 text-xs mb-1">DECISION PATTERN</div>
              <div className="text-xs">{twin.identity.decision_pattern}</div>
            </div>
          </div>
        )}

        {activeTab === 'trajectory' && (
          <div className="space-y-3">
            {twin.trajectory.map((t, i) => (
              <div key={i} className="border border-[#00ff88]/30 p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#00ff88]/50 text-xs">{t.horizon}</span>
                  <span className="text-xs bg-[#00ff88]/10 px-2 py-1">{Math.round(t.confidence * 100)}% CONFIDENCE</span>
                </div>
                <div className="mb-2">{t.target}</div>
                <div className="text-[#00ff88]/50 text-xs">
                  CRITICAL: {t.critical_path[0]}
                </div>
                <div className="w-full bg-[#00ff88]/10 h-1 mt-2">
                  <div className="bg-[#00ff88] h-1" style={{ width: `${t.confidence * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'swarm' && (
          <div className="space-y-2">
            {twin.swarm.map((agent, i) => (
              <div key={i} className="border border-[#00ff88]/30 p-3 flex justify-between items-center">
                <div>
                  <div className="font-bold text-xs">{agent.role.toUpperCase()}</div>
                  <div className="text-[#00ff88]/50 text-xs">{agent.purpose}</div>
                </div>
                <div className={`text-xs px-2 py-1 border ${
                  agent.status === 'active' ? 'bg-green-900/30 border-green-500/30 text-green-400' : 'border-[#00ff88]/30 text-[#00ff88]/50'
                }`}>
                  {agent.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'blockers' && (
          <div className="space-y-2">
            {twin.blockers.map((b, i) => (
              <div key={i} className={`border p-3 ${
                b.name === 'khataza_upgrade_pending' ? 'border-red-500/50 bg-red-900/10' : 'border-[#00ff88]/30'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">{b.name.toUpperCase()}</span>
                  <span className="text-[#00ff88]/50 text-xs">{b.status}</span>
                </div>
                {b.recurrence && <div className="text-[#00ff88]/50 text-xs mt-1">RECURRING PATTERN</div>}
                {b.name === 'khataza_upgrade_pending' && (
                  <div className="text-red-400 text-xs mt-2">CRITICAL: 24H WINDOW</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#00ff88]/30 mt-4 pt-4 text-[#00ff88]/50 text-xs">
        COMMANDS: {twin.metrics.commands_executed} | ENERGY: {twin.metrics.energy_level.toUpperCase()} | FOCUS: {twin.metrics.focus_quality.toUpperCase().replace('_', ' ')}
      </div>
      <div className="mt-4">
  <Link href="/khataza" className="text-xs border border-red-500/50 text-red-400 px-3 py-2 hover:bg-red-900/20">
    VIEW CLIENT: KHATAZA DENTAL →
  </Link>
</div>
    </div>
  )
}