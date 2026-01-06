'use client';
import React, { useState, useEffect } from 'react';
import { useSystem } from '@/hooks/useSystem';

export const BootScreen = ({ onComplete }) => {
    const { playType, playSuccess } = useSystem();
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const messages = [
            { text: ">>> INITIALIZING BOOT_SEQUENCE v4.2.0", type: "head", delay: 100 },
            { text: "CORE: ATOMIC_KERNEL_7.1.4_STABLE", type: "sys", delay: 50 },
            { text: "MEM_CHECK: 64GB LPDDR5X ... [ OK ]", type: "sys", delay: 150 },
            { text: "STORAGE: NVMe_M.2_GEN5 ... [ OK ]", type: "sys", delay: 100 },
            { text: "NETWORK: PROTOCOL_TCP_IP_ESTABLISHED", type: "sys", delay: 200 },
            { text: "SYNCING: REPOSITORY_DATA ...", type: "sys", delay: 300 },
            { text: "LOADING: ARCHITECTURE_MODULES", type: "sys", delay: 150 },
            { text: "READY: SYSTEM_BOOT_COMPLETE", type: "head", delay: 200 },
        ];

        let currentDelay = 0;
        messages.forEach((msg, i) => {
            currentDelay += msg.delay;
            setTimeout(() => {
                setLogs(prev => [...prev, msg]);
                setProgress(((i + 1) / messages.length) * 100);
                playType();
                
                if (i === messages.length - 1) {
                    setTimeout(() => {
                        playSuccess();
                        setIsVisible(false);
                        if (onComplete) onComplete();
                    }, 800);
                }
            }, currentDelay);
        });
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-6 font-mono overflow-hidden bg-page">
            {/* CRT Scanline Effect */}
            <div className="absolute inset-0 bg-scanline pointer-events-none opacity-30 z-10"></div>
            
            {/* Glitch Overlay Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[11] bg-[length:100%_2px,3px_100%]"></div>

            <div className="w-full max-w-lg space-y-8 relative z-20">
                {/* Logo Section */}
                <div className="text-center space-y-4">
                    <div className="text-primary animate-pulse">
                        <pre className="text-[6px] md:text-[8px] leading-[1.1] inline-block text-left font-bold">
{`
   _____ _    _          _____ _  ___ _    __  __          _    _          _____  
  / ____| |  | |   /\\   |_   _| |/ / | |  |  \\/  |   /\\   | |  | |   /\\   |  __ \\ 
 | (___ | |__| |  /  \\    | | | ' /  | |__| \\  / |  /  \\  | |__| |  /  \\  | |  | |
  \\___ \\|  __  | / /\\ \\   | | |  <   |  __  |\\/| | / /\\ \\ |  __  | / /\\ \\ | |  | |
  ____) | |  | |/ ____ \\ _| |_| . \\  | |  | |  | |/ ____ \\| |  | |/ ____ \\| |__| |
 |_____/|_|  |_/_/    \\_\\_____|_|\\_\\ |_|  |_|  |_/_/    \\_\\_|  |_/_/    \\_\\_____/ 
`}
                        </pre>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gray-500 tracking-[0.3em] uppercase">
                        <span>Terminal_v4.2</span>
                        <span className="text-primary">Status: Booting</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                        <div 
                            className="h-full bg-primary transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                        <span>Kernel_Allocation</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                </div>

                {/* Log Stream */}
                <div className="h-32 overflow-hidden space-y-1 border-l border-[var(--border-subtle)] pl-4">
                    {logs.map((log, i) => (
                        <div key={i} className={`text-[10px] md:text-xs flex gap-3 ${log.type === 'head' ? 'text-white font-bold' : 'text-gray-500'}`}>
                            <span className="text-primary opacity-50 select-none">[{i}]</span>
                            <span className="tracking-wider">{log.text}</span>
                        </div>
                    ))}
                    <div className="w-1.5 h-4 bg-primary animate-pulse inline-block align-middle ml-1"></div>
                </div>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-[var(--border-subtle)]"></div>
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-[var(--border-subtle)]"></div>
            
            {/* Version Badge */}
            <div className="absolute bottom-10 left-10 font-mono text-[8px] text-gray-700 tracking-[0.5em] uppercase vertical-text">
                OS_CORE_REVISION_2026
            </div>
        </div>
    );
};

