"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ClientCard from "@/components/home/ClientCard"
import { CLIENTS } from "@/lib/clients"

export default function ClientsRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const [featuredIndex, setFeaturedIndex] = useState(0)
  // Use a single, safe path without spaces to avoid optimizer issues
  const GRADIENTS = [
    "/client-gradient.jpg",
    "/client-gradient.jpg",
    "/client-gradient.jpg",
    "/client-gradient.jpg",
  ] as const

  const scrollByAmount = (dir: "left" | "right") => {
    const rail = railRef.current
    if (!rail) return
    const amount = Math.max(rail.clientWidth * 0.85, 320)
    rail.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  // Build an infinite scroll illusion by repeating items 3x
  const repeated = [...CLIENTS, ...CLIENTS, ...CLIENTS]

  // After mount, center on the middle copy and keep wrapping seamlessly
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const segmentWidth = () => rail.scrollWidth / 3
    // Center to the second segment
    rail.scrollLeft = segmentWidth()

    const onScroll = () => {
      const seg = segmentWidth()
      if (rail.scrollLeft < seg * 0.4) {
        // Jump forward by one segment
        rail.scrollLeft += seg
      } else if (rail.scrollLeft > seg * 1.6) {
        // Jump backward by one segment
        rail.scrollLeft -= seg
      }
    }
    rail.addEventListener('scroll', onScroll, { passive: true })
    return () => rail.removeEventListener('scroll', onScroll)
  }, [])

  // Subtle featured-card animator – rotates every 3s
  useEffect(() => {
    const id = setInterval(() => {
      setFeaturedIndex((i) => (i + 1) % CLIENTS.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative">
      {/* Horizontal rail with snap and responsive card widths */}
      <div
        ref={railRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-1 py-1"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
          scrollPaddingLeft: '16px',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, black 20px, black calc(100% - 20px), transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0, black 20px, black calc(100% - 20px), transparent 100%)',
        }}
        role="list"
        aria-label="Client cards"
      >
        {repeated.map((client, i) => {
          // Map repeated indices back to base index for animations/gradients
          const baseIndex = i % CLIENTS.length
          const gradientSrc = GRADIENTS[baseIndex % GRADIENTS.length]
          const isFeatured = baseIndex === featuredIndex
          // Preload images that are likely visible after centering to the middle segment
          const inMiddleSegment = i >= CLIENTS.length && i < CLIENTS.length + 8
          return (
          <div
            key={`${client.title}-${i}`}
            className={`shrink-0 snap-start transition-transform duration-500 ease-out ${isFeatured ? 'md:scale-[1.03]' : 'md:scale-100'} md:translate-y-0`}
            style={{ width: "clamp(180px, 60vw, 260px)" }}
            role="listitem"
          >
            <ClientCard
              title={client.title}
              location={client.location}
              image={gradientSrc}
              href={client.href}
              objectPosition={client.objectPosition}
              priority={inMiddleSegment}
              website={client.website}
            />
          </div>
        )})}
      </div>

      {/* Edge fades now handled by CSS mask on the scroll container */}

      {/* Arrow controls */}
      <button
        aria-label="Scroll left"
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md border z-10"
        onClick={() => scrollByAmount("left")}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Scroll right"
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md border z-10"
        onClick={() => scrollByAmount("right")}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
