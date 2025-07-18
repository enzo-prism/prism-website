/**
 * Utility functions for image handling
 */

/**
 * Checks if an image URL is valid and accessible
 * @param url URL of the image to check
 * @returns Promise that resolves to a boolean indicating if the image is valid
 */
export async function isImageValid(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.ok && (response.headers.get("Content-Type")?.startsWith("image/") ?? false)
  } catch (error) {
    return false
  }
}

/**
 * Preloads an image
 * @param src Source URL of the image
 * @returns Promise that resolves when the image is loaded
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
    img.crossOrigin = "anonymous" // Avoid CORS issues with canvas
  })
}

/**
 * Generates a data URL for a placeholder SVG
 * @param width Width of the SVG
 * @param height Height of the SVG
 * @param color Background color of the SVG
 * @returns Data URL for the SVG
 */
export function generatePlaceholderSVG(width: number, height: number, color = "#f3f4f6"): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${color}" /></svg>`
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

/**
 * Generates a placeholder URL for the Next.js Image component
 * @param width Width of the image
 * @param height Height of the image
 * @param alt Alt text for the image
 * @returns Placeholder URL
 */
export function generatePlaceholderURL(width: number, height: number, alt: string): string {
  return `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(alt || "placeholder image")}`
}

/**
 * Validates image dimensions to prevent layout shift
 * @param width Width to validate
 * @param height Height to validate
 * @returns Object with validated width and height
 */
export function validateImageDimensions(width: unknown, height: unknown): { width: number; height: number } {
  const defaultWidth = 100
  const defaultHeight = 100

  const validatedWidth = typeof width === "number" && !isNaN(width) && width > 0 ? width : defaultWidth

  const validatedHeight = typeof height === "number" && !isNaN(height) && height > 0 ? height : defaultHeight

  return { width: validatedWidth, height: validatedHeight }
}
