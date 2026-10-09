import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'

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
    document.body.removeAttribute('style')
    document.documentElement.removeAttribute('style')
    delete document.documentElement.dataset.mobileNavOpen
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
      screen.getAllByRole('link', { name: /^home$/i })[0].className,
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
      screen.getAllByRole('link', { name: /^home$/i })[0].className,
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

  it('keeps the mobile chrome on one row with a non-shrinking menu button', () => {
    mockUsePathname.mockReturnValue('/about')

    render(<Navbar />)

    expect(screen.getByRole('banner').className).toContain('overflow-x-clip')
    expect(
      screen.getByRole('button', { name: /open menu/i }).className,
    ).toContain('shrink-0')
    const chrome = document.querySelector('[data-navbar-chrome] > div')
    expect(chrome?.className).toContain('flex-nowrap')
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
    expect(document.documentElement.dataset.mobileNavOpen).toBe('true')
    const mobilePanel = document.querySelector('#mobile-site-nav')
    expect(mobilePanel).toBeInTheDocument()
    expect(mobilePanel?.parentElement).toBe(document.body)
    expect(screen.getByRole('banner').contains(mobilePanel)).toBe(false)
    expect(
      screen.queryByRole('link', { name: /our story/i }),
    ).not.toBeInTheDocument()
    expect(
      within(screen.getByRole('navigation', { name: 'Mobile' })).getAllByRole(
        'link',
      ),
    ).toHaveLength(3)
    expect(
      within(
        document.querySelector('#mobile-site-nav') as HTMLElement,
      ).getByRole('link', { name: /^home$/i }),
    ).toHaveFocus()
  })

  it('never makes a body-level header inert when the menu opens', () => {
    mockUsePathname.mockReturnValue('/wall-of-love')

    render(<Navbar />, { container: document.body })
    const header = screen.getByRole('banner')

    // Reproduce Next App Router pages where the header is a direct body child.
    expect(header.parentElement).toBe(document.body)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))

    expect(header).not.toHaveAttribute('inert')
    expect(screen.getByRole('button', { name: /close menu/i })).toBeEnabled()
    const mobilePanel = document.querySelector('#mobile-site-nav')
    expect(mobilePanel).toBeInTheDocument()
    expect(mobilePanel).not.toHaveAttribute('inert')
    expect(mobilePanel?.parentElement).toBe(document.body)
    expect(
      within(mobilePanel as HTMLElement).getByRole('link', {
        name: /^home$/i,
      }),
    ).toBeEnabled()
  })

  it('preserves pre-existing inert state and restores overflow on close', () => {
    mockUsePathname.mockReturnValue('/about')
    const main = document.createElement('main')
    const footer = document.createElement('footer')
    main.setAttribute('inert', '')
    document.body.append(main, footer)
    document.body.style.overflow = 'clip'
    document.documentElement.style.overflow = 'scroll'

    render(<Navbar />)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))

    expect(main).toHaveAttribute('inert')
    expect(footer).toHaveAttribute('inert')
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.documentElement.style.overflow).toBe('hidden')

    expect(document.documentElement.dataset.mobileNavOpen).toBe('true')

    fireEvent.click(screen.getByRole('button', { name: /close menu/i }))

    expect(main).toHaveAttribute('inert')
    expect(footer).not.toHaveAttribute('inert')
    expect(document.body.style.overflow).toBe('clip')
    expect(document.documentElement.style.overflow).toBe('scroll')
    expect(document.documentElement.dataset.mobileNavOpen).toBeUndefined()
  })

  it('closes on Escape and returns focus to the menu button', async () => {
    mockUsePathname.mockReturnValue('/about')
    render(<Navbar />)

    const toggle = screen.getByRole('button', { name: /open menu/i })
    toggle.focus()
    fireEvent.click(toggle)
    fireEvent.keyDown(document, { key: 'Escape' })

    expect(document.querySelector('#mobile-site-nav')).not.toBeInTheDocument()
    await waitFor(() => expect(toggle).toHaveFocus())
  })

  it('closes and restores page state at the desktop breakpoint', () => {
    mockUsePathname.mockReturnValue('/about')
    render(<Navbar />)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1024,
    })
    fireEvent(window, new Event('resize'))

    expect(document.querySelector('#mobile-site-nav')).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
    expect(document.documentElement.style.overflow).toBe('')
  })

  it.each(['/case-studies', '/case-studies/exquisite-dentistry'])(
    'highlights Clients on %s',
    (pathname) => {
      mockUsePathname.mockReturnValue(pathname)
      render(<Navbar />)
      const clients = screen.getByRole('link', { name: 'Clients' })
      expect(clients).toHaveAttribute('href', '/case-studies')
      expect(clients).toHaveAttribute('aria-current', 'page')
      expect(
        screen.getByRole('link', { name: 'Home' }),
      ).not.toHaveAttribute('aria-current')
    },
  )

  it('closes the mobile sheet when Clients is selected', () => {
    mockUsePathname.mockReturnValue('/about')
    render(<Navbar />)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    const mobile = screen.getByRole('navigation', { name: 'Mobile' })
    const clients = within(mobile).getByRole('link', {
      name: 'Clients',
    })
    expect(clients.querySelector('img')).toHaveAttribute('alt', '')
    fireEvent.click(clients)
    expect(
      screen.queryByRole('navigation', { name: 'Mobile' }),
    ).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
  })

  it('carries no order CTA button — links only', () => {
    mockUsePathname.mockReturnValue('/about')

    render(<Navbar />)

    expect(
      screen.queryByRole('link', { name: /order now/i }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('link', { name: /^order$/i }),
    ).not.toBeInTheDocument()
  })

  it('shows exactly Home, Clients, and Wall of Love in the header', () => {
    mockUsePathname.mockReturnValue('/about')
    render(<Navbar />)
    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(
      within(nav)
        .getAllByRole('link')
        .map((link) => [link.textContent, link.getAttribute('href')]),
    ).toEqual([
      ['Home', '/'],
      ['Clients', '/case-studies'],
      ['Wall of Love', '/wall-of-love'],
    ])
    expect(within(nav).queryByRole('button')).not.toBeInTheDocument()
  })

  it('keeps --prism-header-height stable when the mobile menu opens', () => {
    mockUsePathname.mockReturnValue('/about')

    const originalRect = HTMLElement.prototype.getBoundingClientRect
    HTMLElement.prototype.getBoundingClientRect =
      function getBoundingClientRect() {
        if (this.tagName === 'HEADER') {
          return {
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            right: 390,
            bottom: 73,
            width: 390,
            height: 73,
            toJSON() {
              return {}
            },
          } as DOMRect
        }
        return originalRect.call(this)
      }

    try {
      render(<Navbar />)
      expect(
        document.documentElement.style.getPropertyValue(
          '--prism-header-height',
        ),
      ).toBe('73px')

      fireEvent.click(screen.getByRole('button', { name: /open menu/i }))

      expect(document.querySelector('#mobile-site-nav')).toBeInTheDocument()
      expect(
        document.documentElement.style.getPropertyValue(
          '--prism-header-height',
        ),
      ).toBe('73px')
    } finally {
      HTMLElement.prototype.getBoundingClientRect = originalRect
    }
  })

  it('shows the same three destinations in the mobile menu', () => {
    mockUsePathname.mockReturnValue('/case-studies/exquisite-dentistry')
    render(<Navbar />)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    const nav = screen.getByRole('navigation', { name: 'Mobile' })
    expect(
      within(nav)
        .getAllByRole('link')
        .map((link) => [link.textContent, link.getAttribute('href')]),
    ).toEqual([
      ['Home', '/'],
      ['Clients', '/case-studies'],
      ['Wall of Love', '/wall-of-love'],
    ])
    expect(
      within(nav).getByRole('link', { name: 'Clients' }),
    ).toHaveAttribute('aria-current', 'page')
  })

  it('shows case study breadcrumbs on nested case-study routes', () => {
    mockUsePathname.mockReturnValue('/case-studies/exquisite-dentistry')

    render(<Navbar />)

    expect(screen.getByTestId('breadcrumbs-mock')).toBeInTheDocument()
  })
})
