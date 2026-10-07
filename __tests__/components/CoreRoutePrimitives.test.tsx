import { render, screen } from '@testing-library/react'

import { CoreActionLink } from '@/components/core-route/CoreRoutePrimitives'

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    className,
    ...props
  }: {
    href: string
    children: React.ReactNode
    className?: string
    [key: string]: unknown
  }) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  },
}))

jest.mock('@/components/tracked-link', () => ({
  __esModule: true,
  default: function MockTrackedLink({
    href,
    label,
    location,
    children,
    className,
    ...props
  }: {
    href: string
    label: string
    location: string
    children: React.ReactNode
    className?: string
    [key: string]: unknown
  }) {
    return (
      <a
        href={href}
        data-cta-label={label}
        data-cta-location={location}
        className={className}
        {...props}
      >
        {children}
      </a>
    )
  },
}))

describe('CoreActionLink', () => {
  it('renders the text-first primary action style by default', () => {
    render(<CoreActionLink href="/pricing">See plans</CoreActionLink>)

    const link = screen.getByRole('link', { name: /see plans/i })
    expect(link).toHaveAttribute('href', '/pricing')
    expect(link.className).toContain('border-b')
    expect(link.className).toContain('uppercase')
  })

  it('routes tracked actions through the tracked link boundary', () => {
    render(
      <CoreActionLink
        href="/waitlist"
        label="join the waitlist"
        location="pricing hero"
        variant="secondary"
      >
        Join the waitlist
      </CoreActionLink>,
    )

    const link = screen.getByRole('link', { name: /join the waitlist/i })
    expect(link).toHaveAttribute('href', '/waitlist')
    expect(link).toHaveAttribute('data-cta-label', 'join the waitlist')
    expect(link).toHaveAttribute('data-cta-location', 'pricing hero')
    expect(link.className).toContain('rounded-full')
  })
})
