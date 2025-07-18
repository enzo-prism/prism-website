"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import NextImage, { type ImageProps as NextImageProps } from "next/image"
import { trackError } from "@/utils/analytics"
import { cn } from "@/lib/utils"

interface ImageProps extends Omit<NextImageProps, "onError" | "onLoadingComplete"> {
  fallbackSrc?: string
  trackingId?: string
  showLoadingIndicator?: boolean
  retryAttempts?: number
  retryDelay?: number
}

interface ImageState {
  src: string | null
  loading: boolean
  error: boolean
  retryCount: number
  loaded: boolean
}

/**
 * Simplified but robust Image component with error handling and retry logic
 */
export default function Image({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  trackingId,
  priority = false,
  showLoadingIndicator = false,
  retryAttempts = 2,
  retryDelay = 1000,
  className,
  ...props
}: ImageProps) {
  const [imageState, setImageState] = useState<ImageState>({
    src: null,
    loading: false,
    error: false,
    retryCount: 0,
    loaded: false,
  })

  const imageRef = useRef<HTMLDivElement>(null)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Simple path validation - just check if it's a non-empty string
  const isValidPath = useCallback((path: string | undefined): boolean => {
    return typeof path === "string" && path.trim().length > 0
  }, [])

  // Generate fallback image URL
  const getFallbackSrc = useCallback((): string => {
    if (fallbackSrc) return fallbackSrc

    const params = new URLSearchParams()
    if (width && typeof width === "number") params.set("width", width.toString())
    if (height && typeof height === "number") params.set("height", height.toString())
    if (alt) params.set("query", encodeURIComponent(alt))

    const queryString = params.toString()
    return queryString ? `/placeholder.svg?${queryString}` : "/placeholder.svg"
  }, [fallbackSrc, width, height, alt])

  // Handle image loading
  const handleImageLoad = useCallback(
    (imageSrc: string) => {
      if (!isValidPath(imageSrc)) {
        console.error("Invalid image path:", imageSrc)
        setImageState((prev) => ({ ...prev, error: true }))
        return
      }

      setImageState((prev) => ({
        ...prev,
        src: imageSrc,
        loading: false,
        error: false,
      }))
    },
    [isValidPath],
  )

  // Handle image errors with retry logic
  const handleImageError = useCallback(() => {
    setImageState((prev) => {
      const newRetryCount = prev.retryCount + 1

      if (newRetryCount <= retryAttempts) {
        console.log(`Retrying image load (attempt ${newRetryCount}/${retryAttempts}) for:`, src)

        // Clear existing timeout
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current)
        }

        // Retry with delay
        retryTimeoutRef.current = setTimeout(() => {
          if (isValidPath(src as string)) {
            handleImageLoad(src as string)
          }
        }, retryDelay)

        return { ...prev, retryCount: newRetryCount, loading: true }
      } else {
        // Max retries reached
        console.error(`Image failed to load after ${retryAttempts} attempts:`, src)

        if (trackingId) {
          trackError("image_load_failure", `Failed after ${retryAttempts} attempts: ${src}`, trackingId)
        }

        return { ...prev, error: true, loading: false }
      }
    })
  }, [src, retryAttempts, retryDelay, trackingId, handleImageLoad, isValidPath])

  // Handle successful image load
  const handleImageLoadSuccess = useCallback(() => {
    setImageState((prev) => ({ ...prev, loaded: true, loading: false }))
  }, [])

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imageRef.current || priority) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isValidPath(src as string)) {
            handleImageLoad(src as string)
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
  }, [src, priority, handleImageLoad, isValidPath])

  // Load image immediately if priority
  useEffect(() => {
    if (priority && isValidPath(src as string)) {
      handleImageLoad(src as string)
    }
  }, [src, priority, handleImageLoad, isValidPath])

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

      <NextImage
        src={imageState.error ? getFallbackSrc() : imageState.src!}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300",
          !imageState.loaded && !imageState.error && "opacity-0",
          imageState.error && "opacity-75",
          className,
        )}
        priority={priority}
        onError={handleImageError}
        onLoad={handleImageLoadSuccess}
        {...props}
      />
    </div>
  )
}
