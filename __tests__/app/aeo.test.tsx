import fs from 'node:fs'
import path from 'node:path'

import { fireEvent, render, screen, within } from '@testing-library/react'

import AeoPage, { metadata } from '@/app/aeo/page'
import robots from '@/app/robots'
import { AEO_WAITLIST_CTA } from '@/lib/pricing-model'
import { DESCRIPTION_MAX_LENGTH } from '@/lib/seo/rules'
import { isBlogPostIndexable } from '@/lib/seo/search-visibility'
import { trackLinkInteraction } from '@/utils/analytics'

type SchemaQuestion = { question: string; answer: string }
type ServiceSchemaProps = {
  serviceId: string
  name: string
  offerDetails?: { url?: string; availability?: string }
}

const mockFaqSchema = jest.fn<null, [{ questions: SchemaQuestion[] }]>(
  () => null,
)
const mockServiceSchema = jest.fn<null, [ServiceSchemaProps]>(() => null)

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
    ...props
  }: {
    src: string
    alt: string
    priority?: boolean
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

jest.mock('@/components/schema-markup', () => ({
  ServiceSchema: (props: ServiceSchemaProps) => mockServiceSchema(props),
  FAQSchema: (props: { questions: SchemaQuestion[] }) => mockFaqSchema(props),
}))

jest.mock('@/utils/analytics', () => ({
  trackLinkInteraction: jest.fn(),
}))

const AEO_WAITLIST_HREF = '/waitlist?focus=aeo'

function heroScope() {
  return within(
    document.querySelector(
      'section[aria-labelledby="service-hero-title"]',
    ) as HTMLElement,
  )
}

function sectionByHeadingId(id: string) {
  return document.getElementById(id)?.closest('section') as HTMLElement
}

function mainText(container: HTMLElement) {
  return container.querySelector('main')?.textContent ?? ''
}

beforeEach(() => {
  jest.mocked(trackLinkInteraction).mockClear()
  mockFaqSchema.mockClear()
  mockServiceSchema.mockClear()
})

describe('AeoPage hero', () => {
  it('renders the lowercase h1, the AEO-focused CTA, and the engines anchor', () => {
    render(<AeoPage />)
    const hero = heroScope()

    expect(
      hero.getByRole('heading', {
        level: 1,
        name: 'they ask AI. be the answer.',
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)

    expect(AEO_WAITLIST_CTA.href).toBe(AEO_WAITLIST_HREF)
    const primary = hero.getByRole('link', { name: 'Join the waitlist' })
    expect(primary).toHaveAttribute('href', AEO_WAITLIST_HREF)
    fireEvent.click(primary)
    expect(trackLinkInteraction).toHaveBeenCalledWith(
      AEO_WAITLIST_HREF,
      'Join the waitlist',
      'aeo hero',
    )

    const secondary = hero.getByRole('link', { name: 'See the engines' })
    expect(secondary).toHaveAttribute('href', '#engines')
    expect(document.getElementById('engines')).toBeInTheDocument()
    fireEvent.click(secondary)
    expect(trackLinkInteraction).toHaveBeenLastCalledWith(
      '#engines',
      expect.any(String),
      'aeo hero',
    )
  })

  it('names the product and labels the answer-check visual as an example', () => {
    render(<AeoPage />)
    const hero = heroScope()

    expect(hero.getByText('Prism AEO')).toBeInTheDocument()
    expect(hero.getByText('Example')).toBeInTheDocument()
    const engines = hero.getByRole('list', { name: 'Answer engines' })
    expect(
      within(engines)
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual(
      expect.arrayContaining([
        'ChatGPT',
        'AI Overviews',
        'Gemini',
        'Claude',
        'Perplexity',
      ]),
    )
  })

  it('keeps hero copy free of em dashes', () => {
    render(<AeoPage />)

    const hero = document.querySelector(
      'section[aria-labelledby="service-hero-title"]',
    )
    expect(hero).not.toBeNull()
    expect(hero?.textContent).not.toContain('\u2014')
  })
})

describe('AeoPage sections', () => {
  it('prints a source and date under every third-party stat in the shift', () => {
    render(<AeoPage />)

    const shift = sectionByHeadingId('aeo-shift-title')
    const sources = within(shift).getAllByText(/^Source: /)
    expect(sources.length).toBeGreaterThanOrEqual(3)
    for (const source of sources) {
      expect(source.textContent).toMatch(/\b20\d{2}$/)
    }
  })

  it('lists the answer engines with the crawler each one reads', () => {
    render(<AeoPage />)

    const engines = document.getElementById('engines') as HTMLElement
    const names = within(engines)
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent)
    expect(names).toEqual(
      expect.arrayContaining([
        'ChatGPT',
        'AI Overviews and AI Mode',
        'Gemini',
        'Claude',
        'Perplexity',
        'Copilot',
      ]),
    )
    for (const crawler of [
      'OAI-SearchBot',
      'Claude-SearchBot',
      'PerplexityBot',
    ]) {
      expect(within(engines).getByText(crawler)).toBeInTheDocument()
    }
  })

  it('only shows AI crawler rules that design-prism.com robots.txt really welcomes', () => {
    render(<AeoPage />)

    const rules = Array.from(document.querySelectorAll('pre')).find((block) =>
      block.textContent?.includes('# robots.txt'),
    ) as HTMLElement
    expect(rules).toBeDefined()
    const shown = Array.from(
      (rules.textContent ?? '').matchAll(/User-agent: (\S+)/g),
    ).map(([, agent]) => agent)
    expect(shown.length).toBeGreaterThan(0)

    const result = robots()
    const ruleList = Array.isArray(result.rules) ? result.rules : [result.rules]
    const aiAgents = ruleList.flatMap((rule) =>
      Array.isArray(rule.userAgent) ? rule.userAgent : [],
    )
    for (const agent of shown) {
      expect(aiAgents).toContain(agent)
    }
  })

  it('links the live files on our own site', () => {
    render(<AeoPage />)

    const ownSite = sectionByHeadingId('aeo-own-site-title')
    const hrefs = within(ownSite)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href') ?? '')
    expect(hrefs).toEqual(
      expect.arrayContaining(['/robots.txt', '/llms.txt', '/ai-data.json']),
    )
    for (const file of ['llms.txt', 'ai-data.json']) {
      expect(fs.existsSync(path.join(process.cwd(), 'public', file))).toBe(true)
    }
    // The markdown example points at a real, indexable post.
    const markdown = hrefs.find((href) => href.startsWith('/api/blog/'))
    expect(markdown).toMatch(/^\/api\/blog\/[^/]+\/markdown$/)
    expect(isBlogPostIndexable(markdown?.split('/')[3] ?? '')).toBe(true)
  })

  it('points every playbook at an indexable blog post', () => {
    render(<AeoPage />)

    const playbooks = sectionByHeadingId('aeo-playbooks-title')
    const slugs = within(playbooks)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href') ?? '')
      .map((href) => {
        expect(href).toMatch(/^\/blog\/[a-z0-9-]+$/)
        return href.replace('/blog/', '')
      })
    expect(slugs.length).toBeGreaterThanOrEqual(1)
    for (const slug of slugs) {
      expect(isBlogPostIndexable(slug)).toBe(true)
      expect(
        fs.existsSync(path.join(process.cwd(), 'content/blog', `${slug}.mdx`)),
      ).toBe(true)
    }
  })

  it('answers every FAQ in crawlable disclosures that match the FAQ schema', () => {
    render(<AeoPage />)

    const faq = sectionByHeadingId('aeo-faq-title')
    const disclosures = Array.from(faq.querySelectorAll('details'))
    expect(disclosures[0]).toHaveAttribute('open')

    expect(mockFaqSchema).toHaveBeenCalled()
    const questions = mockFaqSchema.mock.calls[0][0].questions
    expect(questions.length).toBeGreaterThanOrEqual(5)
    expect(disclosures).toHaveLength(questions.length)
    for (const [index, { question, answer }] of questions.entries()) {
      const details = disclosures[index]
      expect(details.querySelector('summary')?.textContent).toBe(question)
      // Collapsed answers still ship in the HTML so crawlers can read them.
      expect(details.textContent).toContain(answer)
    }
  })

  it('publishes a price-free AEO service schema for /aeo', () => {
    render(<AeoPage />)

    expect(mockServiceSchema).toHaveBeenCalledWith(
      expect.objectContaining({
        serviceId: 'aeo',
        name: 'Prism AEO',
        offerDetails: expect.objectContaining({
          url: 'https://www.design-prism.com/aeo',
          availability: 'https://schema.org/LimitedAvailability',
        }),
      }),
    )
    expect(JSON.stringify(mockServiceSchema.mock.calls[0][0])).not.toMatch(
      /"price"|priceRange|\$\d/,
    )
  })

  it('cross-links the other three services, not the current one', () => {
    render(<AeoPage />)

    const siblings = screen
      .getByRole('heading', { level: 2, name: 'also from Prism.' })
      .closest('section') as HTMLElement
    expect(
      within(siblings)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href')),
    ).toEqual(['/website-design', '/content', '/ads'])
  })

  it('sends every waitlist CTA to the AEO focus, from hero, inline, and final CTAs', () => {
    render(<AeoPage />)

    const finalCta = sectionByHeadingId('aeo-final-cta-title')
    const cta = within(finalCta).getByRole('link', {
      name: 'Join the waitlist',
    })
    expect(cta).toHaveAttribute('href', AEO_WAITLIST_HREF)
    fireEvent.click(cta)
    expect(trackLinkInteraction).toHaveBeenLastCalledWith(
      AEO_WAITLIST_HREF,
      'Join the waitlist',
      'aeo final cta',
    )

    const waitlistLinks = screen.getAllByRole('link', {
      name: /join the waitlist/i,
    })
    expect(waitlistLinks.length).toBeGreaterThanOrEqual(3)
    for (const link of waitlistLinks) {
      expect(link).toHaveAttribute('href', AEO_WAITLIST_HREF)
      fireEvent.click(link)
    }
    const locations = jest
      .mocked(trackLinkInteraction)
      .mock.calls.filter(([href]) => href === AEO_WAITLIST_HREF)
      .map(([, , location]) => location)
    expect(locations).toEqual(
      expect.arrayContaining(['aeo hero', 'aeo inline cta', 'aeo final cta']),
    )
  })

  it('never promises citations or rankings outside the no-guarantee answer', () => {
    const { container } = render(<AeoPage />)

    const faq = sectionByHeadingId('aeo-faq-title')
    const outsideFaq = mainText(container).replace(faq.textContent ?? '', '')
    expect(outsideFaq).not.toMatch(/guarantee/i)

    // Inside the FAQ, a question about guarantees is answered with a no.
    for (const details of Array.from(faq.querySelectorAll('details'))) {
      const question = details.querySelector('summary')?.textContent ?? ''
      if (/guarantee/i.test(question)) {
        const answer = (details.textContent ?? '').replace(question, '').trim()
        expect(answer).toMatch(/^No\b/)
      }
    }
    expect(mainText(container)).not.toMatch(
      /guaranteed? (citations?|rankings?|results|placement)|#1\b/i,
    )
  })

  it('keeps the whole page free of em dashes and prices', () => {
    const { container } = render(<AeoPage />)
    const text = mainText(container)

    expect(text).not.toContain('\u2014')
    expect(text).not.toMatch(/\$\d/)
  })
})

describe('AeoPage metadata', () => {
  it('is indexable with a canonical /aeo URL and a compact description', () => {
    expect(metadata.alternates?.canonical).toBe(
      'https://www.design-prism.com/aeo',
    )
    expect(metadata.openGraph?.url).toBe('https://www.design-prism.com/aeo')
    expect(metadata.robots).toEqual({ index: true, follow: true })
    expect(metadata.title).toEqual({
      absolute: expect.stringMatching(/^AEO\b.*\| Prism$/),
    })

    const description = metadata.description ?? ''
    expect(description).toMatch(/\bAEO\b/)
    expect(description.length).toBeLessThanOrEqual(DESCRIPTION_MAX_LENGTH)
    expect(description).not.toContain('\u2014')
  })
})
