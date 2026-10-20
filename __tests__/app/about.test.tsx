import { fireEvent, render, screen, within } from '@testing-library/react'

import AboutClientPage from '@/app/about/client-page'
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

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockNextImage({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
  }) {
    return <img src={src} alt={alt} width={width} height={height} className={className} />
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

// The real player defers the Vimeo SDK behind an IntersectionObserver; that
// network contract is locked by __tests__/visual/mobile-navbar.spec.ts.
jest.mock('@/components/minimalist-video-player', () => ({
  __esModule: true,
  default: function MockPlayer({ videoId }: { videoId: string }) {
    return <div data-testid="vimeo-player" data-video-id={videoId} />
  },
}))

jest.mock('@/utils/analytics', () => ({
  trackLinkInteraction: jest.fn(),
  trackCTAClick: jest.fn(),
  trackError: jest.fn(),
}))

describe('AboutClientPage', () => {
  beforeEach(() => jest.clearAllMocks())

  it('keeps the locked founder H1 and the Olympic journey heading', () => {
    const { container } = render(<AboutClientPage />)

    expect(container.querySelectorAll('h1')).toHaveLength(1)
    expect(
      screen.getByRole('heading', { level: 1, name: /built by enzo sison\./i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'Olympic journey.' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 2, name: 'impossible is temporary.' }),
    ).toBeInTheDocument()
  })

  it('tracks the hero and closing waitlist CTAs', () => {
    render(<AboutClientPage />)
    const ctas = screen.getAllByRole('link', { name: /join the waitlist/i })

    expect(ctas.length).toBeGreaterThanOrEqual(2)
    for (const cta of ctas) expect(cta).toHaveAttribute('href', '/waitlist')

    fireEvent.click(ctas[0])
    expect(trackLinkInteraction).toHaveBeenLastCalledWith(
      '/waitlist',
      'Join the waitlist',
      'about hero',
    )
    fireEvent.click(ctas[ctas.length - 1])
    expect(trackLinkInteraction).toHaveBeenLastCalledWith(
      '/waitlist',
      'Join the waitlist',
      'about final cta',
    )
  })

  it('closes with the about final CTA headline', () => {
    render(<AboutClientPage />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'build the next chapter with us.' }),
    ).toBeInTheDocument()
  })

  it('links the hero timeline button to the timeline section', () => {
    const { container } = render(<AboutClientPage />)

    expect(screen.getByRole('link', { name: /see the timeline/i })).toHaveAttribute(
      'href',
      '#timeline',
    )
    const timeline = container.querySelector('#timeline') as HTMLElement
    expect(timeline).not.toBeNull()
    expect(within(timeline).getAllByRole('listitem')).toHaveLength(14)
    expect(timeline).toHaveTextContent('Enzo starts Prism')
    expect(timeline).toHaveTextContent('Prism makes its first dollar')
  })

  it('frames every timeline thumbnail the same way and implies no endorsement', () => {
    const { container } = render(<AboutClientPage />)
    const timeline = container.querySelector('#timeline') as HTMLElement
    const images = Array.from(timeline.querySelectorAll('img'))

    expect(images.length).toBeGreaterThanOrEqual(10)
    expect(timeline.querySelector('img[src*="olympic-committee"]')).toBeNull()
    expect(timeline.innerHTML).not.toMatch(/olympic committee/i)
    for (const image of images) {
      expect(image.className).toContain('object-cover')
      expect(image.closest('.aspect-\\[4\\/3\\]')).not.toBeNull()
    }

    const pro = within(timeline)
      .getByRole('heading', { level: 3, name: 'Enzo goes pro in track and field' })
      .closest('li') as HTMLElement
    expect(pro.querySelector('img')).toBeNull()
    expect(pro.querySelector('.aspect-\\[4\\/3\\]')).toHaveAttribute('aria-hidden', 'true')
  })

  it('steps the pole vault carousel with full-size labeled controls', () => {
    render(<AboutClientPage />)

    expect(screen.getByText('san jose, ca')).toBeInTheDocument()
    expect(screen.getByTestId('vimeo-player')).toHaveAttribute('data-video-id', '1116465370')

    const next = screen.getByRole('button', { name: 'Next' })
    const previous = screen.getByRole('button', { name: 'Previous' })
    expect(next.className).toContain('size-12')
    expect(previous.className).toContain('size-12')

    fireEvent.click(next)
    expect(screen.getByText('santa barbara, ca')).toBeInTheDocument()
    expect(screen.getByTestId('vimeo-player')).toHaveAttribute('data-video-id', '1116465409')

    fireEvent.click(previous)
    fireEvent.click(previous)
    expect(screen.getByText('new clark city, philippines')).toBeInTheDocument()
  })

  it('links what Prism builds to the four service pages', () => {
    render(<AboutClientPage />)

    for (const href of ['/website-design', '/content', '/ads', '/aeo']) {
      expect(
        screen.getAllByRole('link').some((link) => link.getAttribute('href') === href),
      ).toBe(true)
    }
    // Lowercase house headings, but the AEO acronym keeps its capitals.
    const aeo = screen
      .getAllByRole('link')
      .find((link) => link.getAttribute('href') === '/aeo') as HTMLElement
    expect(aeo).toHaveTextContent(/^AEO/)
  })

  it('keeps the person and breadcrumb schema and avoids em dashes', () => {
    const { container } = render(<AboutClientPage />)
    const schemas = Array.from(
      container.querySelectorAll('script[type="application/ld+json"]'),
    ).map((script) => script.textContent ?? '')

    expect(schemas.some((json) => json.includes('"Person"') && json.includes('Enzo Sison'))).toBe(true)
    expect(schemas.some((json) => json.includes('BreadcrumbList'))).toBe(true)
    expect(container.querySelector('main')?.textContent).not.toContain('—')
  })
})
