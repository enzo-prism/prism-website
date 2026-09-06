import { render } from '@testing-library/react'

import {
  BlogPostSchema,
  PersonSchema,
  CaseStudySchema,
  CollectionPageSchema,
  VideoObjectSchema,
  WebPageSchema,
} from '@/components/schema-markup'

function readSchema(component: React.ReactElement) {
  const { container } = render(component)
  return JSON.parse(container.querySelector('script')?.textContent || '{}')
}

describe('structured data entity relationships', () => {
  it('distinguishes the publisher from a person when crediting articles', () => {
    const article = readSchema(
      <BlogPostSchema
        title="Example"
        description="Example"
        url="https://www.design-prism.com/blog/example"
      />,
    )
    expect(article.author).toEqual({
      '@type': 'Organization',
      '@id': 'https://www.design-prism.com/#organization',
      name: 'Prism',
    })
  })

  it('identifies Enzo consistently across expert pages and authored articles', () => {
    const person = readSchema(
      <PersonSchema
        personId="enzo-sison"
        name="Enzo Sison"
        jobTitle="Founder"
        description="Prism founder"
        image="https://www.design-prism.com/enzo-avatar.png"
        url="https://www.design-prism.com/dental-practice-seo-expert"
      />,
    )
    const article = readSchema(
      <BlogPostSchema
        title="Example"
        description="Example"
        url="https://www.design-prism.com/blog/example"
        authorName="Enzo Sison"
      />,
    )
    expect(person['@id']).toBe('https://www.design-prism.com/#founder')
    expect(article.author['@id']).toBe(person['@id'])
    expect(article.author['@type']).toBe('Person')
  })

  it('connects pages to the site and represents their main images as ImageObjects', () => {
    const page = readSchema(
      <WebPageSchema
        name="Prism"
        url="https://www.design-prism.com/about"
        image="https://www.design-prism.com/prism-logo.jpeg"
      />,
    )
    expect(page.primaryImageOfPage).toEqual({
      '@type': 'ImageObject',
      url: 'https://www.design-prism.com/prism-logo.jpeg',
    })
    expect(page.isPartOf).toEqual({
      '@id': 'https://www.design-prism.com/#website',
    })
    const collection = readSchema(
      <CollectionPageSchema
        name="Case studies"
        url="https://www.design-prism.com/case-studies"
      />,
    )
    expect(collection.isPartOf).toEqual(page.isPartOf)
  })

  it.each(['https://www.design-prism.com', 'https://www.design-prism.com/'])(
    'merges case study publishers using the canonical organization ID from %s',
    (organizationUrl) => {
      const nodes = readSchema(
        <CaseStudySchema
          title="Client case study"
          description="Verified work."
          url="https://www.design-prism.com/case-studies/example"
          organization={{ name: 'Prism', url: organizationUrl }}
        />,
      )
      const article = nodes.find((node: any) => node['@type'] === 'Article')
      const page = nodes.find((node: any) => node['@type'] === 'WebPage')
      expect(article.publisher).toEqual({
        '@id': 'https://www.design-prism.com/#organization',
      })
      expect(article.mainEntityOfPage).toEqual({ '@id': page['@id'] })
      expect(page.mainEntity).toEqual({ '@id': article['@id'] })
    },
  )

  it('does not pretend an embedded video player is a downloadable media file', () => {
    const video = readSchema(
      <VideoObjectSchema
        videoId="example"
        name="Example interview"
        description="An interview."
        thumbnailUrl="https://example.com/image.jpg"
        uploadDate="2026-08-01"
        embedUrl="https://www.youtube.com/embed/example"
      />,
    )
    expect(video.embedUrl).toBe('https://www.youtube.com/embed/example')
    expect(video.contentUrl).toBeUndefined()
  })

  it('retains a real video file when it is supplied', () => {
    const video = readSchema(
      <VideoObjectSchema
        videoId="example"
        name="Example interview"
        description="An interview."
        thumbnailUrl="https://example.com/image.jpg"
        uploadDate="2026-08-01"
        contentUrl="https://example.com/interview.mp4"
      />,
    )
    expect(video.contentUrl).toBe('https://example.com/interview.mp4')
  })
})
