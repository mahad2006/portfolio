'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PageShell } from '@/components/layout/PageShell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { COMMUNITY_STATS, COMMUNITY_GROUPS, COMMUNITY_FEATURES } from '@/data/profile';

// Dynamic import with loading skeleton - prevents 200KB library from blocking initial page load
const NetworkTopology = dynamic(() => import('@/components/system/NetworkTopology'), {
    ssr: false,
    loading: () => (
        <div className="h-[300px] md:h-[400px] rounded-2xl bg-surface border border-white/10 relative overflow-hidden flex items-center justify-center">
            {/* Skeleton loader mimicking network graph */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent animate-pulse" />
            <div className="relative flex items-center justify-center gap-8">
                {/* Central node */}
                <div className="w-12 h-12 rounded-full bg-primary/20 animate-pulse" />
                {/* Surrounding nodes */}
                <div className="absolute top-0 left-1/2 w-6 h-6 rounded-full bg-primary/10 animate-pulse" style={{ animationDelay: '0.1s' }} />
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary/10 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="absolute top-1/2 right-0 w-6 h-6 rounded-full bg-primary/10 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-2 rounded-lg bg-black/50 border border-white/10">
                <span className="text-xs text-gray-500">Loading network...</span>
            </div>
        </div>
    )
});

// Icon mapping helper
const getIconComponent = (iconName: string): React.ReactElement => {
    const iconMap: Record<string, React.ReactElement> = {
        book: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5v-10A2.5 2.5 0 0 1 6.5 2z"></path></svg>,
        layers: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>,
        heart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>,
        code: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
        smartphone: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
        chart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
        shield: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
        gamepad: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 3.85l16.3 16.3M12 2a10 10 0 1 1-10 10"></path><path d="M12 12l5 5"></path></svg>,
        dollar: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>,
        users: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
    };
    return iconMap[iconName] || iconMap['book'];
};

const UBITCommunityPage = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Use centralized data
    const stats = COMMUNITY_STATS;
    const groups = COMMUNITY_GROUPS;
    const features = COMMUNITY_FEATURES;

    return (
        <PageShell title={null} headerTag="UBIT_HUB">
            {/* Animated Grid Background - hidden on mobile for performance */}
            <div className="hidden md:block fixed inset-0 overflow-hidden pointer-events-none opacity-10 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(109,179,63,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(109,179,63,0.04)_1px,transparent_1px)] bg-size-[50px_50px]"></div>
            </div>

            {/* Hero Section */}
            <header className="mb-12 md:mb-24 text-center px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-none tracking-tighter uppercase">
                    The<span className="text-primary">_</span>Digital<span className="text-primary">_</span>Campus
                </h1>
                <p className="text-sm md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    A structured peer-learning ecosystem I founded to help UBIT students learn, collaborate, and grow together.
                </p>
                <div className="mt-8 md:mt-12 flex justify-center gap-6 md:gap-8">
                    <div className="text-center">
                        <div className="text-2xl md:text-4xl font-bold text-primary">
                            {mounted ? <AnimatedCounter target={stats.peers} suffix="+" /> : `${stats.peers}+`}
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mt-1">Connected Peers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl md:text-4xl font-bold text-primary">
                            {mounted ? <AnimatedCounter target={stats.resources} suffix="+" /> : `${stats.resources}+`}
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mt-1">Resources Shared</div>
                    </div>
                </div>
            </header>

            {/* Network Topology Section */}
            <section className="mb-12 md:mb-24">
                <h2 className="text-xs md:text-sm font-bold text-white mb-4 md:mb-8 flex items-center gap-3 md:gap-4 tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-70">
                    <span className="w-8 md:w-12 h-px bg-linear-to-r from-primary to-transparent"></span>
                    Network_Topology
                </h2>
                {mounted && <NetworkTopology />}
            </section>

            {/* Why I Created UBIT Hub */}
            <section className="mb-12 md:mb-24">
                <h2 className="text-xs md:text-sm font-bold text-white mb-4 md:mb-8 flex items-center gap-3 md:gap-4 tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-70">
                    <span className="w-8 md:w-12 h-px bg-linear-to-r from-primary to-transparent"></span>
                    Mission_Objective
                </h2>
                <div className="p-4 md:p-8 rounded-xl md:rounded-2xl bg-surface border border-white/10">
                    <p className="text-sm md:text-lg text-gray-400 leading-relaxed">
                        At UBIT, many students struggle to find the right guidance, focused discussion spaces without distractions, and seniors or peers who can help with real problems. To solve this, I designed UBIT Hub as a well-structured learning community, not just another WhatsApp group.
                    </p>
                </div>
            </section>

            {/* Community Structure */}
            <section className="mb-12 md:mb-24">
                <h2 className="text-xs md:text-sm font-bold text-white mb-4 md:mb-8 flex items-center gap-3 md:gap-4 tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-70">
                    <span className="w-8 md:w-12 h-px bg-linear-to-r from-primary to-transparent"></span>
                    Community_Structure
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
                    {groups.map(group => (
                        <div key={group.name} className="group relative p-3 md:p-6 rounded-lg md:rounded-xl bg-surface border border-white/10 text-center hover:border-primary transition-colors duration-200">
                            <div className="relative text-primary w-5 h-5 md:w-8 md:h-8 mx-auto mb-2 md:mb-4">
                                {getIconComponent(group.icon)}
                            </div>
                            <h3 className="text-[10px] md:text-sm font-bold text-white leading-tight">{group.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-12 md:mb-24">
                <h2 className="text-xs md:text-sm font-bold text-white mb-4 md:mb-8 flex items-center gap-3 md:gap-4 tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-70">
                    <span className="w-8 md:w-12 h-px bg-linear-to-r from-primary to-transparent"></span>
                    Core_Protocols
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                    {features.map(feature => (
                        <div key={feature.title} className="group relative p-4 md:p-8 rounded-xl md:rounded-2xl bg-surface border border-white/10 hover:border-primary transition-colors duration-200">
                            <div className="relative">
                                <div className="text-primary w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4">{getIconComponent(feature.icon)}</div>
                                <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3">{feature.title}</h3>
                                <p className="text-sm md:text-base text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* My Role Section */}
            <section className="mb-12 md:mb-24">
                <h2 className="text-xs md:text-sm font-bold text-white mb-4 md:mb-8 flex items-center gap-3 md:gap-4 tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-70">
                    <span className="w-8 md:w-12 h-px bg-linear-to-r from-primary to-transparent"></span>
                    My_Role
                </h2>
                <div className="p-4 md:p-8 rounded-xl md:rounded-2xl bg-surface border border-white/10">
                    <p className="text-sm md:text-lg text-gray-400 leading-relaxed">
                        As the Founder & Organizer, I designed the community structure, created and managed all groups, defined and enforced group rules, guided juniors, and moderated discussions to maintain quality. This initiative reflects my interest in leadership and community-driven learning.
                    </p>
                </div>
            </section>

            {/* Social Proof - WhatsApp Screenshots */}
            <section className="mb-12 md:mb-24">
                <h2 className="text-xs md:text-sm font-bold text-white mb-4 md:mb-8 flex items-center gap-3 md:gap-4 tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-70">
                    <span className="w-8 md:w-12 h-px bg-linear-to-r from-primary to-transparent"></span>
                    Live_Preview
                </h2>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {/* Screenshot 1 */}
                    <div className="relative">
                        <div className="relative w-[160px] h-[320px] md:w-[220px] md:h-[440px] bg-zinc-900 rounded-[1.5rem] md:rounded-[2rem] p-1.5 md:p-2 shadow-xl border-2 border-zinc-800">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-24 h-4 md:h-5 bg-zinc-900 rounded-b-lg md:rounded-b-xl z-20" />
                            <div className="relative w-full h-full rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden bg-black">
                                <img src="/community/screenshot-1.jpg" alt="UBIT Hub Community" className="w-full h-full object-cover object-top" loading="lazy" />
                            </div>
                        </div>
                        <p className="text-center text-[10px] md:text-xs text-gray-500 mt-2 md:mt-4">Community Overview</p>
                    </div>

                    {/* Screenshot 2 */}
                    <div className="relative">
                        <div className="relative w-[160px] h-[320px] md:w-[220px] md:h-[440px] bg-zinc-900 rounded-[1.5rem] md:rounded-[2rem] p-1.5 md:p-2 shadow-xl border-2 border-zinc-800">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-24 h-4 md:h-5 bg-zinc-900 rounded-b-lg md:rounded-b-xl z-20" />
                            <div className="relative w-full h-full rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden bg-black">
                                <img src="/community/screenshot-2.jpg" alt="UBIT Central Hub" className="w-full h-full object-cover object-top" loading="lazy" />
                            </div>
                        </div>
                        <p className="text-center text-[10px] md:text-xs text-gray-500 mt-2 md:mt-4">372+ Active Members</p>
                    </div>

                    {/* Screenshot 3 */}
                    <div className="relative">
                        <div className="relative w-[160px] h-[320px] md:w-[220px] md:h-[440px] bg-zinc-900 rounded-[1.5rem] md:rounded-[2rem] p-1.5 md:p-2 shadow-xl border-2 border-zinc-800">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 md:w-24 h-4 md:h-5 bg-zinc-900 rounded-b-lg md:rounded-b-xl z-20" />
                            <div className="relative w-full h-full rounded-[1.2rem] md:rounded-[1.5rem] overflow-hidden bg-black">
                                <img src="/community/screenshot-3.jpg" alt="UBIT Hub Groups" className="w-full h-full object-cover object-top" loading="lazy" />
                            </div>
                        </div>
                        <p className="text-center text-[10px] md:text-xs text-gray-500 mt-2 md:mt-4">19 Structured Groups</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Join the Node</h2>
                <p className="text-sm md:text-base text-gray-400 mb-6 md:mb-8 max-w-xl mx-auto">Become part of a structured peer-learning ecosystem built by students, for students.</p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                    <a href="https://chat.whatsapp.com/G6rOqzJ0RDQ7YgURVYu8JU" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 md:gap-3 px-5 md:px-6 py-2.5 md:py-3 bg-[#25D366] text-white text-sm md:text-base font-bold rounded-lg hover:bg-[#20ba5a] transition-colors">
                        <FontAwesomeIcon icon={faWhatsapp} className="text-lg md:text-xl" />
                        Join WhatsApp
                    </a>
                    <a href="https://discord.gg/YdUcFWugSz" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 md:gap-3 px-5 md:px-6 py-2.5 md:py-3 bg-[#5865F2] text-white text-sm md:text-base font-bold rounded-lg hover:bg-[#4f5bda] transition-colors">
                        <FontAwesomeIcon icon={faDiscord} className="text-lg md:text-xl" />
                        Join Discord
                    </a>
                </div>
            </section>
        </PageShell>
    );
};

export default UBITCommunityPage;
