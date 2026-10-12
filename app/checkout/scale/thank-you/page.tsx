import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, ChartNoAxesCombined } from 'lucide-react'

import {
  ConfirmationCard,
  ConfirmationShell,
} from '@/components/landing/misc/confirmation'
import LeadSuccessTracker from '@/components/thank-you/LeadSuccessTracker'
import TrackedLink from '@/components/tracked-link'
import { Button } from '@/components/ui/button'
import { BOOKING_URL } from '@/lib/booking'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Scale plan order received',
  description:
    'We received your Scale plan order. Book a kickoff call with Prism to accelerate next steps and scale your website and growth systems.',
  path: '/checkout/scale/thank-you',
  index: false,
})

/**
 * Legacy post-payment landing page for the retired fixed plans. BOOKING_URL
 * survives here only for customers who already paid (see AGENTS.md).
 */
export default function ScaleThankYouPage() {
  return (
    <>
      <LeadSuccessTracker />
      <ConfirmationShell>
        <ConfirmationCard
          icon={<ChartNoAxesCombined aria-hidden="true" />}
          eyebrow="Order received"
          title="ready to scale."
          description="We've received your submission. Our team will get back to you within two business days to discuss the next steps of your project."
        >
          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
            <p className="text-eyebrow text-subtle">Want to move faster?</p>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <TrackedLink
                  href={BOOKING_URL}
                  label="Book Meeting Now"
                  location="checkout_scale_thank_you"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar aria-hidden="true" />
                  Book a kickoff call
                </TrackedLink>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="group/home w-full text-muted-foreground hover:text-foreground sm:w-auto"
              >
                <Link href="/">
                  Return home
                  <ArrowRight
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover/home:translate-x-0.5"
                  />
                </Link>
              </Button>
            </div>
          </div>
        </ConfirmationCard>
      </ConfirmationShell>
    </>
  )
}
