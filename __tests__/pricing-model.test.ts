import {
  CANONICAL_PRICING_OFFERS,
  CONTENT_OS_MONTHLY_PRICE,
  CONTENT_OS_PRICE_LABEL,
  CONTENT_OS_SETUP_PRICE,
  DENTAL_OS_PRICE_LABEL,
  PRICING_OFFER_ORDER,
  PRICING_PRIMARY_CTA,
  PRISM_INFINITY_MONTHLY_PRICE,
  PRISM_INFINITY_PRICE_LABEL,
  WEBSITE_CARE_MONTHLY_PRICE,
  WEBSITE_PRICE,
  WEBSITE_PRICE_LABEL,
} from "@/lib/pricing-model"

describe("pricing model", () => {
  it("exports canonical numeric prices", () => {
    expect(WEBSITE_PRICE).toBe(300)
    expect(WEBSITE_CARE_MONTHLY_PRICE).toBe(100)
    expect(CONTENT_OS_SETUP_PRICE).toBe(5000)
    expect(CONTENT_OS_MONTHLY_PRICE).toBe(1000)
    expect(PRISM_INFINITY_MONTHLY_PRICE).toBe(2000)
  })

  it("exports canonical display labels", () => {
    expect(WEBSITE_PRICE_LABEL).toBe("$300 one-time")
    expect(CONTENT_OS_PRICE_LABEL).toBe("$5,000 + $1,000/month")
    expect(PRISM_INFINITY_PRICE_LABEL).toBe("$2,000/month")
    expect(DENTAL_OS_PRICE_LABEL).toBe("Built around your practice")
  })

  it("models the four productized offers in canonical order", () => {
    expect(PRICING_OFFER_ORDER).toEqual([
      "website",
      "content_os",
      "dental_os",
      "prism_infinity",
    ])
    expect(CANONICAL_PRICING_OFFERS.website.price).toBe(WEBSITE_PRICE)
    expect(CANONICAL_PRICING_OFFERS.website.monthlyPrice).toBe(
      WEBSITE_CARE_MONTHLY_PRICE,
    )
    expect(CANONICAL_PRICING_OFFERS.content_os.price).toBe(CONTENT_OS_SETUP_PRICE)
    expect(CANONICAL_PRICING_OFFERS.content_os.monthlyPrice).toBe(
      CONTENT_OS_MONTHLY_PRICE,
    )
    expect(CANONICAL_PRICING_OFFERS.dental_os.priceKind).toBe("custom")
    expect(CANONICAL_PRICING_OFFERS.prism_infinity.price).toBe(
      PRISM_INFINITY_MONTHLY_PRICE,
    )
  })

  it("points the pricing primary CTA at the website order flow", () => {
    expect(PRICING_PRIMARY_CTA).toMatchObject({
      label: "Order your website — $300",
      href: "/websites",
    })
  })
})
