import { collectPricingConsistencyViolations } from '@/lib/pricing-consistency'

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

  it('requires the current call-first pricing snippets', () => {
    const violations = collectPricingConsistencyViolations(
      'lib/pricing-model.ts',
      'BOOK_A_CALL_CTA. Book a Free Demo. NO offer shows public exact pricing.',
    )

    expect(violations).toEqual([])
  })

  it('flags retired public prices for the call-first offers on strict surfaces', () => {
    const violations = collectPricingConsistencyViolations(
      'app/pricing/client-page.tsx',
      'Content OS is $5,000 then $1,000/month, Prism Infinity is $2,000/month.',
    )

    expect(violations.map((violation) => violation.label)).toEqual(
      expect.arrayContaining([
        expect.stringContaining('$5,000'),
        expect.stringContaining('$1,000/month'),
        expect.stringContaining('$2,000/month'),
      ]),
    )
  })

  it('allows the call-first PRO website copy on /websites and flags any $ price', () => {
    expect(
      collectPricingConsistencyViolations(
        'app/websites/page.tsx',
        'Prism PRO website. BOOK_A_CALL_CTA. Support discovery on Google and in AI.',
      ),
    ).toEqual([])

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
