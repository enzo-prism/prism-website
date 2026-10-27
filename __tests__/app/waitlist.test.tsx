import { render, screen, within } from '@testing-library/react'

import WaitlistPage from '@/app/waitlist/page'
import WaitlistThankYouPage from '@/app/waitlist/thank-you/page'
import { SOCIAL_PROOF_VERIFIED_AT, SOCIAL_PROOF } from '@/lib/proof-metrics'
import {
  getWaitlistIntakeDate,
  getWaitlistIntakeMonth,
  toWaitlistIntakeMonth,
} from '@/lib/waitlist'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/waitlist',
}))

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
  }: {
    src: string
    alt: string
    [key: string]: unknown
  }) {
    return <img src={src} alt={alt} />
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
  WebPageSchema: function MockWebPageSchema() {
    return <script data-testid="webpage-schema" />
  },
}))

jest.mock('@/components/thank-you/LeadSuccessTracker', () => ({
  __esModule: true,
  default: function MockLeadSuccessTracker() {
    return <span data-testid="lead-success-tracker" />
  },
}))

jest.mock('@/utils/analytics', () => ({
  trackEvent: jest.fn(),
  trackFormSubmission: jest.fn(),
  trackLinkInteraction: jest.fn(),
}))

// Retired sales actions and public prices must never come back on the funnel.
const FORBIDDEN_COPY = [
  /book a (free )?(call|demo)/i,
  /get started/i,
  /contact us/i,
  /start my website/i,
  /\$\d/,
  /\/mo\b/i,
]

describe('/waitlist', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  async function renderPage(focus?: string) {
    const page = await WaitlistPage({
      searchParams: Promise.resolve(focus ? { focus } : {}),
    })
    return render(page)
  }

  it('keeps the locked h1 and the exact capacity line with the live month', async () => {
    await renderPage()
    const month = getWaitlistIntakeMonth().month

    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0].textContent).toMatch(/^join the waitlist$/i)

    expect(
      screen.getByText(/^Prism is fully booked\. Join the waitlist to work with us in/),
    ).toHaveTextContent(
      `Prism is fully booked. Join the waitlist to work with us in ${month}.`,
    )
    const status = screen.getByRole('status')
    expect(status).toHaveTextContent(/fully booked/i)
    expect(status).toHaveTextContent(`Waitlist open for ${month}`)
  })

  it('pairs the form with three plain next steps and verified proof', async () => {
    const { container } = await renderPage()

    const card = container.querySelector('[data-waitlist-form-card]')
    expect(card).toHaveClass('prism-beam')
    expect(within(card as HTMLElement).getAllByText(/step 1 of 5/i).length).toBeGreaterThan(0)
    expect(
      within(card as HTMLElement).getByRole('heading', {
        level: 2,
        name: /what should prism focus on\?/i,
      }),
    ).toBeInTheDocument()

    const next = screen.getByRole('heading', { level: 2, name: /what happens next/i })
      .parentElement as HTMLElement
    const steps = within(next).getAllByRole('listitem')
    expect(steps.map((step) => step.textContent)).toEqual([
      expect.stringMatching(/apply in about two minutes/i),
      expect.stringMatching(/review every application each month/i),
      expect.stringMatching(/reach out when a spot opens/i),
    ])

    expect(
      screen.getByRole('link', { name: /see why clients love prism/i }),
    ).toHaveAttribute('href', '/wall-of-love')
    expect(container.querySelector('[data-waitlist-proof="strip"]')).toBeInTheDocument()
    expect(screen.getByTestId('webpage-schema')).toBeInTheDocument()
  })

  it('hands ?focus= through to the form', async () => {
    await renderPage('content')

    expect(screen.getByRole('checkbox', { name: 'Content' })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Website Design' })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'Not sure yet' })).not.toBeChecked()
  })

  it('offers "Not sure yet" but never accepts it as a ?focus= hand-off', async () => {
    await renderPage('not-sure')

    for (const name of ['Website Design', 'Content', 'Ads', 'AEO', 'Not sure yet']) {
      expect(screen.getByRole('checkbox', { name })).not.toBeChecked()
    }
  })

  it('hands ?focus=aeo through to the form', async () => {
    await renderPage('aeo')

    expect(screen.getByRole('checkbox', { name: 'AEO' })).toBeChecked()
    for (const name of ['Website Design', 'Content', 'Ads', 'Not sure yet']) {
      expect(screen.getByRole('checkbox', { name })).not.toBeChecked()
    }
  })

  it('never shows retired sales CTAs or public prices', async () => {
    const { container } = await renderPage()
    const text = container.textContent ?? ''
    for (const pattern of FORBIDDEN_COPY) {
      expect(text).not.toMatch(pattern)
    }
  })
})

describe('/waitlist/thank-you', () => {
  it('celebrates, names the live intake month, and keeps the lead tracker', () => {
    const { container } = render(<WaitlistThankYouPage />)
    const month = getWaitlistIntakeMonth().month

    expect(
      screen.getByRole('heading', { level: 1, name: /you’re on the list\./i }),
    ).toBeInTheDocument()
    expect(screen.getByTestId('lead-success-tracker')).toBeInTheDocument()

    const steps = within(
      screen.getByRole('heading', { level: 2, name: /what happens next/i })
        .parentElement as HTMLElement,
    ).getAllByRole('listitem')
    expect(steps).toHaveLength(3)
    expect(steps[0]).toHaveTextContent(/application received/i)
    expect(steps[1]).toHaveTextContent(`In line for the ${month} intake.`)
    expect(steps[2]).toHaveTextContent(/we reach out by email/i)

    expect(container.textContent).not.toMatch(/join the waitlist/i)

    // The $100 referral payout is the one dollar figure allowed here, and only
    // inside the /refer card. Everything else stays price-free.
    const referral = screen.getByRole('link', { name: /know someone who needs this\?/i })
    const text = container.textContent ?? ''
    expect(text.match(/\$\d[\d,.]*/g)).toEqual(['$100'])
    const textOutsideReferral = text.replace(referral.textContent ?? '', '')
    for (const pattern of FORBIDDEN_COPY) {
      expect(textOutsideReferral).not.toMatch(pattern)
    }
    expect(text).not.toMatch(/\/mo\b/i)
  })

  it('shows an honest intake strip with the live next intake highlighted', () => {
    const { container } = render(<WaitlistThankYouPage />)
    // The booked slot is the month just before the live intake.
    const intake = getWaitlistIntakeDate()
    const bookedMonth = toWaitlistIntakeMonth(
      new Date(intake.getFullYear(), intake.getMonth() - 1, 1),
    ).month
    const nextIntake = getWaitlistIntakeMonth().month

    const strip = container.querySelector('[data-waitlist-intake-strip]') as HTMLElement
    expect(strip).toHaveAccessibleName(/intake calendar/i)
    const slots = within(strip).getAllByRole('listitem')
    expect(slots).toHaveLength(4)
    expect(slots[0]).toHaveTextContent(bookedMonth)
    expect(slots[0]).toHaveTextContent(/fully booked/i)
    expect(slots[1]).toHaveAttribute('aria-current', 'step')
    expect(slots[1]).toHaveTextContent(nextIntake)
    expect(slots[1]).toHaveTextContent(/you.re in line/i)
    expect(slots.filter((slot) => slot.hasAttribute('aria-current'))).toHaveLength(1)
    // No spot counts, no countdowns: the strip carries no numbers at all.
    expect(strip.textContent).not.toMatch(/\d/)
  })

  it('gives next steps while you wait: real channels with verified numbers, and referrals', () => {
    const { container } = render(<WaitlistThankYouPage />)

    expect(
      screen.getByRole('heading', { level: 2, name: /stay close\./i }),
    ).toBeInTheDocument()

    const follow = container.querySelector('[data-waitlist-follow]') as HTMLElement
    expect(
      within(follow).getByRole('heading', { level: 3, name: /follow along\./i }),
    ).toBeInTheDocument()
    expect(follow).toHaveTextContent(`${SOCIAL_PROOF.combinedAudience} followers`)
    expect(follow).toHaveTextContent(`Audience verified ${SOCIAL_PROOF_VERIFIED_AT}`)

    const channels = [
      SOCIAL_PROOF.instagram,
      SOCIAL_PROOF.youtube,
      SOCIAL_PROOF.tiktok,
    ] as const
    const channelLinks = within(follow).getAllByRole('link')
    expect(channelLinks).toHaveLength(channels.length)
    channels.forEach((channel, index) => {
      const link = channelLinks[index]
      expect(link).toHaveAttribute('href', channel.url)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
      expect(link).toHaveTextContent(channel.platform)
      expect(link).toHaveTextContent(channel.audience)
      expect(link).toHaveTextContent(channel.audienceLabel)
    })

    const referral = screen.getByRole('link', { name: /know someone who needs this\?/i })
    expect(referral).toHaveAttribute('href', '/refer')
    expect(referral).toHaveTextContent('$100')
    expect(referral).toHaveTextContent(/refer a friend/i)
  })

  it('points visitors to the work and the wall of love', () => {
    render(<WaitlistThankYouPage />)

    expect(screen.getByRole('link', { name: /the work\./i })).toHaveAttribute(
      'href',
      '/case-studies',
    )
    expect(screen.getByRole('link', { name: /the wall of love\./i })).toHaveAttribute(
      'href',
      '/wall-of-love',
    )
    expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute(
      'href',
      '/',
    )
  })
})
