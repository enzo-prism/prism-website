import { ArrowUpRight, Megaphone, MonitorSmartphone, Clapperboard, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'
import { PRISM_SERVICES, type PrismServiceId } from '@/lib/services'

const ICONS: Record<PrismServiceId, LucideIcon> = {
  website: MonitorSmartphone,
  content: Clapperboard,
  ads: Megaphone,
}

export function WhatPrismBuilds() {
  return (
    <Section aria-labelledby="what-prism-builds-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <SectionHeader
          id="what-prism-builds-title"
          eyebrow="what we build"
          title="what Prism builds."
          description="Websites, content, and ads that help customers find and choose your business."
        />

        <ul className="border-t border-white/[0.08]">
          {PRISM_SERVICES.map((service, index) => {
            const Icon = ICONS[service.id]
            return (
              <Reveal as="li" key={service.id} delay={index * 80} className="border-b border-white/[0.08]">
                <TrackedLink
                  href={service.href}
                  label={service.homeCta}
                  location="about what prism builds"
                  className="group/service flex items-center gap-5 rounded-xl py-6 outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:gap-6 sm:py-7"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-foreground transition-colors group-hover/service:border-white/20 group-hover/service:bg-white/[0.06]">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-heading text-foreground">{service.name.toLowerCase()}</span>
                    <span className="text-pretty text-[15px] leading-6 text-muted-foreground">
                      {service.homeTitle}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-muted-foreground transition-[color,transform] duration-200 group-hover/service:-translate-y-0.5 group-hover/service:translate-x-0.5 group-hover/service:text-foreground"
                  />
                </TrackedLink>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}

export default WhatPrismBuilds
