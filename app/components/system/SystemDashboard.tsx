'use client';
import React, { useState, useEffect } from 'react';
import { useSystem } from '@/hooks/useSystem';

interface Metrics {
  cpu: number;
  mem: number;
  net: string;
  uptime: string;
}

export const SystemDashboard: React.FC = () => {
  const { showDashboard, toggleDashboard } = useSystem();
  const [metrics, setMetrics] = useState<Metrics>({
    cpu: 0,
    mem: 0,
    net: '0',
    uptime: '00:00:00'
  });

  const formatUptime = (ms: number): string => {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 15) + 5,
        mem: Math.floor(Math.random() * 10) + 40,
        net: (Math.random() * 2).toFixed(2),
        uptime: formatUptime(Date.now() - startTime)
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed bottom-32 right-6 z-100 hidden lg:block transition-all duration-700 ease-in-out transform ${showDashboard ? 'translate-x-0 opacity-100' : 'translate-x-[calc(100%+24px)] opacity-50 hover:opacity-100'}`}>
      <div className="relative flex items-center">
        {/* Toggle Handle - Now more professional */}
        <button 
          onClick={toggleDashboard}
          className={`absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-16 border border-(--border-subtle) border-r-0 rounded-l-md flex flex-col items-center justify-center transition-colors group/btn shadow-xl bg-surface-hover ${!showDashboard ? 'rounded-md border-r' : ''}`}
          aria-label={showDashboard ? "Hide Dashboard" : "Show Dashboard"}
        >
          <div className="flex flex-col gap-1 mb-2">
            <span className="w-1 h-1 rounded-full bg-gray-600 group-hover/btn:bg-primary"></span>
            <span className="w-1 h-1 rounded-full bg-gray-600 group-hover/btn:bg-primary"></span>
            <span className="w-1 h-1 rounded-full bg-gray-600 group-hover/btn:bg-primary"></span>
          </div>
          <span className={`text-[7px] font-bold text-gray-500 group-hover/btn:text-primary transition-transform duration-500 ${showDashboard ? 'rotate-0' : 'rotate-180'}`}>
            {showDashboard ? '▶' : '◀'}
          </span>
        </button>

        <div className="card-base p-4 rounded-xl w-60 font-mono text-[10px] space-y-3 overflow-hidden group">
          <div className="flex justify-between items-center border-b border-(--border-subtle) pb-2">
            <span className="text-primary font-bold tracking-widest uppercase">System Status</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
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
                  className="h-full bg-primary transition-all duration-1000 ease-in-out" 
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
                  className="h-full transition-all duration-1000 ease-in-out bg-secondary"
                  style={{ width: `${metrics.mem}%` }}
                ></div>
              </div>
            </div>

            <div className="flex justify-between text-gray-400 uppercase tracking-tighter border-t border-(--border-subtle) pt-2">
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

