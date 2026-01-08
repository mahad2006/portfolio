import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Navbar, Hero, JsonLd, PrintStyles, ScrollToTop } from '@/components';
import { generatePageMetadata } from '@/components/layout/pageMetadata';

// Core sections - loaded immediately or with priority
const Projects = dynamic(() => import('@/components/sections/Projects').then(mod => mod.Projects));
const Experience = dynamic(() => import('@/components/sections/Experience').then(mod => mod.Experience));
const About = dynamic(() => import('@/components/sections/About').then(mod => mod.About));
const Connect = dynamic(() => import('@/components/sections/Connect').then(mod => mod.Connect));
const Footer = dynamic(() => import('@/components/layout/Footer').then(mod => mod.Footer));

// Utility components
const CommandPalette = dynamic(() => import('@/components/ui/CommandPalette'));

export const metadata = generatePageMetadata('home');

// More Section CTA Component
const MoreSectionCTA = () => (
  <section className="py-12 md:py-16 bg-[#080808]">
    <div className="max-w-4xl mx-auto px-4 md:px-6">
      <Link
        href="/more"
        className="group block card-base rounded-xl md:rounded-2xl p-6 md:p-8 transition-all duration-300 hover:border-primary/50"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
              Want to know more?
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              Explore my tech stack, engineering philosophy, writing, and community impact
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
            <span className="px-3 py-1.5 rounded-full bg-white/5 text-gray-400 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              Stack
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 text-gray-400 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              Philosophy
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 text-gray-400 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Writing
            </span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium">
          Explore More
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      </Link>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      {/* Fixed elements - MUST be outside any transformed container */}
      <Navbar />
      <ScrollToTop />

      {/* Scrollable content */}
      <div className="antialiased selection:bg-primary selection:text-black min-h-screen">
        {/* Invisible & Utility Components */}
        <JsonLd />
        <PrintStyles />

        <main>
          <Hero />
          <Projects />
          <Experience />
          <About />
          <MoreSectionCTA />
          <Connect />
        </main>
        <Footer />
      </div>
    </>
  );
}
