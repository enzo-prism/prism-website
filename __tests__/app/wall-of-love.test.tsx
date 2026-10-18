import { fireEvent, render, within } from '@testing-library/react'

import WallOfLoveClientPage from '@/app/wall-of-love/client-page'
import {
  COMMUNITY_MOBILE_PREVIEW_COUNT,
  COMMUNITY_PREVIEW_COUNT,
} from '@/components/wall-of-love/community-wall'
import {
  clientNoteAuthorCount,
  clientNotes,
  communityComments,
  emojiOnlyComments,
  getClientBusiness,
  getCommunitySpotlight,
  getCommunityWall,
  getInitials,
  getMarqueeRows,
  VERIFIED_CLIENT_CASE_STUDIES,
} from '@/components/wall-of-love/wall-of-love-feed'
import { quotesData, takeawaysData } from '@/content/wall-of-love-data'
import { CASE_STUDIES } from '@/lib/case-study-data'
import { isCuratedComment } from '@/lib/community-comments'
import { FORMER_CLIENT_SLUGS } from '@/lib/former-clients'
import { SOCIAL_PROOF_VERIFIED_AT, SOCIAL_PROOF } from '@/lib/proof-metrics'
import { trackLinkInteraction } from '@/utils/analytics'

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

jest.mock('@/utils/analytics', () => ({
  trackLinkInteraction: jest.fn(),
  trackCTAClick: jest.fn(),
}))

const consentTexts = [
  ...quotesData.filter((quote) => quote.requiresConsent).map((quote) => quote.text),
  ...takeawaysData
    .filter((takeaway) => takeaway.requiresConsent)
    .map((takeaway) => takeaway.text),
]

function section(container: HTMLElement, id: string) {
  const node = container.querySelector(`#${id}`)
  if (!node) throw new Error(`missing #${id}`)
  return node as HTMLElement
}

describe('WallOfLoveClientPage hero', () => {
  beforeEach(() => jest.clearAllMocks())

  it('renders one lowercase wall of love H1 and no ASCII heart', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const hero = within(section(container, 'wall-of-love-hero'))

    expect(container.querySelectorAll('h1')).toHaveLength(1)
    expect(hero.getByRole('heading', { level: 1, name: 'wall of love.' })).toBeInTheDocument()
    expect(container.querySelector('img[src="/animations/heart/poster.svg"]')).toBeNull()
  })

  it('keeps exactly one tracked waitlist CTA in the hero', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const hero = within(section(container, 'wall-of-love-hero'))

    const links = hero.getAllByRole('link')
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAccessibleName(/join the waitlist/i)
    expect(links[0]).toHaveAttribute('href', '/waitlist')

    fireEvent.click(links[0])
    expect(trackLinkInteraction).toHaveBeenCalledWith(
      '/waitlist',
      'Join the waitlist',
      'wall of love hero',
    )
  })

  it('reads the audience stat row from the shared proof snapshot with its date', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const hero = section(container, 'wall-of-love-hero')
    const stats = within(hero).getByLabelText('Prism audience by channel')

    for (const channel of [SOCIAL_PROOF.instagram, SOCIAL_PROOF.tiktok, SOCIAL_PROOF.youtube]) {
      expect(stats).toHaveTextContent(channel.platform)
      expect(stats).toHaveTextContent(channel.audience)
      expect(stats).toHaveTextContent(channel.audienceLabel)
    }
    expect(hero).toHaveTextContent(`Audience as of ${SOCIAL_PROOF_VERIFIED_AT}`)
  })

  it('quotes the curated counts in the hero pill', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const hero = section(container, 'wall-of-love-hero')

    expect(hero).toHaveTextContent(`${clientNotes.length} client notes`)
    expect(hero).toHaveTextContent(`${communityComments.length} community comments`)
  })

  it('keeps hero copy free of em dashes', () => {
    const { container } = render(<WallOfLoveClientPage />)
    expect(section(container, 'wall-of-love-hero').textContent).not.toContain('—')
  })
})

describe('WallOfLoveClientPage sources', () => {
  it('never renders an item that still requires consent', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const text = container.textContent ?? ''

    expect(consentTexts.length).toBeGreaterThan(0)
    for (const quote of consentTexts) {
      expect(text).not.toContain(quote)
    }
  })

  it('shows exactly the named website client quotes under "from clients"', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const clients = section(container, 'from-clients')
    const expected = quotesData.filter(
      (quote) => quote.company === 'website client' && !quote.requiresConsent,
    )

    expect(expected).toHaveLength(8)
    const cards = clients.querySelectorAll('figure')
    expect(cards).toHaveLength(expected.length)
    for (const quote of expected) {
      expect(clients).toHaveTextContent(quote.text)
      expect(clients).toHaveTextContent(quote.client)
    }
    for (const card of Array.from(cards)) {
      expect(card).not.toHaveTextContent('Instagram')
    }
    expect(clients).toHaveTextContent(`${expected.length} notes · ${clientNoteAuthorCount} named clients`)
    // Renata Chun, Michael, Dr. Tingjen Ji, Suzanne Meinhardt, Mary Lynn Wheaton.
    expect(clientNoteAuthorCount).toBe(5)
  })

  it('attributes a business only where the repo verifies it', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const clients = section(container, 'from-clients')
    const cards = Array.from(clients.querySelectorAll('figure'))

    for (const card of cards) {
      const note = clientNotes.find((item) => card.textContent?.includes(item.text))
      expect(note).toBeDefined()
      const link = card.querySelector('figcaption a')
      if (note?.name === 'Dr. Tingjen Ji') {
        expect(link).toHaveAttribute('href', '/case-studies/grace-dental-santa-rosa')
        expect(link).toHaveTextContent('Dr. Tingjen Ji · Grace Dental Santa Rosa')
        expect(card).not.toHaveTextContent('Website client')
      } else {
        expect(link).toBeNull()
        expect(card).toHaveTextContent('Website client')
      }
    }

    const tingjen = cards.find((card) => card.textContent?.includes('Dr. Tingjen Ji'))
    fireEvent.click(tingjen?.querySelector('figcaption a') as HTMLElement)
    expect(trackLinkInteraction).toHaveBeenLastCalledWith(
      '/case-studies/grace-dental-santa-rosa',
      'Grace Dental Santa Rosa case study',
      'wall of love client note',
    )
  })

  it('only maps clients whose case study names them, never a former client', () => {
    for (const [name, slug] of Object.entries(VERIFIED_CLIENT_CASE_STUDIES)) {
      const study = CASE_STUDIES.find((item) => item.slug === slug)
      expect(study).toBeDefined()
      expect(JSON.stringify(study)).toContain(name)
      expect(FORMER_CLIENT_SLUGS).not.toContain(slug as (typeof FORMER_CLIENT_SLUGS)[number])
    }
    for (const name of ['Renata Chun', 'Michael', 'Suzanne Meinhardt', 'Mary Lynn Wheaton']) {
      expect(getClientBusiness(name)).toBeUndefined()
    }
  })

  it('labels every community item as an Instagram comment, never a client review', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const community = section(container, 'from-the-community')
    const cards = Array.from(community.querySelectorAll('figure')).filter(
      (figure) => figure.querySelector('blockquote'),
    )

    // Phones get a shorter preview; those skipped items render once more,
    // phone-only, inside the disclosure.
    const mobileDuplicates = COMMUNITY_PREVIEW_COUNT - COMMUNITY_MOBILE_PREVIEW_COUNT
    expect(cards).toHaveLength(communityComments.length + mobileDuplicates)
    for (const card of cards) {
      const quote = card.querySelector('blockquote')?.textContent?.replace(/^\u201c|\u201d$/g, '') ?? ''
      const handle = card.querySelector('figcaption')?.textContent?.replace(/on Instagram$/, '') ?? ''
      expect(isCuratedComment(quote, handle)).toBe(true)
    }
    for (const card of cards) {
      expect(card).toHaveTextContent('on Instagram')
      expect(card).not.toHaveTextContent('Website client')
    }
    expect(community).toHaveTextContent('not client reviews')
    for (const note of clientNotes) {
      expect(community).not.toHaveTextContent(note.text)
    }
  })

  it('keeps the full wall behind a native disclosure', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const details = section(container, 'from-the-community').querySelector('details')

    expect(details).not.toBeNull()
    expect(details).not.toHaveAttribute('open')
    expect(details?.querySelector('summary')).toHaveTextContent(
      `Show all ${communityComments.length} comments`,
    )
  })

  it('never prints the off-brand reactions the curation rules exclude', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const text = container.textContent ?? ''

    for (const phrase of [
      'Hormozi will always be my goat',
      'Jesus in my Lord and King',
      'alex said the same thing',
      'Get rich or Regret Not Trying',
      'WHY ARE YOU NOT MENTORING YOUNG MEN',
    ]) {
      expect(text).not.toContain(phrase)
    }
  })

  it('leads the wall with comments about the edit itself', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const community = section(container, 'from-the-community')
    const spotlight = getCommunitySpotlight()

    expect(spotlight.map((comment) => comment.key)).toEqual([
      'quote-186',
      'takeaway-218',
      'quote-196',
    ])
    const firstQuotes = Array.from(community.querySelectorAll('blockquote'))
      .slice(0, 3)
      .map((quote) => quote.textContent)
    expect(firstQuotes).toEqual(spotlight.map((comment) => `\u201c${comment.text}\u201d`))
  })

  it('counts emoji across printed comments plus emoji-only replies', () => {
    const { container } = render(<WallOfLoveClientPage />)
    const community = section(container, 'from-the-community')

    expect(emojiOnlyComments.length).toBeGreaterThan(0)
    expect(community).toHaveTextContent(
      `Counted across the ${communityComments.length} comments below plus ${emojiOnlyComments.length} emoji-only replies.`,
    )
  })

  it('ends with the tracked final waitlist CTA', () => {
    const { getAllByRole, getByRole } = render(<WallOfLoveClientPage />)
    expect(
      getByRole('heading', { level: 2, name: 'be the next note on this wall.' }),
    ).toBeInTheDocument()
    const finalLink = getAllByRole('link', { name: /join the waitlist/i }).at(-1)

    expect(finalLink).toHaveAttribute('href', '/waitlist')
    fireEvent.click(finalLink as HTMLElement)
    expect(trackLinkInteraction).toHaveBeenLastCalledWith(
      '/waitlist',
      'Join the waitlist',
      'wall of love final cta',
    )
  })
})

describe('wall of love feed helpers', () => {
  it('derives initials without titles', () => {
    expect(getInitials('Dr. Tingjen Ji')).toBe('TJ')
    expect(getInitials('Mary Lynn Wheaton')).toBe('MW')
    expect(getInitials('Michael')).toBe('M')
  })

  it('places every curated community comment exactly once across spotlight and wall', () => {
    const spotlight = getCommunitySpotlight()
    const wall = getCommunityWall()
    const keys = [...spotlight, ...wall].map((comment) => comment.key)

    expect(keys).toHaveLength(communityComments.length)
    expect(new Set(keys).size).toBe(keys.length)
    expect(new Set(keys)).toEqual(new Set(communityComments.map((comment) => comment.key)))
    expect(wall).toEqual(getCommunityWall())
    for (const comment of [...spotlight, ...wall]) {
      expect(comment.text).not.toContain('—')
    }
  })

  it('fills the marquee rails with short, consent-safe, dash-free comments', () => {
    const rows = getMarqueeRows(3, 12)
    expect(rows).toHaveLength(3)
    for (const row of rows) expect(row.length).toBeGreaterThanOrEqual(6)
    for (const comment of rows.flat()) {
      expect(comment.text.length).toBeLessThanOrEqual(40)
      expect(comment.text).not.toContain('—')
      expect(communityComments).toContainEqual(comment)
    }
    const keys = rows.flat().map((comment) => comment.key)
    expect(new Set(keys).size).toBe(keys.length)
  })
})
