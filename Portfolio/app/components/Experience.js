'use client';
import React from 'react';
import Link from 'next/link';
import SpotlightCard from './SpotlightCard';

export const Experience = () => {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          <span className="text-[#6DB33F] mono text-2xl">06.</span> Impact & Leadership
        </h2>
        <div className="relative border-l border-white/10 pl-8 ml-4 space-y-16">
          <div className="relative animate-fade-up">
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#6DB33F] border-4 border-black box-content shadow-[0_0_15px_#6DB33F]"></div>
            <h3 className="text-2xl font-bold text-white">Founder & Mentor</h3>
            <p className="text-[#6DB33F] mono text-sm mb-4">The UBIT Hub | Present</p>
            <Link href="/community" passHref>
              <SpotlightCard as="a" className="glass-panel p-8 rounded-xl block hover:bg-white/[0.02] transition-colors group">
                <p className="text-gray-400 mb-4">Established a student community to bridge the gap between academic theory and engineering reality.</p>
                <ul className="space-y-2 text-sm text-gray-400 mb-6">
                  <li className="flex gap-2 items-start"><span className="text-[#6DB33F] mt-1">▹</span><span>Mentoring peers in engineering discipline and technical growth.</span></li>
                  <li className="flex gap-2 items-start"><span className="text-[#6DB33F] mt-1">▹</span><span>Curated the "DSA Roadmap" now used by juniors for interview prep.</span></li>
                </ul>
                <div className="text-[#6DB33F] group-hover:text-green-300 transition-colors flex items-center gap-2">
                  View Community Details
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </SpotlightCard>
            </Link>
          </div>
          <div className="relative animate-fade-up" style={{animationDelay: '0.2s'}}>
            <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-gray-600 border-4 border-black"></div>
            <h3 className="text-2xl font-bold text-white">Software Engineering Undergraduate</h3>
            <p className="text-gray-400 mono text-sm mb-4">UBIT, University of Karachi | 2025 - 2028</p>
            <p className="text-gray-400 max-w-2xl">Focusing on Data Structures, Algorithms, and Distributed Systems. Transitioned from building native Android apps to engineering robust backend architectures.</p>
          </div>
        </div>
      </div>
    </section>
  );
};