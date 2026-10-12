import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { WaitlistButton } from '@/components/prism/waitlist-button'
import LeadSuccessTracker from '@/components/thank-you/LeadSuccessTracker'
import { Button } from '@/components/ui/button'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Pricing reviewed: next steps',
  description:
    'Explore your next step with Prism: join the waitlist for the next monthly intake.',
  path: '/pricing/thank-you',
  index: false,
  ogImage: '/prism-opengraph.png',
})

export default function PricingThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <LeadSuccessTracker />
      <Navbar />
      <main
        className="relative isolate flex flex-1 items-center justify-center overflow-hidden px-5 py-24 sm:py-32"
        id="main-content"
        tabIndex={-1}
      >
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[min(48rem,120vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,oklch(0.66_0.16_258/16%),transparent)] blur-2xl"
        />
        <div className="relative flex w-full max-w-xl flex-col items-center gap-8 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-card px-6 py-12 text-center sm:px-10">
          <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10 opacity-50" />
          <span className="grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.04]">
            <CheckCircle2 className="size-7 text-foreground" aria-hidden="true" />
          </span>
          <div className="flex flex-col items-center gap-4">
            <p className="text-eyebrow text-subtle">Your next step</p>
            <h1 className="text-title text-gradient max-w-[14ch] text-balance pb-1">
              thanks for reviewing pricing.
            </h1>
            <p className="max-w-[42ch] text-pretty text-[15px] leading-7 text-muted-foreground">
              Ready to explore a project? Join the waitlist. Our team reviews
              applications for each monthly intake.
            </p>
          </div>
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <WaitlistButton
              location="pricing thank-you"
              size="lg"
              className="w-full sm:w-auto"
            />
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/">Return to homepage</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
