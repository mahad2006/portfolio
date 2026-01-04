'use client';
import React, { useState, useEffect } from 'react';
import { useSystem } from './SystemProvider';

export const SystemDashboard = () => {
  const { showDashboard, toggleDashboard } = useSystem();
  const [metrics, setMetrics] = useState({
    cpu: 0,
    mem: 0,
    net: 0,
    uptime: '00:00:00'
  });

  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      // Simulate fluctuating metrics
      setMetrics({
        cpu: Math.floor(Math.random() * 15) + 5, // 5-20%
        mem: Math.floor(Math.random() * 10) + 40, // 40-50%
        net: (Math.random() * 2).toFixed(2),
        uptime: formatUptime(Date.now() - startTime)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (ms) => {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`fixed bottom-32 right-6 z-[100] hidden lg:block transition-all duration-700 ease-in-out transform ${showDashboard ? 'translate-x-0 opacity-100' : 'translate-x-[calc(100%+24px)] opacity-50 hover:opacity-100'}`}>
      <div className="relative flex items-center">
        {/* Toggle Handle - Now more professional */}
        <button 
          onClick={toggleDashboard}
          className={`absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-16 bg-[#1a1a1a] border border-white/10 border-r-0 rounded-l-md flex flex-col items-center justify-center hover:bg-[#222] transition-colors group/btn shadow-xl ${!showDashboard ? 'rounded-md border-r' : ''}`}
          aria-label={showDashboard ? "Hide Dashboard" : "Show Dashboard"}
        >
          <div className="flex flex-col gap-1 mb-2">
            <span className="w-1 h-1 rounded-full bg-gray-600 group-hover/btn:bg-[#6DB33F]"></span>
            <span className="w-1 h-1 rounded-full bg-gray-600 group-hover/btn:bg-[#6DB33F]"></span>
            <span className="w-1 h-1 rounded-full bg-gray-600 group-hover/btn:bg-[#6DB33F]"></span>
          </div>
          <span className={`text-[7px] font-bold text-gray-500 group-hover/btn:text-[#6DB33F] transition-transform duration-500 ${showDashboard ? 'rotate-0' : 'rotate-180'}`}>
            {showDashboard ? '▶' : '◀'}
          </span>
        </button>

        <div className="glass-panel p-4 rounded-xl border border-white/10 w-60 font-mono text-[10px] space-y-3 shadow-2xl overflow-hidden group">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <span className="text-[#6DB33F] font-bold tracking-widest uppercase">System Status</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#6DB33F] animate-pulse shadow-[0_0_8px_#6DB33F]"></span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="space-y-1">
              <div className="flex justify-between text-gray-400 uppercase tracking-tighter">
                <span>CPU Load</span>
                <span>{metrics.cpu}%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#6DB33F] transition-all duration-1000 ease-in-out" 
                  style={{ width: `${metrics.cpu * 5}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-gray-400 uppercase tracking-tighter">
                <span>Memory Usage</span>
                <span>{metrics.mem}%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#E76F00] transition-all duration-1000 ease-in-out" 
                  style={{ width: `${metrics.mem}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between text-gray-400 uppercase tracking-tighter border-t border-white/5 pt-2">
              <span>Network</span>
              <span>{metrics.net} Mb/s</span>
            </div>

            <div className="flex justify-between text-gray-400 uppercase tracking-tighter">
              <span>Uptime</span>
              <span className="text-white">{metrics.uptime}</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-scanline pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity"></div>
        </div>
      </div>
    </div>
  );
};
