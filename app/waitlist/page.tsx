import type { Metadata } from 'next'
import { CalendarCheck, Mail, Timer } from 'lucide-react'

import WaitlistForm from '@/components/forms/WaitlistForm'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { WaitlistStatus } from '@/components/prism/waitlist-status'
import { WebPageSchema } from '@/components/schema-markup'
import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import WaitlistNextSteps, {
  type WaitlistNextStep,
} from '@/components/waitlist/WaitlistNextSteps'
import WaitlistProofStrip from '@/components/waitlist/WaitlistProofStrip'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import {
  CAPACITY_MESSAGE,
  parseWaitlistFocus,
  WAITLIST_PATH,
} from '@/lib/waitlist'

const PAGE_TITLE = 'Join the Prism waitlist'
// Metadata is static, so it never names a month ("next intake"). The rendered
// page below names the live intake month instead.
const PAGE_DESCRIPTION =
  'Prism is fully booked. Join the waitlist for our next monthly intake. We review every application for websites, content, ads, and AEO.'
const CANONICAL_URL = `https://www.design-prism.com${WAITLIST_PATH}`

export const metadata: Metadata = buildRouteMetadata({
  titleStem: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: WAITLIST_PATH,
  ogImage: '/prism-opengraph.png',
})

const NEXT_STEPS: readonly WaitlistNextStep[] = [
  {
    icon: Timer,
    title: 'You apply in about two minutes.',
    body: 'Five short steps about your business and your goals.',
  },
  {
    icon: CalendarCheck,
    title: 'We review every application each month.',
    body: 'We look at your goals, your links, and your timing.',
  },
  {
    icon: Mail,
    title: 'We reach out when a spot opens.',
    body: 'If we can take on your team, we email you to scope the work together.',
  },
]

type WaitlistPageProps = {
  searchParams?: Promise<{ focus?: string | string[] }>
}

/**
 * The one conversion surface. Desktop is a split: the pitch, the process,
 * and verified proof on the left; the stepped application in a featured card
 * on the right, pinned in view while the left column scrolls (only on
 * screens tall enough for the tallest step, so Continue is never stranded
 * below the fold). Mobile reads
 * pitch, form, then process and proof, so the form starts near the fold.
 */
export default async function WaitlistPage({ searchParams }: WaitlistPageProps) {
  const params = searchParams ? await searchParams : {}
  const initialFocus = parseWaitlistFocus(params.focus)

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
          className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[8%] top-[-10%] -z-10 h-[620px] w-[900px] max-w-[150vw] bg-[radial-gradient(closest-side,oklch(1_0_0/7%),transparent)]"
        />

        <div className="prism-container grid flex-1 grid-cols-1 gap-y-12 pb-24 pt-10 sm:pb-32 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,33rem)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-14 lg:pt-20 xl:grid-cols-[minmax(0,1fr)_minmax(0,35rem)] xl:gap-x-24">
          <header className="flex flex-col items-start lg:col-start-1 lg:row-start-1">
            <WaitlistStatus asLink={false} className="prism-rise [--rise-delay:40ms]" />
            <h1 className="text-display text-gradient prism-rise mt-7 max-w-[10ch] text-balance pb-2 [--rise-delay:120ms] lg:text-[clamp(3.5rem,1.6rem+3.6vw,5.75rem)]">
              join the waitlist
            </h1>
            <p className="text-lead prism-rise mt-5 max-w-[30rem] text-pretty text-muted-foreground [--rise-delay:200ms]">
              Prism is fully booked. {CAPACITY_MESSAGE.intakeLead}{' '}
              <WaitlistIntakeMonth />.
            </p>
          </header>

          <div className="relative w-full min-w-0 max-w-2xl lg:max-w-none lg:[@media(min-height:50rem)]:sticky lg:[@media(min-height:50rem)]:top-20 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-10 -top-16 bottom-0 -z-10 bg-[radial-gradient(60%_50%_at_30%_20%,oklch(0.66_0.16_258/16%),transparent_70%),radial-gradient(50%_45%_at_80%_80%,oklch(0.63_0.19_295/12%),transparent_70%),radial-gradient(40%_40%_at_10%_90%,oklch(0.66_0.21_29/10%),transparent_70%)] blur-2xl"
            />
            <div
              data-waitlist-form-card=""
              className="prism-beam prism-rise rounded-[1.75rem] border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/6%)_inset,0_40px_120px_-40px_oklch(0_0_0/90%)] [--rise-delay:160ms] sm:p-8"
            >
              <WaitlistForm
                key={initialFocus.join(',')}
                initialFocus={initialFocus}
              />
            </div>
          </div>

          <div className="flex min-w-0 flex-col gap-12 lg:col-start-1 lg:row-start-2">
            <section aria-labelledby="waitlist-next-heading">
              <h2
                id="waitlist-next-heading"
                className="inline-flex items-center gap-2.5 text-eyebrow text-subtle"
              >
                <span aria-hidden="true" className="h-px w-5 bg-spectrum" />
                What happens next
              </h2>
              <WaitlistNextSteps steps={NEXT_STEPS} className="mt-6 max-w-[30rem]" />
            </section>

            <WaitlistProofStrip className="max-w-[34rem]" />
          </div>
        </div>
      </main>
      <Footer showWaitlistCta={false} />
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
