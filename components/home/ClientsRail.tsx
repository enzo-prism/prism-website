"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ClientCard from "@/components/home/ClientCard"
import { CLIENTS } from "@/lib/clients"

export default function ClientsRail() {
  const railRef = useRef<HTMLDivElement>(null)

  const scrollByAmount = (dir: "left" | "right") => {
    const rail = railRef.current
    if (!rail) return
    const amount = Math.max(rail.clientWidth * 0.85, 320)
    rail.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <div className="relative">
      {/* Horizontal rail with snap and responsive card widths */}
      <div
        ref={railRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-1 py-1"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
        role="list"
        aria-label="Client cards"
      >
        {CLIENTS.map((client, i) => (
          <div
            key={`${client.title}-${i}`}
            className="shrink-0 snap-start"
            style={{ width: "clamp(160px, 18vw, 260px)" }}
            role="listitem"
          >
            <ClientCard
              title={client.title}
              location={client.location}
              image={client.image}
              href={client.href}
              objectPosition={client.objectPosition}
              priority={i < 4}
            />
          </div>
        ))}
      </div>

      {/* Edge fade indicators */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white dark:from-neutral-900 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white dark:from-neutral-900 to-transparent" />

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
