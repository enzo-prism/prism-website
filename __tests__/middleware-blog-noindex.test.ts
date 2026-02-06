import { shouldNoindexBlogIndex } from "@/proxy"

describe("middleware /blog noindex helper", () => {
  it("returns true for non-empty q", () => {
    expect(shouldNoindexBlogIndex(new URLSearchParams({ q: "test" }))).toBe(true)
  })

  it("returns true for category other than all", () => {
    expect(shouldNoindexBlogIndex(new URLSearchParams({ category: "seo" }))).toBe(true)
    expect(shouldNoindexBlogIndex(new URLSearchParams({ category: "SEO" }))).toBe(true)
  })

  it("returns false for no params", () => {
    expect(shouldNoindexBlogIndex(new URLSearchParams())).toBe(false)
  })

  it("returns false for category=all", () => {
    expect(shouldNoindexBlogIndex(new URLSearchParams({ category: "all" }))).toBe(false)
    expect(shouldNoindexBlogIndex(new URLSearchParams({ category: "ALL" }))).toBe(false)
  })
})
