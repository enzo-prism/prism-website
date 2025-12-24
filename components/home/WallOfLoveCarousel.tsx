"use client"

import Link from "next/link"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { quotesData, renderFormattedText } from "@/content/wall-of-love-data"

const MAX_QUOTES = 12

const buildQuotePool = () => {
  const safeQuotes = quotesData.filter((quote) => !quote.requiresConsent)
  const spotlight = safeQuotes.filter((quote) => quote.heroSpotlight)
  const pinned = safeQuotes.filter((quote) => quote.pinned && !quote.heroSpotlight)
  const remaining = safeQuotes.filter((quote) => !quote.heroSpotlight && !quote.pinned)
  return [...spotlight, ...pinned, ...remaining].slice(0, MAX_QUOTES)
}

const QUOTE_POOL = buildQuotePool()

type WallOfLoveCarouselProps = {
  showCta?: boolean
  showEyebrow?: boolean
  enableMobileArrows?: boolean
}

export default function WallOfLoveCarousel({
  showCta = true,
  showEyebrow = true,
  enableMobileArrows = false,
}: WallOfLoveCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const { scrollLeft, scrollWidth, clientWidth } = rail
    setCanScrollLeft(scrollLeft > 8)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8)
  }, [])

  useEffect(() => {
    updateScrollState()
  }, [updateScrollState])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    updateScrollState()

    const handleScroll = () => updateScrollState()
    const handleResize = () => updateScrollState()

    rail.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      rail.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [updateScrollState])

  const scrollByAmount = useCallback((direction: "left" | "right") => {
    const rail = railRef.current
    if (!rail) return
    if (typeof window === "undefined") return
    const firstCard = rail.firstElementChild as HTMLElement | null
    let amount = Math.max(rail.clientWidth * 0.85, 320)

    if (firstCard) {
      const styles = window.getComputedStyle(rail)
      const gapRaw = styles.columnGap || styles.gap || "0"
      const gap = Number.parseFloat(gapRaw) || 0
      amount = firstCard.getBoundingClientRect().width + gap
    }

    rail.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }, [])

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 bg-muted/30">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-muted/50 via-transparent to-transparent" />
      <div className="container relative flex flex-col mx-auto gap-10 px-4 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {showEyebrow ? (
            <Badge variant="secondary" className="w-fit">
              Wall of Love
            </Badge>
          ) : null}
          <div className="space-y-3">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Founders are already seeing the difference
            </h2>
            <p className="text-balance text-base text-muted-foreground">
              A few notes from the people we have helped build, refine, and scale their online presence.
            </p>
          </div>
          {showCta ? (
            <Button
              asChild
              variant="outline"
              className="rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
            >
              <Link href="/wall-of-love">
                View the Wall of Love
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
          ) : null}
        </div>

        <div className="relative">
          <div className="relative">
            <div
              ref={railRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 py-1 scroll-smooth scrollbar-hide"
              role="list"
              aria-label="Wall of love quotes"
            >
              {QUOTE_POOL.map((quote) => (
                <div
                  key={quote.id}
                  className="w-[86vw] shrink-0 snap-start sm:w-[70vw] md:w-[48vw] lg:w-[360px]"
                  role="listitem"
                >
                  <Card className="flex h-full flex-col border-border/60 bg-card/90 shadow-sm">
                    <CardHeader className="space-y-3">
                      <Badge
                        variant="outline"
                        className="w-fit max-w-full truncate"
                        title={quote.company}
                      >
                        {quote.company}
                      </Badge>
                      <p className="text-sm font-semibold text-foreground">
                        &ldquo;{renderFormattedText(quote.text)}&rdquo;
                      </p>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <p className="text-sm font-semibold text-foreground">{quote.client}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
              <span className="sr-only">Swipe horizontally to explore more testimonials</span>
            </div>

            {canScrollLeft ? (
              <div
                className="pointer-events-none absolute inset-y-0 left-0 hidden w-12 bg-gradient-to-r from-muted/30 to-transparent sm:block"
                aria-hidden="true"
              />
            ) : null}
            {canScrollRight ? (
              <div
                className="pointer-events-none absolute inset-y-0 right-0 hidden w-12 bg-gradient-to-l from-muted/30 to-transparent sm:block"
                aria-hidden="true"
              />
            ) : null}

            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 translate-x-1 items-center justify-center rounded-full border bg-card/95 shadow-md transition hover:bg-card disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 -translate-x-1 items-center justify-center rounded-full border bg-card/95 shadow-md transition hover:bg-card disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {enableMobileArrows ? (
            <div className="mt-6 flex items-center justify-center gap-4 sm:hidden">
              <button
                type="button"
                aria-label="Scroll left"
                onClick={() => scrollByAmount("left")}
                disabled={!canScrollLeft}
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-card/95 shadow-md transition disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Scroll right"
                onClick={() => scrollByAmount("right")}
                disabled={!canScrollRight}
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-card/95 shadow-md transition disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
