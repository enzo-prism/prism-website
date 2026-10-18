import { fireEvent, render, screen, within } from '@testing-library/react'

import WebsitesPage from '@/app/websites/page'
import { getCaseStudyMetric } from '@/lib/case-study-data'
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

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockNextImage({
    src,
    alt,
    priority: _priority,
    ...props
  }: {
    src: string
    alt: string
    priority?: boolean
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

jest.mock('@/utils/analytics', () => ({
  trackLinkInteraction: jest.fn(),
}))

const wong = getCaseStudyMetric('dr-christopher-wong')
const belize = getCaseStudyMetric('belize-kids-foundation')

function heroScope(container: HTMLElement) {
  return within(container.querySelector('main section') as HTMLElement)
}

beforeEach(() => {
  jest.mocked(trackLinkInteraction).mockClear()
})

describe('WebsitesPage launch hero', () => {
  it('renders the lowercase h1, the website-focused CTA, and the work anchor', () => {
    const { container } = render(<WebsitesPage />)
    const hero = heroScope(container)

    expect(
      hero.getByRole('heading', {
        level: 1,
        name: 'a website that makes choosing you easy.',
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)

    const primary = hero.getByRole('link', { name: 'Join the waitlist' })
    expect(primary).toHaveAttribute('href', '/waitlist?focus=website')
    fireEvent.click(primary)
    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/waitlist?focus=website',
      'Join the waitlist',
      'websites hero',
    )

    const secondary = hero.getByRole('link', { name: 'See the work' })
    expect(secondary).toHaveAttribute('href', '#work')
    expect(document.getElementById('work')).toBeInTheDocument()
  })

  it('shows real client sites in the hero visual', () => {
    const { container } = render(<WebsitesPage />)
    const hero = heroScope(container)

    expect(
      hero.getByAltText('Exquisite Dentistry website built by Prism'),
    ).toHaveAttribute(
      'src',
      '/case-studies/exquisite-dentistry-home-desktop.jpg',
    )
    expect(
      hero.getByAltText(
        'Dr. Christopher B. Wong mobile website built by Prism',
      ),
    ).toHaveAttribute(
      'src',
      '/case-studies/dr-christopher-wong-home-mobile.jpg',
    )
  })

  it('keeps the Dr. Wong GSC proof verbatim with its source in the hero', () => {
    const { container } = render(<WebsitesPage />)
    const hero = heroScope(container)

    const proof = hero.getByRole('link', {
      name: new RegExp(wong.value.replace(/[.+]/g, '\\$&')),
    })
    expect(proof).toHaveAttribute('href', '/case-studies/dr-christopher-wong')
    expect(proof).toHaveTextContent(`${wong.label} for Dr. Christopher Wong`)
    expect(
      hero.getByText(`Source: ${wong.sourceName} · ${wong.dateRange}`),
    ).toBeInTheDocument()
  })

  it('keeps hero copy free of em dashes', () => {
    const { container } = render(<WebsitesPage />)

    const hero = container.querySelector('main section')
    expect(hero?.textContent).not.toContain('—')
  })
})

describe('WebsitesPage sections', () => {
  it('lists the seven search and answer surfaces with decorative icons', () => {
    render(<WebsitesPage />)

    expect(
      screen.getByText('Support discovery on Google and in AI.'),
    ).toBeInTheDocument()

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

  it('shows both published client results with their source and date range', () => {
    render(<WebsitesPage />)

    const results = screen
      .getByRole('heading', { level: 2, name: 'measured at the source.' })
      .closest('section') as HTMLElement

    expect(
      within(results).getByRole('link', {
        name: 'Read the case study for Dr. Christopher Wong',
      }),
    ).toHaveAttribute('href', '/case-studies/dr-christopher-wong')
    expect(
      within(results).getByRole('link', {
        name: 'Read the case study for Belize Kids',
      }),
    ).toHaveAttribute('href', '/case-studies/belize-kids-foundation')

    for (const metric of [wong, belize]) {
      expect(within(results).getAllByText(metric.value).length).toBeGreaterThan(
        0,
      )
    }
    expect(
      within(results).getAllByText(/Source: Google Search Console/),
    ).toHaveLength(2)
    expect(
      within(results).getAllByText(new RegExp(wong.dateRange as string)),
    ).toHaveLength(2)
    expect(within(results).getAllByText('Website client')).toHaveLength(2)
  })

  it('answers FAQs in crawlable disclosures', () => {
    render(<WebsitesPage />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'before you join.' }),
    ).toBeInTheDocument()

    const first = screen
      .getByText('What makes a Prism PRO website different?')
      .closest('details')
    expect(first).toHaveAttribute('open')

    const ownership = screen
      .getByText('Do I own the website?')
      .closest('details') as HTMLElement
    expect(ownership).not.toHaveAttribute('open')
    // Collapsed answers still ship in the HTML so crawlers can read them.
    expect(
      within(ownership).getByText(/There is no lock-in of any kind\./),
    ).toBeInTheDocument()
  })

  it('cross-links the other three services, not the current one', () => {
    render(<WebsitesPage />)

    const siblings = screen
      .getByRole('heading', { level: 2, name: 'also from Prism.' })
      .closest('section') as HTMLElement
    const hrefs = within(siblings)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
    expect(hrefs).toEqual(['/content', '/ads', '/aeo'])
  })

  it('ends with the website-focused final CTA', () => {
    render(<WebsitesPage />)

    const finalCta = screen
      .getByRole('heading', { level: 2, name: 'your site, next.' })
      .closest('section') as HTMLElement
    const cta = within(finalCta).getByRole('link', {
      name: 'Join the waitlist',
    })
    expect(cta).toHaveAttribute('href', '/waitlist?focus=website')
    fireEvent.click(cta)
    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/waitlist?focus=website',
      'Join the waitlist',
      'websites final cta',
    )
  })

  it('keeps the whole page free of em dashes, prices, and former clients', () => {
    const { container } = render(<WebsitesPage />)
    const text = (
      container.querySelector('main')?.textContent ?? ''
    ).toLowerCase()

    expect(text).not.toContain('—')
    expect(text).not.toMatch(/\$\d/)
    for (const former of ['saorsa', 'sr4', 'laguna beach dental arts']) {
      expect(text).not.toContain(former)
    }
  })
})
