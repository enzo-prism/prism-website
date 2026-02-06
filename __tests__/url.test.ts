import { CANONICAL_ORIGIN, toAbsoluteUrl, toLocalPathIfSameOrigin } from "@/lib/url"

describe("lib/url", () => {
  describe("toAbsoluteUrl", () => {
    it("converts relative paths to absolute URLs on the canonical origin", () => {
      expect(toAbsoluteUrl("/foo")).toBe(`${CANONICAL_ORIGIN}/foo`)
      expect(toAbsoluteUrl("bar")).toBe(`${CANONICAL_ORIGIN}/bar`)
    })

    it("preserves absolute URLs", () => {
      expect(toAbsoluteUrl("https://www.design-prism.com/api/og/blog/test")).toBe(
        "https://www.design-prism.com/api/og/blog/test",
      )
      expect(toAbsoluteUrl("https://example.com/x")).toBe("https://example.com/x")
    })
  })

  describe("toLocalPathIfSameOrigin", () => {
    it("converts same-origin absolute URLs to local paths", () => {
      expect(toLocalPathIfSameOrigin("https://www.design-prism.com/api/og/blog/test")).toBe("/api/og/blog/test")
      expect(toLocalPathIfSameOrigin("https://design-prism.com/foo?bar=baz#hash")).toBe("/foo?bar=baz#hash")
    })

    it("leaves non-absolute URLs unchanged", () => {
      expect(toLocalPathIfSameOrigin("/prism-opengraph.png")).toBe("/prism-opengraph.png")
    })

    it("leaves external URLs unchanged", () => {
      expect(toLocalPathIfSameOrigin("https://example.com/x")).toBe("https://example.com/x")
    })
  })
})

