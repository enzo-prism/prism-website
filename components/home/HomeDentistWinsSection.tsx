import { BadgeCheck } from 'lucide-react'
import type { ComponentType } from 'react'

import {
  coreRouteContainerClassName,
  coreRouteSectionCompactClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import HomeDentistWinsCarousel from '@/components/home/HomeDentistWinsCarousel'
import HomeReveal from '@/components/home/HomeReveal'
import { HOMEPAGE_CLIENT_WINS } from '@/components/home/homepage-content'

type ClientMetric = {
  value: string
  label: string
  seal?: ComponentType<{ className?: string; strokeWidth?: number }>
}

export default function HomeDentistWinsSection() {
  const { eyebrow, title, slides } = HOMEPAGE_CLIENT_WINS
  const clientCount = slides.length
  const cityCount = new Set(slides.map((slide) => slide.location)).size

  const metrics: ClientMetric[] = [
    { value: String(clientCount), label: 'Client stories' },
    { value: String(cityCount), label: 'Markets' },
    { value: '', label: 'Verified', seal: BadgeCheck },
  ]

  return (
    <section className={coreRouteSectionCompactClassName}>
      <div className={coreRouteContainerClassName}>
        <div className="flex flex-col gap-10 sm:gap-12">
          <HomeReveal className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="flex max-w-xl flex-col gap-4">
              <span className="inline-flex items-center gap-2.5 self-start font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#8a8175]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d8bc79]/70 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d8bc79]" />
                </span>
                {eyebrow}
              </span>

              <h2 className="font-sans text-[2rem] font-medium leading-[1.02] tracking-[-0.045em] text-[#f5f0e8] sm:text-[2.35rem] lg:text-[2.6rem]">
                {title}
              </h2>
            </div>

            <dl className="flex items-end gap-7 sm:gap-9 lg:shrink-0">
              {metrics.map((metric, index) => {
                const Seal = metric.seal

                return (
                  <div
                    key={metric.label}
                    className="flex items-end gap-7 sm:gap-9"
                  >
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className="h-12 w-px self-stretch bg-gradient-to-b from-transparent via-white/15 to-transparent"
                      />
                    ) : null}
                    <div className="flex flex-col-reverse gap-2.5">
                      <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[#8a8175]">
                        {metric.label}
                      </dt>
                      <dd className="flex h-9 items-end leading-none sm:h-11">
                        {Seal ? (
                          <Seal
                            aria-hidden="true"
                            className="h-9 w-9 text-[#d8bc79] sm:h-10 sm:w-10"
                            strokeWidth={1.4}
                          />
                        ) : (
                          <span className="font-sans text-[2.4rem] font-medium leading-none tracking-[-0.04em] text-[#f5f0e8] tabular-nums sm:text-[2.85rem]">
                            {metric.value}
                          </span>
                        )}
                      </dd>
                    </div>
                  </div>
                )
              })}
            </dl>
          </HomeReveal>

          <HomeReveal delay={120}>
            <HomeDentistWinsCarousel slides={slides} />
          </HomeReveal>
        </div>
      </div>
    </section>
  )
}
