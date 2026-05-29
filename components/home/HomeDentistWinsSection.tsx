import { BadgeCheck, Building2, MapPin } from 'lucide-react'

import {
  coreRouteContainerClassName,
  coreRouteSectionCompactClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import HomeDentistWinsCarousel from '@/components/home/HomeDentistWinsCarousel'
import { HOMEPAGE_DENTIST_WINS } from '@/components/home/homepage-content'

export default function HomeDentistWinsSection() {
  const { eyebrow, title, slides } = HOMEPAGE_DENTIST_WINS
  const clientCount = slides.length
  const cityCount = new Set(slides.map((slide) => slide.location)).size

  const trustStats = [
    { icon: Building2, label: `${clientCount} client practices` },
    { icon: MapPin, label: `${cityCount} California cities` },
    { icon: BadgeCheck, label: 'Verified case studies' },
  ]

  return (
    <section className={coreRouteSectionCompactClassName}>
      <div className={coreRouteContainerClassName}>
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 self-start font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-[#797165]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d8bc79]/70 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d8bc79]" />
              </span>
              {eyebrow}
            </span>

            <div
              role="heading"
              aria-level={2}
              className="font-sans text-[1.8rem] font-medium leading-[1.02] tracking-[-0.035em] text-[#f5f0e8] sm:whitespace-nowrap sm:text-[2.15rem] lg:text-[2.45rem]"
            >
              {title}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1">
              {trustStats.map(({ icon: Icon, label }, index) => (
                <div key={label} className="flex items-center gap-3">
                  {index > 0 ? (
                    <span
                      aria-hidden="true"
                      className="hidden h-3 w-px bg-white/12 sm:block"
                    />
                  ) : null}
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#b8afa2]">
                    <Icon
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-[#d8bc79]"
                      strokeWidth={1.7}
                    />
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <HomeDentistWinsCarousel slides={slides} />
        </div>
      </div>
    </section>
  )
}
