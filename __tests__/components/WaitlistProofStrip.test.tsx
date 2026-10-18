import fs from 'node:fs'
import path from 'node:path'

import { render, screen, within } from '@testing-library/react'

import WaitlistProofStrip from '@/components/waitlist/WaitlistProofStrip'
import {
  getWaitlistProofImage,
  WAITLIST_PROOF_SITES,
} from '@/components/waitlist/waitlist-proof-sites'
import { isClientQuote, quotesData } from '@/content/wall-of-love-data'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import {
  CONNECTED_CLIENT_TRAFFIC,
  SOCIAL_PROOF_VERIFIED_AT,
  SOCIAL_PROOF,
} from '@/lib/proof-metrics'

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

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockNextImage({
    src,
    alt,
  }: {
    src: string
    alt: string
    [key: string]: unknown
  }) {
    return <img src={src} alt={alt} />
  },
}))

const trackLinkInteraction = jest.fn()
jest.mock('@/utils/analytics', () => ({
  trackLinkInteraction: (...args: Array<unknown>) => trackLinkInteraction(...args),
}))

describe('WaitlistProofStrip', () => {
  beforeEach(() => {
    trackLinkInteraction.mockClear()
  })

  it('shows canonical proof numbers with their source and date', () => {
    const { container } = render(<WaitlistProofStrip />)

    const strip = container.querySelector('[data-waitlist-proof="strip"]')
    expect(strip).toHaveTextContent(
      `${SOCIAL_PROOF.combinedAudience} followers`,
    )
    expect(strip).toHaveTextContent(
      `${CONNECTED_CLIENT_TRAFFIC.newUsers.toLocaleString('en-US')} new users across ${CONNECTED_CLIENT_TRAFFIC.connectedSites} connected client sites in ${CONNECTED_CLIENT_TRAFFIC.month}`,
    )
    expect(strip).toHaveTextContent(`Verified ${SOCIAL_PROOF_VERIFIED_AT}`)
    expect(strip).toHaveTextContent(`Source: ${CONNECTED_CLIENT_TRAFFIC.source}`)
    expect(
      screen.getByRole('heading', { level: 2, name: /worth the wait/i }),
    ).toBeInTheDocument()
  })

  it('links to the wall of love with tracking', () => {
    render(<WaitlistProofStrip />)

    const link = screen.getByRole('link', { name: /see why clients love prism/i })
    expect(link).toHaveAttribute('href', '/wall-of-love')
    link.click()
    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/wall-of-love',
      'see why clients love prism',
      'waitlist proof strip',
    )
  })

  it('rails real current-client sites only, from screenshots that exist', () => {
    render(<WaitlistProofStrip />)

    expect(WAITLIST_PROOF_SITES.length).toBeGreaterThanOrEqual(6)
    for (const site of WAITLIST_PROOF_SITES) {
      expect(FORMER_CLIENT_SLUGS as readonly string[]).not.toContain(site.slug)
      const image = getWaitlistProofImage(site.slug)
      expect(
        fs.existsSync(path.join(process.cwd(), 'public', image)),
      ).toBe(true)
    }

    // The marquee renders its children twice; only the first copy is exposed.
    const rail = screen.getByRole('region', { name: /client websites by prism/i })
    const visibleImages = within(rail).getAllByRole('img')
    expect(visibleImages).toHaveLength(WAITLIST_PROOF_SITES.length)
    expect(visibleImages.map((image) => image.getAttribute('src'))).toEqual(
      WAITLIST_PROOF_SITES.map((site) => getWaitlistProofImage(site.slug)),
    )
  })

  it('quotes a named website client, never a community comment', () => {
    render(<WaitlistProofStrip />)

    const quote = screen.getByRole('blockquote')
    const record = quotesData.find((item) =>
      quote.textContent?.includes(item.text),
    )
    expect(record).toBeDefined()
    expect(isClientQuote(record!)).toBe(true)
    expect(record!.requiresConsent).toBeFalsy()
    expect(quote.closest('figure')).toHaveTextContent(record!.client)
    expect(quote.closest('figure')).toHaveTextContent('Website client')
  })
})
