import {
  Navbar,
  Hero,
  About,
  Philosophy,
  Projects,
  Stack,
  Writing,
  Impact,
  Experience,
  Connect,
  Footer,
  ScrollToTop, // New Import
  JsonLd,      // New Import
  PrintStyles  // New Import
} from './components/Portfolio';

export default function Home() {
  return (
    <div className="antialiased selection:bg-[#6DB33F] selection:text-black min-h-screen bg-[#050505]">
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
      <Impact />
      <Experience />
      <Connect />
      <Footer />
    </div>
  );
}