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

  it('frames the page around the studio, not gratitude, with exactly two routed actions', () => {
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
    expect(within(nav).getAllByRole('link')).toHaveLength(2)

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
      name: /get a pro website/i,
    })
    expect(orderLink).toHaveAttribute('href', '/websites')
    expect(orderLink).not.toHaveAttribute('target')
    expect(orderLink).toHaveAttribute('data-cta-text', 'get a pro website')
    expect(orderLink).toHaveAttribute(
      'data-cta-location',
      'tiktok landing actions',
    )

    fireEvent.click(orderLink)
    expect(trackCTAClick).toHaveBeenCalledWith(
      'get a pro website',
      'tiktok landing actions',
    )
    expect(trackExternalLinkClick).not.toHaveBeenCalled()

    const referLink = screen.getByRole('link', { name: /refer a friend/i })
    expect(referLink).toHaveAttribute('href', '/refer')
    expect(referLink).toHaveAttribute('data-cta-text', 'refer a friend')

    fireEvent.click(referLink)
    expect(trackCTAClick).toHaveBeenCalledWith(
      'refer a friend',
      'tiktok landing actions',
    )
  })

  it('keeps canonical pricing language and spells out the $100 referral reward', () => {
    render(<SocialLinkHub platform="tiktok" />)

    // Call-first offers never show exact public pricing.
    expect(
      screen.getByText(/Ultra-premium · scoped on a call/i),
    ).toBeInTheDocument()
    expect(screen.queryByText(/\$5,000/)).not.toBeInTheDocument()
    expect(screen.queryByText(/\$2,000/)).not.toBeInTheDocument()
    expect(screen.queryByText(/\$300/)).not.toBeInTheDocument()
    // The referral card makes the referrer's reward explicit.
    expect(
      screen.getByText(/you get \$100 for every friend who becomes a client/i),
    ).toBeInTheDocument()
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

  it('tunes the copy per platform while keeping the same two actions', () => {
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
      within(
        screen.getByRole('navigation', { name: /instagram page actions/i }),
      ).getAllByRole('link'),
    ).toHaveLength(2)
    unmount()

    render(<SocialLinkHub platform="youtube" />)
    expect(
      screen.getByRole('heading', {
        name: /you found the studio behind the channel\./i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/24,000 subscribers/i)).toBeInTheDocument()

    const youtubeNav = screen.getByRole('navigation', {
      name: /youtube page actions/i,
    })
    expect(within(youtubeNav).getAllByRole('link')).toHaveLength(2)
    expect(
      within(youtubeNav).getByRole('link', { name: /get a pro website/i }),
    ).toHaveAttribute('href', '/websites')
    expect(
      within(youtubeNav).getByRole('link', { name: /refer a friend/i }),
    ).toHaveAttribute('href', '/refer')
  })
})
