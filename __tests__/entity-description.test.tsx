import fs from 'node:fs'
import path from 'node:path'

import { render } from '@testing-library/react'

import { BlogPostSchema, GlobalSchemaGraph } from '@/components/schema-markup'
import { resolveBlogAuthor } from '@/lib/blog-author'
import { BLOG_VIDEOS, getBlogPostVideos } from '@/lib/blog-videos'
import {
  CASE_STUDIES,
  datedMetricSummary,
  undatedMetricLabel,
} from '@/lib/case-study-data'
import {
  BLOG_FEED_ALTERNATE,
  PRISM_DISAMBIGUATION,
  PRISM_ENTITY_DESCRIPTION,
} from '@/lib/seo/rules'
import { buildRouteMetadata } from '@/lib/seo/metadata'
import {
  WAITLIST_FOCUS_CHOICES,
  WAITLIST_STEPS,
  WAITLIST_TIMING_OPTIONS,
} from '@/lib/waitlist'

const readPublic = (file: string) =>
  fs.readFileSync(path.join(process.cwd(), 'public', file), 'utf8')

function jsonLdNodes(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll('script[type="application/ld+json"]'),
  ).flatMap((script) => {
    const data = JSON.parse(script.textContent || '[]')
    return Array.isArray(data) ? data : [data]
  })
}

describe('one Prism entity description', () => {
  it('is the same in the Organization schema, llms.txt, and ai-data.json', () => {
    const { container } = render(<GlobalSchemaGraph />)
    const organization = jsonLdNodes(container).find(
      (node) => node['@type'] === 'Organization',
    )
    expect(organization.description).toBe(PRISM_ENTITY_DESCRIPTION)
    expect(organization.disambiguatingDescription).toBe(PRISM_DISAMBIGUATION)

    const llms = readPublic('llms.txt')
    expect(llms.split('\n')[2]).toBe(`> ${PRISM_ENTITY_DESCRIPTION}`)

    const data = JSON.parse(readPublic('ai-data.json'))
    expect(data.company.description).toBe(PRISM_ENTITY_DESCRIPTION)
    expect(data.company.disambiguation).toBe(PRISM_DISAMBIGUATION)
  })

  it('names all four services', () => {
    for (const service of ['website design', 'content', 'ads', 'AEO']) {
      expect(PRISM_ENTITY_DESCRIPTION).toContain(service)
    }
    expect(PRISM_ENTITY_DESCRIPTION).not.toContain('—')
  })
})

describe('ai-data.json waitlist_form', () => {
  const form = JSON.parse(readPublic('ai-data.json')).waitlist_form

  it('lists the live steps and options', () => {
    expect(form.steps.map((step: { id: string }) => step.id)).toEqual(
      WAITLIST_STEPS.map((step) => step.id),
    )
    const field = (name: string) =>
      form.steps
        .flatMap((step: { fields: { name: string }[] }) => step.fields)
        .find((item: { name: string }) => item.name === name)
    expect(field('focus[]').options).toEqual(
      WAITLIST_FOCUS_CHOICES.map((choice) => choice.value),
    )
    expect(field('start_timing').options).toEqual(
      WAITLIST_TIMING_OPTIONS.map((option) => option.value),
    )
  })

  it('points agents at the page, not a backend endpoint', () => {
    expect(JSON.stringify(form)).not.toMatch(/formspree/i)
    expect(form.how_to_submit).toContain("user's authorization")
  })
})

describe('dated case-study metrics', () => {
  it('drops the relative period and carries the source window', () => {
    for (const study of CASE_STUDIES) {
      for (const metric of study.structured?.results ?? []) {
        expect(undatedMetricLabel(metric)).not.toMatch(/latest/i)
        const summary = datedMetricSummary(metric)
        expect(summary).not.toMatch(/latest/i)
        if (metric.dateRange) expect(summary).toContain(metric.dateRange)
      }
    }
  })

  it('reaches the site-wide Organization abstract', () => {
    const { container } = render(<GlobalSchemaGraph />)
    const organization = jsonLdNodes(container).find(
      (node) => node['@type'] === 'Organization',
    )
    const wong = organization.subjectOf.find((item: { url: string }) =>
      item.url.endsWith('/dr-christopher-wong'),
    )
    expect(wong.abstract).toBe(
      '+49% Google Search impressions, year over year (Google Search Console: Jul 5-Oct 2, 2025 vs Jul 5-Oct 2, 2026).',
    )
  })
})

describe('blog authors', () => {
  it.each(['Enzo Sison', 'enzo sison', 'Enzo', 'Enzo from Prism'])(
    'links %s to the founder entity',
    (name) => {
      expect(resolveBlogAuthor(name)).toEqual({ kind: 'founder', name: 'Enzo Sison' })
      const { container } = render(
        <BlogPostSchema
          title="t"
          description="d"
          url="https://www.design-prism.com/blog/x"
          authorName={name}
        />,
      )
      const post = jsonLdNodes(container)[0]
      expect(post.author).toEqual({
        '@type': 'Person',
        '@id': 'https://www.design-prism.com/#founder',
        name: 'Enzo Sison',
        url: 'https://www.design-prism.com/about',
      })
    },
  )

  it('credits Prism Team to the organization and keeps other people', () => {
    expect(resolveBlogAuthor('Prism Team')).toEqual({ kind: 'organization', name: 'Prism' })
    expect(resolveBlogAuthor(undefined, '')).toEqual({ kind: 'organization', name: 'Prism' })
    expect(resolveBlogAuthor('Gwen Smith')).toEqual({ kind: 'person', name: 'Gwen Smith' })
    expect(resolveBlogAuthor(undefined, 'Enzo from Prism').kind).toBe('founder')
  })
})

describe('blog video structured data', () => {
  it('covers every registered video in an indexable post that lacks its own schema', () => {
    const blogDir = path.join(process.cwd(), 'content/blog')
    const found = new Set<string>()
    for (const file of fs.readdirSync(blogDir)) {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf8')
      for (const video of getBlogPostVideos(content)) found.add(video.id)
    }
    expect([...found].sort()).toEqual(BLOG_VIDEOS.map((video) => video.id).sort())
  })

  it('skips posts that already declare a VideoObjectSchema', () => {
    expect(
      getBlogPostVideos('<YouTubeVideoEmbed videoId="0a-o9DZumjE" />\n<VideoObjectSchema videoId="0a-o9DZumjE" />'),
    ).toEqual([])
    expect(getBlogPostVideos('<YouTubeVideoEmbed videoId="0a-o9DZumjE" />')).toHaveLength(1)
  })
})

describe('blog feed alternate', () => {
  it('is advertised on helper-built routes, indexable or not', () => {
    for (const routePath of ['/aeo', '/refer']) {
      const metadata = buildRouteMetadata({
        titleStem: 'Test',
        description: 'A test page description that is long enough.',
        path: routePath,
      })
      expect(metadata.alternates?.types?.['application/rss+xml']).toEqual([
        BLOG_FEED_ALTERNATE,
      ])
    }
  })
})
