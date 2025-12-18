export type CaseStudyImpactGraphConfig = {
  months: number
  effort: {
    start: number
    end: number
  }
  customers: {
    start: number
    end: number
  }
}

export type CaseStudyImpactPoint = {
  month: number
  effort: number
  customers: number
}

export const DEFAULT_CASE_STUDY_IMPACT_GRAPH: CaseStudyImpactGraphConfig = {
  months: 9,
  effort: { start: 100, end: 25 },
  customers: { start: 20, end: 95 },
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function getCaseStudyImpactGraphConfig(_slug?: string): CaseStudyImpactGraphConfig {
  return DEFAULT_CASE_STUDY_IMPACT_GRAPH
}

export function generateCaseStudyImpactPoints(
  config: CaseStudyImpactGraphConfig
): CaseStudyImpactPoint[] {
  const months = clamp(Math.round(config.months), 2, 24)

  return Array.from({ length: months }, (_, month) => {
    const t = months === 1 ? 1 : month / (months - 1)

    const effort = Math.round(
      clamp(
        lerp(config.effort.start, config.effort.end, easeOutCubic(t)),
        0,
        100
      )
    )

    const customers = Math.round(
      clamp(
        lerp(config.customers.start, config.customers.end, easeInOutCubic(t)),
        0,
        100
      )
    )

    return { month, effort, customers }
  })
}

