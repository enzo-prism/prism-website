import { CASE_STUDIES } from "@/lib/case-study-data"
import { INDEXABLE_STATIC_ROUTES } from "@/lib/seo/search-visibility"
import { config, proxy } from "@/proxy"

/**
 * The matcher is a negative lookahead, so a directory listed inside it silently
 * opts every page route under that prefix out of canonicalization. That is how
 * `case-studies/` once exempted all 20 indexable case-study pages from the
 * apex -> www redirect: they answered 200 on the non-canonical host instead of
 * 301ing. These tests pin both the matcher and the redirect it produces.
 */
function matchesProxy(pathname: string): boolean {
  return config.matcher.some((pattern) =>
    new RegExp(`^${pattern}$`).test(pathname),
  )
}

function requestFor(url: string) {
  const parsed = new URL(url)
  return {
    nextUrl: { clone: () => new URL(url), ...parsed },
    headers: new Headers({ host: parsed.host }),
  } as never
}

const INDEXABLE_PATHS = [
  ...INDEXABLE_STATIC_ROUTES,
  ...CASE_STUDIES.map((study) => `/case-studies/${study.slug}`),
]

describe("proxy canonicalization", () => {
  it("runs on every indexable route", () => {
    const skipped = INDEXABLE_PATHS.filter((path) => !matchesProxy(path))
    expect(skipped).toEqual([])
  })

  it("still skips static assets and Next internals", () => {
    for (const asset of [
      "/_next/static/chunk.js",
      "/_next/image",
      "/favicon.ico",
      "/case-studies/exquisite-dentistry-home-desktop.jpg",
      "/logos/prism.svg",
      "/animations/wave/high/frames.json",
    ]) {
      expect(matchesProxy(asset)).toBe(false)
    }
  })

  it("301s the apex host to www for a case-study page", () => {
    const response = proxy(
      requestFor("https://design-prism.com/case-studies/exquisite-dentistry"),
    )

    expect(response.status).toBe(301)
    expect(response.headers.get("location")).toBe(
      "https://www.design-prism.com/case-studies/exquisite-dentistry",
    )
  })

  it("does not leak a non-default port into the canonical redirect", () => {
    const response = proxy(requestFor("http://design-prism.com:3000/pricing"))

    expect(response.headers.get("location")).toBe(
      "https://www.design-prism.com/pricing",
    )
  })

  it("leaves an already-canonical request alone", () => {
    const response = proxy(requestFor("https://www.design-prism.com/pricing"))

    expect(response.status).toBe(200)
  })
})
