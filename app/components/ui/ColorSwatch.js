'use client';
import React from 'react';

export const ColorSwatch = ({ color, isActive, onClick, label, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-12 h-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${className}`}
      style={{ backgroundColor: color }}
      aria-label={label || `Color ${color}`}
      title={label || color}
    >
      {/* Active ring glow effect */}
      {isActive && (
        <>
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              boxShadow: `0 0 0 2px ${color}, 0 0 20px ${color}40, 0 0 40px ${color}20`,
            }}
          />
          <div className="absolute inset-0 rounded-full border-2 border-white/30" />
        </>
      )}
      {/* Checkmark when active */}
      {isActive && (
        <svg
          className="absolute inset-0 m-auto w-6 h-6 text-white drop-shadow-lg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </button>
  );
};

