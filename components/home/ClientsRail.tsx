"use client"

import ClientCard from "@/components/home/ClientCard"
import { CLIENTS } from "@/lib/clients"
import { shuffleArray } from "@/utils/shuffle"
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"
import { useReducedMotion } from "framer-motion"

const FALLBACK_BACKGROUNDS = ["/gradient a.png", "/gradient b.png", "/gradient c.png", "/gradient d.png"] as const

export default function ClientsRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [clients, setClients] = useState(CLIENTS)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isInView, setIsInView] = useState(true)
  const isMobile = useMobile()
  const prefersReducedMotion = useReducedMotion()

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

  const markInteracted = useCallback(() => {
    setHasInteracted((prev) => (prev ? prev : true))
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

    const handlePointer = () => markInteracted()
    rail.addEventListener("pointerdown", handlePointer)
    rail.addEventListener("wheel", handlePointer, { passive: true })
    rail.addEventListener("touchstart", handlePointer, { passive: true })

    return () => {
      rail.removeEventListener("scroll", handleScroll)
      rail.removeEventListener("pointerdown", handlePointer)
      rail.removeEventListener("wheel", handlePointer)
      rail.removeEventListener("touchstart", handlePointer)
      window.removeEventListener("resize", handleResize)
    }
  }, [markInteracted, updateScrollState])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (hasInteracted || prefersReducedMotion || isMobile || !isInView) return
    const rail = railRef.current
    if (!rail) return

    let frame: number
    const step = () => {
      const maxScroll = rail.scrollWidth - rail.clientWidth
      if (maxScroll <= 0) return
      if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2) {
        rail.scrollTo({ left: 0 })
      } else {
        rail.scrollLeft += 0.6
      }
      updateScrollState()
      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [hasInteracted, isInView, isMobile, prefersReducedMotion, updateScrollState])

  const scrollByAmount = (direction: "left" | "right") => {
    markInteracted()
    const rail = railRef.current
    if (!rail) return
    const amount = Math.max(rail.clientWidth * 0.85, 320)
    rail.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }

  const maskStyle = useMemo(() => {
    const leftStop = !isMobile && canScrollLeft ? "0%" : "6%"
    const rightStop = canScrollRight ? "100%" : "94%"
    const leftColor = !isMobile && canScrollLeft ? "transparent" : "rgba(0,0,0,1)"
    const rightColor = canScrollRight ? "transparent" : "rgba(0,0,0,1)"

    return {
      maskImage: `linear-gradient(to right, ${leftColor} ${leftStop}, black 12%, black 88%, ${rightColor} ${rightStop})`,
      WebkitMaskImage: `linear-gradient(to right, ${leftColor} ${leftStop}, black 12%, black 88%, ${rightColor} ${rightStop})`,
    } as const
  }, [canScrollLeft, canScrollRight, isMobile])

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <div
          ref={railRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 md:px-6 py-1 scroll-smooth"
          role="list"
          aria-label="Client stories"
          style={maskStyle}
        >
          {clients.map((client, index) => {
            const backgroundSrc = client.image ?? FALLBACK_BACKGROUNDS[index % FALLBACK_BACKGROUNDS.length]
            return (
              <div
                key={client.title}
                className="shrink-0 snap-start md:translate-y-0 w-[78vw] sm:w-[58vw] md:w-[260px] first:ml-1 md:first:ml-0"
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
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border bg-white/95 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollByAmount("right")}
          disabled={!canScrollRight}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border bg-white/95 shadow-md transition hover:bg-white disabled:pointer-events-none disabled:opacity-40"
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
        <p className="text-center text-xs text-neutral-500 sm:text-sm dark:text-neutral-400">
          explore the brands that trust prism
        </p>
      </div>
    </div>
  )
}
