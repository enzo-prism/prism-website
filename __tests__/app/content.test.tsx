import { fireEvent, render, screen, within } from '@testing-library/react'

import ContentOsPage from '@/app/content/page'
import { trackLinkInteraction } from '@/utils/analytics'

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
}))

jest.mock('@/utils/analytics', () => ({
  trackLinkInteraction: jest.fn(),
}))

function heroScope(container: HTMLElement) {
  return within(container.querySelector('main section') as HTMLElement)
}

describe('ContentOsPage hearth hero', () => {
  it('renders the hero copy, chips, and implementation line', () => {
    const { container } = render(<ContentOsPage />)
    const hero = heroScope(container)

    expect(
      hero.getByRole('heading', {
        level: 1,
        name: 'Your expertise. Catching fire.',
      }),
    ).toBeInTheDocument()

    expect(hero.getByText('Your social channels')).toBeInTheDocument()
    expect(hero.getByText('Your website')).toBeInTheDocument()
    expect(hero.getByText('3-month implementation')).toBeInTheDocument()
    expect(hero.getByText('Implemented over 3 months')).toBeInTheDocument()
  })

  it('routes the hero CTA to the waitlist with hero tracking', () => {
    const { container } = render(<ContentOsPage />)
    const hero = heroScope(container)

    const primary = hero.getByRole('link', { name: 'Join the waitlist' })
    expect(primary).toHaveAttribute('href', '/waitlist?focus=content')

    fireEvent.click(primary)
    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/waitlist?focus=content',
      'join the waitlist',
      'content hero',
    )
  })

  it('renders the hearth panel with the server-side fire poster', () => {
    const { container } = render(<ContentOsPage />)
    const hero = heroScope(container)

    expect(
      hero.getByText('Loop 094 fr . Plan / Produce / Publish'),
    ).toBeInTheDocument()

    const poster = container.querySelector(
      'img[src="/animations/fire-2/poster.svg"]',
    )
    expect(poster).toBeInTheDocument()
    expect(poster).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders the publish system strip', () => {
    const { container } = render(<ContentOsPage />)
    const hero = heroScope(container)

    expect(
      hero.getByText('Plan . Produce . Publish . Repeat'),
    ).toBeInTheDocument()
    expect(screen.queryByText(/—/)).not.toBeInTheDocument()
  })
})
