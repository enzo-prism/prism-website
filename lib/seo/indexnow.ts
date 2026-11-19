/**
 * IndexNow tells Bing (and the engines that share its index, including
 * Copilot and other Bing-backed answer engines) which URLs changed, so they
 * re-crawl them soon after a deploy instead of on their own schedule.
 *
 * The key is public by design: IndexNow proves site ownership by fetching
 * `https://www.design-prism.com/<key>.txt`, which must contain the key.
 * `scripts/indexnow-ping.ts` runs after the production deploy in
 * `.github/workflows/deploy.yml` and submits only pages whose source changed
 * in the pushed commits and that the live sitemap lists (so nothing noindex
 * or redirected is ever submitted).
 *
 * No imports: the ping script runs this file directly under Node.
 */

export const INDEXNOW_KEY = 'e248a1f37f029fea13cd4b58e76abdf8'
export const INDEXNOW_HOST = 'www.design-prism.com'
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`

/** IndexNow accepts up to 10,000 URLs per request. */
export const INDEXNOW_MAX_URLS = 10_000

const CASE_STUDY_SOURCES = [
  /^lib\/case-study-data\.ts$/,
  /^components\/case-study-minimal\.tsx$/,
  /^components\/case-studies\//,
]

/**
 * Site paths whose page source changed. Only files that map to specific
 * pages count: shared layout, styles, or components used site-wide are
 * skipped on purpose, so a header tweak does not resubmit every URL.
 */
export function changedFilesToPaths(files: readonly string[]): Set<string> {
  const paths = new Set<string>()

  for (const file of files) {
    const blog = file.match(/^content\/blog\/([a-z0-9-]+)\.mdx?$/)
    if (blog) {
      paths.add(`/blog/${blog[1]}`)
      continue
    }

    if (CASE_STUDY_SOURCES.some((pattern) => pattern.test(file))) {
      paths.add('/case-studies/*')
      continue
    }

    if (/^components\/home\//.test(file)) {
      paths.add('/')
      continue
    }

    const app = file.match(/^app\/(.+)\/[^/]+\.(?:tsx|ts|mdx)$/)
    if (app) {
      const segments = app[1]
        .split('/')
        .filter((segment) => !/^\(.*\)$/.test(segment))
      // Dynamic routes ([slug]) map to many pages; their content changes
      // arrive through the data files handled above.
      if (segments.some((segment) => segment.startsWith('[') || segment.startsWith('_'))) {
        continue
      }
      if (segments[0] === 'api') continue
      paths.add(`/${segments.join('/')}`)
      continue
    }

    if (/^app\/(?:page|client-page)\.tsx$/.test(file)) {
      paths.add('/')
    }
  }

  return paths
}

/** `<loc>` URLs from a sitemap.xml document. */
export function parseSitemapUrls(xml: string): string[] {
  return Array.from(xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g), (match) => match[1])
}

/**
 * The sitemap URLs to submit for a set of changed paths. A path that is not
 * in the sitemap (noindex, redirected, utility) is never submitted.
 */
export function selectIndexNowUrls(
  changedPaths: Set<string>,
  sitemapUrls: readonly string[],
): string[] {
  const urls = sitemapUrls.filter((url) => {
    let pathname: string
    try {
      pathname = new URL(url).pathname.replace(/\/+$/, '') || '/'
    } catch {
      return false
    }
    if (changedPaths.has(pathname)) return true
    return (
      changedPaths.has('/case-studies/*') &&
      (pathname === '/case-studies' || pathname.startsWith('/case-studies/'))
    )
  })
  return [...new Set(urls)].slice(0, INDEXNOW_MAX_URLS)
}
