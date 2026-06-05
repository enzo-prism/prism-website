import type React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'

import SocialThanksPage from '@/components/social-thanks-page'

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

jest.mock('@/utils/analytics', () => ({
  trackCTAClick: (...args: unknown[]) => trackCTAClick(...args),
  trackExternalLinkClick: (...args: unknown[]) =>
    trackExternalLinkClick(...args),
}))

const tiktokChannel = {
  label: 'TikTok',
  handle: '@the_design_prism',
  href: 'https://www.tiktok.com/@the_design_prism',
}

const instagramChannel = {
  label: 'Instagram',
  handle: '@the_design_prism',
  href: 'https://www.instagram.com/the_design_prism/',
}

describe('SocialThanksPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the platform thank-you headline and exactly four actions', () => {
    render(<SocialThanksPage channel={tiktokChannel} />)

    expect(
      screen.getByRole('heading', {
        name: /thanks for supporting us on tiktok/i,
      }),
    ).toBeInTheDocument()

    const actions = within(
      screen.getByRole('navigation', { name: /tiktok page actions/i }),
    ).getAllByRole('link')

    expect(actions).toHaveLength(4)

    // Legacy clip-credits content must stay retired.
    expect(screen.queryByText(/why not you/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/study the greats/i)).not.toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { name: /founders \+ builders/i }),
    ).not.toBeInTheDocument()
    expect(screen.queryByText(/forbes/i)).not.toBeInTheDocument()
  })

  it('tracks the YouTube action as an outbound link', () => {
    render(<SocialThanksPage channel={tiktokChannel} />)

    const youtubeAction = screen.getByRole('link', {
      name: /go deeper on youtube/i,
    })

    expect(youtubeAction).toHaveAttribute(
      'href',
      'https://www.youtube.com/@the_design_prism',
    )
    expect(youtubeAction).toHaveAttribute('target', '_blank')
    expect(youtubeAction).toHaveAttribute('rel', 'noopener noreferrer')
    expect(youtubeAction).toHaveAttribute(
      'data-cta-text',
      'go deeper on youtube',
    )
    expect(youtubeAction).toHaveAttribute(
      'data-cta-location',
      'tiktok landing actions',
    )

    fireEvent.click(youtubeAction)

    expect(trackCTAClick).not.toHaveBeenCalled()
    expect(trackExternalLinkClick).toHaveBeenCalledWith(
      'https://www.youtube.com/@the_design_prism',
      'go deeper on youtube',
    )
  })

  it('tracks the Marble App Store action as an outbound link', () => {
    render(<SocialThanksPage channel={tiktokChannel} />)

    const appStoreAction = screen.getByRole('link', {
      name: /download marble for ios/i,
    })

    expect(appStoreAction).toHaveAttribute(
      'href',
      'https://apps.apple.com/us/app/marble-fit/id6757725234',
    )
    expect(appStoreAction).toHaveAttribute('target', '_blank')
    expect(appStoreAction).toHaveAttribute(
      'data-cta-location',
      'tiktok landing actions',
    )

    fireEvent.click(appStoreAction)

    expect(trackCTAClick).not.toHaveBeenCalled()
    expect(trackExternalLinkClick).toHaveBeenCalledWith(
      'https://apps.apple.com/us/app/marble-fit/id6757725234',
      'download marble for ios',
    )
  })

  it('tracks the wall-of-love action as an internal CTA into /wall-of-love', () => {
    render(<SocialThanksPage channel={tiktokChannel} />)

    const wallOfLoveAction = screen.getByRole('link', {
      name: /see the wall of love/i,
    })

    expect(wallOfLoveAction).toHaveAttribute('href', '/wall-of-love')
    expect(wallOfLoveAction).not.toHaveAttribute('target')
    expect(wallOfLoveAction).toHaveAttribute(
      'data-cta-text',
      'see the wall of love',
    )
    expect(wallOfLoveAction).toHaveAttribute(
      'data-cta-location',
      'tiktok landing actions',
    )

    fireEvent.click(wallOfLoveAction)

    expect(trackExternalLinkClick).not.toHaveBeenCalled()
    expect(trackCTAClick).toHaveBeenCalledWith(
      'see the wall of love',
      'tiktok landing actions',
    )
  })

  it('tracks the become-a-client action as an internal CTA into /get-started', () => {
    render(<SocialThanksPage channel={instagramChannel} />)

    const clientAction = screen.getByRole('link', {
      name: /become a client/i,
    })

    expect(clientAction).toHaveAttribute('href', '/get-started')
    expect(clientAction).not.toHaveAttribute('target')
    expect(clientAction).toHaveAttribute('data-cta-text', 'become a client')
    expect(clientAction).toHaveAttribute(
      'data-cta-location',
      'instagram landing actions',
    )

    fireEvent.click(clientAction)

    expect(trackExternalLinkClick).not.toHaveBeenCalled()
    expect(trackCTAClick).toHaveBeenCalledWith(
      'become a client',
      'instagram landing actions',
    )
  })

  it('keeps the channel handle as a tracked outbound profile link', () => {
    render(<SocialThanksPage channel={instagramChannel} />)

    expect(
      screen.getByRole('heading', {
        name: /thanks for supporting us on instagram/i,
      }),
    ).toBeInTheDocument()

    const homeLink = screen.getByRole('link', { name: /prism home/i })
    expect(homeLink).toHaveAttribute('href', '/')
    expect(within(homeLink).getByTestId('next-image')).toHaveAttribute(
      'data-src',
      '/prism-logo.jpeg',
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
})
