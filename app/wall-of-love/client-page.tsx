"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { trackCTAClick } from "@/utils/analytics"
import PixelishImg from "@/components/pixelish/PixelishImg"
import {
  quotesData,
  renderFormattedText,
  takeawaysData,
  type Quote,
  type Takeaway,
} from "@/content/wall-of-love-data"

type FeedItem =
  | { kind: "quote"; data: Quote }
  | { kind: "takeaway"; data: Takeaway }

// Generic Fisher–Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const copy = array.slice()
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function WallOfLoveClientPage() {
  const combinedFeed: FeedItem[] = useMemo(
    () => [
      ...quotesData.map((q) => ({ kind: "quote", data: q } as FeedItem)),
      ...takeawaysData.map((t) => ({ kind: "takeaway", data: t } as FeedItem)),
    ],
    []
  )

  const [feed, setFeed] = useState<FeedItem[]>(combinedFeed)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const reviewCount = combinedFeed.length

  useEffect(() => {
    setFeed(shuffleArray(combinedFeed))
  }, [combinedFeed])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])
  // minimal vertical list – no carousels, observers, or shuffling

  return (
    <>
      <section className="relative w-full overflow-hidden border-b border-border/60 bg-transparent py-14 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-primary/12 via-primary/5 to-transparent" />
          <div className="absolute -left-28 top-16 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -right-24 bottom-6 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/50 px-4 py-2 shadow-sm backdrop-blur-sm">
                <PixelishImg src="/pixelish/emoji-heart.svg" alt="Heart icon" size={26} />
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">testimonials</p>
              </div>

              <h1 className="mt-5 text-balance text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-7xl">wall of love</h1>
              <p className="mt-4 text-[15px] italic text-muted-foreground sm:text-base">impossible is temporary.</p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0">
                Real words from founders, operators, and creators we have partnered with across launches, redesigns, and growth sprints.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border/60 bg-card/40 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground font-pixel">instagram</p>
                  <p className="mt-1 text-lg font-semibold">40,000+</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/40 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground font-pixel">tiktok</p>
                  <p className="mt-1 text-lg font-semibold">5,000+</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/40 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground font-pixel">youtube</p>
                  <p className="mt-1 text-lg font-semibold">24,500+</p>
                </div>
              </div>

              <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-pixel">
                {reviewCount.toLocaleString()} community reactions in this feed
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link href="/get-started">
                  <Button
                    size="lg"
                    className="rounded-md px-6"
                    onClick={() => trackCTAClick("wall_of_love_get_started_cta", "/get-started")}
                  >
                    let's make something you'll love <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link
                  href="#testimonials-feed"
                  className="inline-flex items-center rounded-md border border-border/70 px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  jump to the feed
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[560px]">
              <div className="relative rounded-2xl border border-border/70 bg-black/95 p-4 shadow-[0_30px_80px_-40px_rgba(22,163,247,0.65)]">
                <div className="mb-3 flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/75 font-pixel">planet ascii transmission</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-pixel">looping sample</p>
                </div>

                <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black">
                  {prefersReducedMotion || videoFailed ? (
                    <Image
                      src="/ascii/static/wall-of-love/planet.png"
                      alt="ASCII planet animation preview"
                      fill
                      unoptimized
                      className="object-cover [image-rendering:pixelated]"
                      sizes="(max-width: 768px) 92vw, 520px"
                    />
                  ) : (
                    <video
                      src="/ascii/motion/wall-of-love/planet.mp4"
                      poster="/ascii/static/wall-of-love/planet.png"
                      className="h-full w-full object-cover [image-rendering:pixelated]"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      onError={() => setVideoFailed(true)}
                    />
                  )}
                </div>

                <p className="mt-3 text-center text-[10px] uppercase tracking-[0.22em] text-white/60 font-pixel">
                  from the prism ascii motion archive
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-transparent">
        <main id="testimonials-feed" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground text-center font-pixel">
            {reviewCount.toLocaleString()} voices from our community of founders
          </p>
          <div className="space-y-4 sm:space-y-5 columns-1 md:columns-2 xl:columns-3 gap-5">
            {feed.map((item) => {
              const isQuote = item.kind === "quote"
              return (
                <blockquote
                  key={`${item.kind}-${item.data.id}`}
                  className="mb-4 w-full break-inside-avoid overflow-hidden rounded-md border border-border/60 bg-card/30 p-4 shadow-none backdrop-blur-sm sm:p-5"
                  aria-label={
                    isQuote
                      ? `Testimonial from ${item.data.client}`
                      : `Viewer takeaway from @${(item.data as Takeaway).handle}`
                  }
                >
                  <p className="text-[15px] leading-relaxed text-foreground sm:text-base">
                    &ldquo;{renderFormattedText(isQuote ? (item.data as Quote).text : (item.data as Takeaway).text)}&rdquo;
                  </p>
                  <footer className="mt-3 flex items-center justify-end text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground font-pixel sm:text-xs">
                      {isQuote ? (item.data as Quote).client : `@${(item.data as Takeaway).handle}`}
                    </p>
                  </footer>
                </blockquote>
              )
            })}
          </div>
        </main>
      </div>
    </>
  )
}
