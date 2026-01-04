'use client';
import React from 'react';
import SpotlightCard from './SpotlightCard';

export const Impact = () => {
  return (
    <section className="py-24 relative bg-black/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12"><h2 className="text-2xl font-bold text-white mb-2">Community Impact</h2><p className="text-gray-500">Verified feedback from peers and collaborators.</p></div>
        <div className="grid md:grid-cols-2 gap-6">
          <SpotlightCard className="p-8 rounded-2xl border border-white/5 bg-[#0a0a0a] relative flex flex-col">
            <span className="absolute top-4 left-6 text-6xl text-[#6DB33F] opacity-20 serif">"</span>
            <p className="text-gray-300 text-lg italic leading-relaxed relative z-10 mb-6 flex-grow">Mahad has a rare ability to dive deep into system internals while keeping the big picture in mind. His work on the DSA roadmap changed how our batch approached interviews.</p>
            <div className="flex items-center gap-4 mt-auto"><div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-white">NY</div><div className="flex-1"><div className="flex items-center gap-2"><p className="text-white font-bold text-sm">Nabeerah Yaqoot</p><a href="#" className="text-blue-500 hover:text-blue-400"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a></div><p className="text-xs text-gray-500">Senior Student, UBIT</p></div></div>
          </SpotlightCard>
          <SpotlightCard className="p-8 rounded-2xl border border-white/5 bg-[#0a0a0a] relative flex flex-col">
              <span className="absolute top-4 left-6 text-6xl text-[#6DB33F] opacity-20 serif">"</span>
              <p className="text-gray-300 text-lg italic leading-relaxed relative z-10 mb-6 flex-grow">The offline-first architecture for the Chat App was executed with a level of maturity I rarely see in undergraduate projects. Clean, testable, and robust.</p>
              <div className="flex items-center gap-4 mt-auto"><div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-white">MK</div><div className="flex-1"><div className="flex items-center gap-2"><p className="text-white font-bold text-sm">M. Khan</p><a href="#" className="text-blue-500 hover:text-blue-400"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a></div><p className="text-xs text-gray-500">Project Collaborator</p></div></div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};
