"use client"

import { useState } from "react"
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
  inheritRadius?: boolean
  disableShadow?: boolean
}

/**
 * CoreImage - A robust image component with built-in error handling and analytics
 *
 * Performance notes:
 * - Defers lazy loading entirely to next/image's native `loading="lazy"`,
 *   which works from the SSR HTML before hydration. (A previous version
 *   gated `src` behind a post-hydration IntersectionObserver and hid the
 *   image at `opacity-0` until a JS `onLoad` fired — both delayed every
 *   image behind JavaScript execution.)
 * - Loading feedback comes from the blur placeholder (no spinner overlay,
 *   no extra client state). `showLoadingIndicator={false}` opts out of the
 *   blur placeholder.
 * - Always provides width and height to prevent layout shifts.
 * - Handles load failures with fallbacks + analytics.
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
  inheritRadius = false,
  disableShadow = false,
  ...props
}: CoreImageProps) {
  const [error, setError] = useState(false)

  // Validate dimensions to prevent layout shifts
  const { width: validWidth, height: validHeight } = validateImageDimensions(
    typeof width === "number" ? width : Number.parseInt(width as string, 10),
    typeof height === "number" ? height : Number.parseInt(height as string, 10),
  )

  // Generate blur placeholder for loading feedback
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

  // Determine if this is a remote image and needs special handling
  const isRemote =
    typeof src === "string" && (src.startsWith("http://") || src.startsWith("https://"))

  // Generate a default fallback image URL if none provided
  const defaultFallback = `/placeholder.svg?height=${validHeight}&width=${validWidth}&query=${encodeURIComponent(alt || "image")}`

  const effectiveFallbackSrc =
    fallbackSrc ||
    (isRemote
      ? `/placeholder.svg?height=${validHeight}&width=${validWidth}&query=${encodeURIComponent(alt || "image")}`
      : defaultFallback)

  if (error && fallbackElement) {
    return fallbackElement
  }

  // If consumer passes utility classes that imply full size, adjust wrapper sizing
  const wantsFullSize = /(^|\s)w-full(\s|$)/.test(className) || /(^|\s)h-full(\s|$)/.test(className)

  return (
    <div
      className="relative"
      style={{
        width: wantsFullSize ? '100%' : undefined,
        height: wantsFullSize ? '100%' : undefined,
        ...(inheritRadius ? { borderRadius: 'inherit', overflow: 'hidden' } : {}),
      }}
    >
      <Image
        src={error ? effectiveFallbackSrc : src}
        alt={error ? fallbackAlt || `Fallback for ${alt}` : alt}
        width={validWidth}
        height={validHeight}
        className={`${className} hardware-accelerated ${disableShadow ? '' : 'drop-shadow-md'}`}
        priority={priority}
        sizes={sizes || (validWidth < 640 ? "100vw" : validWidth < 1024 ? "50vw" : "33vw")}
        // Default to the lighter configured tier (next.config `qualities:
        // [75, 90]`); 85 silently snapped up to 90. Surfaces that need 90
        // (navbar logo, hero art) pass it explicitly.
        quality={quality || 75}
        placeholder={showLoadingIndicator ? "blur" : "empty"}
        blurDataURL={showLoadingIndicator ? blurDataURL : undefined}
        // Bypass Next.js optimizer for legacy local files with spaces in the path
        // to avoid INVALID_IMAGE_OPTIMIZE_REQUEST.
        unoptimized={typeof src === "string" && src.includes(" ")}
        onError={handleError}
        {...props}
      />
    </div>
  )
}
