import {
  Navbar,
  Hero,
  About,
  Philosophy,
  Projects,
  Stack,
  Writing,
  CommandPalette,
  Impact,
  Experience,
  Connect,
  Footer,
  ScrollToTop, // New Import
  JsonLd,      // New Import
  PrintStyles  // New Import
} from './components';

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