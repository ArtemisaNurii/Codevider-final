// Performance optimizations and Web Worker utilities
'use client';

import { getWorkerManager } from './webWorkerManager';

// Worker types configuration
export const WORKER_CONFIGS = {
  textProcessor: {
    scriptPath: '/workers/text-processing.worker.js',
    operations: ['splitText', 'calculateStaggerDelays', 'processAnimationSequence'],
  },
  dataProcessor: {
    scriptPath: '/workers/data-processing.worker.js',
    operations: ['filterProjects', 'sortProjects', 'searchProjects', 'processCategories', 'paginateData'],
  },
  mathProcessor: {
    scriptPath: '/workers/math-processing.worker.js',
    operations: ['projectMapPoint', 'createCurvedPath', 'processMapDots', 'optimizeAnimationTimings'],
  },
} as const;

// Performance thresholds for deciding when to use Web Workers
export const PERFORMANCE_THRESHOLDS = {
  TEXT_LENGTH: 1000, // Use worker for text longer than 1000 characters
  ARRAY_SIZE: 100, // Use worker for arrays with more than 100 items
  ANIMATION_COUNT: 50, // Use worker for more than 50 simultaneous animations
  MAP_DOTS: 10, // Use worker for more than 10 map dots
} as const;

// Initialize all workers at app startup
export const initializeWorkers = async (): Promise<void> => {
  const manager = getWorkerManager();
  
  try {
    // Initialize workers in parallel for better performance
    await Promise.all([
      manager.createWorker('textProcessor', WORKER_CONFIGS.textProcessor.scriptPath),
      manager.createWorker('dataProcessor', WORKER_CONFIGS.dataProcessor.scriptPath),
      manager.createWorker('mathProcessor', WORKER_CONFIGS.mathProcessor.scriptPath),
    ]);
    
    console.log('All Web Workers initialized successfully');
  } catch (error) {
    console.error('Failed to initialize some workers:', error);
  }
};

// Check if operation should use Web Worker based on data size
export const shouldUseWorker = (
  operationType: 'text' | 'data' | 'math',
  dataSize: number
): boolean => {
  switch (operationType) {
    case 'text':
      return dataSize > PERFORMANCE_THRESHOLDS.TEXT_LENGTH;
    case 'data':
      return dataSize > PERFORMANCE_THRESHOLDS.ARRAY_SIZE;
    case 'math':
      return dataSize > PERFORMANCE_THRESHOLDS.MAP_DOTS;
    default:
      return false;
  }
};

// Performance monitoring utilities
export class PerformanceMonitor {
  private metrics: Map<string, number[]> = new Map();
  
  startMeasure(label: string): string {
    const measureId = `${label}_${Date.now()}_${Math.random()}`;
    performance.mark(`${measureId}_start`);
    return measureId;
  }
  
  endMeasure(measureId: string): number {
    const startMark = `${measureId}_start`;
    const endMark = `${measureId}_end`;
    
    performance.mark(endMark);
    performance.measure(measureId, startMark, endMark);
    
    const measure = performance.getEntriesByName(measureId, 'measure')[0];
    const duration = measure.duration;
    
    // Store metric
    const label = measureId.split('_')[0];
    if (!this.metrics.has(label)) {
      this.metrics.set(label, []);
    }
    this.metrics.get(label)!.push(duration);
    
    // Clean up
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures(measureId);
    
    return duration;
  }
  
  getAverageTime(label: string): number {
    const times = this.metrics.get(label) || [];
    if (times.length === 0) return 0;
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }
  
  getMetrics(): Record<string, { average: number; count: number; total: number }> {
    const result: Record<string, { average: number; count: number; total: number }> = {};
    
    for (const [label, times] of this.metrics.entries()) {
      const total = times.reduce((sum, time) => sum + time, 0);
      result[label] = {
        average: times.length > 0 ? total / times.length : 0,
        count: times.length,
        total,
      };
    }
    
    return result;
  }
  
  reset(): void {
    this.metrics.clear();
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Utility to measure worker vs main thread performance
export const comparePerformance = async <T>(
  mainThreadFn: () => T | Promise<T>,
  workerFn: () => Promise<T>,
  label: string
): Promise<{ mainThread: number; worker: number; winner: 'main' | 'worker' }> => {
  // Measure main thread performance
  const mainStart = performanceMonitor.startMeasure(`${label}_main`);
  await mainThreadFn();
  const mainTime = performanceMonitor.endMeasure(mainStart);
  
  // Measure worker performance
  const workerStart = performanceMonitor.startMeasure(`${label}_worker`);
  await workerFn();
  const workerTime = performanceMonitor.endMeasure(workerStart);
  
  return {
    mainThread: mainTime,
    worker: workerTime,
    winner: mainTime < workerTime ? 'main' : 'worker',
  };
};

// Adaptive performance strategy
export class AdaptiveWorkerStrategy {
  private performanceHistory: Map<string, { main: number[]; worker: number[] }> = new Map();
  private readonly maxHistorySize = 10;
  
  recordPerformance(operation: string, mainTime: number, workerTime: number): void {
    if (!this.performanceHistory.has(operation)) {
      this.performanceHistory.set(operation, { main: [], worker: [] });
    }
    
    const history = this.performanceHistory.get(operation)!;
    
    // Keep only recent measurements
    if (history.main.length >= this.maxHistorySize) {
      history.main.shift();
      history.worker.shift();
    }
    
    history.main.push(mainTime);
    history.worker.push(workerTime);
  }
  
  shouldUseWorker(operation: string): boolean {
    const history = this.performanceHistory.get(operation);
    if (!history || history.main.length < 3) {
      // Not enough data, use defaults
      return true;
    }
    
    const avgMain = history.main.reduce((sum, time) => sum + time, 0) / history.main.length;
    const avgWorker = history.worker.reduce((sum, time) => sum + time, 0) / history.worker.length;
    
    // Use worker if it's consistently faster (with 10% tolerance for overhead)
    return avgWorker * 1.1 < avgMain;
  }
  
  getRecommendation(operation: string): {
    recommendation: 'main' | 'worker';
    confidence: number;
    avgMainTime: number;
    avgWorkerTime: number;
  } {
    const history = this.performanceHistory.get(operation);
    if (!history || history.main.length === 0) {
      return {
        recommendation: 'worker',
        confidence: 0,
        avgMainTime: 0,
        avgWorkerTime: 0,
      };
    }
    
    const avgMain = history.main.reduce((sum, time) => sum + time, 0) / history.main.length;
    const avgWorker = history.worker.reduce((sum, time) => sum + time, 0) / history.worker.length;
    
    const faster = avgMain < avgWorker ? 'main' : 'worker';
    const speedDifference = Math.abs(avgMain - avgWorker);
    const slower = Math.max(avgMain, avgWorker);
    const confidence = slower > 0 ? speedDifference / slower : 0;
    
    return {
      recommendation: faster,
      confidence: Math.min(confidence * 100, 100),
      avgMainTime: avgMain,
      avgWorkerTime: avgWorker,
    };
  }
}

// Global adaptive strategy instance
export const adaptiveStrategy = new AdaptiveWorkerStrategy();

// Cleanup function for when app unmounts
export const cleanupWorkers = (): void => {
  const manager = getWorkerManager();
  manager.terminate();
  console.log('All Web Workers terminated');
};

// Performance optimization tips
export const OPTIMIZATION_TIPS = {
  TEXT_PROCESSING: [
    'Use Web Workers for text longer than 1000 characters',
    'Cache frequently processed text patterns',
    'Consider using CSS transforms for simple animations',
  ],
  DATA_PROCESSING: [
    'Use Web Workers for arrays with more than 100 items',
    'Implement virtual scrolling for large lists',
    'Use memoization for expensive computations',
  ],
  ANIMATIONS: [
    'Use transform and opacity for smooth animations',
    'Batch DOM updates using requestAnimationFrame',
    'Consider using CSS animations for simple effects',
  ],
  GENERAL: [
    'Profile your app to identify bottlenecks',
    'Use React.memo and useMemo for expensive renders',
    'Implement code splitting for better loading times',
  ],
} as const; 