/**
 * Answer-engine crawlers, matched on the user agent. The names mirror the
 * crawlers robots.txt explicitly allows, so the request log shows which pages
 * the assistants Prism optimizes for actually fetch.
 */
const AI_CRAWLERS: ReadonlyArray<readonly [token: string, name: string]> = [
  ['oai-searchbot', 'OAI-SearchBot'],
  ['chatgpt-user', 'ChatGPT-User'],
  ['gptbot', 'GPTBot'],
  ['claude-searchbot', 'Claude-SearchBot'],
  ['claude-user', 'Claude-User'],
  ['claudebot', 'ClaudeBot'],
  ['claude-web', 'Claude-Web'],
  ['anthropic-ai', 'anthropic-ai'],
  ['perplexity-user', 'Perplexity-User'],
  ['perplexitybot', 'PerplexityBot'],
  ['google-extended', 'Google-Extended'],
  ['applebot-extended', 'Applebot-Extended'],
  ['ccbot', 'CCBot'],
]

/** The crawler's name, or null for everything else. */
export function detectAiCrawler(userAgent: string | null | undefined) {
  if (!userAgent) return null
  const lower = userAgent.toLowerCase()
  for (const [token, name] of AI_CRAWLERS) {
    if (lower.includes(token)) return name
  }
  return null
}

/**
 * One structured line per crawler request, for Vercel's runtime logs
 * (filter on `ai_crawler_visit`). Path only: no query string, no IP.
 */
export function formatAiCrawlerLog(bot: string, pathname: string) {
  return JSON.stringify({
    event: 'ai_crawler_visit',
    bot,
    path: pathname.slice(0, 200),
  })
}
