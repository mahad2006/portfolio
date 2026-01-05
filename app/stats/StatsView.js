'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Animated Counter Component
function AnimatedCounter({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const targetNum = typeof target === 'string' ? parseInt(target.replace(/[^0-9]/g, '')) : target;
    if (isNaN(targetNum)) {
      setCount(target);
      return;
    }

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * targetNum);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetNum);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
}

export default function TelemetryPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // MonkeyType Stats
  const typingStats = {
    bestWpm: '192',
    accuracy: '98.2',
    timeTyping: '120',
    rank: 'Top 0.1%'
  };

  // Codolio Career Analytics Data
  const careerStats = {
    problemsSolved: 231,
    contributions: 1526,
    cpStreak: 59,
    devActiveDays: 187,
    cpStatus: 'SPECIALIST'
  };

  // Updated Dev Metrics with Real Data
  const performanceMetrics = {
    contributions: { value: 1526, label: 'Code Commits', color: 'green', desc: 'Total contributions' },
    problems: { value: 231, label: 'Problems Solved', color: 'orange', desc: 'Algorithmic challenges' },
    devDays: { value: 187, label: 'Dev Active', color: 'blue', desc: 'Days building' },
    cpStreak: { value: 59, label: 'CP Streak', color: 'red', desc: 'Days solving' }
  };

  // Loaded Modules (Tech Stack)
  const loadedModules = [
    '#JAVA', '#KOTLIN', '#DSA', '#SYSTEM_DESIGN',
    '#SPRING_BOOT', '#ANDROID', '#C++', '#POSTGRESQL',
    '#REACT', '#NEXTJS', '#DOCKER'
  ];

  const wpmNum = parseInt(typingStats.bestWpm);
  const isElite = wpmNum >= 120;

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-mono selection:bg-primary selection:text-black">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--color-primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-primary-rgb),0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="group text-xs text-gray-400 hover:text-primary transition-colors flex items-center gap-2 tracking-widest uppercase">
            <span className="text-green-400">root@mahad:~/stats</span>
            <span className="text-gray-500">$</span>
            <span className="group-hover:text-orange-400 transition-colors">cd ..</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[9px] text-primary tracking-[0.3em] uppercase">Live_Metrics</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <div className="mb-20">
          <div className="flex items-start gap-4 mb-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-none tracking-tighter uppercase">
                Career<span className="text-primary">_</span>Analytics
              </h1>
              <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
                Real-time performance diagnostics • Competitive programming • Development activity
              </p>
            </div>
          </div>
        </div>

        {/* ===== INPUT VELOCITY MATRIX ===== */}
        <div className="mb-20">
          <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 tracking-[0.3em] uppercase opacity-70">
            <span className="w-12 h-px bg-gradient-to-r from-cyan-400 to-transparent"></span>
            Input_Velocity_Matrix
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* WPM Card */}
            <div className={`group relative p-8 rounded-2xl bg-neutral-900 border ${isElite ? 'border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.15)]' : 'border-neutral-800'} hover:border-cyan-400/30 transition-all duration-500 overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {isElite && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-400 text-black text-[8px] font-bold tracking-widest rounded-full">
                  {typingStats.rank}
                </div>
              )}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
                  <h3 className="text-[10px] text-gray-400 uppercase tracking-[0.25em]">Velocity</h3>
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-6xl font-bold text-cyan-400 group-hover:scale-105 transition-transform">
                    {mounted ? <AnimatedCounter target={typingStats.bestWpm} /> : typingStats.bestWpm}
                  </span>
                  <span className="text-xl text-gray-500 font-bold">WPM</span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">60s Benchmark</p>
              </div>
            </div>

            {/* Accuracy Card */}
            <div className="group relative p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-blue-400/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <h3 className="text-[10px] text-gray-400 uppercase tracking-[0.25em]">Precision</h3>
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-6xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {typingStats.accuracy}
                  </span>
                  <span className="text-xl text-gray-500 font-bold">%</span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Accuracy Rate</p>
              </div>
            </div>

            {/* Uptime Card */}
            <div className="group relative p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-purple-400/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                  <h3 className="text-[10px] text-gray-400 uppercase tracking-[0.25em]">Uptime</h3>
                </div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-6xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {typingStats.timeTyping}
                  </span>
                  <span className="text-xl text-gray-500 font-bold">hrs</span>
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Time Typing</p>
              </div>
            </div>
          </div>

          {/* Race Button */}
          <a href="https://monkeytype.com/profile/CodeWithMahad1" target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-2xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-2xl opacity-60 group-hover:opacity-100 blur-lg group-hover:blur-xl transition-all duration-500"></div>
            <div className="relative flex items-center justify-between p-8 bg-[#050505] border border-cyan-400/50 rounded-2xl">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors flex items-center gap-3">
                  <span className="text-3xl">🏁</span>
                  Initiate_Race_Protocol
                </h3>
                <p className="text-sm text-gray-400">Challenge accepted • MonkeyType battles • Top 0.1% tier</p>
              </div>
              <svg className="w-8 h-8 text-cyan-400 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </a>
        </div>

        {/* ===== CAREER ANALYTICS (SOLVER & BUILDER NODES) ===== */}
        <div className="mb-20">
          <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 tracking-[0.3em] uppercase opacity-70">
            <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent"></span>
            System_Nodes_Analytics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* SOLVER NODE (Competitive Programming) */}
            <div className="group relative overflow-hidden rounded-3xl border border-orange-500/30 bg-neutral-900 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(249,115,22,0.2)]">
              {/* Animated Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500/30 to-transparent blur-3xl group-hover:w-72 group-hover:h-72 transition-all duration-500"></div>

              <div className="relative p-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                      <h3 className="text-xs text-orange-500 uppercase tracking-[0.3em] font-bold">Solver_Node</h3>
                    </div>
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider">Algorithmic_Throughput</h4>
                  </div>
                  <div className="px-4 py-1.5 bg-orange-500/20 border border-orange-500/50 rounded-full">
                    <span className="text-[9px] text-orange-400 font-bold tracking-widest uppercase">{careerStats.cpStatus}</span>
                  </div>
                </div>

                {/* Main Counter */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-7xl md:text-8xl font-bold text-orange-500 group-hover:scale-105 transition-transform">
                      {mounted ? <AnimatedCounter target={careerStats.problemsSolved} /> : careerStats.problemsSolved}
                    </span>
                    <span className="text-2xl text-gray-500 font-bold">Problems</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{careerStats.cpStreak} Days Active Streak</span>
                    </div>
                  </div>
                </div>

                {/* Platform Icons */}
                <div className="pt-6 border-t border-orange-500/20">
                  <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-3">Connected Platforms</div>
                  <div className="flex gap-3">
                    {['LeetCode', 'HackerRank', 'CodeChef', 'GFG'].map(platform => (
                      <div key={platform} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all">
                        <span className="text-xs text-gray-400">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* BUILDER NODE (Development) */}
            <div className="group relative overflow-hidden rounded-3xl border border-primary/30 bg-neutral-900 hover:border-primary/50 transition-all duration-500">
              {/* Animated Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/30 to-transparent blur-3xl group-hover:w-72 group-hover:h-72 transition-all duration-500"></div>

              <div className="relative p-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <h3 className="text-xs text-primary uppercase tracking-[0.3em] font-bold">Builder_Node</h3>
                    </div>
                    <h4 className="text-sm text-gray-400 uppercase tracking-wider">Code_Commits</h4>
                  </div>
                  <div className="px-4 py-1.5 bg-primary/20 border border-primary/50 rounded-full">
                    <span className="text-[9px] text-primary font-bold tracking-widest uppercase">ACTIVE</span>
                  </div>
                </div>

                {/* Main Counter */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-7xl md:text-8xl font-bold text-primary group-hover:scale-105 transition-transform">
                      {mounted ? <AnimatedCounter target={careerStats.contributions} /> : careerStats.contributions}
                    </span>
                    <span className="text-2xl text-gray-500 font-bold">Commits</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{careerStats.devActiveDays} Days Active Uptime</span>
                    </div>
                  </div>
                </div>

                {/* GitHub Link */}
                <div className="pt-6 border-t border-primary/20">
                  <a href="https://github.com/mahad2006" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all group/link">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400 group-hover/link:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="text-xs text-gray-400 group-hover/link:text-white transition-colors">@mahad2006</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover/link:text-primary group-hover/link:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ===== PERFORMANCE METRICS ===== */}
        <div className="mb-20">
          <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 tracking-[0.3em] uppercase opacity-70">
            <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent"></span>
            Performance_Metrics
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(performanceMetrics).map(([key, metric]) => {
              const colorMap = {
                green: { border: 'border-primary/30', text: 'text-primary', glow: 'from-primary/5' },
                orange: { border: 'border-orange-500/30', text: 'text-orange-500', glow: 'from-orange-500/5' },
                blue: { border: 'border-blue-400/30', text: 'text-blue-400', glow: 'from-blue-400/5' },
                red: { border: 'border-red-500/30', text: 'text-red-500', glow: 'from-red-500/5' }
              };
              const colors = colorMap[metric.color];

              return (
                <div key={key} className={`group relative p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:${colors.border} transition-all duration-300`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl`}></div>
                  <div className="relative z-10">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-3">{metric.label}</div>
                    <div className={`text-4xl font-bold text-white group-hover:${colors.text} transition-colors mb-2`}>
                      {mounted ? <AnimatedCounter target={metric.value} /> : metric.value}
                    </div>
                    <div className="text-[9px] text-gray-500">{metric.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== LOADED MODULES ===== */}
        <div className="mb-20">
          <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 tracking-[0.3em] uppercase opacity-70">
            <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent"></span>
            Loaded_Modules
          </h2>

          <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
            <div className="flex flex-wrap gap-3">
              {loadedModules.map((module, idx) => (
                <div
                  key={idx}
                  className="group relative px-5 py-3 rounded-lg bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-all cursor-default"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-sm text-gray-300 group-hover:text-primary transition-colors font-bold">
                      {module}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-6 rounded-xl bg-primary/10 border border-primary/30">
          <p className="text-xs text-gray-400 leading-relaxed">
            <span className="text-primary font-bold">SYSTEM_NOTE:</span> Career analytics powered by Codolio • MonkeyType API integration • Real-time GitHub synchronization
          </p>
        </div>

      </main>
    </div>
  );
}
