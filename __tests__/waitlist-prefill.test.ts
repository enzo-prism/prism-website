import { getWaitlistPrefillHref, parseWaitlistPrefill } from '@/lib/waitlist'

describe('prefilled waitlist links', () => {
  it('reads focus, timing, and the business website', () => {
    expect(
      parseWaitlistPrefill({
        focus: 'aeo,website',
        timing: '1_3_months',
        website: 'https://example.com/about',
      }),
    ).toEqual({
      focus: ['aeo', 'website'],
      timing: '1_3_months',
      website: 'https://example.com/about',
    })
    expect(parseWaitlistPrefill({ website: 'example.com', timing: ['ASAP', 'exploring'] })).toEqual({
      focus: [],
      timing: 'asap',
      website: 'example.com',
    })
  })

  it('drops unknown or unsafe values', () => {
    expect(
      parseWaitlistPrefill({
        focus: 'not-sure,seo',
        timing: 'tomorrow',
        website: 'javascript:alert(1)',
      }),
    ).toEqual({ focus: [] })
    for (const website of ['not a url', 'jordan@example.com', `https://example.com/${'a'.repeat(220)}`, '<b>x.com</b>']) {
      expect(parseWaitlistPrefill({ website }).website).toBeUndefined()
    }
  })

  it('ignores personal details passed in the URL', () => {
    const prefill = parseWaitlistPrefill({
      focus: 'ads',
      first_name: 'Jordan',
      email: 'jordan@example.com',
    } as never)
    expect(prefill).toEqual({ focus: ['ads'] })
  })

  it('builds prefilled hrefs', () => {
    expect(getWaitlistPrefillHref({})).toBe('/waitlist')
    expect(
      getWaitlistPrefillHref({ focus: ['aeo', 'website'], timing: '3_6_months', website: 'example.com' }),
    ).toBe('/waitlist?focus=aeo,website&timing=3_6_months&website=example.com')
    const href = getWaitlistPrefillHref({ focus: ['content'], timing: 'asap', website: 'https://example.com/a b' })
    expect(parseWaitlistPrefill(Object.fromEntries(new URL(href, 'https://x.test').searchParams))).toEqual({
      focus: ['content'],
      timing: 'asap',
    })
  })
})
