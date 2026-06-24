import { fireEvent, render, screen } from '@testing-library/react'

import HomeClientCoverFlow from '@/components/home/HomeClientCoverFlow'

const mockTrackCTAClick = jest.fn()

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    children,
    href,
    prefetch: _prefetch,
    ...props
  }: {
    children: React.ReactNode
    href: string
    prefetch?: boolean
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
    alt,
    src,
    className,
  }: {
    alt: string
    src: string
    fill?: boolean
    className?: string
    [key: string]: unknown
  }) {
    return <img alt={alt} src={typeof src === 'string' ? src : ''} className={className} />
  },
}))

jest.mock('@/utils/analytics', () => ({
  trackCTAClick: (...args: unknown[]) => mockTrackCTAClick(...args),
}))

const slides = [
  {
    leader: 'Buck Brown',
    company: 'Olympic Bootworks',
    location: 'Tahoe, CA',
    href: '/case-studies/olympic-bootworks',
    contextLabel: 'Retail + ecommerce',
    image: '/case-studies/olympic-bootworks-home-mobile.jpg',
  },
  {
    leader: 'Dr. Alexie Aguil',
    company: 'Exquisite Dentistry',
    location: 'Beverly Hills, CA',
    href: '/case-studies/exquisite-dentistry',
    contextLabel: 'Dental growth',
    image: '/case-studies/exquisite-dentistry-home-mobile.jpg',
  },
] as const

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  })
})

describe('HomeClientCoverFlow', () => {
  beforeEach(() => {
    mockTrackCTAClick.mockReset()
  })

  it('renders real client website screenshots as the covers', () => {
    render(<HomeClientCoverFlow slides={slides} />)

    const cover = screen.getByAltText('Olympic Bootworks website built by Prism')
    expect(cover).toBeInTheDocument()
    expect(cover).toHaveAttribute(
      'src',
      '/case-studies/olympic-bootworks-home-mobile.jpg',
    )
  })

  it('exposes carousel semantics with a live region for the active client', () => {
    const { container } = render(<HomeClientCoverFlow slides={slides} />)

    const carousel = container.querySelector('[aria-roledescription="carousel"]')
    expect(carousel).toBeInTheDocument()

    const live = container.querySelector('[aria-live="polite"]')
    expect(live).toHaveTextContent(/Olympic Bootworks.*1 of 2/i)
  })

  it('navigates to the case study and tracks when the active cover is clicked', () => {
    render(<HomeClientCoverFlow slides={slides} />)

    const activeCover = screen.getByRole('link', {
      name: /open the olympic bootworks case study/i,
    })
    expect(activeCover).toHaveAttribute(
      'href',
      '/case-studies/olympic-bootworks',
    )

    fireEvent.click(activeCover)

    expect(mockTrackCTAClick).toHaveBeenCalledWith(
      'view Olympic Bootworks case study',
      'homepage client cover flow',
    )
  })

  it('keeps a legible caption + case-study link off the angled covers', () => {
    render(<HomeClientCoverFlow slides={slides} />)

    expect(screen.getByText('Buck Brown')).toBeInTheDocument()
    expect(screen.getByText('Tahoe, CA')).toBeInTheDocument()

    const captionLink = screen.getByRole('link', { name: /view case study/i })
    expect(captionLink).toHaveAttribute(
      'href',
      '/case-studies/olympic-bootworks',
    )
  })
})
