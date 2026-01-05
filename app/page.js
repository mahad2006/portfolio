import dynamic from 'next/dynamic';
import { Navbar, Hero, JsonLd, PrintStyles, ScrollToTop } from './components';

const About = dynamic(() => import('./components/About').then(mod => mod.About));
const Philosophy = dynamic(() => import('./components/Philosophy').then(mod => mod.Philosophy));
const Projects = dynamic(() => import('./components/Projects').then(mod => mod.Projects));
const Stack = dynamic(() => import('./components/Stack').then(mod => mod.Stack));
const Writing = dynamic(() => import('./components/Writing').then(mod => mod.Writing));
const CommandPalette = dynamic(() => import('./components/CommandPalette'));
const Impact = dynamic(() => import('./components/Impact').then(mod => mod.Impact));
const Experience = dynamic(() => import('./components/Experience').then(mod => mod.Experience));
const Connect = dynamic(() => import('./components/Connect').then(mod => mod.Connect));
const Footer = dynamic(() => import('./components/Footer').then(mod => mod.Footer));

export const metadata = {
  title: 'Shaikh Mahad - Backend Engineer',
  description: 'The portfolio of Shaikh Mahad, a backend engineer specializing in scalable systems and performance optimization.',
};

export default function Home() {
  return (
    <div className="antialiased selection:bg-[#6DB33F] selection:text-black min-h-screen">
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