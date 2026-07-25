const TIKTOK_HOSTS = new Set(['tiktok.com', 'www.tiktok.com'])

export function getTikTokVideoId(permalink: string) {
  try {
    const url = new URL(permalink)
    if (url.protocol !== 'https:' || !TIKTOK_HOSTS.has(url.hostname)) {
      return null
    }

    return url.pathname.match(/\/video\/(\d+)(?:\/|$)/)?.[1] ?? null
  } catch {
    return null
  }
}
