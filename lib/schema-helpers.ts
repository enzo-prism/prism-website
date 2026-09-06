export const sanitizeReviewText = (text: string) =>
  text.replace(/\*\*/g, '').replace(/[`_]/g, '').replace(/\s+/g, ' ').trim()

/** Resolve entity fragments with URL semantics, including an existing fragment. */
export function schemaEntityId(url: string, fragment: string): string {
  const entityUrl = new URL(url)
  entityUrl.hash = fragment
  return entityUrl.href
}

/** primaryImageOfPage requires ImageObject, unlike the general image property. */
export function schemaImage(image?: string | string[]) {
  if (!image) return undefined
  const toImage = (url: string) => ({ '@type': 'ImageObject', url })
  return Array.isArray(image) ? image.map(toImage) : toImage(image)
}

/** A player/watch page is not the media bytes Google expects in contentUrl. */
export function videoContentUrl(url?: string): string | undefined {
  if (!url) return undefined
  try {
    const { hostname } = new URL(url)
    if (
      /(^|\.)(youtube\.com|youtube-nocookie\.com|youtu\.be|vimeo\.com)$/.test(
        hostname,
      )
    ) {
      return undefined
    }
    return url
  } catch {
    return undefined
  }
}
