import { ArrowUpRight, BadgeCheck } from 'lucide-react'

import {
  coreRouteContainerClassName,
  coreRouteSectionCompactClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import HomeClientCoverFlowLazy from '@/components/home/HomeClientCoverFlowLazy'
import HomeReveal from '@/components/home/HomeReveal'
import { HOMEPAGE_CLIENT_WINS } from '@/components/home/homepage-content'
import TrackedLink from '@/components/tracked-link'

export default function HomeDentistWinsSection() {
  const { title, slides } = HOMEPAGE_CLIENT_WINS
  const clientCount = slides.length
  const marketCount = new Set(slides.map((slide) => slide.location)).size

  return (
    <section className={coreRouteSectionCompactClassName}>
      <div className={coreRouteContainerClassName}>
        <div className="flex flex-col gap-10 sm:gap-12">
          <HomeReveal className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <h2 className="max-w-xl font-sans text-[2rem] font-medium leading-[1.02] tracking-[-0.045em] text-[#f5f0e8] sm:text-[2.35rem] lg:text-[2.6rem]">
              {title}
            </h2>

            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#8f877b] lg:shrink-0 lg:pb-1">
              <span className="whitespace-nowrap">
                <span className="text-[#f5f0e8] tabular-nums">
                  {clientCount}
                </span>{' '}
                client stories
              </span>
              <span aria-hidden="true" className="text-white/20">
                ·
              </span>
              <span className="whitespace-nowrap">
                <span className="text-[#f5f0e8] tabular-nums">
                  {marketCount}
                </span>{' '}
                markets
              </span>
              <span aria-hidden="true" className="text-white/20">
                ·
              </span>
              <TrackedLink
                href="/case-studies"
                label="verified case studies"
                location="homepage client wins header"
                className="group inline-flex items-center gap-1.5 whitespace-nowrap text-[#8f877b] transition-colors duration-500 hover:text-[#f5f0e8] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#d8bc79]/35 focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-reduce:transition-none"
              >
                <BadgeCheck
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-[#d8bc79]"
                  strokeWidth={1.8}
                />
                Verified case studies
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </TrackedLink>
            </p>
          </HomeReveal>

          <HomeReveal delay={120}>
            <HomeClientCoverFlowLazy slides={slides} />
          </HomeReveal>
        </div>
      </div>
    </section>
  )
}
