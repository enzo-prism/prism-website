/** @jest-environment node */
import fs from "node:fs"
import path from "node:path"

import { CURRENT_CASE_STUDIES } from "@/components/case-studies/work-index"
import { CASE_STUDIES } from "@/lib/case-study-data"
import { getCaseStudyFacts } from "@/lib/case-study-facts"
import { FORMER_CLIENT_SLUGS } from "@/lib/former-clients"
import { buildLlmsFull, demoteHeadings, mdxToPlainMarkdown } from "@/lib/llms-full"
import { getAllPosts } from "@/lib/mdx-data"

const llmsTxt = fs.readFileSync(path.join(process.cwd(), "public", "llms.txt"), "utf8")

describe("case study facts", () => {
  it("come only from the data and carry dated results", () => {
    for (const study of CASE_STUDIES) {
      const facts = getCaseStudyFacts(study)
      expect(facts[0]).toEqual({ label: "Client", value: study.client })
      expect(facts.find((fact) => fact.label === "Location")?.value).toBe(study.location)
      expect(facts.find((fact) => fact.label === "Industry")?.value).toBe(study.industry)
      for (const fact of facts) expect(fact.value).not.toMatch(/latest|—/i)
    }
    const wong = getCaseStudyFacts(CASE_STUDIES.find((study) => study.slug === "dr-christopher-wong")!)
    expect(wong.find((fact) => fact.label === "Result")?.value).toContain("Jul 5-Oct 2, 2025 vs Jul 5-Oct 2, 2026")
    expect(wong.find((fact) => fact.label === "Case study published")?.value).toBe("Jan 15, 2025")
  })

  it("mark former clients as past projects", () => {
    for (const slug of FORMER_CLIENT_SLUGS) {
      const study = CASE_STUDIES.find((item) => item.slug === slug)!
      expect(getCaseStudyFacts(study)).toContainEqual({
        label: "Status",
        value: "Past project (former client)",
      })
    }
  })
})

describe("mdxToPlainMarkdown", () => {
  it("drops imports, components, and HTML but keeps text and links", () => {
    const source = [
      "import YouTubeVideoEmbed from '@/components/youtube-video-embed'",
      "",
      "Read <a href=\"/aeo\" class=\"x\">Prism AEO</a> or [the guide](/blog/x).",
      "<YouTubeVideoEmbed",
      "  videoId=\"abc\"",
      "/>",
      "<CTAButton href=\"/waitlist\" block>",
      "  Join the waitlist",
      "</CTAButton>",
      "Keep{\" \"}going.",
    ].join("\n")
    const text = mdxToPlainMarkdown(source)
    expect(text).not.toMatch(/import|YouTubeVideoEmbed|videoId|CTAButton|<|\{/)
    expect(text).toContain("[Prism AEO](https://www.design-prism.com/aeo)")
    expect(text).toContain("[the guide](https://www.design-prism.com/blog/x)")
    expect(text).toContain("Join the waitlist")
  })

  it("leaves code fences alone when demoting headings", () => {
    expect(demoteHeadings("# Title\n```txt\n# comment\n```\n## Sub")).toBe(
      "## Title\n```txt\n# comment\n```\n### Sub",
    )
  })
})

describe("/llms-full.txt", () => {
  let text: string
  beforeAll(async () => {
    text = await buildLlmsFull(llmsTxt, new Date("2026-11-18T00:00:00Z"))
  })

  it("holds the guide, current case studies, and every indexable post", async () => {
    expect(text.startsWith("# Prism (Design Prism): full reference\n")).toBe(true)
    expect(text).toContain("Generated 2026-11-18")
    expect(text).toContain("https://www.design-prism.com/aeo.md")
    for (const study of CURRENT_CASE_STUDIES) expect(text).toContain(`### ${study.client}\n`)
    const caseStudies = text.slice(text.indexOf("\n## Case studies\n"), text.indexOf("\n## Blog posts\n"))
    for (const slug of FORMER_CLIENT_SLUGS) expect(caseStudies).not.toContain(`/case-studies/${slug}`)
    const posts = (await getAllPosts()) ?? []
    expect(posts.length).toBeGreaterThan(20)
    for (const post of posts) expect(text).toContain(`URL: https://www.design-prism.com/blog/${post.slug}\n`)
  })

  it("has one H1 and no MDX leftovers", () => {
    const outsideCode = text.replace(/^```[\s\S]*?^```/gm, "")
    expect(outsideCode.match(/^# /gm)).toHaveLength(1)
    expect(text).not.toMatch(/^import /m)
    expect(text).not.toMatch(/<YouTubeVideoEmbed|<\/?div|className=/)
  })
})
