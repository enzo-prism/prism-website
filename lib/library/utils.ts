import type { LibraryEditorial, LibraryPlatform } from "@/lib/library/types"

export const buildLibrarySlug = (platform: LibraryPlatform, id: string) =>
  `${platform}-${id}`

export const isCurated = (editorial?: LibraryEditorial) =>
  Boolean(editorial?.speaker?.name && editorial?.takeaways?.length)

export const buildTitleFromCaption = (caption?: string | null) => {
  if (!caption) return "Prism Library short"
  const firstLine = caption.split("\n").find((line) => line.trim().length > 0)
  const raw = (firstLine ?? caption).trim()
  if (!raw) return "Prism Library short"
  return raw.length > 80 ? `${raw.slice(0, 77)}...` : raw
}

export const buildInstagramEmbedUrl = (permalink: string) => {
  if (!permalink) return null
  const normalized = permalink.endsWith("/") ? permalink : `${permalink}/`
  return `${normalized}embed/`
}
