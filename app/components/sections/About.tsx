'use client';
import React from 'react';
import Image from 'next/image';
import { AUTHOR_NAME } from '@/config/site';
import { FadeUp, SlideInLeft, SlideInRight } from '@/components/ui/AnimatedSection';

export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <SlideInLeft>
          <div className="relative group perspective-1000">
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative rounded-2xl overflow-hidden border border-(--border-subtle) aspect-4/5 md:aspect-square transform transition-transform duration-500 group-hover:scale-[1.01] shadow-(--shadow-card) bg-surface">
              <Image src="/profile.png" alt={AUTHOR_NAME} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" priority={true} />
              <div className="hidden w-full h-full absolute inset-0 bg-linear-to-br from-gray-900 to-black flex-col items-center justify-center text-center p-8"><span className="text-6xl mb-4">👨‍💻</span><p className="text-gray-500 text-xs mono">Profile.png</p></div>
            </div>
          </div>
        </SlideInLeft>
        <SlideInRight>
          <div className="space-y-8">
          <h2 className="text-3xl font-bold flex items-center gap-3"><span className="text-primary mono text-2xl">01.</span> About Me</h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <div><h3 className="text-white font-bold mb-2 text-xl">The Journey to Backend</h3><p>I started in native Android development, obsessing over user experience. But as I built more complex apps, I realized the real magic happens on the server. I shifted my focus to <span className="text-white">backend engineering with Java & Spring Boot</span> to build the robust systems that power great products.</p></div>
            <div><h3 className="text-white font-bold mb-2 text-xl">How I Think</h3><p>I don't just write code; I design systems. I care deeply about <span className="text-white">data structures, memory efficiency, and the "why"</span> behind every architectural decision. Algorithms aren't just interview questions to me—they are the toolkit for scalability.</p></div>
            
            {/* Education */}
            <div className="p-5 rounded-xl bg-surface border border-white/10">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
                Education
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div>
                    <p className="text-white font-medium">BSSE @ UBIT, University of Karachi</p>
                    <p className="text-sm text-gray-500">3rd Semester · 2025 - 2028 · DSA, OOP, Backend Engineering</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-600 mt-2"></div>
                  <div>
                    <p className="text-gray-300">Intermediate (ICS) @ PECHS Foundation</p>
                    <p className="text-sm text-gray-500">2022 - 2024 · Computer Science, Mathematics</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-600 mt-2"></div>
                  <div>
                    <p className="text-gray-300">Matriculation @ Star Kids Grammar</p>
                    <p className="text-sm text-gray-500">2020 - 2022 · Computer Science · A+ Grade (90%)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-l-2 border-primary rounded-r-lg bg-quote"><p className="text-sm italic text-gray-300">"My goal is to bridge the gap between academic theory and production reality."</p></div>
          </div>
          </div>
        </SlideInRight>
      </div>
    </section>
  );
};

