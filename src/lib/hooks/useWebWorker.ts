'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { getWorkerManager } from '../webWorkerManager';

interface UseWebWorkerOptions {
  enableCaching?: boolean;
  timeout?: number;
  autoInitialize?: boolean;
}

interface WorkerState {
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

// Hook for using text processing worker
export const useTextProcessingWorker = (options: UseWebWorkerOptions = {}) => {
  const [state, setState] = useState<WorkerState>({
    isLoading: false,
    error: null,
    isInitialized: false,
  });

  const workerManager = useRef(getWorkerManager());
  const { enableCaching = true, autoInitialize = true } = options;

  useEffect(() => {
    if (autoInitialize) {
      initializeWorker();
    }
    
    return () => {
      workerManager.current.terminate('textProcessor');
    };
  }, [autoInitialize]);

  const initializeWorker = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await workerManager.current.createWorker(
        'textProcessor',
        '/workers/text-processing.worker.js'
      );
      setState(prev => ({ ...prev, isLoading: false, isInitialized: true }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to initialize worker',
      }));
    }
  }, []);

  const processAnimationSequence = useCallback(async (text: string, config: {
    splitBy: 'words' | 'characters' | 'lines';
    staggerFrom: 'first' | 'last' | 'center' | 'random' | number;
    staggerDuration: number;
  }) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await workerManager.current.executeOperation(
        'textProcessor',
        'processAnimationSequence',
        { text, config },
        enableCaching
      );
      
      setState(prev => ({ ...prev, isLoading: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Processing failed',
      }));
      throw error;
    }
  }, [enableCaching]);

  const splitText = useCallback(async (text: string, splitBy: 'words' | 'characters' | 'lines') => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await workerManager.current.executeOperation(
        'textProcessor',
        'splitText',
        { text, splitBy },
        enableCaching
      );
      
      setState(prev => ({ ...prev, isLoading: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Text splitting failed',
      }));
      throw error;
    }
  }, [enableCaching]);

  return {
    ...state,
    processAnimationSequence,
    splitText,
    initializeWorker,
  };
};

// Hook for using data processing worker
export const useDataProcessingWorker = (options: UseWebWorkerOptions = {}) => {
  const [state, setState] = useState<WorkerState>({
    isLoading: false,
    error: null,
    isInitialized: false,
  });

  const workerManager = useRef(getWorkerManager());
  const { enableCaching = true, autoInitialize = true } = options;

  useEffect(() => {
    if (autoInitialize) {
      initializeWorker();
    }

    return () => {
      workerManager.current.terminate('dataProcessor');
    };
  }, [autoInitialize]);

  const initializeWorker = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await workerManager.current.createWorker(
        'dataProcessor',
        '/workers/data-processing.worker.js'
      );
      setState(prev => ({ ...prev, isLoading: false, isInitialized: true }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to initialize worker',
      }));
    }
  }, []);

  const filterProjects = useCallback(async (projects: unknown[], filters: Record<string, unknown>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await workerManager.current.executeOperation(
        'dataProcessor',
        'filterProjects',
        { projects, filters },
        enableCaching
      );
      
      setState(prev => ({ ...prev, isLoading: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Filtering failed',
      }));
      throw error;
    }
  }, [enableCaching]);

  const sortProjects = useCallback(async (projects: unknown[], sortBy: string, sortOrder: 'asc' | 'desc' = 'asc') => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await workerManager.current.executeOperation(
        'dataProcessor',
        'sortProjects',
        { projects, sortBy, sortOrder },
        enableCaching
      );
      
      setState(prev => ({ ...prev, isLoading: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sorting failed',
      }));
      throw error;
    }
  }, [enableCaching]);

  const searchProjects = useCallback(async (projects: unknown[], searchTerm: string, searchFields?: string[]) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await workerManager.current.executeOperation(
        'dataProcessor',
        'searchProjects',
        { projects, searchTerm, searchFields },
        enableCaching
      );
      
      setState(prev => ({ ...prev, isLoading: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Search failed',
      }));
      throw error;
    }
  }, [enableCaching]);

  const processCategories = useCallback(async (projects: unknown[]) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await workerManager.current.executeOperation(
        'dataProcessor',
        'processCategories',
        { projects },
        enableCaching
      );
      
      setState(prev => ({ ...prev, isLoading: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Category processing failed',
      }));
      throw error;
    }
  }, [enableCaching]);

  return {
    ...state,
    filterProjects,
    sortProjects,
    searchProjects,
    processCategories,
    initializeWorker,
  };
};

// Hook for using math processing worker
export const useMathProcessingWorker = (options: UseWebWorkerOptions = {}) => {
  const [state, setState] = useState<WorkerState>({
    isLoading: false,
    error: null,
    isInitialized: false,
  });

  const workerManager = useRef(getWorkerManager());
  const { enableCaching = true, autoInitialize = true } = options;

  useEffect(() => {
    if (autoInitialize) {
      initializeWorker();
    }

    return () => {
      workerManager.current.terminate('mathProcessor');
    };
  }, [autoInitialize]);

  const initializeWorker = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await workerManager.current.createWorker(
        'mathProcessor',
        '/workers/math-processing.worker.js'
      );
      setState(prev => ({ ...prev, isLoading: false, isInitialized: true }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to initialize worker',
      }));
    }
  }, []);

  const processMapDots = useCallback(async (dots: unknown[], config?: Record<string, unknown>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await workerManager.current.executeOperation(
        'mathProcessor',
        'processMapDots',
        { dots, config },
        enableCaching
      );
      
      setState(prev => ({ ...prev, isLoading: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Map processing failed',
      }));
      throw error;
    }
  }, [enableCaching]);

  const projectMapPoint = useCallback(async (lat: number, lng: number, width?: number, height?: number) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await workerManager.current.executeOperation(
        'mathProcessor',
        'projectMapPoint',
        { lat, lng, width, height },
        enableCaching
      );
      
      setState(prev => ({ ...prev, isLoading: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Map projection failed',
      }));
      throw error;
    }
  }, [enableCaching]);

  const optimizeAnimationTimings = useCallback(async (animations: unknown[], targetFPS?: number) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await workerManager.current.executeOperation(
        'mathProcessor',
        'optimizeAnimationTimings',
        { animations, targetFPS },
        enableCaching
      );
      
      setState(prev => ({ ...prev, isLoading: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Animation optimization failed',
      }));
      throw error;
    }
  }, [enableCaching]);

  return {
    ...state,
    processMapDots,
    projectMapPoint,
    optimizeAnimationTimings,
    initializeWorker,
  };
};

// Generic hook for any worker
export const useGenericWorker = (workerType: string, scriptPath: string, options: UseWebWorkerOptions = {}) => {
  const [state, setState] = useState<WorkerState>({
    isLoading: false,
    error: null,
    isInitialized: false,
  });

  const workerManager = useRef(getWorkerManager());
  const { enableCaching = true, autoInitialize = true } = options;

  useEffect(() => {
    if (autoInitialize) {
      initializeWorker();
    }

    return () => {
      workerManager.current.terminate(workerType);
    };
  }, [autoInitialize, workerType]);

  const initializeWorker = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await workerManager.current.createWorker(workerType, scriptPath);
      setState(prev => ({ ...prev, isLoading: false, isInitialized: true }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to initialize worker',
      }));
    }
  }, [workerType, scriptPath]);

  const executeOperation = useCallback(async (operation: string, data: unknown) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const result = await workerManager.current.executeOperation(
        workerType,
        operation,
        data,
        enableCaching
      );
      
      setState(prev => ({ ...prev, isLoading: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Operation failed',
      }));
      throw error;
    }
  }, [workerType, enableCaching]);

  return {
    ...state,
    executeOperation,
    initializeWorker,
  };
}; 