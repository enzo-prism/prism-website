import { firstSearchParamString } from "@/lib/search-params"

describe("firstSearchParamString", () => {
  it("returns string params unchanged", () => {
    expect(firstSearchParamString("growth")).toBe("growth")
  })

  it("uses the first string from array params", () => {
    expect(firstSearchParamString(["seo", "growth"])).toBe("seo")
  })

  it("falls back for empty, null, and malformed params", () => {
    expect(firstSearchParamString([], "all")).toBe("all")
    expect(firstSearchParamString(null, "all")).toBe("all")
    expect(firstSearchParamString(undefined, "all")).toBe("all")
    expect(firstSearchParamString([null, "seo"] as unknown as string[], "all")).toBe("seo")
  })
})
