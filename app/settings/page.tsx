'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystem } from '@/hooks/useSystem';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { PageShell } from '@/components/layout/PageShell';
import { ACCENT_COLORS } from '@/config/theme';
import { AUTHOR_NAME } from '@/config/site';
import {
  SectionHeader,
  SettingCard,
  SettingRow,
  ToggleSwitch,
  SegmentedControl,
} from '@/components/settings';

// ============================================================================
// Premium UI Components
// ============================================================================

// Premium Color Picker
const ColorPicker = ({ colors, value, onChange, playClick }) => {
  const [hoveredColor, setHoveredColor] = useState(null);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {colors.map((color) => {
          const isActive = value === color.value;
          const isHovered = hoveredColor === color.value;
          
          return (
            <motion.button
              key={color.id}
              onClick={() => {
                playClick?.();
                onChange(color.value);
              }}
              onMouseEnter={() => setHoveredColor(color.value)}
              onMouseLeave={() => setHoveredColor(null)}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Color circle */}
              <div
                className={`w-12 h-12 rounded-xl transition-all duration-300 ${
                  isActive ? 'ring-2 ring-white ring-offset-4 ring-offset-[#0a0a0a]' : ''
                }`}
                style={{ 
                  backgroundColor: color.value,
                  boxShadow: isActive || isHovered 
                    ? `0 0 30px ${color.value}60, 0 8px 20px ${color.value}40` 
                    : `0 4px 12px ${color.value}20`
                }}
              >
                {/* Checkmark */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Label */}
              <span className={`block text-[10px] mt-2 text-center transition-colors ${
                isActive ? 'text-white font-medium' : 'text-gray-500'
              }`}>
                {color.label}
              </span>
            </motion.button>
          );
        })}
      </div>
      
      {/* Preview bar */}
      <motion.div 
        className="h-2 rounded-full mt-4"
        style={{ backgroundColor: value }}
        layoutId="color-preview"
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />
    </div>
  );
};

// Theme Preset Cards
const ThemePreset = ({ name, description, colors, isActive, onClick, icon }) => (
  <motion.button
    onClick={onClick}
    className={`relative w-full p-4 rounded-2xl border text-left transition-all ${
      isActive 
        ? 'border-primary bg-primary/10' 
        : 'border-white/6 bg-white/2 hover:border-white/12 hover:bg-white/4'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">{icon}</div>
      <div className="flex-1">
        <h4 className={`font-semibold mb-1 ${isActive ? 'text-primary' : 'text-white'}`}>{name}</h4>
        <p className="text-xs text-gray-500 mb-3">{description}</p>
        <div className="flex gap-1">
          {colors.map((color, i) => (
            <div 
              key={i} 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
    {isActive && (
      <div className="absolute top-3 right-3">
        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
    )}
  </motion.button>
);

// Stats Badge
const StatsBadge = ({ label, value, icon }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/2 border border-white/4">
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
    </div>
  </div>
);

// ============================================================================
// Theme Presets
// ============================================================================

// SVG Icons for Theme Presets
const Icons = {
  developer: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  minimal: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  creative: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  hacker: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  presets: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  palette: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  ),
  interface: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
  effects: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  export: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  ),
  tips: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  soundOn: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
  ),
  soundOff: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
    </svg>
  ),
  play: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  pause: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  heart: (
    <svg className="w-3 h-3 inline" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  ),
};

const THEME_PRESETS = [
  {
    id: 'developer',
    name: 'Developer',
    description: 'Clean and focused for coding',
    icon: Icons.developer,
    settings: { accentColor: '#6DB33F', fontMode: 'mono', reduceMotion: false }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Distraction-free experience',
    icon: Icons.minimal,
    settings: { accentColor: '#64748b', fontMode: 'sans', reduceMotion: true }
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and expressive',
    icon: Icons.creative,
    settings: { accentColor: '#d946ef', fontMode: 'sans', reduceMotion: false }
  },
  {
    id: 'hacker',
    name: 'Hacker',
    description: 'Matrix-style terminal vibes',
    icon: Icons.hacker,
    settings: { accentColor: '#22c55e', fontMode: 'mono', reduceMotion: false }
  },
];

// ============================================================================
// Main Settings Page
// ============================================================================

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
    reduceMotion,
    setReduceMotion,
    matrixActive,
    setMatrixActive,
    resetSettings,
    playClick,
  } = useSystem();

  const [showResetModal, setShowResetModal] = useState(false);
  const [activePreset, setActivePreset] = useState(null);
  const [copied, setCopied] = useState(false);

  // Detect current preset
  useEffect(() => {
    const current = THEME_PRESETS.find(preset => 
      preset.settings.accentColor === accentColor &&
      preset.settings.fontMode === fontMode &&
      preset.settings.reduceMotion === reduceMotion
    );
    setActivePreset(current?.id || null);
  }, [accentColor, fontMode, reduceMotion]);

  const handleReset = () => {
    resetSettings();
    setShowResetModal(false);
  };

  const applyPreset = (preset) => {
    playClick?.();
    setAccentColor(preset.settings.accentColor);
    setFontMode(preset.settings.fontMode);
    setReduceMotion(preset.settings.reduceMotion);
    setActivePreset(preset.id);
  };

  const exportSettings = () => {
    const settings = {
      accentColor,
      fontMode,
      cursorStyle,
      reduceMotion,
      soundEnabled,
      matrixActive,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(settings, null, 2);
  };

  const copySettings = async () => {
    try {
      await navigator.clipboard.writeText(exportSettings());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <PageShell
      title=""
      headerTag="SYSTEM_CONFIGURATION"
      hideActions
    >
      {/* Hero Section */}
      <div className="mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-white/6 bg-linear-to-br from-white/4 to-transparent p-8 md:p-12"
        >
          {/* Background gradient */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{ 
              background: `radial-gradient(ellipse at top right, ${accentColor}30 0%, transparent 50%)` 
            }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}20`, border: `1px solid ${accentColor}40` }}
              >
                <svg className="w-7 h-7" style={{ color: accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">Settings</h1>
                <p className="text-gray-500 text-sm">Customize your experience</p>
              </div>
            </div>
            
            <p className="text-gray-400 max-w-xl leading-relaxed mb-6">
              Make {AUTHOR_NAME}'s portfolio truly yours. Customize colors, typography, 
              animations, and more to create your perfect browsing experience.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatsBadge 
                label="Theme Color" 
                value={ACCENT_COLORS.find(c => c.value === accentColor)?.label || 'Custom'} 
                icon={<div className="w-4 h-4 rounded-full" style={{ backgroundColor: accentColor }} />}
              />
              <StatsBadge 
                label="Font Style" 
                value={fontMode === 'mono' ? 'Monospace' : 'Sans-Serif'} 
                icon={<span className="text-sm">Aa</span>}
              />
              <StatsBadge 
                label="Sound" 
                value={soundEnabled ? 'Enabled' : 'Muted'} 
                icon={soundEnabled ? Icons.soundOn : Icons.soundOff}
              />
              <StatsBadge 
                label="Motion" 
                value={reduceMotion ? 'Reduced' : 'Full'} 
                icon={reduceMotion ? Icons.pause : Icons.play}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Settings Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Theme Presets */}
          <SettingCard>
            <SectionHeader 
              icon={Icons.presets}
              title="Theme Presets"
              description="Quick-apply curated theme combinations"
              accentColor={accentColor}
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {THEME_PRESETS.map((preset) => (
                <ThemePreset
                  key={preset.id}
                  {...preset}
                  colors={[preset.settings.accentColor, '#ffffff', '#0a0a0a']}
                  isActive={activePreset === preset.id}
                  onClick={() => applyPreset(preset)}
                />
              ))}
            </div>
          </SettingCard>

          {/* Accent Color */}
          <SettingCard>
            <SectionHeader 
              icon={Icons.palette}
              title="Accent Color"
              description="Choose your primary interface color"
              accentColor={accentColor}
            />
            <ColorPicker 
              colors={ACCENT_COLORS} 
              value={accentColor} 
              onChange={setAccentColor}
              playClick={playClick}
            />
          </SettingCard>

          {/* Interface Settings */}
          <SettingCard>
            <SectionHeader 
              icon={Icons.interface}
              title="Interface"
              description="Customize how the interface looks and feels"
              accentColor={accentColor}
            />
            
            <SettingRow
              label="Typography"
              description="Choose between modern sans-serif or classic monospace"
            >
              <SegmentedControl
                options={[
                  { value: 'sans', label: 'Sans', icon: 'Aa' },
                  { value: 'mono', label: 'Mono', icon: '</>' },
                ]}
                value={fontMode}
                onChange={(value) => setFontMode(value as 'sans' | 'mono')}
              />
            </SettingRow>

            <SettingRow
              label="Cursor Style"
              description="Terminal cursor appearance in code blocks"
            >
              <SegmentedControl
                options={[
                  { value: 'block', label: 'Block', icon: '█' },
                  { value: 'underline', label: 'Line', icon: '_' },
                  { value: 'bar', label: 'Bar', icon: '│' },
                ]}
                value={cursorStyle}
                onChange={(value) => setCursorStyle(value as 'block' | 'underline' | 'bar')}
              />
            </SettingRow>

            <SettingRow
              label="Reduce Motion"
              description="Minimize animations for accessibility or preference"
            >
              <ToggleSwitch isOn={reduceMotion} onToggle={() => setReduceMotion(!reduceMotion)} ariaLabel="Toggle reduce motion" />
            </SettingRow>

            <SettingRow
              label="Sound Effects"
              description="UI interaction sounds and audio feedback"
            >
              <ToggleSwitch isOn={soundEnabled} onToggle={() => setIsMuted(!isMuted)} ariaLabel="Toggle sound effects" />
            </SettingRow>
          </SettingCard>

          {/* Effects & Extras */}
          <SettingCard>
            <SectionHeader 
              icon={Icons.effects}
              title="Effects & Extras"
              description="Special visual effects and easter eggs"
              accentColor={accentColor}
            />
            
            <SettingRow
              label="Matrix Mode"
              description="Enable falling code rain effect (or use Konami code ↑↑↓↓←→←→BA)"
            >
              <ToggleSwitch isOn={matrixActive} onToggle={() => setMatrixActive(!matrixActive)} ariaLabel="Toggle matrix rain effect" />
            </SettingRow>

            <SettingRow
              label="Keyboard Shortcuts"
              description="Quick actions available anywhere"
              preview={
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Command Palette</span>
                    <kbd className="px-2 py-1 rounded bg-white/10 text-gray-300 font-mono">⌘ K</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Settings</span>
                    <kbd className="px-2 py-1 rounded bg-white/10 text-gray-300 font-mono">⇧ S</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Matrix Mode</span>
                    <kbd className="px-2 py-1 rounded bg-white/10 text-gray-300 font-mono text-[10px]">↑↑↓↓←→←→BA</kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Navigate</span>
                    <kbd className="px-2 py-1 rounded bg-white/10 text-gray-300 font-mono">Tab</kbd>
                  </div>
                </div>
              }
            />
          </SettingCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Export/Import */}
          <SettingCard>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              {Icons.export} Export Settings
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Save your current configuration to share or backup.
            </p>
            <button
              onClick={copySettings}
              className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: copied ? '#22c55e20' : `${accentColor}15`,
                border: `1px solid ${copied ? '#22c55e40' : `${accentColor}30`}`,
                color: copied ? '#22c55e' : accentColor
              }}
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy to Clipboard
                </>
              )}
            </button>
          </SettingCard>

          {/* Quick Info */}
          <SettingCard>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-primary">{Icons.tips}</span> Pro Tips
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">→</span>
                <span>Settings are automatically saved to your browser</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">→</span>
                <span>Use <kbd className="px-1 rounded bg-white/10 text-xs">⌘K</kbd> to quickly search anything</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">→</span>
                <span>Try the Konami code for a surprise effect</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">→</span>
                <span>Reduce motion for a calmer experience</span>
              </li>
            </ul>
          </SettingCard>

          {/* Danger Zone */}
          <SettingCard className="border-red-500/20 bg-red-500/2">
            <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
              {Icons.warning} Danger Zone
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Reset all settings to their default values. This cannot be undone.
            </p>
            <button
              onClick={() => setShowResetModal(true)}
              className="w-full py-3 px-4 rounded-xl font-medium bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-200"
            >
              Reset All Settings
            </button>
          </SettingCard>

          {/* Version Info */}
          <div className="text-center text-xs text-gray-600">
            <p>Settings v1.0</p>
            <p className="mt-1">Made with <span className="text-red-500">{Icons.heart}</span> by {AUTHOR_NAME}</p>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleReset}
        title="Reset All Settings?"
        message="This will restore all preferences to their default values. Your customizations will be lost."
        confirmText="Reset Everything"
        cancelText="Keep Settings"
        danger={true}
      />
    </PageShell>
  );
}
