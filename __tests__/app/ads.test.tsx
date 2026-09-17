import { render, screen, within } from '@testing-library/react'

import AdsPage from '@/app/ads/page'

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
  VideoSchema: function MockVideoSchema() {
    return null
  },
}))

describe('AdsPage launch-rail hero', () => {
  it('renders the hero copy, CTAs, and platforms anchor', async () => {
    const { container } = render(await AdsPage())
    const hero = within(container.querySelector('main section') as HTMLElement)

    expect(
      hero.getByRole('heading', {
        level: 1,
        name: 'Launch campaigns that bring qualified inquiries.',
      }),
    ).toBeInTheDocument()

    const primary = hero.getByRole('link', { name: 'Join the waitlist' })
    expect(primary).toHaveAttribute('href', '/waitlist?focus=ads')

    const secondary = hero.getByRole('link', { name: 'See the platforms' })
    expect(secondary).toHaveAttribute('href', '#platforms')
    expect(document.getElementById('platforms')).toBeInTheDocument()
  })

  it('lists the five ad platforms as STAGES rows with icons', async () => {
    const { container } = render(await AdsPage())
    const hero = within(container.querySelector('main section') as HTMLElement)

    const stages = hero.getByRole('list', { name: 'Ad platforms' })
    const rows = within(stages).getAllByRole('listitem')
    expect(rows).toHaveLength(5)
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('Google'),
      expect.stringContaining('Meta'),
      expect.stringContaining('TikTok'),
      expect.stringContaining('Yelp'),
      expect.stringContaining('ChatGPT Ads'),
    ])

    for (const row of rows) {
      const icon = row.querySelector('img, svg')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    }

    expect(hero.getByText('Launch manifest')).toBeInTheDocument()
    expect(hero.getByText('Weekly optimization')).toBeInTheDocument()
    expect(hero.getByText('Call + inquiry tracking')).toBeInTheDocument()
  })

  it('renders the server-side rocket poster for no-JS and reduced motion', async () => {
    const { container } = render(await AdsPage())

    const poster = container.querySelector(
      'img[src="/animations/rocket/poster.svg"]',
    )
    expect(poster).toBeInTheDocument()
    expect(poster).toHaveAttribute('aria-hidden', 'true')
    expect(poster?.closest('[aria-hidden="true"]')).not.toBeNull()
  })

  it('keeps hero copy free of em dashes and metric claims', async () => {
    const { container } = render(await AdsPage())

    const hero = container.querySelector('main section')
    expect(hero).not.toBeNull()
    expect(hero?.textContent).not.toContain('—')
    // Zero metric claims: no digits anywhere in the hero copy.
    expect(hero?.textContent).not.toMatch(/\d/)
  })

  it('gives the Yelp Ads platform card the vendored yelp mark', async () => {
    render(await AdsPage())

    const heading = screen.getByRole('heading', { name: 'Yelp Ads' })
    const card = heading.closest('article')
    expect(card).not.toBeNull()
    expect(
      card?.querySelector('img[src="/logos/svgl/yelp.svg"]'),
    ).toBeInTheDocument()
  })
})
