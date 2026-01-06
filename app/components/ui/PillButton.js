'use client';
import React from 'react';

export const PillButton = ({ label, isActive, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
        isActive
          ? 'bg-primary text-black shadow-lg shadow-primary/20'
          : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-300 hover:border-white/20'
      } ${className}`}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
};

