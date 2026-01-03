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
  Connect
} from './components/Portfolio';

export default function Home() {
  return (
    <div className="antialiased selection:bg-[#6DB33F] selection:text-black min-h-screen bg-[#050505]">
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
    </div>
  );
}