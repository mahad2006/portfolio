'use client';
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Type definitions
export type CursorStyle = 'block' | 'underline' | 'bar';
export type FontMode = 'sans' | 'mono';
export type BorderRadius = 'rounded' | 'square';
export type OscillatorType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export interface SystemContextType {
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
  soundEnabled: boolean;
  matrixActive: boolean;
  setMatrixActive: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMatrix: () => void;
  matrixSpeed: number;
  setMatrixSpeed: React.Dispatch<React.SetStateAction<number>>;
  accentColor: string;
  setAccentColor: React.Dispatch<React.SetStateAction<string>>;
  reduceMotion: boolean;
  setReduceMotion: React.Dispatch<React.SetStateAction<boolean>>;
  cursorStyle: CursorStyle;
  setCursorStyle: React.Dispatch<React.SetStateAction<CursorStyle>>;
  fontMode: FontMode;
  setFontMode: React.Dispatch<React.SetStateAction<FontMode>>;
  borderRadius: BorderRadius;
  setBorderRadius: React.Dispatch<React.SetStateAction<BorderRadius>>;
  showDashboard: boolean;
  setShowDashboard: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDashboard: () => void;
  isCommandPaletteOpen: boolean;
  toggleCommandPalette: () => void;
  playClick: () => void;
  playType: () => void;
  playSuccess: () => void;
  resetSettings: () => void;
}

interface SystemProviderProps {
  children: ReactNode;
}

interface SystemDefaults {
  isMuted: boolean;
  matrixActive: boolean;
  matrixSpeed: number;
  accentColor: string;
  reduceMotion: boolean;
  cursorStyle: CursorStyle;
  fontMode: FontMode;
  borderRadius: BorderRadius;
}

export const SystemContext = createContext<SystemContextType | null>(null);

const konamiCode: string[] = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

const DEFAULTS: SystemDefaults = {
  isMuted: true,
  matrixActive: false,
  matrixSpeed: 5,
  accentColor: '#6DB33F',
  reduceMotion: false,
  cursorStyle: 'block',
  fontMode: 'sans',
  borderRadius: 'rounded',
};

export const SystemProvider: React.FC<SystemProviderProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState<boolean>(DEFAULTS.isMuted);
  const [matrixActive, setMatrixActive] = useState<boolean>(DEFAULTS.matrixActive);
  const [matrixSpeed, setMatrixSpeed] = useState<number>(DEFAULTS.matrixSpeed);
  const [accentColor, setAccentColor] = useState<string>(DEFAULTS.accentColor);
  const [reduceMotion, setReduceMotion] = useState<boolean>(DEFAULTS.reduceMotion);
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>(DEFAULTS.cursorStyle);
  const [fontMode, setFontMode] = useState<FontMode>(DEFAULTS.fontMode);
  const [borderRadius, setBorderRadius] = useState<BorderRadius>(DEFAULTS.borderRadius);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);
  const [konamiIndex, setKonamiIndex] = useState<number>(0);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

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
    if (savedCursorStyle !== null) setCursorStyle(savedCursorStyle as CursorStyle);

    const savedFontMode = localStorage.getItem('font_mode');
    if (savedFontMode !== null) setFontMode(savedFontMode as FontMode);

    const savedBorderRadius = localStorage.getItem('border_radius');
    if (savedBorderRadius !== null) setBorderRadius(savedBorderRadius as BorderRadius);
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
      const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctx) setAudioCtx(new Ctx());
    }
  }, [isMuted, audioCtx]);

  const playSound = (freq: number = 400, duration: number = 0.05, type: OscillatorType = 'sine', volume: number = 0.1): void => {
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

  const playClick = (): void => playSound(600, 0.03, 'square', 0.05);
  const playType = (): void => playSound(Math.random() * 100 + 300, 0.02, 'sine', 0.03);
  const playSuccess = (): void => {
    playSound(400, 0.1, 'sine', 0.05);
    setTimeout(() => playSound(600, 0.1, 'sine', 0.05), 100);
  };

  const toggleMatrix = useCallback((): void => setMatrixActive(prev => !prev), []);
  const toggleCommandPalette = useCallback((): void => setIsCommandPaletteOpen(prev => !prev), []);
  const toggleDashboard = useCallback((): void => setShowDashboard(prev => !prev), []);

  const resetSettings = useCallback((): void => {
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
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }
      if (e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        window.location.href = '/settings';
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
  }, [toggleCommandPalette, konamiIndex, toggleMatrix]);

  return (
    <SystemContext.Provider value={{
      isMuted, setIsMuted,
      soundEnabled: !isMuted,
      matrixActive, setMatrixActive, toggleMatrix,
      matrixSpeed, setMatrixSpeed,
      accentColor, setAccentColor,
      reduceMotion, setReduceMotion,
      cursorStyle, setCursorStyle,
      fontMode, setFontMode,
      borderRadius, setBorderRadius,
      showDashboard, setShowDashboard, toggleDashboard,
      isCommandPaletteOpen, toggleCommandPalette,
      playClick, playType, playSuccess,
      resetSettings
    }}>
      {children}
    </SystemContext.Provider>
  );
};
