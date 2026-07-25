import { renderToStaticMarkup } from 'react-dom/server'

import FAQSection from '@/components/faq-section'
import { WebPageSchema } from '@/components/schema-markup'

describe('JSON-LD safety', () => {
  it('escapes markup-breaking characters in external text', () => {
    const payload = '</script><script>alert("xss")</script>'
    const markup = renderToStaticMarkup(
      <WebPageSchema
        name={payload}
        description="External caption"
        url="https://www.design-prism.com/library/test"
      />,
    )

    expect(markup).not.toContain(payload)
    expect(markup).toContain('\\u003c/script\\u003e')
  })

  it('escapes markup-breaking characters in FAQ schema', () => {
    const payload = '</script><script>alert("xss")</script>'
    const markup = renderToStaticMarkup(
      <FAQSection
        items={[{ question: payload, answer: 'Safe visible answer' }]}
      />,
    )

    const jsonLd = markup.match(
      /<script type="application\/ld\+json">(.+?)<\/script>/,
    )?.[1]

    expect(jsonLd).toBeDefined()
    expect(jsonLd).not.toContain(payload)
    expect(jsonLd).toContain('\\u003c/script\\u003e')
  })
})
