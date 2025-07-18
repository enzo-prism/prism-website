"use client"

// Mobile Performance Monitoring and Optimization Utilities

interface PerformanceMetrics {
  loadTime: number
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
  timeToInteractive: number
  memoryUsage?: number
  batteryLevel?: number
  connectionType?: string
  deviceType: 'mobile' | 'tablet' | 'desktop'
}

class MobilePerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {}
  private observers: PerformanceObserver[] = []
  private isMonitoring = false

  constructor() {
    this.detectDeviceType()
    this.initializeMonitoring()
  }

  private detectDeviceType(): void {
    const userAgent = navigator.userAgent.toLowerCase()
    const screenWidth = window.screen.width
    
    if (userAgent.includes('mobile') || screenWidth < 768) {
      this.metrics.deviceType = 'mobile'
    } else if (screenWidth < 1024) {
      this.metrics.deviceType = 'tablet'
    } else {
      this.metrics.deviceType = 'desktop'
    }
  }

  private initializeMonitoring(): void {
    if (this.isMonitoring) return
    this.isMonitoring = true

    // Monitor Core Web Vitals
    this.observeWebVitals()
    
    // Monitor resource timing
    this.observeResourceTiming()
    
    // Monitor memory usage (if available)
    this.observeMemoryUsage()
    
    // Monitor battery status (if available)
    this.observeBatteryStatus()
    
    // Monitor connection type
    this.observeConnectionType()
  }

  private observeWebVitals(): void {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.metrics.largestContentfulPaint = lastEntry.startTime
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.push(lcpObserver)

      // First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry: any) => {
          this.metrics.firstInputDelay = entry.processingStart - entry.startTime
        })
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
      this.observers.push(fidObserver)

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            this.metrics.cumulativeLayoutShift = 
              (this.metrics.cumulativeLayoutShift || 0) + entry.value
          }
        })
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(clsObserver)
    }

    // First Contentful Paint
    if ('performance' in window && 'getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint')
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint')
      if (fcpEntry) {
        this.metrics.firstContentfulPaint = fcpEntry.startTime
      }
    }
  }

  private observeResourceTiming(): void {
    if ('performance' in window) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
      this.metrics.loadTime = loadTime
      
      // Time to Interactive approximation
      const ttfb = performance.timing.responseStart - performance.timing.navigationStart
      const domContentLoaded = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
      this.metrics.timeToInteractive = Math.max(domContentLoaded, ttfb)
    }
  }

  private observeMemoryUsage(): void {
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory
      this.metrics.memoryUsage = memoryInfo.usedJSHeapSize / (1024 * 1024) // MB
    }
  }

  private observeBatteryStatus(): void {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        this.metrics.batteryLevel = battery.level * 100
      })
    }
  }

  private observeConnectionType(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      this.metrics.connectionType = connection.effectiveType
    }
  }

  public getMetrics(): PerformanceMetrics {
    return this.metrics as PerformanceMetrics
  }

  public getMobileOptimizationSuggestions(): string[] {
    const suggestions: string[] = []
    const metrics = this.getMetrics()

    // LCP suggestions
    if (metrics.largestContentfulPaint > 2500) {
      suggestions.push('Consider optimizing images and reducing server response time')
    }

    // FID suggestions
    if (metrics.firstInputDelay > 100) {
      suggestions.push('Reduce JavaScript execution time and consider code splitting')
    }

    // CLS suggestions
    if (metrics.cumulativeLayoutShift > 0.1) {
      suggestions.push('Add size attributes to images and reserve space for dynamic content')
    }

    // Memory suggestions
    if (metrics.memoryUsage && metrics.memoryUsage > 50) {
      suggestions.push('Consider reducing memory usage by optimizing images and animations')
    }

    // Battery suggestions
    if (metrics.batteryLevel && metrics.batteryLevel < 20) {
      suggestions.push('Device battery is low - consider reducing animations and background processes')
    }

    // Connection suggestions
    if (metrics.connectionType && ['slow-2g', '2g'].includes(metrics.connectionType)) {
      suggestions.push('Slow connection detected - consider reducing image sizes and deferring non-critical resources')
    }

    return suggestions
  }

  public shouldOptimizeForMobile(): boolean {
    const metrics = this.getMetrics()
    return metrics.deviceType === 'mobile' || 
           (metrics.batteryLevel && metrics.batteryLevel < 30) ||
           (metrics.connectionType && ['slow-2g', '2g', '3g'].includes(metrics.connectionType))
  }

  public getOptimalAnimationSettings(): { duration: number; easing: string; reduce: boolean } {
    const metrics = this.getMetrics()
    const shouldReduce = this.shouldOptimizeForMobile() || 
                        (metrics.memoryUsage && metrics.memoryUsage > 30) ||
                        (metrics.batteryLevel && metrics.batteryLevel < 20)

    return {
      duration: shouldReduce ? 0.2 : 0.5,
      easing: shouldReduce ? 'linear' : 'easeOut',
      reduce: shouldReduce
    }
  }

  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
    this.isMonitoring = false
  }
}

// Singleton instance
let performanceMonitor: MobilePerformanceMonitor | null = null

export function getMobilePerformanceMonitor(): MobilePerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new MobilePerformanceMonitor()
  }
  return performanceMonitor
}

// Utility functions
export function optimizeForMobile<T>(
  mobileValue: T,
  desktopValue: T,
  monitor?: MobilePerformanceMonitor
): T {
  const perfMonitor = monitor || getMobilePerformanceMonitor()
  return perfMonitor.shouldOptimizeForMobile() ? mobileValue : desktopValue
}

export function getOptimalImageSize(
  baseSize: number,
  monitor?: MobilePerformanceMonitor
): number {
  const perfMonitor = monitor || getMobilePerformanceMonitor()
  const metrics = perfMonitor.getMetrics()
  
  let multiplier = 1
  
  if (metrics.deviceType === 'mobile') {
    multiplier *= 0.8
  }
  
  if (metrics.connectionType && ['slow-2g', '2g'].includes(metrics.connectionType)) {
    multiplier *= 0.6
  }
  
  if (metrics.batteryLevel && metrics.batteryLevel < 20) {
    multiplier *= 0.7
  }
  
  return Math.round(baseSize * multiplier)
}

export function shouldDeferNonCriticalResources(
  monitor?: MobilePerformanceMonitor
): boolean {
  const perfMonitor = monitor || getMobilePerformanceMonitor()
  const metrics = perfMonitor.getMetrics()
  
  return (
    metrics.deviceType === 'mobile' ||
    (metrics.batteryLevel && metrics.batteryLevel < 30) ||
    (metrics.connectionType && ['slow-2g', '2g', '3g'].includes(metrics.connectionType)) ||
    (metrics.memoryUsage && metrics.memoryUsage > 40)
  )
}

export function getOptimalChunkSize(
  baseSize: number,
  monitor?: MobilePerformanceMonitor
): number {
  const perfMonitor = monitor || getMobilePerformanceMonitor()
  const metrics = perfMonitor.getMetrics()
  
  if (metrics.deviceType === 'mobile') {
    return Math.min(baseSize, 5) // Smaller chunks for mobile
  }
  
  if (metrics.connectionType && ['slow-2g', '2g'].includes(metrics.connectionType)) {
    return Math.min(baseSize, 3) // Very small chunks for slow connections
  }
  
  return baseSize
}

// Performance monitoring hook
export function usePerformanceMonitoring() {
  const monitor = getMobilePerformanceMonitor()
  
  return {
    monitor,
    metrics: monitor.getMetrics(),
    suggestions: monitor.getMobileOptimizationSuggestions(),
    shouldOptimizeForMobile: monitor.shouldOptimizeForMobile(),
    animationSettings: monitor.getOptimalAnimationSettings(),
    optimizeForMobile: <T>(mobileValue: T, desktopValue: T) => 
      optimizeForMobile(mobileValue, desktopValue, monitor),
    getOptimalImageSize: (baseSize: number) => getOptimalImageSize(baseSize, monitor),
    shouldDeferResources: shouldDeferNonCriticalResources(monitor),
    getOptimalChunkSize: (baseSize: number) => getOptimalChunkSize(baseSize, monitor)
  }
}