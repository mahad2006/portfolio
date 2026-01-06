'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useSystem } from '@/hooks/useSystem';

const COMMAND_MAP = {
  'cd /': '/',
  'cd ~': '/',
  'cd ..': 'back',
  'cd projects': '/projects',
  'cd settings': '/settings',
  'cd writing': '/writing',
  'cd stats': '/stats',
  'cd uses': '/uses',
  'cd status': '/status',
  'cd community': '/community',
};

const getPathFromRoute = (pathname) => {
  if (pathname === '/') return '~';
  return `~${pathname}`;
};

export const TerminalBackButton = ({ defaultCommand = 'cd ..', className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { accentColor, playClick } = useSystem();
  const [value, setValue] = useState(defaultCommand);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);
  const ghostRef = useRef(null);

  const currentPath = getPathFromRoute(pathname);

  const handleExecute = () => {
    const trimmedValue = value.trim().toLowerCase();
    const command = COMMAND_MAP[trimmedValue];

    if (command === 'back') {
      router.back();
    } else if (command) {
      router.push(command);
    } else if (trimmedValue === defaultCommand.toLowerCase()) {
      router.back();
    }

    playClick();
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    } else if (e.key === 'Escape') {
      setValue(defaultCommand);
      setIsFocused(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  const handleBackArrowClick = (e) => {
    e.stopPropagation();
    playClick();
    router.back();
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex items-center card-base rounded-xl px-4 py-2.5 transition-all duration-300 ${
        isFocused || isHovered
          ? 'border-[var(--border-highlight)]'
          : ''
      } ${className}`}
      style={{
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
    >
      {/* Left Arrow Icon */}
      <button
        onClick={handleBackArrowClick}
        className="mr-3 p-1 text-gray-400 hover:text-primary transition-colors focus:outline-none"
        aria-label="Go back"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Prompt Prefix (Non-editable) */}
      <span className="font-mono text-sm mr-2 whitespace-nowrap">
        <span className="text-primary">root@mahad</span>
        <span className="text-gray-400">:</span>
        <span className="text-white">{currentPath}</span>
        <span className="text-gray-500"> $</span>
      </span>

      {/* Grid Stack for Auto-Width Input */}
      <div className="inline-grid" style={{ gridTemplateColumns: '1fr' }}>
        {/* Ghost Span - Invisible, measures text width */}
        <span
          ref={ghostRef}
          className="font-mono text-sm invisible pointer-events-none whitespace-pre"
          style={{ gridArea: '1 / 1 / 2 / 2' }}
          aria-hidden="true"
        >
          {value || defaultCommand}
        </span>

        {/* Input - Overlays ghost span */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => setIsFocused(false), 200);
          }}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-white font-mono text-sm w-full min-w-[1ch] focus:outline-none"
          style={{ gridArea: '1 / 1 / 2 / 2' }}
          placeholder={defaultCommand}
        />
      </div>
    </motion.div>
  );
};
