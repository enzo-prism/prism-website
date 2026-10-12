"use client"

import { useRef, useState, type TouchEvent } from "react"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"

import MinimalistVideoPlayer from "@/components/minimalist-video-player"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Slide = {
  id: string
  thumb: string
  label: string
}

const slides: Slide[] = [
  { id: "1116465370", thumb: "/images/about/1116465370-poster.jpg", label: "san jose, ca" },
  { id: "1116465409", thumb: "/images/about/1116465409-poster.jpg", label: "santa barbara, ca" },
  { id: "1116465400", thumb: "/images/about/1116465400-poster.jpg", label: "fresno, ca" },
  { id: "1116465387", thumb: "/images/about/1116465387-poster.jpg", label: "manila, philippines" },
  { id: "1116471573", thumb: "/images/about/1116471573-poster.jpg", label: "palo alto, ca" },
  {
    id: "1116471566",
    thumb: "/images/about/1116471566-poster.jpg",
    label: "new clark city, philippines",
  },
]

const controlClassName =
  "size-12 shrink-0 rounded-full border-white/12 bg-white/[0.04] shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset] active:scale-95"

/**
 * Vertical pole vault clips in a phone-style frame. The Vimeo SDK stays
 * deferred: MinimalistVideoPlayer only requests player.js once the frame is
 * within 240px of the viewport (locked by __tests__/visual/mobile-navbar.spec.ts).
 */
export default function PoleVaultCarousel({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const next = () => setIndex((i) => (i + 1) % slides.length)
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)

  const onTouchStart = (e: TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStart.current == null) return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next()
      else prev()
    }
    touchStart.current = null
  }

  const current = slides[index]

  return (
    <div
      className={cn("relative isolate mx-auto w-full max-w-[22rem]", className)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={() => {
        touchStart.current = null
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-[8%] top-[12%] -z-10 h-[70%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--spectrum-blue)_30%,transparent),transparent)] blur-3xl"
      />
      <div className="rounded-[2.4rem] border border-white/10 bg-white/[0.03] p-2 shadow-[0_50px_100px_-45px_oklch(0_0_0/95%),0_1px_0_0_oklch(1_0_0/8%)_inset]">
        <div className="overflow-hidden rounded-[1.9rem] bg-black">
          <MinimalistVideoPlayer
            videoId={current.id}
            thumbnailSrc={current.thumb}
            aspectRatio="9/16"
            className="w-full"
            forceMuted
            showMuteToggle={false}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <Button
          aria-label="Previous"
          onClick={prev}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          type="button"
          variant="outline"
          size="icon"
          className={controlClassName}
        >
          <ChevronLeft className="size-5" aria-hidden="true" focusable="false" />
        </Button>

        <div className="flex min-w-0 flex-col items-center gap-2.5">
          <p
            aria-live="polite"
            aria-atomic="true"
            className="inline-flex min-w-0 items-center gap-1.5 text-sm font-medium tracking-[-0.01em] text-foreground"
          >
            <MapPin aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
            <span className="truncate">{current.label}</span>
          </p>
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {slides.map((slide, i) => (
              <span
                key={slide.id}
                className={cn(
                  "h-1 rounded-full",
                  i === index ? "w-6 bg-foreground" : "w-2.5 bg-white/20",
                )}
              />
            ))}
          </div>
          <p className="sr-only">
            Clip {index + 1} of {slides.length}
          </p>
        </div>

        <Button
          aria-label="Next"
          onClick={next}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          type="button"
          variant="outline"
          size="icon"
          className={controlClassName}
        >
          <ChevronRight className="size-5" aria-hidden="true" focusable="false" />
        </Button>
      </div>
    </div>
  )
}
