"use client"

import { trackCTAClick } from "@/utils/analytics"
import { ArrowRight } from "lucide-react"

type DentalClient = {
  name: string
  location: string
  url: string
  focus: string
}

const DENTAL_CLIENTS: DentalClient[] = [
  {
    name: "Dr. Christopher B. Wong",
    location: "Palo Alto, CA",
    url: "https://www.chriswongdds.com",
    focus: "seamless ownership transition",
  },
  {
    name: "Town Centre Dental",
    location: "Brentwood, CA",
    url: "https://www.towncentredental.net",
    focus: "modernized booking + analytics",
  },
  {
    name: "Laguna Beach Dental Arts",
    location: "Laguna Beach, CA",
    url: "https://lagunabeachdentalarts.com",
    focus: "post-M&A relaunch, cosmetic & general",
  },
  {
    name: "Coast Periodontics",
    location: "Redondo Beach, CA",
    url: "http://coastperiodontics.com",
    focus: "specialty periodontic growth system",
  },
  {
    name: "Grace Dental",
    location: "Santa Rosa, CA",
    url: "https://www.tingjenjidds.com",
    focus: "brand refresh & local acquisition",
  },
  {
    name: "Exquisite Dentistry",
    location: "Los Angeles, CA",
    url: "https://exquisitedentistryla.com/",
    focus: "luxury cosmetic + general dentistry",
  },
  {
    name: "Wine Country Root Canal",
    location: "Santa Rosa, CA",
    url: "https://www.winecountryrootcanal.com/",
    focus: "specialty endodontic launch",
  },
  {
    name: "Family First Smile Care",
    location: "Los Gatos, CA",
    url: "https://famfirstsmile.com/",
    focus: "family dentistry growth system",
  },
  {
    name: "sr4 Partners",
    location: "Chicago, IL",
    url: "https://www.sr4partners.com/",
    focus: "consulting operations partnership",
  },
]

export default function DentalClientCarousel() {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/70 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/70 to-transparent"
        aria-hidden
      />
      <div
        className="flex gap-6 overflow-x-auto px-1 pb-6 sm:gap-7 [mask-image:linear-gradient(90deg,transparent,black 8%,black 92%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none" }}
      >
        {DENTAL_CLIENTS.map((client) => (
          <a
            key={client.name}
            href={client.url}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackCTAClick("dental_client_click", client.name)}
            className="group block min-w-[260px] shrink-0 rounded-3xl border border-neutral-200 bg-neutral-50/80 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:bg-white hover:shadow-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-900"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-neutral-900">{client.name}</p>
                <p className="text-xs text-neutral-500">{client.location}</p>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white">
                <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
            <p className="mt-4 text-sm text-neutral-600">{client.focus}</p>
            <p className="mt-5 text-xs font-medium uppercase tracking-[0.28em] text-neutral-400">view site</p>
          </a>
        ))}
      </div>
    </div>
  )
}
