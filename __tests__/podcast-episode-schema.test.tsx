import { render } from "@testing-library/react"

import { PodcastEpisodeSchema } from "@/components/schema-markup"

describe("PodcastEpisodeSchema", () => {
  it("renders VideoObject markup with required fields when video data is present", () => {
    const { container } = render(
      <PodcastEpisodeSchema
        episodeId="ep-1"
        seriesId="prism-podcast"
        name="Episode 1: Test Guest"
        description="takeaway one · takeaway two"
        url="https://www.design-prism.com/podcast#episode-1"
        videoEmbedUrl="https://www.youtube.com/embed/abc123"
        videoContentUrl="https://www.youtube.com/watch?v=abc123"
        thumbnailUrl="https://img.youtube.com/vi/abc123/hqdefault.jpg"
        datePublished="2025-12-12T00:00:00.000Z"
      />,
    )

    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeTruthy()

    const data = JSON.parse(script?.textContent || "{}") as any
    expect(data["@type"]).toBe("PodcastEpisode")
    expect(data.associatedMedia).toBeTruthy()
    expect(data.associatedMedia["@type"]).toBe("VideoObject")
    expect(data.associatedMedia.name).toBe("Episode 1: Test Guest")
    expect(data.associatedMedia.thumbnailUrl).toBe("https://img.youtube.com/vi/abc123/hqdefault.jpg")
    expect(data.associatedMedia.uploadDate).toBe("2025-12-12T00:00:00.000Z")
    expect(data.associatedMedia.embedUrl).toBe("https://www.youtube.com/embed/abc123")
    expect(data.associatedMedia.contentUrl).toBe("https://www.youtube.com/watch?v=abc123")
  })

  it("omits VideoObject markup when required video fields are missing", () => {
    const { container } = render(
      <PodcastEpisodeSchema
        episodeId="ep-2"
        seriesId="prism-podcast"
        name="Episode 2: Another Guest"
        description="takeaway"
        url="https://www.design-prism.com/podcast#episode-2"
        videoEmbedUrl="https://www.youtube.com/embed/def456"
        datePublished="2025-12-12T00:00:00.000Z"
      />,
    )

    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).toBeTruthy()

    const data = JSON.parse(script?.textContent || "{}") as any
    expect(data["@type"]).toBe("PodcastEpisode")
    expect(data.associatedMedia).toBeUndefined()
  })
})

