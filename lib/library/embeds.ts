const stripScriptTags = (html: string) =>
  html.replace(/<script[\s\S]*?<\/script>/gi, "").trim()

export const getTikTokEmbedHtml = async (permalink: string) => {
  try {
    const url = `https://www.tiktok.com/oembed?url=${encodeURIComponent(permalink)}`
    const response = await fetch(url, { next: { revalidate: 60 * 60 } })
    if (!response.ok) return null
    const payload = (await response.json()) as { html?: string }
    if (!payload.html) return null
    return stripScriptTags(payload.html)
  } catch {
    return null
  }
}
