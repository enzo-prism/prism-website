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

  it('frames the page around the studio, not gratitude, with seven routed actions', () => {
    render(<SocialLinkHub platform="tiktok" />)

    expect(
      screen.getByRole('heading', {
        name: /you found the studio behind the videos\./i,
      }),
    ).toBeInTheDocument()

    // Proof strip pairs an attention number with a business number.
    expect(
      screen.getByText(/17m\+ views across channels · \$100,000\+ driven/i),
    ).toBeInTheDocument()

    const nav = screen.getByRole('navigation', {
      name: /tiktok page actions/i,
    })
    expect(within(nav).getAllByRole('link')).toHaveLength(7)

    // The retired gratitude/clip-credit framings stay retired.
    expect(screen.queryByText(/thanks for supporting/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/why not you/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/study the greats/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/forbes/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/download marble/i),
    ).not.toBeInTheDocument()
  })

  it('routes the four offers to their canonical destinations with tracked internal clicks', () => {
    render(<SocialLinkHub platform="tiktok" />)

    const orderLink = screen.getByRole('link', {
      name: /order your website/i,
    })
    expect(orderLink).toHaveAttribute('href', '/websites#order')
    expect(orderLink).not.toHaveAttribute('target')
    expect(orderLink).toHaveAttribute('data-cta-text', 'order your website')
    expect(orderLink).toHaveAttribute(
      'data-cta-location',
      'tiktok landing actions',
    )

    fireEvent.click(orderLink)
    expect(trackCTAClick).toHaveBeenCalledWith(
      'order your website',
      'tiktok landing actions',
    )
    expect(trackExternalLinkClick).not.toHaveBeenCalled()

    expect(
      screen.getByRole('link', { name: /see the proof/i }),
    ).toHaveAttribute('href', '/case-studies')
    expect(
      screen.getByRole('link', { name: /the system behind this video/i }),
    ).toHaveAttribute('href', '/content-os')
    expect(
      screen.getByRole('link', { name: /everything prism, unlimited/i }),
    ).toHaveAttribute('href', '/prism-infinity')
    expect(screen.getByRole('link', { name: /start free/i })).toHaveAttribute(
      'href',
      '/get-started',
    )

    const referLink = screen.getByRole('link', { name: /refer a friend/i })
    expect(referLink).toHaveAttribute('href', '/refer')
    expect(referLink).toHaveAttribute('data-cta-text', 'refer a friend')
  })

  it('keeps canonical pricing language on the offer cards', () => {
    render(<SocialLinkHub platform="tiktok" />)

    expect(screen.getByText(/\$300 flat · live in 7 days/i)).toBeInTheDocument()
    expect(screen.getByText(/\$5,000 \+ \$1,000\/month/i)).toBeInTheDocument()
    expect(
      screen.getByText(/\$2,000\/month · pause anytime/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/\$100 when they become a client/i),
    ).toBeInTheDocument()
    // Never the retired "/mo" shorthand.
    expect(screen.queryByText(/\/mo\b/)).not.toBeInTheDocument()
  })

  it('tracks the YouTube cross-link as an external click only', () => {
    render(<SocialLinkHub platform="tiktok" />)

    const youtubeLink = screen.getByRole('link', { name: /prism on youtube/i })
    expect(youtubeLink).toHaveAttribute(
      'href',
      'https://www.youtube.com/@the_design_prism',
    )
    expect(youtubeLink).toHaveAttribute('target', '_blank')
    expect(youtubeLink).toHaveAttribute('rel', 'noopener noreferrer')
    expect(youtubeLink).toHaveAttribute('data-cta-text', 'prism on youtube')

    fireEvent.click(youtubeLink)
    expect(trackExternalLinkClick).toHaveBeenCalledWith(
      'https://www.youtube.com/@the_design_prism',
      'prism on youtube',
    )
    expect(trackCTAClick).not.toHaveBeenCalled()
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

  it('tunes the copy per platform', () => {
    const { unmount } = render(<SocialLinkHub platform="instagram" />)
    expect(
      screen.getByRole('heading', {
        name: /you found the studio behind the feed\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/38,000 followers here/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /the system behind this feed/i }),
    ).toHaveAttribute('href', '/content-os')
    unmount()

    render(<SocialLinkHub platform="youtube" />)
    expect(
      screen.getByRole('heading', {
        name: /you found the studio behind the channel\./i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/24,000 subscribers/i)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /the system behind this channel/i }),
    ).toHaveAttribute('href', '/content-os')

    // YouTube arrivals get the wall of love instead of a circular
    // back-to-channel card.
    expect(
      screen.getByRole('link', { name: /wall of love/i }),
    ).toHaveAttribute('href', '/wall-of-love')
    expect(
      screen.queryByRole('link', { name: /prism on youtube/i }),
    ).not.toBeInTheDocument()
  })
})
