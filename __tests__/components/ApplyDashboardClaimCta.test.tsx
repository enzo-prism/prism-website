import { render, screen, waitFor } from '@testing-library/react'

import ApplyDashboardClaimCta from '@/components/thank-you/ApplyDashboardClaimCta'

const readApplyDashboardClaimUrl = jest.fn()

jest.mock('@/lib/dashboard-claim', () => ({
  readApplyDashboardClaimUrl: () => readApplyDashboardClaimUrl(),
}))

describe('ApplyDashboardClaimCta', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the dashboard claim CTA when a claim URL is stored', async () => {
    readApplyDashboardClaimUrl.mockReturnValue(
      'https://dashboard.design-prism.com/claim/token_123',
    )

    render(<ApplyDashboardClaimCta />)

    await waitFor(() => {
      expect(
        screen.getByRole('link', { name: /claim dashboard/i }),
      ).toHaveAttribute(
        'href',
        'https://dashboard.design-prism.com/claim/token_123',
      )
    })
    expect(screen.getByText(/your private dashboard is ready/i)).toBeInTheDocument()
    expect(screen.getByText(/same link is in your inbox/i)).toBeInTheDocument()
  })

  it('renders nothing when no claim URL is stored', async () => {
    readApplyDashboardClaimUrl.mockReturnValue(null)

    const { container } = render(<ApplyDashboardClaimCta />)

    await waitFor(() => {
      expect(readApplyDashboardClaimUrl).toHaveBeenCalledTimes(1)
    })
    expect(container).toBeEmptyDOMElement()
  })
})
