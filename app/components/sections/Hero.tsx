'use client';
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useSystem } from '@/hooks/useSystem';
import { HERO_COMMANDS } from '@/config/commands';

interface HistoryItem {
  text: string;
  type: string;
  color?: string;
}

export const Hero: React.FC = () => {
  const { playType, playClick, playSuccess, toggleMatrix } = useSystem();
  const [history, setHistory] = useState<HistoryItem[]>([
    { text: "System initialized. Ready for commands.", type: "system" },
    { text: "Type 'help' to see available commands.", type: "system" },
    { text: "$ whoami", type: "command" },
    { text: "Backend Systems Engineer\nStack: Java, Spring Boot, PostgreSQL, Docker", type: "output" }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false); // Start ready immediately
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      playClick();
      const cmd = inputVal.trim().toLowerCase();
      const newHistory: HistoryItem[] = [...history, { text: `$ ${inputVal}`, type: "command" }];
      
      let response: HistoryItem = { text: "", type: "output" };

      const command = HERO_COMMANDS[cmd];
      if (command) {
        if (command.isClear) {
          setHistory([]);
          setInputVal('');
          return;
        }
        response.text = command.text;
        if (command.color) response.color = command.color;
        if (command.action) {
          if (cmd === 'matrix') {
            toggleMatrix();
          } else {
            command.action();
          }
        }
      } else {
        switch (cmd) {
          case '':
            break;
          default:
            response.text = `Command not found: ${cmd}. Type 'help' for options.`;
            response.color = "text-yellow-500";
        }
      }

      if (cmd) newHistory.push({ ...response, text: response.text });
      setHistory(newHistory);
      setInputVal('');
    }
  };

  return (
    <header id="hero" className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden px-4">
      {/* Background Effects - hidden on mobile for performance */}
      <div className="hidden md:block absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-size-[24px_24px] opacity-20"></div>
      </div>

      <div className="relative z-10 text-center w-full max-w-5xl mx-auto animate-fade-up">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 mb-6 md:mb-8 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] md:text-xs font-bold tracking-widest uppercase">
          <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-primary animate-pulse"></span>
          Backend Engineer @ UBIT
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-4 md:mb-6 text-white leading-tight">
          Building <span className="text-gradient">Systems</span> <br className="hidden sm:block" />
          That <span className="mono text-primary">Scale.</span>
        </h1>

        <p className="text-gray-300 text-sm md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 md:mb-12 font-medium px-2">
          I care about latency, memory usage, and why systems fail. 
          Currently building distributed infrastructures.
        </p>

        {/* Terminal Simulation - Smaller on mobile */}
        <div className="card-base rounded-lg overflow-hidden w-full max-w-2xl mx-auto">
          {/* Terminal Title Bar */}
          <div className="px-3 md:px-4 py-1.5 md:py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-1 md:gap-1.5">
              <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-red-500/50"></div>
              <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-primary/50"></div>
            </div>
            <div className="text-[8px] md:text-[10px] text-gray-500 font-mono">bash</div>
          </div>
          {/* Terminal Content */}
          <div 
            ref={chatRef}
            className="p-3 md:p-6 h-40 md:h-64 overflow-y-auto font-mono text-xs md:text-sm text-left scroll-smooth bg-terminal"
          >
            {history.map((line, i) => (
              <div key={i} className="mb-2 last:mb-0">
                {line.type === 'command' ? (
                  <div className="flex gap-2">
                    <span className="text-primary">➜</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-white">{line.text}</span>
                  </div>
                ) : (
                  <div className={`whitespace-pre-wrap ${line.color || 'text-gray-300'}`}>
                    {line.text}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 animate-pulse">
                <span className="text-primary">➜</span>
                <span className="text-blue-400">~</span>
                <span className="w-2 h-5 bg-primary"></span>
              </div>
            )}
          </div>
          {/* Terminal Input */}
          <div className="px-3 md:px-4 py-2 md:py-3 bg-white/5 border-t border-white/5 flex items-center gap-2">
            <span className="text-primary font-mono text-xs md:text-sm">➜</span>
            <input 
              ref={inputRef}
              type="text" 
              className="bg-transparent border-none outline-none text-white font-mono text-xs md:text-sm w-full focus:ring-0"
              placeholder="Type 'help' for commands..."
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (e.target.value.length > inputVal.length) playType();
              }}
              onKeyDown={handleCommand}
              disabled={isTyping}
              aria-label="Terminal command input"
              aria-describedby="terminal-help"
            />
            <span id="terminal-help" className="sr-only">
              Interactive terminal. Type help and press Enter for available commands including about, projects, and contact.
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          <button 
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-primary text-black text-sm md:text-base font-bold rounded-md hover:opacity-90 transition-all w-full sm:w-auto"
          >
            View Projects
          </button>
          <a 
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 text-white text-sm md:text-base font-bold border border-primary/40 rounded-md hover:border-primary/60 transition-all w-full sm:w-auto flex items-center justify-center gap-2 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <svg className="w-4 h-4 md:w-5 md:h-5 text-primary relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span className="relative z-10">Resume</span>
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/70 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
          <button 
            onClick={() => document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 md:px-8 py-2.5 md:py-3 bg-transparent text-primary text-sm md:text-base font-bold border border-primary/50 rounded-md hover:bg-primary/10 transition-all w-full sm:w-auto"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </header>
  );
};

