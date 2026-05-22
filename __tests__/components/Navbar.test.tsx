import { fireEvent, render, screen } from '@testing-library/react'

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
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(
      screen.getAllByRole('link', { name: /free audit/i })[0].className,
    ).toContain('border-b')
    expect(screen.getByTestId('navbar-core-image')).toBeInTheDocument()
    expect(screen.getByText(/prism/i)).toBeInTheDocument()
    expect(screen.getByText(/impossible is temporary/i)).toBeInTheDocument()
  })

  it('keeps the default solid treatment on inner routes', () => {
    mockUsePathname.mockReturnValue('/about')

    render(<Navbar />)

    const banner = screen.getByRole('banner')
    expect(banner.className).toContain('bg-black')
    expect(banner.className).toContain('sticky')
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
    expect(
      screen.getAllByRole('link', { name: /free audit/i })[0].className,
    ).toContain('border-b')
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
    expect(logoLink.className).toContain('focus-visible:ring-[#d8bc79]/35')
    expect(logoMark.className).toContain(
      'motion-safe:group-hover/logo:scale-105',
    )
    expect(logoMark.className).toContain(
      'motion-safe:group-focus-visible/logo:scale-105',
    )
    expect(logoMark.className).toContain('group-hover/logo:border-[#d8bc79]/55')
    expect(logoGlow).toHaveAttribute('aria-hidden', 'true')
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
    expect(screen.queryByRole('link', { name: /our story/i })).not.toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /results/i })).toHaveLength(2)
  })

  it('highlights section links on nested routes and shows case study breadcrumbs', () => {
    mockUsePathname.mockReturnValue('/case-studies/exquisite-dentistry')

    render(<Navbar />)

    expect(
      screen.getAllByRole('link', { name: /results/i })[0].className,
    ).toContain('text-[#f5f0e8]')
    expect(screen.getByTestId('breadcrumbs-mock')).toBeInTheDocument()
  })
})
