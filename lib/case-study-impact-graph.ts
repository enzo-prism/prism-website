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
  curves?: {
    customersGrowthK?: number
    effortDecayK?: number
  }
}

export type CaseStudyImpactPoint = {
  month: number
  effort: number
  customers: number
}

export const DEFAULT_CASE_STUDY_IMPACT_GRAPH: CaseStudyImpactGraphConfig = {
  months: 9,
  effort: { start: 100, end: 0 },
  customers: { start: 20, end: 95 },
  curves: {
    customersGrowthK: 2.6,
    effortDecayK: 2,
  },
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t
}

function normalize01(value: number) {
  return clamp(value, 0, 1)
}

function expGrowthNormalized(t: number, k: number) {
  const t01 = normalize01(t)
  if (!Number.isFinite(k) || k <= 0) return t01
  if (t01 === 0) return 0
  if (t01 === 1) return 1

  const numerator = Math.exp(k * t01) - 1
  const denominator = Math.exp(k) - 1
  return denominator === 0 ? t01 : clamp(numerator / denominator, 0, 1)
}

function expDecayNormalized(t: number, k: number) {
  const t01 = normalize01(t)
  if (!Number.isFinite(k) || k <= 0) return t01
  if (t01 === 0) return 0
  if (t01 === 1) return 1

  const numerator = 1 - Math.exp(-k * t01)
  const denominator = 1 - Math.exp(-k)
  return denominator === 0 ? t01 : clamp(numerator / denominator, 0, 1)
}

export function getCaseStudyImpactGraphConfig(_slug?: string): CaseStudyImpactGraphConfig {
  return DEFAULT_CASE_STUDY_IMPACT_GRAPH
}

export function generateCaseStudyImpactPoints(
  config: CaseStudyImpactGraphConfig
): CaseStudyImpactPoint[] {
  const months = clamp(Math.round(config.months), 2, 24)
  const customersGrowthK = config.curves?.customersGrowthK ?? 2.6
  const effortDecayK = config.curves?.effortDecayK ?? 2

  return Array.from({ length: months }, (_, month) => {
    const t = months === 1 ? 1 : month / (months - 1)

    const effort = Math.round(
      clamp(
        lerp(config.effort.start, config.effort.end, expDecayNormalized(t, effortDecayK)),
        0,
        100
      )
    )

    const customers = Math.round(
      clamp(
        lerp(config.customers.start, config.customers.end, expGrowthNormalized(t, customersGrowthK)),
        0,
        100
      )
    )

    return { month, effort, customers }
  })
}
