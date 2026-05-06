import { fireEvent, render, screen } from '@testing-library/react'

import HomeDentistWinsCarousel from '@/components/home/HomeDentistWinsCarousel'

const mockTrackCTAClick = jest.fn()

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockNextImage({
    alt,
    className,
    src,
  }: {
    alt: string
    className?: string
    src: string
  }) {
    return <img alt={alt} className={className} src={src} />
  },
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
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
    dentist: 'Dr. Alexie Aguil',
    practice: 'Exquisite Dentistry',
    location: 'Beverly Hills, CA',
    href: '/case-studies/exquisite-dentistry',
    contextLabel: 'Patient practice',
    imageSrc: '/dr-alexie-aguil.png',
    imageAlt: 'Dr. Alexie Aguil of Exquisite Dentistry',
    objectPosition: '68% center',
  },
] as const

describe('HomeDentistWinsCarousel', () => {
  beforeEach(() => {
    mockTrackCTAClick.mockReset()
  })

  it('keeps slides black and white until the card is toggled', () => {
    render(<HomeDentistWinsCarousel slides={slides} />)

    const toggle = screen.getByRole('button', {
      name: /show color version for dr\. alexie aguil/i,
    })
    const image = screen.getByAltText(/dr\. alexie aguil/i)

    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    expect(image).toHaveClass('grayscale')
    expect(image).toHaveClass('saturate-0')
    expect(image).not.toHaveClass('grayscale-0')

    fireEvent.click(toggle)

    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    expect(toggle).toHaveAccessibleName(
      /hide color version for dr\. alexie aguil/i,
    )
    expect(image).toHaveClass('grayscale-0')
    expect(image).toHaveClass('saturate-100')

    fireEvent.click(toggle)

    expect(toggle).toHaveAttribute('aria-pressed', 'false')
  })

  it('keeps case study navigation separate from the color toggle', () => {
    render(<HomeDentistWinsCarousel slides={slides} />)

    const toggle = screen.getByRole('button', {
      name: /show color version for dr\. alexie aguil/i,
    })
    const link = screen.getByRole('link', {
      name: /open case study for exquisite dentistry/i,
    })

    fireEvent.click(toggle)

    expect(mockTrackCTAClick).not.toHaveBeenCalled()
    expect(link).toHaveAttribute('href', '/case-studies/exquisite-dentistry')

    fireEvent.click(link)

    expect(mockTrackCTAClick).toHaveBeenCalledWith(
      'view Exquisite Dentistry case study',
      'homepage dentist wins carousel',
    )
  })

  it('uses a smoother hover treatment for dentist win cards', () => {
    const { container } = render(<HomeDentistWinsCarousel slides={slides} />)

    const card = container.querySelector('[data-dentist-win-card] article')
    const image = screen.getByAltText(/dr\. alexie aguil/i)
    const glow = container.querySelector('[data-dentist-win-hover-glow]')
    const link = screen.getByRole('link', {
      name: /open case study for exquisite dentistry/i,
    })
    const arrow = link.querySelector('svg')

    expect(card).toHaveClass(
      'transition-[transform,border-color,background-color,box-shadow]',
    )
    expect(card).toHaveClass('duration-700')
    expect(card).toHaveClass('hover:-translate-y-1')
    expect(card).toHaveClass('focus-within:-translate-y-1')
    expect(card).toHaveClass('motion-reduce:transition-none')
    expect(image).toHaveClass('duration-[1100ms]')
    expect(image).toHaveClass('group-hover/card:scale-[1.045]')
    expect(image).toHaveClass('group-focus-within/card:grayscale-0')
    expect(glow).toHaveClass('group-hover/card:opacity-100')
    expect(glow).toHaveClass('group-focus-within/card:opacity-100')
    expect(link).toHaveClass('group/link')
    expect(link).toHaveClass('hover:-translate-y-0.5')
    expect(arrow).toHaveClass('group-hover/link:translate-x-0.5')
  })
})
