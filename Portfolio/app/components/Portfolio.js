'use client'; 

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'; 
import Link from 'next/link';

// --- SPOTLIGHT CARD HELPER (New UI Feature) ---
// This adds the "Pro" glowing effect that follows your mouse
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(109, 179, 63, 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

// --- COMMAND PALETTE COMPONENT ---
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

// --- NAV BAR ---
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [paletteOpen, setPaletteOpen] = useState(false); 

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
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} onNavigate={scrollTo} />
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-4 shadow-lg shadow-black/20' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold mono tracking-tighter text-white z-50 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => window.scrollTo(0,0)}>
            Shaikh Mahad<span className="text-[#6DB33F]">.</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
            {['About', 'Projects', 'Stack', 'Writing'].map((item) => {
              const lowerItem = item.toLowerCase();
              const isActive = activeSection === lowerItem;
              return (
                <button key={item} onClick={() => scrollTo(lowerItem)} className={`transition-colors relative group ${isActive ? 'text-[#6DB33F]' : 'hover:text-[#6DB33F]'}`}>
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#6DB33F] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              )
            })}
            <button onClick={() => setPaletteOpen(true)} className="p-2 text-gray-400 hover:text-white transition-colors" title="Search (Cmd+K)">
               <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
            <button onClick={() => scrollTo('connect')} className="px-4 py-2 text-white bg-[#6DB33F]/10 border border-[#6DB33F]/50 rounded hover:bg-[#6DB33F] hover:border-[#6DB33F] transition-all transform hover:scale-105">Let's Talk</button>
          </div>
          <div className="md:hidden z-50 flex items-center gap-4">
             <button onClick={() => setPaletteOpen(true)} className="text-white p-2"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2">{mobileMenuOpen ? '✕' : '☰'}</button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center space-y-8 md:hidden animate-fade-up">
            {['About', 'Projects', 'Stack', 'Writing', 'Connect'].map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className={`text-2xl font-bold transition-colors ${activeSection === item.toLowerCase() ? 'text-[#6DB33F]' : 'text-white hover:text-[#6DB33F]'}`}>{item}</button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

// --- HERO SECTION (Unchanged) ---
export const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "> Backend Systems Engineer; Stack: Java / Spring Boot / PostgreSQL;";
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => { setText(fullText.slice(0, index)); index++; if (index > fullText.length) clearInterval(timer); }, 40);
    return () => clearInterval(timer);
  }, [fullText]);
  return (
    <header id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-[#6DB33F]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-[#E76F00]/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto animate-fade-up">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#6DB33F]/30 bg-[#6DB33F]/5 text-[#6DB33F] text-xs font-bold tracking-widest uppercase hover:bg-[#6DB33F]/10 transition-colors cursor-default hover:scale-105 transform duration-300"><span className="w-2 h-2 rounded-full bg-[#6DB33F] animate-pulse"></span>Available for Hire</div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-[1.1]">Building Scalable<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Systems & Logic.</span></h1>
        <p className="text-gray-400 text-lg md:text-xl italic max-w-2xl mx-auto mb-10 border-l-2 border-[#6DB33F] pl-4 bg-white/5 py-2 rounded-r-lg">"I care about latency, memory, and why systems fail — not just features."</p>
        <div className="h-8 mb-10 flex items-center justify-center"><p className="mono text-xs md:text-sm text-[#6DB33F] opacity-80">{text}<span className="cursor-blink">_</span></p></div>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="group px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transform hover:-translate-y-1">View Work<svg className="group-hover:translate-x-1 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg></button>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="px-8 py-4 glass-panel text-white font-bold rounded-lg hover:bg-white/5 transition-all border border-white/10 flex items-center justify-center gap-2 hover:border-white/30 transform hover:-translate-y-1"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Resume</a>
        </div>
      </div>
    </header>
  );
};

// --- ABOUT SECTION (Unchanged) ---
export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative group perspective-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6DB33F] to-[#E76F00] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/5] md:aspect-square transform transition-transform duration-500 group-hover:scale-[1.01] shadow-2xl">
            <Image src="/profile.png" alt="Shaikh Mahad" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" priority={true} />
            <div className="hidden w-full h-full absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex-col items-center justify-center text-center p-8"><span className="text-6xl mb-4">👨‍💻</span><p className="text-gray-500 text-xs mono">Profile.png</p></div>
          </div>
        </div>
        <div className="space-y-8 animate-fade-up">
          <h2 className="text-3xl font-bold flex items-center gap-3"><span className="text-[#6DB33F] mono text-2xl">01.</span> About Me</h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <div><h3 className="text-white font-bold mb-2 text-xl">The Journey to Backend</h3><p>I started in native Android development, obsessing over user experience. But as I built more complex apps, I realized the real magic happens on the server. I shifted my focus to <span className="text-white">backend engineering</span> to build the robust systems that power great products.</p></div>
            <div><h3 className="text-white font-bold mb-2 text-xl">How I Think</h3><p>I don't just write code; I design systems. I care deeply about <span className="text-white">data structures, memory efficiency, and the "why"</span> behind every architectural decision. Algorithms aren't just interview questions to me—they are the toolkit for scalability.</p></div>
            <div className="p-4 bg-white/[0.03] border-l-2 border-[#6DB33F] rounded-r-lg"><p className="text-sm italic text-gray-300">"My goal is to bridge the gap between academic theory and production reality."</p></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- PHILOSOPHY SECTION (Unchanged) ---
export const Philosophy = () => {
  return (
    <section id="philosophy" className="py-24 relative border-t border-white/5 bg-black/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:text-center max-w-2xl mx-auto"><h2 className="text-3xl font-bold mb-4"><span className="text-[#6DB33F] mono text-2xl">02.</span> Engineering Philosophy</h2><p className="text-gray-400">Senior engineering isn't about years of experience, but about the quality of decisions made.</p></div>
        <div className="grid md:grid-cols-3 gap-6 animate-fade-up">
            {[{ icon: "⚖️", title: "Trade-offs First", desc: "There is no 'perfect' architecture. I actively weigh consistency vs. availability, and latency vs. throughput." }, { icon: "🧱", title: "Simplicity Wins", desc: "Complexity is the enemy of reliability. I prefer boring, proven technologies over the latest hype." }, { icon: "🔍", title: "Root Cause Analysis", desc: "When things break, I don't just patch the bug. I dig deep to understand the systemic failure." }].map((item, idx) => (
                <div key={idx} className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:-translate-y-1 hover:border-[#6DB33F]/20">
                    <div className="w-12 h-12 bg-[#6DB33F]/10 rounded-lg flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  )
}

// --- PROJECT HELPERS ---
const ProjectCard = ({ title, tags, link, image, caseStudy, isFlagship, slug }) => {
  return (
    // WRAPPED WITH SPOTLIGHT CARD
    <SpotlightCard className={`group rounded-2xl glass-panel border border-white/5 hover:border-[#6DB33F]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(109,179,63,0.1)] flex flex-col h-full overflow-hidden hover:-translate-y-2 ${isFlagship ? 'md:col-span-2 md:flex-row' : ''}`}>
      
      <div className={`${isFlagship ? 'md:w-1/2 h-64 md:h-full' : 'h-52 w-full'} bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/5 relative overflow-hidden`}>
        {image ? (
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
        ) : null}
        <div className={`${image ? 'hidden' : 'flex'} w-full h-full bg-gradient-to-br from-[#1a1a1a] to-black items-center justify-center`}>
          <span className="text-5xl opacity-10 group-hover:opacity-30 transition-opacity font-bold">{title.charAt(0)}</span>
        </div>
        
        {/* Overlay for Flagship & Projects */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-3 items-center justify-center backdrop-blur-[2px]">
            {slug && (
              <Link href={`/projects/${slug}`} className="px-6 py-2 bg-white text-black font-bold rounded-full text-xs transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-200 shadow-lg">
                Read Case Study
              </Link>
            )}
            <a href={link} target="_blank" rel="noopener noreferrer" className="px-6 py-2 glass-panel text-white border border-white/20 font-bold rounded-full text-xs transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:bg-white/10">
              View Source
            </a>
        </div>
      </div>

      <div className={`p-8 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/40 ${isFlagship ? 'md:w-1/2' : ''}`}>
        <div className="flex justify-between items-start mb-6">
            <div>
                {isFlagship && <span className="text-[#6DB33F] text-xs font-bold tracking-widest uppercase mb-2 block">Flagship Project</span>}
                <h3 className={`${isFlagship ? 'text-3xl' : 'text-2xl'} font-bold text-white group-hover:text-[#6DB33F] transition-colors leading-tight`}>{title}</h3>
            </div>
        </div>
        <div className="space-y-4 mb-8 text-sm text-gray-400 leading-relaxed border-l-2 border-white/5 pl-4 group-hover:border-[#6DB33F]/50 transition-colors">
            <div><span className="text-gray-200 font-semibold block mb-1 uppercase text-xs tracking-wider">Problem</span>{caseStudy.problem}</div>
            <div><span className="text-gray-200 font-semibold block mb-1 uppercase text-xs tracking-wider">Approach</span>{caseStudy.approach}</div>
            <div><span className="text-[#6DB33F] font-semibold block mb-1 uppercase text-xs tracking-wider">Outcome</span>{caseStudy.outcome}</div>
        </div>
        <div className="mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-[11px] uppercase tracking-wider font-mono rounded-full bg-white/5 text-gray-400 border border-white/5 group-hover:border-[#6DB33F]/30 group-hover:text-gray-200 transition-colors">{tag}</span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
};

// --- PROJECTS SECTION ---
export const Projects = () => {
  const [filter, setFilter] = useState('All');
  
  const projectsData = [
    {
        title: "Scalable E-Commerce API",
        slug: "scalable-ecommerce",
        isFlagship: true,
        caseStudy: {
          problem: "High latency in product search during simulated concurrent user spikes.",
          approach: "Vertical slicing architecture with PostgreSQL indexing and DTO projection to reduce payload size.",
          outcome: "Reduced query latency by 45% and secured endpoints with RBAC."
        },
        tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
        link: "https://github.com/mahad2006/scalable-ecommerce"
    },
    {
        title: "Derivify: Calculus Toolkit",
        slug: "derivify-calculus",
        isFlagship: false,
        image: "/derivify.png",
        caseStudy: {
          problem: "Students couldn't visualize complex calculus steps offline on mobile.",
          approach: "Built a custom Recursive Descent Parser in Kotlin to tokenize and solve expressions without API dependency.",
          outcome: "Enables offline step-by-step differentiation and graphing; zero network latency."
        },
        tags: ['Kotlin', 'Recursive Parsing', 'Android XML', 'Algorithms'],
        link: "https://github.com/mahad2006/Derivify-Calculus-Toolkit"
    },
    {
        title: "Distributed Caching Layer",
        slug: "distributed-caching",
        isFlagship: false,
        caseStudy: {
          problem: "Database bottlenecks observed during repetitive read operations.",
          approach: "Designed a write-through caching strategy using Redis with an LRU eviction policy.",
          outcome: "Decreased direct database load by 40% while maintaining data consistency."
        },
        tags: ['System Design', 'Redis', 'Java', 'LRU Cache'],
        link: "https://github.com/mahad2006/distributed-cache"
    },
     {
        title: "Quizzler App",
        slug: "quizzler-app",
        isFlagship: false,
        image: "/quizzler.png",
        caseStudy: {
          problem: "Needed a lightweight domain testing tool without the overhead of a heavy backend.",
          approach: "Implemented a clean MVC architecture with a Singleton pattern for state management to optimize memory.",
          outcome: "Robust state preservation across lifecycle events and instant feedback loop."
        },
        tags: ['Kotlin', 'MVC Pattern', 'Singleton', 'Memory Opt.'],
        link: "https://github.com/mahad2006/Quizzler-App"
    },
    {
        title: "Real-Time Chat Android",
        slug: "realtime-chat",
        isFlagship: false,
          caseStudy: {
          problem: "Unreliable message delivery in areas with poor network connectivity.",
          approach: "Engineered an offline-first architecture using RoomDB as the single source of truth, synced via WebSockets.",
          outcome: "Seamless user experience with sub-100ms delivery when online and robust queuing when offline."
        },
        tags: ['Kotlin', 'WebSockets', 'RoomDB', 'Offline-First'],
        link: "https://github.com/mahad2006/realtime-chat-android"
    },
    {
        title: "DSA Roadmap & Guide",
        slug: "dsa-roadmap",
        isFlagship: false,
        image: "/roadmap.png",
        caseStudy: {
          problem: "Juniors lacked a structured path to navigate Data Structures & Algorithms.",
          approach: "Curated a comprehensive, step-by-step documentation tailored to university curriculum constraints.",
          outcome: "Actively used by batchmates to structure their technical interview preparation."
        },
        tags: ['Documentation', 'Community', 'Education', 'DSA'],
        link: "https://github.com/mahad2006"
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.tags.some(t => t.includes(filter)));

  const filters = ['All', 'Java', 'Kotlin', 'Spring Boot', 'System Design', 'Redis'];

  return (
    <section id="projects" className="py-32 relative bg-black/30">
       <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-[#6DB33F] mono text-2xl">03.</span> Featured Projects
          </h2>
          <p className="text-gray-400 max-w-2xl text-lg mb-8">
            A selection of native mobile applications and backend systems. I focus on <span className="text-white">solving real problems</span> with constraints, trade-offs, and scalability in mind.
          </p>
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-xs font-mono border transition-all ${filter === f ? 'bg-[#6DB33F] text-black border-[#6DB33F]' : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'}`}>
                    {f}
                </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
          ))}
        </div>
       </div>
    </section>
  );
};

// --- TECH STACK HELPERS ---
const TechCard = ({ icon, name, category, color, level }) => {
  const getColorClass = (c) => {
    if (c === 'spring') return 'bg-[#6DB33F]';
    if (c === 'java') return 'bg-[#E76F00]';
    if (c === 'purple-500') return 'bg-purple-500';
    if (c === 'green-400') return 'bg-green-400';
    if (c === 'red-500') return 'bg-red-500';
    if (c === 'white') return 'bg-white';
    return 'bg-blue-500';
  };
  return (
    // WRAPPED WITH SPOTLIGHT CARD
    <SpotlightCard className="group relative w-full h-full p-6 rounded-xl tech-card-gradient border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg overflow-hidden">
      <div className={`absolute top-0 left-0 w-full h-1 ${getColorClass(color)} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl shadow-[0_2px_10px_rgba(255,255,255,0.1)]`}></div>
      <div className="absolute top-2 right-2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 px-2 py-0.5 rounded text-gray-300">{level}</div>
      <div className="mb-4 text-gray-300 group-hover:text-white transition-colors transform group-hover:scale-110 duration-300 origin-left">{icon}</div>
      <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
      <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">{category}</p>
    </SpotlightCard>
  );
};

const MarqueeStyles = () => (
  <style>{`
    @keyframes marquee-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes marquee-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
    .animate-marquee-left { animation: marquee-left 40s linear infinite; }
    .animate-marquee-right { animation: marquee-right 40s linear infinite; }
    .marquee-container:hover .animate-marquee-left, .marquee-container:hover .animate-marquee-right { animation-play-state: paused; }
  `}</style>
);

export const Stack = () => {
  const row1 = [
    { level: "Advanced", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, name: "Java", category: "Core Language", color: "java" },
    { level: "Proficient", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>, name: "Spring Boot", category: "Backend Framework", color: "spring" },
    { level: "Intermediate", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>, name: "PostgreSQL", category: "Database", color: "blue-500" },
    { level: "Concept", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>, name: "System Design", category: "Architecture", color: "white" },
  ];
  const row2 = [
    { level: "Proficient", icon: <span className="text-2xl font-bold">K</span>, name: "Kotlin", category: "Android / Multiplatform", color: "purple-500" },
    { level: "Intermediate", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, name: "Jetpack Compose", category: "Modern UI", color: "green-400" },
    { level: "Intermediate", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M2 12h20M2 12l5-5m-5 5l5 5"/></svg>, name: "Redis", category: "Caching", color: "red-500" },
    { level: "Basic", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, name: "Spring Security", category: "Security", color: "spring" },
  ];
  return (
    <section id="stack" className="py-32 bg-black/50 overflow-hidden">
      <MarqueeStyles />
      <div className="max-w-[1920px] mx-auto">
        <div className="text-center mb-16 px-6">
          <h2 className="text-3xl font-bold mb-4"><span className="text-[#6DB33F] mono text-2xl">04.</span> Engineering Stack</h2>
          <p className="text-gray-400">Tools and technologies I use to build scalable systems.</p>
        </div>
        <div className="flex flex-col gap-8 marquee-container">
          <div className="relative flex overflow-hidden">
            <div className="flex gap-6 animate-marquee-left whitespace-nowrap py-4 px-4">
              {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
                <div key={`r1-${idx}`} className="w-[280px] flex-shrink-0"><TechCard {...item} /></div>
              ))}
            </div>
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
          </div>
          <div className="relative flex overflow-hidden">
            <div className="flex gap-6 animate-marquee-right whitespace-nowrap py-4 px-4">
              {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
                <div key={`r2-${idx}`} className="w-[280px] flex-shrink-0"><TechCard {...item} /></div>
              ))}
            </div>
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Writing = () => {
  return (
    <section id="writing" className="py-24 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3"><span className="text-[#6DB33F] mono text-2xl">05.</span> Technical Writing</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <a href="#" className="block p-8 rounded-2xl glass-panel hover:bg-white/[0.05] transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#6DB33F]/20 text-[#6DB33F] text-[10px] font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <div className="flex justify-between items-start mb-4"><span className="text-xs font-mono text-[#6DB33F]">Performance Engineering</span><div className="flex gap-2"><span className="text-xs text-gray-500">6 min read</span><span className="text-xs text-gray-500">Dec 2024</span></div></div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#6DB33F] transition-colors">Why I chose Recursive Descent for my Math Parser</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">Exploring the trade-offs between Shunting-Yard algorithm and hand-written recursive descent parsers for mobile-constrained environments.</p>
              <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">Read Article <span className="ml-2">→</span></div>
            </a>
            <a href="#" className="block p-8 rounded-2xl glass-panel hover:bg-white/[0.05] transition-all group">
              <div className="flex justify-between items-start mb-4"><span className="text-xs font-mono text-[#E76F00]">Databases</span><div className="flex gap-2"><span className="text-xs text-gray-500">4 min read</span><span className="text-xs text-gray-500">Nov 2024</span></div></div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#E76F00] transition-colors">Optimistic vs Pessimistic Locking in Spring Boot</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">A deep dive into handling concurrency in inventory management systems and when to use `@Version` annotations.</p>
              <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">Read Article <span className="ml-2">→</span></div>
            </a>
        </div>
      </div>
    </section>
  );
};

export const Impact = () => {
  return (
    <section className="py-24 relative bg-black/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12"><h2 className="text-2xl font-bold text-white mb-2">Community Impact</h2><p className="text-gray-500">Verified feedback from peers and collaborators.</p></div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-8 rounded-2xl border border-white/5 bg-[#0a0a0a] relative flex flex-col">
            <span className="absolute top-4 left-6 text-6xl text-[#6DB33F] opacity-20 serif">"</span>
            <p className="text-gray-300 text-lg italic leading-relaxed relative z-10 mb-6 flex-grow">Mahad has a rare ability to dive deep into system internals while keeping the big picture in mind. His work on the DSA roadmap changed how our batch approached interviews.</p>
            <div className="flex items-center gap-4 mt-auto"><div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-white">NY</div><div className="flex-1"><div className="flex items-center gap-2"><p className="text-white font-bold text-sm">Nabeerah Yaqoot</p><a href="#" className="text-blue-500 hover:text-blue-400"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a></div><p className="text-xs text-gray-500">Senior Student, UBIT</p></div></div>
          </div>
          <div className="p-8 rounded-2xl border border-white/5 bg-[#0a0a0a] relative flex flex-col">
              <span className="absolute top-4 left-6 text-6xl text-[#6DB33F] opacity-20 serif">"</span>
              <p className="text-gray-300 text-lg italic leading-relaxed relative z-10 mb-6 flex-grow">The offline-first architecture for the Chat App was executed with a level of maturity I rarely see in undergraduate projects. Clean, testable, and robust.</p>
              <div className="flex items-center gap-4 mt-auto"><div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-white">MK</div><div className="flex-1"><div className="flex items-center gap-2"><p className="text-white font-bold text-sm">M. Khan</p><a href="#" className="text-blue-500 hover:text-blue-400"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a></div><p className="text-xs text-gray-500">Project Collaborator</p></div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
         <h2 className="text-3xl font-bold mb-12 flex items-center gap-3"><span className="text-[#6DB33F] mono text-2xl">06.</span> Impact & Leadership</h2>
        <div className="relative border-l border-white/10 pl-8 ml-4 space-y-16">
          <div className="relative animate-fade-up">
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#6DB33F] border-4 border-black box-content shadow-[0_0_15px_#6DB33F]"></div>
            <h3 className="text-2xl font-bold text-white">Founder & Mentor</h3>
            <p className="text-[#6DB33F] mono text-sm mb-4">The UBIT Hub | Present</p>
            <div className="glass-panel p-8 rounded-xl hover:bg-white/[0.02] transition-colors">
              <p className="text-gray-400 mb-4">Established a student community to bridge the gap between academic theory and engineering reality.</p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex gap-2 items-start"><span className="text-[#6DB33F] mt-1">▹</span><span>Mentoring peers in engineering discipline and technical growth.</span></li>
                <li className="flex gap-2 items-start"><span className="text-[#6DB33F] mt-1">▹</span><span>Curated the "DSA Roadmap" now used by juniors for interview prep.</span></li>
              </ul>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{animationDelay: '0.2s'}}>
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-gray-600 border-4 border-black"></div>
            <h3 className="text-2xl font-bold text-white">Software Engineering Undergraduate</h3>
            <p className="text-gray-500 mono text-sm mb-4">UBIT, University of Karachi | 2025 - 2028</p>
            <p className="text-gray-400 max-w-2xl">Focusing on Data Structures, Algorithms, and Distributed Systems. Transitioned from building native Android apps to engineering robust backend architectures.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- CONNECT SECTION (Simplified) ---
export const Connect = () => {
  return (
    <section id="connect" className="py-24 bg-gradient-to-t from-black to-gray-900/40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16"><h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Engineer the Future.</h2><p className="text-xl text-gray-400 max-w-2xl mx-auto">Whether you have a question about backend scaling, want to collaborate on a project, or just want to say hi, I'll try my best to get back to you!</p></div>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
              <h3 className="text-white font-bold text-xl mb-4">Connect Directly</h3>
              <a href="mailto:codewithmahad@gmail.com" className="flex items-center gap-4 p-4 glass-panel rounded-lg hover:border-[#6DB33F] transition-all group hover:-translate-y-1"><div className="p-3 bg-white/5 rounded-full group-hover:bg-[#6DB33F]/20 transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-hover:text-[#6DB33F]"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div><p className="text-sm text-gray-500">Email</p><p className="text-white font-mono text-sm group-hover:text-[#6DB33F] transition-colors">codewithmahad@gmail.com</p></div></a>
              <a href="https://www.linkedin.com/in/codewithmahad" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 glass-panel rounded-lg hover:border-[#6DB33F] transition-all group hover:-translate-y-1"><div className="p-3 bg-white/5 rounded-full group-hover:bg-[#6DB33F]/20 transition-colors"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-hover:text-[#6DB33F]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></div><div><p className="text-sm text-gray-500">LinkedIn</p><p className="text-white font-mono text-sm group-hover:text-[#6DB33F] transition-colors">/in/codewithmahad</p></div></a>
              <div className="flex gap-4 pt-4"><a href="https://github.com/mahad2006" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors hover:underline">GitHub</a><a href="https://leetcode.com/u/mahad2006/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors hover:underline">LeetCode</a><a href="https://codolio.com/profile/codewithmahad" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors hover:underline">Codolio</a></div>
          </div>
          <form className="glass-panel p-8 rounded-2xl space-y-4" onSubmit={(e) => e.preventDefault()}>
            <h3 className="text-white font-bold text-xl mb-2">Send a Message</h3>
            <div><input type="text" placeholder="Your Name" className="input-field" /></div>
            <div><input type="email" placeholder="Your Email" className="input-field" /></div>
            <div><textarea rows="4" placeholder="Your Message" className="input-field resize-none"></textarea></div>
            <button className="w-full py-4 bg-[#6DB33F] text-black font-bold rounded-lg hover:bg-[#5aa035] transition-all flex justify-center items-center gap-2 transform active:scale-95">Send Message<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
          </form>
        </div>
      </div>
    </section>
  );
};

// --- NEW SYSTEM OBSERVABILITY FOOTER ---
export const Footer = () => {
  const [latency, setLatency] = useState(null);
  const [region, setRegion] = useState('Unknown');

  useEffect(() => {
    // Calculate simulated latency
    const start = performance.timing.navigationStart;
    const now = new Date().getTime();
    setLatency(now - start < 0 ? 0 : Math.round((now - start) % 50)); 
    
    try {
      setRegion(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch(e) {}
  }, []);

  return (
    <footer className="py-8 border-t border-white/10 bg-[#050505] text-xs font-mono text-gray-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          © {new Date().getFullYear()} Shaikh Mahad. All systems normal.
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6DB33F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6DB33F]"></span>
            </span>
            <span>Operational</span>
          </div>
          <div>
            ⚡ Latency: <span className="text-white">{latency ? `${latency}ms` : '...'}</span>
          </div>
          <div className="hidden md:block">
            📍 {region}
          </div>
        </div>
      </div>
    </footer>
  )
}