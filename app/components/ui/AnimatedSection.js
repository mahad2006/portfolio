'use client';
import React from 'react';
import { motion } from 'framer-motion';

// Fade up animation for sections
export const FadeUp = ({ children, delay = 0, duration = 0.6, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-100px' }}
    transition={{ 
      duration, 
      delay, 
      ease: [0.25, 0.4, 0.25, 1] 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Fade in animation
export const FadeIn = ({ children, delay = 0, duration = 0.6, className = '' }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scale up animation
export const ScaleUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ 
      duration: 0.5, 
      delay, 
      ease: [0.25, 0.4, 0.25, 1] 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide in from left
export const SlideInLeft = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ 
      duration: 0.6, 
      delay, 
      ease: [0.25, 0.4, 0.25, 1] 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide in from right
export const SlideInRight = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: 60 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ 
      duration: 0.6, 
      delay, 
      ease: [0.25, 0.4, 0.25, 1] 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Staggered children animation container
export const StaggerContainer = ({ children, staggerDelay = 0.1, className = '' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerDelay,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Stagger child item
export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.4, 0.25, 1]
        }
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Blur fade in (premium effect)
export const BlurFadeIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, filter: 'blur(10px)' }}
    whileInView={{ opacity: 1, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ 
      duration: 0.8, 
      delay, 
      ease: [0.25, 0.4, 0.25, 1] 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Reveal animation with clip path
export const RevealUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
    whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ 
      duration: 0.8, 
      delay, 
      ease: [0.25, 0.4, 0.25, 1] 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Floating animation (for decorative elements)
export const Float = ({ children, className = '' }) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
    }}
    transition={{ 
      duration: 4, 
      repeat: Infinity, 
      ease: 'easeInOut' 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Pulse glow animation
export const PulseGlow = ({ children, className = '' }) => (
  <motion.div
    animate={{ 
      boxShadow: [
        '0 0 20px rgba(var(--color-primary-rgb), 0.1)',
        '0 0 40px rgba(var(--color-primary-rgb), 0.2)',
        '0 0 20px rgba(var(--color-primary-rgb), 0.1)',
      ],
    }}
    transition={{ 
      duration: 3, 
      repeat: Infinity, 
      ease: 'easeInOut' 
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Text reveal character by character
export const TextReveal = ({ text, className = '', delay = 0 }) => {
  const words = text.split(' ');
  
  return (
    <motion.span className={className}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block mr-[0.25em]">
          {word.split('').map((char, charIdx) => (
            <motion.span
              key={charIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: delay + (wordIdx * 0.1) + (charIdx * 0.03),
                ease: [0.25, 0.4, 0.25, 1]
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

// Counter animation
export const AnimatedCounter = ({ value, duration = 2, className = '' }) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={className}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value}
      </motion.span>
    </motion.span>
  );
};

export default {
  FadeUp,
  FadeIn,
  ScaleUp,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerItem,
  BlurFadeIn,
  RevealUp,
  Float,
  PulseGlow,
  TextReveal,
  AnimatedCounter,
};
