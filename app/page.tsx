import dynamic from 'next/dynamic';
import { Navbar, Hero, JsonLd, PrintStyles, ScrollToTop } from '@/components';
import { generatePageMetadata } from '@/components/layout/pageMetadata';

const About = dynamic(() => import('@/components/sections/About').then(mod => mod.About));
const Philosophy = dynamic(() => import('@/components/sections/Philosophy').then(mod => mod.Philosophy));
const Projects = dynamic(() => import('@/components/sections/Projects').then(mod => mod.Projects));
const Stack = dynamic(() => import('@/components/sections/Stack').then(mod => mod.Stack));
const Writing = dynamic(() => import('@/components/sections/Writing').then(mod => mod.Writing));
const CommandPalette = dynamic(() => import('@/components/ui/CommandPalette'));
const Impact = dynamic(() => import('@/components/sections/Impact').then(mod => mod.Impact));
const Experience = dynamic(() => import('@/components/sections/Experience').then(mod => mod.Experience));
const Connect = dynamic(() => import('@/components/sections/Connect').then(mod => mod.Connect));
const Footer = dynamic(() => import('@/components/layout/Footer').then(mod => mod.Footer));

export const metadata = generatePageMetadata('home');

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

        {/* Visible Content */}
        <main>
          <Hero />
          <About />
          <Philosophy />
          <Projects />
          <Stack />
          <Writing />
          <Impact />
          <Experience />
          <Connect />
        </main>
        <Footer />
      </div>
    </>
  );
}
