"use client"

import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { VideoSchema } from "@/components/schema-markup"
import { Badge } from "@/components/ui/badge"
import { buildCloudinaryVideoPoster, type CaseStudyExplainerVideo } from "@/lib/case-study-data"
import { cn } from "@/lib/utils"

type CaseStudyExplainerVideoProps = {
  slug: string
  clientName: string
  video: CaseStudyExplainerVideo
}

type FullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void
  webkitFullscreenElement?: Element
}

type FullscreenContainer = HTMLDivElement & {
  webkitRequestFullscreen?: () => Promise<void> | void
}

type NativeFullscreenVideo = HTMLVideoElement & {
  webkitSupportsFullscreen?: boolean
  webkitEnterFullscreen?: () => void
  webkitDisplayingFullscreen?: boolean
}

type OrientationCapableScreen = Screen & {
  orientation?: {
    lock?: (orientation: string) => Promise<void>
    unlock?: () => void
  }
}

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00"
  }

  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export default function CaseStudyExplainerVideo({
  slug,
  clientName,
  video,
}: CaseStudyExplainerVideoProps) {
  const playerShellRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const chromeHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showPlaybackChrome, setShowPlaybackChrome] = useState(true)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)

  const poster = video.poster ?? buildCloudinaryVideoPoster(video.src)
  const sectionId = `${slug}-case-study-explainer`
  const caseStudyUrl = `https://www.design-prism.com/case-studies/${slug}`
  const showStageChrome = showPlaybackChrome || !isPlaying

  const isMobileViewport = () => {
    if (typeof window === "undefined") {
      return false
    }

    return (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 768px)").matches
    )
  }

  const lockLandscapeOrientation = async () => {
    const orientationScreen = screen as OrientationCapableScreen

    try {
      await orientationScreen.orientation?.lock?.("landscape")
    } catch {
      // Orientation locking is best-effort because browser support varies.
    }
  }

  const unlockOrientation = () => {
    const orientationScreen = screen as OrientationCapableScreen

    try {
      orientationScreen.orientation?.unlock?.()
    } catch {
      // Ignore unlock failures on browsers that do not expose this API.
    }
  }

  const clearChromeHideTimeout = () => {
    if (chromeHideTimeoutRef.current) {
      clearTimeout(chromeHideTimeoutRef.current)
      chromeHideTimeoutRef.current = null
    }
  }

  const scheduleChromeHide = (delay = 2200) => {
    clearChromeHideTimeout()

    if (!isPlaying) {
      return
    }

    chromeHideTimeoutRef.current = setTimeout(() => {
      setShowPlaybackChrome(false)
    }, delay)
  }

  const revealPlaybackChrome = (delay = 2200) => {
    setShowPlaybackChrome(true)

    if (isPlaying) {
      scheduleChromeHide(delay)
    } else {
      clearChromeHideTimeout()
    }
  }

  useEffect(() => {
    const player = videoRef.current

    if (!player) {
      return
    }

    const syncDuration = () => {
      setDuration(player.duration || 0)
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setShowPlaybackChrome(true)
      clearChromeHideTimeout()
      chromeHideTimeoutRef.current = setTimeout(() => {
        setShowPlaybackChrome(false)
      }, 2200)
    }
    const handlePause = () => {
      setIsPlaying(false)
      clearChromeHideTimeout()
      setShowPlaybackChrome(true)
    }
    const handleVolumeChange = () => setIsMuted(player.muted)
    const handleNativeFullscreenBegin = () => {
      setIsFullscreen(true)
      setShowPlaybackChrome(true)
    }
    const handleNativeFullscreenEnd = () => {
      setIsFullscreen(false)
      unlockOrientation()
      revealPlaybackChrome()
    }
    const handleTimeUpdate = () => {
      if (!player.duration) {
        return
      }

      const nextTime = player.currentTime
      setCurrentTime(nextTime)
      setProgress((nextTime / player.duration) * 100)
    }
    const handleEnded = () => {
      setIsPlaying(false)
      clearChromeHideTimeout()
      setShowPlaybackChrome(true)
      setCurrentTime(player.duration || 0)
      setProgress(100)
    }

    if (player.readyState >= 1) {
      syncDuration()
      setIsMuted(player.muted)
    }

    player.addEventListener("loadedmetadata", syncDuration)
    player.addEventListener("play", handlePlay)
    player.addEventListener("pause", handlePause)
    player.addEventListener("volumechange", handleVolumeChange)
    player.addEventListener("timeupdate", handleTimeUpdate)
    player.addEventListener("ended", handleEnded)
    player.addEventListener("webkitbeginfullscreen", handleNativeFullscreenBegin as EventListener)
    player.addEventListener("webkitendfullscreen", handleNativeFullscreenEnd as EventListener)

    return () => {
      player.removeEventListener("loadedmetadata", syncDuration)
      player.removeEventListener("play", handlePlay)
      player.removeEventListener("pause", handlePause)
      player.removeEventListener("volumechange", handleVolumeChange)
      player.removeEventListener("timeupdate", handleTimeUpdate)
      player.removeEventListener("ended", handleEnded)
      player.removeEventListener(
        "webkitbeginfullscreen",
        handleNativeFullscreenBegin as EventListener,
      )
      player.removeEventListener(
        "webkitendfullscreen",
        handleNativeFullscreenEnd as EventListener,
      )
    }
  }, [video.src])

  useEffect(() => {
    return () => {
      clearChromeHideTimeout()
      unlockOrientation()
    }
  }, [])

  useEffect(() => {
    const player = videoRef.current

    if (!player) {
      return
    }

    player.pause()
    player.currentTime = 0
    player.muted = false
    unlockOrientation()
    setIsPlaying(false)
    setIsMuted(false)
    setIsFullscreen(false)
    setShowPlaybackChrome(true)
    setDuration(0)
    setCurrentTime(0)
    setProgress(0)
  }, [video.src])

  useEffect(() => {
    const doc = document as FullscreenDocument

    const syncFullscreenState = () => {
      const activeElement = doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null

      if (!activeElement) {
        unlockOrientation()
      }

      setIsFullscreen(Boolean(activeElement && playerShellRef.current?.contains(activeElement)))
    }

    document.addEventListener("fullscreenchange", syncFullscreenState)
    document.addEventListener("webkitfullscreenchange", syncFullscreenState as EventListener)

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState)
      document.removeEventListener("webkitfullscreenchange", syncFullscreenState as EventListener)
    }
  }, [])

  const togglePlayback = () => {
    const player = videoRef.current

    if (!player) {
      return
    }

    setShowPlaybackChrome(true)

    if (player.paused) {
      void player.play()
      return
    }

    player.pause()
  }

  const toggleMute = () => {
    const player = videoRef.current

    if (!player) {
      return
    }

    player.muted = !player.muted
    setIsMuted(player.muted)
  }

  const handleSeek = (value: number) => {
    const player = videoRef.current

    if (!player || !player.duration) {
      return
    }

    const nextTime = (value / 100) * player.duration
    player.currentTime = nextTime
    setCurrentTime(nextTime)
    setProgress(value)
  }

  const toggleFullscreen = async () => {
    const doc = document as FullscreenDocument
    const playerShell = playerShellRef.current as FullscreenContainer | null
    const player = videoRef.current as NativeFullscreenVideo | null

    if (!playerShell || !player) {
      return
    }

    setShowPlaybackChrome(true)

    if (player.webkitDisplayingFullscreen) {
      return
    }

    if (doc.fullscreenElement || doc.webkitFullscreenElement) {
      unlockOrientation()
      await (doc.exitFullscreen?.() ?? doc.webkitExitFullscreen?.())
      return
    }

    if (isMobileViewport() && player.webkitEnterFullscreen) {
      if (player.paused) {
        await player.play().catch(() => undefined)
      }

      player.webkitEnterFullscreen()
      return
    }

    await (playerShell.requestFullscreen?.() ?? playerShell.webkitRequestFullscreen?.())
    await lockLandscapeOrientation()
  }

  const handleStageClick = () => {
    if (isPlaying && !showStageChrome) {
      revealPlaybackChrome()
      return
    }

    togglePlayback()
  }

  return (
    <>
      <section className="border-b border-border/60 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl px-4 md:px-6">
          <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-[#090b10] text-white shadow-[0_40px_120px_-70px_rgba(15,23,42,0.85)]">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)]">
              <div
                ref={playerShellRef}
                className="border-b border-white/10 bg-[#050608] lg:border-b-0 lg:border-r lg:border-white/10"
              >
                <div
                  className="relative aspect-video overflow-hidden bg-black"
                  onMouseEnter={() => revealPlaybackChrome(2600)}
                  onMouseLeave={() => scheduleChromeHide(800)}
                  onPointerMove={() => revealPlaybackChrome(1800)}
                >
                  <video
                    ref={videoRef}
                    src={video.src}
                    poster={poster}
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                    aria-label={video.title}
                    onClick={handleStageClick}
                  />
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_45%),linear-gradient(to_top,_rgba(0,0,0,0.72),_rgba(0,0,0,0.1)_45%,_transparent)] transition-opacity duration-300",
                      showStageChrome ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-x-4 top-4 flex items-start justify-between gap-3 transition-all duration-300",
                      showStageChrome
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-2 opacity-0 pointer-events-none",
                    )}
                  >
                    <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.26em] text-white/70 backdrop-blur-sm">
                      case study explainer
                    </div>
                    {duration > 0 ? (
                      <div className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm text-white/70 backdrop-blur-sm">
                        {formatTime(duration)}
                      </div>
                    ) : null}
                  </div>
                  {!isPlaying ? (
                    <button
                      type="button"
                      onClick={togglePlayback}
                      className="absolute inset-0 flex items-center justify-center"
                      aria-label={`Play case study explainer for ${clientName}`}
                    >
                      <span className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-[0_25px_65px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md transition-transform duration-200 hover:scale-[1.03]">
                        <Play className="ml-1 h-9 w-9" fill="currentColor" />
                      </span>
                    </button>
                  ) : null}
                  <div
                    className={cn(
                      "absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 transition-all duration-300",
                      showStageChrome
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0 pointer-events-none",
                    )}
                  >
                    <div className="max-w-[28rem]">
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
                        fast walkthrough
                      </p>
                      <p className="mt-2 text-balance text-lg font-semibold leading-snug text-white sm:text-xl">
                        {video.title}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-white/10 bg-white/[0.03] px-4 py-4 sm:px-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlayback}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
                        aria-pressed={isPlaying}
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isPlaying ? "Pause" : "Play"}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                        aria-pressed={isMuted}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        {isMuted ? "Unmute" : "Sound on"}
                      </button>
                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                        aria-pressed={isFullscreen}
                        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                      >
                        {isFullscreen ? (
                          <Minimize className="h-4 w-4" />
                        ) : (
                          <Maximize className="h-4 w-4" />
                        )}
                        {isFullscreen ? "Exit full" : "Fullscreen"}
                      </button>
                    </div>
                    <div className="flex flex-1 items-center gap-3">
                      <span className="min-w-[2.5rem] text-xs font-medium text-white/55">
                        {formatTime(currentTime)}
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={0.1}
                        value={progress}
                        onChange={(event) => handleSeek(Number(event.target.value))}
                        className={cn(
                          "h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/15 accent-white",
                          "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-white/15",
                          "[&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
                          "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-white/15",
                          "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-white",
                        )}
                        aria-label="Video timeline"
                      />
                      <span className="min-w-[2.5rem] text-right text-xs font-medium text-white/55">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between px-6 py-6 sm:px-8 sm:py-8">
                <div>
                  <Badge
                    variant="outline"
                    className="w-fit border-white/20 bg-white/5 text-white shadow-none"
                  >
                    watch first
                  </Badge>
                  <h2 className="mt-5 text-balance text-2xl font-semibold tracking-tight sm:text-[2rem]">
                    Understand what Prism actually did for {clientName}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/68 sm:text-base">
                    {video.summary}
                  </p>
                  <div className="mt-8 space-y-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40">
                      what this walkthrough covers
                    </p>
                    <ul className="space-y-4">
                      {video.keyMoments.map((moment, index) => (
                        <li
                          key={moment}
                          className="flex gap-3 border-t border-white/8 pt-4 first:border-t-0 first:pt-0"
                        >
                          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xs font-semibold text-white/70">
                            {index + 1}
                          </span>
                          <span className="text-sm leading-6 text-white/78">
                            {moment}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-8 text-sm leading-6 text-white/45">
                  Start with the video for the fast narrative, then scroll into Prism’s work stack below for the specific systems, channels, and tooling behind the engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoSchema
        id={sectionId}
        name={video.title}
        description={video.summary}
        thumbnailUrl={poster}
        uploadDate={video.uploadDate}
        duration={video.duration}
        contentUrl={video.src}
        embedUrl={`${caseStudyUrl}#${sectionId}`}
        creatorName={video.creatorName}
      />
    </>
  )
}
