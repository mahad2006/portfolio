'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
    title: string;
    value: number;
    suffix?: string;
    subtitle?: string;
    icon: React.ReactNode;
    color?: string;
    size?: 'normal' | 'large';
    delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    suffix = '',
    subtitle,
    icon,
    color = 'var(--color-primary)',
    size = 'normal',
    delay = 0,
}) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        let start = 0;
        const end = value;
        const duration = 2000; // 2 seconds
        const increment = end / (duration / 16); // 60fps

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`
        group relative overflow-hidden rounded-2xl p-6 
        bg-surface border border-white/10 
        hover:border-white/20 transition-all duration-300
        ${size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
      `}
        >
            {/* Gradient overlay on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-primary to-transparent"
                style={{ background: `linear-gradient(135deg, ${color}20 0%, transparent 100%)` }}
            />

            <div className="relative z-10">
                {/* Icon */}
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white/5"
                    style={{ color }}
                >
                    {icon}
                </div>

                {/* Title */}
                <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">
                    {title}
                </div>

                {/* Value with count-up */}
                <div className={`font-bold text-white mb-1 ${size === 'large' ? 'text-5xl md:text-6xl' : 'text-3xl md:text-4xl'}`}>
                    {count.toLocaleString()}
                    {suffix && <span className="text-lg text-gray-500 ml-2">{suffix}</span>}
                </div>

                {/* Subtitle */}
                {subtitle && (
                    <div className="text-xs text-gray-500 mt-2">
                        {subtitle}
                    </div>
                )}
            </div>

            {/* Bottom glow effect */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${color} 0%, transparent 100%)` }}
            />
        </motion.div>
    );
};
