'use client';
import React, { useEffect, useRef } from 'react';

import { useSystem } from '@/hooks/useSystem';

export const MatrixRain = () => {
  const { matrixActive: active } = useSystem();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    if (active) {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);
    }
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(1);

    const draw = () => {
      if (!active) return;
      
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgb(109, 179, 63)';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let interval;
    if (active) {
        interval = setInterval(draw, 33);
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 z-[1] pointer-events-none transition-opacity duration-1000 ${active ? 'opacity-50' : 'opacity-0'}`}
    />
  );
};
