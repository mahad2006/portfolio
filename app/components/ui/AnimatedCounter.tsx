'use client';
import { useState, useEffect } from 'react';

/**
 * AnimatedCounter - Shared animated number counter component
 * 
 * Animates a number from 0 to target with easeOutQuart easing.
 * Used in: StatsView, CommunityView, and other pages with animated stats
 * 
 * @param {number|string} target - The target number to count to
 * @param {number} duration - Animation duration in ms (default: 2000)
 * @param {string} suffix - Optional suffix to append (e.g., '+', '%')
 */
export function AnimatedCounter({ target, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const targetNum = typeof target === 'string' ? parseInt(target.replace(/[^0-9]/g, '')) : target;
    if (isNaN(targetNum)) {
      setCount(target);
      return;
    }

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * targetNum);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetNum);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
}

export default AnimatedCounter;
