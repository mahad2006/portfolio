'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSystem } from '@/hooks/useSystem';
import { Switch } from '@/components/ui/Switch';
import { ColorSwatch } from '@/components/ui/ColorSwatch';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

const ACCENT_COLORS = [
  { value: '#6DB33F', label: 'Green' },
  { value: '#FF8C00', label: 'Orange' },
  { value: '#00BFFF', label: 'Blue' },
  { value: '#FF0000', label: 'Red' },
  { value: '#9400D3', label: 'Purple' },
  { value: '#FFD700', label: 'Gold' },
];

export default function SettingsPage() {
  const {
    isMuted,
    setIsMuted,
    soundEnabled,
    reduceMotion,
    setReduceMotion,
    accentColor,
    setAccentColor,
    resetSettings,
  } = useSystem();

  const [showResetModal, setShowResetModal] = useState(false);

  const handleReset = () => {
    resetSettings();
    setShowResetModal(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 font-mono selection:bg-primary selection:text-black">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="group text-xs text-gray-400 hover:text-primary transition-colors flex items-center gap-2 tracking-widest uppercase"
          >
            <span className="text-primary">root@mahad:~/settings</span>
            <span className="text-gray-500">$</span>
            <span className="group-hover:text-primary transition-colors">cd ..</span>
          </Link>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-none tracking-tighter">
            Control Center
          </h1>
          <p className="text-lg text-gray-400 border-l-2 border-primary pl-4">
            Customize your browsing experience with precision controls.
          </p>
        </header>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Appearance Section */}
          <section className="glass-panel border border-white/5 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-primary mono text-xl">01.</span>
              Appearance
            </h2>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Accent Color</h3>
              <p className="text-sm text-gray-400 mb-6">
                Choose your preferred accent color. Changes apply instantly across the site.
              </p>
              <div className="flex flex-wrap gap-4">
                {ACCENT_COLORS.map((color) => (
                  <ColorSwatch
                    key={color.value}
                    color={color.value}
                    isActive={accentColor === color.value}
                    onClick={() => setAccentColor(color.value)}
                    label={color.label}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Interface Section */}
          <section className="glass-panel border border-white/5 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-primary mono text-xl">02.</span>
              Interface
            </h2>
            
            <div className="space-y-4">
              <Switch
                enabled={soundEnabled}
                onChange={() => setIsMuted(!isMuted)}
                label="Sound Effects"
                description="Enable or disable UI sound effects and audio feedback."
              />
              
              <Switch
                enabled={reduceMotion}
                onChange={() => setReduceMotion(!reduceMotion)}
                label="Reduced Motion"
                description="Reduce animations and motion effects for better accessibility."
              />
            </div>
          </section>

          {/* Data Section */}
          <section className="glass-panel border border-white/5 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-primary mono text-xl">03.</span>
              Data
            </h2>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-400 mb-4">
                Reset all settings to their default values. This action cannot be undone.
              </p>
              <button
                onClick={() => setShowResetModal(true)}
                className="w-full px-6 py-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-bold hover:bg-red-500/20 hover:border-red-500/50 transition-all"
              >
                Reset to Defaults
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleReset}
        title="Reset Settings?"
        message="This will reset all your preferences to default values. Are you sure you want to continue?"
        confirmText="Reset"
        cancelText="Cancel"
        danger={true}
      />
    </div>
  );
}
