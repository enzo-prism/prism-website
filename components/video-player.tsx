"use client"

import { Pause, Play } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type VideoPlayerProps = {
  src: string
  poster?: string
  title?: string
  caption?: string
  className?: string
}

const formatTime = (value: number) => {
  if (!Number.isFinite(value) || value < 0) {
    return "0:00"
  }
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

export default function VideoPlayer({ src, poster, title, caption, className }: VideoPlayerProps) {
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
    "rounded-3xl border border-neutral-200 bg-white/80 p-4 shadow-lg backdrop-blur-sm",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={containerClass}>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
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
        <p className="mt-4 text-base font-semibold text-neutral-900">{title}</p>
      ) : null}
      {caption ? (
        <p className="mt-1 text-sm text-neutral-600">
          {caption}
        </p>
      ) : null}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={togglePlayback}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-800"
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? "Pause" : "Play"}
        </button>
        <div className="flex w-full flex-1 items-center gap-3">
          <span className="text-xs font-medium text-neutral-500">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress}
            onChange={event => handleSeek(Number(event.target.value))}
            className="flex-1 cursor-pointer accent-neutral-900"
            aria-label="Video timeline"
          />
          <span className="text-xs font-medium text-neutral-500">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}
