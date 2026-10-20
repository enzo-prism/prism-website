import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import HomeCountUp from '@/components/home/HomeCountUp'
import { ClientLogo } from '@/components/prism/client-logo'
import { Marquee } from '@/components/prism/marquee'
import TrackedLink from '@/components/tracked-link'
import {
  getWaitlistProofImage,
  WAITLIST_PROOF_SITES,
} from '@/components/waitlist/waitlist-proof-sites'
import { isClientQuote, quotesData } from '@/content/wall-of-love-data'
import { CLIENT_LOGOS } from '@/lib/client-logos'
import {
  CONNECTED_CLIENT_TRAFFIC,
  SOCIAL_PROOF_VERIFIED_AT,
  SOCIAL_PROOF,
  SOCIAL_PROOF_CHANNELS,
} from '@/lib/proof-metrics'
import { cn } from '@/lib/utils'

// One named website-client quote (never an Instagram comment, never a quote
// that still needs consent). Renders nothing if the record changes.
const CLIENT_QUOTE_ID = 1
const clientQuote = quotesData.find(
  (quote) =>
    quote.id === CLIENT_QUOTE_ID && isClientQuote(quote) && !quote.requiresConsent,
)

// A compact wall of standalone logos (marks that need a name beside them
// stay in the wider rails).
const GRID_LOGOS = CLIENT_LOGOS.filter((logo) => logo.file && !logo.withName).slice(0, 8)

const channelList = new Intl.ListFormat('en-US', {
  style: 'long',
  type: 'conjunction',
}).format(SOCIAL_PROOF_CHANNELS.map((channel) => channel.platform))

/**
 * Compact, verified proof for the waitlist page: the audience and
 * client-traffic numbers from `lib/proof-metrics.ts` (the one shared source,
 * with source and date beside each), a rail of real current-client websites,
 * and the path to the wall of love. Never hardcode a proof number here.
 */
export default function WaitlistProofStrip({ className }: { className?: string }) {
  return (
    <section
      data-waitlist-proof="strip"
      aria-labelledby="waitlist-proof-heading"
      className={cn('flex min-w-0 flex-col', className)}
    >
      <h2
        id="waitlist-proof-heading"
        className="inline-flex items-center gap-2.5 text-eyebrow text-subtle"
      >
        <span aria-hidden="true" className="h-px w-5 bg-spectrum" />
        Worth the wait
      </h2>

      <Marquee
        label="Client websites by Prism"
        duration={60}
        gap="0.75rem"
        className="-mx-1 mt-5 px-1 py-1"
      >
        {WAITLIST_PROOF_SITES.map((site) => (
          <figure key={site.slug} className="w-[10.5rem] shrink-0 sm:w-[11.5rem]">
            <div className="overflow-hidden rounded-lg border border-white/10 bg-popover shadow-[0_12px_32px_-18px_oklch(0_0_0/90%)]">
              <Image
                src={getWaitlistProofImage(site.slug)}
                alt={`${site.name} website by Prism`}
                width={368}
                height={230}
                sizes="184px"
                className="block aspect-[16/10] h-auto w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-2 truncate text-[12px] leading-4 text-subtle">
              {site.name}
            </figcaption>
          </figure>
        ))}
      </Marquee>

      <ul className="mt-4 grid grid-cols-2 divide-x divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset]">
        <li className="flex flex-col p-4 sm:p-5">
          <p className="text-pretty text-sm leading-5 text-muted-foreground">
            <span className="mb-2 block text-[1.75rem] font-semibold leading-none tracking-[-0.04em] text-foreground sm:text-[2rem]">
              <HomeCountUp value={SOCIAL_PROOF.combinedAudience} />
            </span>{' '}
            followers across {channelList}
          </p>
          <p className="mt-auto pt-3 font-mono text-[11px] leading-4 text-subtle">
            Verified {SOCIAL_PROOF_VERIFIED_AT}
          </p>
        </li>
        <li className="flex flex-col p-4 sm:p-5">
          <p className="text-pretty text-sm leading-5 text-muted-foreground">
            <span className="mb-2 block text-[1.75rem] font-semibold leading-none tracking-[-0.04em] text-foreground sm:text-[2rem]">
              <HomeCountUp
                value={CONNECTED_CLIENT_TRAFFIC.newUsers.toLocaleString('en-US')}
              />
            </span>{' '}
            new users across {CONNECTED_CLIENT_TRAFFIC.connectedSites} connected
            client sites in {CONNECTED_CLIENT_TRAFFIC.month}
          </p>
          <p className="mt-auto pt-3 font-mono text-[11px] leading-4 text-subtle">
            Source: {CONNECTED_CLIENT_TRAFFIC.source}
          </p>
        </li>
      </ul>

      <ul
        aria-label="Prism clients"
        className="mt-4 grid grid-cols-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-card shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset]"
      >
        {GRID_LOGOS.map((logo, index) => (
          <li
            key={logo.slug}
            className={cn(
              'flex h-[4.5rem] items-center justify-center border-white/[0.06] px-2 text-white/55',
              index % 4 !== 3 && 'border-r',
              index < 4 && 'border-b',
            )}
          >
            <ClientLogo logo={logo} area={2100} maxWidth={104} maxHeight={40} />
          </li>
        ))}
      </ul>

      {clientQuote ? (
        <figure className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-5">
          <blockquote className="text-pretty text-[15px] leading-6 text-foreground">
            <p>&ldquo;{clientQuote.text}&rdquo;</p>
          </blockquote>
          <figcaption className="mt-3 flex items-center gap-2 text-[13px] text-muted-foreground">
            <span
              aria-hidden="true"
              className="grid size-6 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-[11px] font-medium text-foreground"
            >
              {clientQuote.client.charAt(0)}
            </span>
            <span>
              <span className="font-medium text-foreground">{clientQuote.client}</span>
              <span aria-hidden="true" className="px-1.5 text-subtle">
                ·
              </span>
              Website Design client
            </span>
          </figcaption>
        </figure>
      ) : null}

      <TrackedLink
        href="/wall-of-love"
        label="see why clients love prism"
        location="waitlist proof strip"
        className="group/link mt-4 inline-flex min-h-10 w-fit items-center gap-1.5 rounded-sm text-[15px] font-medium text-foreground transition-colors hover:text-foreground/80 focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        See why clients love Prism
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
        />
      </TrackedLink>
    </section>
  )
}
