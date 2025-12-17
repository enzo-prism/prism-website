"use client"

import { getSentryModule } from "@/utils/sentry-client"
import { addBreadcrumb, isSentryInitialized } from "./sentry-helpers"

export interface PerformanceMetrics {
  metric: string
  value: number
  unit: string
  timestamp: Date
  context?: Record<string, any>
}

/**
 * Start a custom Sentry transaction for performance monitoring
 */
export function startPerformanceTransaction(
  name: string,
  operation: string,
  description?: string
): any {
  if (!isSentryInitialized()) return null
  
  try {
    const Sentry = getSentryModule()
    if (!Sentry) return null

    const span = Sentry.startSpan({
      name,
      op: operation,
    }, () => {
      return {
        name,
        operation,
        setData: (key: string, value: any) => Sentry.setTag(key, String(value)),
        setStatus: (status: string) => Sentry.setTag("status", status),
        finish: () => {},
      }
    })
    
    addBreadcrumb(
      `Started performance transaction: ${name}`,
      "performance",
      "info",
      { operation, description }
    )
    
    return span
  } catch {
    return {
      name,
      operation,
      setData: () => {},
      finish: () => {},
    }
  }
}

/**
 * Create a span within a transaction for detailed performance tracking
 */
export function createPerformanceSpan(
  transaction: any,
  operation: string,
  description: string,
  data?: Record<string, any>
): any {
  if (!transaction || !isSentryInitialized()) return null
  
  try {
    const Sentry = getSentryModule()
    if (!Sentry) return null

    return Sentry.startSpan({
      name: description,
      op: operation,
    }, () => {
      return {
        setData: (key: string, value: any) => {
          if (data) {
            Object.entries(data).forEach(([k, v]) => {
              Sentry.setTag(`${operation}_${k}`, String(v))
            })
          }
          Sentry.setTag(key, String(value))
        },
        finish: () => {},
      }
    })
  } catch {
    return {
      setData: () => {},
      finish: () => {},
    }
  }
}

/**
 * Track Web Vitals performance metrics
 */
export function trackWebVitals() {
  if (typeof window === "undefined" || !isSentryInitialized()) return

  const Sentry = getSentryModule()
  if (!Sentry) return
  
  // Track First Contentful Paint (FCP)
  if ('performance' in window && 'getEntriesByType' in window.performance) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
          Sentry.addBreadcrumb({
            message: `FCP: ${entry.startTime}ms`,
            category: 'performance',
            level: 'info',
            data: {
              metric: 'first-contentful-paint',
              value: entry.startTime,
              unit: 'ms',
            },
          })
        }
        
        if (entry.entryType === 'largest-contentful-paint') {
          Sentry.addBreadcrumb({
            message: `LCP: ${entry.startTime}ms`,
            category: 'performance',
            level: 'info',
            data: {
              metric: 'largest-contentful-paint',
              value: entry.startTime,
              unit: 'ms',
            },
          })
        }
      }
    })
    
    try {
      observer.observe({ entryTypes: ['paint'] })
      
      // Separate observer for LCP
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            Sentry.addBreadcrumb({
              message: `LCP: ${entry.startTime}ms`,
              category: 'performance',
              level: 'info',
              data: {
                metric: 'largest-contentful-paint',
                value: entry.startTime,
                unit: 'ms',
              },
            })
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch {
        // LCP observer not supported
      }
    } catch (error) {
      console.warn('Performance observer not supported:', error)
    }
  }
  
  // Track Cumulative Layout Shift (CLS)
  if ('PerformanceObserver' in window) {
    try {
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        for (const entry of list.getEntries()) {
          const layoutShift = entry as any
          if (!layoutShift.hadRecentInput) {
            clsValue += layoutShift.value || 0
          }
        }
        
        if (clsValue > 0) {
          Sentry.addBreadcrumb({
            message: `CLS: ${clsValue}`,
            category: 'performance',
            level: clsValue > 0.1 ? 'warning' : 'info',
            data: {
              metric: 'cumulative-layout-shift',
              value: clsValue,
              unit: 'score',
            },
          })
        }
      })
      
      clsObserver.observe({ entryTypes: ['layout-shift'] })
    } catch (error) {
      console.warn('CLS observer not supported:', error)
    }
  }
}

/**
 * Track page load performance
 */
export function trackPageLoadPerformance(pagePath: string) {
  if (typeof window === "undefined" || !isSentryInitialized()) return
  
  const transaction = startPerformanceTransaction(
    `Page Load: ${pagePath}`,
    'navigation',
    `Loading page: ${pagePath}`
  )
  
  if (!transaction) return
  
  // Track navigation timing
  window.addEventListener('load', () => {
    const navigationSpan = createPerformanceSpan(
      transaction,
      'navigation.timing',
      'Page navigation timing'
    )
    
    if (navigationSpan && 'performance' in window && 'timing' in window.performance) {
      const timing = window.performance.timing
      const navigationStart = timing.navigationStart
      
      const metrics = {
        domContentLoaded: timing.domContentLoadedEventEnd - navigationStart,
        loadComplete: timing.loadEventEnd - navigationStart,
        domInteractive: timing.domInteractive - navigationStart,
        firstPaint: timing.responseEnd - navigationStart,
      }
      
      navigationSpan.setData('metrics', metrics)
      navigationSpan.finish()
      
      addBreadcrumb(
        `Page load metrics for ${pagePath}`,
        'performance',
        'info',
        {
          ...metrics,
          pagePath,
        }
      )
    }
    
    // Finish the transaction after a delay to capture more metrics
    setTimeout(() => {
      transaction.finish()
    }, 1000)
  })
  
  return transaction
}

/**
 * Track API call performance
 */
export function trackAPIPerformance<T>(
  apiName: string,
  apiCall: () => Promise<T>,
  context?: Record<string, any>
): Promise<T> {
  if (!isSentryInitialized()) {
    return apiCall()
  }
  
  const transaction = startPerformanceTransaction(
    `API Call: ${apiName}`,
    'http.client',
    `API request to ${apiName}`
  )
  
  const startTime = Date.now()
  
  return apiCall()
    .then((result) => {
      const duration = Date.now() - startTime
      
      if (transaction) {
        transaction.setData('success', true)
        transaction.setData('duration', duration)
        transaction.setData('context', context)
        transaction.finish()
      }
      
      addBreadcrumb(
        `API call ${apiName} succeeded`,
        'http',
        'info',
        {
          apiName,
          duration,
          success: true,
          ...context,
        }
      )
      
      return result
    })
    .catch((error) => {
      const duration = Date.now() - startTime
      
      if (transaction) {
        transaction.setData('success', false)
        transaction.setData('duration', duration)
        transaction.setData('error', error.message)
        transaction.setData('context', context)
        if (typeof transaction.setStatus === "function") {
          transaction.setStatus('internal_error')
        }
        transaction.finish()
      }
      
      addBreadcrumb(
        `API call ${apiName} failed`,
        'http',
        'error',
        {
          apiName,
          duration,
          success: false,
          error: error.message,
          ...context,
        }
      )
      
      throw error
    })
}

/**
 * Track component render performance
 */
export function trackComponentRender(
  componentName: string,
  renderFunction: () => void,
  props?: Record<string, any>
): void {
  if (!isSentryInitialized()) {
    renderFunction()
    return
  }

  const Sentry = getSentryModule()
  if (!Sentry) {
    renderFunction()
    return
  }
  
  let span: any = null
  try {
    span = Sentry.startSpan({
      name: `Render ${componentName}`,
      op: 'react.render',
    }, () => ({
      setData: (key: string, value: any) => Sentry.setTag(key, String(value)),
      setStatus: (status: string) => Sentry.setTag('status', status),
      finish: () => {},
    }))
  } catch {
    span = {
      setData: () => {},
      setStatus: () => {},
      finish: () => {},
    }
  }
  
  const startTime = performance.now()
  
  try {
    renderFunction()
    
    const duration = performance.now() - startTime
    
    if (span) {
      span.setData('duration', duration)
      span.setData('success', true)
      span.finish()
    }
    
    // Log slow renders
    if (duration > 16) { // More than one frame at 60fps
      addBreadcrumb(
        `Slow render detected: ${componentName}`,
        'performance',
        'warning',
        {
          component: componentName,
          duration,
          threshold: 16,
        }
      )
    }
  } catch (error) {
    const duration = performance.now() - startTime
    
    if (span) {
      span.setData('duration', duration)
      span.setData('success', false)
      span.setData('error', error instanceof Error ? error.message : String(error))
      span.setStatus('internal_error')
      span.finish()
    }
    
    throw error
  }
}

/**
 * Track bundle and resource loading performance
 */
export function trackResourceLoadingPerformance() {
  if (typeof window === "undefined" || !isSentryInitialized()) return
  
  window.addEventListener('load', () => {
    if ('performance' in window && 'getEntriesByType' in window.performance) {
      const resources = window.performance.getEntriesByType('resource')
      
      for (const resource of resources) {
        const entry = resource as PerformanceResourceTiming
        
        // Track slow resources (> 1 second)
        if (entry.duration > 1000) {
          addBreadcrumb(
            `Slow resource loading: ${entry.name}`,
            'performance',
            'warning',
            {
              resource: entry.name,
              duration: entry.duration,
              size: entry.transferSize,
              type: entry.initiatorType,
            }
          )
        }
        
        // Track large resources (> 1MB)
        if (entry.transferSize && entry.transferSize > 1024 * 1024) {
          addBreadcrumb(
            `Large resource loaded: ${entry.name}`,
            'performance',
            'info',
            {
              resource: entry.name,
              size: entry.transferSize,
              duration: entry.duration,
              type: entry.initiatorType,
            }
          )
        }
      }
    }
  })
}

/**
 * Initialize all performance monitoring
 */
export function initializePerformanceMonitoring() {
  if (typeof window === "undefined" || !isSentryInitialized()) return
  
  // Track Web Vitals
  trackWebVitals()
  
  // Track resource loading
  trackResourceLoadingPerformance()
  
  // Track page visibility for performance context
  document.addEventListener('visibilitychange', () => {
    addBreadcrumb(
      `Page visibility changed: ${document.visibilityState}`,
      'performance',
      'info',
      {
        visibilityState: document.visibilityState,
        timestamp: Date.now(),
      }
    )
  })
  
  addBreadcrumb(
    'Performance monitoring initialized',
    'system',
    'info'
  )
}
