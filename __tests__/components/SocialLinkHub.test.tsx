import type React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'

import SocialLinkHub from '@/components/social-link-hub'
import { WEBSITE_START_CTA } from '@/lib/pricing-model'
import { SERVICE_INTAKE_PATHS } from '@/lib/service-intake'

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

const HUB_ACTIONS = [
  {
    name: /website/i,
    href: WEBSITE_START_CTA.href,
    ctaText: 'website',
    service: 'website',
  },
  {
    name: /content/i,
    href: SERVICE_INTAKE_PATHS.content,
    ctaText: 'content',
    service: 'content',
  },
  {
    name: /ads/i,
    href: SERVICE_INTAKE_PATHS.ads,
    ctaText: 'ads',
    service: 'ads',
  },
] as const

describe('SocialLinkHub', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('frames the page around business growth with exactly three service actions', () => {
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

    // Keep the hub focused on routing rather than social or revenue proof.
    expect(screen.queryByText(/followers/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/views in 60 days/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/revenue driven/i)).not.toBeInTheDocument()

    const nav = screen.getByRole('navigation', {
      name: /tiktok page actions/i,
    })
    expect(within(nav).getAllByRole('link')).toHaveLength(3)
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
    expect(screen.queryByText(/prism infinity/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/premium website design/i),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(/doing under \$1m a year/i),
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/doing \$1m/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/start free/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/prism on youtube/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/wall of love/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/thanks for supporting/i)).not.toBeInTheDocument()
  })

  it('routes each service CTA to its canonical intake with platform and service tracking', () => {
    render(<SocialLinkHub platform="tiktok" />)

    for (const action of HUB_ACTIONS) {
      const link = screen.getByRole('link', { name: action.name })
      expect(link).toHaveAttribute('href', action.href)
      expect(link).not.toHaveAttribute('target')
      expect(link).toHaveAttribute('data-cta-text', action.ctaText)
      expect(link).toHaveAttribute(
        'data-cta-location',
        'tiktok landing actions',
      )
      expect(link).toHaveAttribute('data-cta-platform', 'tiktok')
      expect(link).toHaveAttribute('data-cta-service', action.service)

      fireEvent.click(link)
      expect(trackCTAClick).toHaveBeenCalledWith(
        action.ctaText,
        'tiktok landing actions',
        {
          platform: 'tiktok',
          service: action.service,
          destination: action.href,
        },
      )
    }

    expect(trackCTAClick).toHaveBeenCalledTimes(3)
    expect(trackExternalLinkClick).not.toHaveBeenCalled()
  })

  it('keeps canonical pricing language without referral copy', () => {
    render(<SocialLinkHub platform="tiktok" />)

    expect(
      screen.getByText('A site that makes choosing you easy.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Give people a reason to choose you.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Ads built around better leads.'),
    ).toBeInTheDocument()
    expect(screen.queryByText(/\$5,000/)).not.toBeInTheDocument()
    expect(screen.queryByText(/\$2,000/)).not.toBeInTheDocument()
    expect(screen.queryByText(/\$300/)).not.toBeInTheDocument()
    expect(screen.queryByText(/refer/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/you get \$100/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/\/mo\b/)).not.toBeInTheDocument()
    expect(screen.queryByText(/book a free demo/i)).not.toBeInTheDocument()
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

  it('keeps every platform free of audience and view stats while sharing three service actions', () => {
    const { unmount } = render(<SocialLinkHub platform="instagram" />)
    expect(
      screen.getByRole('heading', {
        name: /grow your business with prism/i,
      }),
    ).toBeInTheDocument()
    expect(screen.queryByText(/followers/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/public posts/i)).not.toBeInTheDocument()

    const instagramNav = screen.getByRole('navigation', {
      name: /instagram page actions/i,
    })
    expect(within(instagramNav).getAllByRole('link')).toHaveLength(3)
    expect(
      within(instagramNav).getByRole('link', { name: /^website\b/i }),
    ).toHaveAttribute('href', '/website-intake')
    expect(
      within(instagramNav).getByRole('link', { name: /^content\b/i }),
    ).toHaveAttribute('href', '/content-intake')
    expect(
      within(instagramNav).getByRole('link', { name: /^ads\b/i }),
    ).toHaveAttribute('href', '/ads-intake')
    unmount()

    render(<SocialLinkHub platform="youtube" />)
    expect(
      screen.getByRole('heading', {
        name: /grow your business with prism/i,
      }),
    ).toBeInTheDocument()
    expect(screen.queryByText(/subscribers/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/views/i)).not.toBeInTheDocument()

    const youtubeNav = screen.getByRole('navigation', {
      name: /youtube page actions/i,
    })
    expect(within(youtubeNav).getAllByRole('link')).toHaveLength(3)
    expect(
      within(youtubeNav).getByRole('link', { name: /^website\b/i }),
    ).toHaveAttribute('href', '/website-intake')
    expect(
      within(youtubeNav).getByRole('link', { name: /^content\b/i }),
    ).toHaveAttribute('href', '/content-intake')
    expect(
      within(youtubeNav).getByRole('link', { name: /^ads\b/i }),
    ).toHaveAttribute('href', '/ads-intake')
    expect(
      within(youtubeNav).queryByRole('link', { name: /refer a friend/i }),
    ).not.toBeInTheDocument()
    expect(
      within(youtubeNav).queryByRole('link', { name: /prism infinity/i }),
    ).not.toBeInTheDocument()
  })
})
