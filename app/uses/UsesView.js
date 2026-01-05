'use client';
import React from 'react';
import Link from 'next/link';

export default function UsesPage() {
  const setup = {
    hardware: [
      {
        name: 'Dell Latitude 7420',
        category: 'Laptop',
        specs: ['32GB RAM', '512GB SSD', 'Optimized for containerized workloads'],
        icon: '💻',
        highlight: true
      },
      {
        name: 'Mechanical Keyboard',
        category: 'Input Device',
        specs: ['Tactile switches', '192 WPM capable', 'Low latency'],
        icon: '⌨️',
        highlight: true
      },
      {
        name: 'HP 435 Wireless Mouse',
        category: 'Input Device',
        specs: ['Ergonomic design', '2.4 GHz & Bluetooth 5.2', 'Multi-device support'],
        icon: '🖱️'
      },
      {
        name: 'HyperX Cloud Alpha',
        category: 'Audio',
        specs: ['Wired headset', 'Clear audio', 'Deep focus sessions'],
        icon: '🎧'
      }
    ],
    development: [
      {
        name: 'IntelliJ IDEA Ultimate',
        category: 'Java IDE',
        desc: 'Primary IDE for Java/Spring Boot development',
        link: 'https://www.jetbrains.com/idea/'
      },
      {
        name: 'Android Studio',
        category: 'Mobile IDE',
        desc: 'Kotlin and Android development',
        link: 'https://developer.android.com/studio'
      },
      {
        name: 'VS Code',
        category: 'Code Editor',
        desc: 'Frontend development and quick edits',
        link: 'https://code.visualstudio.com/'
      },
      {
        name: 'Windows Terminal',
        category: 'Terminal',
        desc: 'Git Bash with oh-my-posh customization',
        link: null
      },
      {
        name: 'JetBrains Mono',
        category: 'Font',
        desc: 'Perfect ligatures for code readability',
        link: 'https://www.jetbrains.com/lp/mono/'
      }
    ],
    tools: [
      { name: 'Git + GitHub', desc: 'Version control and collaboration' },
      { name: 'Postman', desc: 'REST API development and testing' },
      { name: 'DBeaver', desc: 'PostgreSQL database management' },
      { name: 'Docker Desktop', desc: 'Containerized local environments' },
      { name: 'Figma', desc: 'UI/UX design and prototyping' },
      { name: 'Notion', desc: 'Technical documentation and planning' }
    ],
    stack: {
      backend: ['Java 17+', 'Spring Boot 3.x', 'PostgreSQL', 'Redis', 'Docker', 'Maven'],
      frontend: ['React 19', 'Next.js 16', 'Tailwind CSS', 'TypeScript'],
      mobile: ['Kotlin', 'Android SDK', 'Jetpack Compose', 'Room DB'],
      fundamentals: ['C++', 'OOP', 'Data Structures', 'Algorithms']
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono selection:bg-primary selection:text-black overflow-hidden">

      {/* Matrix Rain Background Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(109,179,63,0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(109,179,63,0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="group text-xs text-gray-400 hover:text-primary transition-colors flex items-center gap-2 tracking-widest uppercase">
            <span className="text-green-400">root@mahad:~/uses</span>
            <span className="text-gray-500">$</span>
            <span className="group-hover:text-orange-400 transition-colors">cd ..</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#6DB33F]"></div>
            <span className="text-[9px] text-primary tracking-[0.3em] uppercase">System_Configuration</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">

        {/* Header Section */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h1 className="text-6xl md:text-8xl font-bold text-white leading-none tracking-tighter uppercase mb-4">
                Uses<span className="text-primary">.</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl border-l-2 border-primary pl-6 leading-relaxed">
                Hardware, software, and tools that power my development workflow
              </p>
            </div>
          </div>
        </div>

        {/* Hardware Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-16 h-px bg-gradient-to-r from-[#6DB33F] to-transparent"></span>
            <h2 className="text-sm font-bold text-white tracking-[0.4em] uppercase">Hardware_Specifications</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {setup.hardware.map((item, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
                  item.highlight
                    ? 'border-primary/30 bg-neutral-900 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(109,179,63,0.15)]'
                    : 'border-neutral-800 bg-neutral-900 hover:border-white/20'
                }`}
              >
                {/* Animated corner accent */}
                {item.highlight && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6DB33F]/20 to-transparent blur-3xl group-hover:w-40 group-hover:h-40 transition-all duration-500"></div>
                )}

                <div className="relative p-8 flex items-start gap-8">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl transition-all duration-500 ${
                      item.highlight
                        ? 'bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110'
                        : 'bg-white/5 group-hover:bg-white/10'
                    }`}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-[10px] text-primary uppercase tracking-wider mb-2 font-bold">{item.category}</div>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="flex flex-wrap gap-3">
                      {item.specs.map((spec, i) => (
                        <div key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400 hover:border-primary/30 hover:bg-white/10 transition-all">
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Development Environment Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-16 h-px bg-gradient-to-r from-[#6DB33F] to-transparent"></span>
            <h2 className="text-sm font-bold text-white tracking-[0.4em] uppercase">Development_Environment</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {setup.development.map((item, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-primary/30 hover:bg-neutral-800 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6DB33F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-[10px] text-primary uppercase tracking-wider font-bold">{item.category}</div>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 transition-all"
                      >
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-16 h-px bg-gradient-to-r from-[#6DB33F] to-transparent"></span>
            <h2 className="text-sm font-bold text-white tracking-[0.4em] uppercase">Tools_&_Utilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {setup.tools.map((tool, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-500">{tool.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <span className="w-16 h-px bg-gradient-to-r from-[#6DB33F] to-transparent"></span>
            <h2 className="text-sm font-bold text-white tracking-[0.4em] uppercase">Primary_Technology_Stack</h2>
          </div>

          <div className="space-y-8">
            {Object.entries(setup.stack).map(([category, techs], idx) => (
              <div key={idx} className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6DB33F] to-transparent opacity-50"></div>
                <div className="pl-8">
                  <h3 className="text-xs text-primary uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {techs.map((tech, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 text-sm rounded-lg bg-neutral-900 border border-neutral-800 text-gray-300 hover:border-primary/30 hover:text-white hover:bg-neutral-800 transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <div className="p-8 rounded-2xl bg-primary/10 border border-primary/30">
          <p className="text-sm text-gray-400 leading-relaxed">
            <span className="text-primary font-bold">NOTE:</span> This setup evolves constantly as I experiment with new tools and optimize my workflow. The goal is always maximum productivity and minimum friction.
          </p>
        </div>

      </main>
    </div>
  );
}
