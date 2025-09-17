"use client"

import type { CSSProperties } from "react"
import { useEffect, useMemo, useState } from "react"
import ClientCard from "@/components/home/ClientCard"
import { CLIENTS } from "@/lib/clients"
import { shuffleArray } from "@/utils/shuffle"

const GRADIENTS = ["/gradient a.png", "/gradient b.png", "/gradient c.png", "/gradient d.png"] as const

export default function ClientsRail() {
  const [shuffledClients, setShuffledClients] = useState(CLIENTS)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setShuffledClients(shuffleArray(CLIENTS))
  }, [])

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setReduceMotion(media.matches)

    updatePreference()
    media.addEventListener("change", updatePreference)
    return () => media.removeEventListener("change", updatePreference)
  }, [])

  const marqueeDuration = useMemo(() => `${Math.max(32, shuffledClients.length * 6)}s`, [shuffledClients.length])

  const loopedClients = useMemo(
    () => (reduceMotion ? shuffledClients : [...shuffledClients, ...shuffledClients]),
    [reduceMotion, shuffledClients],
  )

  const maskStyle: CSSProperties = {
    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  }

  return (
    <div className="relative group">
      <div
        className="relative overflow-hidden py-1"
        role="presentation"
        style={maskStyle}
      >
        <div
          className={`flex w-max gap-4 ${
            reduceMotion ? "" : "animate-clients-marquee group-hover:[animation-play-state:paused] will-change-transform"
          }`}
          role="list"
          aria-label="Client cards"
          style={reduceMotion ? undefined : ({ animationDuration: marqueeDuration } as CSSProperties)}
        >
          {loopedClients.map((client, index) => {
            const isDuplicate = !reduceMotion && index >= shuffledClients.length
            const gradientSrc = GRADIENTS[index % GRADIENTS.length]
            return (
              <div
                key={`${client.title}-${index}`}
                className="shrink-0 md:translate-y-0 w-[78vw] sm:w-[62vw] md:w-[260px]"
                role={isDuplicate ? undefined : "listitem"}
                aria-hidden={isDuplicate}
              >
                <ClientCard
                  title={client.title}
                  location={client.location}
                  image={gradientSrc}
                  href={client.href}
                  objectPosition={client.objectPosition}
                  priority={index < 3}
                  interactive={!isDuplicate}
                  website={client.website}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
