'use client';
import React, { useState, useEffect } from 'react';

const CommandPalette = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const options = [
    { id: 'home', label: 'Home', type: 'section', action: () => onNavigate('hero') },
    { id: 'about', label: 'About', type: 'section', action: () => onNavigate('about') },
    { id: 'projects', label: 'Projects', type: 'section', action: () => onNavigate('projects') },
    { id: 'stack', label: 'Tech Stack', type: 'section', action: () => onNavigate('stack') },
    { id: 'writing', label: 'Writing', type: 'section', action: () => onNavigate('writing') },
    { id: 'connect', label: 'Contact', type: 'section', action: () => onNavigate('connect') },
    { id: 'resume', label: 'View Resume', type: 'link', action: () => window.open('/resume.pdf', '_blank') },
    { id: 'github', label: 'GitHub Profile', type: 'link', action: () => window.open('https://github.com/mahad2006', '_blank') },
  ];

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => setSelectedIndex(0), [query]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % filteredOptions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + filteredOptions.length) % filteredOptions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredOptions[selectedIndex]) {
          filteredOptions[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, filteredOptions, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div 
        className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-white/5">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input 
            autoFocus
            type="text"
            placeholder="Search navigation..."
            className="w-full bg-transparent border-none text-white px-4 py-4 focus:ring-0 placeholder-gray-600 outline-none"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="text-xs text-gray-600 font-mono border border-white/10 px-1.5 py-0.5 rounded">ESC</span>
        </div>
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {filteredOptions.length === 0 ? (
             <div className="px-4 py-8 text-center text-gray-500 text-sm">No results found.</div>
          ) : (
            filteredOptions.map((opt, i) => (
              <button
                key={opt.id}
                onClick={() => { opt.action(); onClose(); }}
                className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${i === selectedIndex ? 'bg-[#6DB33F]/10 text-[#6DB33F]' : 'text-gray-400 hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-3">
                  {opt.type === 'section' ? <span className="text-lg">#</span> : <span className="text-lg">↗</span>}
                  <span>{opt.label}</span>
                </div>
                {i === selectedIndex && <span className="text-xs opacity-50">↵</span>}
              </button>
            ))
          )}
        </div>
        <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-wider font-mono">
            <span>Navigation</span>
            <span>Pro Tip: Cmd+K</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
