import { fireEvent, render, screen, within } from '@testing-library/react'

import Navbar from '@/components/navbar'

const mockUsePathname = jest.fn()

jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    ...props
  }: {
    href: string | { pathname?: string }
    children: React.ReactNode
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

jest.mock('@/components/core-image', () => ({
  __esModule: true,
  default: function MockCoreImage() {
    return <div data-testid="navbar-core-image" />
  },
}))

jest.mock('@/components/breadcrumbs', () => ({
  __esModule: true,
  default: function MockBreadcrumbs() {
    return <nav data-testid="breadcrumbs-mock" />
  },
}))

jest.mock('@/utils/analytics', () => ({
  trackNavigation: jest.fn(),
}))

const ResizeObserverMock = class {
  observe() {}
  disconnect() {}
}

describe('Navbar', () => {
  beforeAll(() => {
    ;(globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver =
      ResizeObserverMock as unknown as typeof ResizeObserver
  })

  beforeEach(() => {
    mockUsePathname.mockReset()
    document.body.innerHTML = ''
  })

  it('uses the home solid treatment on the homepage route', () => {
    mockUsePathname.mockReturnValue('/')

    render(<Navbar />)

    const banner = screen.getByRole('banner')
    expect(banner.className).toContain('bg-black')
    expect(banner.className).toContain('fixed')
    expect(
      screen.getByRole('button', { name: /open menu/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(
      screen.getAllByRole('link', { name: /^websites$/i })[0].className,
    ).toContain('rounded-full')
    expect(screen.getByTestId('navbar-core-image')).toBeInTheDocument()
    expect(screen.getByText(/^prism$/i)).toBeInTheDocument()
    expect(screen.getByText(/impossible is temporary/i)).toBeInTheDocument()
  })

  it('keeps the default solid treatment on inner routes', () => {
    mockUsePathname.mockReturnValue('/about')

    render(<Navbar />)

    const banner = screen.getByRole('banner')
    expect(banner.className).toContain('bg-black')
    expect(banner.className).toContain('sticky')
    expect(
      screen.getByRole('button', { name: /open menu/i }),
    ).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: /^websites$/i })[0].className,
    ).toContain('rounded-full')
    expect(screen.getByTestId('navbar-core-image')).toBeInTheDocument()
    expect(screen.getByText(/impossible is temporary/i)).toBeInTheDocument()
  })

  it('gives the logo a stable hover and focus treatment', () => {
    mockUsePathname.mockReturnValue('/get-started')

    render(<Navbar />)

    const logoLink = screen.getByRole('link', { name: /prism home/i })
    const logoMark = screen.getByTestId('navbar-logo-mark')
    const logoGlow = screen.getByTestId('navbar-logo-glow')

    expect(logoLink.className).toContain('group/logo')
    // Focus rings stay warm/neutral per the design contract; the cyan/pink
    // refraction accents are reserved for the hover glow treatment.
    expect(logoLink.className).toContain('focus-visible:ring-white/30')
    expect(logoMark.className).toContain(
      'motion-safe:group-hover/logo:scale-105',
    )
    expect(logoMark.className).toContain(
      'motion-safe:group-focus-visible/logo:scale-105',
    )
    expect(logoMark.className).toContain('group-hover/logo:border-white/45')
    expect(logoGlow).toHaveAttribute('aria-hidden', 'true')
    expect(logoGlow.className).toContain('mix-blend-screen')
    expect(logoGlow.className).toContain('group-hover/logo:opacity-100')
    expect(logoGlow.className).toContain('group-focus-visible/logo:opacity-100')
  })

  it('opens a simple inline mobile nav instead of a separate modal layer', () => {
    mockUsePathname.mockReturnValue('/about')

    render(<Navbar />)

    const toggle = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(toggle)

    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(document.querySelector('#mobile-site-nav')).toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /our story/i }),
    ).not.toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /^websites$/i })).toHaveLength(2)
    expect(screen.getAllByRole('link', { name: /content os/i })).toHaveLength(2)
  })

  it('links the websites item to the website order page and highlights it on that route', () => {
    mockUsePathname.mockReturnValue('/websites')

    render(<Navbar />)

    const websitesLinks = screen.getAllByRole('link', { name: /^websites$/i })
    expect(websitesLinks).toHaveLength(1)
    expect(websitesLinks[0]).toHaveAttribute('href', '/websites')
    expect(websitesLinks[0].className).toContain('text-[#f5f0e8]')
  })

  it('carries no order CTA button — links only', () => {
    mockUsePathname.mockReturnValue('/about')

    render(<Navbar />)

    expect(
      screen.queryByRole('link', { name: /order now/i }),
    ).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /^order$/i })).not.toBeInTheDocument()
  })

  it('shows the flat seven-item rail with no pricing item and no more dropdown', () => {
    mockUsePathname.mockReturnValue('/about')

    render(<Navbar />)

    // The 2026-07-27 redesign: offers | proof | contact, all inline. Pricing
    // and get-started left the top nav entirely, the "more" disclosure is
    // gone, and there is no CTA button.
    for (const [label, href] of [
      ['websites', '/websites'],
      ['content os', '/content-os'],
      ['dental os', '/dental-os'],
      ['prism infinity', '/prism-infinity'],
      ['wall of love', '/wall-of-love'],
      ['case studies', '/case-studies'],
      ['contact', '/contact'],
    ] as const) {
      expect(
        screen.getAllByRole('link', {
          name: new RegExp(`^${label}$`, 'i'),
        })[0],
      ).toHaveAttribute('href', href)
    }

    expect(
      screen.queryByRole('link', { name: /^pricing$/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /^get started$/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /^more$/i }),
    ).not.toBeInTheDocument()
  })

  it('keeps all seven items one tap away in the mobile panel', () => {
    mockUsePathname.mockReturnValue('/about')

    render(<Navbar />)

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    const panel = document.querySelector('#mobile-site-nav')
    expect(panel).toBeInTheDocument()

    // Plain labels only — the retired mono index prefixes (01–07) stay retired.
    for (const [pattern, href] of [
      [/^websites$/i, '/websites'],
      [/^content os$/i, '/content-os'],
      [/^dental os$/i, '/dental-os'],
      [/^prism infinity$/i, '/prism-infinity'],
      [/^wall of love$/i, '/wall-of-love'],
      [/^case studies$/i, '/case-studies'],
      [/^contact$/i, '/contact'],
    ] as const) {
      expect(
        within(panel as HTMLElement).getByRole('link', { name: pattern }),
      ).toHaveAttribute('href', href)
    }

    expect(
      within(panel as HTMLElement).queryByRole('link', { name: /pricing/i }),
    ).not.toBeInTheDocument()
    // No order CTA inside the panel either.
    expect(
      within(panel as HTMLElement).queryByRole('link', { name: /order now/i }),
    ).not.toBeInTheDocument()
  })

  it('shows case study breadcrumbs on nested case-study routes', () => {
    mockUsePathname.mockReturnValue('/case-studies/exquisite-dentistry')

    render(<Navbar />)

    expect(screen.getByTestId('breadcrumbs-mock')).toBeInTheDocument()
  })
})
