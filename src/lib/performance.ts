// Performance optimization utilities

export const preloadRoute = (href: string): void => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    document.head.appendChild(link)
  }
}

export const preloadImage = (src: string): void => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  }
}

export const debounce = <T extends (...args: undefined[]) => undefined>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends (...args: undefined[]) => undefined>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Optimize images for different screen sizes
export const getOptimizedImageSrc = (
  baseSrc: string,
  width: number,
  quality: number = 75
): string => {
  // For Next.js Image optimization
  const params = new URLSearchParams({
    url: baseSrc,
    w: width.toString(),
    q: quality.toString()
  })
  return `/_next/image?${params.toString()}`
}
