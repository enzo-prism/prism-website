"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { trackError } from "@/utils/analytics"
import { cn } from "@/lib/utils"

interface EnhancedImageProps extends Omit<NextImageProps, "onError" | "onLoadingComplete"> {
  fallbackSrc?: string
  trackingId?: string
  showLoadingIndicator?: boolean
  retryAttempts?: number
  retryDelay?: number
  validateDimensions?: boolean
  preload?: boolean
  criticalImage?: boolean
}

interface ImageState {
  src: string | null
  loading: boolean
  error: boolean
  retryCount: number
  loaded: boolean
  dimensions?: { width: number; height: number }
}

/**
 * Enhanced Image Component with comprehensive error handling,
 * retry logic, validation, and performance optimization
 */
export default function EnhancedImage({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  trackingId,
  priority = false,
  showLoadingIndicator = false,
  retryAttempts = 3,
  retryDelay = 1000,
  validateDimensions = true,
  preload = false,
  criticalImage = false,
  className,
  ...props
}: EnhancedImageProps) {
  const [imageState, setImageState] = useState<ImageState>({
    src: null,
    loading: false,
    error: false,
    retryCount: 0,
    loaded: false,
  })

  const imageRef = useRef<HTMLDivElement>(null)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Validate image source
  const validateImageSrc = useCallback((imageSrc: string): boolean => {
    if (!imageSrc || typeof imageSrc !== "string") {
      console.error("Invalid image source:", imageSrc)
      return false
    }

    if (imageSrc.trim() === "") {
      console.error("Empty image source")
      return false
    }

    // Check for common path issues
    if (imageSrc.includes("//") && !imageSrc.startsWith("http")) {
      console.error("Double slashes in image path:", imageSrc)
      return false
    }

    return true
  }, [])

  // Preload image for performance
  const preloadImage = useCallback((imageSrc: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        setImageState((prev) => ({
          ...prev,
          dimensions: { width: img.naturalWidth, height: img.naturalHeight },
        }))
        resolve()
      }

      img.onerror = () => {
        reject(new Error(`Failed to preload image: ${imageSrc}`))
      }

      img.src = imageSrc
    })
  }, [])

  // Handle image loading with retry logic
  const handleImageLoad = useCallback(
    async (imageSrc: string) => {
      if (!validateImageSrc(imageSrc)) {
        setImageState((prev) => ({ ...prev, error: true }))
        return
      }

      setImageState((prev) => ({ ...prev, loading: true, error: false }))

      try {
        if (preload || criticalImage) {
          await preloadImage(imageSrc)
        }

        setImageState((prev) => ({
          ...prev,
          src: imageSrc,
          loading: false,
          retryCount: 0,
        }))
      } catch (error) {
        console.error(`Image load failed for ${imageSrc}:`, error)
        handleImageError()
      }
    },
    [validateImageSrc, preloadImage, preload, criticalImage],
  )

  // Handle image errors with retry logic
  const handleImageError = useCallback(() => {
    setImageState((prev) => {
      const newRetryCount = prev.retryCount + 1

      if (newRetryCount <= retryAttempts) {
        console.log(`Retrying image load (attempt ${newRetryCount}/${retryAttempts})`)

        // Clear existing timeout
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current)
        }

        // Retry after delay
        retryTimeoutRef.current = setTimeout(() => {
          if (typeof src === "string") {
            handleImageLoad(src)
          }
        }, retryDelay * newRetryCount) // Exponential backoff

        return { ...prev, retryCount: newRetryCount, loading: true }
      } else {
        // Max retries reached, show error
        console.error(`Image failed to load after ${retryAttempts} attempts:`, src)

        if (trackingId) {
          trackError("image_load_failure", `Failed to load after ${retryAttempts} attempts: ${src}`, trackingId)
        }

        return { ...prev, error: true, loading: false }
      }
    })
  }, [src, retryAttempts, retryDelay, trackingId, handleImageLoad])

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imageRef.current || priority || criticalImage) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && typeof src === "string") {
            handleImageLoad(src)
            observer.disconnect()
          }
        })
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    )

    observer.observe(imageRef.current)
    return () => {
      observer.disconnect()
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [src, priority, criticalImage, handleImageLoad])

  // Load image immediately if priority or critical
  useEffect(() => {
    if ((priority || criticalImage) && typeof src === "string") {
      handleImageLoad(src)
    }
  }, [src, priority, criticalImage, handleImageLoad])

  // Generate fallback image
  const generateFallback = useCallback((): string => {
    if (fallbackSrc) return fallbackSrc

    const fallbackWidth = width || 300
    const fallbackHeight = height || 600
    const query = encodeURIComponent(alt || "image placeholder")

    return `/placeholder.svg?height=${fallbackHeight}&width=${fallbackWidth}&query=${query}`
  }, [fallbackSrc, width, height, alt])

  // Validate dimensions if required
  const validateImageDimensions = useCallback((): boolean => {
    if (!validateDimensions || !imageState.dimensions) return true

    const { width: imgWidth, height: imgHeight } = imageState.dimensions
    const expectedWidth = typeof width === "number" ? width : 300
    const expectedHeight = typeof height === "number" ? height : 600

    const widthRatio = imgWidth / expectedWidth
    const heightRatio = imgHeight / expectedHeight

    // Allow 20% variance in dimensions
    if (Math.abs(widthRatio - 1) > 0.2 || Math.abs(heightRatio - 1) > 0.2) {
      console.warn(
        `Image dimensions mismatch for ${src}. Expected: ${expectedWidth}x${expectedHeight}, Actual: ${imgWidth}x${imgHeight}`,
      )
      return false
    }

    return true
  }, [validateDimensions, imageState.dimensions, width, height, src])

  // Show loading placeholder
  if (!imageState.src && !imageState.error) {
    return (
      <div
        ref={imageRef}
        className={cn("animate-pulse bg-gray-200 rounded flex items-center justify-center", className)}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        {showLoadingIndicator && (
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600" />
        )}
      </div>
    )
  }

  return (
    <div className="relative" ref={imageRef}>
      {/* Loading indicator */}
      {imageState.loading && showLoadingIndicator && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded z-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600" />
        </div>
      )}

      {/* Retry indicator */}
      {imageState.retryCount > 0 && imageState.loading && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded z-20">
          Retry {imageState.retryCount}/{retryAttempts}
        </div>
      )}

      <NextImage
        src={imageState.error ? generateFallback() : imageState.src!}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300",
          !imageState.loaded && !imageState.error && "opacity-0",
          imageState.error && "opacity-75",
          className,
        )}
        priority={priority || criticalImage}
        onError={handleImageError}
        onLoad={() => {
          setImageState((prev) => ({ ...prev, loaded: true, loading: false }))
          validateImageDimensions()
        }}
        {...props}
      />

      {/* Error indicator */}
      {imageState.error && (
        <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-20">
          Failed to load
        </div>
      )}
    </div>
  )
}
