// Math Processing Web Worker
// Handles expensive mathematical calculations and geometric operations

class MathProcessor {
  constructor() {
    this.operations = {
      projectMapPoint: this.projectMapPoint.bind(this),
      createCurvedPath: this.createCurvedPath.bind(this),
      calculateDistance: this.calculateDistance.bind(this),
      generateAnimationFrames: this.generateAnimationFrames.bind(this),
      processMapDots: this.processMapDots.bind(this),
      calculateBezierCurve: this.calculateBezierCurve.bind(this),
      optimizeAnimationTimings: this.optimizeAnimationTimings.bind(this)
    };
  }

  projectMapPoint(data) {
    const { lat, lng, width = 800, height = 400 } = data;
    
    // Convert latitude and longitude to pixel coordinates
    const x = (lng + 180) * (width / 360);
    const y = (90 - lat) * (height / 180);
    
    return { x, y };
  }

  createCurvedPath(data) {
    const { start, end } = data;
    
    // Calculate midpoint for curved path
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }

  calculateDistance(data) {
    const { point1, point2 } = data;
    
    // Haversine formula for distance between two geographic points
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(point2.lat - point1.lat);
    const dLng = this.toRad(point2.lng - point1.lng);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(point1.lat)) * Math.cos(this.toRad(point2.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  generateAnimationFrames(data) {
    const { duration, fps = 60, easing = 'linear' } = data;
    const totalFrames = Math.floor(duration * fps);
    const frames = [];
    
    for (let i = 0; i <= totalFrames; i++) {
      const progress = i / totalFrames;
      const easedProgress = this.applyEasing(progress, easing);
      
      frames.push({
        frame: i,
        time: i / fps,
        progress: easedProgress,
        value: easedProgress
      });
    }
    
    return frames;
  }

  processMapDots(data) {
    const { dots, config = {} } = data;
    const { width = 800, height = 400 } = config;
    
    return dots.map((dot, index) => {
      const startPoint = this.projectMapPoint({
        lat: dot.start.lat,
        lng: dot.start.lng,
        width,
        height
      });
      
      const endPoint = this.projectMapPoint({
        lat: dot.end.lat,
        lng: dot.end.lng,
        width,
        height
      });
      
      const path = this.createCurvedPath({
        start: startPoint,
        end: endPoint
      });
      
      const distance = this.calculateDistance({
        point1: dot.start,
        point2: dot.end
      });
      
      return {
        ...dot,
        index,
        startPoint,
        endPoint,
        path,
        distance,
        animationDelay: index * 0.3
      };
    });
  }

  calculateBezierCurve(data) {
    const { points, steps = 100 } = data;
    const [p0, p1, p2, p3] = points;
    const curve = [];
    
    for (let t = 0; t <= 1; t += 1 / steps) {
      const x = Math.pow(1 - t, 3) * p0.x +
                3 * Math.pow(1 - t, 2) * t * p1.x +
                3 * (1 - t) * Math.pow(t, 2) * p2.x +
                Math.pow(t, 3) * p3.x;
      
      const y = Math.pow(1 - t, 3) * p0.y +
                3 * Math.pow(1 - t, 2) * t * p1.y +
                3 * (1 - t) * Math.pow(t, 2) * p2.y +
                Math.pow(t, 3) * p3.y;
      
      curve.push({ x, y, t });
    }
    
    return curve;
  }

  optimizeAnimationTimings(data) {
    const { animations, targetFPS = 60 } = data;
    const optimized = [];
    
    animations.forEach(animation => {
      const { duration, elements } = animation;
      const frameTime = 1000 / targetFPS;
      const totalFrames = Math.ceil(duration / frameTime);
      
      const optimizedAnimation = {
        ...animation,
        frameTime,
        totalFrames,
        elements: elements.map((element, index) => ({
          ...element,
          startFrame: Math.floor(element.delay / frameTime),
          endFrame: Math.floor((element.delay + element.duration) / frameTime)
        }))
      };
      
      optimized.push(optimizedAnimation);
    });
    
    return optimized;
  }

  // Helper methods
  toRad(value) {
    return value * Math.PI / 180;
  }

  applyEasing(t, easing) {
    switch (easing) {
      case 'easeInOut':
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      case 'easeIn':
        return t * t;
      case 'easeOut':
        return 1 - (1 - t) * (1 - t);
      case 'bounce':
        return this.bounceEase(t);
      case 'elastic':
        return this.elasticEase(t);
      default:
        return t; // linear
    }
  }

  bounceEase(t) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  }

  elasticEase(t) {
    const c4 = (2 * Math.PI) / 3;
    
    return t === 0
      ? 0
      : t === 1
      ? 1
      : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  }

  // Matrix operations for complex transformations
  multiplyMatrix(a, b) {
    const result = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < b.length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  // Spatial indexing for performance optimization
  createSpatialIndex(data) {
    const { points, gridSize = 50 } = data;
    const index = {};
    
    points.forEach((point, i) => {
      const gridX = Math.floor(point.x / gridSize);
      const gridY = Math.floor(point.y / gridSize);
      const key = `${gridX},${gridY}`;
      
      if (!index[key]) {
        index[key] = [];
      }
      
      index[key].push({ ...point, originalIndex: i });
    });
    
    return index;
  }
}

// Initialize processor
const processor = new MathProcessor();

// Listen for messages from main thread
self.addEventListener('message', (event) => {
  const { id, operation, data } = event.data;
  
  try {
    if (processor.operations[operation]) {
      const result = processor.operations[operation](data);
      
      // Send result back to main thread
      self.postMessage({
        id,
        success: true,
        result
      });
    } else {
      throw new Error(`Unknown operation: ${operation}`);
    }
  } catch (error) {
    // Send error back to main thread
    self.postMessage({
      id,
      success: false,
      error: error.message
    });
  }
});

// Signal that worker is ready
self.postMessage({ type: 'ready' }); 