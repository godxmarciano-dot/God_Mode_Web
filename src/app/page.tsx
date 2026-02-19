'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function GodMode() {
  const [activeTab, setActiveTab] = useState('identity');
  const [twin, setTwin] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/sync')
      .then((res) => res.json())
      .then((data) => {
        setTwin(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-[#00ff88] font-mono flex items-center justify-center">
        <div className="animate-pulse">INITIALIZING GOD MODE...</div>
      </div>
    );
  }

  if (!twin) return <div className="text-red-500 p-10">SYSTEM FAILURE: CONNECTION LOST</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#00ff88] font-mono text-sm p-4">
      {/* Header */}
      <div className="border-b border-[#00ff88]/30 pb-4 mb-4">
        <h1 className="text-xl font-bold">GOD_MODE v0.1.0</h1>
        <div className="text-[#00ff88]/50 text-xs mt-1">
          TWIN: {twin.id} | STATUS: {twin.status.toUpperCase()} | SPRINT: HOUR {twin.metrics.sprint_elapsed_hours?.value || 0}
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
        {activeTab === 'identity' && twin.identity && (
          <div className="space-y-3">
            <div className="border border-[#00ff88]/30 p-3">
              <div className="text-[#00ff88]/50 text-xs mb-1">PURPOSE</div>
              <div>{twin.identity.purpose}</div>
            </div>
            <div className="border border-[#00ff88]/30 p-3">
              <div className="text-[#00ff88]/50 text-xs mb-1">VALUES</div>
              <div className="flex flex-wrap gap-2">
                {twin.identity.values.map((v: string) => (
                  <span key={v} className="bg-[#00ff88]/10 px-2 py-1 text-xs">{v}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trajectory' && (
          <div className="space-y-3">
            {twin.trajectory.map((t: any, i: number) => (
              <div key={i} className="border border-[#00ff88]/30 p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#00ff88]/50 text-xs">{t.horizon}</span>
                  <span className="text-xs bg-[#00ff88]/10 px-2 py-1">{Math.round(t.confidence * 100)}% CONFIDENCE</span>
                </div>
                <div className="mb-2">{t.target}</div>
                <div className="text-[#00ff88]/50 text-xs">CRITICAL: {t.critical_path[0]}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'swarm' && (
          <div className="space-y-2">
            {twin.swarm.map((agent: any, i: number) => (
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
            {twin.blockers.map((b: any, i: number) => (
              <div key={i} className={`border p-3 ${
                b.name === 'khataza_upgrade_pending' ? 'border-red-500/50 bg-red-900/10' : 'border-[#00ff88]/30'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">{b.name.toUpperCase()}</span>
                  <span className="text-[#00ff88]/50 text-xs">{b.status}</span>
                </div>
                {b.recurrence && <div className="text-[#00ff88]/50 text-xs mt-1">RECURRING PATTERN</div>}
                {b.name === 'khataza_upgrade_pending' && <div className="text-red-400 text-xs mt-2">CRITICAL: 24H WINDOW</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#00ff88]/30 mt-4 pt-4 text-[#00ff88]/50 text-xs">
        COMMANDS: {twin.metrics.commands_executed?.value || 0} | ENERGY: {twin.metrics.energy_level?.value?.toUpperCase()} | FOCUS: {twin.metrics.focus_quality?.value?.toUpperCase().replace('_', ' ')}
      </div>
      <div className="mt-4">
        <Link href="/khataza" className="text-xs border border-red-500/50 text-red-400 px-3 py-2 hover:bg-red-900/20">
          VIEW CLIENT: KHATAZA DENTAL →
        </Link>
      </div>
    </div>
  );
}