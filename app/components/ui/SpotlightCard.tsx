'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';

// Accent color RGB mappings
const ACCENT_COLORS = {
  green: '109, 179, 63',
  orange: '255, 140, 0',
  blue: '0, 191, 255',
  red: '255, 0, 0',
  purple: '148, 0, 211',
};

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const rafRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [primaryRgb, setPrimaryRgb] = useState(ACCENT_COLORS.green);

  // Get accent color from body data attribute
  useEffect(() => {
    const updateColor = () => {
      const accent = document.body.getAttribute('data-accent') || 'green';
      setPrimaryRgb(ACCENT_COLORS[accent] || ACCENT_COLORS.green);
    };

    // Initial update
    updateColor();

    // Observe body attribute changes for accent color updates
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-accent') {
          updateColor();
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!divRef.current) return;

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const rect = divRef.current?.getBoundingClientRect();
      if (rect) {
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }
    });
  }, []);

  const handleFocus = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleBlur = useCallback(() => {
    setOpacity(0);
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      className={`relative overflow-hidden bg-surface border border-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(${primaryRgb}, 0.1), transparent 40%)`,
          willChange: opacity ? 'opacity' : 'auto',
          border: opacity ? `1px solid rgba(${primaryRgb}, 0.3)` : '1px solid transparent',
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
