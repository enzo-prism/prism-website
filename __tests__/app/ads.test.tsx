import { fireEvent, render, screen, within } from '@testing-library/react'

import AdsPage from '@/app/ads/page'
import { trackCTAClick, trackLinkInteraction } from '@/utils/analytics'

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
  VideoSchema: function MockVideoSchema() {
    return null
  },
}))

jest.mock('@/utils/analytics', () => ({
  trackLinkInteraction: jest.fn(),
  trackCTAClick: jest.fn(),
}))

function heroScope(container: HTMLElement) {
  return within(container.querySelector('main section') as HTMLElement)
}

beforeEach(() => {
  jest.mocked(trackLinkInteraction).mockClear()
})

describe('AdsPage launch-manifest hero', () => {
  it('renders the lowercase h1, the ads-focused CTA, and the platforms anchor', async () => {
    const { container } = render(await AdsPage())
    const hero = heroScope(container)

    expect(
      hero.getByRole('heading', {
        level: 1,
        name: 'campaigns built around better leads.',
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)

    const primary = hero.getByRole('link', { name: 'Join the waitlist' })
    expect(primary).toHaveAttribute('href', '/waitlist?focus=ads')
    fireEvent.click(primary)
    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/waitlist?focus=ads',
      'Join the waitlist',
      'ads hero',
    )

    const secondary = hero.getByRole('link', { name: 'See the platforms' })
    expect(secondary).toHaveAttribute('href', '#platforms')
    expect(document.getElementById('platforms')).toBeInTheDocument()
  })

  it('lists the five real ad platforms in the manifest with decorative logos', async () => {
    const { container } = render(await AdsPage())
    const hero = heroScope(container)

    expect(hero.getByText('Launch manifest')).toBeInTheDocument()
    // The statuses are illustrative, so the panel says so.
    expect(hero.getByText('Example')).toBeInTheDocument()
    expect(hero.getByText('Weekly optimization')).toBeInTheDocument()

    const platforms = hero.getByRole('list', { name: 'Ad platforms' })
    const rows = within(platforms).getAllByRole('listitem')
    expect(rows).toHaveLength(5)
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('Google'),
      expect.stringContaining('Meta'),
      expect.stringContaining('TikTok'),
      expect.stringContaining('Yelp'),
      expect.stringContaining('ChatGPT Ads'),
    ])

    for (const row of rows) {
      const icon = row.querySelector('img, svg')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('aria-hidden', 'true')
      expect(icon?.getAttribute('src') ?? '').toMatch(/^\/logos\/svgl\//)
    }
  })

  it('keeps hero copy free of em dashes and metric claims', async () => {
    const { container } = render(await AdsPage())

    const hero = container.querySelector('main section')
    expect(hero).not.toBeNull()
    expect(hero?.textContent).not.toContain('—')
    // Zero metric claims: no digits anywhere in the hero copy.
    expect(hero?.textContent).not.toMatch(/\d/)
  })
})

describe('AdsPage sections', () => {
  it('gives the Yelp Ads platform card the vendored yelp mark', async () => {
    render(await AdsPage())

    const heading = screen.getByRole('heading', { name: 'Yelp Ads' })
    const card = heading.closest('article')
    expect(card).not.toBeNull()
    expect(
      card?.querySelector('img[src="/logos/svgl/yelp.svg"]'),
    ).toBeInTheDocument()
  })

  it('keeps the invite-only ChatGPT Ads program linked from the platforms list', async () => {
    render(await AdsPage())

    const platforms = document.getElementById('platforms') as HTMLElement
    expect(
      within(platforms).getByRole('heading', { name: 'ChatGPT Ads' }),
    ).toBeInTheDocument()
    expect(
      within(platforms).getByRole('link', { name: 'See the program' }),
    ).toHaveAttribute('href', '/chatgpt-ads')
  })

  it('answers FAQs in crawlable disclosures', async () => {
    render(await AdsPage())

    expect(
      screen.getByRole('heading', { level: 2, name: 'before you spend.' }),
    ).toBeInTheDocument()
    const existing = screen
      .getByText('Can you use my existing accounts?')
      .closest('details') as HTMLElement
    expect(existing).not.toHaveAttribute('open')
    // Collapsed answers still ship in the HTML so crawlers can read them.
    expect(
      within(existing).getByText(/audit, clean up, and improve/),
    ).toBeInTheDocument()
  })

  it('cross-links websites, content, and AEO, then ends with the ads final CTA', async () => {
    render(await AdsPage())

    const siblings = screen
      .getByRole('heading', { level: 2, name: 'also from Prism.' })
      .closest('section') as HTMLElement
    expect(
      within(siblings)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href')),
    ).toEqual(['/websites', '/content', '/aeo'])

    const finalCta = screen
      .getByRole('heading', { level: 2, name: 'your next campaign starts here.' })
      .closest('section') as HTMLElement
    const cta = within(finalCta).getByRole('link', {
      name: 'Join the waitlist',
    })
    expect(cta).toHaveAttribute('href', '/waitlist?focus=ads')
    fireEvent.click(cta)
    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/waitlist?focus=ads',
      'Join the waitlist',
      'ads final cta',
    )
  })

  it('keeps the page free of em dashes and prices', async () => {
    const { container } = render(await AdsPage())
    const text = container.querySelector('main')?.textContent ?? ''
    expect(text).not.toContain('—')
    expect(text).not.toMatch(/\$\d/)
  })
})

describe('AdsPage creative and founder video', () => {
  it('labels the illustrative ad as an example and shows a real client page', async () => {
    render(await AdsPage())

    const bento = screen
      .getByRole('heading', { level: 2, name: 'from campaign strategy to the next call.' })
      .closest('section') as HTMLElement
    expect(within(bento).getByText('Example ad')).toBeInTheDocument()
    expect(within(bento).queryByText(/^(Image|Video|Search) ad$/)).not.toBeInTheDocument()
    expect(
      within(bento).getByAltText('Town Centre Dental website home page built by Prism'),
    ).toHaveAttribute('src', expect.stringContaining('town-centre-dental-home-desktop.jpg'))
    // No invented performance numbers in the bento.
    expect(bento.textContent).not.toMatch(/\d+(\.\d+)?\s*%/)
  })

  it('shows a cropped poster and only loads the clip when the visitor presses play', async () => {
    const play = jest
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockResolvedValue(undefined)
    render(await AdsPage())

    const section = document.getElementById('ads-founder-vsl') as HTMLElement
    const video = section.querySelector('video') as HTMLVideoElement
    expect(video).toHaveAttribute('preload', 'none')
    expect(video.getAttribute('src')).toBeNull()

    const button = within(section).getByRole('button', {
      name: 'Play video: Founder Enzo Sison on Prism Ads',
    })
    const poster = button.querySelector('img') as HTMLImageElement
    expect(poster.getAttribute('src')).toMatch(/c_crop.*so_5/)

    fireEvent.click(button)
    expect(video.getAttribute('src') ?? video.src).toMatch(/c_crop.*Untitled_xmscby\.mp4$/)
    expect(play).toHaveBeenCalled()
    expect(video).toHaveAttribute('controls')
    expect(trackCTAClick).toHaveBeenCalledWith(
      'play Founder Enzo Sison on Prism Ads',
      'ads founder video',
    )
    expect(
      within(section).queryByRole('button', { name: /play video/i }),
    ).not.toBeInTheDocument()
    play.mockRestore()
  })
})
