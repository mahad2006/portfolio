'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSystem } from '@/hooks/useSystem';
import { PillButton } from '@/components/ui/PillButton';
import { ColorSwatch } from '@/components/ui/ColorSwatch';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

const ACCENT_COLORS = [
  { value: '#6DB33F', label: 'Green' },
  { value: '#06b6d4', label: 'Cyan' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#FF8C00', label: 'Orange' },
  { value: '#00BFFF', label: 'Blue' },
  { value: '#FF0000', label: 'Red' },
  { value: '#9400D3', label: 'Purple (Old)' },
  { value: '#FFD700', label: 'Gold' },
];

const SettingRow = ({ label, children, description }) => (
  <div className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
    <div className="flex-1 min-w-0 pr-8">
      <h3 className="text-white font-medium text-base mb-1">{label}</h3>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
    <div className="flex items-center gap-2 flex-shrink-0">
      {children}
    </div>
  </div>
);

export default function SettingsPage() {
  const {
    isMuted,
    setIsMuted,
    soundEnabled,
    accentColor,
    setAccentColor,
    cursorStyle,
    setCursorStyle,
    fontMode,
    setFontMode,
    borderRadius,
    setBorderRadius,
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

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-24">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-none tracking-tighter">
            Config Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Customize your experience with precision controls
          </p>
        </header>

        {/* Settings Container */}
        <div className="glass-panel border border-white/10 rounded-xl overflow-hidden">
          {/* Appearance Section */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-white/10">
              Appearance
            </h2>
            
            <div className="space-y-0">
              <SettingRow
                label="Accent Color"
                description="Primary color used throughout the interface"
              >
                <div className="flex items-center gap-3">
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
              </SettingRow>

              <SettingRow
                label="Font Mode"
                description="Choose between sans-serif and monospace fonts"
              >
                <PillButton
                  label="Sans"
                  isActive={fontMode === 'sans'}
                  onClick={() => setFontMode('sans')}
                />
                <PillButton
                  label="Mono"
                  isActive={fontMode === 'mono'}
                  onClick={() => setFontMode('mono')}
                />
              </SettingRow>

              <SettingRow
                label="Border Radius"
                description="Control the roundness of UI elements"
              >
                <PillButton
                  label="Rounded"
                  isActive={borderRadius === 'rounded'}
                  onClick={() => setBorderRadius('rounded')}
                />
                <PillButton
                  label="Square"
                  isActive={borderRadius === 'square'}
                  onClick={() => setBorderRadius('square')}
                />
              </SettingRow>
            </div>
          </div>

          {/* Interface Section */}
          <div className="p-6 border-t border-white/10">
            <h2 className="text-lg font-semibold text-white mb-6 pb-2 border-b border-white/10">
              Interface
            </h2>
            
            <div className="space-y-0">
              <SettingRow
                label="Sound"
                description="Enable or disable UI sound effects"
              >
                <PillButton
                  label="On"
                  isActive={soundEnabled}
                  onClick={() => setIsMuted(false)}
                />
                <PillButton
                  label="Off"
                  isActive={!soundEnabled}
                  onClick={() => setIsMuted(true)}
                />
              </SettingRow>

              <SettingRow
                label="Cursor Style"
                description="Visual style of the text cursor"
              >
                <PillButton
                  label="Block █"
                  isActive={cursorStyle === 'block'}
                  onClick={() => setCursorStyle('block')}
                />
                <PillButton
                  label="Line |"
                  isActive={cursorStyle === 'line'}
                  onClick={() => setCursorStyle('line')}
                />
                <PillButton
                  label="Underline _"
                  isActive={cursorStyle === 'underline'}
                  onClick={() => setCursorStyle('underline')}
                />
              </SettingRow>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="p-6 border-t border-red-500/20 bg-red-500/5">
            <h2 className="text-lg font-semibold text-red-400 mb-6 pb-2 border-b border-red-500/20">
              Danger Zone
            </h2>
            
            <div className="space-y-0">
              <SettingRow
                label="Reset to Defaults"
                description="This will reset all settings to their default values. This action cannot be undone."
              >
                <button
                  onClick={() => setShowResetModal(true)}
                  className="px-6 py-2 rounded-lg text-sm font-medium bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                >
                  Reset All
                </button>
              </SettingRow>
            </div>
          </div>
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
