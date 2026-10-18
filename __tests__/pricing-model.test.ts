import {
  ADS_PRICE_LABEL,
  ADS_WAITLIST_CTA,
  AEO_PRICE_LABEL,
  AEO_WAITLIST_CTA,
  CANONICAL_PRICING_OFFERS,
  CONTENT_PRICE_LABEL,
  CONTENT_WAITLIST_CTA,
  PRICING_OFFER_ORDER,
  PRICING_PRIMARY_CTA,
  WEBSITE_PRICE_LABEL,
  WEBSITE_WAITLIST_CTA,
} from "@/lib/pricing-model"
import { PRISM_SERVICES } from "@/lib/services"
import { WAITLIST_CTA } from "@/lib/waitlist"

const ALL_OFFER_IDS = ["website", "content", "ads", "aeo"] as const

describe("pricing model", () => {
  it("fills the price slot with each offer's engagement shape, never a dollar amount", () => {
    expect(WEBSITE_PRICE_LABEL).toBe("One project, scoped to you")
    expect(CONTENT_PRICE_LABEL).toBe("3-month setup, then monthly")
    expect(ADS_PRICE_LABEL).toBe("Launch, then weekly tuning")
    // AEO: an audit first, then the same customer questions re-asked monthly.
    expect(AEO_PRICE_LABEL).toMatch(/^Audit, then monthly\b/)
    expect(CANONICAL_PRICING_OFFERS.aeo.priceLabel).toBe(AEO_PRICE_LABEL)

    for (const offerId of ALL_OFFER_IDS) {
      const { priceLabel } = CANONICAL_PRICING_OFFERS[offerId]
      expect(priceLabel).not.toMatch(/scoped from the waitlist/i)
      expect(priceLabel).not.toMatch(/\$|\/mo\b|\bfrom \d|\d+\s*(k|usd)\b/i)
    }
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

  it("models exactly four offers, one per service, in canonical order", () => {
    expect(PRICING_OFFER_ORDER).toEqual(["website", "content", "ads", "aeo"])
    expect(Object.keys(CANONICAL_PRICING_OFFERS).sort()).toEqual(
      [...ALL_OFFER_IDS].sort(),
    )
    expect(PRICING_OFFER_ORDER.map((id) => CANONICAL_PRICING_OFFERS[id].name)).toEqual([
      "Websites",
      "Content",
      "Ads",
      "AEO",
    ])
    // The offers are the services: same ids, same pages.
    expect(PRICING_OFFER_ORDER).toEqual(PRISM_SERVICES.map((service) => service.id))
  })

  it("never names or links the retired packaged offers", () => {
    const serialized = JSON.stringify(CANONICAL_PRICING_OFFERS)
    expect(serialized).not.toMatch(/dental os|prism infinity|content os/i)
    expect(serialized).not.toMatch(/\/dental-os|\/prism-infinity/)
  })

  it("points every primary CTA at the service's waitlist focus, never an external booking link", () => {
    expect(WAITLIST_CTA).toEqual({ label: "Join the waitlist", href: "/waitlist" })
    expect(PRICING_PRIMARY_CTA).toEqual(WAITLIST_CTA)

    for (const offerId of ALL_OFFER_IDS) {
      const { primaryCta } = CANONICAL_PRICING_OFFERS[offerId]
      expect(primaryCta.label).toBe("Join the waitlist")
      expect(primaryCta.href).toMatch(/^\/waitlist\?focus=(website|content|ads|aeo)$/)
    }

    expect(CANONICAL_PRICING_OFFERS.website.primaryCta).toEqual(
      WEBSITE_WAITLIST_CTA,
    )
    expect(CANONICAL_PRICING_OFFERS.content.primaryCta).toEqual(
      CONTENT_WAITLIST_CTA,
    )
    expect(CANONICAL_PRICING_OFFERS.ads.primaryCta).toEqual(ADS_WAITLIST_CTA)
    expect(CANONICAL_PRICING_OFFERS.aeo.primaryCta).toEqual(AEO_WAITLIST_CTA)
  })

  it("prefills the service focus on the service waitlist CTAs", () => {
    expect(WEBSITE_WAITLIST_CTA.href).toBe("/waitlist?focus=website")
    expect(CONTENT_WAITLIST_CTA.href).toBe("/waitlist?focus=content")
    expect(ADS_WAITLIST_CTA.href).toBe("/waitlist?focus=ads")
    expect(AEO_WAITLIST_CTA.href).toBe("/waitlist?focus=aeo")
  })

  it("keeps an internal explore link to each service page", () => {
    expect(CANONICAL_PRICING_OFFERS.website.secondaryCta?.href).toBe(
      "/websites",
    )
    expect(CANONICAL_PRICING_OFFERS.content.secondaryCta?.href).toBe(
      "/content",
    )
    expect(CANONICAL_PRICING_OFFERS.ads.secondaryCta?.href).toBe("/ads")
    expect(CANONICAL_PRICING_OFFERS.aeo.secondaryCta).toEqual({
      label: "Explore AEO",
      href: "/aeo",
    })
  })

  it("frames Ads around the campaigns, creative, and tracking the /ads page describes", () => {
    const { description } = CANONICAL_PRICING_OFFERS.ads
    expect(description).toMatch(/Google, Meta, TikTok, and Yelp/)
    expect(description).toMatch(/ad creative/)
    expect(description).toMatch(/tracking/)
    expect(description).not.toMatch(/guarantee/i)
  })

  it("frames AEO around the answer engines it covers, with no promised placement", () => {
    const { description, name } = CANONICAL_PRICING_OFFERS.aeo
    expect(name).toBe("AEO")
    expect(description).toMatch(/answer engine optimization/i)
    expect(description).toMatch(/ChatGPT/)
    expect(description).toMatch(/AI Overviews/)
    expect(description).toMatch(/Perplexity/)
    expect(description).not.toMatch(/guarantee/i)
  })
})
