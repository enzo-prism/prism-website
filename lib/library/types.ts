export type LibraryPlatform = "instagram" | "tiktok"

export type SpeakerType = "founder" | "athlete"

export type LibrarySpeaker = {
  name: string
  type: SpeakerType
  subtitle?: string
  bioShort?: string
  links?: { label: string; url: string }[]
}

export type LibraryEditorial = {
  speaker: LibrarySpeaker
  takeaways: string[]
  tags: string[]
  group: string
  featuredWeight?: number
}

export type LibraryPost = {
  id: string
  slug: string
  platform: LibraryPlatform
  permalink: string
  title: string
  caption: string | null
  publishedAt: string
  thumbnailUrl: string | null
  durationSeconds?: number | null
  curated: boolean
  editorial?: LibraryEditorial
}

export type LibrarySeedPost = Omit<LibraryPost, "slug" | "curated" | "editorial">
