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
    expect(
      screen.getByRole('link', { name: /order a website/i }),
    ).toHaveAttribute('href', '/websites')
    expect(screen.getByRole('link', { name: /^pricing$/i })).toHaveAttribute(
      'href',
      '/pricing',
    )
    expect(screen.queryByText(/book a 30-min call/i)).not.toBeInTheDocument()
  })

  it('keeps the dual CTA grammar pointing at the conversion paths', () => {
    render(<Footer />)

    expect(
      screen.getByRole('link', { name: /get started free/i }),
    ).toHaveAttribute('href', '/get-started')
  })

  it('renders the brand lockup and copyright line', () => {
    render(<Footer />)

    const year = new Date().getFullYear()
    expect(screen.getByText('prism')).toBeInTheDocument()
    expect(screen.getByText(/impossible is temporary/i)).toBeInTheDocument()
    expect(
      screen.getByText(new RegExp(`Prism © 2023-${year}\\.`, 'i')),
    ).toBeInTheDocument()
  })

  it('exposes accessible, new-tab social links', () => {
    render(<Footer />)

    const instagram = screen.getByRole('link', { name: /prism on instagram/i })
    expect(instagram).toHaveAttribute(
      'href',
      'https://www.instagram.com/the_design_prism/',
    )
    expect(instagram).toHaveAttribute('target', '_blank')
    expect(instagram).toHaveAttribute('rel', 'noopener noreferrer')

    expect(
      screen.getByRole('link', { name: /prism on linkedin/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /prism on x/i }),
    ).toBeInTheDocument()
  })

  it('renders the legal link row', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: /^privacy$/i })).toHaveAttribute(
      'href',
      '/privacy-policy',
    )
    expect(screen.getByRole('link', { name: /^terms$/i })).toHaveAttribute(
      'href',
      '/terms-of-service',
    )
  })
})
