/** Shared public program policy. Dates use Pacific Time, independent of the visitor's zone. */
export const SCHOLARSHIPS_PATH = '/scholarships'
export const SCHOLARSHIP_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_SCHOLARSHIP_FORM_ENDPOINT ||
  'https://formspree.io/f/mwpwwjek'
export const OFFICE_HOURS_APPLICATION_ENDPOINT =
  process.env.NEXT_PUBLIC_OFFICE_HOURS_APPLICATION_ENDPOINT ||
  'https://formspree.io/f/xjkjbpdb'

export type ScholarshipRound = {
  id: string
  label: string
  selectionDateLabel: string
  deadlineLabel: string
}

/** One recipient per calendar business quarter, beginning with Q4 2026. */
export function getScholarshipRound(now: Date = new Date()): ScholarshipRound {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(now)
  const year = Number(parts.find((part) => part.type === 'year')?.value)
  const month = Number(parts.find((part) => part.type === 'month')?.value)
  const quarterIndex = Math.max(
    year * 4 + Math.floor((month - 1) / 3),
    2026 * 4 + 3,
  )
  const roundYear = Math.floor(quarterIndex / 4)
  const quarter = (quarterIndex % 4) + 1
  const lastDay = new Date(Date.UTC(roundYear, quarter * 3, 0, 12))
  const selectionDateLabel = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(lastDay)
  return {
    id: `${roundYear}-Q${quarter}`,
    label: `Q${quarter} ${roundYear}`,
    selectionDateLabel,
    deadlineLabel: `${selectionDateLabel}, Pacific Time`,
  }
}

export const SCHOLARSHIP_LEARNING_SLUGS = [
  'build-ai-business-system-you-own',
  'how-to-grow-an-audience-in-2026',
  'content-that-converts-give-away-secrets-sell-implementation',
] as const
