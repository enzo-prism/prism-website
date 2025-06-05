"use client"

import { useEffect, useState } from "react"

interface ClientImagePreloaderProps {
  imagePaths: string[]
  onComplete?: () => void
}

export default function ClientImagePreloader({ imagePaths, onComplete }: ClientImagePreloaderProps) {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!imagePaths.length) return

    let mounted = true
    const imageObjects: HTMLImageElement[] = []

    imagePaths.forEach((path) => {
      const img = new Image()
      img.src = path
      img.onload = () => {
        if (mounted) {
          setLoadedImages((prev) => ({
            ...prev,
            [path]: true,
          }))
        }
      }
      img.onerror = () => {
        if (mounted) {
          setLoadedImages((prev) => ({
            ...prev,
            [path]: false,
          }))
          console.warn(`Failed to preload image: ${path}`)
        }
      }
      imageObjects.push(img)
    })

    return () => {
      mounted = false
      // Clean up image objects
      imageObjects.forEach((img) => {
        img.onload = null
        img.onerror = null
      })
    }
  }, [imagePaths])

  // Check if all images are loaded
  useEffect(() => {
    const allImagesLoaded = imagePaths.every((path) => loadedImages[path] === true)
    if (allImagesLoaded && imagePaths.length > 0 && onComplete) {
      onComplete()
    }
  }, [loadedImages, imagePaths, onComplete])

  // This component doesn't render anything visible
  return null
}
