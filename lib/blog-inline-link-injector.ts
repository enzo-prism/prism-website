import type { BlogOutboundLinkProfile } from "@/lib/blog-inline-link-rules"

type OutboundLinkCandidate = {
  href: string
  phrase: string
  matchText: string
  start: number
  end: number
}

function normalizeForSearch(value: string) {
  return value.toLowerCase().trim()
}

function isWordChar(character: string) {
  return /[a-z0-9_]/i.test(character)
}

function isBoundaryMatch(value: string, start: number, end: number) {
  const before = value[start - 1]
  const after = value[end]

  if (start > 0 && isWordChar(before)) return false
  if (end < value.length && isWordChar(after)) return false
  return true
}

function findFirstMatchInText(
  text: string,
  normalizedText: string,
  rule: { phrase: string; variants?: string[] },
  searchFrom: number,
) {
  let bestMatch: OutboundLinkCandidate | null = null
  const phrases = [rule.phrase, ...(rule.variants ?? [])]
    .map(normalizeForSearch)
    .filter(Boolean)

  const seen = new Set<string>()

  for (const phrase of phrases) {
    if (seen.has(phrase)) continue
    seen.add(phrase)

    let start = normalizedText.indexOf(phrase, searchFrom)
    while (start !== -1) {
      const end = start + phrase.length
      if (isBoundaryMatch(text, start, end)) {
        const matchText = text.slice(start, end)
        if (!bestMatch || start < bestMatch.start) {
          bestMatch = {
            phrase,
            href: "",
            matchText,
            start,
            end,
          }
        }
        break
      }
      start = normalizedText.indexOf(phrase, start + 1)
    }
  }

  return bestMatch
}

function buildLinkNode(href: string, matchText: string, phrase: string, index: number) {
  const safeText = matchText.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  const safeHref = href.replace(/"/g, "&quot;")
  const safePhrase = phrase.replace(/"/g, "&quot;")
  return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="blog-inline-link" data-blog-link-index="${index}" data-blog-link-phrase="${safePhrase}">${safeText}<span class="sr-only"> (opens in a new tab)</span></a>`
}

function splitProtectedSegments(content: string) {
  const protectedPattern =
    /```[\s\S]*?```|<a\b[^>]*>[\s\S]*?<\/a>|<[^>]+>|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|`[^`]*`/gi

  const segments: Array<{ type: "text" | "protected"; value: string }> = []
  let cursor = 0
  let match = protectedPattern.exec(content)

  while (match !== null) {
    if (match.index > cursor) {
      segments.push({ type: "text", value: content.slice(cursor, match.index) })
    }
    segments.push({ type: "protected", value: match[0] })
    cursor = match.index + match[0].length
    match = protectedPattern.exec(content)
  }

  if (cursor < content.length) {
    segments.push({ type: "text", value: content.slice(cursor) })
  }

  return segments
}

function normalizeLinkText(value: string) {
  return value.toLowerCase().replace(/[^\w]+/g, " ").trim()
}

export function injectOutboundLinks(content: string, profile: BlogOutboundLinkProfile) {
  if (!content || !profile || !profile.rules?.length) return content

  const maxLinks = Math.max(1, Math.min(profile.maxLinks ?? 6, 8))
  const filteredRules = profile.rules.filter((rule) =>
    profile.skipIfNotHighConfidence ? rule.confidence === "high" : true,
  )

  if (!filteredRules.length) return content

  const usedRules = new Set<string>()
  const usedParagraphAnchors = new Set<string>()
  let totalInserted = 0
  let linkCounter = 0
  let paragraphLinkCount = 0

  const resetParagraphState = () => {
    usedParagraphAnchors.clear()
    paragraphLinkCount = 0
  }

  const segments = splitProtectedSegments(content)
  const resolvedRules = filteredRules.slice(0, maxLinks * 2)

  const rendered: string[] = []

  for (const segment of segments) {
    if (segment.type === "protected") {
      rendered.push(segment.value)
      if (segment.value.includes("\n\n")) {
        resetParagraphState()
      } else if (segment.value === "\n") {
        // keep paragraph state as-is for single line breaks
      }
      continue
    }

    const lines = segment.value.split("\n")

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      const line = lines[lineIndex]

      if (!line.trim()) {
        resetParagraphState()
        rendered.push(line)
        if (lineIndex < lines.length - 1) rendered.push("\n")
        continue
      }

      if (/^\s*import\b/.test(line) || /^\s*export\b/.test(line)) {
        rendered.push(line)
        if (lineIndex < lines.length - 1) rendered.push("\n")
        continue
      }

      if (/^\s*#{1,6}\s+/.test(line) || /^(?:\s*)\|/.test(line)) {
        rendered.push(line)
        if (lineIndex < lines.length - 1) rendered.push("\n")
        continue
      }

      let modifiedLine = ""
      let cursor = 0
  const normalizedLine = line.toLowerCase()
      let searchFrom = 0
      let safetyCounter = 0

      while (totalInserted < maxLinks && safetyCounter < 20) {
        safetyCounter += 1
        let candidate: (OutboundLinkCandidate & {
          href: string
          ruleKey: string
          canonicalPhrase: string
        }) | null = null

        for (const rule of resolvedRules) {
          const ruleKey = rule.phrase.toLowerCase()
          if (usedRules.has(ruleKey)) continue

          const match = findFirstMatchInText(line, normalizedLine, rule, searchFrom)
          if (!match) continue
          if (match.start < searchFrom) continue
          if (usedParagraphAnchors.has(normalizeLinkText(match.matchText))) continue
          if (candidate === null || match.start < candidate.start) {
            candidate = {
              ...match,
              href: rule.href,
              ruleKey,
              canonicalPhrase: rule.phrase,
            }
          }
        }

        if (!candidate) break

        const { start, end, href, matchText, phrase, ruleKey, canonicalPhrase } = candidate
        const normalizedPhrase = phrase.toLowerCase()
        const linkText = normalizeLinkText(matchText)

        if (usedParagraphAnchors.has(linkText)) {
          searchFrom = end
          continue
        }

        modifiedLine += line.slice(cursor, start)
        modifiedLine += buildLinkNode(
          href,
          matchText,
          canonicalPhrase.toLowerCase(),
          linkCounter,
        )
        cursor = end

        usedRules.add(ruleKey)
        usedParagraphAnchors.add(linkText)
        totalInserted += 1
        paragraphLinkCount += 1
        linkCounter += 1
        searchFrom = end

        if (paragraphLinkCount >= maxLinks) break
      }

      modifiedLine += line.slice(cursor)
      rendered.push(modifiedLine)
      if (lineIndex < lines.length - 1) rendered.push("\n")
    }
  }

  return rendered.join("")
}
