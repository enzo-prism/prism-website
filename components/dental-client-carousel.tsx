'use client'

import { ArrowUpRight } from 'lucide-react'

import { trackCTAClick } from '@/utils/analytics'

type DentalClient = {
  name: string
  location: string
  url: string
  focus: string
  external?: boolean
}

const DENTAL_CLIENTS: DentalClient[] = [
  {
    name: 'Dr. Christopher B. Wong',
    location: 'Palo Alto, CA',
    url: 'https://www.chriswongdds.com',
    focus: 'Smooth ownership transition',
  },
  {
    name: 'Town Centre Dental',
    location: 'Brentwood, CA',
    url: 'https://www.towncentredental.net',
    focus: 'Modernized booking and analytics',
  },
  {
    name: 'Coast Periodontics',
    location: 'San Luis Obispo, CA',
    url: 'https://www.coastperiodontics.com',
    focus: 'Specialty periodontic website',
  },
  {
    name: 'Grace Dental',
    location: 'Santa Rosa, CA',
    url: 'https://www.tingjenjidds.com',
    focus: 'Brand refresh and local search',
  },
  {
    name: 'Exquisite Dentistry',
    location: 'Los Angeles, CA',
    url: 'https://exquisitedentistryla.com/',
    focus: 'Luxury cosmetic and general dentistry',
  },
  {
    name: 'Wine Country Root Canal',
    location: 'Santa Rosa, CA',
    url: 'https://www.winecountryrootcanal.com/',
    focus: 'Specialty endodontic launch',
  },
  {
    name: 'Family First Smile Care',
    location: 'Los Gatos, CA',
    url: 'https://famfirstsmile.com/',
    focus: 'Family dentistry website',
  },
]

/** Live dental client sites as a hairline list (external links, tracked). */
export default function DentalClientCarousel() {
  return (
    <ul className="divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.08] bg-card">
      {DENTAL_CLIENTS.map((client) => (
        <li key={client.name}>
          <a
            href={client.url}
            target={client.external === false ? undefined : '_blank'}
            rel={client.external === false ? undefined : 'noreferrer'}
            onClick={() => trackCTAClick('dental_client_click', client.name)}
            className="group/client flex min-h-16 items-center gap-4 px-5 py-4 transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/50 sm:px-6"
          >
            <span className="min-w-0 flex-1 sm:flex sm:items-center sm:gap-6">
              <span className="block min-w-0 sm:w-[46%] sm:shrink-0">
                <span className="block truncate text-[15px] font-medium text-foreground">{client.name}</span>
                <span className="block font-mono text-[11px] text-subtle">{client.location}</span>
              </span>
              <span className="mt-1 block text-[14px] text-muted-foreground sm:mt-0">{client.focus}</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-[13px] text-muted-foreground transition-colors group-hover/client:text-foreground">
              <span className="hidden md:inline">{client.external === false ? 'View case study' : 'View site'}</span>
              <span className="sr-only md:hidden">{client.external === false ? 'View case study' : 'View site'}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover/client:-translate-y-0.5 group-hover/client:translate-x-0.5"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
