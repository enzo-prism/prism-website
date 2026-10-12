import { fireEvent, render, screen, within } from '@testing-library/react'

import PricingPageClient from '@/app/pricing/client-page'
import DentalOsPage from '@/app/dental-os/page'
import ServicesPage from '@/app/services/page'
import FAQPage from '@/app/faq/page'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import {
  CANONICAL_PRICING_OFFERS,
  PRICING_OFFER_ORDER,
} from '@/lib/pricing-model'
import { PRISM_SERVICES } from '@/lib/services'
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

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockNextImage({
    src,
    alt,
  }: {
    src: string
    alt: string
  }) {
    return <img src={src} alt={alt} />
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

jest.mock('@/utils/analytics', () => ({
  trackLinkInteraction: jest.fn(),
}))

const PRICE_PATTERN = /\$\s?\d/

describe('/pricing', () => {
  beforeEach(() => jest.mocked(trackLinkInteraction).mockClear())

  it('keeps the locked headline and the shared capacity copy', () => {
    const { container } = render(<PricingPageClient />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /a clearer way to invest in growth\./i,
      }),
    ).toBeInTheDocument()
    const text = container.textContent ?? ''
    expect(text).toMatch(/Prism is fully booked right now\./)
    expect(text).toMatch(/Join the waitlist to work with us in [A-Z][a-z]+\./)
    expect(text).not.toMatch(PRICE_PATTERN)

    const care = screen.getByText('What is Website Care?').closest('details') as HTMLElement
    expect(within(care).getByText(/Optional ongoing care/)).toBeInTheDocument()
  })

  it('renders one plan card per canonical offer with its waitlist focus href', () => {
    render(<PricingPageClient />)

    const plansHeading = screen.getByRole('heading', {
      level: 2,
      name: /four ways to work with prism\./i,
    })
    const plans = plansHeading.closest('section') as HTMLElement

    for (const offerId of PRICING_OFFER_ORDER) {
      const offer = CANONICAL_PRICING_OFFERS[offerId]
      const title = within(plans).getByRole('heading', { level: 3, name: offer.name })
      const card = title.closest('[data-slot="card"]') as HTMLElement
      expect(within(card).getByText(offer.priceLabel)).toBeInTheDocument()
      const cta = within(card).getByRole('link', { name: /join the waitlist/i })
      expect(cta).toHaveAttribute('href', offer.primaryCta.href)

      fireEvent.click(cta)
      expect(trackLinkInteraction).toHaveBeenLastCalledWith(
        offer.primaryCta.href,
        offer.primaryCta.label,
        `pricing offers · ${offer.name}`,
      )
    }
  })

  it('compares the offers in a table and ends at the waitlist', () => {
    render(<PricingPageClient />)

    const table = screen.getByRole('table')
    for (const offerId of PRICING_OFFER_ORDER) {
      expect(
        within(table).getByRole('columnheader', {
          name: CANONICAL_PRICING_OFFERS[offerId].name,
        }),
      ).toBeInTheDocument()
    }
    // The engagement shape lives on the plan cards and the "How it runs" row;
    // there is no separate "Pricing" row.
    expect(within(table).getByRole('rowheader', { name: 'How it runs' })).toBeInTheDocument()
    expect(within(table).queryByRole('rowheader', { name: 'Pricing' })).not.toBeInTheDocument()

    const finalCta = screen.getByRole('heading', { level: 2, name: /get on the list for/i })
    const finalSection = finalCta.closest('section') as HTMLElement
    fireEvent.click(within(finalSection).getByRole('link', { name: /join the waitlist/i }))
    expect(trackLinkInteraction).toHaveBeenLastCalledWith(
      '/waitlist',
      'Join the waitlist',
      'pricing final cta',
    )
  })
})

describe('/dental-os', () => {
  it('leads with the patient promise and source-attributed proof from current clients', () => {
    const { container } = render(<DentalOsPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /be the easy yes for new patients\./i,
      }),
    ).toBeInTheDocument()
    // The subhead keeps the promise: patients find and contact the practice.
    expect(
      screen.getByText(/so patients can find your practice, understand your care, and contact your team\./),
    ).toBeInTheDocument()
    expect(screen.getAllByText('+49%').length).toBeGreaterThan(0)
    expect(screen.getByText(/Source: Google Search Console/)).toBeInTheDocument()

    const html = container.innerHTML.toLowerCase()
    for (const slug of FORMER_CLIENT_SLUGS) {
      expect(html).not.toContain(slug)
    }
    expect(container.textContent ?? '').not.toMatch(PRICE_PATTERN)
    for (const link of screen.getAllByRole('link', { name: /join the waitlist/i })) {
      expect(link).toHaveAttribute('href', '/waitlist')
    }
  })
})

describe('/services', () => {
  it('lists the three services with their waitlist focus links', () => {
    render(<ServicesPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /website\. content\. ads\./i }),
    ).toBeInTheDocument()
    const hrefs = screen
      .getAllByRole('link', { name: /join the waitlist/i })
      .map((link) => link.getAttribute('href'))
    for (const service of PRISM_SERVICES) {
      expect(hrefs).toContain(service.primaryCta.href)
      expect(
        screen.getAllByRole('link', { name: new RegExp(service.homeCta, 'i') })[0],
      ).toHaveAttribute('href', service.href)
    }
  })
})

describe('/faq', () => {
  it('groups answers by topic and filters them with search', () => {
    render(<FAQPage />)

    expect(
      screen.getByRole('heading', { level: 1, name: /questions, answered\./i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: /^the waitlist\.$/i })).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: /^pricing and payments\.$/i }),
    ).toBeInTheDocument()

    // Collapsed answers stay in the DOM for crawlers (native <details>).
    const apps = screen
      .getByText('Do you offer mobile app development?')
      .closest('details') as HTMLElement
    expect(apps).not.toHaveAttribute('open')
    expect(within(apps).getByText(/App development is scoped/)).toBeInTheDocument()

    fireEvent.change(screen.getByRole('searchbox', { name: /search questions/i }), {
      target: { value: 'payments work' },
    })
    expect(screen.getByText('1 answer found')).toBeInTheDocument()
    const payments = screen.getByText('How do payments work?').closest('details') as HTMLElement
    expect(within(payments).getByText(/Payment terms are included/)).toBeInTheDocument()
    expect(
      screen.queryByRole('heading', { level: 2, name: /^the waitlist\.$/i }),
    ).not.toBeInTheDocument()
  })
})
