'use client';
import React, { useState, useEffect } from 'react';

export const SystemLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const addLog = (msg, type = 'info') => {
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      setLogs(prev => [...prev.slice(-4), { timestamp, msg, type }]);
    };

    const handleScroll = () => {
      const sections = ['about', 'projects', 'stack', 'writing', 'experience', 'connect'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top < 100 && el.getBoundingClientRect().bottom > 100) {
          // Avoid duplicate logs for same section
          setLogs(prev => {
            if (prev.length > 0 && prev[prev.length - 1].msg.includes(section.toUpperCase())) return prev;
            addLog(`MOUNTED_SECTION: ${section.toUpperCase()}`, 'system');
            return prev;
          });
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    addLog('KERNEL_INTERFACE_INITIALIZED', 'success');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-24 left-6 z-[100] hidden xl:block pointer-events-none">
      <div className="space-y-1 font-mono text-[9px] uppercase tracking-tighter">
        {logs.map((log, i) => (
          <div key={i} className={`flex gap-3 animate-fade-up opacity-60 hover:opacity-100 transition-opacity`}>
            <span className="text-gray-600">[{log.timestamp}]</span>
            <span className={log.type === 'system' ? 'text-[#6DB33F]' : log.type === 'success' ? 'text-blue-400' : 'text-gray-400'}>
              {log.msg}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
