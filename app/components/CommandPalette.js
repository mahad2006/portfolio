'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSystem } from '@/app/components/SystemProvider';
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
  ArrowTopRightOnSquareIcon,
  DocumentTextIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const CommandPalette = ({ isOpen, onClose, onNavigate }) => {
  const { toggleMatrix, isMuted, setIsMuted, playClick, showDashboard, toggleDashboard, toggleSettingsModal } = useSystem();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const paletteRef = useRef(null);
  const activeItemRef = useRef(null);

  const commandGroups = useMemo(() => [
    {
      title: 'Navigate',
      commands: [
        { id: 'home', label: 'Home', action: () => onNavigate('hero'), icon: HomeIcon },
        { id: 'about', label: 'About', action: () => onNavigate('about'), icon: UserIcon },
        { id: 'projects', label: 'Projects', action: () => onNavigate('projects'), icon: CodeBracketIcon },
        { id: 'stack', label: 'Tech Stack', action: () => onNavigate('stack'), icon: CommandLineIcon },
        { id: 'writing', label: 'Writing', action: () => onNavigate('writing'), icon: PencilSquareIcon },
        { id: 'connect', label: 'Contact', action: () => onNavigate('connect'), icon: EnvelopeIcon },
      ]
    },
    {
      title: 'Actions',
      commands: [
        { id: 'settings', label: 'Open Settings', shortcut: 'Shift+S', action: toggleSettingsModal, icon: CogIcon },
        { id: 'matrix', label: 'Toggle Matrix Mode', action: toggleMatrix, icon: SparklesIcon },
        { id: 'dashboard', label: showDashboard ? 'Hide System Dashboard' : 'Show System Dashboard', action: toggleDashboard, icon: ComputerDesktopIcon },
        { id: 'sound', label: isMuted ? 'Enable Sound' : 'Mute Sound', action: () => setIsMuted(!isMuted), icon: SpeakerWaveIcon },
      ]
    },
    {
      title: 'Links',
      commands: [
        { id: 'resume', label: 'View Resume', action: () => window.open('/resume.pdf', '_blank'), icon: DocumentTextIcon },
        { id: 'github', label: 'GitHub Profile', action: () => window.open('https://github.com/mahad2006', '_blank'), icon: ArrowTopRightOnSquareIcon },
      ]
    }
  ], [isMuted, showDashboard, onNavigate, toggleDashboard, toggleMatrix, toggleSettingsModal, setIsMuted]);

  const { groupedResults, selectableOptions } = useMemo(() => {
    const results = {
      groupedResults: [],
      selectableOptions: []
    };
    commandGroups.forEach(group => {
      const filteredCommands = group.commands.filter(cmd => cmd.label.toLowerCase().includes(query.toLowerCase()));
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
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + selectableOptions.length) % (selectableOptions.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectableOptions[selectedIndex]) {
          selectableOptions[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
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
  }, [isOpen, selectableOptions, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>
      <div
        ref={paletteRef}
        className="relative w-full max-w-xl bg-gray-900/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-up backdrop-blur-xl"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        <div className="flex items-center px-4 border-b border-white/5">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input
            autoFocus
            type="text"
            placeholder="What do you need?"
            className="w-full bg-transparent border-none text-white px-4 py-4 focus:ring-0 placeholder-gray-500 outline-none"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="text-xs text-gray-500 font-mono border border-white/10 px-2 py-1 rounded-md">ESC</span>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {selectableOptions.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-400">
              <p className="text-lg font-medium">No results found.</p>
              <p className="text-sm text-gray-500">Try a different search term.</p>
            </div>
          ) : (
            groupedResults.map((item, i) => {
              if (item.isGroup) {
                return <div key={item.title} className="px-3 pt-3 pb-1 text-xs font-medium text-gray-400 uppercase tracking-wider">{item.title}</div>;
              }

              const isSelected = selectableOptions[selectedIndex]?.id === item.id;

              return (
                <button
                  ref={isSelected ? activeItemRef : null}
                  key={item.id}
                  onClick={() => { item.action(); playClick(); onClose(); }}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all duration-150 rounded-lg ${isSelected ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="w-5 h-5 text-gray-500" />
                    <span className="text-base">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.shortcut && <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-1 rounded-md">{item.shortcut}</span>}
                    {isSelected && <ArrowRightIcon className="w-5 h-5 text-gray-400" />}
                  </div>
                </button>
              );
            })
          )}
        </div>
        <div className="px-4 py-3 bg-black/20 border-t border-white/5 flex justify-between items-center text-xs text-gray-500 font-mono">
            <div className="flex items-center gap-2">
              <span>Navigate with ↑↓</span>
            </div>
            <span>Press <span className="font-sans bg-white/10 text-gray-400 px-1.5 py-0.5 rounded-sm">↵</span> to select</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;