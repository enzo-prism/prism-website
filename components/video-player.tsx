"use client"

import { Pause, Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { VideoSchema } from "@/components/schema-markup"

type VideoSchemaMetadata = {
  id: string
  name: string
  description: string
  thumbnailUrl: string | string[]
  uploadDate: string
  duration?: string
  contentUrl: string
  embedUrl: string
  width?: number
  height?: number
  creatorName?: string
  seekToActionTarget?: string
}

type VideoPlayerProps = {
  src: string
  poster?: string
  title?: string
  caption?: string
  className?: string
  schema?: VideoSchemaMetadata
}

const formatTime = (value: number) => {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00"
  }
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export default function VideoPlayer({ src, poster, title, caption, className, schema }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleTimeUpdate = () => {
      if (!video.duration) {
        return
      }
      const nextTime = video.currentTime
      setCurrentTime(nextTime)
      setProgress((nextTime / video.duration) * 100)
    }
    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0)
    }
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      setProgress(0)
    }

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("timeupdate", handleTimeUpdate)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("timeupdate", handleTimeUpdate)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }
    video.pause()
    video.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
    setProgress(0)
    setDuration(0)
  }, [src])

  const togglePlayback = () => {
    const video = videoRef.current
    if (!video) {
      return
    }
    if (video.paused) {
      void video.play()
    } else {
      video.pause()
    }
  }

  const handleSeek = (value: number) => {
    const video = videoRef.current
    if (!video || !video.duration) {
      return
    }
    const nextTime = (value / 100) * video.duration
    video.currentTime = nextTime
    setCurrentTime(nextTime)
    setProgress(value)
  }

  const containerClass = [
    "rounded-3xl border border-white/[0.08] bg-card p-3 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:p-4",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <>
      <div className={containerClass}>
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-background">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
            aria-label={title ?? "Video player"}
            onClick={togglePlayback}
          />
        </div>
        {title ? (
          <p className="mt-4 px-1 text-base font-semibold tracking-[-0.01em] text-foreground">{title}</p>
        ) : null}
        {caption ? (
          <p className="mt-1 px-1 text-sm text-muted-foreground">
            {caption}
          </p>
        ) : null}
        <div className="mt-4 flex flex-col gap-4 px-1 pb-1 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={togglePlayback}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            aria-pressed={isPlaying}
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "Pause" : "Play"}
          </button>
          <div className="flex w-full flex-1 items-center gap-3">
            <span className="font-mono text-[11px] tabular-nums text-subtle">{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={event => handleSeek(Number(event.target.value))}
              className="flex-1 cursor-pointer accent-foreground"
              aria-label="Video timeline"
            />
            <span className="font-mono text-[11px] tabular-nums text-subtle">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
      {schema ? (
        <VideoSchema
          id={schema.id}
          name={schema.name}
          description={schema.description}
          thumbnailUrl={schema.thumbnailUrl}
          uploadDate={schema.uploadDate}
          duration={schema.duration}
          contentUrl={schema.contentUrl}
          embedUrl={schema.embedUrl}
          width={schema.width}
          height={schema.height}
          creatorName={schema.creatorName}
          seekToActionTarget={schema.seekToActionTarget}
        />
      ) : null}
    </>
  )
}
