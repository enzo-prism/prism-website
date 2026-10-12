import { ArrowUpRight } from 'lucide-react'

import { BrowserFrame } from '@/components/prism/browser-frame'
import { Marquee } from '@/components/prism/marquee'
import { Reveal } from '@/components/prism/reveal'
import { Section, SectionHeader } from '@/components/prism/section'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import {
  getClientSites,
  type ClientSite,
} from '@/components/services/client-sites'

const TOP_ROW = getClientSites([
  'dr-christopher-wong',
  'canary-cove',
  'sacramento-dental-medicine',
  'belize-kids-foundation',
  'exquisite-dentistry',
  'rebellious-aging',
])

const BOTTOM_ROW = getClientSites([
  'waikiki-dental',
  'coast-periodontics-and-laser-surgery',
  'olympic-bootworks',
  'michael-njo-dds',
  'family-first-smile-care',
  'we-are-saplings',
])

function SiteCard({ site }: { site: ClientSite }) {
  return (
    <div className="w-[280px] shrink-0 sm:w-[400px]">
      <BrowserFrame
        src={site.desktop}
        alt={`${site.client} website built by Prism`}
        url={site.host}
        sizes="(min-width: 640px) 400px, 280px"
      />
      <p className="mt-3 flex items-baseline justify-between gap-3 px-1 text-sm">
        <span className="truncate font-medium text-foreground">
          {site.client}
        </span>
        <span className="shrink-0 text-xs text-subtle">{site.location}</span>
      </p>
    </div>
  )
}

/**
 * /websites "#work": two full-bleed rails of live client sites drifting in
 * opposite directions. Rails are decorative motion; the case-study index is
 * the one interactive exit.
 */
export function WebsitesWorkRail() {
  return (
    <Section
      id="work"
      bleed
      aria-labelledby="websites-work-title"
      className="scroll-mt-20 overflow-x-clip"
    >
      <div className="prism-container">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="websites-work-title"
            eyebrow="The work"
            title="live sites, built by Prism."
            description="Practices, retailers, nonprofits, and service businesses. Every site here is a current client, live right now."
          />
          <Button
            asChild
            variant="outline"
            size="lg"
            className="shrink-0 self-start md:self-auto"
          >
            <TrackedLink
              href="/case-studies"
              label="browse case studies"
              location="websites work"
            >
              Browse case studies
              <ArrowUpRight aria-hidden="true" />
            </TrackedLink>
          </Button>
        </Reveal>
      </div>

      <div className="mt-14 flex flex-col gap-8 sm:mt-16">
        <Marquee
          duration={70}
          gap="1.25rem"
          label="Client websites built by Prism"
        >
          {TOP_ROW.map((site) => (
            <SiteCard key={site.slug} site={site} />
          ))}
        </Marquee>
        <Marquee duration={80} gap="1.25rem" reverse>
          {BOTTOM_ROW.map((site) => (
            <SiteCard key={site.slug} site={site} />
          ))}
        </Marquee>
      </div>
    </Section>
  )
}

export default WebsitesWorkRail
