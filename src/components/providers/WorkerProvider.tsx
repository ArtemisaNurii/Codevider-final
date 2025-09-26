'use client';

import { useEffect } from 'react';
import { initAppWorkers, cleanupAppWorkers } from '@/lib/initWorkers';

interface WorkerProviderProps {
  children: React.ReactNode;
}

export function WorkerProvider({ children }: WorkerProviderProps) {
  useEffect(() => {
    // Initialize Web Workers when the app loads
    initAppWorkers();

    // Cleanup when the app unmounts
    return () => {
      cleanupAppWorkers();
    };
  }, []);

  return <>{children}</>;
} 