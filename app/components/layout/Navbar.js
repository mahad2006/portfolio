'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CommandPalette from '@/components/ui/CommandPalette';
import { useSystem } from '@/hooks/useSystem';
import { ROUTES, NAV_LINKS, SECTIONS } from '@/config/routes';
import { AUTHOR_NAME } from '@/config/site';

export const Navbar = () => {
  const pathname = usePathname();
  const isHome = pathname === ROUTES.HOME;
  const { playClick, isMuted, setIsMuted, soundEnabled } = useSystem();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Skip scroll handling on sub-pages
    if (!isHome) return;
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          const sections = [SECTIONS.ABOUT, SECTIONS.PROJECTS, SECTIONS.STACK, SECTIONS.WRITING, SECTIONS.CONNECT];
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
  }, [isHome]);

  const scrollTo = (id) => {
    playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Hide Navbar on all sub-pages - they use PageShell instead
  if (!isHome) return null;

  return (
    <>
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} onNavigate={scrollTo} />

      <nav className={`fixed top-0 w-full z-9998 transition-all duration-300 ${scrolled ? 'bg-(--bg-page)/80 backdrop-blur-xl border-b border-(--border-subtle) shadow-(--shadow-card)' : 'bg-transparent py-6'}`}>
        <div className={`max-w-7xl mx-auto px-6 flex justify-between items-center ${scrolled ? 'py-4' : ''}`}>
          {/* Left Side: Logo on home, Back Button on sub-pages */}
          {isHome ? (
            <div className="text-xl font-bold mono tracking-tighter text-white z-50 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo(0,0)} onMouseEnter={playClick}>
              {AUTHOR_NAME}<span className="text-primary">.</span>
            </div>
          ) : (
            <TerminalBackButton />
          )}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            {isHome && NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button key={item.id} onClick={() => scrollTo(item.id)} onMouseEnter={playClick} className={`transition-colors relative group ${isActive ? 'text-primary' : 'hover:text-primary'}`}>
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              )
            })}
            {isHome && (
              <Link href={ROUTES.COMMUNITY} onMouseEnter={playClick} className="transition-colors relative group hover:text-orange-400">Community</Link>
            )}

            <div className="flex items-center border-l border-white/10 pl-6 ml-2 space-x-4">
              {/* Logo on right side when not on home page */}
              {!isHome && (
                <Link 
                  href={ROUTES.HOME} 
                  className="text-lg font-bold mono tracking-tighter text-white hover:opacity-80 transition-opacity mr-4"
                  onMouseEnter={playClick}
                >
                  {AUTHOR_NAME}<span className="text-primary">.</span>
                </Link>
              )}
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
                onClick={() => setIsMuted(!isMuted)}
                onMouseEnter={playClick}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title={soundEnabled ? "Mute Sound" : "Unmute Sound"}
                aria-label={soundEnabled ? "Mute Sound" : "Unmute Sound"}
              >
                {soundEnabled ? (
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM16 14l4-4m0 4l-4-4" />
                  </svg>
                )}
              </button>
              <Link
                href={ROUTES.SETTINGS}
                onMouseEnter={playClick}
                className="p-2 text-gray-400 hover:text-white transition-colors group"
                title="Settings"
                aria-label="Open Settings"
              >
                <svg className="group-hover:rotate-90 transition-transform duration-500" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </Link>
              {isHome && (
                <button
                  onClick={() => scrollTo(SECTIONS.CONNECT)}
                  onMouseEnter={playClick}
                  className="px-4 py-2 text-white bg-primary/10 border border-primary/50 rounded hover:bg-primary hover:border-primary transition-all transform hover:scale-105"
                  aria-label="Contact Me"
                >
                  Let's Talk
                </button>
              )}
            </div>
          </div>
          {/* ... (mobile menu) */}
        </div>

        {/* Reading Progress Bar */}
        {scrolled && (
            <div className="absolute bottom-0 left-0 h-0.5 bg-primary" style={{ width: `${scrollProgress}%` }}></div>
        )}

        {/* ... (mobile menu div) */}
      </nav>
    </>
  );
};

