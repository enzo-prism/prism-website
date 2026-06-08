import { fireEvent, render, screen } from '@testing-library/react'

import HomeDentistWinsCarousel from '@/components/home/HomeDentistWinsCarousel'

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

jest.mock('@/utils/analytics', () => ({
  trackCTAClick: (...args: unknown[]) => mockTrackCTAClick(...args),
}))

const slides = [
  {
    leader: 'Dr. Alexie Aguil',
    company: 'Exquisite Dentistry',
    location: 'Beverly Hills, CA',
    href: '/case-studies/exquisite-dentistry',
    contextLabel: 'Patient practice',
  },
] as const

describe('HomeDentistWinsCarousel', () => {
  beforeEach(() => {
    mockTrackCTAClick.mockReset()
  })

  it('renders abstract animated visuals instead of real card images', () => {
    const { container } = render(<HomeDentistWinsCarousel slides={slides} />)

    const abstractVisual = container.querySelector('[data-client-win-abstract]')

    expect(abstractVisual).toBeInTheDocument()
    expect(container.querySelector('[data-client-win-card] img')).toBeNull()
    expect(
      screen.queryByRole('button', { name: /show color version/i }),
    ).not.toBeInTheDocument()
  })

  it('uses the whole card as the tracked case study navigation', () => {
    render(<HomeDentistWinsCarousel slides={slides} />)

    const link = screen.getByRole('link', {
      name: /open case study for exquisite dentistry/i,
    })

    expect(link).toHaveAttribute('href', '/case-studies/exquisite-dentistry')

    fireEvent.click(link)

    expect(mockTrackCTAClick).toHaveBeenCalledWith(
      'view Exquisite Dentistry case study',
      'homepage client wins carousel',
    )
  })

  it('uses a smoother hover treatment for abstract client win cards', () => {
    const { container } = render(<HomeDentistWinsCarousel slides={slides} />)

    const cardLink = screen.getByRole('link', {
      name: /open case study for exquisite dentistry/i,
    })
    const card = container.querySelector('[data-client-win-card] article')
    const abstractVisual = container.querySelector('[data-client-win-abstract]')
    const glow = container.querySelector('[data-client-win-hover-glow]')
    const arrow = cardLink.querySelector('span svg')

    expect(cardLink).toHaveClass('group/card')
    expect(card).toHaveClass(
      'transition-[transform,border-color,background-color,box-shadow]',
    )
    expect(card).toHaveClass('duration-700')
    expect(card).toHaveClass('group-hover/card:-translate-y-1')
    expect(card).toHaveClass('group-focus-visible/card:-translate-y-1')
    expect(card).toHaveClass('motion-reduce:transition-none')
    expect(abstractVisual).toHaveClass('duration-[1100ms]')
    expect(abstractVisual).toHaveClass('group-hover/card:scale-[1.025]')
    expect(abstractVisual).toHaveClass('group-focus-visible/card:scale-[1.025]')
    expect(glow).toHaveClass('group-hover/card:opacity-100')
    expect(glow).toHaveClass('group-focus-visible/card:opacity-100')
    expect(arrow).toHaveClass('group-hover/card:translate-x-0.5')
  })
})
