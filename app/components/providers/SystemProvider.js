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
  accentColor: 'green',
};

export const SystemProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(DEFAULTS.isMuted);
  const [matrixActive, setMatrixActive] = useState(DEFAULTS.matrixActive);
  const [matrixSpeed, setMatrixSpeed] = useState(DEFAULTS.matrixSpeed);
  const [accentColor, setAccentColor] = useState(DEFAULTS.accentColor);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
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
  }, []);

  // Save settings to localStorage
  useEffect(() => { localStorage.setItem('sound_muted', JSON.stringify(isMuted)); }, [isMuted]);
  useEffect(() => { localStorage.setItem('matrix_mode', JSON.stringify(matrixActive)); }, [matrixActive]);
  useEffect(() => { localStorage.setItem('matrix_speed', String(matrixSpeed)); }, [matrixSpeed]);
  useEffect(() => { localStorage.setItem('accent_color', accentColor); }, [accentColor]);

  // Apply accent color to the body element
  useEffect(() => {
    document.body.setAttribute('data-accent', accentColor);
  }, [accentColor]);


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

  const resetSettings = useCallback(() => {
    setIsMuted(DEFAULTS.isMuted);
    setMatrixActive(DEFAULTS.matrixActive);
    setMatrixSpeed(DEFAULTS.matrixSpeed);
    setAccentColor(DEFAULTS.accentColor);
    localStorage.removeItem('sound_muted');
    localStorage.removeItem('matrix_mode');
    localStorage.removeItem('matrix_speed');
    localStorage.removeItem('accent_color');
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
      matrixActive, setMatrixActive, toggleMatrix,
      matrixSpeed, setMatrixSpeed,
      accentColor, setAccentColor,
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