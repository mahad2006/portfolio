import dynamic from 'next/dynamic';
import { Navbar, Hero, JsonLd, PrintStyles, ScrollToTop } from '@/app/components';

const About = dynamic(() => import('@/app/components/About').then(mod => mod.About));
const Philosophy = dynamic(() => import('@/app/components/Philosophy').then(mod => mod.Philosophy));
const Projects = dynamic(() => import('@/app/components/Projects').then(mod => mod.Projects));
const Stack = dynamic(() => import('@/app/components/Stack').then(mod => mod.Stack));
const Writing = dynamic(() => import('@/app/components/Writing').then(mod => mod.Writing));
const CommandPalette = dynamic(() => import('@/app/components/CommandPalette'));
const Impact = dynamic(() => import('@/app/components/Impact').then(mod => mod.Impact));
const Experience = dynamic(() => import('@/app/components/Experience').then(mod => mod.Experience));
const Connect = dynamic(() => import('@/app/components/Connect').then(mod => mod.Connect));
const Footer = dynamic(() => import('@/app/components/Footer').then(mod => mod.Footer));

export const metadata = {
  title: 'Shaikh Mahad - Backend Engineer',
  description: 'The portfolio of Shaikh Mahad, a backend engineer specializing in scalable systems and performance optimization.',
};

export default function Home() {
  return (
    <div className="antialiased selection:bg-primary selection:text-black min-h-screen">
      {/* Invisible & Utility Components */}
      <JsonLd />
      <PrintStyles />
      <ScrollToTop />

      {/* Visible Content */}
      <Navbar />
      <Hero />
      <About />
      <Philosophy />
      <Projects />
      <Stack />
      <Writing />
      <CommandPalette />
      <Impact />
      <Experience />
      <Connect />
      <Footer />
    </div>
  );
}