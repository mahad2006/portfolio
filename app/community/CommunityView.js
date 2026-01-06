'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PageShell } from '@/components/layout/PageShell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const NetworkTopology = dynamic(() => import('@/components/system/NetworkTopology'), { ssr: false });

// Animated Counter Component
function AnimatedCounter({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const targetNum = typeof target === 'string' ? parseInt(target.replace(/[^0-9]/g, '')) : target;
    if (isNaN(targetNum)) {
      setCount(target);
      return;
    }

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * targetNum);
      setCount(currentCount);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetNum);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
}

const UBITCommunityPage = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const stats = {
    peers: 450,
    resources: 100,
  };

  const groups = [
    { name: 'Beginner Programming', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5v-10A2.5 2.5 0 0 1 6.5 2z"></path></svg> },
    { name: 'DSA & Problem Solving', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg> },
    { name: 'Mathematics & Core Subjects', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg> },
    { name: 'Web Development', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> },
    { name: 'App Development', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg> },
    { name: 'Data Science & AI', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> },
    { name: 'Cybersecurity & Ethical Hacking', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> },
    { name: 'Game Development', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 3.85l16.3 16.3M12 2a10 10 0 1 1-10 10"></path><path d="M12 12l5 5"></path></svg> },
    { name: 'Career Guidance & Internships', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> },
    { name: 'Tech Projects & Collaboration', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
  ];

  const features = [
      { title: "Peer-to-Peer Protocol", description: "A decentralized support system where students form study groups and resolve queries collaboratively, reducing dependency on single points of failure.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> },
      { title: "Legacy Documentation", description: "The community maintains a fork of the DSA Roadmap, a comprehensive guide I created, ensuring knowledge is preserved and improved upon.", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5v-10A2.5 2.5 0 0 1 6.5 2z"></path></svg> },
  ];

  return (
    <div className="min-h-screen text-gray-300 font-mono selection:bg-primary selection:text-black" style={{ backgroundColor: 'var(--bg-page)' }}>
      {/* Animated Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(109,179,63,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(109,179,63,0.04)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-[var(--border-subtle)] px-6 py-4" style={{ backgroundColor: 'rgba(var(--bg-page-rgb), 0.9)' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[9px] text-primary tracking-[0.3em] uppercase">UBIT_HUB</span>
          </div>
        </div>
      </nav>

      <PageShell title={null} backButton={true}>
        {/* Hero Section */}
        <header className="mb-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tighter uppercase">
            The<span className="text-primary">_</span>Digital<span className="text-primary">_</span>Campus
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A structured peer-learning ecosystem I founded to help UBIT students learn, collaborate, and grow together.
          </p>
          <div className="mt-12 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {mounted ? <AnimatedCounter target={stats.peers} suffix="+" /> : `${stats.peers}+`}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Connected Peers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {mounted ? <AnimatedCounter target={stats.resources} suffix="+" /> : `${stats.resources}+`}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Resources Shared</div>
            </div>
          </div>
        </header>

        {/* Network Topology Section */}
        <section className="mb-24">
            <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 tracking-[0.3em] uppercase opacity-70">
                <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent"></span>
                Network_Topology
            </h2>
            {mounted && <NetworkTopology />}
        </section>

        {/* Why I Created UBIT Hub */}
        <section className="mb-24">
            <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 tracking-[0.3em] uppercase opacity-70">
                <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent"></span>
                Mission_Objective
            </h2>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
                <p className="text-lg text-gray-400 leading-relaxed">
                At UBIT, many students struggle to find the right guidance, focused discussion spaces without distractions, and seniors or peers who can help with real problems. To solve this, I designed UBIT Hub as a well-structured learning community, not just another WhatsApp group.
                </p>
            </div>
        </section>

        {/* Community Structure */}
        <section className="mb-24">
            <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 tracking-[0.3em] uppercase opacity-70">
                <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent"></span>
                Community_Structure
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {groups.map(group => (
                    <div key={group.name} className="group relative p-6 rounded-xl bg-neutral-900 border border-neutral-800 text-center hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative text-primary w-8 h-8 mx-auto mb-4 group-hover:text-green-300 transition-colors duration-300">
                            {group.icon}
                        </div>
                        <h3 className="text-sm font-bold text-white">{group.name}</h3>
                    </div>
                ))}
            </div>
        </section>

        {/* Features Section */}
        <section className="mb-24">
            <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 tracking-[0.3em] uppercase opacity-70">
                <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent"></span>
                Core_Protocols
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                {features.map(feature => (
                    <div key={feature.title} className="group relative p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                            <div className="text-primary w-8 h-8 mb-4 group-hover:text-green-300 transition-colors duration-300">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* My Role Section */}
        <section className="mb-24">
            <h2 className="text-sm font-bold text-white mb-8 flex items-center gap-4 tracking-[0.3em] uppercase opacity-70">
                <span className="w-12 h-px bg-gradient-to-r from-primary to-transparent"></span>
                My_Role
            </h2>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
                <p className="text-lg text-gray-400 leading-relaxed">
                As the Founder & Organizer, I designed the community structure, created and managed all groups, defined and enforced group rules, guided juniors, and moderated discussions to maintain quality. This initiative reflects my interest in leadership and community-driven learning.
                </p>
            </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join the Node</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">Become part of a structured peer-learning ecosystem built by students, for students.</p>
            <div className="flex justify-center gap-4">
                <a href="https://discord.gg/YdUcFWugSz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-[#5865F2] text-white font-bold rounded-lg hover:bg-[#4f5bda] transition-all transform hover:scale-105">
                    <FontAwesomeIcon icon={faDiscord} size="lg" />
                    Join Discord
                </a>
                 <a href="https://chat.whatsapp.com/your_invite_link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#1ebe58] transition-all transform hover:scale-105">
                    <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                    Join WhatsApp
                </a>
            </div>
        </section>
      </PageShell>
    </div>
  );
};

export default UBITCommunityPage;