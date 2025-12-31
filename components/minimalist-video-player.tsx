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
  forceMuted?: boolean
  showMuteToggle?: boolean
}

export default function MinimalistVideoPlayer({
  videoId,
  aspectRatio = "9/16",
  thumbnailSrc,
  className = "",
  forceMuted = false,
  showMuteToggle = true,
}: MinimalistVideoPlayerProps) {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isControlsVisible, setIsControlsVisible] = useState(false)
  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  // Track the latest requested video in case a change happens before player init
  const pendingVideoIdRef = useRef<string | null>(null)
  const currentVideoIdRef = useRef<string>(videoId)

  // Keep a ref of the latest videoId so async callbacks don't use stale values
  useEffect(() => {
    currentVideoIdRef.current = videoId
  }, [videoId])

  // Load Vimeo API
  useEffect(() => {
    // If Vimeo is already present, initialize immediately
    if (typeof window !== 'undefined' && (window as any).Vimeo) {
      initializePlayer()
    } else {
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
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [])

  const initializePlayer = () => {
    if (!window.Vimeo || !containerRef.current) return

    const options = {
      id: currentVideoIdRef.current,
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
      if (forceMuted) {
        setIsMuted(true)
        if (event.volume !== 0) {
          playerRef.current?.setVolume(0)
        }
      } else {
        setIsMuted(event.volume === 0)
      }
    })

    playerRef.current.on("ended", () => {
      setIsPlaying(false)
      trackVideoInteraction(videoId, "complete", "Video completed")
    })

    playerRef.current.on("timeupdate", (data: { percent: number }) => {
      // Track progress at 25%, 50%, 75%
      const percent = Math.floor(data.percent * 100)
      if (percent === 25 || percent === 50 || percent === 75) {
        trackVideoInteraction(videoId, `progress_${percent}`, `Video ${percent}% complete`)
      }
    })

    // If a video change was requested before init, load it now
    if (pendingVideoIdRef.current && pendingVideoIdRef.current !== options.id) {
      const targetId = pendingVideoIdRef.current
      pendingVideoIdRef.current = null
      setIsVideoReady(false)
      playerRef.current
        .loadVideo(targetId)
        .then(() => {
          // Ensure mute state and remove overlay
          playerRef.current.setVolume(forceMuted || isMuted ? 0 : 1)
          setIsVideoReady(true)
          return playerRef.current.play().catch(() => void 0)
        })
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsControlsVisible(true)
        })
    }
  }

  // When the videoId prop changes, load the new video on the existing player
  useEffect(() => {
    const player = playerRef.current
    if (!videoId) return
    // If player not ready yet, queue the request
    if (!player) {
      pendingVideoIdRef.current = videoId
      return
    }
    // reset state until the new video is ready
    setIsVideoReady(false)
    player
      .loadVideo(videoId)
      .then(() => {
        // ensure mute state and autoplay remain consistent
        player.setVolume(forceMuted || isMuted ? 0 : 1)
        // Explicitly mark ready so overlay doesn't block if 'loaded' doesn't fire
        setIsVideoReady(true)
        return player.play().catch(() => void 0)
      })
      .then(() => setIsPlaying(true))
      .catch(() => {
        // If loadVideo fails for any reason, keep controls visible so the user can retry
        setIsControlsVisible(true)
      })
  }, [videoId])

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
    if (forceMuted || !showMuteToggle) {
      return
    }
    if (isMuted) {
      playerRef.current?.setVolume(1)
      trackVideoInteraction(videoId, "unmute", "Video unmuted")
    } else {
      playerRef.current?.setVolume(0)
      trackVideoInteraction(videoId, "mute", "Video muted")
    }
    setIsMuted(!isMuted)
  }

  useEffect(() => {
    if (forceMuted) {
      setIsMuted(true)
      playerRef.current?.setVolume(0)
    }
  }, [forceMuted])

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

  const shouldShowMuteButton = showMuteToggle && !forceMuted

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
            <div className="rounded-full bg-black/50 p-4">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>
        </div>
      )}

      {/* Video container */}
      <div ref={containerRef} className="h-full w-full"></div>

      {/* Minimalist controls overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 flex items-center ${
          shouldShowMuteButton ? "justify-between" : "justify-start"
        } p-4 transition-opacity duration-300 ${isControlsVisible ? "opacity-100" : "opacity-0"}`}
      >
        <button
          onClick={togglePlay}
          className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>

        {shouldShowMuteButton ? (
          <button
            onClick={toggleMute}
            className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        ) : null}
      </div>
    </div>
  )
}
