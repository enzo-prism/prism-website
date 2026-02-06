import robots from "@/app/robots"

describe("robots", () => {
  it("allows /api/og/ but disallows /api/", () => {
    const result = robots()
    expect(result.rules).toBeTruthy()

    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    for (const rule of rules) {
      expect(rule.disallow).toEqual(expect.arrayContaining(["/api/"]))
      expect(rule.allow).toEqual(expect.arrayContaining(["/api/og/"]))
    }
  })
})

