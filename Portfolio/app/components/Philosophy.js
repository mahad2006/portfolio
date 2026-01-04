'use client';
import React from 'react';
import SpotlightCard from './SpotlightCard';

export const Philosophy = () => {
  return (
    <section id="philosophy" className="py-24 relative border-t border-white/5 bg-black/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 md:text-center max-w-2xl mx-auto"><h2 className="text-3xl font-bold mb-4"><span className="text-[#6DB33F] mono text-2xl">02.</span> Engineering Philosophy</h2><p className="text-gray-400">Senior engineering isn't about years of experience, but about the quality of decisions made.</p></div>
        <div className="grid md:grid-cols-3 gap-6 animate-fade-up">
            {[{ icon: "⚖️", title: "Trade-offs First", desc: "There is no 'perfect' architecture. I actively weigh consistency vs. availability, and latency vs. throughput." }, { icon: "🧱", title: "Simplicity Wins", desc: "Complexity is the enemy of reliability. I prefer boring, proven technologies over the latest hype." }, { icon: "🔍", title: "Root Cause Analysis", desc: "When things break, I don't just patch the bug. I dig deep to understand the systemic failure." }].map((item, idx) => (
                <SpotlightCard key={idx} className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all hover:-translate-y-1 hover:border-[#6DB33F]/20">
                    <div className="w-12 h-12 bg-[#6DB33F]/10 rounded-lg flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </SpotlightCard>
            ))}
        </div>
      </div>
    </section>
  )
}
