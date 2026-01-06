import type { LibraryPost } from "@/lib/library/types"

const getDayOfYearUtc = (date: Date) => {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0)
  const diff = date.getTime() - start
  return Math.floor(diff / 86400000)
}

const getWeight = (post: LibraryPost) =>
  Math.max(1, Math.floor(post.editorial?.featuredWeight ?? 1))

export const getFeaturedPost = (posts: LibraryPost[], dateNowUtc = new Date()): LibraryPost | null => {
  if (!posts.length) return null

  const curated = posts.filter((post) => post.curated)
  if (curated.length > 0) {
    const ordered = [...curated].sort((a, b) => {
      const weightDiff = getWeight(b) - getWeight(a)
      if (weightDiff !== 0) return weightDiff
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })

    const weighted = ordered.flatMap((post) => Array.from({ length: getWeight(post) }, () => post))
    const dayIndex = getDayOfYearUtc(dateNowUtc) % weighted.length
    return weighted[dayIndex] ?? ordered[0]
  }

  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )[0]
}
