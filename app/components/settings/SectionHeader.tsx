import React from 'react';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: string;
}

export const SectionHeader = ({ icon, title, description, accentColor }: SectionHeaderProps) => (
  <div className="flex items-start gap-4 mb-8">
    <div 
      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
      style={{ backgroundColor: `${accentColor}15`, border: `1px solid ${accentColor}30`, color: accentColor }}
    >
      {icon}
    </div>
    <div>
      <h2 className="text-xl font-bold text-white mb-1">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);
