import robots from '@/app/robots'

describe('robots', () => {
  it('allows /api/og/ and the LLM markdown endpoint while disallowing other /api/ routes', () => {
    const result = robots()
    expect(result.rules).toBeTruthy()

    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    const wildcard = rules.find((rule) => rule.userAgent === '*')
    expect(wildcard).toMatchObject({
      userAgent: '*',
      allow: ['/api/og/', '/api/blog/'],
      disallow: ['/api/'],
    })
    expect(result.sitemap).toBe('https://www.design-prism.com/sitemap.xml')
    expect(result.host).toBeUndefined()
  })

  it('explicitly welcomes AI answer-engine crawlers', () => {
    const result = robots()
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    const aiRule = rules.find(
      (rule) =>
        Array.isArray(rule.userAgent) && rule.userAgent.includes('GPTBot'),
    )
    expect(aiRule).toBeTruthy()
    const agents = aiRule?.userAgent as string[]
    expect(agents).toEqual(
      expect.arrayContaining([
        'GPTBot',
        'OAI-SearchBot',
        'ClaudeBot',
        'PerplexityBot',
        'Google-Extended',
      ]),
    )
    expect(aiRule).toMatchObject({ disallow: ['/api/'] })
  })
})
