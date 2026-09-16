import { render, screen } from '@testing-library/react'

import WaitlistProofStrip from '@/components/waitlist/WaitlistProofStrip'
import {
  CONNECTED_CLIENT_TRAFFIC,
  SOCIAL_PROOF,
} from '@/lib/proof-metrics'

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    ...props
  }: {
    href: string | { pathname?: string }
    children: React.ReactNode
    [key: string]: unknown
  }) {
    return (
      <a
        href={typeof href === 'string' ? href : (href?.pathname ?? '')}
        {...props}
      >
        {children}
      </a>
    )
  },
}))

describe('WaitlistProofStrip', () => {
  it('shows canonical proof numbers and the wall of love path', () => {
    const { container } = render(<WaitlistProofStrip />)

    const strip = container.querySelector('[data-waitlist-proof="strip"]')
    expect(strip).toHaveTextContent(
      `${SOCIAL_PROOF.combinedAudience} followers`,
    )
    expect(strip).toHaveTextContent(
      `${CONNECTED_CLIENT_TRAFFIC.newUsers.toLocaleString('en-US')} new users across ${CONNECTED_CLIENT_TRAFFIC.connectedSites} connected client sites in ${CONNECTED_CLIENT_TRAFFIC.month}`,
    )
    expect(
      screen.getByRole('link', { name: /see why clients love prism/i }),
    ).toHaveAttribute('href', '/wall-of-love')
  })
})
