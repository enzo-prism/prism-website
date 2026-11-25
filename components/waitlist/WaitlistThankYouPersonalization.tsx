'use client'

import { useSyncExternalStore } from 'react'
import { ArrowRight } from 'lucide-react'

import TrackedLink from '@/components/tracked-link'
import {
  formatWaitlistFocusLabels,
  isWaitlistFocus,
  WAITLIST_RECEIPT_STORAGE_KEY,
  WAITLIST_RECEIPT_TTL_MS,
  type WaitlistFocus,
  type WaitlistSubmissionReceipt,
} from '@/lib/waitlist'

const SERVICE_GUIDE: Record<
  WaitlistFocus,
  { label: string; href: string; trackingLabel: string }
> = {
  aeo: {
    label: 'While you wait: see how Prism AEO works',
    href: '/aeo',
    trackingLabel: 'thank you explore aeo',
  },
  website: {
    label: 'While you wait: inspect how we build websites',
    href: '/website-design',
    trackingLabel: 'thank you explore website design',
  },
  content: {
    label: 'While you wait: see our content system',
    href: '/content',
    trackingLabel: 'thank you explore content',
  },
  ads: {
    label: 'While you wait: see how we run ads',
    href: '/ads',
    trackingLabel: 'thank you explore ads',
  },
}

const subscribeNoop = () => () => {}

function getServerReceiptSnapshot(): string | null {
  return null
}

function getClientReceiptSnapshot(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return window.sessionStorage.getItem(WAITLIST_RECEIPT_STORAGE_KEY)
  } catch {
    return null
  }
}

function parseReceipt(raw: string | null): WaitlistSubmissionReceipt | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<WaitlistSubmissionReceipt>
    if (
      !parsed.savedAt ||
      Date.now() - parsed.savedAt > WAITLIST_RECEIPT_TTL_MS
    ) {
      return null
    }
    return {
      firstName:
        typeof parsed.firstName === 'string' ? parsed.firstName.trim() : '',
      focus: Array.isArray(parsed.focus) ? parsed.focus : [],
      timing: parsed.timing,
      savedAt: parsed.savedAt,
    }
  } catch {
    return null
  }
}

/**
 * Progressive personalization for /waitlist/thank-you.
 * Server HTML and direct visits show the calm default line; visitors who just
 * submitted in this tab get a warm greeting with their name, chosen focus, and
 * a one-tap shortcut to the matching service page.
 */
export default function WaitlistThankYouPersonalization() {
  const rawReceipt = useSyncExternalStore(
    subscribeNoop,
    getClientReceiptSnapshot,
    getServerReceiptSnapshot,
  )
  const receipt = parseReceipt(rawReceipt)

  const firstName = receipt?.firstName ?? ''
  const selectedServices = (receipt?.focus ?? []).filter(isWaitlistFocus)
  const focusList = formatWaitlistFocusLabels(selectedServices)
  const primaryGuide = selectedServices[0]
    ? SERVICE_GUIDE[selectedServices[0]]
    : null

  const leadCopy = firstName
    ? focusList
      ? `Thanks, ${firstName}. Your ${focusList} note is with Enzo and the team. Here is what happens next.`
      : `Thanks, ${firstName}. Your note is with Enzo and the team. Here is what happens next.`
    : focusList
      ? `Thanks for applying. Your ${focusList} note is with our team. Here is what happens next.`
      : 'Thanks for applying. Here is what happens next.'

  return (
    <>
      <p className="text-lead prism-rise mt-5 max-w-[36rem] text-pretty text-muted-foreground [--rise-delay:200ms]">
        {leadCopy}
      </p>
      {primaryGuide ? (
        <TrackedLink
          href={primaryGuide.href}
          label={primaryGuide.trackingLabel}
          location="waitlist thank you personalized"
          className="group/guide mt-5 inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:border-white/25 hover:bg-white/[0.07] focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <span>{primaryGuide.label}</span>
          <ArrowRight
            aria-hidden="true"
            className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover/guide:translate-x-0.5 group-hover/guide:text-foreground motion-reduce:transition-none"
          />
        </TrackedLink>
      ) : null}
    </>
  )
}
