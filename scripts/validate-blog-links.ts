import fs from "fs"
import path from "path"
import matter from "gray-matter"

import {
  getOutboundLinkRulesForPost,
  type BlogOutboundLinkContext,
} from "../lib/blog-inline-link-rules"
import { injectOutboundLinks } from "../lib/blog-inline-link-injector"

type Finding = {
  level: "error" | "warn"
  slug: string
  message: string
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog")
const MAX_LINKS_PER_POST = 6
const MIN_LINKS_PER_POST = 2
const CONCURRENCY_LIMIT = 8

function collectPosts() {
  const files = fs.readdirSync(BLOG_DIR)
  return files
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => ({
      fileName,
      slug: fileName.replace(/\.mdx$/i, ""),
    }))
}

function countInsertedLinks(content: string) {
  const matches = [...content.matchAll(/data-blog-link-phrase=/g)]
  return matches.length
}

function hasCorruptedAnchors(content: string) {
  const open = (content.match(/<a\b[^>]*>/g) || []).length
  const close = (content.match(/<\/a>/g) || []).length
  return open !== close
}

function extractProfileRuleLinks(slug: string, context: BlogOutboundLinkContext) {
  const profile = getOutboundLinkRulesForPost(context)
  return {
    profile,
    links: profile.rules
      .map((rule) => rule.href)
      .filter((href): href is string => typeof href === "string" && href.trim().length > 0),
  }
}

async function checkExternalUrl(url: string): Promise<string> {
  try {
    const head = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(12000),
    })
    if (head.status >= 400) {
      const get = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(12000),
      })
      if (!get.ok) {
        return `${get.status} ${get.statusText}`
      }
    }
    return "ok"
  } catch (error) {
    return `${error instanceof Error ? error.message : "fetch failed"}`
  }
}

async function runUrlChecks(urls: string[], findings: Finding[]) {
  const uniqueUrls = Array.from(new Set(urls)).filter(Boolean)
  if (uniqueUrls.length === 0) return

  for (let index = 0; index < uniqueUrls.length; index += CONCURRENCY_LIMIT) {
    const chunk = uniqueUrls.slice(index, index + CONCURRENCY_LIMIT)
    const checks = await Promise.all(
      chunk.map(async (target) => {
        const status = await checkExternalUrl(target)
        return { target, status }
      }),
    )

    checks.forEach(({ target, status }) => {
      if (status !== "ok") {
        findings.push({
          level: "warn",
          slug: "resolver",
          message: `HTTP check failed for ${target}: ${status}`,
        })
      }
    })
  }
}

async function main() {
  const posts = collectPosts()
  const findings: Finding[] = []
  const resolverUrls: string[] = []

  if (posts.length === 0) {
    findings.push({ level: "error", slug: "setup", message: "No .mdx files found in content/blog" })
  }

  for (const { fileName, slug } of posts) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8")
    const parsed = matter(raw)
    const frontmatter = parsed.data as {
      title?: string
      category?: string
    }

    const title = frontmatter.title || slug
    const category = frontmatter.category || ""
    const profileResult = extractProfileRuleLinks(slug, {
      slug,
      category,
      title,
      content: parsed.content,
    })
    const injected = injectOutboundLinks(parsed.content, profileResult.profile)
    const insertedCount = countInsertedLinks(injected)
    const ruleCount = profileResult.profile.rules.length

    if (insertedCount < MIN_LINKS_PER_POST) {
      findings.push({
        level: "warn",
        slug,
        message: `insufficient outbound links injected (${insertedCount})`,
      })
    }

    if (insertedCount > MAX_LINKS_PER_POST) {
      findings.push({
        level: "error",
        slug,
        message: `too many outbound links injected (${insertedCount})`,
      })
    }

    if (insertedCount > 0 && hasCorruptedAnchors(injected)) {
      findings.push({
        level: "error",
        slug,
        message: "injected anchors are unbalanced",
      })
    }

    resolverUrls.push(...profileResult.links)

    const seen = new Set<string>()
    const injectedMatches = [...injected.matchAll(/data-blog-link-phrase="([^"]+)"/g)]
    for (const match of injectedMatches) {
      const phrase = match[1]?.toLowerCase() || ""
      if (!phrase) continue
      if (seen.has(phrase)) {
        findings.push({
          level: "warn",
          slug,
          message: `duplicate injected phrase: ${phrase}`,
        })
      }
      seen.add(phrase)
    }

    if (insertedCount > 0 && ruleCount === 0) {
      findings.push({
        level: "error",
        slug,
        message: `no rule set returned for profile despite links in content`,
      })
    }
  }

  await runUrlChecks(resolverUrls, findings)

  const errors = findings.filter((finding) => finding.level === "error")
  const warnings = findings.filter((finding) => finding.level === "warn")

  console.log(`Validated ${posts.length} posts`)
  console.log(`Errors: ${errors.length}`)
  console.log(`Warnings: ${warnings.length}`)

  errors.forEach((finding) => {
    console.error(`✗ ${finding.slug}: ${finding.message}`)
  })
  warnings.forEach((finding) => {
    console.warn(`⚠ ${finding.slug}: ${finding.message}`)
  })

  process.exitCode = errors.length > 0 ? 1 : 0
}

main().catch((error) => {
  console.error("validate-blog-links failed:", error)
  process.exitCode = 1
})
