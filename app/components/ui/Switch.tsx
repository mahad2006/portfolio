'use client';
import React from 'react';

export const Switch = ({ enabled, onChange, label, description, className = '' }) => {
  return (
    <div className={`flex justify-between items-center p-6 glass-panel border border-white/5 rounded-xl hover:border-white/10 transition-all ${className}`}>
      <div className="flex-1">
        {label && <h3 className="text-white font-bold mb-1">{label}</h3>}
        {description && <p className="text-sm text-gray-400">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative w-14 h-8 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          enabled ? 'bg-primary' : 'bg-white/10'
        }`}
        aria-label={label || 'Toggle'}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ease-in-out ${
            enabled ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

