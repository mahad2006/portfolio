'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SystemContext = createContext();

const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export const SystemProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [matrixActive, setMatrixActive] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [audioCtx, setAudioCtx] = useState(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);

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

  const toggleMatrix = useCallback(() => {
    setMatrixActive(prev => {
      if (!prev) playSuccess();
      else playClick();
      return !prev;
    });
  }, [playSuccess, playClick]);

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
    playClick();
  };

  const toggleCommandPalette = useCallback(() => {
    setIsCommandPaletteOpen(prev => !prev);
    playClick();
  }, [playClick]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }

      // Konami Code Logic
      if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
        setKonamiIndex(prevIndex => prevIndex + 1);
        if (konamiIndex + 1 === konamiCode.length) {
          toggleMatrix();
          setKonamiIndex(0); // Reset for next time
        }
      } else {
        setKonamiIndex(0); // Reset if wrong key is pressed
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleCommandPalette, konamiIndex, toggleMatrix]);

  return (
    <SystemContext.Provider value={{ 
      isMuted, setIsMuted, 
      matrixActive, setMatrixActive, toggleMatrix,
      showDashboard, setShowDashboard, toggleDashboard,
      isCommandPaletteOpen, toggleCommandPalette,
      playClick, playType, playSuccess
    }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => useContext(SystemContext);