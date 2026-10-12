import { fireEvent, render, screen, within } from '@testing-library/react'

import MinimalCaseStudyPage from '@/components/case-study-minimal'
import { quotesData } from '@/content/wall-of-love-data'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import { trackCTAClick } from '@/utils/analytics'

jest.mock('@/utils/analytics', () => ({
  ...jest.requireActual('@/utils/analytics'),
  trackCTAClick: jest.fn(),
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    prefetch: _prefetch,
    ...props
  }: {
    href: string
    children: React.ReactNode
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

const FORMER = new Set<string>(FORMER_CLIENT_SLUGS)

// jsdom does not implement media playback; the explainer resets its video on mount.
beforeAll(() => {
  jest.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
})

function moreWorkHrefs() {
  const region = screen.getByRole('region', { name: 'more sites we built.' })
  return within(region)
    .getAllByRole('link')
    .map((link) => link.getAttribute('href'))
    .filter((href): href is string => Boolean(href?.startsWith('/case-studies/')))
}

describe('case study template', () => {
  it('leads with the client name, the live site, and the waitlist CTA', () => {
    render(<MinimalCaseStudyPage slug="dr-christopher-wong" />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Dr. Christopher B. Wong' }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)

    const visit = screen.getByRole('link', { name: /Visit chriswongdds\.com/ })
    expect(visit).toHaveAttribute('href', 'https://www.chriswongdds.com')
    expect(visit).toHaveAttribute('target', '_blank')

    const waitlistLinks = screen
      .getAllByRole('link', { name: /Join the waitlist/ })
      .map((link) => link.getAttribute('href'))
    expect(waitlistLinks.length).toBeGreaterThanOrEqual(2)
    expect(new Set(waitlistLinks)).toEqual(new Set(['/waitlist']))

    expect(
      screen.getByRole('img', { name: 'Dr. Christopher B. Wong homepage built by Prism' }),
    ).toHaveAttribute('src', expect.stringContaining('dr-christopher-wong-home-desktop.jpg'))
  })

  it('shows the verified metric with its source and window, from the data only', () => {
    render(<MinimalCaseStudyPage slug="dr-christopher-wong" />)

    const metric = CASE_STUDIES.find((study) => study.slug === 'dr-christopher-wong')!
      .structured!.results![0]
    const band = screen.getByRole('region', { name: 'Project snapshot' })

    expect(within(band).getByText('Verified result')).toBeInTheDocument()
    expect(band.textContent).toContain(metric.value)
    expect(band.textContent).toContain(metric.label)
    expect(band.textContent).toContain(`${metric.sourceName}, ${metric.dateRange}`)
  })

  it('falls back to delivered-work facts when no verified metric exists', () => {
    render(<MinimalCaseStudyPage slug="exquisite-dentistry" />)

    const band = screen.getByRole('region', { name: 'Project snapshot' })
    expect(within(band).queryByText('Verified result')).not.toBeInTheDocument()
    expect(within(band).getByText('Services delivered')).toBeInTheDocument()
    expect(band.textContent).not.toMatch(/%/)
  })

  it.each(['dr-christopher-wong', 'exquisite-dentistry', 'olympic-bootworks'])(
    'keeps the stats band in owner terms on %s (no tool counts or internal labels)',
    (slug) => {
      render(<MinimalCaseStudyPage slug={slug} />)

      const band = screen.getByRole('region', { name: 'Project snapshot' })
      expect(within(band).queryByText('Tools')).not.toBeInTheDocument()
      expect(band.textContent).not.toMatch(/Codex|Claude Code|SEO\/AEO|Enterprise analytics/)
    },
  )

  it('shows the verified client interview after the stats band and loads YouTube only on click', () => {
    const { container } = render(<MinimalCaseStudyPage slug="dr-christopher-wong" />)

    const section = screen.getByRole('region', { name: 'hear it from Dr. Wong.' })
    const band = screen.getByRole('region', { name: 'Project snapshot' })
    expect(
      band.compareDocumentPosition(section) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()

    // The caption is the video's real YouTube title.
    const play = within(section).getByRole('button', { name: /Play video: Meet Dr\. Wong/ })
    expect(container.querySelector('iframe')).toBeNull()
    expect(section.querySelector('img')).toHaveAttribute(
      'src',
      expect.stringContaining('i.ytimg.com/vi/HrksJeYb02Q/'),
    )

    fireEvent.click(play)

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByTitle('Meet Dr. Wong')).toHaveAttribute(
      'src',
      expect.stringContaining('youtube-nocookie.com/embed/HrksJeYb02Q'),
    )
    expect(trackCTAClick).toHaveBeenCalledWith(
      'play Meet Dr. Wong',
      'dr-christopher-wong case study video',
    )
  })

  it('labels the Olympic Bootworks film with its real YouTube title', () => {
    render(<MinimalCaseStudyPage slug="olympic-bootworks" />)

    expect(
      screen.getByRole('button', { name: /Play video: Heel-Loc Olympic Bootworks/ }),
    ).toBeInTheDocument()
  })

  it('quotes Dr. Tingjen Ji on Grace Dental from the named client quotes only', () => {
    render(<MinimalCaseStudyPage slug="grace-dental-santa-rosa" />)

    const section = screen.getByRole('region', { name: 'Dr. Tingjen Ji on the work' })
    const published = quotesData.filter(
      (quote) =>
        quote.client === 'Dr. Tingjen Ji' &&
        quote.company === 'website client' &&
        !quote.requiresConsent,
    )
    expect(published.length).toBeGreaterThan(0)
    const rendered = Array.from(section.querySelectorAll('blockquote')).map((node) =>
      node.textContent?.replace(/[\u201C\u201D]/g, '').trim(),
    )
    expect(rendered.length).toBeGreaterThan(0)
    for (const text of rendered) {
      expect(published.map((quote) => quote.text)).toContain(text)
    }
    expect(within(section).getByText('Grace Dental Santa Rosa')).toBeInTheDocument()
  })

  it.each(['exquisite-dentistry', 'saorsa-growth-partners', 'waikiki-dental'])(
    'shows no video or quote on %s, which has no verified one',
    (slug) => {
      const { container } = render(<MinimalCaseStudyPage slug={slug} />)

      expect(screen.queryByRole('button', { name: /^Play video: / })).not.toBeInTheDocument()
      expect(container.querySelector('blockquote')).toBeNull()
    },
  )

  it('renders the published story as challenge, approach, and result', () => {
    render(<MinimalCaseStudyPage slug="belize-kids-foundation" />)

    for (const name of ['the challenge.', 'the approach.', 'the result.']) {
      expect(screen.getByRole('heading', { level: 3, name })).toBeInTheDocument()
    }
  })

  it.each(['dr-christopher-wong', 'saorsa-growth-partners'])(
    'shows up to three other current clients as more work on %s',
    (slug) => {
      render(<MinimalCaseStudyPage slug={slug} />)

      const hrefs = moreWorkHrefs()
      const studyHrefs = hrefs.filter((href) => href !== '/case-studies')
      expect(studyHrefs.length).toBeGreaterThan(0)
      expect(studyHrefs.length).toBeLessThanOrEqual(3)
      expect(studyHrefs).not.toContain(`/case-studies/${slug}`)
      for (const former of FORMER) {
        expect(studyHrefs).not.toContain(`/case-studies/${former}`)
      }
    },
  )

  it('marks former-client pages as past projects', () => {
    render(<MinimalCaseStudyPage slug="saorsa-growth-partners" />)
    expect(screen.getByText('Past project')).toBeInTheDocument()
  })

  it('ends at the waitlist close', () => {
    render(<MinimalCaseStudyPage slug="olympic-bootworks" />)

    expect(
      screen.getByRole('heading', { level: 2, name: 'your business, next.' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Read what clients say/ })).toHaveAttribute(
      'href',
      '/wall-of-love',
    )
  })
})
