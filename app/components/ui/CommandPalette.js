'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSystem } from '@/hooks/useSystem';
import { ACCENT_COLORS } from '@/config/theme';
import { ROUTES, SECTIONS, STATIC_ROUTES } from '@/config/routes';
import { SOCIAL_LINKS } from '@/config/site';
import {
  HomeIcon,
  UserIcon,
  CodeBracketIcon,
  CommandLineIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  CogIcon,
  SparklesIcon,
  ComputerDesktopIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  PaintBrushIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';

const CommandPalette = ({ isOpen, onClose, onNavigate }) => {
  const router = useRouter();
  const {
    toggleMatrix,
    isMuted,
    setIsMuted,
    soundEnabled,
    playClick,
    showDashboard,
    toggleDashboard,
    reduceMotion,
    setReduceMotion,
    accentColor,
    setAccentColor,
  } = useSystem();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const paletteRef = useRef(null);
  const activeItemRef = useRef(null);

  // Play sound when opening/closing
  useEffect(() => {
    if (isOpen && soundEnabled) {
      playClick();
    }
  }, [isOpen, soundEnabled, playClick]);

  const commandGroups = useMemo(() => [
    {
      title: 'Navigation',
      commands: [
        { id: 'home', label: 'Go to Home', action: () => onNavigate(SECTIONS.HERO), icon: HomeIcon, shortcut: '↵' },
        { id: 'about', label: 'Go to About', action: () => onNavigate(SECTIONS.ABOUT), icon: UserIcon, shortcut: '↵' },
        { id: 'projects', label: 'Go to Projects', action: () => onNavigate(SECTIONS.PROJECTS), icon: CodeBracketIcon, shortcut: '↵' },
        { id: 'stack', label: 'Go to Tech Stack', action: () => onNavigate(SECTIONS.STACK), icon: CommandLineIcon, shortcut: '↵' },
        { id: 'writing', label: 'Go to Writing', action: () => onNavigate(SECTIONS.WRITING), icon: PencilSquareIcon, shortcut: '↵' },
        { id: 'connect', label: 'Go to Contact', action: () => onNavigate(SECTIONS.CONNECT), icon: EnvelopeIcon, shortcut: '↵' },
      ]
    },
    {
      title: 'Actions',
      commands: [
        { id: 'settings', label: 'Open Settings', shortcut: 'Shift+S', action: () => { router.push(ROUTES.SETTINGS); onClose(); }, icon: CogIcon },
        { id: 'sound', label: soundEnabled ? 'Mute Sound' : 'Enable Sound', action: () => setIsMuted(!isMuted), icon: soundEnabled ? SpeakerWaveIcon : SpeakerXMarkIcon, shortcut: '↵' },
        { id: 'matrix', label: 'Toggle Matrix Mode', action: toggleMatrix, icon: SparklesIcon, shortcut: '↵' },
        { id: 'motion', label: reduceMotion ? 'Enable Animations' : 'Reduce Motion', action: () => setReduceMotion(!reduceMotion), icon: EyeSlashIcon, shortcut: '↵' },
        { id: 'dashboard', label: showDashboard ? 'Hide System Dashboard' : 'Show System Dashboard', action: toggleDashboard, icon: ComputerDesktopIcon, shortcut: '↵' },
        ...ACCENT_COLORS.map(color => ({
          id: `color-${color.value}`,
          label: `Set Accent to ${color.label}`,
          action: () => setAccentColor(color.value),
          icon: PaintBrushIcon,
          shortcut: '↵',
          color: color.value,
        })),
      ]
    },
    {
      title: 'External Links',
      commands: [
        { id: 'resume', label: 'View Resume', action: () => window.open(STATIC_ROUTES.RESUME, '_blank'), icon: DocumentTextIcon, shortcut: '↵' },
        { id: 'github', label: 'Open GitHub Profile', action: () => window.open(SOCIAL_LINKS.github.url, '_blank'), icon: ArrowTopRightOnSquareIcon, shortcut: '↵' },
      ]
    }
  ], [isMuted, soundEnabled, showDashboard, reduceMotion, accentColor, onNavigate, toggleDashboard, toggleMatrix, setIsMuted, setReduceMotion, setAccentColor, router, onClose]);

  const { groupedResults, selectableOptions } = useMemo(() => {
    const results = {
      groupedResults: [],
      selectableOptions: []
    };
    commandGroups.forEach(group => {
      const filteredCommands = group.commands.filter(cmd => 
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.id.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredCommands.length > 0) {
        results.groupedResults.push({ isGroup: true, title: group.title });
        results.groupedResults.push(...filteredCommands);
        results.selectableOptions.push(...filteredCommands);
      }
    });
    return results;
  }, [query, commandGroups]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const paletteElement = paletteRef.current;
    const focusableElements = paletteElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKey = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % (selectableOptions.length || 1));
        if (soundEnabled) playClick();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + selectableOptions.length) % (selectableOptions.length || 1));
        if (soundEnabled) playClick();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectableOptions[selectedIndex]) {
          if (soundEnabled) playClick();
          selectableOptions[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        if (soundEnabled) playClick();
        onClose();
      } else if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    paletteRef.current?.querySelector('input')?.focus();

    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, selectableOptions, selectedIndex, onClose, soundEnabled, playClick]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh] px-4" onClick={onClose}>
      {/* Enhanced Glassmorphism Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xl"></div>
      
      {/* Command Palette Container */}
      <div
        ref={paletteRef}
        className="relative w-full max-w-2xl card-base rounded-3xl overflow-hidden animate-fade-up"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        {/* Spotlight-style Input Section */}
        <div className="flex items-center px-6 py-5 border-b border-white/5 bg-white/2">
          <svg className="w-6 h-6 text-gray-400 mr-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent border-none text-white text-lg placeholder-gray-500 focus:ring-0 outline-none font-medium"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-2 ml-4">
            <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-mono text-gray-400 bg-white/5 border border-white/10 rounded">ESC</kbd>
          </div>
        </div>

        {/* Results Section */}
        <div className="max-h-[60vh] overflow-y-auto">
          {selectableOptions.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p className="text-lg font-medium text-gray-300 mb-2">No results found</p>
              <p className="text-sm text-gray-500">Try a different search term</p>
            </div>
          ) : (
            <div className="p-2">
              {groupedResults.map((item, i) => {
                if (item.isGroup) {
                  return (
                    <div key={item.title} className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {item.title}
                    </div>
                  );
                }

                const isSelected = selectableOptions[selectedIndex]?.id === item.id;

                return (
                  <button
                    ref={isSelected ? activeItemRef : null}
                    key={item.id}
                    onClick={() => {
                      if (soundEnabled) playClick();
                      item.action();
                      onClose();
                    }}
                    className={`w-full text-left px-4 py-3.5 flex items-center justify-between transition-all duration-150 rounded-xl group ${
                      isSelected
                        ? 'bg-primary/20 text-white border border-primary/30'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className={`shrink-0 ${item.color ? 'w-5 h-5 rounded-full border-2 border-white/20' : ''}`} style={item.color ? { backgroundColor: item.color } : {}}>
                        {!item.color && <item.icon className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-gray-500 group-hover:text-gray-300'}`} />}
                      </div>
                      <span className="text-base font-medium truncate">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {item.shortcut && (
                        <kbd className={`hidden sm:inline-flex items-center px-2 py-1 text-xs font-mono rounded ${
                          isSelected
                            ? 'bg-primary/30 text-primary border border-primary/50'
                            : 'bg-white/5 text-gray-500 border border-white/10'
                        }`}>
                          {item.shortcut}
                        </kbd>
                      )}
                      {isSelected && (
                        <ArrowRightIcon className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Keyboard Hints */}
        <div className="px-6 py-4 bg-black/20 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono">↑</kbd>
              <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono">↓</kbd>
              <span className="text-gray-400">Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono">↵</kbd>
              <span className="text-gray-400">Select</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-white/5 border border-white/10 rounded font-mono">ESC</kbd>
              <span className="text-gray-400">Close</span>
            </div>
          </div>
          <div className="text-gray-400 font-mono">
            {selectableOptions.length} {selectableOptions.length === 1 ? 'result' : 'results'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
