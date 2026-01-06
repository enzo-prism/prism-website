import { getFeaturedPost } from "../lib/library/featured"
import type { LibraryPost } from "../lib/library/types"

const makePost = (overrides: Partial<LibraryPost>): LibraryPost => ({
  id: "1",
  slug: "instagram-1",
  platform: "instagram",
  permalink: "https://www.instagram.com/reel/example/",
  title: "Example",
  caption: null,
  publishedAt: "2025-01-02T00:00:00Z",
  thumbnailUrl: null,
  durationSeconds: null,
  curated: false,
  editorial: undefined,
  ...overrides,
})

describe("getFeaturedPost", () => {
  test("prefers curated posts when available", () => {
    const curated = makePost({
      id: "2",
      slug: "instagram-2",
      curated: true,
      editorial: {
        speaker: { name: "Ada Lovelace", type: "founder" },
        takeaways: ["Ship the work."],
        tags: ["discipline"],
        group: "Founder Lessons",
      },
    })
    const uncurated = makePost({ id: "3", slug: "tiktok-3", curated: false })

    const featured = getFeaturedPost([uncurated, curated], new Date(Date.UTC(2025, 0, 1)))
    expect(featured?.id).toBe("2")
  })

  test("rotates deterministically by UTC day", () => {
    const first = makePost({
      id: "a",
      slug: "instagram-a",
      publishedAt: "2025-01-03T00:00:00Z",
      curated: true,
      editorial: {
        speaker: { name: "Speaker A", type: "founder" },
        takeaways: ["A"],
        tags: ["leadership"],
        group: "Founder Lessons",
      },
    })
    const second = makePost({
      id: "b",
      slug: "instagram-b",
      publishedAt: "2024-12-30T00:00:00Z",
      curated: true,
      editorial: {
        speaker: { name: "Speaker B", type: "athlete" },
        takeaways: ["B"],
        tags: ["focus"],
        group: "Athlete Lessons",
      },
    })

    const dayOne = getFeaturedPost([first, second], new Date(Date.UTC(2025, 0, 1)))
    const dayTwo = getFeaturedPost([first, second], new Date(Date.UTC(2025, 0, 2)))

    expect(dayOne?.id).not.toBe(dayTwo?.id)
  })

  test("falls back to newest when no curated posts exist", () => {
    const older = makePost({ id: "older", publishedAt: "2024-12-01T00:00:00Z" })
    const newer = makePost({ id: "newer", publishedAt: "2025-01-15T00:00:00Z" })

    const featured = getFeaturedPost([older, newer], new Date(Date.UTC(2025, 0, 5)))
    expect(featured?.id).toBe("newer")
  })
})
