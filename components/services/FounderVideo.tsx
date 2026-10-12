'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

import { trackCTAClick } from '@/utils/analytics'
import { cn } from '@/lib/utils'

type FounderVideoProps = {
  /** Video file. Nothing is requested until the visitor presses play. */
  src: string
  /** Poster frame shown until playback starts. */
  poster: string
  /** Accessible title for the button and the player. */
  title: string
  /** Intrinsic size of the clip, so the frame matches it exactly. */
  width: number
  height: number
  /** Short visible label on the play button, e.g. "Watch Enzo". */
  label: string
  /** Running time shown next to the label, e.g. "2:48". */
  duration?: string
  /** Analytics location for the play event. */
  location: string
  className?: string
}

/**
 * Poster-and-play for a self-hosted clip: a still frame with a play pill,
 * framed at the clip's own aspect ratio (no letterboxing). The video source
 * is attached and played inside the click handler, so the file only loads on
 * request and playback starts with sound on every browser, including iOS.
 */
export function FounderVideo({
  src,
  poster,
  title,
  width,
  height,
  label,
  duration,
  location,
  className,
}: FounderVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  function play() {
    trackCTAClick(`play ${title}`, location)
    const video = videoRef.current
    if (video) {
      video.src = src
      // If the browser refuses to start playback, the native controls are
      // showing, so a second tap on the player starts it.
      Promise.resolve(video.play()).catch(() => {})
    }
    setPlaying(true)
  }

  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-2xl border border-white/10 bg-background shadow-[0_40px_90px_-40px_oklch(0_0_0/95%)]',
        className,
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <video
        ref={videoRef}
        controls={playing}
        playsInline
        preload="none"
        aria-label={title}
        tabIndex={playing ? 0 : -1}
        className="absolute inset-0 h-full w-full bg-background object-cover"
      />
      {playing ? null : (
        <button
          type="button"
          onClick={play}
          aria-label={`Play video: ${title}`}
          className="group/play absolute inset-0 z-10 block cursor-pointer text-left focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 36rem, 92vw"
            className="object-cover transition-transform duration-700 ease-out group-hover/play:scale-[1.015]"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/80 to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-background/70 py-1.5 pl-1.5 pr-4 text-sm font-medium text-foreground shadow-[0_16px_40px_-20px_oklch(0_0_0/90%)] backdrop-blur-md transition-colors group-hover/play:border-white/30 sm:bottom-5 sm:left-5"
          >
            <span className="grid size-9 place-items-center rounded-full bg-foreground text-background transition-transform duration-200 group-hover/play:scale-105">
              <Play className="size-3.5 translate-x-px fill-current" />
            </span>
            {label}
            {duration ? (
              <span className="font-mono text-[11px] text-muted-foreground">
                {duration}
              </span>
            ) : null}
          </span>
        </button>
      )}
    </div>
  )
}

export default FounderVideo
