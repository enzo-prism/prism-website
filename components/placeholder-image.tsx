"use client"

import Image from "next/image"
import { useState } from "react"

interface PlaceholderImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export default function PlaceholderImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: PlaceholderImageProps) {
  const [error, setError] = useState(false)

  // Default placeholder if image fails to load
  const fallbackSrc = `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(alt || "placeholder image")}`

  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setError(true)}
    />
  )
}
