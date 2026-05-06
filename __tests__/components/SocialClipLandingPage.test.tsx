import type React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

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

jest.mock('@/components/pixelish/PixelishIcon', () => ({
  __esModule: true,
  default: function MockPixelishIcon() {
    return <span data-testid="pixelish-icon" />
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

  it('tracks social landing action clicks and external destinations', () => {
    render(
      <SocialClipLandingPage
        channel={{
          label: 'TikTok',
          handle: '@the_design_prism',
          href: 'https://www.tiktok.com/@the_design_prism',
          iconSrc: '/pixelish/socials-tiktok.svg',
        }}
        otherChannel={{
          label: 'Instagram',
          handle: '@the_design_prism',
          href: '/ig',
          iconSrc: '/pixelish/socials-instagram.svg',
        }}
        hiddenSectionDetailIds={['business']}
        actionLinks={[
          {
            label: 'free audit',
            href: '/get-started',
            iconSrc: '/pixelish/graph-chart-high.svg',
          },
          {
            label: 'tiktok',
            href: 'https://www.tiktok.com/@the_design_prism',
            iconSrc: '/pixelish/socials-tiktok.svg',
          },
        ]}
      />,
    )

    fireEvent.click(screen.getByRole('link', { name: /free audit/i }))
    fireEvent.click(screen.getByRole('link', { name: /^tiktok$/i }))
    fireEvent.click(screen.getByRole('link', { name: /^forbes$/i }))

    expect(trackCTAClick).toHaveBeenCalledWith(
      'free audit',
      'tiktok landing actions',
    )
    expect(trackCTAClick).toHaveBeenCalledWith('tiktok', 'tiktok landing actions')
    expect(trackCTAClick).toHaveBeenCalledWith('Forbes', 'tiktok landing sources')
    expect(trackExternalLinkClick).toHaveBeenCalledWith(
      'https://www.tiktok.com/@the_design_prism',
      'tiktok',
    )
    expect(trackExternalLinkClick).toHaveBeenCalledWith(
      'https://forbes.co/editors-picks/los-mas-ricos-del-mundo-2026',
      'Forbes',
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
        otherChannel={{
          label: 'TikTok',
          handle: '@the_design_prism',
          href: '/tiktok',
          iconSrc: '/pixelish/socials-tiktok.svg',
        }}
        hiddenSectionDetailIds={['business']}
      />,
    )

    expect(
      screen.queryByText(/forbes 2026 richest people/i),
    ).not.toBeInTheDocument()
    expect(screen.getByText(/espn athletes since 2000/i)).toBeInTheDocument()
  })
})
