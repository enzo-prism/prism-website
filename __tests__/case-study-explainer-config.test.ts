import {
  buildCloudinaryVideoPoster,
  CASE_STUDIES,
} from "@/lib/case-study-data"

describe("case study explainer configuration", () => {
  it("creates a frame poster URL for Cloudinary-hosted mp4 videos", () => {
    expect(
      buildCloudinaryVideoPoster(
        "https://res.cloudinary.com/demo/video/upload/v123/sample-video.mp4",
      ),
    ).toBe(
      "https://res.cloudinary.com/demo/video/upload/so_0/v123/sample-video.jpg",
    )
  })

  it("assigns explainer videos to the four live case studies with videos", () => {
    const explainerSlugs = CASE_STUDIES
      .filter((study) => study.explainerVideo)
      .map((study) => study.slug)

    expect(explainerSlugs).toEqual([
      "exquisite-dentistry",
      "sr4-partners",
      "infobell-it",
      "practice-transitions-institute",
    ])

    for (const slug of explainerSlugs) {
      const study = CASE_STUDIES.find((item) => item.slug === slug)

      expect(study?.explainerVideo?.src).toMatch(/^https:\/\/res\.cloudinary\.com\/.+\.mp4$/)
      expect(study?.explainerVideo?.keyMoments).toHaveLength(3)
      expect(study?.explainerVideo?.title).toBeTruthy()
      expect(study?.explainerVideo?.summary).toBeTruthy()
    }
  })
})
