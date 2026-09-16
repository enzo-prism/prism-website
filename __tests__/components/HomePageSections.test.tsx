import { render, screen } from '@testing-library/react'

import ClientPage from '@/app/client-page'
import { getWaitlistIntakeMonth } from '@/lib/waitlist'

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    prefetch: _prefetch,
    ...props
  }: {
    href: string | { pathname?: string }
    children: React.ReactNode
    prefetch?: boolean
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

jest.mock('@/components/navbar', () => ({
  __esModule: true,
  default: function MockNavbar() {
    return <nav data-testid="mock-navbar" />
  },
}))

jest.mock('@/components/footer', () => ({
  __esModule: true,
  default: function MockFooter() {
    return <footer data-testid="mock-footer" />
  },
}))

jest.mock('@/components/home/DeferredAsciiHeroBackdrop', () => ({
  __esModule: true,
  default: function MockDeferredAsciiHeroBackdrop() {
    return <div data-testid="home-hero-ascii-backdrop" />
  },
}))

describe('ClientPage homepage flow', () => {
  it('renders the current growth-first homepage section headings', () => {
    render(<ClientPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /^your growth team\.$/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /website\. content\. ads\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /meet the businesses we’ve helped/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /give people a reason to choose you\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /your marketing, working together\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /a clear plan\. real work\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /run your business\. we’ll help it grow\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /^how it works$/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /see what we’ve built/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: new RegExp(
          `^prism is fully booked\\. save your ${getWaitlistIntakeMonth().month} spot\\.$`,
          'i',
        ),
      }),
    ).toBeInTheDocument()
    const waitlistLinks = screen.getAllByRole('link', {
      name: /join the waitlist/i,
    })
    expect(waitlistLinks.length).toBeGreaterThanOrEqual(4)
    expect(
      waitlistLinks.some((link) => link.getAttribute('href') === '/waitlist'),
    ).toBe(true)
    expect(
      waitlistLinks.some(
        (link) => link.getAttribute('href') === '/waitlist?focus=website',
      ),
    ).toBe(true)
    expect(
      screen.queryByRole('link', { name: /start my website/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /book a free demo/i }),
    ).not.toBeInTheDocument()
  })

  it('renders icon-backed problem blocks and buyer check pills', () => {
    render(<ClientPage />)

    const problemPoints = screen.getAllByTestId('home-problem-point')
    const stackItems = screen.getAllByTestId('home-problem-stack-item')

    expect(problemPoints).toHaveLength(4)
    expect(stackItems).toHaveLength(4)
    expect(
      problemPoints.every((point) => point.querySelector('img')),
    ).toBeTruthy()
    expect(stackItems.every((item) => item.querySelector('img'))).toBeTruthy()
    expect(
      new Set(
        stackItems.map((item) =>
          item.querySelector('img')?.getAttribute('src'),
        ),
      ).size,
    ).toBe(4)
    expect(screen.getByText(/what buyers check/i)).toBeInTheDocument()
    expect(screen.queryAllByTestId('home-ai-tool-card')).toHaveLength(0)
  })

  it('renders the system, fit, and proof card grids', () => {
    const { container } = render(<ClientPage />)

    expect(container.querySelectorAll('[data-home-service-card]')).toHaveLength(
      8,
    )
    expect(container.querySelectorAll('[data-home-fit-card]')).toHaveLength(3)
    expect(
      container.querySelectorAll('[data-home-proof-card]').length,
    ).toBeGreaterThanOrEqual(8)
  })
})
