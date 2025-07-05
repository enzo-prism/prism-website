"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { trackVideoInteraction } from "@/utils/analytics"

interface VideoWithPosterProps {
  /** Vimeo video ID */
  videoId: string
  /** Poster image source */
  posterSrc: string
  /** Fallback poster image source if primary fails */
  fallbackPosterSrc?: string
  /** Video width in pixels */
  width: number
  /** Video height in pixels */
  height: number
  /** Additional CSS classes */
  className?: string
  /** Whether to autoplay when video loads */
  autoplay?: boolean
  /** Whether to loop the video */
  loop?: boolean
  /** Whether to start muted */
  muted?: boolean
  /** Whether to show controls */
  controls?: boolean
  /** Alt text for poster image */
  posterAlt?: string
  /** Whether to track analytics */
  trackAnalytics?: boolean
}

export default function VideoWithPoster({
  videoId,
  posterSrc,
  fallbackPosterSrc,
  width,
  height,
  className = "",
  autoplay = true,
  loop = true,
  muted = true,
  controls = false,
  posterAlt = "Video poster",
  trackAnalytics = true,
}: VideoWithPosterProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoError, setIsVideoError] = useState(false)
  const [isPosterLoaded, setIsPosterLoaded] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [currentPosterSrc, setCurrentPosterSrc] = useState(posterSrc)
  const [hasFallbackFailed, setHasFallbackFailed] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Build Vimeo URL with parameters
  const vimeoUrl = `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}&loop=${loop ? 1 : 0}&muted=${muted ? 1 : 0}&background=${autoplay && !controls ? 1 : 0}&controls=${controls ? 1 : 0}&title=0&byline=0&portrait=0&playsinline=1`

  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsVideoLoaded(true)
    
    // Wait a brief moment for video to start, then hide poster
    setTimeout(() => {
      setShowVideo(true)
      if (trackAnalytics) {
        trackVideoInteraction(videoId, "loaded", "Get started video loaded")
      }
    }, 300)
  }

  // Handle iframe error
  const handleIframeError = () => {
    setIsVideoError(true)
    if (trackAnalytics) {
      trackVideoInteraction(videoId, "error", "Get started video failed to load")
    }
  }

  // Track poster interactions
  const handlePosterClick = () => {
    if (trackAnalytics) {
      trackVideoInteraction(videoId, "poster_click", "Get started video poster clicked")
    }
  }

  // Handle poster image error with fallback support
  const handlePosterError = (error: any) => {
    console.error("Poster image failed to load:", {
      currentPosterSrc,
      error,
      videoId,
      hasFallback: !!fallbackPosterSrc,
      hasFallbackFailed
    })
    
    // Try fallback if available and not already tried
    if (fallbackPosterSrc && currentPosterSrc !== fallbackPosterSrc && !hasFallbackFailed) {
      console.log("Attempting fallback poster:", fallbackPosterSrc)
      setCurrentPosterSrc(fallbackPosterSrc)
      setIsPosterLoaded(false) // Reset loading state for fallback
    } else {
      // Mark fallback as failed if we've exhausted options
      setHasFallbackFailed(true)
    }
    
    if (trackAnalytics) {
      trackVideoInteraction(videoId, "poster_error", `Video poster failed to load: ${currentPosterSrc}`)
    }
  }

  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-md border border-neutral-200 ${className}`}
      style={{ width, height }}
    >
      {/* Poster Image */}
      <div 
        className={`absolute inset-0 z-20 transition-opacity duration-500 ${
          showVideo ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={handlePosterClick}
      >
        {/* Image container with proper positioning */}
        <div className="relative w-full h-full">
          <Image
            src={currentPosterSrc}
            alt={posterAlt}
            width={width}
            height={height}
            className="object-cover w-full h-full"
            priority
            onLoad={() => {
              console.log("Poster image loaded successfully:", currentPosterSrc)
              setIsPosterLoaded(true)
            }}
            onError={handlePosterError}
          />
        </div>
        
        {/* Loading state for poster */}
        {!isPosterLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading poster...</div>
          </div>
        )}

        {/* Play button overlay - only show when poster is loaded and no video error */}
        {isPosterLoaded && !isVideoError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black bg-opacity-50 p-4 transition-transform hover:scale-110">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>
        )}
      </div>

      {/* Video iframe */}
      {!isVideoError && (
        <iframe
          ref={iframeRef}
          src={vimeoUrl}
          width={width}
          height={height}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            showVideo ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          title="Video content"
        />
      )}

      {/* Error fallback - show poster permanently if video fails */}
      {isVideoError && (
        <div className="absolute inset-0 z-30">
          <div className="relative w-full h-full">
            <Image
              src={currentPosterSrc}
              alt={posterAlt}
              width={width}
              height={height}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded text-sm">
              Video unavailable
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator while video loads */}
      {isPosterLoaded && isVideoLoaded && !showVideo && (
        <div className="absolute inset-0 z-15 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-xs">
            Starting video...
          </div>
        </div>
      )}
    </div>
  )
}