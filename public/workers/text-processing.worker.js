// Text Processing Web Worker
// Handles expensive text splitting and animation calculation operations

class TextProcessor {
  constructor() {
    this.operations = {
      splitText: this.splitText.bind(this),
      calculateStaggerDelays: this.calculateStaggerDelays.bind(this),
      processAnimationSequence: this.processAnimationSequence.bind(this)
    };
  }

  splitText(data) {
    const { text, splitBy } = data;
    
    switch (splitBy) {
      case 'characters':
        return this.splitIntoCharacters(text);
      case 'words':
        return text.split(' ');
      case 'lines':
        return text.split('\n');
      default:
        return text.split(splitBy);
    }
  }

  splitIntoCharacters(text) {
    const words = text.split(' ');
    return words.map((word, i) => ({
      characters: word.split(''),
      needsSpace: i !== words.length - 1,
    }));
  }

  calculateStaggerDelays(data) {
    const { elements, staggerFrom, staggerDuration, splitBy } = data;
    
    const total = splitBy === 'characters'
      ? elements.reduce((acc, word) => 
          acc + (typeof word === 'string' ? 1 : word.characters.length + (word.needsSpace ? 1 : 0)), 0)
      : elements.length;

    const delays = [];
    
    for (let index = 0; index < total; index++) {
      let delay;
      
      switch (staggerFrom) {
        case 'first':
          delay = index * staggerDuration;
          break;
        case 'last':
          delay = (total - 1 - index) * staggerDuration;
          break;
        case 'center':
          const center = Math.floor(total / 2);
          delay = Math.abs(center - index) * staggerDuration;
          break;
        case 'random':
          const randomIndex = Math.floor(Math.random() * total);
          delay = Math.abs(randomIndex - index) * staggerDuration;
          break;
        default:
          delay = Math.abs(staggerFrom - index) * staggerDuration;
      }
      
      delays.push(delay);
    }
    
    return delays;
  }

  processAnimationSequence(data) {
    const { text, config } = data;
    const { splitBy, staggerFrom, staggerDuration } = config;
    
    // Split text into elements
    const elements = this.splitText({ text, splitBy });
    
    // Calculate stagger delays
    const delays = this.calculateStaggerDelays({
      elements,
      staggerFrom,
      staggerDuration,
      splitBy
    });
    
    // Prepare animation data
    const animationData = elements.map((element, index) => ({
      element,
      delay: delays[index],
      index
    }));
    
    return {
      elements,
      delays,
      animationData,
      total: elements.length
    };
  }
}

// Initialize processor
const processor = new TextProcessor();

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