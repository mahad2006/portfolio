'use client';
import React, { useState } from 'react';
import { useSystem } from './SystemProvider';

// A wrapper for each setting for consistent styling and a smoother hover effect
const SettingItem = ({ children }) => (
    <div className="bg-white/5 p-4 rounded-lg transition-all duration-300 hover:bg-white/10">
        {children}
    </div>
);

const Toggle = ({ label, description, isEnabled, onToggle }) => (
    <SettingItem>
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-white font-bold">{label}</h3>
                <p className="text-sm text-gray-400">{description}</p>
            </div>
            <button
                onClick={onToggle}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${isEnabled ? 'bg-[var(--color-primary)]' : 'bg-black/30'}`}
                aria-label={`Toggle ${label}`}
            >
                <span
                    className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`}
                ></span>
            </button>
        </div>
    </SettingItem>
);

const Slider = ({ label, description, value, min, max, step, onChange }) => (
    <SettingItem>
        <div>
            <h3 className="text-white font-bold">{label}</h3>
            <p className="text-sm text-gray-400 mb-3">{description}</p>
        </div>
        <div className="flex items-center">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                className="w-full h-2 bg-black/30 rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
            />
            <span className="ml-4 text-white font-mono w-12 text-center">{value}</span>
        </div>
    </SettingItem>
);

const ColorPicker = ({ label, description, options, selected, onSelect }) => (
    <SettingItem>
        <div>
            <h3 className="text-white font-bold">{label}</h3>
            <p className="text-sm text-gray-400 mb-3">{description}</p>
        </div>
        <div className="flex flex-wrap gap-4">
            {options.map(option => (
                <button
                    key={option.value}
                    onClick={() => onSelect(option.value)}
                    className={`w-10 h-10 rounded-full transition-all duration-300 transform hover:scale-110 ${selected === option.value ? 'ring-2 ring-offset-2 ring-offset-[#0d0d0d] ring-white' : ''}`}
                    style={{ backgroundColor: option.hex }}
                    aria-label={`Select ${option.label}`}
                ></button>
            ))}
        </div>
    </SettingItem>
);


export const SettingsModal = ({ isOpen, onClose }) => {
  const {
    isMuted,
    setIsMuted,
    matrixActive,
    toggleMatrix,
    matrixSpeed,
    setMatrixSpeed,
    accentColor,
    setAccentColor,
    resetSettings
  } = useSystem();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    resetSettings();
    setShowResetConfirm(false);
  };

  const colorOptions = [
    { value: 'green', label: 'Default Green', hex: '#00ff00' },
    { value: 'orange', label: 'Terminal Orange', hex: '#ff8c00' },
    { value: 'blue', label: 'Cyber Blue', hex: '#00bfff' },
    { value: 'red', label: 'System Alert', hex: '#ff0000' },
    { value: 'purple', label: 'Glitch Purple', hex: '#9400d3' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-lg"></div>
      <div
        className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out animate-fade-up"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        <div className="p-6 border-b border-white/10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white tracking-wider">System Settings</h2>
                <button onClick={onClose} className="p-2 text-gray-500 hover:text-white transition-colors text-3xl">&times;</button>
            </div>
        </div>
        <div className="overflow-y-auto p-6 space-y-4">
          <Toggle
            label="Sound Effects"
            description="Enable or disable UI sound effects."
            isEnabled={!isMuted}
            onToggle={() => setIsMuted(!isMuted)}
          />
          <Toggle
            label="Matrix Mode"
            description="Toggle the falling green code background."
            isEnabled={matrixActive}
            onToggle={toggleMatrix}
          />
          <Slider
            label="Matrix Rain Speed"
            description="Controls the speed and density of the background effect."
            value={matrixSpeed}
            min="1"
            max="20"
            step="1"
            onChange={(e) => setMatrixSpeed(Number(e.target.value))}
          />
          <ColorPicker
            label="UI Accent Color"
            description="Select the primary accent color for the interface."
            options={colorOptions}
            selected={accentColor}
            onSelect={setAccentColor}
          />
          <div className="pt-4">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full text-center p-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 hover:text-red-300 transition-colors duration-300"
              >
                Reset to Default Settings
              </button>
            ) : (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
                <p className="text-white mb-4">Are you sure you want to reset all settings?</p>
                <div className="flex justify-center gap-4">
                  <button onClick={() => setShowResetConfirm(false)} className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleReset} className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-bold transition-colors">
                    Confirm Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};