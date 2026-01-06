'use client';
import { useContext } from 'react';
import { SoundContext } from '@/components/providers/SoundProvider';

export const useSound = () => useContext(SoundContext);
