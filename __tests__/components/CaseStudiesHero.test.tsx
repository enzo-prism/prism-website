import { render, screen, within } from '@testing-library/react'

import CaseStudiesPage from '@/app/case-studies/client-page'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { FREE_AUDIT_CTA_TEXT } from '@/lib/constants'

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

const measuredCount = CASE_STUDIES.filter(
  (study) => (study.structured?.results?.length ?? 0) > 0,
).length

describe('CaseStudiesPage ledger hero', () => {
  it('renders the kept H1 with the data-derived ledger', () => {
    const { container } = render(<CaseStudiesPage />)
    const hero = within(
      container.querySelector('#case-studies-hero') as HTMLElement,
    )

    expect(
      hero.getByRole('heading', {
        level: 1,
        name: 'The work behind the growth',
      }),
    ).toBeInTheDocument()

    expect(
      hero.getByText(
        new RegExp(
          `${CASE_STUDIES.length} client stories[\\s\\S]*${measuredCount} measured result sets[\\s\\S]*Google Search Console verified`,
        ),
      ),
    ).toBeInTheDocument()
  })

  it('links the quiet action to the studies list anchor', () => {
    const { container } = render(<CaseStudiesPage />)
    const hero = within(
      container.querySelector('#case-studies-hero') as HTMLElement,
    )

    const action = hero.getByRole('link', { name: /Browse the studies/ })
    expect(action).toHaveAttribute('href', '#case-studies-list')
    expect(document.getElementById('case-studies-list')).toBeInTheDocument()
  })

  it('renders the planet ghost underlay and server-side poster', () => {
    const { container } = render(<CaseStudiesPage />)
    const hero = container.querySelector('#case-studies-hero') as HTMLElement

    const ghost = within(hero).getByText(
      (_, element) =>
        element?.tagName === 'PRE' &&
        (element.textContent?.length ?? 0) > 1000,
    )
    expect(ghost).toHaveAttribute('aria-hidden', 'true')
    expect(ghost).toHaveAttribute('data-ghost-frame', '')

    const poster = hero.querySelector(
      'img[src="/animations/planet/poster.svg"]',
    )
    expect(poster).toBeInTheDocument()
    expect(poster).toHaveAttribute('aria-hidden', 'true')
  })

  it('keeps the footer conversion block byte-identical', () => {
    render(<CaseStudiesPage />)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'What could we improve for your business?',
      }),
    ).toBeInTheDocument()

    const audit = screen.getByRole('link', { name: FREE_AUDIT_CTA_TEXT })
    expect(audit).toHaveAttribute('href', '/waitlist')

    const reviews = screen.getByRole('link', { name: 'Read what clients say' })
    expect(reviews).toHaveAttribute('href', '/wall-of-love')
  })

  it('keeps hero copy free of em dashes', () => {
    const { container } = render(<CaseStudiesPage />)

    const hero = container.querySelector('#case-studies-hero')
    expect(hero?.textContent).not.toContain('—')
  })
})
