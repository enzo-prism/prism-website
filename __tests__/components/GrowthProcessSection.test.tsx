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
      name: /create the free growth dashboard/i,
    })

    expect(submitCardLink).toHaveAttribute('href', '/apply')
    expect(
      screen
        .getByRole('heading', { level: 2, name: /create growth dashboard/i })
        .closest('a'),
    ).toBe(submitCardLink)
    expect(
      screen
        .getByRole('heading', {
          level: 2,
          name: /receive light audit/i,
        })
        .closest('a'),
    ).toBeNull()
    expect(
      screen
        .getByRole('heading', { level: 2, name: /choose the clear next step/i })
        .closest('a'),
    ).toBeNull()

    fireEvent.click(submitCardLink)

    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/apply',
      'create free growth dashboard from process card',
      'get started process card',
    )
  })

  it('keeps the final Light Audit handoff short and speed-focused', () => {
    render(<GrowthProcessSection />)

    expect(
      screen.getByText(/ready for the light audit\?/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('group', {
        name: /takes about one minute to complete\. quick and easy\./i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/min to complete/i)).toBeInTheDocument()
    expect(screen.getByText(/quick \+ easy/i)).toBeInTheDocument()
    expect(
      screen.queryByText(/start with one short dashboard intake\./i),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(/dashboard first\. deep growth audit if it fits\./i),
    ).not.toBeInTheDocument()
  })
})
