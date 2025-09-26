// Types for messages exchanged with the worker
interface WorkerRequestMessage {
    id: string;
    operation: string;
    data: unknown;
  }
  
  interface WorkerResponseMessage {
    id: string;
    success: boolean;
    result?: unknown;
    error?: string;
    type?: string; // e.g., "ready"
  }
  
  type WorkerOperation = {
    id: string;
    operation: string;
    data: unknown;
    resolve: (result: unknown) => void;
    reject: (error: Error) => void;
    timeout?: ReturnType<typeof setTimeout>;
  };
  
  interface WorkerConfig {
    maxRetries?: number;
    timeout?: number;
    enableCaching?: boolean;
    cacheSize?: number;
  }
  
  class WebWorkerManager {
    private workers: Map<string, Worker> = new Map();
    private pendingOperations: Map<string, WorkerOperation> = new Map();
    private cache: Map<string, unknown> = new Map();
    private config: WorkerConfig;
    private messageId = 0;
  
    constructor(config: WorkerConfig = {}) {
      this.config = {
        maxRetries: 3,
        timeout: 30000, // 30 seconds
        enableCaching: true,
        cacheSize: 100,
        ...config,
      };
    }
  
    // Initialize a worker
    async createWorker(workerType: string, scriptPath: string): Promise<void> {
      if (typeof window === "undefined") {
        throw new Error("Web Workers are only available in browser environment");
      }
  
      if (this.workers.has(workerType)) {
        return;
      }
  
      try {
        const worker = new Worker(scriptPath);
  
        worker.addEventListener("message", (event: MessageEvent<WorkerResponseMessage>) => {
          this.handleWorkerMessage(workerType, event);
        });
  
        worker.addEventListener("error", (error) => {
          console.error(`Worker ${workerType} error:`, error);
          this.handleWorkerError(workerType, error);
        });
  
        this.workers.set(workerType, worker);
  
        await this.waitForWorkerReady(workerType);
      } catch (error) {
        throw new Error(`Failed to create worker ${workerType}: ${(error as Error).message}`);
      }
    }
  
    async executeOperation<T = unknown>(
      workerType: string,
      operation: string,
      data: unknown,
      enableCaching = this.config.enableCaching
    ): Promise<T> {
      const cacheKey = enableCaching ? this.getCacheKey(workerType, operation, data) : null;
      if (cacheKey && this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey) as T;
      }
  
      const worker = this.workers.get(workerType);
      if (!worker) {
        throw new Error(`Worker ${workerType} not found. Make sure to create it first.`);
      }
  
      const messageId = this.generateMessageId();
  
      return new Promise<T>((resolve, reject) => {
        const operationObj: WorkerOperation = {
          id: messageId,
          operation,
          data,
          resolve: (result) => {
            if (cacheKey && enableCaching) {
              this.addToCache(cacheKey, result);
            }
            resolve(result as T);
          },
          reject,
        };
  
        if (this.config.timeout) {
          operationObj.timeout = setTimeout(() => {
            this.pendingOperations.delete(messageId);
            reject(new Error(`Operation ${operation} timed out`));
          }, this.config.timeout);
        }
  
        this.pendingOperations.set(messageId, operationObj);
  
        const message: WorkerRequestMessage = {
          id: messageId,
          operation,
          data,
        };
        worker.postMessage(message);
      });
    }
  
    private handleWorkerMessage(workerType: string, event: MessageEvent<WorkerResponseMessage>): void {
      const { id, success, result, error, type } = event.data;
  
      if (type === "ready") {
        return;
      }
  
      const operation = this.pendingOperations.get(id);
      if (!operation) {
        return;
      }
  
      if (operation.timeout) {
        clearTimeout(operation.timeout);
      }
  
      this.pendingOperations.delete(id);
  
      if (success) {
        operation.resolve(result);
      } else {
        operation.reject(new Error(error || "Unknown worker error"));
      }
    }
  
    private handleWorkerError(workerType: string, error: ErrorEvent): void {
      console.error(`Worker ${workerType} encountered an error:`, error);
  
      for (const operation of this.pendingOperations.values()) {
        operation.reject(new Error(`Worker error: ${error.message}`));
        if (operation.timeout) {
          clearTimeout(operation.timeout);
        }
      }
  
      this.pendingOperations.clear();
    }
  
    private waitForWorkerReady(workerType: string): Promise<void> {
      const worker = this.workers.get(workerType);
      if (!worker) {
        throw new Error(`Worker ${workerType} not found`);
      }
  
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error(`Worker ${workerType} failed to initialize within timeout`));
        }, 10000);
  
        const handler = (event: MessageEvent<WorkerResponseMessage>) => {
          if (event.data.type === "ready") {
            clearTimeout(timeout);
            worker.removeEventListener("message", handler);
            resolve();
          }
        };
  
        worker.addEventListener("message", handler);
      });
    }
  
    private getCacheKey(workerType: string, operation: string, data: unknown): string {
      return `${workerType}:${operation}:${JSON.stringify(data)}`;
    }
  
    private addToCache(key: string, value: unknown): void {
      if (!this.config.enableCaching) return;
  
      if (this.cache.size >= (this.config.cacheSize || 100)) {
        const firstKey = this.cache.keys().next().value;
        if (typeof firstKey === "string") {
          this.cache.delete(firstKey);
        }
      }

      this.cache.set(key, value);
    }
  
    private generateMessageId(): string {
      return `msg_${++this.messageId}_${Date.now()}`;
    }
  
    terminate(workerType?: string): void {
      if (workerType) {
        const worker = this.workers.get(workerType);
        if (worker) {
          worker.terminate();
          this.workers.delete(workerType);
        }
      } else {
        for (const worker of this.workers.values()) {
          worker.terminate();
        }
        this.workers.clear();
      }
  
      for (const operation of this.pendingOperations.values()) {
        if (operation.timeout) {
          clearTimeout(operation.timeout);
        }
        operation.reject(new Error("Worker terminated"));
      }
      this.pendingOperations.clear();
    }
  
    getWorkerStatus(): Record<string, boolean> {
      const status: Record<string, boolean> = {};
      for (const type of this.workers.keys()) {
        status[type] = true;
      }
      return status;
    }
  
    clearCache(): void {
      this.cache.clear();
    }
  
    getCacheStats(): { size: number; maxSize: number } {
      return {
        size: this.cache.size,
        maxSize: this.config.cacheSize || 100,
      };
    }
  }
  
  let workerManager: WebWorkerManager | null = null;
  
  export const getWorkerManager = (config?: WorkerConfig): WebWorkerManager => {
    if (!workerManager) {
      workerManager = new WebWorkerManager(config);
    }
    return workerManager;
  };
  
  export { WebWorkerManager };
  export type { WorkerConfig };
  