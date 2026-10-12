"use client"

import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Reveal } from "@/components/prism/reveal"
import { Eyebrow, Section } from "@/components/prism/section"
import { VideoSchema } from "@/components/schema-markup"
import {
  buildCloudinaryVideoPoster,
  type CaseStudyExplainerVideo,
} from "@/lib/case-study-data"
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
  const chromeHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )
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
    player.addEventListener(
      "webkitbeginfullscreen",
      handleNativeFullscreenBegin as EventListener,
    )
    player.addEventListener(
      "webkitendfullscreen",
      handleNativeFullscreenEnd as EventListener,
    )

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
      const activeElement =
        doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null

      if (!activeElement) {
        unlockOrientation()
      }

      setIsFullscreen(
        Boolean(
          activeElement && playerShellRef.current?.contains(activeElement),
        ),
      )
    }

    document.addEventListener("fullscreenchange", syncFullscreenState)
    document.addEventListener(
      "webkitfullscreenchange",
      syncFullscreenState as EventListener,
    )

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState)
      document.removeEventListener(
        "webkitfullscreenchange",
        syncFullscreenState as EventListener,
      )
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

    await (playerShell.requestFullscreen?.() ??
      playerShell.webkitRequestFullscreen?.())
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
      <Section
        id={sectionId}
        aria-labelledby={`${sectionId}-title`}
        className="scroll-mt-[calc(var(--prism-header-height,64px)+1rem)] py-12 sm:py-16"
      >
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card shadow-[0_40px_120px_-70px_oklch(0_0_0/90%)]">
            <div
              aria-hidden="true"
              className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,oklch(0.63_0.19_295/16%),transparent)] blur-2xl"
            />
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
              <div
                ref={playerShellRef}
                className="border-b border-white/[0.08] bg-background lg:flex lg:flex-col lg:justify-center lg:border-b-0 lg:border-r"
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
                      "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(1_0_0/12%),transparent_45%),linear-gradient(to_top,oklch(0_0_0/72%),oklch(0_0_0/10%)_45%,transparent)] transition-opacity duration-300",
                      showStageChrome ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <div
                    className={cn(
                      "absolute inset-x-4 top-4 flex items-start justify-between gap-3 transition-[opacity,transform] duration-300",
                      showStageChrome
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0",
                    )}
                  >
                    <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-md">
                      Case study explainer
                    </span>
                    {duration > 0 ? (
                      <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-xs tabular-nums text-muted-foreground backdrop-blur-md">
                        {formatTime(duration)}
                      </span>
                    ) : null}
                  </div>
                  {!isPlaying ? (
                    <button
                      type="button"
                      onClick={togglePlayback}
                      className="group/play absolute inset-0 flex items-center justify-center focus-visible:outline-hidden"
                      aria-label={`Play case study explainer for ${clientName}`}
                    >
                      <span className="inline-flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_25px_65px_-20px_oklch(0_0_0/90%),0_0_0_10px_oklch(1_0_0/8%)] transition-transform duration-200 group-hover/play:scale-[1.04] group-focus-visible/play:ring-[3px] group-focus-visible/play:ring-ring/50">
                        <Play aria-hidden="true" className="ml-1 size-8" fill="currentColor" />
                      </span>
                    </button>
                  ) : null}
                  <div
                    className={cn(
                      "absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 transition-[opacity,transform] duration-300",
                      showStageChrome
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-2 opacity-0",
                    )}
                  >
                    <p className="max-w-[28rem] text-balance text-base font-semibold leading-snug text-foreground sm:text-xl">
                      {video.title}
                    </p>
                  </div>
                </div>
                <div className="border-t border-white/[0.08] bg-white/[0.02] px-4 py-4 sm:px-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlayback}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        aria-pressed={isPlaying}
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                      >
                        {isPlaying ? (
                          <Pause aria-hidden="true" className="size-4" />
                        ) : (
                          <Play aria-hidden="true" className="size-4" />
                        )}
                        {isPlaying ? "Pause" : "Play"}
                      </button>
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-white/[0.03] px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.07] hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        aria-pressed={isMuted}
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                      >
                        {isMuted ? (
                          <VolumeX aria-hidden="true" className="size-4" />
                        ) : (
                          <Volume2 aria-hidden="true" className="size-4" />
                        )}
                        {isMuted ? "Unmute" : "Sound on"}
                      </button>
                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-white/[0.03] px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.07] hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        aria-pressed={isFullscreen}
                        aria-label={
                          isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                        }
                      >
                        {isFullscreen ? (
                          <Minimize aria-hidden="true" className="size-4" />
                        ) : (
                          <Maximize aria-hidden="true" className="size-4" />
                        )}
                        {isFullscreen ? "Exit full" : "Fullscreen"}
                      </button>
                    </div>
                    <div className="flex flex-1 items-center gap-3">
                      <span className="min-w-[2.5rem] font-mono text-xs tabular-nums text-subtle">
                        {formatTime(currentTime)}
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        step={0.1}
                        value={progress}
                        onChange={(event) =>
                          handleSeek(Number(event.target.value))
                        }
                        className={cn(
                          "h-11 flex-1 cursor-pointer appearance-none rounded-full bg-transparent accent-white focus-visible:outline-hidden",
                          "[&::-webkit-slider-runnable-track]:h-1.5 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-white/15",
                          "[&::-webkit-slider-thumb]:mt-[-5px] [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground",
                          "[&::-moz-range-track]:h-1.5 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-white/15",
                          "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-foreground",
                          "focus-visible:[&::-webkit-slider-thumb]:ring-[3px] focus-visible:[&::-webkit-slider-thumb]:ring-ring/50",
                        )}
                        aria-label="Video timeline"
                      />
                      <span className="min-w-[2.5rem] text-right font-mono text-xs tabular-nums text-subtle">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-8 px-6 py-8 sm:px-8 sm:py-10">
                <div>
                  <Eyebrow>Walkthrough</Eyebrow>
                  <h2
                    id={`${sectionId}-title`}
                    className="mt-5 text-balance text-heading text-foreground"
                  >
                    watch what Prism did for {clientName}.
                  </h2>
                  <p className="mt-4 text-pretty text-[15px] leading-7 text-muted-foreground">
                    {video.summary}
                  </p>
                  <div className="mt-8">
                    <p className="text-eyebrow text-subtle">What it covers</p>
                    <ol className="mt-4 space-y-4">
                      {video.keyMoments.map((moment, index) => (
                        <li
                          key={moment}
                          className="flex gap-3 border-t border-white/[0.06] pt-4 first:border-t-0 first:pt-0"
                        >
                          <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] font-mono text-[11px] tabular-nums text-muted-foreground">
                            {index + 1}
                          </span>
                          <span className="text-sm leading-6 text-muted-foreground">
                            {moment}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

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
