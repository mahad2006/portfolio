'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CommandPalette from './CommandPalette';
import { SettingsModal } from './SettingsModal';
import { useSystem } from './SystemProvider';

export const Navbar = () => {
  const { playClick } = useSystem();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          const sections = ['about', 'projects', 'stack', 'writing', 'connect'];
          const scrollPosition = window.scrollY + 250;
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element && element.offsetTop <= scrollPosition) {
               const nextSectionIndex = sections.indexOf(section) + 1;
               const nextSection = nextSectionIndex < sections.length ? document.getElementById(sections[nextSectionIndex]) : null;
               if (!nextSection || nextSection.offsetTop > scrollPosition) setActiveSection(section);
            }
          }
          if (window.scrollY < 100) setActiveSection('');
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = (winScroll / height) * 100;
          setScrollProgress(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(open => !open);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const scrollTo = (id) => {
    playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} onNavigate={scrollTo} />
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a] border-b border-white/10 shadow-lg shadow-black/40' : 'bg-transparent py-6'}`}>
        <div className={`max-w-7xl mx-auto px-6 flex justify-between items-center ${scrolled ? 'py-4' : ''}`}>
          <div className="text-xl font-bold mono tracking-tighter text-white z-50 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo(0,0)} onMouseEnter={playClick}>
            Shaikh Mahad<span className="text-[#6DB33F]">.</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            {['About', 'Projects', 'Stack', 'Writing'].map((item) => {
              const lowerItem = item.toLowerCase();
              const isActive = activeSection === lowerItem;
              return (
                <button key={item} onClick={() => scrollTo(lowerItem)} onMouseEnter={playClick} className={`transition-colors relative group ${isActive ? 'text-[#6DB33F]' : 'hover:text-[#6DB33F]'}`}>
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#6DB33F] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              )
            })}
            <Link href="/community" onMouseEnter={playClick} className="transition-colors relative group hover:text-orange-400">Community</Link>

            <div className="flex items-center border-l border-white/10 pl-6 ml-2 space-x-4">
              <button
                onClick={() => setPaletteOpen(true)}
                onMouseEnter={playClick}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Search (Cmd+K)"
                aria-label="Open Command Palette"
              >
                 <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
              <button
                onClick={() => setSettingsOpen(true)}
                onMouseEnter={playClick}
                className="p-2 text-gray-400 hover:text-white transition-colors group"
                title="Settings"
                aria-label="Open Settings"
              >
                <svg className="group-hover:rotate-90 transition-transform duration-500" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </button>
              <button
                onClick={() => scrollTo('connect')}
                onMouseEnter={playClick}
                className="px-4 py-2 text-white bg-[#6DB33F]/10 border border-[#6DB33F]/50 rounded hover:bg-[#6DB33F] hover:border-[#6DB33F] transition-all transform hover:scale-105"
                aria-label="Contact Me"
              >
                Let's Talk
              </button>
            </div>
          </div>
          {/* ... (mobile menu) */}
        </div>

        {/* Reading Progress Bar */}
        {scrolled && (
            <div className="absolute bottom-0 left-0 h-[2px] bg-[#6DB33F] shadow-[0_0_10px_#6DB33F]" style={{ width: `${scrollProgress}%` }}></div>
        )}

        {/* ... (mobile menu div) */}
      </nav>
    </>
  );
};