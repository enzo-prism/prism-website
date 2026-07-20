import { render } from '@testing-library/react'

import PurchaseSuccessTracker from '@/components/thank-you/PurchaseSuccessTracker'

const trackPurchase = jest.fn()
const applyStoredEnhancedConversionUserData = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackPurchase: (...args: Array<unknown>) => trackPurchase(...args),
  applyStoredEnhancedConversionUserData: (...args: Array<unknown>) =>
    applyStoredEnhancedConversionUserData(...args),
}))

describe('PurchaseSuccessTracker', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('reports the purchase using the Stripe session id as the transaction id', () => {
    render(
      <PurchaseSuccessTracker
        transactionId="cs_live_a1b2c3d4e5"
        value={300}
        itemId="website"
        itemName="Website by Prism"
      />,
    )

    expect(trackPurchase).toHaveBeenCalledWith({
      transaction_id: 'cs_live_a1b2c3d4e5',
      value: 300,
      currency: 'USD',
      item_id: 'website',
      item_name: 'Website by Prism',
    })
  })

  it('does not report a purchase when the confirmation URL has no session id', () => {
    // Someone reached the page directly rather than through checkout. Firing
    // here would invent revenue and poison Google Ads bidding.
    render(<PurchaseSuccessTracker value={300} />)

    expect(trackPurchase).not.toHaveBeenCalled()
  })

  it('reports once per mount, not once per render', () => {
    const { rerender } = render(
      <PurchaseSuccessTracker transactionId="cs_live_stable12345" value={300} />,
    )
    rerender(
      <PurchaseSuccessTracker transactionId="cs_live_stable12345" value={300} />,
    )

    expect(trackPurchase).toHaveBeenCalledTimes(1)
  })

  it.each([
    ['a forged sequential id', '1'],
    ['an arbitrary string', 'free-money'],
    ['a plausible-looking but malformed id', 'cs_live_'],
    ['a wrong-prefix id', 'pi_live_a1b2c3d4e5f6'],
    ['an email', 'jane@example.com'],
  ])('refuses to report a purchase for %s', (_label, forgedId) => {
    // Without shape validation, anyone could load
    // /checkout/website/thank-you?session_id=1, then =2, =3 … and mint
    // unlimited $300 purchase conversions, since each distinct string
    // defeats the de-duplication guard.
    render(<PurchaseSuccessTracker transactionId={forgedId} value={300} />)

    expect(trackPurchase).not.toHaveBeenCalled()
  })

  it('re-applies stored enhanced conversion hashes before reporting', () => {
    // gtag `set` is page-scoped and this page is a fresh document after the
    // cross-origin Stripe redirect, so the hashes must be re-applied — and
    // `set` only affects subsequent events, so ordering matters.
    render(
      <PurchaseSuccessTracker transactionId="cs_live_a1b2c3d4e5" value={300} />,
    )

    expect(applyStoredEnhancedConversionUserData).toHaveBeenCalled()
    expect(
      applyStoredEnhancedConversionUserData.mock.invocationCallOrder[0],
    ).toBeLessThan(trackPurchase.mock.invocationCallOrder[0])
  })

  it('renders nothing', () => {
    const { container } = render(
      <PurchaseSuccessTracker transactionId="cs_live_x1y2z3a4b5" value={300} />,
    )

    expect(container).toBeEmptyDOMElement()
  })
})
