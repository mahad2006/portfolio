'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSystem } from '@/hooks/useSystem';
import { HERO_COMMANDS } from '@/lib/constants';

export const Hero = () => {
  const { playType, playClick, playSuccess, toggleMatrix } = useSystem();
  const [history, setHistory] = useState([
    { text: "System initialized. Ready for commands.", type: "system" },
    { text: "Type 'help' to see available commands.", type: "system" },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(true); // Initial typewriter effect
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [history]);

  // Initial Typewriter Effect logic
  useEffect(() => {
    const introText = "> Backend Systems Engineer; Stack: Java / Spring Boot / PostgreSQL";
    let index = 0;
    
    // Simulate typing the "whoami" info initially
    const timer = setInterval(() => {
      // This is just a visual delay before "allowing" user input
      index++;
      if (index % 3 === 0) playType(); // Play sound every few chars
      if (index > introText.length) {
        clearInterval(timer);
        setIsTyping(false); // Enable user input
        playSuccess();
        // Add the intro text to history effectively
        setHistory(prev => [
            ...prev, 
            { text: "$ whoami", type: "command" },
            { text: "Backend Systems Engineer\nStack: Java, Spring Boot, PostgreSQL, Docker", type: "output" }
        ]);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      playClick();
      const cmd = inputVal.trim().toLowerCase();
      const newHistory = [...history, { text: `$ ${inputVal}`, type: "command" }];
      
      let response = { text: "", type: "output" };

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

      if (cmd) newHistory.push({ ...response, text: response.text }); // Add response
      setHistory(newHistory);
      setInputVal('');
    }
  };

  return (
    <header id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-up">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase hover:bg-primary/10 transition-colors cursor-default hover:scale-105 transform duration-300">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          System Online: Available for Hire
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 text-white leading-tight">
          Engineering <span className="text-gradient glitch-text">Backend</span> <br />
          Systems <span className="mono text-primary glitch-text">At Scale.</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
          I care about latency, memory usage, and why systems fail. 
          Currently building distributed infrastructures.
        </p>

        {/* Terminal Simulation */}
        <div className="card-base rounded-lg overflow-hidden w-full max-w-2xl mx-auto group transition-all duration-500">
          {/* Terminal Title Bar */}
          <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-primary/50"></div>
            </div>
            <div className="text-[10px] text-gray-500 font-mono flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                bash — 80x24
            </div>
          </div>
          {/* Terminal Content */}
          <div 
            ref={chatRef}
            className="p-6 h-64 overflow-y-auto font-mono text-sm text-left scroll-smooth"
            style={{ backgroundColor: 'rgba(5, 5, 5, 0.95)' }}
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
                  <div className={`whitespace-pre-wrap ${line.color || 'text-gray-400'}`}>
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
          <div className="px-4 py-3 bg-white/5 border-t border-white/5 flex items-center gap-2">
            <span className="text-primary font-mono text-sm">➜</span>
            <input 
              ref={inputRef}
              type="text" 
              className="bg-transparent border-none outline-none text-white font-mono text-sm w-full focus:ring-0"
              placeholder="Type a command (help, about, projects)..."
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (e.target.value.length > inputVal.length) playType();
              }}
              onKeyDown={handleCommand}
              disabled={isTyping}
              aria-label="Terminal command input"
            />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-primary text-black font-bold rounded-md hover:opacity-90 transition-all transform hover:-translate-y-1 w-full sm:w-auto"
          >
            View Projects
          </button>
          <button 
            onClick={() => document.getElementById('connect').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-white/5 text-white font-bold border border-white/10 rounded-md hover:bg-white/10 transition-all w-full sm:w-auto"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </header>
  );
};

