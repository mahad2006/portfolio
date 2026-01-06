'use client';
import React, { useState, useRef, useCallback } from 'react';

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const rafRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e) => {
    if (!divRef.current) return;
    
    // Cancel any pending animation frame to avoid stacking
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Use requestAnimationFrame to batch DOM reads
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
    // Cleanup animation frame on blur
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
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--color-primary-rgb), 0.15), transparent 40%)`,
          willChange: opacity ? 'opacity' : 'auto',
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
