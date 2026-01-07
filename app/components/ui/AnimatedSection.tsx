'use client';
import React from 'react';

// CSS-based fade up animation for sections
export const FadeUp = ({ children, delay = 0, duration = 0.6, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => (
  <div
    className={`animate-fade-up ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      animationFillMode: 'both',
    }}
  >
    {children}
  </div>
);

// CSS-based fade in animation
export const FadeIn = ({ children, delay = 0, duration = 0.6, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => (
  <div
    className={`animate-fade-in ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      animationFillMode: 'both',
    }}
  >
    {children}
  </div>
);

// CSS-based scale up animation
export const ScaleUp = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <div
    className={`animate-scale-up ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationFillMode: 'both',
    }}
  >
    {children}
  </div>
);

// CSS-based slide in from left
export const SlideInLeft = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <div
    className={`animate-slide-left ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationFillMode: 'both',
    }}
  >
    {children}
  </div>
);

// CSS-based slide in from right
export const SlideInRight = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <div
    className={`animate-slide-right ${className}`}
    style={{
      animationDelay: `${delay}s`,
      animationFillMode: 'both',
    }}
  >
    {children}
  </div>
);

// Staggered children animation container (CSS-based)
export const StaggerContainer = ({ children, staggerDelay = 0.1, className = '' }: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) => (
  <div className={className} style={{ '--stagger-delay': `${staggerDelay}s` } as React.CSSProperties}>
    {children}
  </div>
);

// Stagger child item (CSS-based)
export const StaggerItem = ({ children, className = '' }: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`animate-stagger-item ${className}`}>
    {children}
  </div>
);

export default {
  FadeUp,
  FadeIn,
  ScaleUp,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerItem,
};
