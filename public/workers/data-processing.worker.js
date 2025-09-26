// Data Processing Web Worker
// Handles expensive data filtering, sorting, and transformation operations

class DataProcessor {
  constructor() {
    this.operations = {
      filterProjects: this.filterProjects.bind(this),
      sortProjects: this.sortProjects.bind(this),
      searchProjects: this.searchProjects.bind(this),
      processCategories: this.processCategories.bind(this),
      paginateData: this.paginateData.bind(this),
      transformProjectData: this.transformProjectData.bind(this)
    };
  }

  filterProjects(data) {
    const { projects, filters } = data;
    const { category, tags, client, dateRange } = filters;

    let filtered = [...projects];

    // Filter by category
    if (category && category !== 'All') {
      filtered = filtered.filter(project => 
        project.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by tags
    if (tags && tags.length > 0) {
      filtered = filtered.filter(project =>
        project.features?.some(feature =>
          tags.some(tag => feature.toLowerCase().includes(tag.toLowerCase()))
        )
      );
    }

    // Filter by client
    if (client) {
      filtered = filtered.filter(project =>
        project.client?.toLowerCase().includes(client.toLowerCase())
      );
    }

    // Filter by date range
    if (dateRange) {
      const { start, end } = dateRange;
      filtered = filtered.filter(project => {
        const projectDate = new Date(project.createdAt || Date.now());
        return projectDate >= start && projectDate <= end;
      });
    }

    return filtered;
  }

  sortProjects(data) {
    const { projects, sortBy, sortOrder = 'asc' } = data;
    
    const sorted = [...projects].sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case 'title':
          valueA = a.title?.toLowerCase() || '';
          valueB = b.title?.toLowerCase() || '';
          break;
        case 'category':
          valueA = a.category?.toLowerCase() || '';
          valueB = b.category?.toLowerCase() || '';
          break;
        case 'duration':
          valueA = this.parseDuration(a.duration);
          valueB = this.parseDuration(b.duration);
          break;
        case 'date':
          valueA = new Date(a.createdAt || 0);
          valueB = new Date(b.createdAt || 0);
          break;
        default:
          return 0;
      }

      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }

  searchProjects(data) {
    const { projects, searchTerm, searchFields = ['title', 'description', 'features'] } = data;
    
    if (!searchTerm.trim()) return projects;

    const term = searchTerm.toLowerCase();
    
    return projects.filter(project => {
      return searchFields.some(field => {
        const value = project[field];
        
        if (Array.isArray(value)) {
          return value.some(item => 
            String(item).toLowerCase().includes(term)
          );
        }
        
        return String(value || '').toLowerCase().includes(term);
      });
    });
  }

  processCategories(data) {
    const { projects } = data;
    
    // Extract unique categories
    const categories = new Set(['All']);
    projects.forEach(project => {
      if (project.category) {
        categories.add(project.category);
      }
      if (project.tag) {
        categories.add(project.tag);
      }
    });

    // Count projects per category
    const categoryCounts = {};
    Array.from(categories).forEach(category => {
      if (category === 'All') {
        categoryCounts[category] = projects.length;
      } else {
        categoryCounts[category] = projects.filter(project => 
          project.category === category || project.tag === category
        ).length;
      }
    });

    return {
      categories: Array.from(categories),
      categoryCounts
    };
  }

  paginateData(data) {
    const { items, page = 1, limit = 10 } = data;
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const paginatedItems = items.slice(startIndex, endIndex);
    const totalPages = Math.ceil(items.length / limit);
    
    return {
      items: paginatedItems,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount: items.length,
        limit,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        startIndex: startIndex + 1,
        endIndex: Math.min(endIndex, items.length)
      }
    };
  }

  transformProjectData(data) {
    const { projects, transformations } = data;
    
    return projects.map(project => {
      let transformed = { ...project };
      
      transformations.forEach(transform => {
        switch (transform.type) {
          case 'addSlug':
            transformed.slug = this.createSlug(project.title);
            break;
          case 'formatDuration':
            transformed.formattedDuration = this.formatDuration(project.duration);
            break;
          case 'extractColors':
            transformed.colors = this.extractColors(project.imageUrl);
            break;
          case 'calculateReadTime':
            transformed.readTime = this.calculateReadTime(project.description);
            break;
        }
      });
      
      return transformed;
    });
  }

  // Helper methods
  parseDuration(duration) {
    if (!duration) return 0;
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  }

  formatDuration(duration) {
    if (!duration) return 'Unknown';
    const months = this.parseDuration(duration);
    return months === 1 ? '1 month' : `${months} months`;
  }

  createSlug(title) {
    if (!title) return '';
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  calculateReadTime(text) {
    if (!text) return 0;
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }

  extractColors(imageUrl) {
    // Placeholder for color extraction logic
    // In a real implementation, you might use canvas or image processing
    return ['#3b82f6', '#1e40af', '#1d4ed8'];
  }
}

// Initialize processor
const processor = new DataProcessor();

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