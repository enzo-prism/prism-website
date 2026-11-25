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
 * tertiary one-liners) use timeless phrasing like "next monthly intake" or "each
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
 * Earliest open intake (2026-11-01): October through December 2026 are fully
 * booked, so the waitlist fills January 2027. Until then every surface names
 * January; from January on the floor is in the past and the intake rolls
 * forward to the next month as usual. Move it forward again whenever the
 * month after the current one is already full.
 */
export const WAITLIST_EARLIEST_INTAKE = new Date(2027, 0, 1)

/**
 * First day of the next open intake from a date (default: now): the next
 * calendar month, or `WAITLIST_EARLIEST_INTAKE` if that is later.
 */
export function getWaitlistIntakeDate(fromDate: Date = new Date()): Date {
  const next = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 1)
  return next < WAITLIST_EARLIEST_INTAKE
    ? new Date(WAITLIST_EARLIEST_INTAKE)
    : next
}

/**
 * Resolve the next monthly intake from a date (default: now). December
 * correctly rolls over to January of the following year.
 */
export function getWaitlistIntakeMonth(
  fromDate: Date = new Date(),
): WaitlistIntakeMonth {
  return toWaitlistIntakeMonth(getWaitlistIntakeDate(fromDate))
}

/** Name a month, e.g. for the intake calendar around the next intake. */
export function toWaitlistIntakeMonth(next: Date): WaitlistIntakeMonth {
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
  { value: 'website', label: 'Website Design' },
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

export function isWaitlistTiming(value: unknown): value is WaitlistTiming {
  return (
    typeof value === 'string' &&
    WAITLIST_TIMING_OPTIONS.some((option) => option.value === value)
  )
}

/**
 * Prefilled waitlist links (2026-11-18), so a page, an email, or an AI agent
 * can hand someone a form that already holds their non-personal answers:
 *
 *   /waitlist?focus=aeo,website&timing=1_3_months&website=example.com
 *
 * Only `focus`, `timing`, and `website` (the business's public site) are
 * read. Names, email, phone, and goals are never taken from the URL, so
 * personal details stay out of links, logs, and analytics. The visitor still
 * reviews every step and submits the form themselves.
 */
export type WaitlistPrefill = {
  focus: WaitlistFocus[]
  timing?: WaitlistTiming
  website?: string
}

export type WaitlistPrefillParams = {
  intent?: string | string[]
  focus?: string | string[]
  timing?: string | string[]
  website?: string | string[]
}

const PREFILL_WEBSITE_PATTERN =
  /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:\d+)?(\/[^\s<>"]*)?$/i

function firstValue(raw: string | string[] | undefined): string | undefined {
  const value = Array.isArray(raw) ? raw[0] : raw
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export function parseWaitlistPrefill(params: WaitlistPrefillParams): WaitlistPrefill {
  const timing = firstValue(params.timing)?.toLowerCase()
  const website = firstValue(params.website)
  return {
    focus: parseWaitlistFocus(params.focus),
    ...(isWaitlistTiming(timing) ? { timing } : {}),
    ...(website && website.length <= 200 && PREFILL_WEBSITE_PATTERN.test(website)
      ? { website }
      : {}),
  }
}

/** Waitlist href carrying any prefill answers (empty ones are left out). */
export function getWaitlistPrefillHref(prefill: Partial<WaitlistPrefill>): string {
  const params = new URLSearchParams()
  if (prefill.focus && prefill.focus.length > 0) params.set('focus', prefill.focus.join(','))
  if (prefill.timing) params.set('timing', prefill.timing)
  if (prefill.website) params.set('website', prefill.website)
  const query = params.toString().replace(/%2C/g, ',')
  return query ? `${WAITLIST_PATH}?${query}` : WAITLIST_PATH
}

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

/**
 * Ephemeral confirmation receipt (2026-11-25): stored in same-tab
 * sessionStorage right before redirecting to /waitlist/thank-you so the
 * confirmation page can greet the visitor personally without putting personal
 * details in the URL, logs, or analytics.
 */
export const WAITLIST_RECEIPT_STORAGE_KEY = 'prism_waitlist_receipt_v1'
export const WAITLIST_RECEIPT_TTL_MS = 60 * 60 * 1000

export type WaitlistSubmissionReceipt = {
  firstName: string
  focus: WaitlistFocusChoice[]
  timing?: WaitlistTiming
  savedAt: number
}

const FOCUS_LABELS: Record<WaitlistFocusChoice, string> = {
  aeo: 'AEO',
  website: 'Website Design',
  content: 'Content',
  ads: 'Ads',
  [WAITLIST_FOCUS_NOT_SURE]: 'Not sure yet',
}

/** Join selected service focus labels in natural English ("AEO and Website Design"). */
export function formatWaitlistFocusLabels(
  focus: readonly WaitlistFocusChoice[],
): string {
  const labels = focus
    .filter(isWaitlistFocus)
    .map((value) => FOCUS_LABELS[value])
  if (labels.length === 0) return ''
  if (labels.length === 1) return labels[0]
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`
  return `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`
}

/** Short reassurance shown right after the visitor picks a start window. */
export const WAITLIST_TIMING_NOTES: Record<WaitlistTiming, string> = {
  asap: 'Got it. We prioritize urgent launches as soon as the next spot opens.',
  '1_3_months': 'Great window. Gives us time to scope cleanly ahead of launch.',
  '3_6_months':
    'Smart to plan ahead. You will be early in line when your window opens.',
  '6_plus_months':
    'No rush at all. We will keep your note warm for when you are ready.',
  exploring:
    'Zero pressure. Share your links and we will send back honest next steps.',
}

/** Focus-matched one-tap starter chips for Step 5 (especially helpful on mobile). */
export function getWaitlistGoalStarters(
  focus: readonly WaitlistFocusChoice[],
): readonly string[] {
  const services = focus.filter(isWaitlistFocus)
  if (services.length === 1) {
    switch (services[0]) {
      case 'aeo':
        return [
          'Show up in ChatGPT & Perplexity.',
          'Fix how AI describes our business.',
          'Audit our AI search visibility.',
        ]
      case 'website':
        return [
          'Refresh an outdated website.',
          'Get more inquiries on mobile.',
          'Launch a flagship brand site.',
        ]
      case 'content':
        return [
          'Build steady short-form video.',
          'Show real client proof online.',
          'Grow founder visibility.',
        ]
      case 'ads':
        return [
          'Bring in more qualified calls.',
          'Cut wasted ad spend.',
          'Launch tracked Google & Meta ads.',
        ]
    }
  }
  return [
    'Bring in more qualified inquiries.',
    'Modernize how we look on mobile.',
    'Help us pick where to focus first.',
  ]
}

/** Dynamic textarea placeholder tailored to the visitor's chosen focus. */
export function getWaitlistGoalsPlaceholder(
  focus: readonly WaitlistFocusChoice[],
): string {
  const services = focus.filter(isWaitlistFocus)
  if (services.length === 1) {
    switch (services[0]) {
      case 'aeo':
        return 'e.g. Show up when local buyers ask ChatGPT or Perplexity who to hire.'
      case 'website':
        return 'e.g. Modernize our look and make it effortless for mobile visitors to inquire.'
      case 'content':
        return 'e.g. Consistent short-form video and client stories without losing our week.'
      case 'ads':
        return 'e.g. Steadier qualified calls from Google and Meta without wasted budget.'
    }
  }
  return 'e.g. Tell us what feels stuck right now: traffic, leads, or how the business looks online.'
}

/** Dynamic links-step hint reflecting the visitor's name and chosen focus. */
export function getWaitlistLinksHint({
  firstName,
  focus,
  noWebsite,
}: {
  firstName: string
  focus: readonly WaitlistFocusChoice[]
  noWebsite: boolean
}): string {
  const name = firstName.trim()
  if (noWebsite) {
    return name
      ? `No problem, ${name}. That’s what we build. Add a social profile if you have one.`
      : 'No problem, that’s what we build. Add a social profile if you have one.'
  }

  const greeting = name ? `Nice to meet you, ${name}. ` : ''
  const services = focus.filter(isWaitlistFocus)
  if (services.includes('aeo') && services.length === 1) {
    return `${greeting}One link lets us check how AI engines currently describe your business.`
  }
  if (services.includes('ads') && services.length === 1) {
    return `${greeting}One link lets us see where your ad clicks land today.`
  }
  if (services.includes('content') && services.length === 1) {
    return `${greeting}Share your site or main social profile so we can see your current voice.`
  }
  if (services.includes('website') && services.length === 1) {
    return `${greeting}One link lets us look through your current site before we reply.`
  }
  return `${greeting}One link is enough so we can review your business before replying.`
}

/** Dynamic focus-step hint acknowledging URL prefills or active selections. */
export function getWaitlistFocusHint({
  focus,
  isPrefilledUntouched,
}: {
  focus: readonly WaitlistFocusChoice[]
  isPrefilledUntouched: boolean
}): string {
  if (focus.length === 0) return 'Pick any that apply.'
  if (focus.includes(WAITLIST_FOCUS_NOT_SURE)) {
    return 'Good call. Share a few details and we will suggest where to start.'
  }
  const services = focus.filter(isWaitlistFocus)
  const formatted = formatWaitlistFocusLabels(services)
  if (isPrefilledUntouched) {
    return services.length === 1
      ? `${formatted} is selected. Add anything else, or tap Continue.`
      : `${formatted} are selected. Adjust anytime, or tap Continue.`
  }
  if (services.length === 1) {
    return `${formatted} selected. Add another discipline, or tap Continue.`
  }
  if (services.length === 2) {
    return `Great mix. ${formatted} compound well under one team.`
  }
  return 'Full stack selected. One senior team handles every piece together.'
}

/** Dynamic about-step hint linking contact details directly to what they asked for. */
export function getWaitlistAboutHint(
  focus: readonly WaitlistFocusChoice[],
): string {
  const services = focus.filter(isWaitlistFocus)
  if (services.length === 1) {
    return `Used only by Enzo and the Prism team to reply about your ${FOCUS_LABELS[services[0]]} inquiry.`
  }
  if (services.length > 1) {
    return 'Used only by Enzo and the Prism team to reply about your project.'
  }
  return 'Used only by Enzo and the Prism team to reply personally. No spam, ever.'
}
