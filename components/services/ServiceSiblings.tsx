import Link from 'next/link'
import {
  ArrowUpRight,
  Camera,
  LayoutTemplate,
  Megaphone,
  MessageSquareQuote,
  type LucideIcon,
} from 'lucide-react'

import BrandLogo, { type BrandLogoKey } from '@/components/brand-logo'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import { SpotlightCard } from '@/components/prism/spotlight-card'
import {
  PRISM_SERVICES,
  toServiceCardTitle,
  type PrismServiceId,
} from '@/lib/services'

const SERVICE_ICONS: Record<PrismServiceId, LucideIcon> = {
  website: LayoutTemplate,
  content: Camera,
  ads: Megaphone,
  aeo: MessageSquareQuote,
}

// Navigation-style labels ("Websites", as in the header's Services menu).
const SERVICE_LABELS: Record<PrismServiceId, string> = {
  website: 'Websites',
  content: 'Content',
  ads: 'Ads',
  aeo: 'AEO',
}

// The real channels each service runs on, shown as a quiet logo row.
const SERVICE_MARKS: Record<
  PrismServiceId,
  readonly { brand: BrandLogoKey; label: string }[]
> = {
  website: [
    { brand: 'google', label: 'Google Search' },
    { brand: 'googleMaps', label: 'Google Maps' },
    { brand: 'openai', label: 'ChatGPT' },
    { brand: 'googleAnalytics', label: 'Google Analytics' },
  ],
  content: [
    { brand: 'youtube', label: 'YouTube' },
    { brand: 'instagram', label: 'Instagram' },
    { brand: 'tiktok', label: 'TikTok' },
    { brand: 'linkedin', label: 'LinkedIn' },
  ],
  ads: [
    { brand: 'google', label: 'Google' },
    { brand: 'meta', label: 'Meta' },
    { brand: 'tiktok', label: 'TikTok' },
    { brand: 'yelp', label: 'Yelp' },
  ],
  aeo: [
    { brand: 'openai', label: 'ChatGPT' },
    { brand: 'gemini', label: 'Gemini' },
    { brand: 'claude', label: 'Claude' },
    { brand: 'perplexity', label: 'Perplexity' },
  ],
}

/**
 * Cross-links at the end of each service page: the three other Prism
 * services as large "also from Prism" cards. The current service is left out.
 */
export function ServiceSiblings({ current }: { current: PrismServiceId }) {
  const siblings = PRISM_SERVICES.filter((service) => service.id !== current)

  return (
    <Section aria-labelledby="service-siblings-title" className="pb-8 sm:pb-12">
      <Reveal>
        <SectionHeader
          id="service-siblings-title"
          eyebrow="Prism services"
          title="also from Prism."
          description="Websites, content, ads, and AEO. One team, so each one makes the others work harder."
        />
      </Reveal>
      {/* Three siblings: a row of three on desktop; on tablets the last card
          spans both columns so the grid never strands one. */}
      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {siblings.map((service, index) => {
          const Icon = SERVICE_ICONS[service.id]
          return (
            <Reveal
              as="li"
              key={service.id}
              delay={index * 80}
              className="flex md:max-lg:last:odd:col-span-2"
            >
              <SpotlightCard className="group/sibling relative flex w-full flex-col transition-transform duration-300 hover:-translate-y-0.5">
                <div className="flex flex-1 flex-col gap-4 p-7 sm:p-9">
                  <div className="flex items-center justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground">
                      <Icon
                        aria-hidden="true"
                        className="size-5"
                        strokeWidth={1.6}
                      />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-subtle transition-[color,transform] duration-200 group-hover/sibling:-translate-y-0.5 group-hover/sibling:translate-x-0.5 group-hover/sibling:text-foreground"
                    />
                  </div>
                  <p className="text-eyebrow mt-6 text-subtle">
                    {SERVICE_LABELS[service.id]}
                  </p>
                  <h3 className="text-heading text-foreground">
                    <Link
                      href={service.href}
                      className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-hidden focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50"
                    >
                      {toServiceCardTitle(service.homeTitle)}
                    </Link>
                  </h3>
                  <p className="max-w-[48ch] text-pretty text-[15px] leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/90">
                      {service.homeCta}
                    </span>
                    <span aria-hidden="true" className="flex -space-x-1.5">
                      {SERVICE_MARKS[service.id].map((mark) => (
                        <span
                          key={mark.label}
                          className="grid size-9 place-items-center rounded-full border border-white/10 bg-popover"
                        >
                          <BrandLogo
                            brand={mark.brand}
                            theme="dark"
                            decorative
                            className="size-4"
                          />
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}

export default ServiceSiblings
