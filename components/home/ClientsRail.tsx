"use client"

import ClientCard from "@/components/home/ClientCard"
import { CLIENTS } from "@/lib/clients"
import { shuffleArray } from "@/utils/shuffle"
import { MoveRight } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ClientsRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const [clients, setClients] = useState(CLIENTS)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

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

  return (
    <div className="relative">
      <div className="relative">
        <div
          ref={railRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory px-4 md:px-6 py-2 scroll-smooth"
          role="list"
          aria-label="Client stories"
        >
          {clients.map((client) => (
            <div
              key={client.title}
              className="shrink-0 snap-start md:translate-y-0 w-[78vw] sm:w-[54vw] md:w-[270px] first:ml-1 md:first:ml-0"
              role="listitem"
            >
              <ClientCard
                title={client.title}
                location={client.location}
                category={client.category}
                href={client.href}
                website={client.website}
              />
            </div>
          ))}
          <span className="sr-only">Swipe or scroll horizontally to view more clients</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/case-studies">
            view case studies
            <MoveRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
