import type { CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { HOMEPAGE_SERVICES } from '@/components/home/homepage-content'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'
import { PRISM_SERVICES, PRISM_SERVICE_BANDS } from '@/lib/services'
import { cn } from '@/lib/utils'

const LOCATION = 'homepage services'

const FOCUS_RING =
  'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'

/**
 * "what we do": the four services as four rows, each tinted by its own band
 * (DESIGN.md "Service bands"). The same colours mark the hero tiles, the
 * phone menu, and each service page's hero, so a colour always means the
 * same service. The whole row is the tap target: the name's link stretches
 * over it, so the accessible name stays the service name alone.
 */
export default function HomeServices() {
  return (
    <Section
      id="services"
      aria-labelledby="home-services-title"
      className="py-24 sm:py-32"
    >
      <div className="grid gap-5 lg:grid-cols-3 lg:items-end lg:gap-4">
        <Reveal className="lg:col-span-2">
          <SectionHeader
            id="home-services-title"
            eyebrow={HOMEPAGE_SERVICES.eyebrow}
            title={HOMEPAGE_SERVICES.title}
            titleClassName="max-w-none"
          />
        </Reveal>
        <Reveal delay={80}>
          <p className="text-lead max-w-[42ch] text-pretty text-muted-foreground lg:pb-1.5">
            {HOMEPAGE_SERVICES.description}
          </p>
        </Reveal>
      </div>

      <ol className="mt-12 grid gap-3 sm:mt-14">
        {PRISM_SERVICES.map((service, index) => (
          <Reveal as="li" key={service.id} delay={index * 70}>
            <div
              data-home-service-card=""
              data-service-band={service.id}
              style={
                { '--band': PRISM_SERVICE_BANDS[service.id] } as CSSProperties
              }
              className="group/row relative isolate overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] transition-[border-color,scale] duration-(--dur-ui) ease-(--ease-out) focus-within:border-white/[0.16] hover:border-white/[0.16] active:scale-[0.99] motion-reduce:active:scale-100"
            >
              {/* The band's tint, strongest at the edge it comes from. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,color-mix(in_oklch,var(--band)_13%,transparent),transparent_62%)] opacity-70 transition-opacity duration-(--dur-ui) ease-(--ease-out) group-hover/row:opacity-100"
              />
              <span
                aria-hidden="true"
                className="absolute inset-y-4 left-0 w-[3px] origin-center scale-y-[0.72] rounded-r-full bg-(--band) shadow-[0_0_18px_color-mix(in_oklch,var(--band)_55%,transparent)] transition-transform duration-(--dur-sheet) ease-(--ease-drawer) group-hover/row:scale-y-100 motion-reduce:transition-none"
              />

              <div className="grid gap-x-8 gap-y-2 px-5 py-5 sm:px-7 sm:py-6 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)_auto] md:items-center">
                <div className="flex items-center gap-3.5">
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] tracking-[0.14em] text-subtle"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-[1.75rem]">
                    <TrackedLink
                      href={service.href}
                      label={service.name}
                      location={LOCATION}
                      className={cn(
                        'rounded-md after:absolute after:inset-0 after:content-[""]',
                        FOCUS_RING,
                      )}
                    >
                      {service.name}
                    </TrackedLink>
                  </h3>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ml-auto size-5 shrink-0 text-muted-foreground transition-[color,translate] duration-(--dur-ui) ease-(--ease-out) group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-foreground md:hidden"
                  />
                </div>

                <div className="max-w-[62ch]">
                  <p className="text-pretty text-[16px] font-medium leading-snug tracking-[-0.015em] text-foreground/90 sm:text-[17px]">
                    {service.homeTitle}
                  </p>
                  <p className="mt-1 text-pretty text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
                    {service.description}
                  </p>
                </div>

                <span
                  aria-hidden="true"
                  className="hidden size-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted-foreground transition-[background-color,border-color,color] duration-(--dur-ui) ease-(--ease-out) group-hover/row:border-white/20 group-hover/row:bg-white/[0.07] group-hover/row:text-foreground md:grid"
                >
                  <ArrowUpRight className="size-[18px] transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={120}>
        <div className="mt-8 flex justify-center">
          <TrackedLink
            href="/services"
            label={HOMEPAGE_SERVICES.allServices}
            location={LOCATION}
            className={cn(
              'group/all inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[15px] font-medium text-muted-foreground transition-colors duration-(--dur-ui) hover:text-foreground',
              FOCUS_RING,
            )}
          >
            {HOMEPAGE_SERVICES.allServices}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-(--dur-ui) ease-(--ease-out) group-hover/all:translate-x-0.5"
            />
          </TrackedLink>
        </div>
      </Reveal>
    </Section>
  )
}
