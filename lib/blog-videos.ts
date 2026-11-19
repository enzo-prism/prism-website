/**
 * YouTube videos embedded in indexable blog posts that do not declare their
 * own `<VideoObjectSchema>` in MDX. The blog template emits VideoObject
 * structured data for each one it finds in a post, so search and AI engines
 * can tie the video (and its creator) to the article.
 *
 * Facts come from YouTube itself (oEmbed title and channel, the watch page's
 * publish date), checked 2026-11-18. Third-party videos keep their real
 * channel as creator; only the design prism channel is credited to Prism.
 * `Mst4hreQYl0` (generate-thousands-leads-without-more-ads) is left out: the
 * watch page asks for a sign-in, so its title and date could not be checked.
 */

export type BlogVideo = {
  id: string
  title: string
  /** YouTube channel name. */
  channel: string
  /** True for Prism's own channel (design prism). */
  ownedByPrism: boolean
  /** Person or organization behind a third-party channel. */
  creatorType: 'Person' | 'Organization'
  /** Publish date shown on YouTube (ISO date). */
  uploadDate: string
}

export const BLOG_VIDEOS: readonly BlogVideo[] = [
  { id: '_hei2C4164Q', title: 'appear in ai search', channel: 'design prism', ownedByPrism: true, creatorType: 'Organization', uploadDate: '2025-06-05' },
  { id: 'S_Ol7aMNOeU', title: 'AI Agents Ran My TikTok: 1.2M Views', channel: 'design prism', ownedByPrism: true, creatorType: 'Organization', uploadDate: '2026-09-25' },
  { id: 'nC4OWxh_Vvk', title: 'sell the install', channel: 'design prism', ownedByPrism: true, creatorType: 'Organization', uploadDate: '2025-08-10' },
  { id: 'OJBEk6UQ1Js', title: 'transform your seo results in 2026', channel: 'design prism', ownedByPrism: true, creatorType: 'Organization', uploadDate: '2025-12-08' },
  { id: 'cK7Su8MlxLw', title: 'ai growth marketing - cursor, codex, claude opus 4 MAX', channel: 'design prism', ownedByPrism: true, creatorType: 'Organization', uploadDate: '2025-06-10' },
  { id: 'gWNFna6fgS8', title: "How Claude Code Ranked Me FIRST on Google (It's OVER for SEO Agencies)", channel: 'Greg Isenberg', ownedByPrism: false, creatorType: 'Person', uploadDate: '2025-08-04' },
  { id: 'IwQYVQ3MohE', title: 'AI Broke the Web: The 7 New Rules of the Game + Why YOU Have an Edge vs Big Companies', channel: 'AI News & Strategy Daily | Nate B Jones', ownedByPrism: false, creatorType: 'Organization', uploadDate: '2025-10-31' },
  { id: '0a-o9DZumjE', title: '$30B Founder: SEO is Dead.. Do This Instead', channel: 'My First Million', ownedByPrism: false, creatorType: 'Organization', uploadDate: '2025-09-15' },
  { id: 'KNTY8yYKNAI', title: 'anyone can be rich with this system', channel: 'design prism', ownedByPrism: true, creatorType: 'Organization', uploadDate: '2025-07-22' },
  { id: 'huJDr7iw6fw', title: 'Founders: The AI SEO Flywheel We Use to Rank on Google', channel: 'design prism', ownedByPrism: true, creatorType: 'Organization', uploadDate: '2025-12-04' },
]

const BLOG_VIDEO_BY_ID = new Map(BLOG_VIDEOS.map((video) => [video.id, video]))

/** IDs of YouTube videos a post's MDX embeds or links to. */
function youTubeIdsIn(content: string): string[] {
  const ids = new Set<string>()
  const patterns = [
    /videoId=["']([A-Za-z0-9_-]{11})["']/g,
    /youtu(?:\.be\/|be\.com\/(?:embed\/|watch\?v=))([A-Za-z0-9_-]{11})/g,
  ]
  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) ids.add(match[1])
  }
  return [...ids]
}

/**
 * Registered videos embedded in this post's MDX, minus any the post already
 * describes with its own `<VideoObjectSchema>` (so no video is declared twice).
 */
export function getBlogPostVideos(content: string): BlogVideo[] {
  if (/<VideoObjectSchema\b/.test(content)) return []
  return youTubeIdsIn(content)
    .map((id) => BLOG_VIDEO_BY_ID.get(id))
    .filter((video): video is BlogVideo => Boolean(video))
}
