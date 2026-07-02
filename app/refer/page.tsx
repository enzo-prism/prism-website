import type { Metadata } from 'next'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ReferralForm from '@/components/forms/ReferralForm'
import { WebPageSchema } from '@/components/schema-markup'
import { buildRouteMetadata } from '@/lib/seo/metadata'

const PAGE_TITLE = 'Refer a friend to Prism'
const PAGE_DESCRIPTION =
  'Refer a friend to Prism and get $100 when they become a client — website, Content OS, Dental OS, or Prism Infinity.'
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
  },
  {
    label: 'We reach out',
    detail:
      'We introduce ourselves, learn what they need, and take it from there.',
  },
  {
    label: 'You get $100',
    detail: 'The day they become a paying client, we send you $100.',
  },
] as const

export default function ReferPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <header>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.26em] text-[#8f877b]">
                Referrals
              </p>
              <h1 className="mt-4 max-w-[16ch] text-balance font-sans text-[clamp(2.05rem,4.8vw,3.65rem)] font-medium leading-[1] tracking-[-0.05em] text-[#f5f0e8]">
                A friend who becomes a client. $100.
              </h1>
              <p className="mt-5 max-w-[44rem] text-pretty font-sans text-[1.05rem] leading-7 text-[#b8afa2]">
                Tell us about someone who could use Prism. If they become a
                client — the $300 website, Content OS, Dental OS, or Prism
                Infinity — we send you $100. Every time.
              </p>
            </header>

            <section
              aria-label="How it works"
              className="mt-14 border-y border-white/12"
            >
              <ol className="divide-y divide-white/12">
                {STEPS.map((step, index) => (
                  <li
                    key={step.label}
                    className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <span className="flex shrink-0 items-baseline gap-3 sm:w-48">
                      <span className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-[#7d766a] tabular-nums">
                        0{index + 1}
                      </span>
                      <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#d8bc79]">
                        {step.label}
                      </span>
                    </span>
                    <p className="text-pretty font-sans text-[0.98rem] leading-7 text-[#b8afa2]">
                      {step.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-label="Send a referral" className="mt-14">
              <h2 className="font-sans text-[1.7rem] font-medium leading-tight tracking-[-0.03em] text-[#f5f0e8]">
                Make the introduction
              </h2>
              <p className="mt-3 font-sans text-[0.98rem] leading-7 text-[#8f877b]">
                Two minutes. We handle the rest and keep you posted.
              </p>

              <div className="mt-7">
                <ReferralForm />
              </div>
            </section>

            <section
              aria-label="Program details"
              className="mt-14 border-t border-white/12 pt-8"
            >
              <h2 className="font-sans text-[1.15rem] font-medium leading-snug tracking-[-0.02em] text-[#f5f0e8]">
                When and how do I get paid?
              </h2>
              <p className="mt-3 max-w-[44rem] text-pretty font-sans text-[0.95rem] leading-7 text-[#b8afa2]">
                We confirm by email once your friend makes their first payment,
                then send $100 the way that works for you — usually within a
                few days.
              </p>

              <p className="mt-8 max-w-[44rem] text-pretty font-mono text-[0.72rem] leading-6 text-[#8f877b]">
                $100 is a referral payout, not service pricing. It is paid
                after the referred business becomes a paying Prism client —
                website, Content OS, Dental OS, or Prism Infinity.
                Self-referrals don&apos;t count. No cap — every referral that
                closes pays $100.
              </p>
            </section>
          </div>
        </div>
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
