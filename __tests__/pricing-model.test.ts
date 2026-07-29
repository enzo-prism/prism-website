import {
  BOOK_A_CALL_CTA,
  CANONICAL_PRICING_OFFERS,
  CONTENT_OS_PRICE_LABEL,
  DENTAL_OS_PRICE_LABEL,
  PRICING_OFFER_ORDER,
  PRICING_PRIMARY_CTA,
  PRISM_INFINITY_PRICE_LABEL,
  WEBSITE_PRICE_LABEL,
} from "@/lib/pricing-model"
import { BOOKING_URL } from "@/lib/booking"

const ALL_OFFER_IDS = [
  "website",
  "content_os",
  "dental_os",
  "prism_infinity",
] as const

describe("pricing model", () => {
  it("exports canonical display labels with no public dollar amounts", () => {
    expect(WEBSITE_PRICE_LABEL).toBe("Custom — scoped on a call")
    expect(CONTENT_OS_PRICE_LABEL).toBe("Custom — scoped on a call")
    expect(PRISM_INFINITY_PRICE_LABEL).toBe("Custom — scoped on a call")
    expect(DENTAL_OS_PRICE_LABEL).toBe("Built around your practice")
  })

  it("keeps every offer call-first: no public price on any offer", () => {
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

  it("points every primary CTA at the 30-min booking link", () => {
    expect(BOOK_A_CALL_CTA).toMatchObject({
      label: "Book a Free Demo",
      href: BOOKING_URL,
    })
    expect(BOOKING_URL).toMatch(/^https:\/\/calendar\.notion\.so\//)
    for (const offerId of ALL_OFFER_IDS) {
      expect(CANONICAL_PRICING_OFFERS[offerId].primaryCta).toEqual(
        BOOK_A_CALL_CTA,
      )
    }
    expect(PRICING_PRIMARY_CTA).toEqual(BOOK_A_CALL_CTA)
  })

  it("keeps an internal explore link for every offer page", () => {
    expect(CANONICAL_PRICING_OFFERS.website.secondaryCta?.href).toBe(
      "/websites",
    )
    expect(CANONICAL_PRICING_OFFERS.content_os.secondaryCta?.href).toBe(
      "/content-os",
    )
    expect(CANONICAL_PRICING_OFFERS.dental_os.secondaryCta?.href).toBe(
      "/dental-os",
    )
    expect(CANONICAL_PRICING_OFFERS.prism_infinity.secondaryCta?.href).toBe(
      "/prism-infinity",
    )
  })
})
