'use client';
import { useContext } from 'react';
import { SystemContext } from '@/components/providers/SystemProvider';

export const useSystem = () => useContext(SystemContext);
