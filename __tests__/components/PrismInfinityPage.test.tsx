import { render, screen, within } from '@testing-library/react'

import PrismInfinityPage from '@/app/prism-infinity/page'
import {
  DELIVERABLES,
  MARQUEE_ITEMS,
  ROTATING_WORDS,
} from '@/components/prism-infinity/infinity-content'

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

jest.mock('@/components/schema-markup', () => ({
  FAQSchema: function MockFAQSchema() {
    return null
  },
  ServiceSchema: function MockServiceSchema() {
    return null
  },
}))

describe('Prism Infinity framing', () => {
  it('leads the hero with owner-valued deliverables, not agency departments', () => {
    expect([...ROTATING_WORDS]).toEqual([
      'landing pages',
      'ad creative',
      'websites',
      'photoshoots',
      'video ads',
    ])
    expect(MARQUEE_ITEMS).toEqual(
      expect.arrayContaining([
        'Landing pages',
        'Ad creative',
        'Websites',
        'Photoshoots',
        'Video ads',
      ]),
    )
    expect(DELIVERABLES.map((item) => item.title)).toEqual([
      'Landing pages for your offers',
      'Ad creative to test',
      'New websites and site updates',
      'Video edits for your story',
      'Photoshoots you own',
      'Content for your channels',
    ])
  })

  it('renders the owner-deliverable page and keeps agency extras out of the headline grid', () => {
    render(<PrismInfinityPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /unlimited\s+landing pages\s*\.\s+one subscription\./i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /the work owners actually need\./i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Booking landing page')).toBeInTheDocument()
    expect(screen.getByText('Homepage conversion pass')).toBeInTheDocument()
    expect(screen.getByText('Meta ads (6 variations)')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /keep the queue full\./i,
      }),
    ).toBeInTheDocument()

    expect(screen.queryByText('Business card design')).not.toBeInTheDocument()
    expect(screen.queryByText('Print design')).not.toBeInTheDocument()
    expect(screen.queryByText('Slide deck design')).not.toBeInTheDocument()
    expect(screen.queryByText('Logo design')).not.toBeInTheDocument()
  })

  it('keeps every CTA on the waitlist, shows no prices, and ships FAQ answers in the HTML', () => {
    const { container } = render(<PrismInfinityPage />)

    const ctas = screen.getAllByRole('link', { name: /join the waitlist/i })
    expect(ctas.length).toBeGreaterThanOrEqual(2)
    for (const cta of ctas) {
      expect(cta).toHaveAttribute('href', '/waitlist')
    }
    expect(container.textContent ?? '').not.toMatch(/\$\s?\d/)

    const pause = screen
      .getByText('Can I really pause or cancel anytime?')
      .closest('details') as HTMLElement
    expect(pause).not.toHaveAttribute('open')
    expect(within(pause).getByText(/You can pause or cancel the plan/)).toBeInTheDocument()
  })
})
