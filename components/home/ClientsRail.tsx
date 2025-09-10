"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ClientCard from "@/components/home/ClientCard"
import { CLIENTS } from "@/lib/clients"
import { shuffleArray } from "@/utils/shuffle"

export default function ClientsRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const [shuffledClients, setShuffledClients] = useState(CLIENTS)

  // Shuffle on client mount to avoid hydration mismatch
  useEffect(() => {
    setShuffledClients(shuffleArray(CLIENTS))
  }, [])
  // Use the intended gradient set (A–D). These filenames contain spaces;
  // CoreImage bypasses optimizer for such paths to avoid 400s.
  const GRADIENTS = [
    "/gradient a.png",
    "/gradient b.png",
    "/gradient c.png",
    "/gradient d.png",
  ] as const

  const scrollByAmount = (dir: "left" | "right") => {
    const rail = railRef.current
    if (!rail) return
    const amount = Math.max(rail.clientWidth * 0.85, 320)
    rail.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  // Simplified rail: single pass, native snap scrolling; no recentering or animation

  return (
    <div className="relative">
      {/* Horizontal rail with snap and responsive card widths */}
      <div
        ref={railRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-0 py-1"
        role="list"
        aria-label="Client cards"
      >
        {shuffledClients.map((client, i) => {
          const gradientSrc = GRADIENTS[i % GRADIENTS.length]
          return (
            <div
              key={client.title}
              className="shrink-0 snap-start md:translate-y-0 first:ml-4 last:mr-4 w-[78vw] sm:w-[62vw] md:w-[260px]"
              role="listitem"
            >
              <ClientCard
                title={client.title}
                location={client.location}
                image={gradientSrc}
                href={client.href}
                objectPosition={client.objectPosition}
                priority={i < 3}
                website={client.website}
              />
            </div>
          )
        })}
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
