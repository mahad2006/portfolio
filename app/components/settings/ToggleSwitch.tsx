'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

export const ToggleSwitch = ({ isOn, onToggle, disabled = false, ariaLabel = '' }: ToggleSwitchProps) => (
  <button
    onClick={onToggle}
    disabled={disabled}
    role="switch"
    aria-checked={isOn}
    aria-label={ariaLabel}
    className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    }`}
    style={{ 
      backgroundColor: isOn ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
      boxShadow: isOn ? '0 0 20px var(--color-primary)40' : 'none'
    }}
  >
    <motion.div
      className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-lg"
      animate={{ left: isOn ? '32px' : '4px' }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    />
  </button>
);
