import { fireEvent, render, screen, within } from '@testing-library/react'

import CaseStudiesPage from '@/app/case-studies/client-page'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    prefetch: _prefetch,
    ...props
  }: {
    href: string
    children: React.ReactNode
    prefetch?: boolean
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
  CollectionPageSchema: function MockCollectionPageSchema() {
    return null
  },
  ItemListSchema: function MockItemListSchema() {
    return null
  },
  BreadcrumbSchema: function MockBreadcrumbSchema() {
    return null
  },
}))

const FORMER = new Set<string>(FORMER_CLIENT_SLUGS)
const currentStudies = CASE_STUDIES.filter((study) => !FORMER.has(study.slug))
const verifiedStudies = currentStudies.filter(
  (study) => (study.structured?.results?.length ?? 0) > 0,
)

function renderHero() {
  const { container } = render(<CaseStudiesPage />)
  const heroEl = container.querySelector('#case-studies-hero') as HTMLElement
  return { container, heroEl, hero: within(heroEl) }
}

describe('Work index (/case-studies)', () => {
  it('renders the lowercase hero headline and the waitlist CTA', () => {
    const { hero } = renderHero()

    expect(
      hero.getByRole('heading', { level: 1, name: 'different markets. same two problems.' }),
    ).toBeInTheDocument()

    const cta = hero.getByRole('link', { name: /Join the waitlist/ })
    expect(cta).toHaveAttribute('href', '/waitlist')
  })

  it('links the secondary action to the gallery anchor', () => {
    const { hero } = renderHero()

    const action = hero.getByRole('link', { name: /Browse the work/ })
    expect(action).toHaveAttribute('href', '#case-studies-list')
    expect(document.getElementById('case-studies-list')).toBeInTheDocument()
  })

  it('computes the ledger from current clients and shows only verified metrics with their source', () => {
    const { heroEl, hero } = renderHero()

    expect(hero.getByText('Client stories')).toBeInTheDocument()
    expect(hero.getAllByText(String(currentStudies.length)).length).toBeGreaterThan(0)

    expect(verifiedStudies.map((study) => study.slug).sort()).toEqual([
      'belize-kids-foundation',
      'dr-christopher-wong',
    ])
    for (const study of verifiedStudies) {
      const metric = study.structured!.results![0]
      const cell = hero.getByRole('link', { name: new RegExp(metric.value.replace('+', '\\+')) })
      expect(cell).toHaveAttribute('href', `/case-studies/${study.slug}`)
      expect(heroEl.textContent).toContain(metric.label)
      expect(heroEl.textContent).toContain(metric.sourceName!)
      expect(heroEl.textContent).toContain(metric.dateRange!)
    }
  })

  it('shows every current client in the gallery and keeps former clients out of it', () => {
    render(<CaseStudiesPage />)

    const panel = screen.getByRole('tabpanel')
    const hrefs = within(panel)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))

    for (const study of currentStudies) {
      expect(hrefs).toContain(`/case-studies/${study.slug}`)
    }
    for (const slug of FORMER_CLIENT_SLUGS) {
      expect(hrefs).not.toContain(`/case-studies/${slug}`)
    }
  })

  it('never lists former clients anywhere on the index (no archive row)', () => {
    const { container } = render(<CaseStudiesPage />)

    const hrefs = Array.from(container.querySelectorAll('a')).map((link) =>
      link.getAttribute('href'),
    )
    const former = CASE_STUDIES.filter((study) => FORMER.has(study.slug))
    for (const study of former) {
      expect(hrefs).not.toContain(`/case-studies/${study.slug}`)
      expect(container.textContent).not.toContain(study.client)
    }
  })

  it('makes the filter row a scrollable list of tabs', () => {
    render(<CaseStudiesPage />)

    const list = screen.getByRole('tablist', { name: 'Filter work by industry' })
    expect(list.parentElement?.className).toContain('overflow-x-auto')
    expect(screen.getByRole('tab', { name: /^All/ })).toHaveAttribute(
      'aria-selected',
      'true',
    )
  })

  it('filters the gallery by industry', () => {
    render(<CaseStudiesPage />)

    const dentalTab = screen.getByRole('tab', { name: /^Dental/ })
    fireEvent.mouseDown(dentalTab, { button: 0, ctrlKey: false })

    const panel = screen.getByRole('tabpanel')
    const hrefs = within(panel)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
      .filter((href) => href?.startsWith('/case-studies/'))

    const dentalSlugs = currentStudies
      .filter((study) => study.category === 'dentistry')
      .map((study) => `/case-studies/${study.slug}`)

    expect(hrefs.sort()).toEqual(dentalSlugs.sort())
  })

  it('ends at the waitlist with a secondary link to the Wall of Love', () => {
    render(<CaseStudiesPage />)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'love your business again.',
      }),
    ).toBeInTheDocument()

    const reviews = screen.getByRole('link', { name: /Read what clients say/ })
    expect(reviews).toHaveAttribute('href', '/wall-of-love')
  })

  it('names the two shared problems with examples from different markets', () => {
    render(<CaseStudiesPage />)

    const pattern = screen.getByRole('region', { name: 'be found. be chosen.' })
    for (const name of ['be found.', 'be chosen.']) {
      expect(within(pattern).getByRole('heading', { level: 3, name })).toBeInTheDocument()
    }
    const hrefs = within(pattern)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
    expect(hrefs.length).toBeGreaterThanOrEqual(4)
    for (const href of hrefs) {
      const slug = href?.replace('/case-studies/', '')
      expect(currentStudies.map((study) => study.slug)).toContain(slug)
    }
  })

  it('closes on how working with Prism feels before the waitlist', () => {
    render(<CaseStudiesPage />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'your team, amplified.' }),
    ).toBeInTheDocument()
  })

  it('keeps hero copy free of em dashes', () => {
    const { heroEl } = renderHero()
    expect(heroEl.textContent).not.toContain('—')
  })
})
