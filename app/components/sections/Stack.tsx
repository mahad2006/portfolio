'use client';
import React, { useState } from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { 
  Boxes, 
  BinaryIcon, 
  FileText, 
  Database, 
  Monitor, 
  Network,
  GraduationCap
} from 'lucide-react';

const TechCard = ({ icon, name, category, color, evidence, onHover }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getColorClass = (c) => {
    if (c === 'spring') return 'bg-primary';
    if (c === 'java') return 'bg-[#E76F00]';
    if (c === 'purple-500') return 'bg-purple-500';
    if (c === 'green-400') return 'bg-green-400';
    if (c === 'red-500') return 'bg-red-500';
    if (c === 'white') return 'bg-white';
    if (c === 'cyan-400') return 'bg-cyan-400';
    if (c === 'orange-500') return 'bg-orange-500';
    if (c === 'yellow-500') return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => { setShowTooltip(true); onHover?.(true); }}
      onMouseLeave={() => { setShowTooltip(false); onHover?.(false); }}
    >
      <SpotlightCard className="group relative w-full h-full p-6 rounded-xl card-base hover:border-(--border-highlight) transition-all duration-300 hover:-translate-y-2 overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-1 ${getColorClass(color)} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl shadow-[0_2px_10px_rgba(255,255,255,0.1)]`}></div>
        <div className="mb-4 text-gray-300 group-hover:text-white transition-colors transform group-hover:scale-110 duration-300 origin-left">{icon}</div>
        <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">{category}</p>
      </SpotlightCard>

      {/* Tooltip with Evidence */}
      {evidence && showTooltip && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-72 z-50 pointer-events-none animate-fade-up">
          <div className="card-base p-4 rounded-lg border border-primary/30">
            <div className="text-[10px] text-primary font-mono uppercase tracking-wider mb-2">Used in:</div>
            <p className="text-xs text-gray-300 leading-relaxed">{evidence}</p>
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/10"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const CourseCard = ({ icon, name, semester, status, onHover }) => {
  const statusColors = {
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    current: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    upcoming: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  };

  return (
    <div
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
    >
      <SpotlightCard className="group relative w-full h-full p-5 rounded-xl card-base hover:border-(--border-highlight) transition-all duration-300 hover:-translate-y-2 overflow-hidden">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-gray-300 transition-colors" style={{ ['&.group:hover' as any]: { color: 'var(--text-main)' } }}>{icon}</div>
          <h3 className="text-base font-bold" style={{ color: 'var(--text-main)' }}>{name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${statusColors[status]}`}>
            {status === 'completed' ? '✓ Completed' : status === 'current' ? '◉ In Progress' : '○ Upcoming'}
          </span>
          <span className="text-[10px] text-gray-500 font-mono">{semester}</span>
        </div>
      </SpotlightCard>
    </div>
  );
};
// Marquee styles moved to globals.css for better performance

export const Stack = () => {
  const [isPaused, setIsPaused] = useState(false);
  
  const handleCardHover = (isHovering) => {
    setIsPaused(isHovering);
  };
  // Row 1: Backend & Core
  const row1 = [
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, name: "Java", category: "Core Language", color: "java", evidence: "Built multiple APIs with Java 17+. Used in Spring Boot projects with Streams and concurrent patterns." },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12 6v6l4 2"/></svg>, name: "Spring Boot", category: "Backend Framework", color: "spring", evidence: "Built REST APIs with Spring Boot 3.x. Implemented security, caching, and database integrations." },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>, name: "PostgreSQL", category: "Database", color: "blue-500", evidence: "Designed normalized schemas. Implemented Entity Graphs and query optimizations." },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M2 12h20M2 12l5-5m-5 5l5 5"/></svg>, name: "Redis", category: "Caching", color: "red-500", evidence: "Implemented caching strategies with write-through patterns and LRU eviction policies." },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>, name: "C++", category: "Systems Language", color: "cyan-400", evidence: "Learning in university courses. Used for understanding DSA and low-level programming concepts." },
  ];

  // Row 2: Mobile & Tools
  const row2 = [
    { icon: <span className="text-2xl font-bold">K</span>, name: "Kotlin", category: "Android / Multiplatform", color: "purple-500", evidence: "Built native Android apps including Derivify with custom math parser implementation." },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>, name: "Jetpack Compose", category: "Modern UI", color: "green-400", evidence: "Declarative UI for Android apps. Replaced XML layouts with Compose for cleaner code." },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, name: "Docker", category: "Containerization", color: "cyan-400", evidence: "Containerized Spring Boot applications. Using Docker Compose for local development." },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>, name: "Git", category: "Version Control", color: "orange-500", evidence: "Daily driver for all projects. Comfortable with branching, rebasing, and collaborative workflows." },
    { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, name: "CI/CD", category: "DevOps", color: "yellow-500", evidence: "GitHub Actions for automated testing and deployment. Learning Jenkins for enterprise pipelines." },
  ];

  // Row 3: CS Courses (University)
  const courses = [
    { icon: <Boxes className="w-5 h-5" />, name: "Object-Oriented Programming", semester: "Sem 2", status: "completed" },
    { icon: <BinaryIcon className="w-5 h-5" />, name: "Data Structures & Algorithms", semester: "Sem 3", status: "current" },
    { icon: <FileText className="w-5 h-5" />, name: "Software Requirements Eng", semester: "Sem 3", status: "current" },
    { icon: <Database className="w-5 h-5" />, name: "Database Systems", semester: "Sem 4", status: "upcoming" },
    { icon: <Monitor className="w-5 h-5" />, name: "Operating Systems", semester: "Sem 5", status: "upcoming" },
    { icon: <Network className="w-5 h-5" />, name: "Computer Networks", semester: "Sem 5", status: "upcoming" },
  ];

  return (
    <section id="stack" className="py-32 overflow-hidden bg-page">
      <div className="max-w-[1920px] mx-auto">
        <FadeUp>
          <div className="text-center mb-16 px-6">
            <h2 className="text-3xl font-bold mb-4"><span className="text-primary mono text-2xl">04.</span> Tech Stack & Learning</h2>
            <p className="text-gray-400">Technologies I build with and courses shaping my foundation.</p>
          </div>
        </FadeUp>
        <div className="flex flex-col gap-8">
          {/* Tech Row 1 */}
          <FadeUp delay={0.1}>
            <div className="relative flex overflow-hidden">
              <div className={`flex gap-6 animate-marquee-left whitespace-nowrap py-4 px-4 ${isPaused ? 'marquee-paused' : ''}`}>
                {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
                  <div key={`r1-${idx}`} className="w-[260px] shrink-0"><TechCard {...item} onHover={handleCardHover} /></div>
                ))}
              </div>
              <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-(--bg-page) to-transparent z-10 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-(--bg-page) to-transparent z-10 pointer-events-none"></div>
            </div>
          </FadeUp>
          {/* Tech Row 2 */}
          <FadeUp delay={0.2}>
            <div className="relative flex overflow-hidden">
              <div className={`flex gap-6 animate-marquee-right whitespace-nowrap py-4 px-4 ${isPaused ? 'marquee-paused' : ''}`}>
                {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
                  <div key={`r2-${idx}`} className="w-[260px] shrink-0"><TechCard {...item} onHover={handleCardHover} /></div>
                ))}
              </div>
              <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-(--bg-page) to-transparent z-10 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-(--bg-page) to-transparent z-10 pointer-events-none"></div>
            </div>
          </FadeUp>
          {/* CS Courses Row */}
          <FadeUp delay={0.3}>
            <div className="mt-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <GraduationCap className="w-4 h-4 text-gray-500" />
                <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">University Courses</p>
              </div>
              <div className="relative flex overflow-hidden">
                <div className={`flex gap-6 animate-marquee-slow whitespace-nowrap py-4 px-4 ${isPaused ? 'marquee-paused' : ''}`}>
                  {[...courses, ...courses, ...courses, ...courses].map((item, idx) => (
                    <div key={`c-${idx}`} className="w-[260px] shrink-0"><CourseCard {...item} onHover={handleCardHover} /></div>
                  ))}
                </div>
                <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-(--bg-page) to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-(--bg-page) to-transparent z-10 pointer-events-none"></div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

