import { generateCaseStudyImpactPoints } from "@/lib/case-study-impact-graph"

describe("generateCaseStudyImpactPoints", () => {
  it("compounds customers and drives effort to zero (with prism)", () => {
    const config = {
      months: 9,
      effort: { start: 100, end: 0 },
      customers: { start: 20, end: 95 },
      curves: { customersGrowthK: 2.6, effortDecayK: 2 },
    } as const

    const points = generateCaseStudyImpactPoints(config)

    expect(points).toHaveLength(9)
    expect(points[0]).toEqual({ month: 0, effort: 100, customers: 20 })
    expect(points[8]).toEqual({ month: 8, effort: 0, customers: 95 })

    for (let index = 1; index < points.length; index += 1) {
      expect(points[index].customers).toBeGreaterThanOrEqual(points[index - 1].customers)
      expect(points[index].effort).toBeLessThanOrEqual(points[index - 1].effort)
    }

    const midpoint = points[Math.floor(points.length / 2)]
    const linearCustomersMidpoint = (config.customers.start + config.customers.end) / 2
    const linearEffortMidpoint = (config.effort.start + config.effort.end) / 2

    expect(midpoint.customers).toBeLessThan(linearCustomersMidpoint)
    expect(midpoint.effort).toBeLessThan(linearEffortMidpoint)
  })
})

