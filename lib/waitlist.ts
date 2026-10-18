/**
 * Waitlist funnel (2026-09-14): Prism is at capacity, so every public sales
 * CTA and every lead form routes to one waitlist. Booking a call is no longer
 * a public primary action. Referral (/refer) and non-sales forms stay as-is.
 */

export const WAITLIST_PATH = '/waitlist'
export const WAITLIST_THANK_YOU_PATH = '/waitlist/thank-you'

export const WAITLIST_CTA = {
  label: 'Join the waitlist',
  href: WAITLIST_PATH,
} as const

export const WAITLIST_FORM_NAME = 'waitlist'
export const WAITLIST_FORM_SUBJECT = 'New Prism waitlist application'

/**
 * Formspree endpoint: the dedicated "Prism Waitlist" form (xvkzkqqp, Prism
 * project, notifies enzo@design-prism.com), created 2026-10-07. Before that,
 * waitlist entries shared the Contact form (xjkjbpdb). The env var can still
 * override it; Formspree endpoints are public and end up in the client bundle.
 */
export const WAITLIST_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_WAITLIST_FORM_ENDPOINT ||
  'https://formspree.io/f/xvkzkqqp'

/**
 * Monthly intake framing (2026-09-16): Prism is fully booked, and new work
 * starts in monthly intakes. The waitlist is the line for the NEXT intake,
 * so the month below always resolves from the visitor's clock, never from a
 * hardcoded string. Surfaces that cannot render the live token (metadata,
 * tertiary one-liners) use timeless phrasing like "next month" or "each
 * monthly intake" instead.
 */
const WAITLIST_INTAKE_MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

export type WaitlistIntakeMonth = {
  /** Full month name of the next intake, e.g. "October". */
  month: (typeof WAITLIST_INTAKE_MONTH_NAMES)[number]
  /** Calendar year the next intake falls in (rolls over in December). */
  year: number
}

/**
 * Resolve the next monthly intake from a date (default: now). December
 * correctly rolls over to January of the following year.
 */
export function getWaitlistIntakeMonth(
  fromDate: Date = new Date(),
): WaitlistIntakeMonth {
  const next = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 1)
  return {
    month: WAITLIST_INTAKE_MONTH_NAMES[next.getMonth()],
    year: next.getFullYear(),
  }
}

export const CAPACITY_MESSAGE = {
  eyebrow: 'In high demand',
  headline: 'Prism is fully booked right now.',
  /**
   * Intake sentence, split around the live month token rendered by
   * `<WaitlistIntakeMonth />`: `${intakeLead} October.`
   */
  intakeLead: 'Join the waitlist to work with us in',
  /** Second intake sentence for the full panel variant. Timeless. */
  intakeTail: 'Spots open every month, and waitlist members get first pick.',
  /**
   * Alternate intake sentence for surfaces that already said "waitlist":
   * `${nextIntakeLead} October.`
   */
  nextIntakeLead: 'Our next intake starts in',
} as const

// Display order on the waitlist focus step. AEO leads (2026-10-18), matching
// the header Services menu.
export const WAITLIST_FOCUS_OPTIONS = [
  { value: 'aeo', label: 'AEO' },
  { value: 'website', label: 'Website' },
  { value: 'content', label: 'Content' },
  { value: 'ads', label: 'Ads' },
] as const

export type WaitlistFocus = (typeof WAITLIST_FOCUS_OPTIONS)[number]['value']

export const WAITLIST_FOCUS_VALUES: readonly WaitlistFocus[] =
  WAITLIST_FOCUS_OPTIONS.map((option) => option.value)

export function isWaitlistFocus(value: unknown): value is WaitlistFocus {
  return (
    typeof value === 'string' &&
    (WAITLIST_FOCUS_VALUES as readonly string[]).includes(value)
  )
}

/** Parse `?focus=website,aeo` (or repeated params) into known values. */
export function parseWaitlistFocus(
  raw: string | string[] | null | undefined,
): WaitlistFocus[] {
  if (!raw) return []
  const parts = (Array.isArray(raw) ? raw : [raw]).flatMap((value) =>
    value.split(','),
  )
  const seen = new Set<WaitlistFocus>()
  for (const part of parts) {
    const normalized = part.trim().toLowerCase()
    if (isWaitlistFocus(normalized)) seen.add(normalized)
  }
  return Array.from(seen)
}

/** Waitlist href with an optional service pre-selection. */
export function getWaitlistHref(focus?: WaitlistFocus): string {
  return focus ? `${WAITLIST_PATH}?focus=${focus}` : WAITLIST_PATH
}

export const WAITLIST_FOCUS_HREFS: Record<WaitlistFocus, string> = {
  website: getWaitlistHref('website'),
  content: getWaitlistHref('content'),
  ads: getWaitlistHref('ads'),
  aeo: getWaitlistHref('aeo'),
}

/**
 * "Not sure yet" (2026-10-12): a focus answer for owners who want Prism to
 * recommend the mix. It is a form answer only, never a service hand-off, so it
 * stays out of `WaitlistFocus`, `WAITLIST_FOCUS_HREFS`, and `?focus=` parsing.
 * The form treats it as exclusive with the service focuses, and it reaches
 * Formspree in the same `focus[]` field.
 */
export const WAITLIST_FOCUS_NOT_SURE = 'not-sure'

export const WAITLIST_FOCUS_CHOICES = [
  ...WAITLIST_FOCUS_OPTIONS,
  { value: WAITLIST_FOCUS_NOT_SURE, label: 'Not sure yet' },
] as const

export type WaitlistFocusChoice =
  (typeof WAITLIST_FOCUS_CHOICES)[number]['value']

export function isWaitlistFocusChoice(
  value: unknown,
): value is WaitlistFocusChoice {
  return value === WAITLIST_FOCUS_NOT_SURE || isWaitlistFocus(value)
}

export const WAITLIST_TIMING_OPTIONS = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1_3_months', label: 'In 1–3 months' },
  { value: '3_6_months', label: 'In 3–6 months' },
  { value: '6_plus_months', label: 'In 6+ months' },
  { value: 'exploring', label: 'Just exploring' },
] as const

export type WaitlistTiming = (typeof WAITLIST_TIMING_OPTIONS)[number]['value']

/**
 * Stepped flow (2026-09-15). One question group per screen, validated before
 * advancing, single Formspree submit on the last step. Order is intentional:
 * the two tap-only steps come first so the visitor commits before typing.
 */
export const WAITLIST_STEPS = [
  { id: 'focus', title: 'What should Prism focus on?' },
  { id: 'timing', title: 'When do you want to start?' },
  { id: 'about', title: 'How do we reach you?' },
  { id: 'links', title: 'Where can we see your work?' },
  { id: 'goals', title: 'What do you want to achieve?' },
] as const

export type WaitlistStepId = (typeof WAITLIST_STEPS)[number]['id']

export const WAITLIST_STEP_IDS: readonly WaitlistStepId[] = WAITLIST_STEPS.map(
  (step) => step.id,
)

/**
 * Links-step escape hatch (2026-10-12): an owner with no website yet (the
 * person who most needs one) checks this instead of adding a link. Submitted
 * to Formspree as `no_website=yes`, only when checked.
 */
export const WAITLIST_NO_WEBSITE_FIELD = 'no_website'
export const WAITLIST_NO_WEBSITE_VALUE = 'yes'

export const WAITLIST_DRAFT_STORAGE_KEY = 'prism_waitlist_draft_v1'
export const WAITLIST_DRAFT_TTL_MS = 24 * 60 * 60 * 1000
