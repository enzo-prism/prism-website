import { render } from "@testing-library/react"

import { CaseStudySchema } from "@/components/schema-markup"

describe("CaseStudySchema", () => {
  it("exposes verified client metrics as machine-readable Article evidence", () => {
    const { container } = render(
      <CaseStudySchema
        title="Example client case study"
        description="Measured Prism case study."
        url="https://www.design-prism.com/case-studies/example"
        clientName="Example Client"
        clientUrl="https://example.com"
        industry="Dentistry"
        location="Palo Alto, CA"
        scope="Website, SEO, analytics"
        outcome="+142% Google Search impressions year over year."
        results={[
          {
            value: "+142%",
            label: "Google Search impressions, year over year",
            detail:
              "Google Search Console: Mar-May 2025 vs Mar-May 2026.",
            sourceName: "Google Search Console",
            dateRange: "Mar-May 2025 vs Mar-May 2026",
          },
        ]}
      />,
    )

    const script = container.querySelector('script[type="application/ld+json"]')
    const nodes = JSON.parse(script?.textContent || "[]") as any[]
    const article = nodes.find((node) => node["@type"] === "Article")

    expect(article).toMatchObject({
      "@id": "https://www.design-prism.com/case-studies/example#article",
      abstract: "+142% Google Search impressions year over year.",
      about: {
        name: "Example Client",
        url: "https://example.com",
      },
    })
    expect(article.keywords).toEqual(
      expect.arrayContaining(["Dentistry", "Palo Alto, CA"]),
    )
    expect(article.citation).toEqual(
      expect.arrayContaining([
        "Google Search Console: Mar-May 2025 vs Mar-May 2026.",
      ]),
    )
    expect(article.mentions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "+142% Google Search impressions, year over year",
          measurementTechnique: "Google Search Console",
          temporalCoverage: "Mar-May 2025 vs Mar-May 2026",
        }),
      ]),
    )
  })
})
