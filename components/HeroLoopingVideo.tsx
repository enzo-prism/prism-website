"use client"

import { useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

const DEFAULT_VIDEO_SRC =
  "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1761612491/surfer_loop_vduya4.mp4"
const DEFAULT_POSTER_SRC =
  "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761612479/Frame_63_gbe1tk.png"

type HeroLoopingVideoProps = {
  className?: string
  aspectClassName?: string
  videoClassName?: string
  videoSrc?: string
  posterSrc?: string
  alt?: string
  priority?: boolean
  posterSizes?: string
}

export default function HeroLoopingVideo({
  className,
  aspectClassName,
  videoClassName,
  videoSrc = DEFAULT_VIDEO_SRC,
  posterSrc = DEFAULT_POSTER_SRC,
  alt = "Surfer looping background preview",
  priority = true,
  posterSizes = "(min-width: 1280px) 1024px, (min-width: 768px) 80vw, 100vw",
}: HeroLoopingVideoProps) {
  const [isPosterLoaded, setIsPosterLoaded] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-950/5 shadow-lg",
        className
      )}
    >
      <div className={cn("relative aspect-[4/5] w-full sm:aspect-[16/9]", aspectClassName)}>
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-700",
            isVideoReady && !hasVideoError ? "opacity-0" : "opacity-100"
          )}
        >
          <Image
            src={posterSrc}
            alt={alt}
            fill
            priority={priority}
            sizes={posterSizes}
            className="h-full w-full object-cover"
            onLoadingComplete={() => setIsPosterLoaded(true)}
          />
          {!isPosterLoaded && <div className="absolute inset-0 animate-pulse bg-neutral-200" aria-hidden />}
        </div>

        {!hasVideoError && (
          <video
            className={cn(
              "absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-700",
              isVideoReady ? "opacity-100" : "opacity-0",
              videoClassName
            )}
            autoPlay
            loop
            muted
            playsInline
            poster={posterSrc}
            preload="auto"
            aria-hidden="true"
            onCanPlay={() => setIsVideoReady(true)}
            onLoadedData={() => setIsVideoReady(true)}
            onError={() => {
              setHasVideoError(true)
              setIsVideoReady(false)
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  )
}
