/**
 * Image Path Resolver and Validator
 *
 * Handles image path resolution, validation, and optimization
 * to prevent broken links and ensure consistent image delivery.
 */

interface ImagePathConfig {
  basePath: string
  fallbackPath: string
  supportedFormats: string[]
  optimizationEnabled: boolean
  cdnEnabled: boolean
  cdnBaseUrl?: string
}

interface ResolvedImagePath {
  originalPath: string
  resolvedPath: string
  fallbackPath: string
  isOptimized: boolean
  format: string
  isValid: boolean
  errors: string[]
}

class ImagePathResolver {
  private config: ImagePathConfig = {
    basePath: "/public",
    fallbackPath: "/placeholder.svg",
    supportedFormats: [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"],
    optimizationEnabled: true,
    cdnEnabled: false,
  }

  /**
   * Configure the resolver
   */
  configure(config: Partial<ImagePathConfig>): void {
    this.config = { ...this.config, ...config }
  }

  /**
   * Resolve and validate image path
   */
  resolvePath(
    imagePath: string,
    options?: {
      width?: number
      height?: number
      quality?: number
      format?: string
    },
  ): ResolvedImagePath {
    const result: ResolvedImagePath = {
      originalPath: imagePath,
      resolvedPath: imagePath,
      fallbackPath: this.config.fallbackPath,
      isOptimized: false,
      format: "unknown",
      isValid: false,
      errors: [],
    }

    // Validate input
    if (!imagePath || typeof imagePath !== "string") {
      result.errors.push("Invalid image path: must be a non-empty string")
      return result
    }

    // Clean and normalize path
    let cleanPath = this.cleanPath(imagePath)

    // Validate path format
    const pathValidation = this.validatePath(cleanPath)
    if (!pathValidation.isValid) {
      result.errors.push(...pathValidation.errors)
      return result
    }

    // Extract format
    result.format = this.extractFormat(cleanPath)

    // Apply optimizations if enabled
    if (this.config.optimizationEnabled && options) {
      cleanPath = this.applyOptimizations(cleanPath, options)
      result.isOptimized = true
    }

    // Apply CDN if enabled
    if (this.config.cdnEnabled && this.config.cdnBaseUrl) {
      cleanPath = this.applyCdn(cleanPath)
    }

    result.resolvedPath = cleanPath
    result.isValid = true

    return result
  }

  /**
   * Clean and normalize image path
   */
  private cleanPath(path: string): string {
    // Remove extra whitespace
    let cleaned = path.trim()

    // Ensure starts with /
    if (!cleaned.startsWith("/")) {
      cleaned = "/" + cleaned
    }

    // Remove double slashes
    cleaned = cleaned.replace(/\/+/g, "/")

    // Remove trailing slash
    if (cleaned.length > 1 && cleaned.endsWith("/")) {
      cleaned = cleaned.slice(0, -1)
    }

    return cleaned
  }

  /**
   * Validate image path - Fixed to allow valid URL characters
   */
  private validatePath(path: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Check for truly invalid characters (only filesystem-unsafe characters)
    // Removed ? and = from invalid chars as they're valid in URLs for query parameters
    const invalidChars = /[<>:"|*]/
    if (invalidChars.test(path)) {
      errors.push("Path contains invalid characters")
    }

    // Allow spaces in query parameters (they'll be URL encoded)
    // Only flag spaces in the main path portion
    const pathParts = path.split("?")
    const mainPath = pathParts[0]

    if (mainPath.includes(" ")) {
      errors.push("Path contains unencoded spaces in main path")
    }

    // Check file extension or allow query parameters for dynamic images
    const hasValidExtension =
      this.config.supportedFormats.some((format) => mainPath.toLowerCase().endsWith(format)) ||
      path.includes("placeholder.svg") // Allow placeholder URLs

    if (!hasValidExtension) {
      errors.push(`Unsupported file format. Supported: ${this.config.supportedFormats.join(", ")}`)
    }

    // Check path length
    if (path.length > 2048) {
      // Increased from 255 to accommodate URLs with query params
      errors.push("Path too long (max 2048 characters)")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  /**
   * Extract image format from path
   */
  private extractFormat(path: string): string {
    // Handle paths with query parameters
    const pathWithoutQuery = path.split("?")[0]
    const extension = pathWithoutQuery.toLowerCase().split(".").pop()
    return extension || "unknown"
  }

  /**
   * Apply image optimizations
   */
  private applyOptimizations(
    path: string,
    options: {
      width?: number
      height?: number
      quality?: number
      format?: string
    },
  ): string {
    // For Next.js Image component, optimizations are handled automatically
    // This method could be extended for custom optimization logic
    return path
  }

  /**
   * Apply CDN URL
   */
  private applyCdn(path: string): string {
    if (!this.config.cdnBaseUrl) return path

    // Remove leading slash for CDN concatenation
    const cleanPath = path.startsWith("/") ? path.slice(1) : path
    return `${this.config.cdnBaseUrl}/${cleanPath}`
  }

  /**
   * Generate fallback path with parameters
   */
  generateFallback(width?: number, height?: number, text?: string): string {
    const params = new URLSearchParams()

    if (width) params.set("width", width.toString())
    if (height) params.set("height", height.toString())
    if (text) params.set("query", text)

    const queryString = params.toString()
    return queryString ? `${this.config.fallbackPath}?${queryString}` : this.config.fallbackPath
  }

  /**
   * Batch resolve multiple paths
   */
  batchResolve(
    paths: string[],
    options?: {
      width?: number
      height?: number
      quality?: number
      format?: string
    },
  ): Record<string, ResolvedImagePath> {
    const results: Record<string, ResolvedImagePath> = {}

    paths.forEach((path) => {
      results[path] = this.resolvePath(path, options)
    })

    return results
  }

  /**
   * Get optimization recommendations for a path
   */
  getOptimizationRecommendations(path: string): string[] {
    const recommendations: string[] = []
    const format = this.extractFormat(path)

    if (format === "png" && !path.includes("logo") && !path.includes("icon")) {
      recommendations.push("Consider converting PNG to WebP for better compression")
    }

    if (format === "jpg" || format === "jpeg") {
      recommendations.push("Ensure JPEG quality is optimized (70-85% recommended)")
    }

    if (path.includes("mobile") || path.includes("screenshot")) {
      recommendations.push("Optimize for mobile viewport (300-400px width)")
    }

    if (!path.includes("optimized") && !path.includes("compressed")) {
      recommendations.push("Consider adding image optimization to build process")
    }

    return recommendations
  }
}

// Global instance
export const imagePathResolver = new ImagePathResolver()

// Configure for Next.js environment
imagePathResolver.configure({
  basePath: "/public",
  fallbackPath: "/placeholder.svg",
  optimizationEnabled: true,
  cdnEnabled: false,
})

/**
 * Utility function for resolving image paths in components
 */
export function resolveImagePath(
  path: string,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: string
  },
): ResolvedImagePath {
  return imagePathResolver.resolvePath(path, options)
}

/**
 * Utility function for generating fallback images
 */
export function generateImageFallback(width?: number, height?: number, text?: string): string {
  return imagePathResolver.generateFallback(width, height, text)
}
