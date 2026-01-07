'use client';
import React from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const philosophies = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Learn by Building",
    desc: "I don't passively watch tutorials. Every concept I learn gets implemented in a real project within 48 hours. Theory without practice is just entertainment."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Teach to Master",
    desc: "Running the UBIT Hub taught me that explaining concepts to others reveals gaps in my own understanding. If I can't teach it simply, I don't truly know it."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "Depth Over Breadth",
    desc: "I'd rather master Java + Spring deeply than know 10 frameworks superficially. Recruiters hire specialists. I'm building T-shaped expertise with a strong backend core."
  }
];

export const Philosophy = () => {
  return (
    <section id="philosophy" className="py-24 relative border-t" style={{ backgroundColor: 'var(--bg-surface-dark)', borderColor: 'var(--border-subtle)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="mb-12 md:text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-primary mono text-2xl">02.</span> How I Learn & Grow
            </h2>
            <p className="text-gray-400">Principles that guide my journey from student to engineer.</p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
          {philosophies.map((item, idx) => (
            <StaggerItem key={idx}>
              <SpotlightCard
                className="group p-8 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all hover:-translate-y-1 hover:border-primary h-full"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

