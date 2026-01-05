'use client';

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BootScreen, MatrixRain, RequestLogger, CommandPalette, useSystem, ScrollProgressBar } from './';

export default function ClientLayout({ children }) {
  const { isCommandPaletteOpen, toggleCommandPalette } = useSystem();

  const handleNavigate = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ScrollProgressBar />
      <MatrixRain />
      <BootScreen />
      <RequestLogger />
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={toggleCommandPalette}
        onNavigate={handleNavigate}
      />
      <main className="relative z-10">
        {children}
      </main>
      <Analytics />
      <SpeedInsights />
    </>
  );
}