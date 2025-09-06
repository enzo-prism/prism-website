"use client"

import { useState, useEffect, useRef } from "react"
import Image, { type ImageProps } from "next/image"
import { trackError } from "@/utils/analytics"
import { validateImageDimensions, generatePlaceholderSVG } from "@/utils/image-utils"

interface CoreImageProps extends Omit<ImageProps, "onError" | "onLoadingComplete"> {
  fallbackSrc?: string
  fallbackAlt?: string
  trackingId?: string
  showLoadingIndicator?: boolean
  onLoadError?: () => void
  customErrorHandling?: boolean
  fallbackElement?: React.ReactNode
}

/**
 * CoreImage - A robust image component with built-in error handling and analytics
 *
 * This component follows Next.js best practices:
 * - Always provides width and height to prevent layout shifts
 * - Handles remote images properly with placeholders
 * - Implements error handling with fallbacks
 * - Uses proper loading strategies (priority for above-the-fold)
 * - Tracks image loading failures for analytics
 */
export default function CoreImage({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  fallbackAlt,
  trackingId,
  priority = false,
  sizes,
  quality,
  showLoadingIndicator = true,
  className = "",
  onLoadError,
  customErrorHandling = false,
  fallbackElement,
  ...props
}: CoreImageProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [imgSrc, setImgSrc] = useState<string | null>(null)

  const imageRef = useRef<HTMLDivElement>(null)

  // Use IntersectionObserver for better lazy loading
  useEffect(() => {
    if (!imageRef.current || priority) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImgSrc(typeof src === "string" ? src : "")
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: "200px 0px", // Start loading 200px before it comes into view
        threshold: 0.01,
      },
    )

    observer.observe(imageRef.current)

    return () => {
      if (imageRef.current) {
        observer.disconnect()
      }
    }
  }, [src, priority])

  // If priority is true, set the image source immediately
  useEffect(() => {
    if (priority) {
      setImgSrc(typeof src === "string" ? src : "")
    }
  }, [src, priority])

  // Validate dimensions to prevent layout shifts
  const { width: validWidth, height: validHeight } = validateImageDimensions(
    typeof width === "number" ? width : Number.parseInt(width as string, 10),
    typeof height === "number" ? height : Number.parseInt(height as string, 10),
  )

  // Generate a default fallback image URL if none provided
  const defaultFallback = `/placeholder.svg?height=${validHeight}&width=${validWidth}&query=${encodeURIComponent(alt || "image")}`

  // Note: do not eagerly set image source on mount for non-priority images.
  // IntersectionObserver above will set imgSrc when the element is near viewport.

  // Generate blur placeholder for remote images
  const blurDataURL = generatePlaceholderSVG(validWidth, validHeight)

  // Handle image load error
  const handleError = () => {
    console.error(`Image failed to load: ${typeof src === "string" ? src : "object-source"}`)

    onLoadError?.()

    if (!customErrorHandling) {
      if (!error) {
        setError(true)
        if (trackingId) {
          trackError(
            "image_load_failure",
            `Failed to load image: ${typeof src === "string" ? src : "object-source"}`,
            `${trackingId} | width: ${validWidth}, height: ${validHeight}, priority: ${priority ? "true" : "false"}`,
          )
        }
      }
    } else if (trackingId) {
      trackError(
        "image_load_failure",
        `Failed to load image: ${typeof src === "string" ? src : "object-source"}`,
        `${trackingId} | width: ${validWidth}, height: ${validHeight}, priority: ${priority ? "true" : "false"}`,
      )
    }
  }

  // If image source is not set yet, show a placeholder
  if (!imgSrc) {
    return (
      <div
        style={{
          width: typeof validWidth === "number" ? `${validWidth}px` : validWidth,
          height: typeof validHeight === "number" ? `${validHeight}px` : validHeight,
          backgroundColor: "#f3f4f6",
        }}
        className={`animate-pulse rounded-md ${className}`}
        role="img"
        aria-label={alt || "Loading image"}
      />
    )
  }

  // Determine if this is a remote image and needs special handling
  const isRemote = typeof imgSrc === "string" && (imgSrc.startsWith("http://") || imgSrc.startsWith("https://"))

  // For remote images that aren't using a placeholder, ensure we have a good fallback
  const effectiveFallbackSrc =
    fallbackSrc ||
    (isRemote
      ? `/placeholder.svg?height=${validHeight}&width=${validWidth}&query=${encodeURIComponent(alt || "image")}`
      : defaultFallback)

  // After the loading indicator and before rendering Image
  if (error && fallbackElement) {
    return fallbackElement;
  }

  return (
    <div className="relative" ref={imageRef}>
      {/* Loading indicator */}
      {showLoadingIndicator && !loaded && !error && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-neutral-100 rounded-md"
          style={{
            width: typeof validWidth === "number" ? `${validWidth}px` : validWidth,
            height: typeof validHeight === "number" ? `${validHeight}px` : validHeight,
          }}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-600" />
        </div>
      )}

      {/* Image component with proper configuration */}
      <Image
        src={error ? effectiveFallbackSrc : imgSrc}
        alt={error ? fallbackAlt || `Fallback for ${alt}` : alt}
        width={validWidth}
        height={validHeight}
        className={`${className} ${!loaded && !error ? "opacity-0" : "opacity-100"} transition-opacity duration-300 hardware-accelerated drop-shadow-md`}
        priority={priority}
        sizes={sizes || (validWidth < 640 ? "100vw" : validWidth < 1024 ? "50vw" : "33vw")}
        quality={quality || 85}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onError={handleError}
        onLoad={() => {
          setLoaded(true)
          // Log successful loads in development to help with debugging
          if (process.env.NODE_ENV === "development") {
            console.log(`Image loaded successfully: ${typeof src === "string" ? src : "object-source"}`)
          }
        }}
        {...props}
      />
    </div>
  )
}
