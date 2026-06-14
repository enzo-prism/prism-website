import { render } from "@testing-library/react"

import { ServiceSchema } from "@/components/schema-markup"

describe("ServiceSchema", () => {
  it("does not emit Review snippet rating markup for Service nodes", () => {
    const { container } = render(
      <ServiceSchema
        serviceId="local-seo-agency"
        name="Local SEO agency"
        description="Local SEO services for small businesses."
        aggregateRating={{
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "200",
        }}
      />,
    )

    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeTruthy()

    const data = JSON.parse(script?.textContent || "{}") as Record<string, unknown>
    expect(data["@type"]).toBe("Service")
    expect(data.aggregateRating).toBeUndefined()
  })
})
