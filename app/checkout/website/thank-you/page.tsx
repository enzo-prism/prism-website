import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

import {
  ConfirmationCard,
  ConfirmationShell,
  ConfirmationSteps,
} from '@/components/landing/misc/confirmation'
import { Button } from '@/components/ui/button'
import { buildRouteMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Website order received',
  description:
    'Prism received your website order and will review the brief before confirming scope, timing, and next steps.',
  path: '/checkout/website/thank-you',
  index: false,
})

const NEXT_STEPS = [
  { body: 'Stripe sends the payment receipt when the transaction completes.' },
  { body: 'We review the brief, scope, and requested launch path.' },
  { body: 'Prism confirms timing and the next step within two business days.' },
] as const

/**
 * Legacy Stripe redirect landing page. Query strings are not payment proof.
 * Revenue must come from a verified paid live session/webhook, never arrival
 * at this public URL. Keep the receipt/help surface available for old links.
 */
export default function WebsiteOrderThankYouPage() {
  return (
    <ConfirmationShell>
      <ConfirmationCard
        icon={<Check aria-hidden="true" />}
        eyebrow="Order received"
        title="we've received your website order."
        description="Your brief is with the team. Prism will verify the order, review the requested scope, and reply within two business days with timing and next steps."
      >
        <ConfirmationSteps steps={NEXT_STEPS} />
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="group/cta">
            <Link href="/">
              Back to home
              <ArrowRight
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/cta:translate-x-0.5"
              />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="mailto:support@design-prism.com">Ask a question</a>
          </Button>
        </div>
      </ConfirmationCard>
    </ConfirmationShell>
  )
}
