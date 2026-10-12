'use client'

import Link from 'next/link'
import {
  ArrowUpRight,
  Calendar,
  Lightbulb,
  Palette,
  Smartphone,
} from 'lucide-react'

import { ConfirmationCard } from '@/components/landing/misc/confirmation'
import { Button } from '@/components/ui/button'
import { trackContactActionClick, trackCTAClick } from '@/utils/analytics'

const INSTAGRAM_URL = 'https://www.instagram.com/the_design_prism/'

const INSTAGRAM_TOPICS = [
  { icon: Palette, label: 'Design inspiration and trends' },
  { icon: Smartphone, label: 'Behind-the-scenes content' },
  { icon: Lightbulb, label: 'Business growth tips' },
] as const

export default function ThanksCallPageClient() {
  const handleInstagramClick = () => {
    trackCTAClick('Join Instagram Community', 'thanks_call_page')
    window.open(INSTAGRAM_URL, '_blank')
  }

  const handleHomeClick = () => {
    trackCTAClick('Return Home', 'thanks_call_page')
  }

  return (
    <ConfirmationCard
      icon={<Calendar aria-hidden="true" />}
      eyebrow="Call booked"
      title="your call is scheduled."
      description="We're excited to connect. While you wait, join the Prism community on Instagram for design inspiration, behind-the-scenes content, and tips to grow your business."
    >
      <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <Button size="lg" className="group/cta" onClick={handleInstagramClick}>
          Join our community
          <ArrowUpRight
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
          />
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/" onClick={handleHomeClick}>
            Return home
          </Link>
        </Button>
      </div>

      <ul className="mt-10 grid gap-3 text-left sm:grid-cols-3">
        {INSTAGRAM_TOPICS.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-muted-foreground"
          >
            <Icon
              aria-hidden="true"
              className="size-4 shrink-0 text-foreground"
            />
            <span>{label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 space-y-2 border-t border-white/[0.08] pt-6 text-sm leading-6 text-muted-foreground">
        <p>A confirmation email has been sent to your inbox.</p>
        <p>
          Need to reschedule or have a question? Email{' '}
          <a
            href="mailto:support@design-prism.com"
            className="rounded-sm text-foreground underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/70 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
            onClick={() => trackContactActionClick('email', 'thanks_call_page')}
          >
            support@design-prism.com
          </a>
          .
        </p>
        <p className="text-subtle">
          We&apos;ll reach out 15 minutes before your scheduled call time.
        </p>
      </div>
    </ConfirmationCard>
  )
}
