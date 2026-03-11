import robots from "@/app/robots"

describe("robots", () => {
  it("keeps a single crawler policy, allows /api/og/, and disallows other /api/ routes", () => {
    const result = robots()
    expect(result.rules).toBeTruthy()

    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    expect(rules).toHaveLength(1)
    expect(rules[0]).toMatchObject({
      userAgent: "*",
      allow: ["/api/og/"],
      disallow: ["/api/"],
    })
    expect(result.host).toBeUndefined()
  })
})
