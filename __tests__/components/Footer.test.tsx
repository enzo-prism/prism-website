import { render, screen } from '@testing-library/react'

import Footer from '@/components/footer'

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

describe('Footer', () => {
  it('uses the homepage footer treatment by default', () => {
    render(<Footer />)

    expect(
      screen.getByText(/conversion-first websites\. one growth system\./i),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /book call/i }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /free audit/i })).toHaveAttribute(
      'href',
      '/get-started',
    )
    expect(screen.getByRole('link', { name: /^pricing$/i })).toHaveAttribute(
      'href',
      '/pricing',
    )
    expect(screen.queryByText(/book a 30-min call/i)).not.toBeInTheDocument()
  })
})
