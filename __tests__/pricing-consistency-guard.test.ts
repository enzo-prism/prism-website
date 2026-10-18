import fs from 'node:fs'
import path from 'node:path'

import {
  PRICING_STRICT_FILES,
  collectPricingConsistencyViolations,
} from '@/lib/pricing-consistency'

describe('pricing consistency guard', () => {
  it('flags legacy pricing token on strict surfaces', () => {
    const violations = collectPricingConsistencyViolations(
      'app/pricing/client-page.tsx',
      'Legacy offer at $900/mo.',
    )
    expect(violations.length).toBeGreaterThan(0)
    expect(violations[0]?.label).toContain('$900/mo')
  })

  it('flags retired canonical offer language on strict surfaces', () => {
    const violations = collectPricingConsistencyViolations(
      'app/pricing/client-page.tsx',
      'Website Overhaul at $1,000 one-time.',
    )

    expect(violations.map((violation) => violation.label)).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Website Overhaul'),
        expect.stringContaining('$1,000 one-time'),
      ]),
    )
  })

  it('requires the current waitlist pricing snippets', () => {
    const violations = collectPricingConsistencyViolations(
      'lib/pricing-model.ts',
      'WAITLIST_CTA. Prism is at capacity. NO offer shows public exact pricing.',
    )

    expect(violations).toEqual([])
  })

  it('flags retired public prices for the call-first offers on strict surfaces', () => {
    const violations = collectPricingConsistencyViolations(
      'app/pricing/client-page.tsx',
      'Content was $5,000 then $1,000/month, the creative subscription was $2,000/month.',
    )

    expect(violations.map((violation) => violation.label)).toEqual(
      expect.arrayContaining([
        expect.stringContaining('$5,000'),
        expect.stringContaining('$1,000/month'),
        expect.stringContaining('$2,000/month'),
      ]),
    )
  })

  it('allows the waitlist PRO website copy on /websites and flags any $ price', () => {
    expect(
      collectPricingConsistencyViolations(
        'app/websites/page.tsx',
        'Prism PRO website. WEBSITE_WAITLIST_CTA. Support discovery on Google and in AI.',
      ),
    ).toEqual([])

    expect(
      collectPricingConsistencyViolations(
        'app/websites/page.tsx',
        'Prism PRO website. WEBSITE_WAITLIST_CTA. Support discovery on Google and in AI. <a href="/website-intake">Start my website</a> BOOK_A_CALL_CTA',
      ).map((violation) => violation.label),
    ).toEqual(
      expect.arrayContaining([
        expect.stringContaining('BOOK_A_CALL_CTA'),
        expect.stringContaining('Start my website'),
        expect.stringContaining('retired service intake route'),
      ]),
    )

    const violations = collectPricingConsistencyViolations(
      'app/websites/page.tsx',
      'Prism PRO website. BOOK_A_CALL_CTA. Support discovery on Google and in AI. A website for $300 flat with $100/month care.',
    )
    expect(violations.map((violation) => violation.label)).toEqual(
      expect.arrayContaining([
        expect.stringContaining('$300'),
        expect.stringContaining('$100/month'),
      ]),
    )
  })

  it('flags the retired packaged offers on strict surfaces but allows redirect sources', () => {
    const labels = collectPricingConsistencyViolations(
      'app/pricing/client-page.tsx',
      [
        "name: 'Dental OS',",
        "title: 'Prism Infinity',",
        "href: '/dental-os',",
        "url: 'https://www.design-prism.com/prism-infinity',",
      ].join('\n'),
    ).map((violation) => violation.label)

    expect(labels).toEqual(
      expect.arrayContaining([
        expect.stringContaining('Dental OS retired offer name'),
        expect.stringContaining('Prism Infinity retired offer name'),
        expect.stringContaining('retired offer route'),
      ]),
    )
    expect(
      labels.filter((label) => label.includes('retired offer route')),
    ).toHaveLength(2)

    expect(
      collectPricingConsistencyViolations(
        'next.config.mjs',
        "{ source: '/dental-os', destination: '/dental-website', permanent: true },\n{ source: '/prism-infinity', destination: '/content', permanent: true },",
      ),
    ).toEqual([])
    expect(
      collectPricingConsistencyViolations(
        'next.config.mjs',
        "{ source: '/old', destination: '/dental-os', permanent: true },",
      ).map((violation) => violation.label),
    ).toEqual([expect.stringContaining('retired offer route')])
  })

  it('holds the /aeo service page to the strict, price-free waitlist rules', () => {
    expect(PRICING_STRICT_FILES).toContain('app/aeo/page.tsx')

    const source = fs.readFileSync(
      path.join(process.cwd(), 'app/aeo/page.tsx'),
      'utf8',
    )
    expect(
      collectPricingConsistencyViolations('app/aeo/page.tsx', source),
    ).toEqual([])

    // The required snippets name the product, the AEO waitlist CTA, and the
    // no-guarantee answer.
    expect(
      collectPricingConsistencyViolations(
        'app/aeo/page.tsx',
        'An AEO page at $900/mo.',
      ).map((violation) => violation.label),
    ).toEqual(
      expect.arrayContaining([
        expect.stringContaining('$900/mo'),
        'missing canonical snippet: Prism AEO',
        'missing canonical snippet: AEO_WAITLIST_CTA',
        'missing canonical snippet: no one can',
      ]),
    )
  })

  it('accepts contextual non-core prices when context labels are present', () => {
    const content = [
      'Ad fee examples for local service lines.',
      'These are not Prism core pricing.',
      'Example starter fee: $900/mo.',
    ].join('\n')

    const violations = collectPricingConsistencyViolations(
      'app/google/dental-ads/page.tsx',
      content,
    )

    expect(violations).toEqual([])
  })
})
