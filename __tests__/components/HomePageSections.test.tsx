import { render, screen, within } from '@testing-library/react'

import ClientPage from '@/app/client-page'
import {
  HOMEPAGE_CASE_STUDIES,
  HOMEPAGE_MORE_WORK,
} from '@/components/home/homepage-content'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import { SOCIAL_PROOF } from '@/lib/proof-metrics'
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

  it('tells the story in order: promise, work, proof, reach, services, love, founder, how to get in', () => {
    render(<ClientPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /^impossible is temporary\.$/i,
      }),
    ).toBeInTheDocument()

    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent?.trim())

    expect(headings).toEqual([
      'every business has an impossible.',
      `${HOMEPAGE_MORE_WORK.count} more. every one is live.`,
      'numbers, not adjectives.',
      'we built our own audience from zero.',
      'shine. convert. get seen.',
      'in their words.',
      'built by a founder chasing LA 2028.',
      'fully booked. here’s how to get in.',
      'questions, answered.',
      'built for our team. free for yours.',
      'tell us your impossible.',
    ])
  })

  it('keeps the waitlist the only sales action, with the live intake month', () => {
    render(<ClientPage />)

    const waitlistLinks = screen
      .getAllByRole('link', { name: /join the waitlist/i })
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

    heroScope.getByRole('link', { name: /join the waitlist/i }).click()
    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/waitlist',
      'Join the waitlist',
      'homepage hero',
    )

    const seeWork = heroScope.getByRole('link', { name: /see the work/i })
    expect(seeWork).toHaveAttribute('href', '#work')

    expect(hero).toHaveTextContent(
      /website design, content, ads, and AEO that turn strangers into customers/i,
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
    expect(document.body).toHaveTextContent(SOCIAL_PROOF.combinedAudience)
    expect(document.body).toHaveTextContent(SOCIAL_PROOF.youtube.activity)
    expect(document.body).toHaveTextContent(/Google Search Console/)
    expect(document.body).toHaveTextContent(/Verified October 4, 2026/)
  })

  it('features the six client stories, the client logos, and never former clients', () => {
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

    const moreWork = document.getElementById('more-work') as HTMLElement
    const moreHrefs = within(moreWork)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href') ?? '')
    expect(
      moreHrefs.filter((href) => href.startsWith('/case-studies/')).length,
    ).toBeGreaterThanOrEqual(8)
    expect(moreHrefs).toContain('/case-studies')

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

  it('separates client quotes from community comments', () => {
    render(<ClientPage />)

    expect(screen.getAllByText('Website Design client').length).toBeGreaterThanOrEqual(
      4,
    )
    expect(screen.getAllByText(/on Instagram$/).length).toBeGreaterThanOrEqual(
      3,
    )
    expect(
      screen.getByRole('link', { name: /see the wall of love/i }),
    ).toHaveAttribute('href', '/wall-of-love')
  })

  it('links the three pillars, the four services, and products', () => {
    render(<ClientPage />)

    const services = document.getElementById('services') as HTMLElement
    const cards = services.querySelectorAll<HTMLElement>(
      '[data-home-service-card]',
    )
    expect(cards).toHaveLength(3)
    for (const href of ['/website-design', '/content', '/ads', '/aeo']) {
      expect(services.querySelector(`a[href="${href}"]`)).not.toBeNull()
    }

    // "get seen." carries the reach services: Content, Ads, and AEO.
    const reach = Array.from(cards).find((card) =>
      within(card).queryByRole('heading', { name: 'get seen.' }),
    ) as HTMLElement
    expect(reach).toBeDefined()
    expect(
      within(reach)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href')),
    ).toEqual(['/content', '/ads', '/aeo'])

    // The pill row under the pillars lists every service, then All services.
    const allServices = within(services).getByRole('link', {
      name: /all services/i,
    })
    expect(allServices).toHaveAttribute('href', '/services')
    const pillRow = allServices.parentElement as HTMLElement
    expect(
      within(pillRow)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href')),
    ).toEqual(['/website-design', '/content', '/ads', '/aeo', '/services'])

    const products = document.getElementById('products') as HTMLElement
    expect(
      within(products).getByRole('link', { name: 'Midas' }),
    ).toHaveAttribute('href', 'https://midas-ai.dev')
    expect(
      within(products).getByRole('link', { name: 'zRead' }),
    ).toHaveAttribute('target', '_blank')
  })
})
