import type { Metadata } from 'next'
import Image from 'next/image'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Gift,
  Mail,
  Sparkles,
} from 'lucide-react'

import HomeCountUp from '@/components/home/HomeCountUp'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import LeadSuccessTracker from '@/components/thank-you/LeadSuccessTracker'
import TrackedAnchor from '@/components/tracked-anchor'
import TrackedLink from '@/components/tracked-link'
import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import WaitlistIntakeStrip from '@/components/waitlist/WaitlistIntakeStrip'
import WaitlistNextSteps, {
  type WaitlistNextStep,
} from '@/components/waitlist/WaitlistNextSteps'
import {
  getWaitlistProofImage,
  WAITLIST_PROOF_SITES,
} from '@/components/waitlist/waitlist-proof-sites'
import { WAITLIST_SOCIAL_CHANNELS } from '@/components/waitlist/waitlist-social-channels'
import { isClientQuote, quotesData } from '@/content/wall-of-love-data'
import { PROOF_METRICS_VERIFIED_AT, SOCIAL_PROOF } from '@/lib/proof-metrics'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { cn } from '@/lib/utils'
import { CAPACITY_MESSAGE, WAITLIST_THANK_YOU_PATH } from '@/lib/waitlist'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'You are on the waitlist',
  description:
    'Your Prism waitlist application is in. We review every application for the next intake and reach out by email.',
  path: WAITLIST_THANK_YOU_PATH,
  index: false,
})

const NEXT_STEPS: readonly WaitlistNextStep[] = [
  {
    icon: Check,
    done: true,
    title: 'Application received.',
    body: 'Nothing else is needed from you right now.',
  },
  {
    icon: Sparkles,
    title: (
      <>
        In line for the <WaitlistIntakeMonth /> intake.
      </>
    ),
    body: 'We review every application and reach out to the teams we accept.',
  },
  {
    icon: Mail,
    title: 'We reach out by email.',
    body: 'If we can take on your team, we email you to scope the work together.',
  },
]

// Three real current-client sites for the "see the work" card.
const WORK_PREVIEW = WAITLIST_PROOF_SITES.slice(0, 3)

// One named website-client quote for the wall of love card (never an
// Instagram comment, never a quote that still needs consent).
const CLIENT_QUOTE_ID = 3
const clientQuote = quotesData.find(
  (quote) =>
    quote.id === CLIENT_QUOTE_ID && isClientQuote(quote) && !quote.requiresConsent,
)

const cardClassName =
  'relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-card p-6 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:p-7'

const linkCardClassName = cn(
  cardClassName,
  'group/card min-h-[19rem] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/[0.16] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
)

const cornerArrowClassName =
  'size-5 shrink-0 text-muted-foreground transition-[transform,color] duration-200 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-foreground motion-reduce:transition-none'

const channelList = new Intl.ListFormat('en-US', {
  style: 'long',
  type: 'conjunction',
}).format(WAITLIST_SOCIAL_CHANNELS.map((channel) => channel.platform))

export default function WaitlistThankYouPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Navbar />
      <main
        className="relative isolate flex flex-1 flex-col overflow-x-clip"
        id="main-content"
        tabIndex={-1}
      >
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-6rem] -z-10 h-[560px] w-[960px] max-w-[160vw] -translate-x-1/2 bg-[radial-gradient(40%_50%_at_30%_45%,oklch(0.66_0.21_29/16%),transparent_70%),radial-gradient(40%_50%_at_50%_40%,oklch(0.86_0.15_90/10%),transparent_70%),radial-gradient(40%_50%_at_70%_45%,oklch(0.66_0.16_258/20%),transparent_70%)] blur-2xl"
        />

        <div className="prism-container pb-24 pt-14 sm:pb-32 sm:pt-20">
          <header className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <span className="prism-beam prism-rise grid size-16 place-items-center rounded-2xl border border-white/10 bg-card shadow-[0_1px_0_0_oklch(1_0_0/8%)_inset,0_20px_60px_-20px_oklch(0.66_0.16_258/45%)] [--rise-delay:40ms]">
              <Check aria-hidden="true" className="size-7 text-foreground" strokeWidth={2.5} />
            </span>
            <h1 className="text-display text-gradient prism-rise mt-8 max-w-[12ch] text-balance pb-2 [--rise-delay:120ms]">
              you&rsquo;re on the list.
            </h1>
            <p className="text-lead prism-rise mt-5 max-w-[34rem] text-pretty text-muted-foreground [--rise-delay:200ms]">
              Thanks for applying. Here is what happens next.
            </p>
            <div className="prism-rise mt-10 w-full max-w-xl [--rise-delay:280ms]">
              <WaitlistIntakeStrip />
              <p className="mt-3 text-pretty text-[13px] leading-5 text-subtle">
                {CAPACITY_MESSAGE.intakeTail}
              </p>
            </div>
          </header>

          <section aria-labelledby="thank-you-next-heading" className="mt-16 sm:mt-20">
            <h2 id="thank-you-next-heading" className="sr-only">
              What happens next
            </h2>
            <WaitlistNextSteps steps={NEXT_STEPS} layout="cards" />
          </section>

          <section aria-labelledby="thank-you-wait-heading" className="mt-20 sm:mt-28">
            <div className="flex flex-col items-start gap-3">
              <p className="inline-flex items-center gap-2.5 text-eyebrow text-subtle">
                <span aria-hidden="true" className="h-px w-5 bg-spectrum" />
                While you wait
              </p>
              <h2
                id="thank-you-wait-heading"
                className="text-title text-gradient max-w-[18ch] text-balance pb-1"
              >
                stay close.
              </h2>
            </div>

            {/* Bento: the two new actions first (follow, refer), then the
                proof. Rows alternate 7/5 and 5/7 on desktop. */}
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-12">
              <div
                data-waitlist-follow=""
                className={cn(cardClassName, '@container lg:col-span-7')}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 -z-10 h-2/3 bg-[radial-gradient(55%_70%_at_15%_0%,oklch(0.66_0.21_29/12%),transparent_70%),radial-gradient(45%_60%_at_60%_0%,oklch(0.63_0.19_295/10%),transparent_70%)]"
                />
                <h3 className="text-heading text-foreground">follow along.</h3>
                <p className="mt-2 max-w-[32rem] text-pretty text-[15px] leading-6 text-muted-foreground">
                  Join{' '}
                  <span className="text-foreground">
                    {SOCIAL_PROOF.combinedAudience}
                  </span>{' '}
                  followers across {channelList}.
                </p>
                <ul className="mt-6 grid gap-2.5 @lg:grid-cols-3">
                  {WAITLIST_SOCIAL_CHANNELS.map((channel) => (
                    <li key={channel.id} className="min-w-0">
                      <TrackedAnchor
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        label={`follow prism on ${channel.platform.toLowerCase()}`}
                        location="waitlist thank you"
                        className="group/channel flex h-full min-h-16 items-center gap-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.04] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50 motion-reduce:transition-none motion-reduce:hover:translate-y-0 @lg:flex-col @lg:items-start @lg:gap-0 @lg:p-4"
                      >
                        <span className="flex shrink-0 items-center justify-between @lg:w-full">
                          <span
                            aria-hidden="true"
                            className="grid size-10 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-foreground"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="size-[18px]"
                              fill="currentColor"
                              aria-hidden="true"
                              focusable="false"
                            >
                              <path d={channel.icon} />
                            </svg>
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="hidden size-4 text-muted-foreground transition-[transform,color] duration-200 group-hover/channel:-translate-y-0.5 group-hover/channel:translate-x-0.5 group-hover/channel:text-foreground motion-reduce:transition-none @lg:block"
                          />
                        </span>
                        <span className="min-w-0 flex-1 @lg:mt-6">
                          <span className="block text-[15px] font-medium leading-6 tracking-[-0.01em] text-foreground">
                            {channel.platform}
                          </span>
                          <span className="block truncate text-[13px] leading-5 text-muted-foreground">
                            {channel.handle}
                          </span>
                        </span>
                        <span className="shrink-0 text-right @lg:mt-4 @lg:text-left">
                          <span className="block text-[1.375rem] font-semibold leading-none tracking-[-0.04em] text-foreground @lg:text-[1.75rem]">
                            <HomeCountUp value={channel.audience} />
                          </span>
                          <span className="mt-1 block text-[12px] leading-4 text-muted-foreground">
                            {channel.audienceLabel}
                          </span>
                        </span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </TrackedAnchor>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-5 font-mono text-[11px] leading-4 text-subtle">
                  Audience verified {PROOF_METRICS_VERIFIED_AT}
                </p>
              </div>

              <TrackedLink
                href="/refer"
                label="refer a friend"
                location="waitlist thank you"
                data-waitlist-refer=""
                className={cn(linkCardClassName, 'lg:col-span-5')}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 -z-10 h-3/4 bg-[radial-gradient(60%_70%_at_85%_100%,oklch(0.86_0.15_90/12%),transparent_70%),radial-gradient(55%_60%_at_25%_100%,oklch(0.72_0.17_150/10%),transparent_70%)]"
                />
                <span className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-foreground"
                  >
                    <Gift className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <ArrowUpRight aria-hidden="true" className={cornerArrowClassName} />
                </span>
                <span className="text-heading mt-6 block max-w-[16ch] text-balance text-foreground">
                  know someone who needs this?
                </span>
                <span className="mt-2 block text-pretty text-[15px] leading-6 text-muted-foreground">
                  Send them our way.
                </span>
                <span className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <span>
                    <span className="text-gradient block text-[3.25rem] font-semibold leading-[0.95] tracking-[-0.05em] sm:text-[4rem]">
                      $100
                    </span>
                    <span className="mt-2 block text-[13px] leading-5 text-muted-foreground">
                      when they become a client
                    </span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 pb-0.5 text-[15px] font-medium text-foreground">
                    Refer a friend
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-200 group-hover/card:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </span>
                </span>
              </TrackedLink>

              <TrackedLink
                href="/case-studies"
                label="see the work"
                location="waitlist thank you"
                className={cn(linkCardClassName, 'lg:col-span-5')}
              >
                <span className="flex items-start justify-between gap-4 pb-8">
                  <span>
                    <span className="text-heading block text-foreground">
                      the work.
                    </span>
                    <span className="mt-2 block text-pretty text-[15px] leading-6 text-muted-foreground">
                      Real client websites, live and measured.
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className={cornerArrowClassName} />
                </span>
                <span
                  aria-hidden="true"
                  className="relative -mx-6 -mb-6 mt-auto block h-36 sm:-mx-7 sm:-mb-7 sm:h-44"
                >
                  {WORK_PREVIEW.map((site, index) => {
                    // Fan of three real sites bleeding off the card edge, the
                    // middle one in front.
                    const isFront = index === 1
                    return (
                      <span
                        key={site.slug}
                        className={cn(
                          'absolute block w-[56%] overflow-hidden rounded-lg border border-white/10 bg-popover shadow-[0_24px_48px_-16px_oklch(0_0_0/95%)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
                          isFront
                            ? 'left-1/2 top-0 z-20 -translate-x-1/2 group-hover/card:-translate-y-1.5'
                            : index === 0
                              ? 'left-[6%] top-7 z-10 opacity-80 group-hover/card:-translate-x-1'
                              : 'right-[6%] top-7 z-10 opacity-80 group-hover/card:translate-x-1',
                        )}
                      >
                        <Image
                          src={getWaitlistProofImage(site.slug)}
                          alt=""
                          width={480}
                          height={300}
                          sizes="(min-width: 768px) 20rem, 56vw"
                          className="block aspect-[16/10] h-auto w-full object-cover object-top"
                        />
                      </span>
                    )
                  })}
                </span>
              </TrackedLink>

              <TrackedLink
                href="/wall-of-love"
                label="see why clients love prism"
                location="waitlist thank you"
                className={cn(linkCardClassName, 'lg:col-span-7')}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(60%_70%_at_80%_100%,oklch(0.63_0.19_295/16%),transparent_70%),radial-gradient(50%_60%_at_20%_100%,oklch(0.66_0.16_258/14%),transparent_70%)]"
                />
                <span className="flex items-start justify-between gap-4">
                  <span>
                    <span className="text-heading block text-foreground">
                      the wall of love.
                    </span>
                    <span className="mt-2 block text-pretty text-[15px] leading-6 text-muted-foreground">
                      See why clients love Prism, in their own words.
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className={cornerArrowClassName} />
                </span>
                {clientQuote ? (
                  <span className="mt-auto block pt-8">
                    <span className="block rounded-xl border border-white/[0.08] bg-background/60 p-5 backdrop-blur-sm">
                      <span className="block text-pretty text-lg leading-7 tracking-[-0.01em] text-foreground">
                        &ldquo;{clientQuote.text}&rdquo;
                      </span>
                      <span className="mt-3 block text-[13px] text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {clientQuote.client}
                        </span>
                        <span aria-hidden="true" className="px-1.5 text-subtle">
                          ·
                        </span>
                        Website client
                      </span>
                    </span>
                  </span>
                ) : null}
              </TrackedLink>
            </div>
          </section>

          <p className="mt-14 flex justify-center">
            <TrackedLink
              href="/"
              label="back to home"
              location="waitlist thank you"
              className="group/home inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-[15px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover/home:-translate-x-0.5 motion-reduce:transition-none"
              />
              Back to home
            </TrackedLink>
          </p>
        </div>
      </main>
      <Footer showWaitlistCta={false} />
      <LeadSuccessTracker />
    </div>
  )
}
