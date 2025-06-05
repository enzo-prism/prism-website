"use client"

import EnhancedImage from "./enhanced-image"
import ImageErrorBoundary from "./image-error-boundary"
import { preloadImage } from "@/utils/image-utils"
import { useEffect } from "react"

export default function ImageUsageExample() {
  // Preload critical images
  useEffect(() => {
    const criticalImages = [
      "/prism-logo.jpeg",
      "/favicon-large.png",
      // Add other critical images here
    ]

    criticalImages.forEach((src) => {
      preloadImage(src).catch((err) => {
        console.warn(`Failed to preload image: ${src}`, err)
      })
    })
  }, [])

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Example 1: Basic usage with fallback */}
      <div className="p-4 border rounded-lg">
        <h3 className="mb-2 font-medium">Basic Usage with Fallback</h3>
        <ImageErrorBoundary>
          <EnhancedImage
            src="/prism-logo.jpeg"
            alt="Prism Logo"
            width={200}
            height={200}
            fallbackSrc="/favicon-large.png"
            className="rounded-lg"
          />
        </ImageErrorBoundary>
      </div>

      {/* Example 2: With loading state */}
      <div className="p-4 border rounded-lg">
        <h3 className="mb-2 font-medium">With Loading State</h3>
        <ImageErrorBoundary>
          <EnhancedImage
            src="/team-photo.png"
            alt="Team Photo"
            width={300}
            height={200}
            showLoadingState={true}
            className="rounded-lg"
          />
        </ImageErrorBoundary>
      </div>

      {/* Example 3: With priority for LCP */}
      <div className="p-4 border rounded-lg">
        <h3 className="mb-2 font-medium">Priority Image (for LCP)</h3>
        <ImageErrorBoundary>
          <EnhancedImage
            src="/modern-website-design.png"
            alt="Modern Website Design"
            width={300}
            height={200}
            priority={true}
            className="rounded-lg"
          />
        </ImageErrorBoundary>
      </div>
    </div>
  )
}
