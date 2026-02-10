export type HomeHeroMonthlyLeadsStat = {
  /**
   * Month key in `YYYY-MM` format (e.g. `2026-01`).
   */
  month: string
  /**
   * Count of new leads delivered across all Prism clients for the month.
   */
  leads: number
}

/**
 * Newest first. Add a new entry at month-end to rotate the hero pill.
 */
export const HOME_HERO_MONTHLY_LEADS_STATS: HomeHeroMonthlyLeadsStat[] = [
  { month: "2026-01", leads: 7886 },
]

