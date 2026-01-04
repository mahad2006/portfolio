'use client';
import React from 'react';
import SpotlightCard from './SpotlightCard';

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
