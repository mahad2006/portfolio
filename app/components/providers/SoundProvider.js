'use client';
import React, { createContext, useState, useEffect } from 'react';

export const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [audioCtx, setAudioCtx] = useState(null);

  useEffect(() => {
    if (!isMuted && !audioCtx) {
      setAudioCtx(new (window.AudioContext || window.webkitAudioContext)());
    }
  }, [isMuted, audioCtx]);

  const playSound = (freq = 400, duration = 0.05, type = 'sine', volume = 0.1) => {
    if (isMuted || !audioCtx) return;

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
  };

  const playClick = () => playSound(600, 0.03, 'square', 0.05);
  const playType = () => playSound(Math.random() * 100 + 300, 0.02, 'sine', 0.03);
  const playSuccess = () => {
    playSound(400, 0.1, 'sine', 0.05);
    setTimeout(() => playSound(600, 0.1, 'sine', 0.05), 100);
  };

  return (
    <SoundContext.Provider value={{ isMuted, setIsMuted, playClick, playType, playSuccess }}>
      {children}
    </SoundContext.Provider>
  );
};

// Hook is exported from app/hooks/useSound.js
