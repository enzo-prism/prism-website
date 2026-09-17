import { render, screen, within } from '@testing-library/react'

import WebsitesPage from '@/app/websites/page'
import { getCaseStudyMetric } from '@/lib/case-study-data'

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

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockNextImage({
    src,
    alt,
    ...props
  }: {
    src: string
    alt: string
    [key: string]: unknown
  }) {
    return <img src={src} alt={alt} {...props} />
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

function heroScope(container: HTMLElement) {
  return within(container.querySelector('main section') as HTMLElement)
}

describe('WebsitesPage build-log hero', () => {
  it('renders the hero copy, CTAs, and work anchor', () => {
    const { container } = render(<WebsitesPage />)
    const hero = heroScope(container)

    expect(
      hero.getByRole('heading', {
        level: 1,
        name: 'Your website, engineered live.',
      }),
    ).toBeInTheDocument()

    const primary = hero.getByRole('link', { name: 'Join the waitlist' })
    expect(primary).toHaveAttribute('href', '/waitlist?focus=website')

    const secondary = hero.getByRole('link', { name: 'See the work' })
    expect(secondary).toHaveAttribute('href', '#work')
    expect(document.getElementById('work')).toBeInTheDocument()
  })

  it('renders the build terminal with the server-side computer poster', () => {
    const { container } = render(<WebsitesPage />)
    const hero = heroScope(container)

    expect(hero.getByText('prism -- build')).toBeInTheDocument()

    const poster = container.querySelector(
      'img[src="/animations/computer/poster.svg"]',
    )
    expect(poster).toBeInTheDocument()
    expect(poster).toHaveAttribute('aria-hidden', 'true')
  })

  it('keeps the GSC proof values verbatim in the hero strip', () => {
    const { container } = render(<WebsitesPage />)
    const hero = heroScope(container)

    const saorsa = getCaseStudyMetric('saorsa-growth-partners')
    const roseville = getCaseStudyMetric('roseville-dental-academy')
    const wong = getCaseStudyMetric('dr-christopher-wong')

    for (const metric of [saorsa, roseville, wong]) {
      expect(hero.getByText(metric.value)).toBeInTheDocument()
    }
    expect(
      hero.getByText(`${saorsa.label} for Saorsa Growth Partners`),
    ).toBeInTheDocument()
    expect(
      hero.getByRole('link', { name: new RegExp(saorsa.value.replace(/[.+]/g, '\\$&')) }),
    ).toHaveAttribute('href', '/case-studies/saorsa-growth-partners')
    expect(hero.getByText('Source: Google Search Console')).toBeInTheDocument()
  })

  it('lists the seven search surfaces in the READ BY ledger with icons', () => {
    render(<WebsitesPage />)

    const ledger = screen.getByRole('list', {
      name: 'Search and answer surfaces',
    })
    const tokens = within(ledger).getAllByRole('listitem')
    expect(tokens.map((token) => token.textContent)).toEqual([
      expect.stringContaining('Google Search'),
      expect.stringContaining('Google Maps'),
      expect.stringContaining('AI Overviews'),
      expect.stringContaining('ChatGPT'),
      expect.stringContaining('Gemini'),
      expect.stringContaining('Claude'),
      expect.stringContaining('Perplexity'),
    ])

    for (const token of tokens) {
      const icon = token.querySelector('img, svg')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('adds inline icons to the Visibility search-surface pills', () => {
    render(<WebsitesPage />)

    const visibility = screen
      .getByRole('heading', { name: 'Support discovery on Google and in AI.' })
      .closest('section') as HTMLElement

    for (const surface of [
      'Google Search',
      'Google Maps',
      'AI Overviews',
      'ChatGPT',
      'Gemini',
      'Claude',
      'Perplexity',
    ]) {
      const pill = within(visibility).getByText(surface).closest('span')
      expect(pill?.querySelector('img, svg')).toBeInTheDocument()
    }
  })

  it('keeps hero copy free of em dashes', () => {
    const { container } = render(<WebsitesPage />)

    const hero = container.querySelector('main section')
    expect(hero?.textContent).not.toContain('—')
  })
})
