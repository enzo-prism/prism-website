import { fireEvent, render, screen, within } from '@testing-library/react'

import PricingPageClient from '@/app/pricing/client-page'
import ServicesPage from '@/app/services/page'
import FAQPage from '@/app/faq/page'
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
const RETIRED_OFFER_PATTERN = /dental os|prism infinity/i

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
    expect(text).not.toMatch(RETIRED_OFFER_PATTERN)
    expect(container.innerHTML).not.toMatch(/\/dental-os|\/prism-infinity/)

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
    expect(within(plans).getAllByRole('heading', { level: 3 })).toHaveLength(
      PRICING_OFFER_ORDER.length,
    )
    expect(PRICING_OFFER_ORDER).toHaveLength(4)

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
    // One "What's included" header plus one column per service.
    expect(within(table).getAllByRole('columnheader')).toHaveLength(
      PRICING_OFFER_ORDER.length + 1,
    )
    expect(within(table).getAllByRole('columnheader')).toHaveLength(5)
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
    expect(
      within(table).getByRole('rowheader', {
        name: 'Visibility in ChatGPT, AI Overviews, and Perplexity',
      }),
    ).toBeInTheDocument()

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

describe('/pricing FAQ', () => {
  it('answers how AEO is priced without a public price', () => {
    render(<PricingPageClient />)

    const aeo = screen
      .getByText('How is AEO priced?')
      .closest('details') as HTMLElement
    expect(aeo).toBeInTheDocument()
    expect(aeo.textContent ?? '').toMatch(/waitlist/i)
    expect(aeo.textContent ?? '').not.toMatch(PRICE_PATTERN)
  })
})

describe('/services', () => {
  it('lists the four services with their waitlist focus links', () => {
    const { container } = render(<ServicesPage />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /^website\. content\. ads\. AEO\.$/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Four services')).toBeInTheDocument()
    const hrefs = screen
      .getAllByRole('link', { name: /join the waitlist/i })
      .map((link) => link.getAttribute('href'))
    for (const service of PRISM_SERVICES) {
      expect(hrefs).toContain(service.primaryCta.href)
      expect(
        screen.getAllByRole('link', { name: new RegExp(service.homeCta, 'i') })[0],
      ).toHaveAttribute('href', service.href)
    }
    expect(PRISM_SERVICES.map((service) => service.href)).toEqual([
      '/websites',
      '/content',
      '/ads',
      '/aeo',
    ])
    expect(screen.getByRole('link', { name: /explore aeo/i })).toHaveAttribute(
      'href',
      '/aeo',
    )
    expect(
      screen.getByRole('link', { name: /compare all four on pricing/i }),
    ).toHaveAttribute('href', '/pricing')
    expect(container.textContent ?? '').not.toMatch(/all three|those three/i)
    expect(container.textContent ?? '').not.toMatch(RETIRED_OFFER_PATTERN)
    expect(container.innerHTML).not.toMatch(/\/dental-os|\/prism-infinity/)
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
