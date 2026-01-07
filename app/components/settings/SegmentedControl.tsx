'use client';
import React from 'react';

interface SegmentedControlOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const SegmentedControl = ({ options, value, onChange, size = 'md' }: SegmentedControlProps) => {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-5 py-2.5'
  };

  return (
    <div className="flex bg-white/4 rounded-xl p-1 border border-white/6">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`relative ${sizeClasses[size]} rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black ${
            value === option.value 
              ? 'text-black' 
              : 'text-gray-300 hover:text-white'
          }`}
        >
          {value === option.value && (
            <div
              className="absolute inset-0 rounded-lg transition-all duration-200"
              style={{ backgroundColor: 'var(--color-primary)' }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {option.icon && <span>{option.icon}</span>}
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
};
