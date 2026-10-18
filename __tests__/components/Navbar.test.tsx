import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react'

import Navbar from '@/components/navbar'
import { NAV_MENU_SERVICE_ITEMS, NAV_SERVICE_ITEMS } from '@/lib/constants'

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

jest.mock('@/components/breadcrumbs', () => ({
  __esModule: true,
  default: function MockBreadcrumbs() {
    return <nav data-testid="breadcrumbs-mock" />
  },
}))

jest.mock('@/utils/analytics', () => ({
  trackNavigation: jest.fn(),
}))

import { trackNavigation } from '@/utils/analytics'

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
    ;(trackNavigation as jest.Mock).mockClear()
    document.body.innerHTML = ''
    document.body.removeAttribute('style')
    document.documentElement.removeAttribute('style')
    delete document.documentElement.dataset.mobileNavOpen
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 390,
    })
  })

  it('floats transparent over the homepage hero until the page scrolls', () => {
    mockUsePathname.mockReturnValue('/')

    render(<Navbar />)

    const banner = screen.getByRole('banner')
    expect(banner.className).toContain('fixed')
    expect(banner).toHaveAttribute('data-solid', 'false')

    const raf = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0)
        return 1
      })
    try {
      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        value: 120,
      })
      act(() => {
        fireEvent.scroll(window)
      })
      expect(banner).toHaveAttribute('data-solid', 'true')
    } finally {
      raf.mockRestore()
    }
  })

  it('is sticky and solid on inner routes', () => {
    mockUsePathname.mockReturnValue('/about')

    render(<Navbar />)

    const banner = screen.getByRole('banner')
    expect(banner.className).toContain('sticky')
    expect(banner.className).toContain('overflow-x-clip')
    expect(banner).toHaveAttribute('data-solid', 'true')
    expect(screen.getByRole('link', { name: /prism home/i })).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.getByTestId('navbar-logo-mark')).toBeInTheDocument()
  })

  it('shows Work, a Services menu, Wall of Love, About and Pricing in the main nav', () => {
    mockUsePathname.mockReturnValue('/about')
    render(<Navbar />)
    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(
      within(nav)
        .getAllByRole('link')
        .map((link) => [link.textContent, link.getAttribute('href')]),
    ).toEqual([
      ['Work', '/case-studies'],
      ['Wall of Love', '/wall-of-love'],
      ['About', '/about'],
      ['Pricing', '/pricing'],
    ])
    expect(
      within(nav).getByRole('button', { name: /services/i }),
    ).toBeInTheDocument()
  })

  it('offers exactly four services: Websites, Content, Ads, and AEO', () => {
    expect(
      NAV_SERVICE_ITEMS.map((item) => [item.label, item.href, item.icon]),
    ).toEqual([
      ['Websites', '/websites', 'website'],
      ['Content', '/content', 'content'],
      ['Ads', '/ads', 'ads'],
      ['AEO', '/aeo', 'aeo'],
    ])
    for (const item of NAV_SERVICE_ITEMS) {
      expect(item.description).not.toContain('\u2014')
      expect(item.description).toMatch(/\.$/)
    }
  })

  it('leads the header Services menu with AEO, then the catalog order', () => {
    expect(NAV_MENU_SERVICE_ITEMS.map((item) => item.href)).toEqual([
      '/aeo',
      '/websites',
      '/content',
      '/ads',
    ])
    // Same four items as the catalog, just reordered for the menu.
    expect(
      [...NAV_MENU_SERVICE_ITEMS].sort((a, b) => a.href.localeCompare(b.href)),
    ).toEqual(
      [...NAV_SERVICE_ITEMS].sort((a, b) => a.href.localeCompare(b.href)),
    )
  })

  it('puts the waitlist CTA beside the menu, never a booking CTA', () => {
    mockUsePathname.mockReturnValue('/about')
    render(<Navbar />)

    const cta = screen.getByTestId('navbar-cta')
    expect(cta).toHaveAttribute('href', '/waitlist')
    expect(cta).toHaveTextContent(/join the waitlist/i)
    expect(screen.getByRole('navigation', { name: 'Main' }).contains(cta)).toBe(
      false,
    )
    fireEvent.click(cta)
    expect(trackNavigation).toHaveBeenCalledWith('Header waitlist', '/waitlist')

    expect(document.body.textContent).not.toMatch(
      /book a call|order now|get started/i,
    )
  })

  it.each(['/case-studies', '/case-studies/exquisite-dentistry'])(
    'highlights Work on %s',
    (pathname) => {
      mockUsePathname.mockReturnValue(pathname)
      render(<Navbar />)
      const nav = screen.getByRole('navigation', { name: 'Main' })
      const work = within(nav).getByRole('link', { name: 'Work' })
      expect(work).toHaveAttribute('href', '/case-studies')
      expect(work).toHaveAttribute('aria-current', 'page')
      expect(
        within(nav).getByRole('link', { name: 'About' }),
      ).not.toHaveAttribute('aria-current')
    },
  )

  it('keeps the mobile chrome on one row', () => {
    mockUsePathname.mockReturnValue('/about')

    render(<Navbar />)

    const chrome = document.querySelector('[data-navbar-chrome] > div')
    expect(chrome?.className).toContain('flex-nowrap')
  })

  it('opens a portaled mobile panel with every destination and the waitlist CTA', () => {
    mockUsePathname.mockReturnValue('/about')

    render(<Navbar />)

    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(toggle)

    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
    expect(document.documentElement.dataset.mobileNavOpen).toBe('true')
    const mobilePanel = document.querySelector(
      '#mobile-site-nav',
    ) as HTMLElement
    expect(mobilePanel).toBeInTheDocument()
    expect(mobilePanel.parentElement).toBe(document.body)
    expect(screen.getByRole('banner').contains(mobilePanel)).toBe(false)

    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' })
    const hrefs = within(mobileNav)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
    expect(hrefs).toEqual([
      '/case-studies',
      '/wall-of-love',
      '/about',
      '/pricing',
      '/aeo',
      '/websites',
      '/content',
      '/ads',
      '/services',
      '/waitlist',
    ])
    // Four services fill a 2x2 grid; "All services" spans the row beneath.
    const allServices = within(mobileNav).getByRole('link', {
      name: /all services/i,
    })
    expect(allServices).toHaveAttribute('href', '/services')
    expect(allServices.closest('li')).toHaveClass('col-span-2')
    expect(
      within(mobileNav).getByRole('link', { name: /^aeo\b/i }),
    ).toHaveAttribute('href', '/aeo')
    expect(
      within(mobilePanel).getByRole('link', { name: /^work$/i }),
    ).toHaveFocus()
  })

  it('never makes a body-level header inert when the menu opens', () => {
    mockUsePathname.mockReturnValue('/wall-of-love')

    render(<Navbar />, { container: document.body })
    const header = screen.getByRole('banner')

    expect(header.parentElement).toBe(document.body)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))

    expect(header).not.toHaveAttribute('inert')
    expect(screen.getByRole('button', { name: /close menu/i })).toBeEnabled()
    const mobilePanel = document.querySelector('#mobile-site-nav')
    expect(mobilePanel).not.toHaveAttribute('inert')
    expect(mobilePanel?.parentElement).toBe(document.body)
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

  it('closes the mobile panel when a destination is selected', () => {
    mockUsePathname.mockReturnValue('/about')
    render(<Navbar />)
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    const mobile = screen.getByRole('navigation', { name: 'Mobile' })
    fireEvent.click(within(mobile).getByRole('link', { name: /^work$/i }))
    expect(
      screen.queryByRole('navigation', { name: 'Mobile' }),
    ).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
    expect(trackNavigation).toHaveBeenCalledWith('Work', '/case-studies')
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
            bottom: 64,
            width: 390,
            height: 64,
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
      ).toBe('64px')

      fireEvent.click(screen.getByRole('button', { name: /open menu/i }))

      expect(document.querySelector('#mobile-site-nav')).toBeInTheDocument()
      expect(
        document.documentElement.style.getPropertyValue(
          '--prism-header-height',
        ),
      ).toBe('64px')
    } finally {
      HTMLElement.prototype.getBoundingClientRect = originalRect
    }
  })

  it('shows case study breadcrumbs on nested case-study routes', () => {
    mockUsePathname.mockReturnValue('/case-studies/exquisite-dentistry')

    render(<Navbar />)

    expect(screen.getByTestId('breadcrumbs-mock')).toBeInTheDocument()
  })
})
