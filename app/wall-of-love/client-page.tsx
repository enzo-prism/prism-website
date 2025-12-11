"use client"

import { Button } from "@/components/ui/button"
// animations removed for a simpler, static page
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { trackCTAClick } from "@/utils/analytics"
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
      <section className="relative w-full py-10 sm:py-12 bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="space-y-3">
            <div className="text-4xl">❤️</div>
            <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-tight lowercase text-neutral-900">wall of love</h1>
            <p className="text-[14px] sm:text-[15px] text-neutral-700 italic lowercase">impossible is temporary.</p>
            <div className="text-[13px] sm:text-[14px] text-neutral-600 lowercase flex items-center justify-center gap-3">
              <span>40,000+ on instagram</span>
              <span className="text-neutral-300">•</span>
              <span>24.5k+ on youtube</span>
            </div>
            <div className="pt-1 flex items-center justify-center">
              <Link href="/pricing">
                <Button
                  size="sm"
                  className="rounded-full px-6 py-2.5 text-sm lowercase bg-neutral-900 text-white hover:bg-neutral-800"
                  onClick={() => trackCTAClick("wall_of_love_pricing_cta", "/pricing")}
                >
                  let's make something you'll love <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-neutral-50">
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-neutral-400 text-center">
            {reviewCount.toLocaleString()} voices from our community
          </p>
          <div className="space-y-4 sm:space-y-5 columns-1 md:columns-2 xl:columns-3 gap-5">
            {feed.map((item) => {
              const isQuote = item.kind === "quote"
              return (
                <blockquote
                  key={`${item.kind}-${item.data.id}`}
                  className="mb-4 break-inside-avoid bg-white p-4 sm:p-5 rounded-xl w-full border border-neutral-200 overflow-hidden shadow-sm"
                  aria-label={
                    isQuote
                      ? `Testimonial from ${item.data.client}`
                      : `Viewer takeaway from @${(item.data as Takeaway).handle}`
                  }
                >
                  <p className="text-[15px] sm:text-base text-neutral-800 leading-relaxed tracking-tight">
                    &ldquo;{renderFormattedText(isQuote ? (item.data as Quote).text : (item.data as Takeaway).text)}&rdquo;
                  </p>
                  <footer className="mt-3 flex items-center justify-end text-right">
                    <p className="font-medium text-sm sm:text-[15px] text-neutral-900">
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
