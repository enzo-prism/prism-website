"use client"

import { useState, useEffect } from "react"
import Image, { type ImageProps } from "next/image"

interface EnhancedImageProps extends Omit<ImageProps, "onError" | "onLoadingComplete"> {
  fallbackSrc?: string
  fallbackColor?: string
  showLoadingState?: boolean
  priority?: boolean // Add priority prop
}

export default function EnhancedImage({
  src,
  alt,
  width,
  height,
  fallbackSrc,
  fallbackColor = "#f3f4f6",
  showLoadingState = false,
  className = "",
  ...props
}: EnhancedImageProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Set the image source after component mount to avoid hydration mismatch
  useEffect(() => {
    setImgSrc(typeof src === "string" ? src : "")
  }, [src])

  // Generate a simple SVG for the blur placeholder
  const blurDataURL = `data:image/svg+xml;base64,${Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${fallbackColor}" /></svg>`,
  ).toString("base64")}`

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
        className={`animate-pulse rounded-md ${className}`}
        role="img"
        aria-label={alt || "Loading image"}
      />
    )
  }

  return (
    <div className="relative">
      {showLoadingState && isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md"
          style={{
            width: typeof width === "number" ? `${width}px` : width,
            height: typeof height === "number" ? `${height}px` : height,
          }}
        >
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600" />
        </div>
      )}

      <Image
        src={error ? placeholderSrc : imgSrc}
        alt={
          alt ||
          `Image of ${typeof src === "string" ? src.split("/").pop()?.split(".")[0].replace(/-/g, " ") : "content"}`
        }
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={blurDataURL}
        onError={() => setError(true)}
        onLoadingComplete={() => setIsLoading(false)}
        className={className}
        priority={props.priority} // Pass priority prop
        {...props}
      />
    </div>
  )
}
