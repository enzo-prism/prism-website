import { render, screen, within } from '@testing-library/react'

import ClientPage from '@/app/client-page'
import { HOMEPAGE_CASE_STUDIES } from '@/components/home/homepage-content'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import { getWaitlistIntakeMonth } from '@/lib/waitlist'
import { trackLinkInteraction } from '@/utils/analytics'

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    prefetch: _prefetch,
    ...props
  }: {
    href: string | { pathname?: string }
    children: React.ReactNode
    prefetch?: boolean
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

jest.mock('@/utils/analytics', () => ({
  trackLinkInteraction: jest.fn(),
}))

jest.mock('@/components/navbar', () => ({
  __esModule: true,
  default: function MockNavbar() {
    return <nav data-testid="mock-navbar" />
  },
}))

jest.mock('@/components/footer', () => ({
  __esModule: true,
  default: function MockFooter() {
    return <footer data-testid="mock-footer" />
  },
}))

describe('ClientPage homepage flow', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('tells the story in order: promise, work, numbers, services, love, how we work, how to get in, close', () => {
    render(<ClientPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /^your growth team\.$/i,
      }),
    ).toBeInTheDocument()

    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .filter((heading) => !heading.closest('details:not([open])'))
      .map((heading) => heading.textContent?.trim())

    expect(headings).toEqual([
      'every business has an impossible.',
      'numbers, not adjectives.',
      'four services. one team.',
      'in their words.',
      'a direct line to the people doing the work.',
      'fully booked. here’s how to get in.',
      'questions, answered.',
      'tell us your impossible.',
    ])
  })

  it('keeps the waitlist the only sales action, with the live intake month', () => {
    render(<ClientPage />)

    const waitlistLinks = screen
      .getAllByRole('link', { name: /tell us about your business/i })
      .map((link) => link.getAttribute('href'))
    expect(waitlistLinks.length).toBeGreaterThanOrEqual(3)
    expect(new Set(waitlistLinks)).toEqual(new Set(['/waitlist']))

    const month = getWaitlistIntakeMonth().month
    expect(document.body).toHaveTextContent('Prism is fully booked right now.')
    expect(document.body).toHaveTextContent(
      `Join the waitlist to work with us in ${month}.`,
    )
    expect(document.body).toHaveTextContent(`Waitlist open for ${month}`)
    expect(document.body.textContent).not.toMatch(
      /book a (free )?(call|demo)|start my website|get started free/i,
    )
  })

  it('tracks the hero CTAs with their location', () => {
    render(<ClientPage />)

    const hero = document.getElementById('homepage-hero')
    expect(hero).not.toBeNull()
    const heroScope = within(hero as HTMLElement)

    heroScope
      .getByRole('link', { name: /tell us about your business/i })
      .click()
    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/waitlist',
      'Tell us about your business',
      'homepage hero',
    )

    const seeWork = heroScope.getByRole('link', { name: /see the work/i })
    expect(seeWork).toHaveAttribute('href', '#work')
    // One primary button in the hero; the work is a text link.
    expect(
      heroScope.getAllByRole('link', { name: /tell us about your business/i }),
    ).toHaveLength(1)

    expect(hero).toHaveTextContent(
      /designers, engineers, and marketers for small businesses/i,
    )
  })

  it('shows only verified numbers with their sources', () => {
    render(<ClientPage />)

    const wong = CASE_STUDIES.find(
      (study) => study.slug === 'dr-christopher-wong',
    )
    const belize = CASE_STUDIES.find(
      (study) => study.slug === 'belize-kids-foundation',
    )
    expect(document.body).toHaveTextContent(
      wong?.structured?.results?.[0]?.value ?? 'missing',
    )
    expect(document.body).toHaveTextContent(
      belize?.structured?.results?.[0]?.value ?? 'missing',
    )
    expect(document.body).toHaveTextContent(/Google Search Console/)
    expect(document.body).toHaveTextContent(/Verified October 4, 2026/)
  })

  it('features three client stories, links every live site, shows the logos, and never former clients', () => {
    render(<ClientPage />)

    const work = document.getElementById('work') as HTMLElement
    const workHrefs = within(work)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href') ?? '')
    for (const slug of HOMEPAGE_CASE_STUDIES.slugs) {
      expect(workHrefs).toContain(`/case-studies/${slug}`)
    }
    expect(
      within(work).getAllByRole('link', { name: /read the case study/i }),
    ).toHaveLength(HOMEPAGE_CASE_STUDIES.slugs.length)
    expect(work).toHaveTextContent('Sells to businesses')
    expect(work).toHaveTextContent('Sells to consumers')

    expect(HOMEPAGE_CASE_STUDIES.slugs).toHaveLength(3)
    expect(
      within(work).getByRole('link', { name: /see all \d+ live sites/i }),
    ).toHaveAttribute('href', '/case-studies')

    const logos = within(
      document.getElementById('clients') as HTMLElement,
    ).getAllByRole('img')
    expect(logos.length).toBeGreaterThanOrEqual(15)

    const allHrefs = Array.from(document.querySelectorAll('a')).map(
      (link) => link.getAttribute('href') ?? '',
    )
    for (const slug of FORMER_CLIENT_SLUGS) {
      expect(allHrefs).not.toContain(`/case-studies/${slug}`)
    }
  })

  it('quotes four attributed clients and leaves comments to the wall', () => {
    render(<ClientPage />)

    const love = document.getElementById('love') as HTMLElement
    expect(within(love).getAllByRole('blockquote')).toHaveLength(4)
    expect(
      within(love).getAllByText('Website Design client').length,
    ).toBeGreaterThanOrEqual(2)
    expect(within(love).queryAllByText(/on Instagram$/)).toHaveLength(0)
    expect(
      screen.getByRole('link', { name: /see the wall of love/i }),
    ).toHaveAttribute('href', '/wall-of-love')
  })

  it('lists the four services as band rows, then all services', () => {
    render(<ClientPage />)

    const services = document.getElementById('services') as HTMLElement
    const rows = Array.from(
      services.querySelectorAll<HTMLElement>('[data-home-service-card]'),
    )
    // One taxonomy: the same four services, in the same order, as the menu.
    expect(rows.map((row) => row.dataset.serviceBand)).toEqual([
      'website',
      'content',
      'ads',
      'aeo',
    ])
    expect(
      rows.map(
        (row) => within(row).getByRole('heading', { level: 3 }).textContent,
      ),
    ).toEqual(['Website Design', 'Content', 'Ads', 'AEO'])
    // Each row is one link named for its service.
    expect(
      rows.map((row) => {
        const links = within(row).getAllByRole('link')
        expect(links).toHaveLength(1)
        return links[0].getAttribute('href')
      }),
    ).toEqual(['/website-design', '/content', '/ads', '/aeo'])
    // Each row carries its band colour.
    for (const row of rows) {
      expect(row.style.getPropertyValue('--band')).toMatch(/^var\(--spectrum-/)
    }

    expect(
      within(services).getByRole('link', { name: /all services/i }),
    ).toHaveAttribute('href', '/services')
  })
})
