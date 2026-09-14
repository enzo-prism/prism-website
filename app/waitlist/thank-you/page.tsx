import type { Metadata } from 'next'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import LeadSuccessTracker from '@/components/thank-you/LeadSuccessTracker'
import {
  CoreActionLink,
  CoreSectionHeading,
  coreRouteContainerClassName,
  coreRouteSectionClassName,
} from '@/components/core-route/CoreRoutePrimitives'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import { WAITLIST_THANK_YOU_PATH } from '@/lib/waitlist'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'You are on the waitlist',
  description:
    'Your Prism waitlist application is in. We review applications as capacity frees up and reach out by email.',
  path: WAITLIST_THANK_YOU_PATH,
  index: false,
})

const NEXT_STEPS = [
  {
    label: '01',
    title: 'Application received',
    body: 'Your details are saved. Nothing else is needed from you right now.',
  },
  {
    label: '02',
    title: 'We review as space opens',
    body: 'When capacity frees up, the team reviews the waitlist and looks for a strong fit.',
  },
  {
    label: '03',
    title: 'We reach out by email',
    body: 'If we can take on your team, we email you to scope the work together.',
  },
] as const

export default function WaitlistThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent font-sans text-[#f5f0e8]">
      <Navbar />
      <main className="flex-1" id="main-content" tabIndex={-1}>
        <section className={coreRouteSectionClassName}>
          <div className={`${coreRouteContainerClassName} max-w-3xl`}>
            <CoreSectionHeading
              eyebrow="Waitlist"
              title="You are on the list."
              description="Thanks for applying. We are working to free up space as fast as we can, and we will reach out when we can take on your team."
              as="h1"
              variant="hero"
              titleClassName="max-w-[12ch]"
            />

            <ol className="mt-10 grid gap-5 border-t border-white/10 pt-6">
              {NEXT_STEPS.map((step) => (
                <li key={step.label} className="flex gap-4">
                  <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7d766a]">
                    {step.label}
                  </span>
                  <div>
                    <p className="font-sans text-[1.05rem] font-medium leading-7 text-[#f5f0e8]">
                      {step.title}
                    </p>
                    <p className="mt-1 text-pretty font-sans text-[0.96rem] leading-7 text-[#b8afa2]">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <CoreActionLink
                href="/case-studies"
                label="see client results"
                location="waitlist thank you"
                variant="heroSecondary"
              >
                See client results
              </CoreActionLink>
              <CoreActionLink
                href="/"
                label="back to home"
                location="waitlist thank you"
                variant="heroSecondary"
              >
                Back to home
              </CoreActionLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <LeadSuccessTracker />
    </div>
  )
}
