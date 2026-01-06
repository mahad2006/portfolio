'use client';
import React from 'react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';

const testimonials = [
  {
    quote: "Mahad helped me understand Programming Fundamentals when I was struggling in my first semester. The way he breaks down complex topics into simple explanations made everything click. He's always willing to help others in UBIT Hub.",
    name: "Nabeerah Yaqoot",
    initials: "NY",
    role: "Batchmate, BSSE @ UBIT"
  },
  {
    quote: "When we were working on our semester project, Mahad guided us through Git and proper project structure. He doesn't just code well — he actually teaches you why things work the way they do. Super patient with beginners.",
    name: "M. Khan",
    initials: "MK",
    role: "Batchmate, BSSE @ UBIT"
  }
];

export const Impact = () => {
  return (
    <section className="py-24 relative bg-black/40">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-2">Batchmate Testimonials</h2>
            <p className="text-gray-400">Feedback from peers I've helped along the way.</p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.2}>
          {testimonials.map((item, idx) => (
            <StaggerItem key={idx}>
              <SpotlightCard className="p-8 rounded-2xl border border-white/5 bg-[#0a0a0a] relative flex flex-col h-full">
                <span className="absolute top-4 left-6 text-6xl text-primary opacity-20 serif">"</span>
                <p className="text-gray-300 text-lg italic leading-relaxed relative z-10 mb-6 flex-grow">{item.quote}</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-white">{item.initials}</div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.role}</p>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

