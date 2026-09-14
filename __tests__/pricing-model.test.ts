import {
  ADS_WAITLIST_CTA,
  CANONICAL_PRICING_OFFERS,
  CONTENT_OS_PRICE_LABEL,
  CONTENT_WAITLIST_CTA,
  DENTAL_OS_PRICE_LABEL,
  PRICING_OFFER_ORDER,
  PRICING_PRIMARY_CTA,
  PRISM_INFINITY_PRICE_LABEL,
  WEBSITE_PRICE_LABEL,
  WEBSITE_WAITLIST_CTA,
} from "@/lib/pricing-model"
import { WAITLIST_CTA } from "@/lib/waitlist"

const ALL_OFFER_IDS = [
  "website",
  "content_os",
  "dental_os",
  "prism_infinity",
] as const

describe("pricing model", () => {
  it("exports canonical display labels with no public dollar amounts", () => {
    expect(WEBSITE_PRICE_LABEL).toBe("Custom scope · waitlist")
    expect(CONTENT_OS_PRICE_LABEL).toBe("Custom scope · waitlist")
    expect(PRISM_INFINITY_PRICE_LABEL).toBe("Custom scope · waitlist")
    expect(DENTAL_OS_PRICE_LABEL).toBe("Built around your practice")
  })

  it("keeps every offer price-free: no public price on any offer", () => {
    for (const offerId of ALL_OFFER_IDS) {
      const offer = CANONICAL_PRICING_OFFERS[offerId]
      expect(offer.priceKind).toBe("custom")
      expect(offer.price).toBe(0)
      expect(offer.monthlyPrice).toBeUndefined()
      expect(offer.priceLabel).not.toMatch(/\$/)
      expect(offer.priceSubLabel ?? "").not.toMatch(/\$/)
      expect(offer.description).not.toMatch(/\$/)
    }
  })

  it("models the four productized offers in canonical order", () => {
    expect(PRICING_OFFER_ORDER).toEqual([
      "website",
      "content_os",
      "dental_os",
      "prism_infinity",
    ])
  })

  it("points every primary CTA at the waitlist, never an external booking link", () => {
    expect(WAITLIST_CTA).toEqual({ label: "Join the waitlist", href: "/waitlist" })
    expect(PRICING_PRIMARY_CTA).toEqual(WAITLIST_CTA)

    for (const offerId of ALL_OFFER_IDS) {
      const { primaryCta } = CANONICAL_PRICING_OFFERS[offerId]
      expect(primaryCta.label).toBe("Join the waitlist")
      expect(primaryCta.href).toMatch(/^\/waitlist(\?focus=(website|content|ads))?$/)
    }

    expect(CANONICAL_PRICING_OFFERS.website.primaryCta).toEqual(
      WEBSITE_WAITLIST_CTA,
    )
    expect(CANONICAL_PRICING_OFFERS.content_os.primaryCta).toEqual(
      CONTENT_WAITLIST_CTA,
    )
  })

  it("prefills the service focus on the service waitlist CTAs", () => {
    expect(WEBSITE_WAITLIST_CTA.href).toBe("/waitlist?focus=website")
    expect(CONTENT_WAITLIST_CTA.href).toBe("/waitlist?focus=content")
    expect(ADS_WAITLIST_CTA.href).toBe("/waitlist?focus=ads")
  })

  it("keeps an internal explore link for every offer page", () => {
    expect(CANONICAL_PRICING_OFFERS.website.secondaryCta?.href).toBe(
      "/websites",
    )
    expect(CANONICAL_PRICING_OFFERS.content_os.secondaryCta?.href).toBe(
      "/content",
    )
    expect(CANONICAL_PRICING_OFFERS.dental_os.secondaryCta?.href).toBe(
      "/dental-os",
    )
    expect(CANONICAL_PRICING_OFFERS.prism_infinity.secondaryCta?.href).toBe(
      "/prism-infinity",
    )
  })

  it("frames Prism Infinity around owner-valued growth deliverables", () => {
    expect(CANONICAL_PRICING_OFFERS.prism_infinity.description).toMatch(
      /landing pages/,
    )
    expect(CANONICAL_PRICING_OFFERS.prism_infinity.description).toMatch(
      /ad creative/,
    )
    expect(CANONICAL_PRICING_OFFERS.prism_infinity.description).not.toMatch(
      /business cards/i,
    )
    expect(CANONICAL_PRICING_OFFERS.prism_infinity.description).not.toMatch(
      /slide decks/i,
    )
  })
})
