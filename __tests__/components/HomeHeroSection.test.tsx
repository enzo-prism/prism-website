import { render, screen } from '@testing-library/react'

import HomeHeroSection from '@/components/home/HomeHeroSection'

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

jest.mock('@/components/home/DeferredAsciiHeroBackdrop', () => ({
  __esModule: true,
  default: function MockDeferredAsciiHeroBackdrop() {
    return <div data-testid="home-hero-ascii-backdrop" />
  },
}))

describe('HomeHeroSection', () => {
  it('renders the homepage hero copy and tracked CTA destinations', () => {
    render(<HomeHeroSection />)

    expect(screen.getByTestId('home-hero-ascii-backdrop')).toBeInTheDocument()
    expect(screen.getByText(/more visibility/i)).toBeInTheDocument()
    expect(screen.getByText(/more leads/i)).toBeInTheDocument()
    expect(screen.getByText(/more customers/i)).toBeInTheDocument()
    expect(screen.getByText(/less stress/i)).toBeInTheDocument()
    expect(screen.getByText(/one trusted partner/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /growth, handled for you\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/we handle the tech\. you run the business\./i),
    ).toBeInTheDocument()
    expect(screen.getByTestId('home-hero-social-proof')).toHaveTextContent(
      /5 stars from 20\+ business owners/i,
    )
    expect(screen.getByLabelText(/5 star rating/i)).toBeInTheDocument()

    const supportPoints = screen.getAllByTestId('home-hero-support-point')
    const iconSrcs = supportPoints.map((point) =>
      point.querySelector('img')?.getAttribute('src'),
    )

    expect(supportPoints).toHaveLength(5)
    expect(new Set(iconSrcs).size).toBe(5)

    expect(
      screen.getByRole('link', { name: /get a free growth plan/i }),
    ).toHaveAttribute(
      'href',
      '/get-started',
    )
    expect(
      screen.getByRole('link', { name: /see how it works/i }),
    ).toHaveAttribute(
      'href',
      '/#how-it-works',
    )

    expect(screen.getByRole('link', { name: /wall of love/i })).toHaveAttribute(
      'href',
      '/wall-of-love',
    )
  })

  it('does not render the retired image-led hero treatment', () => {
    render(<HomeHeroSection />)

    expect(
      screen.queryByAltText(/layered paper sculpture composition/i),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(/handcrafted paper composition/i),
    ).not.toBeInTheDocument()
  })
})
