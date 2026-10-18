import type { Metadata } from 'next'
import { HandCoins, MessageSquareText, UserPlus } from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ReferralForm from '@/components/forms/ReferralForm'
import { Eyebrow, Section } from '@/components/prism/section'
import { WebPageSchema } from '@/components/schema-markup'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Refer a friend to Prism'
const PAGE_DESCRIPTION =
  'Refer a friend to Prism and get $100 when they become a client for Websites, Content, Ads, or AEO.'
const CANONICAL_URL = 'https://www.design-prism.com/refer'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: '/refer',
  ogImage: '/prism-opengraph.png',
})

const STEPS = [
  {
    label: 'Tell us',
    detail: "Share your friend's name and the best way to reach them.",
    icon: UserPlus,
  },
  {
    label: 'We reach out',
    detail:
      'We introduce ourselves, learn what they need, and take it from there.',
    icon: MessageSquareText,
  },
  {
    label: 'You get $100',
    detail: 'The day they become a paying client, we send you $100.',
    icon: HandCoins,
  },
] as const

export default function ReferPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section
          aria-labelledby="refer-hero-title"
          className="relative isolate overflow-x-clip pb-16 pt-12 sm:pb-24 sm:pt-20"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-x-0 top-0 h-[640px] opacity-50" />
            <div className="absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(40%_50%_at_25%_35%,oklch(0.76_0.17_145/12%),transparent_70%),radial-gradient(36%_46%_at_75%_40%,oklch(0.66_0.16_258/18%),transparent_70%)] blur-2xl" />
            <div className="bg-noise absolute inset-0 opacity-[0.05]" />
          </div>

          <div className="prism-container">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Eyebrow>Referrals</Eyebrow>
                <h1
                  id="refer-hero-title"
                  className="text-gradient mt-5 max-w-[13ch] text-balance pb-2 text-[clamp(2.6rem,1.5rem+4vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.055em]"
                >
                  a friend who becomes a client. $100.
                </h1>
                <p className="text-lead mt-6 max-w-[46ch] text-pretty text-muted-foreground">
                  Tell us about someone who could use Prism. If they become a
                  client for Websites, Content, Ads, or AEO, we send you $100.
                  Every time.
                </p>

                <ol aria-label="How it works" className="mt-10 grid gap-3">
                  {STEPS.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <li
                        key={step.label}
                        className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-card/70 p-4 sm:p-5"
                      >
                        <span
                          aria-hidden="true"
                          className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-foreground"
                        >
                          <Icon className="size-[18px]" strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-baseline gap-2.5">
                            <span className="font-mono text-[11px] tabular-nums text-subtle">
                              0{index + 1}
                            </span>
                            <span className="text-[1rem] font-medium tracking-[-0.015em] text-foreground">
                              {step.label}
                            </span>
                          </span>
                          <span className="mt-1 block text-pretty text-[0.95rem] leading-6 text-muted-foreground">
                            {step.detail}
                          </span>
                        </span>
                      </li>
                    )
                  })}
                </ol>
              </div>

              <section id="send-referral" aria-labelledby="send-referral-title" className="scroll-mt-28">
                <div className="mb-6">
                  <h2
                    id="send-referral-title"
                    className="text-heading text-foreground"
                  >
                    make the introduction.
                  </h2>
                  <p className="mt-2 text-[0.98rem] leading-7 text-muted-foreground">
                    Two minutes. We handle the rest and keep you posted.
                  </p>
                </div>
                <ReferralForm />
              </section>
            </div>
          </div>
        </section>

        <Section
          aria-labelledby="refer-details-title"
          className="pt-0 sm:pt-0"
        >
          <div className="grid gap-8 border-t border-white/[0.08] pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 sm:pt-16">
            <div>
              <Eyebrow>Program details</Eyebrow>
              <h2
                id="refer-details-title"
                className="text-heading mt-4 text-foreground"
              >
                when and how do I get paid?
              </h2>
            </div>
            <div className="max-w-[60ch]">
              <p className="text-pretty text-[1rem] leading-7 text-muted-foreground">
                We confirm by email once your friend makes their first payment,
                then send $100 the way that works for you, usually within a
                few days.
              </p>
              <p className="mt-6 rounded-2xl border border-white/[0.08] bg-card px-5 py-4 text-pretty text-[0.85rem] leading-6 text-subtle">
                $100 is a referral payout, not service pricing. It is paid
                after the referred business becomes a paying Prism client for
                Websites, Content, Ads, or AEO.
                Self-referrals don&apos;t count. No cap. Every referral that
                closes pays $100.
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </div>
  )
}
