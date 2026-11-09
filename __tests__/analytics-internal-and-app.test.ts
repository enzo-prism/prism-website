/** @jest-environment jsdom */
import { GET } from '@/app/app/get/route'
import { detectAiCrawler, formatAiCrawlerLog } from '@/lib/ai-crawlers'
import {
  INTERNAL_TRAFFIC_STORAGE_KEY,
  isInternalTraffic,
} from '@/lib/internal-traffic'
import { PRISM_APP_QR_URL, PRISM_APP_STORE_URL } from '@/lib/prism-app'
import { buildVercelCustomEvent } from '@/lib/vercel-analytics'

jest.mock('@vercel/analytics/server', () => ({ track: jest.fn() }))
jest.mock('next/server', () => {
  const actual = jest.requireActual('next/server')
  return { ...actual, after: jest.fn() }
})

function visit(search: string) {
  window.history.replaceState({}, '', `/${search}`)
}

describe('internal traffic opt-out', () => {
  beforeEach(() => {
    window.localStorage.clear()
    visit('')
  })

  it('reports by default', () => {
    expect(isInternalTraffic()).toBe(false)
  })

  it('marks the browser with ?internal=1 and remembers it', () => {
    visit('?internal=1')
    expect(isInternalTraffic()).toBe(true)
    visit('')
    expect(isInternalTraffic()).toBe(true)
    expect(window.localStorage.getItem(INTERNAL_TRAFFIC_STORAGE_KEY)).toBe('1')
  })

  it('clears the mark with ?internal=0', () => {
    window.localStorage.setItem(INTERNAL_TRAFFIC_STORAGE_KEY, '1')
    visit('?internal=0')
    expect(isInternalTraffic()).toBe(false)
    visit('')
    expect(isInternalTraffic()).toBe(false)
  })

  it('ignores other values', () => {
    visit('?internal=yes')
    expect(isInternalTraffic()).toBe(false)
  })
})

describe('ai crawler detection', () => {
  it('names the answer-engine crawlers robots.txt allows', () => {
    expect(
      detectAiCrawler(
        'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)',
      ),
    ).toBe('GPTBot')
    expect(detectAiCrawler('Mozilla/5.0 (compatible; ClaudeBot/1.0)')).toBe(
      'ClaudeBot',
    )
    expect(detectAiCrawler('PerplexityBot/1.0')).toBe('PerplexityBot')
    expect(detectAiCrawler('Mozilla/5.0 ChatGPT-User/1.0')).toBe('ChatGPT-User')
  })

  it('leaves people and ordinary search crawlers alone', () => {
    expect(detectAiCrawler(null)).toBeNull()
    expect(
      detectAiCrawler(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Safari/604.1',
      ),
    ).toBeNull()
    expect(detectAiCrawler('Googlebot/2.1')).toBeNull()
  })

  it('logs the path only', () => {
    expect(JSON.parse(formatAiCrawlerLog('GPTBot', '/aeo'))).toEqual({
      event: 'ai_crawler_visit',
      bot: 'GPTBot',
      path: '/aeo',
    })
  })
})

describe('/app measurement', () => {
  it('maps the install click and bounded demo events for Vercel', () => {
    expect(
      buildVercelCustomEvent('app_store_click', {
        cta_location: 'prism app hero',
      }),
    ).toEqual({
      name: 'App Store Clicked',
      properties: { cta_location: 'prism app hero' },
    })
    expect(
      buildVercelCustomEvent('app_demo_screen_select', {
        demo_screen: 'visits',
        select_method: 'tab',
      }),
    ).toEqual({
      name: 'App Demo Screen Selected',
      properties: { demo_screen: 'visits', select_method: 'tab' },
    })
    expect(
      buildVercelCustomEvent('app_demo_screen_select', {
        demo_screen: 'made-up',
        select_method: 'tab',
      })?.properties,
    ).toEqual({ select_method: 'tab' })
  })

  it('sends a QR scan on to the App Store without being indexed', () => {
    expect(PRISM_APP_QR_URL).toBe('https://www.design-prism.com/app/get')
    const response = GET(
      new Request(PRISM_APP_QR_URL) as unknown as Parameters<typeof GET>[0],
    )
    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe(PRISM_APP_STORE_URL)
    expect(response.headers.get('x-robots-tag')).toContain('noindex')
  })
})
