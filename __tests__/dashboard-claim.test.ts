import { extractDashboardClaimUrl } from '@/lib/dashboard-claim'

describe('extractDashboardClaimUrl', () => {
  it('accepts the Prism dashboard claim host', () => {
    const claimUrl = 'https://dashboard.design-prism.com/claim/token_123'

    expect(extractDashboardClaimUrl({ dashboard: { claimUrl } })).toBe(claimUrl)
  })

  it.each([
    'https://evil.example/claim/token_123',
    'http://dashboard.design-prism.com/claim/token_123',
    'https://dashboard.design-prism.com/not-a-claim/token_123',
  ])('rejects an untrusted claim URL: %s', (claimUrl) => {
    expect(extractDashboardClaimUrl({ dashboard: { claimUrl } })).toBeNull()
  })
})
