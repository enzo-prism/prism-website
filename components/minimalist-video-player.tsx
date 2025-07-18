"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

// Add video tracking
import { trackVideoInteraction } from "@/utils/analytics"

interface MinimalistVideoPlayerProps {
  videoId: string
  aspectRatio?: string
  thumbnailSrc: string
  className?: string
}

export default function MinimalistVideoPlayer({
  videoId,
  aspectRatio = "9/16",
  thumbnailSrc,
  className = "",
}: MinimalistVideoPlayerProps) {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isControlsVisible, setIsControlsVisible] = useState(false)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Load Vimeo API
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://player.vimeo.com/api/player.js"
    script.async = true
    script.onload = initializePlayer
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  const initializePlayer = () => {
    if (!window.Vimeo || !containerRef.current) return

    const options = {
      id: videoId,
      autopause: false,
      autoplay: false, // We'll handle autoplay manually after loading
      background: false,
      controls: false,
      dnt: true,
      muted: true,
      responsive: true,
      loop: true,
    }

    playerRef.current = new window.Vimeo.Player(containerRef.current, options)

    // Set up event listeners
    playerRef.current.on("loaded", handleVideoLoaded)
    playerRef.current.on("play", () => setIsPlaying(true))
    playerRef.current.on("pause", () => setIsPlaying(false))
    playerRef.current.on("ended", () => setIsPlaying(false))
    playerRef.current.on("volumechange", (event: { volume: number }) => {
      setIsMuted(event.volume === 0)
    })

    playerRef.current.on("ended", () => {
      setIsPlaying(false)
      trackVideoInteraction(videoId, "complete", "Video completed")
    })

    playerRef.current.on("timeupdate", (data) => {
      // Track progress at 25%, 50%, 75%
      const percent = Math.floor(data.percent * 100)
      if (percent === 25 || percent === 50 || percent === 75) {
        trackVideoInteraction(videoId, `progress_${percent}`, `Video ${percent}% complete`)
      }
    })
  }

  const handleVideoLoaded = () => {
    setIsVideoReady(true)
    // Start playing automatically once loaded
    playerRef.current?.play().then(() => {
      setIsPlaying(true)
      trackVideoInteraction(videoId, "loaded", "Video loaded")
    })
  }

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pause()
      trackVideoInteraction(videoId, "pause", "Video paused")
    } else {
      playerRef.current?.play()
      trackVideoInteraction(videoId, "play", "Video played")
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      playerRef.current?.setVolume(1)
      trackVideoInteraction(videoId, "unmute", "Video unmuted")
    } else {
      playerRef.current?.setVolume(0)
      trackVideoInteraction(videoId, "mute", "Video muted")
    }
    setIsMuted(!isMuted)
  }

  const showControls = () => {
    setIsControlsVisible(true)

    // Clear any existing timeout
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    // Hide controls after 3 seconds of inactivity
    controlsTimeoutRef.current = setTimeout(() => {
      setIsControlsVisible(false)
    }, 3000)
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-md ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={showControls}
      onMouseMove={showControls}
      onMouseLeave={() => setIsControlsVisible(false)}
      onTouchStart={showControls}
    >
      {/* Thumbnail shown until video is ready */}
      {!isVideoReady && (
        <div className="absolute inset-0 z-10 bg-black">
          <Image
            src={thumbnailSrc || "/placeholder.svg"}
            alt="Video thumbnail"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black bg-opacity-50 p-4">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>
        </div>
      )}

      {/* Video container */}
      <div ref={containerRef} className="h-full w-full"></div>

      {/* Minimalist controls overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 transition-opacity duration-300 ${
          isControlsVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={togglePlay}
          className="rounded-full bg-black bg-opacity-50 p-2 text-white transition-colors hover:bg-opacity-70"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>

        <button
          onClick={toggleMute}
          className="rounded-full bg-black bg-opacity-50 p-2 text-white transition-colors hover:bg-opacity-70"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      </div>
    </div>
  )
}
