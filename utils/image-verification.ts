/**
 * Image Verification Utility
 *
 * This utility provides functions to verify image URLs and ensure they're properly configured
 * for Next.js Image component usage.
 */

/**
 * Checks if an image URL is valid and accessible
 * @param url URL of the image to check
 * @returns Promise that resolves to a boolean indicating if the image is valid
 */
export async function verifyImageUrl(url: string): Promise<boolean> {
  try {
    // For local images in the public directory
    if (url.startsWith("/") && !url.startsWith("//")) {
      // In a browser environment, we can't directly check the file system
      // This is a best-effort check that will work in most cases
      return true
    }

    // For remote images, attempt to fetch the headers
    const response = await fetch(url, { method: "HEAD" })

    // Check if the response is OK and the content type is an image
    return response.ok && (response.headers.get("Content-Type")?.startsWith("image/") ?? false)
  } catch (error) {
    console.error(`Failed to verify image URL: ${url}`, error)
    return false
  }
}

/**
 * Checks if an image domain is configured in Next.js config
 * @param url URL of the image to check
 * @param configuredDomains Array of configured domains from next.config.js
 * @returns Boolean indicating if the domain is configured
 */
export function isDomainConfigured(url: string, configuredDomains: string[]): boolean {
  try {
    // Only check remote URLs
    if (!url.startsWith("http")) return true

    const urlObj = new URL(url)
    return configuredDomains.some((domain) => {
      // Handle wildcard domains (e.g., *.example.com)
      if (domain.startsWith("*.")) {
        const baseDomain = domain.substring(2)
        return urlObj.hostname.endsWith(baseDomain)
      }
      return urlObj.hostname === domain
    })
  } catch (error) {
    console.error(`Failed to check domain configuration for URL: ${url}`, error)
    return false
  }
}

/**
 * Validates image dimensions to ensure they're appropriate
 * @param width Image width
 * @param height Image height
 * @param minWidth Minimum acceptable width
 * @param minHeight Minimum acceptable height
 * @returns Boolean indicating if dimensions are valid
 */
export function validateImageDimensions(width: number, height: number, minWidth = 1, minHeight = 1): boolean {
  return width >= minWidth && height >= minHeight
}

/**
 * Generates a data URL for a placeholder image
 * @param width Width of the placeholder
 * @param height Height of the placeholder
 * @param text Optional text to display on the placeholder
 * @returns Data URL for the placeholder image
 */
export function generatePlaceholderDataUrl(width: number, height: number, text?: string): string {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      ${text ? `<text x="50%" y="50%" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle" fill="#6b7280">${text}</text>` : ""}
    </svg>
  `

  return `data:image/svg+xml;base64,${btoa(svg.trim())}`
}

/**
 * Extracts domains from Next.js remotePatterns configuration
 * @param remotePatterns Array of remote patterns from next.config.js
 * @returns Array of domain strings
 */
export function extractConfiguredDomains(remotePatterns: any[]): string[] {
  return remotePatterns.map((pattern) => pattern.hostname)
}

/**
 * Checks if an image should use the priority attribute
 * @param position Position of the image on the page (e.g., 'hero', 'above-fold', 'below-fold')
 * @returns Boolean indicating if priority should be used
 */
export function shouldUsePriority(position: "hero" | "above-fold" | "below-fold"): boolean {
  return position === "hero" || position === "above-fold"
}
