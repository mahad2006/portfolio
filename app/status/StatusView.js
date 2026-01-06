'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';

export default function SystemStatus() {
  const [uptime, setUptime] = useState('00:00:00');
  const [metrics, setMetrics] = useState({
    database: { status: 'Connected', latency: '12ms', color: 'text-primary' },
    redis: { status: 'Online', latency: '2ms', color: 'text-primary' },
    api: { status: 'Operational', latency: '45ms', color: 'text-primary' },
    cdn: { status: 'Active', latency: '8ms', color: 'text-primary' }
  });

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const s = Math.floor(elapsed / 1000);
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = s % 60;
      setUptime(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageShell
      title={<>System<span className="text-primary">_</span>Status</>}
      description="Real-time telemetry and monitoring of portfolio infrastructure."
      headerTag="SYSTEMS_NORMAL"
    >
      {/* Premium Background Grid & Lighting Effects */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-10 blur-[100px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-transparent to-transparent"></div>
      </div>

        {/* Uptime Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-white/5 hover:border-primary/30 transition-all duration-300 group">
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3 group-hover:text-primary transition-colors">Current Uptime</div>
            <div className="text-3xl font-bold text-white font-mono tracking-tight">{uptime}</div>
          </div>
          <div className="p-8 rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-white/5 hover:border-primary/30 transition-all duration-300 group">
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3 group-hover:text-primary transition-colors">Global Latency</div>
            <div className="text-3xl font-bold text-primary font-mono tracking-tight drop-shadow-[0_0_10px_rgba(109,179,63,0.3)]">45ms</div>
          </div>
          <div className="p-8 rounded-2xl bg-neutral-900/50 backdrop-blur-sm border border-white/5 hover:border-primary/30 transition-all duration-300 group">
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3 group-hover:text-primary transition-colors">Availability</div>
            <div className="text-3xl font-bold text-primary font-mono tracking-tight drop-shadow-[0_0_10px_rgba(109,179,63,0.3)]">99.99%</div>
          </div>
        </div>

        {/* Services Status */}
        <div className="space-y-6">
          <h2 className="text-sm font-bold text-white mb-6 flex items-center gap-4 font-mono tracking-[0.4em] uppercase opacity-80">
            <span className="w-8 h-px bg-primary"></span>
            Active Components
          </h2>

          <div className="grid gap-4">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="p-5 rounded-xl bg-neutral-900/40 backdrop-blur-sm border border-white/5 hover:border-primary/40 hover:bg-neutral-900/60 transition-all duration-300 group">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`relative w-2.5 h-2.5 rounded-full ${value.color.replace('text-', 'bg-')} shadow-[0_0_12px_currentColor]`}></div>
                  <div>
                    <h3 className="text-lg font-bold text-white capitalize font-mono tracking-tight group-hover:text-primary transition-colors">{key}</h3>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{value.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">Latency</div>
                    <div className="text-white font-mono font-bold text-sm">{value.latency}</div>
                  </div>
                  <div className="w-24 h-1 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full animate-[pulse_2s_ease-in-out_infinite]"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Community / Incident Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Incident History */}
          <div className="p-8 rounded-2xl bg-neutral-900/30 border border-white/5 flex flex-col items-center justify-center min-h-[200px]">
             <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
             </div>
             <h3 className="text-white font-mono font-bold mb-1">All Systems Operational</h3>
             <p className="text-gray-500 font-mono text-xs">No incidents in past 30 days</p>
          </div>

          {/* Discord CTA - FIXED with WA-ICON */}
          <div className="p-8 rounded-2xl bg-neutral-900/30 border border-white/5 flex flex-col items-center justify-center text-center">
             <h3 className="text-white font-mono font-bold mb-4 uppercase tracking-widest text-sm">Community Status</h3>

             <a
               href="https://discord.com/"
               target="_blank"
               rel="noopener noreferrer"
               className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] rounded-xl transition-all duration-300 w-full sm:w-auto shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)]"
             >
               {/* Wrapped in span to control size/alignment */}
               <span className="text-2xl text-white flex items-center justify-center">
                  <wa-icon name="discord" family="brands"></wa-icon>
               </span>
               <span className="text-white font-bold tracking-wide">
                 Join Discord
               </span>
             </a>
             <p className="mt-4 text-[10px] text-gray-500 font-mono">
               Get real-time updates and community support
             </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-4 rounded-lg bg-primary/5 border border-primary/10 text-center">
          <p className="text-[10px] text-gray-500 font-mono">
            <span className="text-primary">sys_admin@mahad:~$</span> echo "Simulated status environment. Production data requires API keys."
          </p>
        </div>
      </PageShell>
  );
}
