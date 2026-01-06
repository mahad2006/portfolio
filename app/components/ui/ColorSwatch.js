'use client';
import React from 'react';

export const ColorSwatch = ({ color, isActive, onClick, label, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`relative w-14 h-14 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${className}`}
      style={{ backgroundColor: color }}
      aria-label={label || `Color ${color}`}
      title={label || color}
    >
      {/* Active white ring with offset for premium look */}
      {isActive && (
        <>
          {/* Outer glow ring */}
          <div
            className="absolute -inset-2 rounded-full"
            style={{
              boxShadow: `0 0 0 2px ${color}, 0 0 0 4px white, 0 0 20px ${color}60, 0 0 40px ${color}30`,
            }}
          />
          {/* Inner border for definition */}
          <div className="absolute -inset-1 rounded-full border-2 border-white/90" />
        </>
      )}
      {/* Checkmark when active */}
      {isActive && (
        <svg
          className="absolute inset-0 m-auto w-5 h-5 text-white drop-shadow-lg z-10"
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

