'use client';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const RequestLogger = () => {
  const pathname = usePathname();
  const [logs, setLogs] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has dismissed it before
    const dismissed = localStorage.getItem('requestLoggerDismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    if (isDismissed) return;

    const method = 'GET';
    const status = '200 OK';
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });

    const newLog = {
      id: Date.now(),
      timestamp,
      method,
      path: pathname,
      status
    };

    setLogs(prev => [...prev.slice(-4), newLog]);
  }, [pathname, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('requestLoggerDismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <div className={`fixed bottom-6 left-6 z-[100] hidden lg:block transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <div className="glass-panel p-3 rounded-lg border border-white/10 w-72 font-mono text-[9px] shadow-2xl pointer-events-auto">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6DB33F] animate-pulse"></div>
            <span className="text-[#6DB33F] font-bold tracking-wider uppercase">Request Log</span>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Dismiss request logger"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-1">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-2 text-gray-400 animate-fade-up">
              <span className="text-gray-600">[{log.timestamp}]</span>
              <span className="text-[#6DB33F]">{log.method}</span>
              <span className="text-blue-400 truncate">{log.path}</span>
              <span className="text-gray-500">{log.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
