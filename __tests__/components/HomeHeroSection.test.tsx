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
  default: function MockDeferredAsciiHeroBackdrop({
    className,
    focusScrimClassName,
    quality,
    scrimClassName,
    zoom,
  }: {
    className?: string
    focusScrimClassName?: string
    quality?: string
    scrimClassName?: string
    zoom?: number
  }) {
    return (
      <div
        data-testid="home-hero-ascii-backdrop"
        data-class-name={className}
        data-focus-scrim-class-name={focusScrimClassName}
        data-quality={quality}
        data-scrim-class-name={scrimClassName}
        data-zoom={zoom}
      />
    )
  },
}))

describe('HomeHeroSection', () => {
  it('renders the homepage hero copy and tracked CTA destinations', () => {
    render(<HomeHeroSection />)

    const heroBackdrop = screen.getByTestId('home-hero-ascii-backdrop')

    expect(heroBackdrop).toBeInTheDocument()
    expect(heroBackdrop).toHaveAttribute('data-quality', 'high')
    expect(heroBackdrop).toHaveAttribute('data-zoom', '0.84')
    expect(heroBackdrop.getAttribute('data-class-name')).toContain(
      '!opacity-[0.72]',
    )
    expect(heroBackdrop.getAttribute('data-class-name')).toContain(
      'md:!opacity-100',
    )
    expect(heroBackdrop.getAttribute('data-scrim-class-name')).toContain(
      'from-background/28',
    )
    expect(heroBackdrop.getAttribute('data-focus-scrim-class-name')).toContain(
      'ellipse_at_24%_48%',
    )

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /^prism$/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/the #1 growth partner for small businesses/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /one team that builds and runs everything that grows your business/i,
      ),
    ).toBeInTheDocument()

    const stats = screen.getByTestId('home-hero-stats')
    expect(stats).toHaveTextContent('18,563')
    expect(stats).toHaveTextContent('71,000')
    expect(stats).toHaveTextContent('17M+')
    expect(stats).not.toHaveTextContent('$100,000')
    expect(stats).toHaveTextContent(/youtube/i)
    expect(stats).toHaveTextContent(/instagram/i)
    expect(stats).toHaveTextContent(/tiktok/i)

    expect(screen.getByTestId('home-hero-social-proof')).toHaveTextContent(
      /20\+ reviews from founders, doctors, operators, and local leaders/i,
    )
    expect(screen.getByLabelText(/5 star rating/i)).toBeInTheDocument()

    const supportPoints = screen.getAllByTestId('home-hero-support-point')
    const iconSrcs = supportPoints.map((point) =>
      point.querySelector('img')?.getAttribute('src'),
    )

    expect(supportPoints).toHaveLength(1)
    expect(screen.getByText(/can chatgpt recommend you\?/i)).toBeInTheDocument()
    expect(screen.queryByText(/^google maps$/i)).not.toBeInTheDocument()
    expect(iconSrcs).toContain('/home-hero/logos/openai.svg')

    const systemStrip = screen.getByRole('list', {
      name: /what the prism growth system includes/i,
    })
    expect(systemStrip).toBeInTheDocument()
    expect(systemStrip.querySelectorAll('li')).toHaveLength(7)

    expect(
      screen.getByRole('link', { name: /order now/i }),
    ).toHaveAttribute('href', '/websites')
    expect(
      screen.getByRole('link', { name: /explore plans/i }),
    ).toHaveAttribute('href', '#offers')

    expect(
      screen.getByRole('link', {
        name: /5 star rating 20\+ reviews from founders, doctors, operators, and local leaders see results/i,
      }),
    ).toHaveAttribute('href', '/case-studies')
    expect(
      screen.queryByRole('link', { name: /wall of love/i }),
    ).not.toBeInTheDocument()
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
