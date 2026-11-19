import matter from "gray-matter"

import { CURRENT_CASE_STUDIES } from "@/components/case-studies/work-index"
import { caseStudyMarkdown, formatFactDate } from "@/lib/case-study-facts"
import { getAllPosts, getPostMarkdownSource } from "@/lib/mdx-data"
import { markdownPathFor } from "@/lib/seo/markdown-routes"
import { PRISM_ENTITY_DESCRIPTION } from "@/lib/seo/rules"
import { INDEXABLE_STATIC_ROUTES } from "@/lib/seo/search-visibility"

/**
 * /llms-full.txt: the reading guide (public/llms.txt) plus the full text an
 * assistant needs without crawling: every current case study's facts, story,
 * and outcomes, and every indexable blog post's text. Built once per deploy
 * (app/llms-full.txt/route.ts). Service pages are React, so they are listed
 * by their markdown copies instead (lib/seo/markdown-routes.ts).
 */

const SITE = "https://www.design-prism.com"

/** Plain text from an MDX body: no imports, components, or HTML tags. */
export function mdxToPlainMarkdown(source: string): string {
  return source
    .replace(/^\s*(import|export)\s.*$/gm, "")
    .replace(/<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_m, href: string, text: string) => {
      const label = text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
      const url = href.startsWith("/") ? `${SITE}${href}` : href
      return label ? `[${label}](${url})` : ""
    })
    .replace(/\]\((\/[^)\s]*)\)/g, (_m, href: string) => `](${SITE}${href})`)
    .replace(/<[A-Z][\w.]*(?:\s[^<>]*)?\/>/g, "")
    .replace(/<\/?[A-Za-z][^>]*>/g, "")
    .replace(/\{\s*["'`]\s*["'`]\s*\}/g, " ")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
}

/**
 * Pushes every markdown heading down one level (# → ##), leaving fenced code
 * alone (a robots.txt comment is not a heading).
 */
export function demoteHeadings(markdown: string): string {
  return markdown
    .split(/(^```[\s\S]*?^```)/m)
    .map((part) => (part.startsWith("```") ? part : part.replace(/^(#{1,5}) /gm, "#$1 ")))
    .join("")
}

export async function buildLlmsFull(llmsTxt: string, generatedAt: Date): Promise<string> {
  const sections: string[] = [
    "# Prism (Design Prism): full reference",
    "",
    `> ${PRISM_ENTITY_DESCRIPTION}`,
    "",
    `Generated ${generatedAt.toISOString().slice(0, 10)} from the site's own sources. It holds the reading guide (/llms.txt), every current case study, and the full text of every indexable blog post. Every page is also available as markdown at its URL plus .md (the homepage is ${SITE}/index.md). Company facts and the waitlist form are described in ${SITE}/ai-data.json.`,
    "",
    "## Reading guide",
    "",
    demoteHeadings(llmsTxt.replace(/^# .*\n+(> .*\n+)?/, "").trim()),
    "",
    "## Pages as markdown",
    "",
    ...INDEXABLE_STATIC_ROUTES.map(
      (route) => `- ${SITE}${route === "/" ? "/" : route}: ${SITE}${markdownPathFor(route)}`,
    ),
    "",
    "## Case studies",
    "",
    "Current clients only. Results carry their source and date window.",
    "",
    ...CURRENT_CASE_STUDIES.flatMap((study) => [caseStudyMarkdown(study), ""]),
    "## Blog posts",
    "",
    "Educational context, not current pricing or offer terms. Newest first.",
    "",
  ]

  const posts = [...((await getAllPosts()) ?? [])].sort((a, b) =>
    String(b.date).localeCompare(String(a.date)),
  )
  for (const post of posts) {
    const source = await getPostMarkdownSource(post.slug)
    if (!source) continue
    const { content } = matter(source)
    const published = formatFactDate(post.date)
    const updated = formatFactDate(post.openGraph?.modifiedTime)
    sections.push(
      `### ${post.h1Title || post.title}`,
      "",
      `URL: ${SITE}/blog/${post.slug}`,
      [
        published ? `Published: ${published}` : null,
        updated && updated !== published ? `Updated: ${updated}` : null,
        post.author ? `Author: ${post.author}` : null,
      ]
        .filter(Boolean)
        .join(". "),
      "",
      demoteHeadings(demoteHeadings(mdxToPlainMarkdown(content))),
      "",
    )
  }

  return `${sections.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`
}
