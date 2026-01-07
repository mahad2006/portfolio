import React from 'react';

interface SettingCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SettingCard = ({ children, className = '' }: SettingCardProps) => (
  <div className={`bg-white/2 rounded-2xl border border-white/6 p-6 backdrop-blur-sm ${className}`}>
    {children}
  </div>
);
