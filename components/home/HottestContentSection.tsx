"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import InstagramEmbed from "@/components/instagram-embed"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HOTTEST_CONTENT } from "@/lib/hottest-content"
import { trackCTAClick } from "@/utils/analytics"

const FEATURED_URLS = [
  "https://www.instagram.com/reel/C483wd1SFB6/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/C8ulpLrvSCl/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==",
  "https://www.instagram.com/reel/C7CD7TArrBt/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
]

const featuredContent = [
  ...FEATURED_URLS.map((url) => HOTTEST_CONTENT.find((item) => item.instagramUrl === url)).filter(
    (item): item is (typeof HOTTEST_CONTENT)[number] => Boolean(item)
  ),
  ...HOTTEST_CONTENT.filter((item) => !FEATURED_URLS.includes(item.instagramUrl)),
].slice(0, 3)

export default function HottestContentSection() {
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

  const scrollByAmount = (direction: "left" | "right") => {
    const rail = railRef.current
    if (!rail) return
    const amount = Math.max(rail.clientWidth * 0.85, 320)
    rail.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }

  const maskStyle = useMemo(() => {
    const leftStop = canScrollLeft ? "0%" : "6%"
    const rightStop = canScrollRight ? "100%" : "94%"
    const leftColor = canScrollLeft ? "transparent" : "rgba(0,0,0,1)"
    const rightColor = canScrollRight ? "transparent" : "rgba(0,0,0,1)"

    return {
      maskImage: `linear-gradient(to right, ${leftColor} ${leftStop}, black 12%, black 88%, ${rightColor} ${rightStop})`,
      WebkitMaskImage: `linear-gradient(to right, ${leftColor} ${leftStop}, black 12%, black 88%, ${rightColor} ${rightStop})`,
    } as const
  }, [canScrollLeft, canScrollRight])

  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl space-y-2">
            <Badge variant="outline" className="lowercase">
              free business content
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter lowercase sm:text-4xl">
              masters of the attention economy
            </h2>
            <p className="text-neutral-600 lowercase md:text-lg">
              prism makes content loved by millions
            </p>
          </div>
          <Button
            className="rounded-full lowercase"
            asChild
            onClick={() => trackCTAClick("see all hottest content", "hottest content section")}
          >
            <Link href="/hottest-content">see all results</Link>
          </Button>
        </div>

        <div className="relative">
          <div className="relative">
            <div
              ref={railRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 py-1 scroll-smooth"
              role="list"
              aria-label="featured instagram content"
              style={maskStyle}
            >
              {featuredContent.map((item) => (
                <div
                  key={item.slug}
                  className="w-[88vw] shrink-0 snap-start sm:w-[58vw] md:w-[360px] lg:w-[380px]"
                  role="listitem"
                >
                  <Card className="h-full overflow-hidden border-neutral-200">
                    <CardContent className="p-0">
                      <InstagramEmbed url={item.instagramUrl} className="w-full" />
                    </CardContent>
                  </Card>
                </div>
              ))}
              <span className="sr-only">Swipe horizontally to explore more featured content</span>
            </div>

            {canScrollLeft ? (
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-neutral-50 to-transparent"
                aria-hidden="true"
              />
            ) : null}
            {canScrollRight ? (
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-neutral-50 to-transparent"
                aria-hidden="true"
              />
            ) : null}

            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 translate-x-1 items-center justify-center rounded-full border bg-white/95 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 -translate-x-1 items-center justify-center rounded-full border bg-white/95 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
