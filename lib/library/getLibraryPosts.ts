import { libraryEditorial } from "@/content/library/editorial"
import { librarySeedPosts } from "@/content/library/seed"
import type { LibraryPost, LibraryPlatform, LibrarySeedPost } from "@/lib/library/types"
import { buildLibrarySlug, buildTitleFromCaption, isCurated } from "@/lib/library/utils"

const REVALIDATE_SECONDS = 60 * 60

type LibraryPostInput = Omit<LibraryPost, "slug" | "curated" | "editorial">

type InstagramMediaItem = {
  id?: string
  caption?: string
  media_type?: string
  media_url?: string
  thumbnail_url?: string
  permalink?: string
  timestamp?: string
}

type TikTokVideoItem = {
  id?: string
  title?: string
  description?: string
  create_time?: number | string
  share_url?: string
  cover_image_url?: string
  duration?: number | string
}

const mapSeedToInput = (post: LibrarySeedPost): LibraryPostInput => post

const attachEditorial = (post: LibraryPostInput): LibraryPost => {
  const key = `${post.platform}:${post.id}`
  const editorial = libraryEditorial[key]
  return {
    ...post,
    slug: buildLibrarySlug(post.platform, post.id),
    editorial,
    curated: isCurated(editorial),
  }
}

const normalizeInstagramPost = (item: InstagramMediaItem): LibraryPostInput | null => {
  if (!item.id || !item.permalink) return null
  const mediaType = item.media_type?.toUpperCase() ?? ""
  if (mediaType && !["VIDEO", "REEL", "IGTV"].includes(mediaType)) return null

  const caption = item.caption?.trim() || null
  const title = buildTitleFromCaption(caption)
  const publishedAt = item.timestamp ? new Date(item.timestamp).toISOString() : new Date().toISOString()

  return {
    id: item.id,
    platform: "instagram",
    permalink: item.permalink,
    title,
    caption,
    publishedAt,
    thumbnailUrl: item.thumbnail_url ?? item.media_url ?? null,
    durationSeconds: null,
  }
}

const normalizeTikTokPost = (item: TikTokVideoItem): LibraryPostInput | null => {
  if (!item.id) return null
  const rawTitle = item.title?.trim() ?? ""
  const caption = item.description?.trim() || rawTitle || null
  const title = rawTitle || buildTitleFromCaption(caption)
  const created =
    typeof item.create_time === "number"
      ? new Date(item.create_time * 1000)
      : item.create_time
      ? new Date(Number(item.create_time) * 1000)
      : null
  const permalink = item.share_url ?? `https://www.tiktok.com/@the_design_prism/video/${item.id}`

  return {
    id: item.id,
    platform: "tiktok",
    permalink,
    title: title || "Prism Library short",
    caption,
    publishedAt: created ? created.toISOString() : new Date().toISOString(),
    thumbnailUrl: item.cover_image_url ?? null,
    durationSeconds: item.duration ? Number(item.duration) : null,
  }
}

const fetchInstagramPosts = async (accessToken: string, userId: string): Promise<LibraryPostInput[]> => {
  const params = new URLSearchParams({
    fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
    access_token: accessToken,
  })
  const url = `https://graph.instagram.com/${userId}/media?${params.toString()}`
  const response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } })
  if (!response.ok) {
    throw new Error(`Instagram API error: ${response.status}`)
  }
  const payload = (await response.json()) as { data?: InstagramMediaItem[] }
  return (payload.data ?? []).map(normalizeInstagramPost).filter(Boolean) as LibraryPostInput[]
}

const fetchTikTokPosts = async (accessToken: string): Promise<LibraryPostInput[]> => {
  const params = new URLSearchParams({
    fields: "id,title,description,create_time,share_url,cover_image_url,duration",
  })
  const url = `https://open.tiktokapis.com/v2/video/list/?${params.toString()}`
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    next: { revalidate: REVALIDATE_SECONDS },
  })
  if (!response.ok) {
    throw new Error(`TikTok API error: ${response.status}`)
  }
  const payload = (await response.json()) as {
    data?: { videos?: TikTokVideoItem[]; video_list?: TikTokVideoItem[] }
  }
  const items = payload.data?.videos ?? payload.data?.video_list ?? []
  return items.map(normalizeTikTokPost).filter(Boolean) as LibraryPostInput[]
}

const sortPostsByDate = (posts: LibraryPostInput[]) =>
  [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

export async function getLibraryPosts(): Promise<LibraryPost[]> {
  const instagramToken = process.env.INSTAGRAM_ACCESS_TOKEN?.trim()
  const instagramUserId = process.env.INSTAGRAM_USER_ID?.trim()
  const tiktokToken = process.env.TIKTOK_ACCESS_TOKEN?.trim()

  const tasks: Array<Promise<LibraryPostInput[]>> = []
  if (instagramToken && instagramUserId) {
    tasks.push(fetchInstagramPosts(instagramToken, instagramUserId))
  }
  if (tiktokToken) {
    tasks.push(fetchTikTokPosts(tiktokToken))
  }

  let posts: LibraryPostInput[] = []
  if (tasks.length > 0) {
    const results = await Promise.allSettled(tasks)
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        posts = posts.concat(result.value)
      }
    })
  }

  if (posts.length === 0) {
    posts = librarySeedPosts.map(mapSeedToInput)
  }

  const normalized = sortPostsByDate(posts)
  return normalized.map(attachEditorial)
}

export const buildLibraryKey = (platform: LibraryPlatform, id: string) => `${platform}:${id}`
