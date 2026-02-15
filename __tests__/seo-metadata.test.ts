import { buildRouteMetadata } from "@/lib/seo/metadata"
import {
  BRAND_SUFFIX,
  DESCRIPTION_MAX_LENGTH,
  buildAbsoluteTitle,
  normalizeDescription,
  normalizeTitleStem,
} from "@/lib/seo/rules"

describe("SEO metadata rules", () => {
  it("normalizes title stems by removing trailing brand suffix variants", () => {
    expect(normalizeTitleStem("seo audit service | prism | prism")).toBe("Seo audit service")
    expect(normalizeTitleStem("local listings - Design Prism")).toBe("Local listings")
  })

  it("builds absolute titles with exactly one Prism suffix", () => {
    const title = buildAbsoluteTitle("custom email for dental practices | prism")
    const suffixCount = (title.match(/\|\s*Prism/gi) || []).length

    expect(title.endsWith(BRAND_SUFFIX)).toBe(true)
    expect(suffixCount).toBe(1)
  })

  it("normalizes descriptions to sentence case and trims to configured max length", () => {
    const longDescription =
      "this is a very long description ".repeat(20) +
      "with a trailing phrase that should not overflow"

    const normalized = normalizeDescription(longDescription)

    expect(normalized[0]).toBe(normalized[0].toUpperCase())
    expect(normalized.length).toBeLessThanOrEqual(DESCRIPTION_MAX_LENGTH)
    expect(normalized.endsWith(" ")).toBe(false)
  })
})

describe("buildRouteMetadata", () => {
  it("returns canonical/open graph/twitter/robots fields with normalized values", () => {
    const metadata = buildRouteMetadata({
      titleStem: "pricing | prism",
      description: "simple pricing for local growth teams",
      path: "/pricing",
      index: false,
      ogImage: "/pricing-og.png",
    })
    const ogImages = Array.isArray(metadata.openGraph?.images)
      ? metadata.openGraph.images
      : metadata.openGraph?.images
      ? [metadata.openGraph.images]
      : []

    expect(metadata.title).toEqual({ absolute: "Pricing | Prism" })
    expect(metadata.description).toBe("Simple pricing for local growth teams")
    expect(metadata.alternates?.canonical).toBe("https://www.design-prism.com/pricing")
    expect(ogImages[0]).toMatchObject({ url: "/pricing-og.png" })
    expect(metadata.twitter?.images).toEqual(["/pricing-og.png"])
    expect(metadata.robots).toEqual({ index: false, follow: false })
  })
})
