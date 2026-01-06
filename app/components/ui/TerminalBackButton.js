'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useSystem } from '@/hooks/useSystem';
import { ROUTES } from '@/config/routes';

const COMMAND_MAP = {
  'cd /': ROUTES.HOME,
  'cd ~': ROUTES.HOME,
  'cd ..': 'back',
  'cd home': ROUTES.HOME,
  'cd projects': ROUTES.PROJECTS,
  'cd settings': ROUTES.SETTINGS,
  'cd writing': ROUTES.WRITING,
  'cd stats': ROUTES.STATS,
  'cd uses': ROUTES.USES,
  'cd status': ROUTES.STATUS,
  'cd community': ROUTES.COMMUNITY,
};

const getPathFromRoute = (pathname) => {
  if (pathname === '/') return '~';
  return `~${pathname}`;
};

export const TerminalBackButton = ({ defaultCommand = 'cd ..', className = '' }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { playClick } = useSystem();
  const [value, setValue] = useState(defaultCommand);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef(null);

  const currentPath = getPathFromRoute(pathname);

  // Navigate back - uses browser history to return to previous page
  const handleGoBack = () => {
    try {
      playClick?.();
    } catch (e) {
      // Ignore audio errors
    }
    // Use router.back() to go to actual previous page in history
    // This ensures community -> settings -> back goes to community
    router.back();
  };

  const handleExecute = () => {
    const trimmedValue = value.trim().toLowerCase();
    const command = COMMAND_MAP[trimmedValue];

    try {
      playClick?.();
    } catch (e) {
      // Ignore audio errors
    }

    if (command === 'back') {
      // Try to go back, fallback to home if no history
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back();
      } else {
        router.push(ROUTES.HOME);
      }
    } else if (command) {
      router.push(command);
    } else if (trimmedValue === defaultCommand.toLowerCase()) {
      // Default action: go home
      router.push(ROUTES.HOME);
    }

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
    e.preventDefault();
    handleGoBack();
  };

  const handlePromptClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isFocused) {
      handleGoBack();
    }
  };

  const handleInputWrapperClick = (e) => {
    e.stopPropagation();
    if (!isFocused && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex items-center h-10 card-base rounded-xl px-3 py-1.5 transition-all duration-300 z-50 pointer-events-auto shrink-0 ${
        isFocused || isHovered
          ? 'border-(--border-highlight)'
          : ''
      } ${className}`}
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
    >
      {/* Left Arrow Icon */}
      <button
        onClick={handleBackArrowClick}
        className="mr-2 p-1 text-gray-400 hover:text-primary transition-colors focus:outline-none shrink-0 cursor-pointer"
        aria-label="Go back"
      >
        <svg
          className="w-4 h-4"
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

      {/* Prompt Prefix (Clickable - triggers back) */}
      <span 
        onClick={handlePromptClick}
        className={`font-mono text-xs whitespace-nowrap shrink-0 ${!isFocused ? 'cursor-pointer' : ''}`}
      >
        <span className="text-primary">root@mahad</span>
        <span className="text-gray-400">:</span>
        <span className="text-white">{currentPath}</span>
        <span className="text-gray-500 ml-1">$</span>
      </span>

      {/* Input - auto-width based on content */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={(e) => {
          e.stopPropagation();
          setIsFocused(true);
        }}
        onBlur={() => {
          setTimeout(() => setIsFocused(false), 150);
        }}
        onKeyDown={handleKeyDown}
        onClick={handleInputWrapperClick}
        className={`bg-transparent border-none outline-none text-white font-mono text-xs ml-1.5 focus:outline-none ${!isFocused ? 'cursor-pointer' : 'cursor-text'}`}
        style={{ width: `${Math.max(value.length, 1)}ch` }}
        placeholder={defaultCommand}
      />
    </motion.div>
  );
};
