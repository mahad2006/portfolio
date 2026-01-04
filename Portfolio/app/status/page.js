'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SystemStatus() {
  const [uptime, setUptime] = useState('00:00:00');
  const [metrics, setMetrics] = useState({
    database: { status: 'Connected', latency: '12ms', color: 'text-[#6DB33F]' },
    redis: { status: 'Online', latency: '2ms', color: 'text-[#6DB33F]' },
    api: { status: 'Operational', latency: '45ms', color: 'text-[#6DB33F]' },
    cdn: { status: 'Active', latency: '8ms', color: 'text-[#6DB33F]' }
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
    <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#6DB33F] selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="group text-xs font-mono text-gray-400 hover:text-[#6DB33F] transition-colors flex items-center gap-2 tracking-widest uppercase">
          <span className="text-green-400">root@mahad:~/status</span>
          <span className="text-gray-500">$</span>
          <span className="group-hover:text-orange-400 transition-colors">cd ..</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#6DB33F] animate-pulse"></div>
          <span className="font-mono text-[9px] text-[#6DB33F] tracking-wider uppercase">All Systems Operational</span>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-none font-mono tracking-tighter uppercase">
            System Status
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl border-l-2 border-[#6DB33F] pl-8 font-light leading-relaxed">
            Real-time monitoring of all portfolio infrastructure components
          </p>
        </div>

        {/* Uptime Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 text-center hover:border-[#6DB33F]/20 transition-all">
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3">System Uptime</div>
            <div className="text-3xl font-bold text-white font-mono">{uptime}</div>
          </div>
          <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 text-center hover:border-[#6DB33F]/20 transition-all">
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3">Response Time</div>
            <div className="text-3xl font-bold text-[#6DB33F] font-mono">45ms</div>
          </div>
          <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 text-center hover:border-[#6DB33F]/20 transition-all">
            <div className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-3">Success Rate</div>
            <div className="text-3xl font-bold text-[#6DB33F] font-mono">99.9%</div>
          </div>
        </div>

        {/* Services Status */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white mb-6 flex items-center gap-4 font-mono tracking-[0.4em] uppercase">
            <span className="w-8 h-px bg-[#6DB33F]"></span>
            Infrastructure Components
          </h2>

          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#6DB33F]/20 transition-all group">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${value.color.replace('text-', 'bg-')} shadow-[0_0_10px_currentColor]`}></div>
                  <div>
                    <h3 className="text-lg font-bold text-white capitalize font-mono">{key}</h3>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">{value.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-sm">
                    <span className="text-gray-500 font-mono text-xs uppercase tracking-wider">Latency: </span>
                    <span className="text-white font-mono font-bold">{value.latency}</span>
                  </div>
                  <div className="w-16 h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#6DB33F] w-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Incident History */}
        <div className="mt-16 p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
          <h2 className="text-sm font-bold text-white mb-6 flex items-center gap-4 font-mono tracking-[0.4em] uppercase">
            <span className="w-8 h-px bg-[#6DB33F]"></span>
            Recent Incidents
          </h2>
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="w-16 h-16 text-[#6DB33F] mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 font-mono text-sm">No incidents reported in the last 30 days</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 rounded-xl bg-[#6DB33F]/10 border border-[#6DB33F]/30">
          <p className="text-xs text-gray-400 font-mono">
            <span className="text-[#6DB33F] font-bold">NOTE:</span> This is a simulated status page for demonstration purposes.
            In production, this would connect to real monitoring APIs (e.g., Datadog, New Relic, or custom health check endpoints).
          </p>
        </div>
      </main>
    </div>
  );
}
