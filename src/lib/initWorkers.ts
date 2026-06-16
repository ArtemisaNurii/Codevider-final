'use client';

import { initializeWorkers, performanceMonitor } from './workerOptimizations';

let workersInitialized = false;

export const initAppWorkers = async (): Promise<void> => {
  if (workersInitialized || typeof window === 'undefined') {
    return;
  }

  try {
    const measureId = performanceMonitor.startMeasure('workerInit');


    await initializeWorkers();

    performanceMonitor.endMeasure(measureId);

    workersInitialized = true;
  } catch (error) {
    console.warn(' Some Web Workers failed to initialize. Falling back to main thread processing:', error);
  }
};

export const cleanupAppWorkers = (): void => {
  if (!workersInitialized) {
    return;
  }

  try {
    import('./workerOptimizations').then(({ cleanupWorkers }) => {
      cleanupWorkers();
    });
    workersInitialized = false;
  } catch (error) {
    console.warn('⚠️ Error during worker cleanup:', error);
  }
};

export const areWorkersReady = (): boolean => {
  return workersInitialized;
};

export const getWorkerStatus = () => {
  return {
    initialized: workersInitialized,
    available: typeof window !== 'undefined' && 'Worker' in window,
  };
};
