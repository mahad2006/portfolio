'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CommandPalette from './CommandPalette';
import { useSystem } from './SystemProvider';

export const Navbar = () => {
  const { isMuted, setIsMuted, matrixActive, toggleMatrix, playClick } = useSystem();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [paletteOpen, setPaletteOpen] = useState(false); 
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
      // Cmd+K or Ctrl+K for Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(open => !open);
      }
      // Esc to close palette is already handled in CommandPalette component
      
      // Matrix Mode (Shift + M)
      if (e.shiftKey && e.key === 'M') {
        toggleMatrix();
      }
      // Mute (Shift + S)
      if (e.shiftKey && e.key === 'S') {
        setIsMuted(muted => !muted);
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
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a] border-b border-white/10 shadow-lg shadow-black/40' : 'bg-transparent py-6'}`}>
        
        <div className={`max-w-7xl mx-auto px-6 flex justify-between items-center ${scrolled ? 'py-4' : ''}`}>
          <div className="text-xl font-bold mono tracking-tighter text-white z-50 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo(0,0)} onMouseEnter={playClick}>
            Shaikh Mahad<span className="text-[#6DB33F]">.</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            {/* System Controls */}
            <div className="flex items-center border-r border-white/10 pr-6 mr-2 space-x-4">
               <button 
                onClick={() => { setIsMuted(!isMuted); playClick(); }}
                onMouseEnter={playClick}
                className={`p-2 transition-colors ${!isMuted ? 'text-[#6DB33F]' : 'text-gray-600'}`}
                title={isMuted ? "Enable Sound" : "Mute Sound"}
              >
                {isMuted ? (
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
                ) : (
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                )}
              </button>
              <button 
                onClick={() => toggleMatrix()}
                onMouseEnter={playClick}
                className={`p-2 transition-colors ${matrixActive ? 'text-[#6DB33F]' : 'text-gray-600'}`}
                title="Toggle Matrix Reality (Shift + M)"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h18M3 9.5h18M3 14.5h18M3 19.5h18" opacity="0.2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 2v20M12 2v20M17 2v20" />
                </svg>
              </button>
            </div>

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
              onClick={() => scrollTo('connect')} 
              onMouseEnter={playClick}
              className="px-4 py-2 text-white bg-[#6DB33F]/10 border border-[#6DB33F]/50 rounded hover:bg-[#6DB33F] hover:border-[#6DB33F] transition-all transform hover:scale-105"
              aria-label="Contact Me"
            >
              Let's Talk
            </button>
          </div>
          <div className="md:hidden z-50 flex items-center gap-4">
             <button 
               onClick={() => setPaletteOpen(true)} 
               onMouseEnter={playClick}
               className="text-white p-2"
               aria-label="Search"
             >
               <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              onMouseEnter={playClick}
              className="text-white p-2"
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Reading Progress Bar */}
        {scrolled && (
            <div className="absolute bottom-0 left-0 h-[2px] bg-[#6DB33F] transition-all duration-100 ease-out" style={{ width: `${scrollProgress}%` }}></div>
        )}

        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center space-y-8 md:hidden animate-fade-up">
            {['About', 'Projects', 'Stack', 'Writing', 'Community', 'Connect'].map((item) => (
              <button key={item} onClick={() => {
                if (item === 'Community') {
                  window.location.href = '/community';
                } else {
                  scrollTo(item.toLowerCase());
                }
              }} onMouseEnter={playClick} className={`text-2xl font-bold transition-colors ${activeSection === item.toLowerCase() ? 'text-[#6DB33F]' : 'text-white hover:text-[#6DB33F]'}`}>{item}</button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};