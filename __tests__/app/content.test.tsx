import { fireEvent, render, screen, within } from '@testing-library/react'

import ContentOsPage from '@/app/content/page'
import { isClientQuote, quotesData } from '@/content/wall-of-love-data'
import { SOCIAL_PROOF_VERIFIED_AT, SOCIAL_PROOF } from '@/lib/proof-metrics'
import { trackLinkInteraction } from '@/utils/analytics'

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
    [key: string]: unknown
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

jest.mock('@/components/navbar', () => ({
  __esModule: true,
  default: function MockNavbar() {
    return <header data-testid="navbar-mock" />
  },
}))

jest.mock('@/components/footer', () => ({
  __esModule: true,
  default: function MockFooter() {
    return <footer data-testid="footer-mock" />
  },
}))

jest.mock('@/components/schema-markup', () => ({
  ServiceSchema: function MockServiceSchema() {
    return null
  },
  FAQSchema: function MockFAQSchema() {
    return null
  },
}))

jest.mock('@/utils/analytics', () => ({
  trackLinkInteraction: jest.fn(),
}))

function heroScope(container: HTMLElement) {
  return within(container.querySelector('main section') as HTMLElement)
}

beforeEach(() => {
  jest.mocked(trackLinkInteraction).mockClear()
})

describe('ContentOsPage creator-dashboard hero', () => {
  it('renders the lowercase h1 and the proof anchor', () => {
    const { container } = render(<ContentOsPage />)
    const hero = heroScope(container)

    expect(
      hero.getByRole('heading', {
        level: 1,
        name: 'your expertise. catching fire.',
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)

    const secondary = hero.getByRole('link', { name: 'See our numbers' })
    expect(secondary).toHaveAttribute('href', '#proof')
    expect(document.getElementById('proof')).toBeInTheDocument()
  })

  it('routes the hero CTA to the waitlist with hero tracking', () => {
    const { container } = render(<ContentOsPage />)
    const hero = heroScope(container)

    const primary = hero.getByRole('link', { name: 'Join the waitlist' })
    expect(primary).toHaveAttribute('href', '/waitlist?focus=content')

    fireEvent.click(primary)
    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/waitlist?focus=content',
      'Join the waitlist',
      'content hero',
    )
  })

  it('shows Prism channel numbers from SOCIAL_PROOF with the date and caveats', () => {
    const { container } = render(<ContentOsPage />)
    const hero = heroScope(container)

    for (const value of [
      SOCIAL_PROOF.youtube.audience,
      SOCIAL_PROOF.youtube.activity,
      SOCIAL_PROOF.instagram.audience,
      SOCIAL_PROOF.tiktok.audience,
      SOCIAL_PROOF.tiktok.activity,
    ]) {
      expect(hero.getByText(value)).toBeInTheDocument()
    }

    expect(
      hero.getByText(`As of ${SOCIAL_PROOF_VERIFIED_AT}`),
    ).toBeInTheDocument()
    const heroText = container.querySelector('main section')?.textContent ?? ''
    expect(heroText).toContain('legacy gaming content')
    expect(heroText).toContain('Not client campaign results')
  })

  it('labels hero comments as community comments, never client reviews', () => {
    const { container } = render(<ContentOsPage />)
    const hero = heroScope(container)

    expect(hero.getByText('Comments on Prism videos')).toBeInTheDocument()
    expect(
      hero.getByText(
        /Community comments on Prism.s own posts, not client reviews\./,
      ),
    ).toBeInTheDocument()

    const heroText = container.querySelector('main section')?.textContent ?? ''
    for (const quote of quotesData.filter(isClientQuote)) {
      expect(heroText).not.toContain(quote.text)
    }
    for (const quote of quotesData.filter((item) => item.requiresConsent)) {
      expect(heroText).not.toContain(quote.text)
    }
  })

  it('keeps hero copy free of em dashes', () => {
    const { container } = render(<ContentOsPage />)
    expect(container.querySelector('main section')?.textContent).not.toContain(
      '—',
    )
  })
})

describe('ContentOsPage sections', () => {
  it('links every channel with its source in the proof section', () => {
    render(<ContentOsPage />)

    const proof = document.getElementById('proof') as HTMLElement
    for (const channel of [
      SOCIAL_PROOF.youtube,
      SOCIAL_PROOF.instagram,
      SOCIAL_PROOF.tiktok,
    ]) {
      const link = within(proof).getByRole('link', {
        name: `Visit Prism on ${channel.platform}`,
      })
      expect(link).toHaveAttribute('href', channel.url)
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    expect(
      within(proof).getByRole('region', {
        name: 'Instagram comments on Prism content',
      }),
    ).toBeInTheDocument()
  })

  it('answers FAQs in crawlable disclosures', () => {
    render(<ContentOsPage />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'before you start.' }),
    ).toBeInTheDocument()
    const cancel = screen.getByText('Can I cancel?').closest('details') as HTMLElement
    expect(cancel).not.toHaveAttribute('open')
    // Collapsed answers still ship in the HTML so crawlers can read them.
    expect(within(cancel).getByText(/month-to-month/)).toBeInTheDocument()
  })

  it('cross-links websites, ads, and AEO, then ends with the content final CTA', () => {
    render(<ContentOsPage />)

    const siblings = screen
      .getByRole('heading', { level: 2, name: 'also from Prism.' })
      .closest('section') as HTMLElement
    expect(
      within(siblings)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href')),
    ).toEqual(['/websites', '/ads', '/aeo'])

    const finalCta = screen
      .getByRole('heading', { level: 2, name: 'your content, next.' })
      .closest('section') as HTMLElement
    const cta = within(finalCta).getByRole('link', {
      name: 'Join the waitlist',
    })
    expect(cta).toHaveAttribute('href', '/waitlist?focus=content')
    fireEvent.click(cta)
    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/waitlist?focus=content',
      'Join the waitlist',
      'content final cta',
    )
  })

  it('keeps the page free of em dashes and prices', () => {
    const { container } = render(<ContentOsPage />)
    const text = container.querySelector('main')?.textContent ?? ''
    expect(text).not.toContain('—')
    expect(text).not.toMatch(/\$\d/)
  })
})
