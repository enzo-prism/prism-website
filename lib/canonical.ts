const CANONICAL_HOST = "www.design-prism.com"

export function canonicalUrl(pathOrUrl: string): string {
  try {
    const url = new URL(pathOrUrl, `https://${CANONICAL_HOST}`)
    url.hostname = CANONICAL_HOST
    url.protocol = "https:"
    return url.toString()
  } catch {
    return `https://${CANONICAL_HOST}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`
  }
}
