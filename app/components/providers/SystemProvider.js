'use client';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { SettingsModal } from '@/components/ui/SettingsModal';

export const SystemContext = createContext();

const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

const DEFAULTS = {
  isMuted: true,
  matrixActive: false,
  matrixSpeed: 5,
  accentColor: '#6DB33F',
  reduceMotion: false,
  cursorStyle: 'block',
  fontMode: 'sans',
  borderRadius: 'rounded',
};

export const SystemProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(DEFAULTS.isMuted);
  const [matrixActive, setMatrixActive] = useState(DEFAULTS.matrixActive);
  const [matrixSpeed, setMatrixSpeed] = useState(DEFAULTS.matrixSpeed);
  const [accentColor, setAccentColor] = useState(DEFAULTS.accentColor);
  const [reduceMotion, setReduceMotion] = useState(DEFAULTS.reduceMotion);
  const [cursorStyle, setCursorStyle] = useState(DEFAULTS.cursorStyle);
  const [fontMode, setFontMode] = useState(DEFAULTS.fontMode);
  const [borderRadius, setBorderRadius] = useState(DEFAULTS.borderRadius);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [audioCtx, setAudioCtx] = useState(null);

  // Load settings from localStorage
  useEffect(() => {
    const savedMuted = localStorage.getItem('sound_muted');
    if (savedMuted !== null) setIsMuted(JSON.parse(savedMuted));

    const savedMatrix = localStorage.getItem('matrix_mode');
    if (savedMatrix !== null) setMatrixActive(JSON.parse(savedMatrix));

    const savedMatrixSpeed = localStorage.getItem('matrix_speed');
    if (savedMatrixSpeed !== null) setMatrixSpeed(Number(savedMatrixSpeed));

    const savedAccentColor = localStorage.getItem('accent_color');
    if (savedAccentColor !== null) setAccentColor(savedAccentColor);

    const savedReduceMotion = localStorage.getItem('reduce_motion');
    if (savedReduceMotion !== null) setReduceMotion(JSON.parse(savedReduceMotion));

    const savedCursorStyle = localStorage.getItem('cursor_style');
    if (savedCursorStyle !== null) setCursorStyle(savedCursorStyle);

    const savedFontMode = localStorage.getItem('font_mode');
    if (savedFontMode !== null) setFontMode(savedFontMode);

    const savedBorderRadius = localStorage.getItem('border_radius');
    if (savedBorderRadius !== null) setBorderRadius(savedBorderRadius);
  }, []);

  // Save settings to localStorage
  useEffect(() => { localStorage.setItem('sound_muted', JSON.stringify(isMuted)); }, [isMuted]);
  useEffect(() => { localStorage.setItem('matrix_mode', JSON.stringify(matrixActive)); }, [matrixActive]);
  useEffect(() => { localStorage.setItem('matrix_speed', String(matrixSpeed)); }, [matrixSpeed]);
  useEffect(() => { localStorage.setItem('accent_color', accentColor); }, [accentColor]);
  useEffect(() => { localStorage.setItem('reduce_motion', JSON.stringify(reduceMotion)); }, [reduceMotion]);
  useEffect(() => { localStorage.setItem('cursor_style', cursorStyle); }, [cursorStyle]);
  useEffect(() => { localStorage.setItem('font_mode', fontMode); }, [fontMode]);
  useEffect(() => { localStorage.setItem('border_radius', borderRadius); }, [borderRadius]);

  // Apply accent color to CSS variable for instant site-wide updates
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--color-primary', accentColor);
      document.body.setAttribute('data-accent', accentColor);
    }
  }, [accentColor]);

  // Apply reduce motion preference
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (reduceMotion) {
        document.documentElement.style.setProperty('--motion-reduce', '1');
      } else {
        document.documentElement.style.setProperty('--motion-reduce', '0');
      }
    }
  }, [reduceMotion]);

  // Apply cursor style
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-cursor', cursorStyle);
      document.documentElement.style.setProperty('--cursor-style', cursorStyle);
    }
  }, [cursorStyle]);

  // Apply font mode
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-font', fontMode);
      if (fontMode === 'mono') {
        document.body.classList.add('font-mono');
        document.body.classList.remove('font-sans');
      } else {
        document.body.classList.add('font-sans');
        document.body.classList.remove('font-mono');
      }
    }
  }, [fontMode]);

  // Apply border radius
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-radius', borderRadius);
      const radiusValue = borderRadius === 'square' ? '0px' : '0.5rem';
      document.documentElement.style.setProperty('--radius', radiusValue);
    }
  }, [borderRadius]);


  useEffect(() => {
    if (!isMuted && !audioCtx && typeof window !== 'undefined') {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) setAudioCtx(new Ctx());
    }
  }, [isMuted, audioCtx]);

  const playSound = (freq = 400, duration = 0.05, type = 'sine', volume = 0.1) => {
    if (isMuted || !audioCtx) return;
    try {
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.error('Audio error', e);
    }
  };

  const playClick = () => playSound(600, 0.03, 'square', 0.05);
  const playType = () => playSound(Math.random() * 100 + 300, 0.02, 'sine', 0.03);
  const playSuccess = () => {
    playSound(400, 0.1, 'sine', 0.05);
    setTimeout(() => playSound(600, 0.1, 'sine', 0.05), 100);
  };

  const toggleMatrix = useCallback(() => setMatrixActive(prev => !prev), []);
  const toggleCommandPalette = useCallback(() => setIsCommandPaletteOpen(prev => !prev), []);
  const toggleSettingsModal = useCallback(() => setIsSettingsModalOpen(prev => !prev), []);
  const toggleDashboard = useCallback(() => setShowDashboard(prev => !prev), []);

  const resetSettings = useCallback(() => {
    setIsMuted(DEFAULTS.isMuted);
    setMatrixActive(DEFAULTS.matrixActive);
    setMatrixSpeed(DEFAULTS.matrixSpeed);
    setAccentColor(DEFAULTS.accentColor);
    setReduceMotion(DEFAULTS.reduceMotion);
    setCursorStyle(DEFAULTS.cursorStyle);
    setFontMode(DEFAULTS.fontMode);
    setBorderRadius(DEFAULTS.borderRadius);
    localStorage.removeItem('sound_muted');
    localStorage.removeItem('matrix_mode');
    localStorage.removeItem('matrix_speed');
    localStorage.removeItem('accent_color');
    localStorage.removeItem('reduce_motion');
    localStorage.removeItem('cursor_style');
    localStorage.removeItem('font_mode');
    localStorage.removeItem('border_radius');
  }, []);

  // Global keydown listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }
      if (e.shiftKey && e.key.toLowerCase() === 's') { // Changed to 's'
        e.preventDefault();
        toggleSettingsModal();
        return;
      }
      // Konami Code Logic
      if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        const newIndex = konamiIndex + 1;
        setKonamiIndex(newIndex);
        if (newIndex === konamiCode.length) {
          toggleMatrix();
          setKonamiIndex(0);
        }
      } else {
        setKonamiIndex(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandPalette, toggleSettingsModal, konamiIndex, toggleMatrix]);

  return (
    <SystemContext.Provider value={{
      isMuted, setIsMuted,
      soundEnabled: !isMuted, // Alias for clarity
      matrixActive, setMatrixActive, toggleMatrix,
      matrixSpeed, setMatrixSpeed,
      accentColor, setAccentColor,
      reduceMotion, setReduceMotion,
      cursorStyle, setCursorStyle,
      fontMode, setFontMode,
      borderRadius, setBorderRadius,
      showDashboard, setShowDashboard, toggleDashboard,
      isCommandPaletteOpen, toggleCommandPalette,
      isSettingsModalOpen, toggleSettingsModal,
      playClick, playType, playSuccess,
      resetSettings
    }}>
      {children}
      <SettingsModal isOpen={isSettingsModalOpen} onClose={toggleSettingsModal} />
    </SystemContext.Provider>
  );
};

// Hook is exported from app/hooks/useSystem.js