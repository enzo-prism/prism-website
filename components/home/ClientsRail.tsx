"use client"

import ClientCard from "@/components/home/ClientCard"
import { CLIENTS } from "@/lib/clients"
import { shuffleArray } from "@/utils/shuffle"
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

const FALLBACK_BACKGROUNDS = ["/gradient a.png", "/gradient b.png", "/gradient c.png", "/gradient d.png"] as const

export default function ClientsRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const [clients, setClients] = useState(CLIENTS)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isMobile = useMobile()

  useEffect(() => {
    setClients(shuffleArray(CLIENTS))
  }, [])

  const updateScrollState = useCallback(() => {
    const rail = railRef.current
    if (!rail) return
    const { scrollLeft, scrollWidth, clientWidth } = rail
    setCanScrollLeft(scrollLeft > 8)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 8)
    const maxScroll = Math.max(scrollWidth - clientWidth, 1)
    setScrollProgress(Math.min(scrollLeft / maxScroll, 1))
  }, [])

  useEffect(() => {
    updateScrollState()
  }, [clients, updateScrollState])

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
    if (isMobile) return undefined
    const leftStop = canScrollLeft ? "0%" : "8%"
    const rightStop = canScrollRight ? "100%" : "92%"
    const leftColor = canScrollLeft ? "transparent" : "rgba(0,0,0,1)"
    const rightColor = canScrollRight ? "transparent" : "rgba(0,0,0,1)"

    return {
      maskImage: `linear-gradient(to right, ${leftColor} ${leftStop}, black 14%, black 86%, ${rightColor} ${rightStop})`,
      WebkitMaskImage: `linear-gradient(to right, ${leftColor} ${leftStop}, black 14%, black 86%, ${rightColor} ${rightStop})`,
    } as const
  }, [canScrollLeft, canScrollRight, isMobile])

  return (
    <div className="relative">
      <div className="relative">
        <div
          ref={railRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory px-4 md:px-6 py-1 scroll-smooth"
          role="list"
          aria-label="Client stories"
          style={maskStyle}
        >
          {clients.map((client, index) => {
            const backgroundSrc = client.image ?? FALLBACK_BACKGROUNDS[index % FALLBACK_BACKGROUNDS.length]
            return (
              <div
                key={client.title}
                className="shrink-0 snap-start md:translate-y-0 w-[74vw] sm:w-[52vw] md:w-[260px] first:ml-1 md:first:ml-0"
                role="listitem"
              >
                <ClientCard
                  title={client.title}
                  location={client.location}
                  image={backgroundSrc}
                  href={client.href}
                  objectPosition={client.objectPosition}
                  priority={index < 3}
                  website={client.website}
                />
              </div>
            )
          })}
          <span className="sr-only">Swipe or scroll horizontally to view more clients</span>
        </div>

        {!isMobile && canScrollLeft ? (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent dark:from-neutral-950"
            aria-hidden="true"
          />
        ) : null}
        {canScrollRight ? (
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white to-transparent dark:from-neutral-950"
            aria-hidden="true"
          />
        ) : null}

        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollByAmount("left")}
          disabled={!canScrollLeft}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border bg-white/95 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollByAmount("right")}
          disabled={!canScrollRight}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border bg-white/95 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 text-sm text-neutral-500 sm:flex-row sm:justify-center">
        <div className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-neutral-200 bg-white px-4 py-1 text-xs font-medium uppercase tracking-wider text-neutral-600 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200">
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full bg-neutral-100/80 dark:bg-neutral-800/60"
            style={{ width: `${Math.max(scrollProgress, 0.08) * 100}%` }}
          />
          <span className="relative hidden sm:inline">Scroll</span>
          <span className="relative sm:hidden">Swipe</span>
          <MoveRight className="relative h-4 w-4" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
