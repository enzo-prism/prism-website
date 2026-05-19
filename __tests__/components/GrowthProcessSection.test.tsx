import { fireEvent, render, screen } from '@testing-library/react'

import GrowthProcessSection from '@/components/get-started/GrowthProcessSection'

const trackLinkInteraction = jest.fn()

jest.mock('@/utils/analytics', () => ({
  trackLinkInteraction: (...args: Array<unknown>) =>
    trackLinkInteraction(...args),
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

describe('GrowthProcessSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('links the submit-practice card to the first apply form step', () => {
    render(<GrowthProcessSection />)

    const submitCardLink = screen.getByRole('link', {
      name: /start the free practice audit form/i,
    })

    expect(submitCardLink).toHaveAttribute('href', '/apply')
    expect(
      screen
        .getByRole('heading', { level: 2, name: /submit your practice/i })
        .closest('a'),
    ).toBe(submitCardLink)
    expect(
      screen
        .getByRole('heading', {
          level: 2,
          name: /review the patient journey/i,
        })
        .closest('a'),
    ).toBeNull()
    expect(
      screen
        .getByRole('heading', { level: 2, name: /get a clear growth plan/i })
        .closest('a'),
    ).toBeNull()

    fireEvent.click(submitCardLink)

    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/apply',
      'start free audit from submit practice card',
      'get started process card',
    )
  })
})
