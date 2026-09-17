import { render, screen } from '@testing-library/react'

import HomeHeroSection from '@/components/home/HomeHeroSection'
import { getWaitlistIntakeMonth } from '@/lib/waitlist'

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
    animationName,
    className,
    focusScrimClassName,
    forceAutoplay,
    frameCount,
    maskClassName,
    posterSrc,
    quality,
    scrimClassName,
    zoom,
  }: {
    animationName?: string
    className?: string
    focusScrimClassName?: string
    forceAutoplay?: boolean
    frameCount?: number
    maskClassName?: string
    posterSrc?: string
    quality?: string
    scrimClassName?: string
    zoom?: number
  }) {
    return (
      <div
        data-testid="home-hero-ascii-backdrop"
        data-animation-name={animationName}
        data-class-name={className}
        data-focus-scrim-class-name={focusScrimClassName}
        data-force-autoplay={forceAutoplay ? 'true' : 'false'}
        data-frame-count={frameCount}
        data-mask-class-name={maskClassName}
        data-poster-src={posterSrc}
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
    expect(heroBackdrop).toHaveAttribute('data-animation-name', 'wizard')
    expect(heroBackdrop).toHaveAttribute('data-frame-count', '91')
    expect(heroBackdrop).toHaveAttribute(
      'data-poster-src',
      '/animations/wizard/poster.svg',
    )
    expect(heroBackdrop).toHaveAttribute('data-quality', 'medium')
    expect(heroBackdrop).toHaveAttribute('data-force-autoplay', 'false')
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
    // The left-fade mask must ride on maskClassName: the same utilities in
    // className lose the cascade to the default center mask, which hides the
    // loop behind the copy zone.
    expect(heroBackdrop.getAttribute('data-mask-class-name')).toContain(
      'linear-gradient(90deg,transparent_0%,black_16%,black_100%)',
    )
    expect(heroBackdrop.getAttribute('data-class-name')).not.toContain(
      'mask-image',
    )

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /^your growth team\.$/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/website\. content\. ads\. built around your business\./i),
    ).toBeInTheDocument()
    expect(screen.queryByText(/#1 growth partner/i)).not.toBeInTheDocument()
    expect(
      screen.getByText(
        /we build the website, create the content, and manage the campaigns/i,
      ),
    ).toBeInTheDocument()

    const stats = screen.getByTestId('home-hero-stats')
    expect(stats).toHaveTextContent('16,882')
    expect(stats).toHaveTextContent('73K+')
    expect(stats).toHaveTextContent('1.2M')
    expect(stats).not.toHaveTextContent('$100,000')
    expect(stats).toHaveTextContent(/youtube/i)
    expect(stats).toHaveTextContent(/instagram/i)
    expect(stats).toHaveTextContent(/tiktok/i)

    expect(screen.getByTestId('home-hero-social-proof')).toHaveTextContent(
      /20\+ stories from founders, doctors, and business owners/i,
    )
    expect(screen.queryByLabelText(/5 star rating/i)).not.toBeInTheDocument()

    const supportPoints = screen.getAllByTestId('home-hero-support-point')
    const supportIcon = supportPoints[0]?.querySelector('img')

    expect(supportPoints).toHaveLength(1)
    expect(screen.getByText(/your business\. our team\./i)).toBeInTheDocument()
    expect(screen.queryByText(/^google maps$/i)).not.toBeInTheDocument()
    expect(supportIcon).toHaveAttribute('src', '/pixelish/emoji-heart.svg')
    expect(supportIcon).toHaveClass('invert')

    const systemStrip = screen.getByRole('list', {
      name: /what the prism growth system includes/i,
    })
    expect(systemStrip).toBeInTheDocument()
    expect(systemStrip.querySelectorAll('li')).toHaveLength(7)

    expect(
      screen.getByRole('link', { name: /join the waitlist/i }),
    ).toHaveAttribute('href', '/waitlist')
    expect(
      screen.getByText(/prism is fully booked right now\./i),
    ).toBeInTheDocument()
    expect(
      screen
        .getByText(/join the waitlist to work with us in/i)
        .closest('[data-capacity-notice="inline"]'),
    ).toHaveTextContent(
      `Join the waitlist to work with us in ${getWaitlistIntakeMonth().month}.`,
    )
    expect(
      screen.queryByRole('link', { name: /get a pro website/i }),
    ).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /wall of love/i })).toHaveAttribute(
      'href',
      '/wall-of-love',
    )

    expect(
      screen.getByRole('link', {
        name: /20\+ stories from founders, doctors, and business owners see results/i,
      }),
    ).toHaveAttribute('href', '/case-studies')
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
