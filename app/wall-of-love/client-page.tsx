"use client"

import { Button } from "@/components/ui/button"
// animations removed for a simpler, static page
import { ArrowRight } from "lucide-react"
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

// removed copy/DM helpers to simplify UI

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
  const reviewCount = combinedFeed.length

  useEffect(() => {
    setFeed(shuffleArray(combinedFeed))
  }, [combinedFeed])
  // minimal vertical list – no carousels, observers, or shuffling

  return (
    <>
      <section className="relative w-full border-b border-border/60 bg-transparent py-12 sm:py-14">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-3">
            <div className="flex justify-center">
              <PixelishImg src="/pixelish/emoji-heart.svg" alt="Heart icon" size={44} />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">testimonials</p>
            <h1 className="text-5xl font-semibold sm:text-6xl lg:text-7xl">wall of love</h1>
            <p className="text-[14px] sm:text-[15px] text-muted-foreground italic">impossible is temporary.</p>
            <div className="flex items-center justify-center gap-3 text-[13px] sm:text-[14px] text-muted-foreground">
              <span>40,000+ on instagram</span>
              <span className="text-border/60">•</span>
              <span>5,000+ on tiktok</span>
              <span className="text-border/60">•</span>
              <span>24,500+ on youtube</span>
            </div>
            <div className="pt-1 flex items-center justify-center">
              <Link href="/get-started">
                <Button
                  size="lg"
                  className="rounded-md px-6"
                  onClick={() => trackCTAClick("wall_of_love_get_started_cta", "/get-started")}
                >
                  let's make something you'll love <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-transparent">
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
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
