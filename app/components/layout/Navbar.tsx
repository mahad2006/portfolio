'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CommandPalette from '@/components/ui/CommandPalette';
import { TerminalBackButton } from '@/components/ui/TerminalBackButton';
import { useSystem } from '@/hooks/useSystem';
import { ROUTES, NAV_LINKS, SECTIONS } from '@/config/routes';
import { AUTHOR_NAME } from '@/config/site';

export const Navbar: React.FC = () => {
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
                className="p-2 text-gray-400 hover:text-white transition-colors icon-glow"
                title="Search (Cmd+K)"
                aria-label="Open Command Palette"
              >
                 <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                onMouseEnter={playClick}
                className="p-2 text-gray-400 hover:text-white transition-colors icon-wiggle"
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
                <>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playClick}
                    className="px-3 py-2 text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1.5"
                    aria-label="View Resume"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                    </svg>
                    Resume
                  </a>
                  <button
                    onClick={() => scrollTo(SECTIONS.CONNECT)}
                    onMouseEnter={playClick}
                    className="px-4 py-2 text-white bg-primary/10 border border-primary/50 rounded hover:bg-primary hover:border-primary transition-all transform hover:scale-105"
                    aria-label="Contact Me"
                  >
                    Let's Talk
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button & Icons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
            <Link
              href={ROUTES.SETTINGS}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Settings"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              )}
            </button>
          </div>
        </div>

        {/* Reading Progress Bar */}
        {scrolled && (
            <div className="absolute bottom-0 left-0 h-0.5 bg-primary" style={{ width: `${scrollProgress}%` }}></div>
        )}

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10">
            <div className="px-6 py-4 space-y-1">
              {/* Navigation Links */}
              {isHome && NAV_LINKS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-colors ${activeSection === item.id ? 'text-primary bg-primary/10' : 'text-gray-300 hover:bg-white/5'}`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Additional Pages */}
              <div className="border-t border-white/10 pt-3 mt-3">
                <Link href={ROUTES.COMMUNITY} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-3 px-4 rounded-lg text-orange-400 hover:bg-white/5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                  Community
                </Link>
                <Link href="/more" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-300 hover:bg-white/5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                  More
                </Link>
                <Link href={ROUTES.STATS} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-300 hover:bg-white/5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                  Stats
                </Link>
                <Link href={ROUTES.USES} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-300 hover:bg-white/5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  Uses
                </Link>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-white/10 pt-3 mt-3 flex flex-col gap-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 text-white border border-primary/30 overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span className="font-semibold">View Resume</span>
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
                {isHome && (
                  <button
                    onClick={() => scrollTo(SECTIONS.CONNECT)}
                    className="py-3 px-4 rounded-lg bg-primary text-black font-bold"
                  >
                    Let's Talk
                  </button>
                )}
              </div>

              {/* Sound Toggle */}
              <div className="border-t border-white/10 pt-3 mt-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="flex items-center gap-3 py-3 px-4 w-full text-left text-gray-400"
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
                  {soundEnabled ? 'Sound On' : 'Sound Off'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

