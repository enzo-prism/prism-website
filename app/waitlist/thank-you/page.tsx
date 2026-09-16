import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { CheckCircle2, ClipboardCheck, type LucideIcon, Mail } from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import LeadSuccessTracker from '@/components/thank-you/LeadSuccessTracker'
import TrackedLink from '@/components/tracked-link'
import WaitlistIntakeMonth from '@/components/waitlist/WaitlistIntakeMonth'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { WAITLIST_THANK_YOU_PATH } from '@/lib/waitlist'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'You are on the waitlist',
  description:
    'Your Prism waitlist application is in. We review every application for the next intake and reach out by email.',
  path: WAITLIST_THANK_YOU_PATH,
  index: false,
})

const NEXT_STEPS: ReadonlyArray<{
  icon: LucideIcon
  title: ReactNode
  body: string
}> = [
  {
    icon: CheckCircle2,
    title: 'Application received',
    body: 'Nothing else is needed from you right now.',
  },
  {
    icon: ClipboardCheck,
    title: (
      <>
        In line for the <WaitlistIntakeMonth /> intake
      </>
    ),
    body: 'We review every application and reach out to the teams we accept.',
  },
  {
    icon: Mail,
    title: 'We reach out by email',
    body: 'If we can take on your team, we email you to scope the work together.',
  },
]

export default function WaitlistThankYouPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-transparent font-sans text-[#f5f0e8]">
      <Navbar />
      <main
        className="container-px-safe flex flex-1 flex-col pb-[max(4rem,env(safe-area-inset-bottom))] pt-10 sm:pt-16"
        id="main-content"
        tabIndex={-1}
      >
        <div className="mx-auto w-full max-w-xl">
          <header className="flex flex-col gap-3">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-[#8f877b]">
              Waitlist
            </p>
            <h1 className="text-balance font-sans text-[clamp(2.05rem,7vw,3rem)] font-medium leading-[1] tracking-[-0.045em] text-[#f5f0e8]">
              You are on the list.
            </h1>
            <p className="text-pretty font-sans text-[1rem] leading-7 text-[#b8afa2]">
              Thanks for applying. Here is what happens next.
            </p>
          </header>

          <ol className="mt-10 grid gap-3 sm:mt-12">
            {NEXT_STEPS.map((step, index) => {
              const Icon = step.icon
              return (
                <li
                  key={`waitlist-next-step-${index}`}
                  className="flex items-start gap-4 rounded-xl border border-white/12 bg-white/[0.03] px-4 py-4"
                >
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-[10px] border border-white/12 bg-white/[0.04] text-[#d8bc79]"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="font-sans text-[1.02rem] font-medium leading-6 text-[#f5f0e8]">
                      {step.title}
                    </p>
                    <p className="mt-1 text-pretty font-sans text-[0.92rem] leading-6 text-[#b8afa2]">
                      {step.body}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>

          <p className="mt-10 font-sans text-[0.95rem] text-[#8f877b]">
            <TrackedLink
              href="/"
              label="back to home"
              location="waitlist thank you"
              className="inline-flex min-h-11 items-center text-[#b8afa2] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#f5f0e8] focus-visible:rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/25"
            >
              Back to home
            </TrackedLink>
          </p>
        </div>
      </main>
      <Footer />
      <LeadSuccessTracker />
    </div>
  )
}
