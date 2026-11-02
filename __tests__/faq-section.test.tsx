import { renderToStaticMarkup } from 'react-dom/server'

import FAQSection from '@/components/faq-section'

describe('FAQSection', () => {
  it('server-renders closed answers so they match the FAQPage schema', () => {
    const markup = renderToStaticMarkup(
      <FAQSection
        items={[
          { question: 'First question?', answer: 'First visible answer.' },
          { question: 'Second question?', answer: 'Second visible answer.' },
        ]}
      />,
    )

    const html = markup.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      '',
    )

    expect(html).toContain('First visible answer.')
    expect(html).toContain('Second visible answer.')
    expect(html).toMatch(/data-state="closed"[^>]*role="region"|role="region"[^>]*data-state="closed"/)
  })
})
