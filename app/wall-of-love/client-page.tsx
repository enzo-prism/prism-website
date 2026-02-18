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

const PLANET_VIDEO_SRC = "/ascii/motion/wall-of-love/planet-lite.mp4"
const PLANET_POSTER_SRC = "/ascii/static/wall-of-love/planet.png"

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
      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="relative isolate overflow-hidden rounded-3xl border border-border/60 bg-card/50 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.7)]">
            {prefersReducedMotion || videoFailed ? (
              <Image
                src={PLANET_POSTER_SRC}
                alt="ASCII planet animation preview"
                fill
                unoptimized
                className="absolute inset-0 h-full w-full object-cover object-[center_80%] opacity-100 [image-rendering:pixelated]"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            ) : (
              <>
                <Image
                  src={PLANET_POSTER_SRC}
                  alt="ASCII planet animation preview"
                  fill
                  unoptimized
                  className="hero-loop-touch-poster absolute inset-0 h-full w-full object-cover object-[center_80%] opacity-100 [image-rendering:pixelated] sm:hidden"
                  sizes="100vw"
                />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  webkit-playsinline="true"
                  x-webkit-airplay="deny"
                  controls={false}
                  disablePictureInPicture
                  disableRemotePlayback
                  tabIndex={-1}
                  draggable={false}
                  preload="metadata"
                  poster={PLANET_POSTER_SRC}
                  aria-hidden="true"
                  data-hero-loop="true"
                  className="hero-loop-video pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-[center_80%] opacity-100 [image-rendering:pixelated] sm:block"
                  onError={() => setVideoFailed(true)}
                >
                  <source src={PLANET_VIDEO_SRC} type="video/mp4" />
                </video>
              </>
            )}

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/75 to-background/90"
            />

            <div className="relative z-10 mx-auto flex min-h-[320px] max-w-4xl flex-col items-center justify-center px-6 py-14 text-center sm:min-h-[360px] md:px-10 md:py-20">
              <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-card/50 px-4 py-2 shadow-sm backdrop-blur-sm">
                <PixelishImg src="/pixelish/emoji-heart.svg" alt="Heart icon" size={24} />
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">
                  testimonials
                </p>
              </div>

              <h1 className="mt-5 text-balance text-4xl font-semibold text-foreground sm:text-5xl md:text-6xl">
                Wall of Love
              </h1>
              <p className="mt-5 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Prism shares content for world-class founders and athletes
              </p>

              <p className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-semibold text-foreground sm:text-sm">
                <span>Instagram: 39,000+</span>
                <span className="hidden text-muted-foreground sm:inline">•</span>
                <span>TikTok: 6,000+</span>
                <span className="hidden text-muted-foreground sm:inline">•</span>
                <span>YouTube: 24,000+</span>
              </p>

              <div className="mt-8">
                <Link href="/get-started">
                  <Button
                    size="lg"
                    className="rounded-md px-6"
                    onClick={() => trackCTAClick("wall_of_love_become_client_cta", "/get-started")}
                  >
                    Become a Client <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
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
