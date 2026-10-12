import { render, screen, within } from '@testing-library/react'

import ClientPage from '@/app/client-page'
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

  it('tells the story in order: promise, work, proof, services, love, founder, how to get in', () => {
    render(<ClientPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /^make your business impossible to ignore\.$/i,
      }),
    ).toBeInTheDocument()

    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent?.trim())

    expect(headings).toEqual([
      'proof you can click.',
      'numbers, not adjectives.',
      'one team. every channel.',
      'real clients. real launches.',
      'in their words.',
      'built by a founder chasing LA 2028.',
      'built for our team. free for yours.',
      'fully booked. here’s how to get in.',
      'questions, answered.',
      `get on the list for ${getWaitlistIntakeMonth().month}.`,
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

  it('features real client work and never former clients', () => {
    render(<ClientPage />)

    const work = document.getElementById('work') as HTMLElement
    const workLinks = within(work)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href') ?? '')
    expect(
      workLinks.filter((href) => href.startsWith('/case-studies/')).length,
    ).toBeGreaterThanOrEqual(8)
    expect(workLinks).toContain('/case-studies')

    const allHrefs = Array.from(document.querySelectorAll('a')).map(
      (link) => link.getAttribute('href') ?? '',
    )
    for (const slug of FORMER_CLIENT_SLUGS) {
      expect(allHrefs).not.toContain(`/case-studies/${slug}`)
    }

    expect(
      screen.getByRole('link', { name: /read the case study/i }),
    ).toHaveAttribute('href', '/case-studies/dr-christopher-wong')
  })

  it('separates client quotes from community comments', () => {
    render(<ClientPage />)

    expect(screen.getAllByText('Website client').length).toBeGreaterThanOrEqual(
      4,
    )
    expect(screen.getAllByText(/on Instagram$/).length).toBeGreaterThanOrEqual(
      3,
    )
    expect(
      screen.getByRole('link', { name: /see the wall of love/i }),
    ).toHaveAttribute('href', '/wall-of-love')
  })

  it('links the services bento and products', () => {
    render(<ClientPage />)

    const services = document.getElementById('services') as HTMLElement
    expect(services.querySelectorAll('[data-home-service-card]')).toHaveLength(
      6,
    )
    for (const href of ['/websites', '/content', '/ads']) {
      expect(services.querySelector(`a[href="${href}"]`)).not.toBeNull()
    }

    const products = document.getElementById('products') as HTMLElement
    expect(
      within(products).getByRole('link', { name: 'Midas' }),
    ).toHaveAttribute('href', 'https://midas-ai.dev')
    expect(
      within(products).getByRole('link', { name: 'zRead' }),
    ).toHaveAttribute('target', '_blank')
  })
})
