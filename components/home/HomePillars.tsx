import type { ComponentType } from 'react'
import {
  ArrowRight,
  Camera,
  Check,
  LayoutTemplate,
  Megaphone,
  MessageSquareQuote,
} from 'lucide-react'

import { HOMEPAGE_SERVICES } from '@/components/home/homepage-content'
import {
  ConvertVisual,
  SeenVisual,
  ShineVisual,
} from '@/components/home/pillars/pillar-visuals'
import styles from '@/components/home/pillars/pillars.module.css'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import TrackedLink from '@/components/tracked-link'
import { NAV_SERVICE_ITEMS } from '@/lib/constants'
import type { NavServiceItem } from '@/lib/constants'
import { cn } from '@/lib/utils'

const LOCATION = 'homepage services'

type PillarKey = (typeof HOMEPAGE_SERVICES.pillars)[number]['key']

const VISUALS: Record<PillarKey, ComponentType<{ className?: string }>> = {
  shine: ShineVisual,
  convert: ConvertVisual,
  reach: SeenVisual,
}

const SERVICE_ICONS: Record<NavServiceItem['icon'], typeof LayoutTemplate> = {
  website: LayoutTemplate,
  content: Camera,
  ads: Megaphone,
  aeo: MessageSquareQuote,
}

const FOCUS_RING =
  'outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50'

/* Tablet lays each card out side by side: the visual fills the left column
   and every text row sits in the right one. */
const TEXT_COL = 'md:max-lg:col-start-2'
const GUTTER = 'px-6 sm:px-7'

const PILL =
  'group/pill inline-flex h-10 w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] pl-1.5 pr-4 text-sm transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-foreground'
const PILL_ICON =
  'grid size-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-foreground/90 transition-colors group-hover/pill:border-white/20'

/**
 * "shine. convert. get seen." Three pillars, each opening on a live micro
 * scene (pillars/pillar-visuals.tsx). On desktop the cards share a subgrid,
 * so titles, copy, lists, and links line up across all three.
 */
export default function HomePillars() {
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
          <p className="text-lead max-w-[58ch] text-pretty text-muted-foreground lg:pb-1.5">
            {HOMEPAGE_SERVICES.description}
          </p>
        </Reveal>
      </div>

      <ol className="mt-14 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:gap-y-0">
        {HOMEPAGE_SERVICES.pillars.map((pillar, index) => {
          const Visual = VISUALS[pillar.key]
          return (
            <Reveal
              as="li"
              key={pillar.key}
              delay={index * 90}
              className="lg:row-span-5 lg:grid lg:grid-rows-subgrid"
            >
              <SpotlightCard
                data-home-service-card=""
                className={cn(
                  styles.card,
                  'flex h-full flex-col md:max-lg:grid md:max-lg:grid-cols-2 md:max-lg:grid-rows-[auto_auto_auto_1fr] lg:row-span-5 lg:grid lg:grid-rows-subgrid',
                )}
              >
                <Visual className="m-2 md:max-lg:row-span-4" />

                <div className={cn(GUTTER, TEXT_COL, 'pt-5 md:max-lg:pt-7')}>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] tracking-[0.14em] text-subtle"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-gradient mt-3 pb-1 text-[clamp(2.5rem,1.9rem+1.3vw,3.15rem)] font-semibold leading-[0.95] tracking-[-0.055em]">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-pretty text-[17px] font-medium leading-snug tracking-[-0.015em] text-foreground">
                    {pillar.lead}
                  </p>
                </div>

                <p
                  className={cn(
                    GUTTER,
                    TEXT_COL,
                    'max-w-[46ch] pt-2.5 text-pretty text-[15px] leading-relaxed text-muted-foreground',
                  )}
                >
                  {pillar.body}
                </p>

                <ul
                  className={cn(
                    TEXT_COL,
                    'mx-6 mt-6 flex flex-col gap-2.5 border-t border-white/[0.06] pt-5 sm:mx-7',
                  )}
                >
                  {pillar.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-[14px] leading-snug text-foreground/85"
                    >
                      <span
                        aria-hidden="true"
                        className="grid size-5 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04]"
                      >
                        <Check
                          className="size-3 text-foreground/80"
                          strokeWidth={2}
                        />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div
                  className={cn(
                    GUTTER,
                    TEXT_COL,
                    'mt-auto flex flex-wrap items-end gap-x-5 gap-y-1 pb-5 pt-6 sm:pb-6',
                  )}
                >
                  {pillar.links.map((link) => (
                    <TrackedLink
                      key={link.href}
                      href={link.href}
                      label={link.label}
                      location={LOCATION}
                      className={cn(
                        'group/link -mx-1 inline-flex min-h-10 items-center gap-1.5 rounded-md px-1 text-[15px] font-medium text-foreground transition-colors hover:text-foreground/80',
                        FOCUS_RING,
                      )}
                    >
                      {link.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-0.5 group-hover/link:text-foreground"
                      />
                    </TrackedLink>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          )
        })}
      </ol>

      <Reveal delay={120}>
        <div className="mt-10 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center lg:mt-12 lg:gap-3">
          <ul className="contents lg:flex lg:rounded-full lg:border lg:border-white/10 lg:bg-card/70 lg:p-1.5 lg:shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset]">
            {NAV_SERVICE_ITEMS.map((item) => {
              const Icon = SERVICE_ICONS[item.icon]
              return (
                <li key={item.href}>
                  <TrackedLink
                    href={item.href}
                    label={item.label}
                    location={LOCATION}
                    className={cn(
                      PILL,
                      'text-muted-foreground lg:border-transparent lg:bg-transparent lg:hover:border-transparent',
                      FOCUS_RING,
                    )}
                  >
                    <span className={PILL_ICON}>
                      <Icon
                        aria-hidden="true"
                        className="size-3.5"
                        strokeWidth={1.75}
                      />
                    </span>
                    {item.label}
                  </TrackedLink>
                </li>
              )
            })}
          </ul>
          <TrackedLink
            href="/services"
            label="All services"
            location={LOCATION}
            className={cn(
              PILL,
              // Four service pills fill a 2x2 grid on phones; this one spans
              // the row beneath them.
              'col-span-2 justify-between font-medium text-foreground sm:w-auto sm:justify-center sm:gap-1.5 lg:border-transparent lg:bg-transparent lg:px-4 lg:hover:border-transparent lg:hover:bg-transparent lg:hover:text-foreground/80',
              FOCUS_RING,
            )}
          >
            <span className="pl-2.5 sm:pl-2.5 lg:pl-0">All services</span>
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/pill:translate-x-0.5"
            />
          </TrackedLink>
        </div>
      </Reveal>
    </Section>
  )
}
