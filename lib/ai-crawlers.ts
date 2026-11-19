/**
 * Crawlers worth logging, matched on the user agent, so the request log shows
 * which pages the engines Prism optimizes for actually fetch.
 *
 * - `answer`: crawlers and live fetchers run by AI assistants (ChatGPT,
 *   Claude, Perplexity, Meta AI, Alexa, DuckDuckGo's assistant, Le Chat).
 * - `search`: the search crawlers behind AI answers that have no separate
 *   bot: Googlebot feeds AI Overviews, AI Mode, and Gemini; Bingbot feeds
 *   Copilot; Applebot feeds Siri and Spotlight.
 *
 * Google-Extended and Applebot-Extended are robots.txt tokens, not user
 * agents (Google and Apple crawl with Googlebot and Applebot), so they are
 * allowed in app/robots.ts but never appear here. Order matters: the more
 * specific token comes first.
 */
export type CrawlerKind = 'answer' | 'search'

const CRAWLERS: ReadonlyArray<
  readonly [token: string, name: string, kind: CrawlerKind]
> = [
  ['oai-searchbot', 'OAI-SearchBot', 'answer'],
  ['chatgpt-user', 'ChatGPT-User', 'answer'],
  ['gptbot', 'GPTBot', 'answer'],
  ['claude-searchbot', 'Claude-SearchBot', 'answer'],
  ['claude-user', 'Claude-User', 'answer'],
  ['claudebot', 'ClaudeBot', 'answer'],
  ['claude-web', 'Claude-Web', 'answer'],
  ['anthropic-ai', 'anthropic-ai', 'answer'],
  ['perplexity-user', 'Perplexity-User', 'answer'],
  ['perplexitybot', 'PerplexityBot', 'answer'],
  ['meta-externalfetcher', 'Meta-ExternalFetcher', 'answer'],
  ['meta-externalagent', 'Meta-ExternalAgent', 'answer'],
  ['duckassistbot', 'DuckAssistBot', 'answer'],
  ['mistralai-user', 'MistralAI-User', 'answer'],
  ['amazonbot', 'Amazonbot', 'answer'],
  ['ccbot', 'CCBot', 'answer'],
  ['googlebot', 'Googlebot', 'search'],
  ['bingbot', 'Bingbot', 'search'],
  ['applebot', 'Applebot', 'search'],
]

export type DetectedCrawler = { name: string; kind: CrawlerKind }

/** The crawler's name and kind, or null for everything else. */
export function detectCrawler(
  userAgent: string | null | undefined,
): DetectedCrawler | null {
  if (!userAgent) return null
  const lower = userAgent.toLowerCase()
  for (const [token, name, kind] of CRAWLERS) {
    if (lower.includes(token)) return { name, kind }
  }
  return null
}

/** The answer-engine crawler's name, or null (search crawlers included). */
export function detectAiCrawler(userAgent: string | null | undefined) {
  const crawler = detectCrawler(userAgent)
  return crawler?.kind === 'answer' ? crawler.name : null
}

/**
 * One structured line per crawler request, for Vercel's runtime logs
 * (filter on `crawler_visit`, or `ai_crawler_visit` for answer engines
 * only). Path only: no query string, no IP.
 */
export function formatCrawlerLog(crawler: DetectedCrawler, pathname: string) {
  return JSON.stringify({
    event: crawler.kind === 'answer' ? 'ai_crawler_visit' : 'search_crawler_visit',
    bot: crawler.name,
    path: pathname.slice(0, 200),
  })
}

/** Kept for callers that already know the bot is an answer engine. */
export function formatAiCrawlerLog(bot: string, pathname: string) {
  return formatCrawlerLog({ name: bot, kind: 'answer' }, pathname)
}
