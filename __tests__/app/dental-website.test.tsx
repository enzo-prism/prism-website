import { fireEvent, render, screen, within } from '@testing-library/react'

import DentalWebsitePage from '@/app/dental-website/page'
import { WEBSITE_WAITLIST_CTA } from '@/lib/pricing-model'
import { trackCTAClick } from '@/utils/analytics'

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
    priority: _priority,
    fill: _fill,
    unoptimized: _unoptimized,
    ...props
  }: {
    src: string
    alt: string
    priority?: boolean
    fill?: boolean
    unoptimized?: boolean
    [key: string]: unknown
  }) {
    return <img src={src} alt={alt} {...props} />
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

jest.mock('@/components/HeroLoopingVideo', () => ({
  __esModule: true,
  default: function MockHeroLoopingVideo() {
    return <div data-testid="scheduling-video" />
  },
}))

jest.mock('@/utils/analytics', () => ({
  trackCTAClick: jest.fn(),
  trackNavigation: jest.fn(),
  trackLinkInteraction: jest.fn(),
}))

describe('/dental-website', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders one h1 and ends on a page-specific waitlist CTA', () => {
    render(<DentalWebsitePage />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'dental practice websites that get found, trusted, and chosen.',
      }),
    ).toBeInTheDocument()

    const finalCta = screen
      .getByRole('heading', { level: 2, name: 'your practice, next.' })
      .closest('section') as HTMLElement
    const waitlistLinks = within(finalCta).getAllByRole('link', {
      name: /join the waitlist/i,
    })
    expect(waitlistLinks[0]).toHaveAttribute('href', WEBSITE_WAITLIST_CTA.href)
  })

  it('makes no guarantees or unverifiable platform claims', () => {
    const { container } = render(<DentalWebsitePage />)
    const text = container.textContent ?? ''

    for (const claim of [
      /only improves/i,
      /results within/i,
      /boosted case acceptance/i,
      /to the top/i,
      /schedule gaps/i,
      /dependable revenue/i,
      /keep chairs filled/i,
      /win more patients/i,
      /dentrix|open dental|eaglesoft/i,
      /zero-downtime|instant rollback/i,
      /50\+ directories/i,
      /guarantee/i,
    ]) {
      expect(text).not.toMatch(claim)
    }

    // The migration answer is a deliverable, in server HTML (native details).
    expect(text).toContain(
      'We map every old URL, keep your page details, and resubmit the new structure so search engines can follow the move.',
    )
    expect(screen.getByRole('heading', { name: 'what we set up for patients.' })).toBeInTheDocument()
  })

  it('drops the blocked Google Trends embed', () => {
    const { container } = render(<DentalWebsitePage />)
    expect(container.querySelector('#dental-trends-widget')).toBeNull()
    expect(container.textContent).not.toMatch(/live snapshot/i)
  })

  it('shows real interview stills and plays each interview in a dialog', () => {
    const { container } = render(<DentalWebsitePage />)
    const section = screen
      .getByRole('heading', { name: 'conversations with dentists and their teams.' })
      .closest('section') as HTMLElement

    const stills = Array.from(section.querySelectorAll('img')).map((img) =>
      img.getAttribute('src'),
    )
    expect(stills).toHaveLength(5)
    for (const src of stills) {
      // Frames from the interviews themselves, never the illustrated covers.
      expect(src).toMatch(/^https:\/\/i\.ytimg\.com\/vi\/[\w-]+\/(maxres\d|hq\d)\.jpg$/)
      expect(src).not.toContain('hqdefault')
    }

    // Nothing loads from YouTube until a visitor presses play.
    expect(container.querySelector('iframe')).toBeNull()
    fireEvent.click(within(section).getByRole('button', { name: /Dr\. Christopher Wong/ }))
    expect(trackCTAClick).toHaveBeenCalledWith(
      'play Dr. Christopher Wong interview',
      'dental website interviews',
    )
    expect(document.querySelector('iframe')?.getAttribute('src')).toContain(
      'youtube-nocookie.com/embed/HrksJeYb02Q',
    )
  })
})
