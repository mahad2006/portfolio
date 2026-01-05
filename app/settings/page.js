'use client';
import React from 'react';
import Link from 'next/link';
import { useSystem } from '@/app/components/SystemProvider';

const Toggle = ({ label, description, isEnabled, onToggle }) => (
  <div className="flex justify-between items-center p-6 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-white/20 transition-colors">
    <div>
      <h3 className="text-white font-bold">{label}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <button
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${isEnabled ? 'bg-primary' : 'bg-white/10'}`}
      aria-label={`Toggle ${label}`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg-black rounded-full transition-transform duration-300 ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`}
      ></span>
    </button>
  </div>
);

const SettingsPage = () => {
  const { isMuted, setIsMuted, matrixActive, toggleMatrix } = useSystem();

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono selection:bg-primary selection:text-black">
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="group text-xs text-gray-400 hover:text-primary transition-colors flex items-center gap-2 tracking-widest uppercase">
            <span className="text-green-400">root@mahad:~/settings</span>
            <span className="text-gray-500">$</span>
            <span className="group-hover:text-orange-400 transition-colors">cd ..</span>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24">
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-none tracking-tighter">
            System_Settings
          </h1>
          <p className="text-lg text-gray-400 border-l-2 border-primary pl-4">
            Customize your browsing experience.
          </p>
        </header>

        <div className="space-y-6">
          <Toggle
            label="Sound Effects"
            description="Enable or disable UI sound effects."
            isEnabled={!isMuted}
            onToggle={() => setIsMuted(!isMuted)}
          />
          <Toggle
            label="Matrix Mode"
            description="Toggle the falling green code background."
            isEnabled={matrixActive}
            onToggle={toggleMatrix}
          />
          {/* Add more settings here in the future */}
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;