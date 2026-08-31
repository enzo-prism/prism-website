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
        'https://x.com/NosisTheGod',
        'https://www.tiktok.com/@the_design_prism',
        'https://www.linkedin.com/company/web-prism',
      ]),
    )
    expect(organization.hasPart).toEqual(
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

    expect(organization.makesOffer).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Dental OS',
          url: 'https://www.design-prism.com/dental-os',
        }),
      ]),
    )
    expect(localBusiness).toBeUndefined()
  })
})
