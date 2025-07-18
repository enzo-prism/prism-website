/**
 * Image Monitoring and Health Check System
 *
 * Provides real-time monitoring of image loading performance,
 * error tracking, and automated health checks.
 */

interface ImageLoadMetrics {
  url: string
  loadTime: number
  success: boolean
  errorType?: string
  retryCount: number
  timestamp: number
  userAgent: string
  viewport: { width: number; height: number }
}

interface ImageHealthReport {
  totalRequests: number
  successfulLoads: number
  failedLoads: number
  averageLoadTime: number
  errorRate: number
  commonErrors: Record<string, number>
  slowestImages: Array<{ url: string; loadTime: number }>
  recommendations: string[]
}

class ImageMonitoringService {
  private metrics: ImageLoadMetrics[] = []
  private readonly maxMetrics = 1000 // Keep last 1000 metrics

  /**
   * Record image load metrics
   */
  recordImageLoad(url: string, loadTime: number, success: boolean, errorType?: string, retryCount = 0): void {
    const metric: ImageLoadMetrics = {
      url,
      loadTime,
      success,
      errorType,
      retryCount,
      timestamp: Date.now(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "server",
      viewport:
        typeof window !== "undefined"
          ? { width: window.innerWidth, height: window.innerHeight }
          : { width: 0, height: 0 },
    }

    this.metrics.push(metric)

    // Keep only recent metrics
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics)
    }

    // Log critical errors
    if (!success && retryCount === 0) {
      console.error(`Image load failed: ${url}`, { errorType, loadTime })
    }
  }

  /**
   * Generate health report
   */
  generateHealthReport(): ImageHealthReport {
    const totalRequests = this.metrics.length
    const successfulLoads = this.metrics.filter((m) => m.success).length
    const failedLoads = totalRequests - successfulLoads

    const loadTimes = this.metrics.filter((m) => m.success).map((m) => m.loadTime)

    const averageLoadTime = loadTimes.length > 0 ? loadTimes.reduce((sum, time) => sum + time, 0) / loadTimes.length : 0

    const errorRate = totalRequests > 0 ? (failedLoads / totalRequests) * 100 : 0

    // Count common errors
    const commonErrors: Record<string, number> = {}
    this.metrics
      .filter((m) => !m.success && m.errorType)
      .forEach((m) => {
        commonErrors[m.errorType!] = (commonErrors[m.errorType!] || 0) + 1
      })

    // Find slowest images
    const slowestImages = this.metrics
      .filter((m) => m.success)
      .sort((a, b) => b.loadTime - a.loadTime)
      .slice(0, 5)
      .map((m) => ({ url: m.url, loadTime: m.loadTime }))

    // Generate recommendations
    const recommendations: string[] = []

    if (errorRate > 5) {
      recommendations.push("High error rate detected - investigate image hosting and paths")
    }

    if (averageLoadTime > 2000) {
      recommendations.push("Slow image loading detected - consider image optimization")
    }

    if (Object.keys(commonErrors).length > 0) {
      recommendations.push("Common errors found - check image file integrity")
    }

    return {
      totalRequests,
      successfulLoads,
      failedLoads,
      averageLoadTime,
      errorRate,
      commonErrors,
      slowestImages,
      recommendations,
    }
  }

  /**
   * Check image accessibility
   */
  async checkImageAccessibility(url: string): Promise<boolean> {
    try {
      const startTime = performance.now()
      const response = await fetch(url, { method: "HEAD" })
      const loadTime = performance.now() - startTime

      const success = response.ok && (response.headers.get("Content-Type")?.startsWith("image/") ?? false)

      this.recordImageLoad(url, loadTime, success, success ? undefined : `HTTP ${response.status}`, 0)

      return success
    } catch (error) {
      this.recordImageLoad(url, 0, false, error instanceof Error ? error.message : "Unknown error", 0)
      return false
    }
  }

  /**
   * Batch check multiple images
   */
  async batchCheckImages(urls: string[]): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {}

    const checks = urls.map(async (url) => {
      results[url] = await this.checkImageAccessibility(url)
    })

    await Promise.all(checks)
    return results
  }

  /**
   * Get metrics for specific image
   */
  getImageMetrics(url: string): ImageLoadMetrics[] {
    return this.metrics.filter((m) => m.url === url)
  }

  /**
   * Clear old metrics
   */
  clearMetrics(): void {
    this.metrics = []
  }
}

// Global instance
export const imageMonitor = new ImageMonitoringService()

/**
 * Hook for monitoring image loads in React components
 */
export function useImageMonitoring() {
  const recordLoad = (url: string, loadTime: number, success: boolean, errorType?: string, retryCount?: number) => {
    imageMonitor.recordImageLoad(url, loadTime, success, errorType, retryCount)
  }

  const getHealthReport = () => imageMonitor.generateHealthReport()

  const checkAccessibility = (url: string) => imageMonitor.checkImageAccessibility(url)

  return {
    recordLoad,
    getHealthReport,
    checkAccessibility,
  }
}
