import { render, screen } from '@testing-library/react'

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
      'Landing pages that convert',
      'Ad creative that gets customers',
      'Websites that rank and convert',
      'Video that sells',
      'Photoshoots you own',
      'Content that compounds',
    ])
  })

  it('renders the owner-deliverable page and keeps agency extras out of the headline grid', () => {
    render(<PrismInfinityPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /unlimited\s+landing pages\.\s+one subscription\./i,
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
})
