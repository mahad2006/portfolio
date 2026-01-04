'use client';
import React, { useState, useEffect } from 'react';
import { useSystem } from './SystemProvider'; // Import the useSystem hook
import Link from 'next/link';

export const Footer = () => {
  const { isMuted, setIsMuted, playClick } = useSystem(); // Get sound controls
  const [latency, setLatency] = useState(null);
  const [region, setRegion] = useState('TCP/IP');

  useEffect(() => {
    // Console ASCII Art Easter Egg
    console.log(`
%c
   _____ __  __          _____ _  __ __  __
  / ____|  \\/  |   /\\   |_   _| |/ /|  \\/  |
 | (___ | \\  / |  /  \\    | | | ' / | \\  / |
  \\___ \\| |\\/| | / /\\ \\   | | |  <  | |\\/| |
  ____) | |  | |/ ____ \\ _| |_| . \\ | |  | |
 |_____/|_|  |_/_/    \\_\\_____|_|\\_\\|_|  |_|
                                            
%c   >> Backend Systems Engineer // Shaikh Mahad
%c   >> [STATUS] System Online
%c   >> [INFO]   Curiosity is the engine of engineering.
`, 
"color: #6DB33F; font-weight: bold; font-family: monospace;",
"color: #ffffff; font-weight: bold;",
"color: #6DB33F;",
"color: #888; italic;"
);

    // Simulate Latency Measurement
    const start = performance.now();
    fetch('/robots.txt').then(() => {
        setLatency(Math.round(performance.now() - start));
    }).catch(() => {
        setLatency('--');
    });

    // Simple Region Detection
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz) {
            if (tz.includes('Karachi')) setRegion('KHI-PK');
            else if (tz.includes('Europe')) setRegion('EU-WEST');
            else setRegion('GLOBAL');
        }
    } catch(e) {
        setRegion('GLOBAL');
    }
  }, []);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (isMuted) { // If it was muted, we are now unmuting
      playClick(); // Play a sound to confirm
    }
  };

  return (
    <footer className="py-12 border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="flex flex-col items-center md:items-start">
                <div className="text-xl font-bold mono mb-2 text-white">Shaikh Mahad<span className="text-[#6DB33F]">.</span></div>
                <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">Designed for high performance.</p>
            </div>
            <div className="flex gap-8 text-gray-500 text-sm font-mono">
                <div className="flex flex-col">
                    <span className="text-[#6DB33F] text-[10px] mb-1">LATENCY</span>
                    <span>{latency ? `${latency}ms` : '--'}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[#6DB33F] text-[10px] mb-1">REGION</span>
                    <span>{region}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[#6DB33F] text-[10px] mb-1">UPTIME</span>
                    <span>99.9%</span>
                </div>
            </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-8">
            <p className="text-gray-600 text-[10px] font-mono uppercase tracking-widest">© 2024 Shaikh Mahad. All Rights Reserved.</p>

            <div className="flex flex-wrap gap-4 justify-center">
                <Link
                    href="/stats"
                    className="group relative px-6 py-2.5 bg-[#6DB33F]/10 border border-[#6DB33F]/30 rounded-md hover:bg-[#6DB33F] hover:border-[#6DB33F] transition-all text-[#6DB33F] hover:text-black font-bold text-xs uppercase tracking-widest overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#6DB33F] group-hover:bg-black animate-pulse"></span>
                        Stats
                    </span>
                </Link>
                <Link
                    href="/uses"
                    className="group relative px-6 py-2.5 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:border-white/20 transition-all text-gray-400 hover:text-white font-bold text-xs uppercase tracking-widest"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 group-hover:bg-white"></span>
                        Setup
                    </span>
                </Link>
                <Link
                    href="/status"
                    className="group relative px-6 py-2.5 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:border-white/20 transition-all text-gray-400 hover:text-white font-bold text-xs uppercase tracking-widest"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Status
                    </span>
                </Link>
                <button
                  onClick={handleMuteToggle}
                  className="group relative px-6 py-2.5 bg-white/5 border border-white/10 rounded-md hover:bg-white/10 hover:border-white/20 transition-all text-gray-400 hover:text-white font-bold text-xs uppercase tracking-widest"
                  aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isMuted ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 5.858a1 1 0 00-1.414 1.414l12.728 12.728a1 1 0 001.414-1.414L5.858 5.858zM10 12a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0-12a2 2 0 012 2v8a2 2 0 01-2 2m0-12a2 2 0 00-2 2v8a2 2 0 002 2"></path></svg>
                    )}
                    {isMuted ? 'Sound Off' : 'Sound On'}
                  </span>
                </button>
            </div>

            <div className="flex gap-6">
                <span className="text-gray-700 text-[10px] font-mono">BUILT WITH NEXT.JS 16 & REACT 19</span>
            </div>
        </div>
      </div>
    </footer>
  );
};