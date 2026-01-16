"use client";

import { initializeWorkers } from "./workerOptimizations";

// Flag to track if workers have been initialized
let workersInitialized = false;

// Initialize Web Workers on app startup
export const initAppWorkers = async (): Promise<void> => {
	if (workersInitialized || typeof window === "undefined") {
		return;
	}

	try {
		// const measureId = performanceMonitor.startMeasure('workerInit');

		await initializeWorkers();

		// const duration = performanceMonitor.endMeasure(measureId);

		workersInitialized = true;

		// Log performance benefits
	} catch (error) {
		console.warn(
			" Some Web Workers failed to initialize. Falling back to main thread processing:",
			error,
		);
		// App will continue to work with fallbacks
	}
};

// Cleanup function for app shutdown
export const cleanupAppWorkers = (): void => {
	if (!workersInitialized) {
		return;
	}

	try {
		import("./workerOptimizations").then(({ cleanupWorkers }) => {
			cleanupWorkers();
		});
		workersInitialized = false;
		console.log("🧹 Web Workers cleaned up successfully");
	} catch (error) {
		console.warn("⚠️ Error during worker cleanup:", error);
	}
};

// Check if workers are ready
export const areWorkersReady = (): boolean => {
	return workersInitialized;
};

// Get initialization status
export const getWorkerStatus = () => {
	return {
		initialized: workersInitialized,
		available: typeof window !== "undefined" && "Worker" in window,
	};
};
