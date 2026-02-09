"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MinimalistVideoPlayer from "@/components/minimalist-video-player"

type Slide = {
  id: string
  thumb: string
  label: string
}

const slides: Slide[] = [
  { id: "1116465370", thumb: "/white.svg", label: "san jose, ca" },
  { id: "1116465409", thumb: "/white.svg", label: "santa barbara, ca" },
  { id: "1116465400", thumb: "/white.svg", label: "fresno, ca" },
  { id: "1116465387", thumb: "/white.svg", label: "manila, philippines" },
  { id: "1116471573", thumb: "/white.svg", label: "palo alto, ca" },
  { id: "1116471566", thumb: "/white.svg", label: "new clark city, philippines" },
]

export default function PoleVaultCarousel() {
  const [index, setIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  const next = () => setIndex((i) => (i + 1) % slides.length)
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) {
      if (dx < 0) next(); else prev();
    }
    touchStartX.current = null
  }

  const current = slides[index]

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[520px] mx-auto" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <MinimalistVideoPlayer
        videoId={current.id}
        thumbnailSrc={current.thumb}
        aspectRatio="9/16"
        className="w-full"
        forceMuted
        showMuteToggle={false}
      />

      {/* Controls (mobile + desktop) */}
      <Button
        aria-label="Previous"
        onClick={prev}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        type="button"
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 z-30 -translate-y-1/2 rounded-md border border-border/60 bg-card/60 shadow-lg shadow-black/40 backdrop-blur active:scale-95 sm:-left-4 sm:p-2.5"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" focusable="false" />
      </Button>
      <Button
        aria-label="Next"
        onClick={next}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 z-30 -translate-y-1/2 rounded-md border border-border/60 bg-card/60 shadow-lg shadow-black/40 backdrop-blur active:scale-95 sm:-right-4 sm:p-2.5"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" focusable="false" />
      </Button>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {slides.map((_, i) => (
          <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-foreground' : 'bg-border/60'}`} />
        ))}
      </div>
      <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">{current.label}</p>
    </div>
  )
}
