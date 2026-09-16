import { render, screen } from '@testing-library/react'

import CapacityNotice from '@/components/waitlist/CapacityNotice'
import { getWaitlistIntakeMonth } from '@/lib/waitlist'

describe('CapacityNotice', () => {
  it('renders the inline demand signal with the live intake month', () => {
    const { container } = render(<CapacityNotice />)
    const intakeMonth = getWaitlistIntakeMonth().month

    const notice = container.querySelector('[data-capacity-notice="inline"]')
    expect(notice).toHaveAttribute('role', 'status')
    expect(notice).toHaveTextContent('Prism is fully booked right now.')
    expect(notice).toHaveTextContent(
      `Join the waitlist to work with us in ${intakeMonth}.`,
    )
    expect(
      screen.queryByText(/as space frees up|free up space/i),
    ).not.toBeInTheDocument()
  })

  it('renders the full panel with the demand eyebrow and first-pick tail', () => {
    const { container } = render(<CapacityNotice variant="panel" />)
    const intakeMonth = getWaitlistIntakeMonth().month

    const notice = container.querySelector('[data-capacity-notice="panel"]')
    expect(notice).toHaveAttribute('role', 'status')
    expect(notice).toHaveTextContent('In high demand')
    expect(notice).toHaveTextContent('Prism is fully booked right now.')
    expect(notice).toHaveTextContent(
      `Join the waitlist to work with us in ${intakeMonth}.`,
    )
    expect(notice).toHaveTextContent(
      'Spots open every month, and waitlist members get first pick.',
    )
  })
})
