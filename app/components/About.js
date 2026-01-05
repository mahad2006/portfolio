'use client';
import React from 'react';
import Image from 'next/image';

export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative group perspective-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-[#E76F00] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-[4/5] md:aspect-square transform transition-transform duration-500 group-hover:scale-[1.01] shadow-2xl">
            <Image src="/profile.png" alt="Shaikh Mahad" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" priority={true} />
            <div className="hidden w-full h-full absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex-col items-center justify-center text-center p-8"><span className="text-6xl mb-4">👨‍💻</span><p className="text-gray-500 text-xs mono">Profile.png</p></div>
          </div>
        </div>
        <div className="space-y-8 animate-fade-up">
          <h2 className="text-3xl font-bold flex items-center gap-3"><span className="text-primary mono text-2xl">01.</span> About Me</h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <div><h3 className="text-white font-bold mb-2 text-xl">The Journey to Backend</h3><p>I started in native Android development, obsessing over user experience. But as I built more complex apps, I realized the real magic happens on the server. I shifted my focus to <span className="text-white">backend engineering</span> to build the robust systems that power great products.</p></div>
            <div><h3 className="text-white font-bold mb-2 text-xl">How I Think</h3><p>I don't just write code; I design systems. I care deeply about <span className="text-white">data structures, memory efficiency, and the "why"</span> behind every architectural decision. Algorithms aren't just interview questions to me—they are the toolkit for scalability.</p></div>
            <div className="p-4 bg-white/[0.03] border-l-2 border-primary rounded-r-lg"><p className="text-sm italic text-gray-300">"My goal is to bridge the gap between academic theory and production reality."</p></div>
          </div>
        </div>
      </div>
    </section>
  );
};
