'use client';
import React from 'react';
import SpotlightCard from './SpotlightCard';

const philosophies = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: "Trade-offs First",
    desc: "There is no 'perfect' architecture. I actively weigh consistency vs. availability, and latency vs. throughput."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
    title: "Simplicity Wins",
    desc: "Complexity is the enemy of reliability. I prefer boring, proven technologies over the latest hype."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    title: "Root Cause Analysis",
    desc: "When things break, I don't just patch the bug. I dig deep to understand the systemic failure."
  }
];

export const Philosophy = () => {
  return (
    <section id="philosophy" className="py-24 relative border-t border-white/5 bg-black/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-primary mono text-2xl">02.</span> My Engineering Approach
          </h2>
          <p className="text-gray-400">I believe quality engineering prioritizes decisions over code.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 animate-fade-up">
          {philosophies.map((item, idx) => (
            <SpotlightCard
              key={idx}
              className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:-translate-y-1 hover:border-primary"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}