import type React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'

import SocialClipLandingPage from '@/components/social-clip-landing-page'

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
  }: {
    className?: string
    invert?: boolean
  }) {
    return (
      <span
        className={className}
        data-invert={String(invert)}
        data-testid="pixelish-icon"
      />
    )
  },
}))

jest.mock('@/utils/analytics', () => ({
  trackCTAClick: (...args: unknown[]) => trackCTAClick(...args),
  trackExternalLinkClick: (...args: unknown[]) =>
    trackExternalLinkClick(...args),
}))

describe('SocialClipLandingPage analytics', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders one prominent YouTube action and tracks it by channel', () => {
    render(
      <SocialClipLandingPage
        channel={{
          label: 'TikTok',
          handle: '@the_design_prism',
          href: 'https://www.tiktok.com/@the_design_prism',
          iconSrc: '/pixelish/socials-tiktok.svg',
        }}
        hiddenSectionDetailIds={['business']}
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'Why Not You' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /The frameworks, tools, and tactics used by top founders are out there/i,
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(/watch prism on youtube/i)).toBeInTheDocument()
    expect(
      screen.queryByText(/steal the AI playbooks/i),
    ).not.toBeInTheDocument()
    expect(
      within(screen.getByRole('link', { name: /prism home/i })).getByTestId(
        'next-image',
      ),
    ).toHaveAttribute('data-src', '/prism-logo.jpeg')

    const youtubeActions = screen.getAllByRole('link', {
      name: /watch on youtube/i,
    })
    const youtubeIcon = within(youtubeActions[0]).getByTestId('pixelish-icon')

    expect(youtubeActions).toHaveLength(1)
    expect(youtubeActions[0]).toHaveAttribute(
      'href',
      'https://www.youtube.com/@the_design_prism',
    )
    expect(youtubeActions[0]).toHaveAttribute('target', '_blank')
    expect(youtubeActions[0]).toHaveAttribute(
      'data-cta-text',
      'watch on youtube',
    )
    expect(youtubeActions[0]).toHaveAttribute(
      'data-cta-location',
      'tiktok landing actions',
    )
    expect(youtubeIcon).toHaveAttribute('data-invert', 'false')
    expect(youtubeIcon).toHaveClass('group-hover:invert')
    expect(
      screen.queryByRole('link', { name: /free audit/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /pricing/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /^tiktok$/i }),
    ).not.toBeInTheDocument()

    fireEvent.click(youtubeActions[0])

    expect(trackCTAClick).not.toHaveBeenCalled()
    expect(trackExternalLinkClick).toHaveBeenCalledWith(
      'https://www.youtube.com/@the_design_prism',
      'watch on youtube',
    )
  })

  it('keeps the channel handle as a tracked outbound profile link', () => {
    render(
      <SocialClipLandingPage
        channel={{
          label: 'Instagram',
          handle: '@the_design_prism',
          href: 'https://www.instagram.com/the_design_prism/',
          iconSrc: '/pixelish/socials-instagram.svg',
        }}
        hiddenSectionDetailIds={['business']}
      />,
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
    expect(profileLink).toHaveAttribute(
      'data-cta-location',
      'instagram landing header',
    )

    fireEvent.click(profileLink)

    expect(trackCTAClick).not.toHaveBeenCalled()
    expect(trackExternalLinkClick).toHaveBeenCalledWith(
      'https://www.instagram.com/the_design_prism/',
      'instagram profile',
    )
  })

  it('keeps source links as citation links with external tracking', () => {
    render(
      <SocialClipLandingPage
        channel={{
          label: 'TikTok',
          handle: '@the_design_prism',
          href: 'https://www.tiktok.com/@the_design_prism',
          iconSrc: '/pixelish/socials-tiktok.svg',
        }}
      />,
    )

    fireEvent.click(screen.getByRole('link', { name: /^forbes$/i }))

    expect(trackCTAClick).not.toHaveBeenCalled()
    expect(trackExternalLinkClick).toHaveBeenCalledWith(
      'https://forbes.co/editors-picks/los-mas-ricos-del-mundo-2026',
      'Forbes',
    )
  })

  it('shows a minimal Marble product section with real app screenshots', () => {
    render(
      <SocialClipLandingPage
        channel={{
          label: 'TikTok',
          handle: '@the_design_prism',
          href: 'https://www.tiktok.com/@the_design_prism',
          iconSrc: '/pixelish/socials-tiktok.svg',
        }}
      />,
    )

    expect(
      screen.getByRole('heading', {
        name: /^Marble\.$/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/^screens$/i)).toBeInTheDocument()
    expect(screen.getByText(/train\. log\. evolve\./i)).toBeInTheDocument()
    expect(screen.queryByText(/real app screens/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/works offline/i)).not.toBeInTheDocument()
    expect(
      screen.queryByText(/A quiet, offline workout journal/i),
    ).not.toBeInTheDocument()
    expect(screen.getByAltText(/Marble journal screen/i)).toHaveAttribute(
      'data-src',
      '/products/marble/journal-light.png',
    )
    expect(screen.getByAltText(/Marble calendar screen/i)).toHaveAttribute(
      'data-src',
      '/products/marble/calendar-light.png',
    )
    expect(screen.getByAltText(/Marble trends screen/i)).toHaveAttribute(
      'data-src',
      '/products/marble/trends-light.png',
    )

    const appStoreActions = screen.getAllByRole('link', {
      name: /download on the app store/i,
    })

    expect(appStoreActions).toHaveLength(1)
    expect(appStoreActions[0]).toHaveAttribute(
      'href',
      'https://apps.apple.com/us/app/marble-fit/id6757725234',
    )
    expect(appStoreActions[0]).toHaveAttribute(
      'data-cta-location',
      'tiktok landing products preview',
    )

    fireEvent.click(appStoreActions[0])

    expect(trackExternalLinkClick).toHaveBeenCalledWith(
      'https://apps.apple.com/us/app/marble-fit/id6757725234',
      'download on the app store',
    )
  })

  it('hides section detail copy when configured', () => {
    render(
      <SocialClipLandingPage
        channel={{
          label: 'Instagram',
          handle: '@the_design_prism',
          href: 'https://www.instagram.com/the_design_prism/',
          iconSrc: '/pixelish/socials-instagram.svg',
        }}
        hiddenSectionDetailIds={['business']}
      />,
    )

    expect(
      screen.queryByText(/forbes 2026 richest people/i),
    ).not.toBeInTheDocument()
    expect(screen.getByText(/espn athletes since 2000/i)).toBeInTheDocument()
  })

  it('keeps the founder and athlete credit lists visible', () => {
    render(
      <SocialClipLandingPage
        channel={{
          label: 'Instagram',
          handle: '@the_design_prism',
          href: 'https://www.instagram.com/the_design_prism/',
          iconSrc: '/pixelish/socials-instagram.svg',
        }}
      />,
    )

    expect(
      screen.getByRole('heading', { name: /founders \+ builders/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /^athletes$/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /study the greats/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/source material, not a scoreboard/i),
    ).toBeInTheDocument()
  })
})
