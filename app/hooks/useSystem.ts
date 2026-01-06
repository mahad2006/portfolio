'use client';
import { useContext } from 'react';
import { SystemContext, SystemContextType } from '@/components/providers/SystemProvider';

export const useSystem = (): SystemContextType => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
