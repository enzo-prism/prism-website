import { render } from '@testing-library/react'

import { GlobalSchemaGraph } from '@/components/schema-markup'

describe('GlobalSchemaGraph', () => {
  it('renders Organization JSON-LD with required fields', () => {
    const { container } = render(<GlobalSchemaGraph />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeTruthy()

    const data = JSON.parse(script?.textContent || '[]') as any
    const nodes = Array.isArray(data) ? data : [data]
    const organization = nodes.find((node) => node['@type'] === 'Organization')
    const localBusiness = nodes.find(
      (node) => node['@type'] === 'LocalBusiness',
    )

    expect(organization).toBeTruthy()
    expect(organization.name).toBe('Prism')
    expect(organization.url).toBe('https://www.design-prism.com')
    expect(organization.logo).toContain('prism-logo.jpeg')
    expect(organization.sameAs).toEqual(
      expect.arrayContaining([
        'https://www.instagram.com/the_design_prism/',
        'https://www.youtube.com/@the_design_prism',
        'https://www.tiktok.com/@the_design_prism',
        'https://www.linkedin.com/company/web-prism',
      ]),
    )
    expect(nodes.find((node) => node['@type'] === 'WebSite').hasPart).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: 'https://www.design-prism.com/case-studies',
        }),
        expect.objectContaining({
          url: 'https://www.design-prism.com/proof',
        }),
        expect.objectContaining({
          url: 'https://www.design-prism.com/wall-of-love',
        }),
      ]),
    )
    expect(organization.hasPart).toBeUndefined()
    expect(organization.sameAs).not.toContain('https://x.com/NosisTheGod')
    expect(organization.founder.sameAs).toContain('https://x.com/NosisTheGod')
    expect(organization.subjectOf).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: 'https://www.design-prism.com/case-studies/dr-christopher-wong',
        }),
        expect.objectContaining({
          url: 'https://www.design-prism.com/case-studies/roseville-dental-academy',
        }),
      ]),
    )

    // Exactly the three services, price-free.
    expect(
      organization.makesOffer.map((offer: { name: string; url: string }) => [
        offer.name,
        offer.url,
      ]),
    ).toEqual([
      ['Websites', 'https://www.design-prism.com/websites'],
      ['Content', 'https://www.design-prism.com/content'],
      ['Ads', 'https://www.design-prism.com/ads'],
    ])
    for (const offer of organization.makesOffer) {
      expect(offer.price).toBeUndefined()
      expect(offer.priceSpecification).toBeUndefined()
    }
    expect(JSON.stringify(nodes)).not.toMatch(
      /dental os|prism infinity|\/dental-os|\/prism-infinity/i,
    )
    expect(localBusiness).toBeUndefined()
  })
})
