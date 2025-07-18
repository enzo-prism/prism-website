"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"

interface OptimizedImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string
  fallbackColor?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  fallbackColor = "#f3f4f6",
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null)

  // Update the useEffect to better handle image loading
  useEffect(() => {
    setImgSrc(typeof src === "string" ? src : "")
  }, [src])

  // Improve the error handling by adding a retry mechanism
  const [error, setError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 2

  const handleImageError = () => {
    if (retryCount < maxRetries) {
      // Retry loading the image after a short delay
      setTimeout(() => {
        setRetryCount((prev) => prev + 1)
        setImgSrc(typeof src === "string" ? `${src}?retry=${retryCount + 1}` : "")
      }, 1000)
    } else {
      setError(true)
    }
  }

  // Generate a simple SVG for the blur placeholder (browser-compatible)
  const blurDataURL = `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${fallbackColor}" /></svg>`
  )}`

  // Generate a placeholder URL if the image fails to load
  const placeholderSrc =
    fallbackSrc ||
    `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(alt || "placeholder image")}`

  // If image source is not set yet, show a placeholder
  if (!imgSrc) {
    return (
      <div
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          backgroundColor: fallbackColor,
        }}
        className="animate-pulse rounded-md"
      />
    )
  }

  return (
    <Image
      src={error ? placeholderSrc : imgSrc}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL}
      // Update the onError prop in the Image component
      onError={handleImageError}
      {...props}
    />
  )
}
