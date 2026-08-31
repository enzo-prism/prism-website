import {
  HOMEPAGE_CASE_STUDY_SUMMARIES,
  HOMEPAGE_CLIENT_WINS,
  HOMEPAGE_GROWTH_RAMP,
  HOMEPAGE_HERO,
} from '@/components/home/homepage-content'
import { CASE_STUDIES, getCaseStudyMetric } from '@/lib/case-study-data'
import { CASE_STUDY_NAV_ITEMS } from '@/lib/case-study-nav-data'
import { CLIENTS } from '@/lib/clients'
import { websiteProjects } from '@/lib/website-projects'

const getStudy = (slug: string) => {
  const study = CASE_STUDIES.find((item) => item.slug === slug)

  if (!study) {
    throw new Error(`Missing case study: ${slug}`)
  }

  return study
}

describe('case study data freshness', () => {
  it('keeps the Aug 28 Search Console and GA4 windows exact', () => {
    const wong = getStudy('dr-christopher-wong')
    const olympic = getStudy('olympic-bootworks')
    const belize = getStudy('belize-kids-foundation')
    const roseville = getStudy('roseville-dental-academy')
    const saorsa = getStudy('saorsa-growth-partners')

    expect(wong.structured?.results?.[0]).toMatchObject({
      value: '+160%',
      dateRange: 'May 31-Aug 28, 2025 vs May 31-Aug 28, 2026',
      detail:
        'Google Search Console: 8,704 impressions grew to 22,660 in the latest complete 90-day year-over-year window.',
    })
    expect(wong.structured?.story?.result).toContain(
      'Google Search impressions rose 160% year over year',
    )

    expect(olympic.structured?.results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: '+8%',
          dateRange: 'May 31-Aug 28, 2025 vs May 31-Aug 28, 2026',
          detail:
            'Google Search Console: 9,373 impressions grew to 10,129 in the latest complete 90-day year-over-year window.',
        }),
        expect.objectContaining({
          value: '10.7k',
          dateRange: 'May 31-Aug 28, 2026',
          detail:
            'GA4: 10,709 sessions and 10,151 new users from May 31-Aug 28, 2026.',
        }),
      ]),
    )

    expect(belize.structured?.results?.[0]).toMatchObject({
      value: '+121%',
      dateRange: 'May 31-Aug 28, 2025 vs May 31-Aug 28, 2026',
      detail:
        'Google Search Console: 1,313 impressions grew to 2,903 in the latest complete 90-day year-over-year window.',
    })

    expect(roseville.structured?.results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: '701', dateRange: 'July 2026' }),
        expect.objectContaining({ value: '17.5k', dateRange: 'July 2026' }),
      ]),
    )
    expect(saorsa.structured?.results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ value: '1.9×', dateRange: 'Jan-Jul 2026' }),
        expect.objectContaining({ value: '+114%', dateRange: 'Jan-Jul 2026' }),
      ]),
    )

    for (const study of [wong, olympic, belize, roseville, saorsa]) {
      expect(study.structured?.dateModified).toBe('2026-08-30T00:00:00.000Z')
    }
  })

  it('derives the Roseville homepage result from canonical case data', () => {
    const canonical = getCaseStudyMetric('roseville-dental-academy')
    const slide = HOMEPAGE_CLIENT_WINS.slides.find(
      (item) => item.href === '/case-studies/roseville-dental-academy',
    )
    const metric = slide && 'metric' in slide ? slide.metric : undefined

    expect(metric).toEqual({
      value: canonical.value,
      label: canonical.label,
      source: canonical.sourceName,
    })
    expect(metric?.value).toBe('701')
    expect(JSON.stringify(HOMEPAGE_CLIENT_WINS)).not.toContain('593')
  })

  it('keeps current client identities, locations, and positioning', () => {
    expect(getStudy('family-first-smile-care').founder).toBe(
      'Dr. Tim J. Chuang',
    )
    expect(getStudy('coast-periodontics-and-laser-surgery')).toMatchObject({
      client: 'Coast Periodontics',
      founder: 'Dr. Bryce Chun',
      location: 'San Luis Obispo, CA',
    })
    expect(getStudy('sr4-partners')).toMatchObject({
      founder: 'Todd “Ish” Israelite',
      location: 'Evanston, IL',
    })
    expect(getStudy('belize-kids-foundation')).toMatchObject({
      client: 'Belize Kids',
      founder: 'Don Listwin',
    })
    expect(getStudy('we-are-saplings')).toMatchObject({
      founder: 'Clare Frattarola',
      industry: 'Children’s Emotional Learning',
      location: 'Los Angeles, CA',
    })
    expect(getStudy('infobell-it')).toMatchObject({
      client: 'Infobell IT Solutions',
      industry: 'AI & Product Engineering',
      location: 'Bengaluru, India',
    })
    expect(getStudy('infobell-it').founder).toBeUndefined()
    expect(getStudy('leadership-retreat').location).toBe('Savannah, GA')
    expect(getStudy('exquisite-dentistry').location).toBe('Los Angeles, CA')
    expect(getStudy('practice-transitions-institute').founder).toBe(
      'Dr. Michael Njo',
    )
    expect(getStudy('canary-cove').description).toContain(
      'private beachfront estate on Ambergris Caye',
    )

    const canonicalNames = new Map(
      CASE_STUDIES.map((study) => [study.slug, study.client]),
    )
    expect(
      CASE_STUDY_NAV_ITEMS.every(
        (item) => canonicalNames.get(item.slug) === item.client,
      ),
    ).toBe(true)
  })

  it('blocks dead links, placeholders, obsolete product claims, and invented homepage outcomes', () => {
    const laguna = getStudy('laguna-beach-dental-arts')
    const lagunaClient = CLIENTS.find(
      (client) => client.title === 'Laguna Beach Dental Arts',
    )
    const lagunaProject = websiteProjects.find(
      (project) => project.title === 'laguna beach dental arts',
    )
    const fanticProject = websiteProjects.find((project) =>
      project.title.includes('fantic e-bikes'),
    )
    const olympicText = JSON.stringify(getStudy('olympic-bootworks'))

    expect(laguna.websiteUrl).toBeUndefined()
    expect(lagunaClient?.website).toBeUndefined()
    expect(lagunaProject).toMatchObject({
      url: '/case-studies/laguna-beach-dental-arts',
      external: false,
    })
    expect(fanticProject?.url).toBe('https://www.olympicbootworks.com/e-bikes')
    expect(olympicText).not.toMatch(
      /Fantic Warehouse|fanticbikewarehouse|microsite|online checkout|POS-linked|two-site/i,
    )
    expect(olympicText).toMatch(/current pricing/i)
    expect(olympicText).toMatch(/test-ride inquiry/i)

    expect(
      CASE_STUDIES.some(
        (study) => study.structured?.heroVideoId === 'VIDEO_PLACEHOLDER',
      ),
    ).toBe(false)
    expect(HOMEPAGE_CASE_STUDY_SUMMARIES['canary-cove']).not.toMatch(
      /private island/i,
    )
    expect(HOMEPAGE_HERO.subheading).toBe('a growth team for small businesses')
    expect(HOMEPAGE_HERO.subheading).not.toMatch(/#1/i)
    expect(HOMEPAGE_GROWTH_RAMP.metrics.map((metric) => metric.value)).toEqual([
      'Baseline',
      'Live',
      'Cadence',
    ])
    expect(JSON.stringify(HOMEPAGE_GROWTH_RAMP)).not.toMatch(
      /\+25%|\+50%|10-30/,
    )
  })
})
