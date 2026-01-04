'use client';
import React from 'react';

export const Writing = () => {
  return (
    <section id="writing" className="py-24 relative border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <span className="text-[#6DB33F] mono text-2xl">05.</span> Technical Writing
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <a href="#" className="block p-8 rounded-2xl glass-panel border border-transparent hover:border-[#6DB33F] hover:bg-white/[0.05] transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#6DB33F]/20 text-[#6DB33F] text-[10px] font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-[#6DB33F]">Performance Engineering</span>
              <div className="flex gap-2">
                <span className="text-xs text-gray-500">6 min read</span>
                <span className="text-xs text-gray-500">Jan 2026</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#6DB33F] transition-colors">Why I chose Recursive Descent for my Math Parser</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">Exploring the trade-offs between Shunting-Yard algorithm and hand-written recursive descent parsers for mobile-constrained environments.</p>
            <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">Read Article <span className="ml-2">→</span></div>
          </a>
          <a href="#" className="block p-8 rounded-2xl glass-panel border border-transparent hover:border-[#E76F00] hover:bg-white/[0.05] transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono text-[#E76F00]">Databases</span>
              <div className="flex gap-2">
                <span className="text-xs text-gray-500">4 min read</span>
                <span className="text-xs text-gray-500">Jan 2026</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#E76F00] transition-colors">Optimistic vs Pessimistic Locking in Spring Boot</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">A deep dive into handling concurrency in inventory management systems and when to use `@Version` annotations.</p>
            <div className="flex items-center text-sm font-bold text-white group-hover:translate-x-2 transition-transform">Read Article <span className="ml-2">→</span></div>
          </a>
        </div>
      </div>
    </section>
  );
};