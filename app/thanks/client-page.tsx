'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Calendar, Check } from 'lucide-react'

import { ConfirmationCard } from '@/components/landing/misc/confirmation'
import { Button } from '@/components/ui/button'
import { BOOKING_URL } from '@/lib/booking'
import {
  trackBookCallClick,
  trackContactActionClick,
  trackCTAClick,
} from '@/utils/analytics'
import confetti from '@/utils/confetti'

export default function ThanksPageClient() {
  useEffect(() => {
    // If Rewardful is available, mark conversion
    if (typeof window !== 'undefined' && window.rewardful) {
      try {
        // @ts-ignore - Rewardful is added via script
        window.rewardful('conversion')
      } catch (error) {
        console.error('Error tracking Rewardful conversion:', error)
      }
    }
  }, [])

  const handleScheduleClick = () => {
    trackBookCallClick(
      'Book Your 15-Minute Prism Site Kickoff Call',
      'thanks_page',
      BOOKING_URL,
    )
    confetti()
    setTimeout(() => {
      window.open(BOOKING_URL, '_blank')
    }, 500)
  }

  return (
    <ConfirmationCard
      icon={<Check aria-hidden="true" />}
      eyebrow="Payment received"
      title="thank you for your payment."
      description="We're excited to start working on your project. The next step is to schedule your kickoff call so we can get started right away."
    >
      <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <Button size="lg" className="group/cta" onClick={handleScheduleClick}>
          <Calendar aria-hidden="true" />
          Book your kickoff call
          <ArrowRight
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
          />
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link
            href="/"
            onClick={() => trackCTAClick('Return Home', 'thanks_page')}
          >
            Return home
          </Link>
        </Button>
      </div>

      <p className="mx-auto mt-6 max-w-[52ch] text-pretty text-sm leading-6 text-subtle">
        Schedule a quick 15-minute call to confirm your goals and launch your
        website. You&apos;ll get a clear plan, an asset checklist, and next
        steps to go live.
      </p>

      <div className="mt-10 border-t border-white/[0.08] pt-6 text-sm leading-6 text-muted-foreground">
        <p>
          A confirmation email has been sent to your inbox with your receipt and
          next steps.
        </p>
        <p className="mt-2">
          Questions? Reply to that email or write to{' '}
          <a
            href="mailto:support@design-prism.com"
            className="rounded-sm text-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            onClick={() => trackContactActionClick('email', 'thanks_page')}
          >
            support@design-prism.com
          </a>
          .
        </p>
      </div>
    </ConfirmationCard>
  )
}
