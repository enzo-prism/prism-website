import type React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'

import SocialLinkHub from '@/components/social-link-hub'

const trackCTAClick = jest.fn()
const trackExternalLinkClick = jest.fn()

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
    [key: string]: unknown
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockNextImage({
    alt,
    className,
    src,
  }: {
    alt: string
    className?: string
    src: string
  }) {
    return (
      <img
        alt={alt}
        className={className}
        data-src={src}
        data-testid="next-image"
      />
    )
  },
}))

jest.mock('@/components/pixelish/PixelishIcon', () => ({
  __esModule: true,
  default: function MockPixelishIcon({
    className,
    invert,
    src,
  }: {
    className?: string
    invert?: boolean
    src: string
  }) {
    return (
      <span
        className={className}
        data-invert={String(invert)}
        data-src={src}
        data-testid="pixelish-icon"
      />
    )
  },
}))

jest.mock('@/components/brand-logo', () => ({
  __esModule: true,
  default: function MockBrandLogo({
    brand,
    className,
  }: {
    brand: string
    className?: string
  }) {
    return (
      <span className={className} data-brand={brand} data-testid="brand-logo" />
    )
  },
}))

jest.mock('@/utils/analytics', () => ({
  trackCTAClick: (...args: unknown[]) => trackCTAClick(...args),
  trackExternalLinkClick: (...args: unknown[]) =>
    trackExternalLinkClick(...args),
}))

describe('SocialLinkHub', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('frames the page around business growth with exactly two offer actions', () => {
    render(<SocialLinkHub platform="tiktok" />)

    expect(
      screen.getByRole('heading', {
        name: /grow your business with prism/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /we implement the strategies and tactics we post about/i,
      ),
    ).toBeInTheDocument()

    // Proof strip uses current public profile and authenticated analytics data.
    expect(screen.getByText(/11\.3k followers/i)).toBeInTheDocument()
    expect(screen.getByText(/1\.2m views in 60 days/i)).toBeInTheDocument()

    const nav = screen.getByRole('navigation', {
      name: /tiktok page actions/i,
    })
    expect(within(nav).getAllByRole('link')).toHaveLength(2)
    expect(
      within(nav).queryByRole('link', { name: /refer a friend/i }),
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/you get \$100/i)).not.toBeInTheDocument()
    expect(
      within(nav)
        .getAllByRole('link')
        .some((link) => link.getAttribute('href') === '/refer'),
    ).toBe(false)

    // The retired cards stay retired.
    expect(screen.queryByText(/see the proof/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/the system behind this video/i),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(/everything prism, unlimited/i),
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/start free/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/prism on youtube/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/wall of love/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/thanks for supporting/i)).not.toBeInTheDocument()
  })

  it('routes both actions to their canonical destinations with tracked internal clicks', () => {
    render(<SocialLinkHub platform="tiktok" />)

    const orderLink = screen.getByRole('link', {
      name: /premium website design/i,
    })
    expect(orderLink).toHaveAttribute('href', '/website-intake')
    expect(orderLink).not.toHaveAttribute('target')
    expect(orderLink).toHaveAttribute('data-cta-text', 'premium website design')
    expect(orderLink).toHaveAttribute(
      'data-cta-location',
      'tiktok landing actions',
    )

    fireEvent.click(orderLink)
    expect(trackCTAClick).toHaveBeenCalledWith(
      'premium website design',
      'tiktok landing actions',
    )
    expect(trackExternalLinkClick).not.toHaveBeenCalled()

    const infinityLink = screen.getByRole('link', { name: /prism infinity/i })
    expect(infinityLink).toHaveAttribute('href', '/prism-infinity')
    expect(infinityLink).toHaveAttribute('data-cta-text', 'prism infinity')

    fireEvent.click(infinityLink)
    expect(trackCTAClick).toHaveBeenCalledWith(
      'prism infinity',
      'tiktok landing actions',
    )
    expect(trackCTAClick).toHaveBeenCalledTimes(2)
  })

  it('keeps canonical pricing language without referral copy', () => {
    render(<SocialLinkHub platform="tiktok" />)

    // Call-first offers never show exact public pricing. The detail line is
    // sentence copy rendered mixed-case (no uppercase transform).
    expect(screen.getByText('rank on ChatGPT and Google')).toBeInTheDocument()
    expect(screen.queryByText(/\$5,000/)).not.toBeInTheDocument()
    expect(screen.queryByText(/\$2,000/)).not.toBeInTheDocument()
    expect(screen.queryByText(/\$300/)).not.toBeInTheDocument()
    expect(screen.queryByText(/refer/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/you get \$100/i)).not.toBeInTheDocument()
    // Never the retired "/mo" shorthand.
    expect(screen.queryByText(/\/mo\b/)).not.toBeInTheDocument()
  })

  it('keeps the header home link and tracked profile link', () => {
    render(<SocialLinkHub platform="instagram" />)

    const homeLink = screen.getByRole('link', { name: /prism home/i })
    expect(homeLink).toHaveAttribute('href', '/')
    expect(homeLink).toHaveAttribute(
      'data-cta-location',
      'instagram landing header',
    )

    const profileLink = screen.getByRole('link', {
      name: /@the_design_prism/i,
    })
    expect(profileLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/the_design_prism/',
    )
    expect(profileLink).toHaveAttribute('target', '_blank')
    expect(profileLink).toHaveAttribute('data-cta-text', 'instagram profile')

    fireEvent.click(profileLink)
    expect(trackExternalLinkClick).toHaveBeenCalledWith(
      'https://www.instagram.com/the_design_prism/',
      'instagram profile',
    )
  })

  it('tunes the attention stat per platform while keeping the shared headline and two actions', () => {
    const { unmount } = render(<SocialLinkHub platform="instagram" />)
    expect(
      screen.getByRole('heading', {
        name: /grow your business with prism/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/38k followers/i)).toBeInTheDocument()
    expect(
      within(
        screen.getByRole('navigation', { name: /instagram page actions/i }),
      ).getAllByRole('link'),
    ).toHaveLength(2)
    unmount()

    render(<SocialLinkHub platform="youtube" />)
    expect(
      screen.getByRole('heading', {
        name: /grow your business with prism/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/24\.7k subscribers/i)).toBeInTheDocument()

    const youtubeNav = screen.getByRole('navigation', {
      name: /youtube page actions/i,
    })
    expect(within(youtubeNav).getAllByRole('link')).toHaveLength(2)
    expect(
      within(youtubeNav).getByRole('link', { name: /premium website design/i }),
    ).toHaveAttribute('href', '/website-intake')
    expect(
      within(youtubeNav).getByRole('link', { name: /prism infinity/i }),
    ).toHaveAttribute('href', '/prism-infinity')
    expect(
      within(youtubeNav).queryByRole('link', { name: /refer a friend/i }),
    ).not.toBeInTheDocument()
  })

  it('segments the offer cards by founder revenue with routing questions', () => {
    render(<SocialLinkHub platform="instagram" />)

    // Visual routing questions sit above the two offer cards; the cards carry
    // the same segmentation in their aria-labels so AT users hear it once.
    expect(screen.getByText('Doing under $1M a year?')).toBeInTheDocument()
    expect(screen.getByText('Doing $1M–$10M a year?')).toBeInTheDocument()
    expect(
      screen.getByRole('link', {
        name: /premium website design, for businesses under \$1m a year/i,
      }),
    ).toHaveAttribute('href', '/website-intake')
    expect(
      screen.getByRole('link', {
        name: /prism infinity, for businesses doing \$1m–\$10m a year/i,
      }),
    ).toHaveAttribute('href', '/prism-infinity')
    // Revenue bands are routing copy, not public pricing; the Infinity detail
    // stays price-free and avoids the retired "Everything Prism, unlimited".
    expect(
      screen.getByText(/unlimited landing pages, ads, and websites/i),
    ).toBeInTheDocument()
  })
})
