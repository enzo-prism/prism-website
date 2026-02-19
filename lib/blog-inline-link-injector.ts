import type { BlogOutboundLinkProfile, OutboundLinkRule } from "@/lib/blog-inline-link-rules"

type OutboundLinkCandidate = {
  href: string
  phrase: string
  matchText: string
  start: number
  end: number
  score: number
  ruleKey: string
  canonicalPhrase: string
  confidence: "high" | "medium"
  isCanonical: boolean
}

type ScoredRule = OutboundLinkRule & {
  confidence: "high" | "medium"
}

const SHORT_TERM_CONTEXT_WINDOW = 90
const DEFAULT_MIN_SCORE = 35

const SHORT_TERM_CONTEXT_HINTS: Record<string, string[]> = {
  ai: [
    "artificial",
    "intelligence",
    "chatgpt",
    "claude",
    "anthropic",
    "openai",
    "codex",
    "agentic",
    "agent",
    "coding",
    "gpt",
    "llm",
    "app",
  ],
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

function normalizeLinkText(value: string) {
  return value.toLowerCase().replace(/[^\w]+/g, " ").trim()
}

function confidenceWeight(confidence: "high" | "medium") {
  return confidence === "high" ? 45 : 30
}

function hasContextHint(text: string, start: number, end: number, phrase: string) {
  const key = normalizeForSearch(phrase)
  const hints = SHORT_TERM_CONTEXT_HINTS[key]
  if (!hints?.length) return true

  const windowStart = Math.max(0, start - SHORT_TERM_CONTEXT_WINDOW)
  const windowEnd = Math.min(text.length, end + SHORT_TERM_CONTEXT_WINDOW)
  const window = text.slice(windowStart, windowEnd).toLowerCase()

  return hints.some((hint) => window.includes(` ${hint} `) || window.includes(`${hint} `))
}

function scoreMatch({
  phrase,
  confidence,
  isCanonical,
  matchText,
  normalizedText,
  start,
  end,
}: {
  phrase: string
  confidence: "high" | "medium"
  isCanonical: boolean
  matchText: string
  normalizedText: string
  start: number
  end: number
}) {
  let score = confidenceWeight(confidence)
  const phraseLength = phrase.length

  score += Math.min(18, phraseLength * 1.8)
  if (isCanonical) score += 10
  if (phraseLength <= 2) score -= 22
  if (/^[A-Z]{2,4}$/.test(matchText)) score += 8
  if (phraseLength > 0) {
    score += Math.max(0, (phraseLength - 3) * 0.8)
  }

  if (phraseLength <= 3 && !hasContextHint(normalizedText, start, end, phrase)) {
    score -= 32
  }

  if (start < 80) score += 2
  if (start < 20) score += 2

  return Math.round(score)
}

function collectCandidatesForRule(
  text: string,
  normalizedText: string,
  rule: ScoredRule,
  ruleKey: string,
) {
  const candidates: OutboundLinkCandidate[] = []
  const phrases = [rule.phrase, ...(rule.variants ?? [])]
    .map((candidate) => normalizeForSearch(candidate))
    .filter(Boolean)

  const seen = new Set<string>()

  for (const phrase of phrases) {
    if (seen.has(phrase)) continue
    seen.add(phrase)
    let start = normalizedText.indexOf(phrase, 0)
    const isCanonical = phrase === normalizeForSearch(rule.phrase)

    while (start !== -1) {
      const end = start + phrase.length
      if (isBoundaryMatch(text, start, end)) {
        const matchText = text.slice(start, end)
        candidates.push({
          phrase,
          href: rule.href,
          matchText,
          start,
          end,
          confidence: rule.confidence ?? "medium",
          isCanonical,
          canonicalPhrase: rule.phrase,
          ruleKey,
          score: scoreMatch({
            phrase,
            confidence: rule.confidence ?? "medium",
            isCanonical,
            matchText,
            normalizedText,
            start,
            end,
          }),
        })
      }
      start = normalizedText.indexOf(phrase, start + 1)
    }
  }

  return candidates
}

function collectCandidatesForLine(
  line: string,
  normalizedLine: string,
  rules: ScoredRule[],
) {
  const candidates: OutboundLinkCandidate[] = []

  for (const rule of rules) {
    const ruleKey = rule.phrase.toLowerCase()
    candidates.push(...collectCandidatesForRule(line, normalizedLine, rule, ruleKey))
  }

  return candidates
}

function overlaps(existing: Array<{ start: number; end: number }>, candidateStart: number, candidateEnd: number) {
  return existing.some(({ start, end }) => candidateStart < end && candidateEnd > start)
}

function bestCandidateForLine({
  lineCandidates,
  usedRules,
  usedParagraphAnchors,
  usedSpans,
}: {
  lineCandidates: OutboundLinkCandidate[]
  usedRules: Set<string>
  usedParagraphAnchors: Set<string>
  usedSpans: Array<{ start: number; end: number }>
}) {
  const sortedCandidates = [...lineCandidates].sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score
    if (a.start !== b.start) return a.start - b.start
    if (a.end - a.start !== b.end - b.start) {
      return (b.end - b.start) - (a.end - a.start)
    }
    return a.phrase.localeCompare(b.phrase)
  })

  for (const candidate of sortedCandidates) {
    const normalized = normalizeLinkText(candidate.matchText)
    if (candidate.score < DEFAULT_MIN_SCORE) continue
    if (candidate.start < 0 || candidate.end < candidate.start) continue
    if (usedRules.has(candidate.ruleKey)) continue
    if (usedParagraphAnchors.has(normalized)) continue
    if (overlaps(usedSpans, candidate.start, candidate.end)) continue
    if (candidate.phrase.length <= 2 && candidate.score < 44) continue

    return candidate
  }

  return null
}

function buildLineWithLinks(line: string, accepted: OutboundLinkCandidate[], linkIndexStart: number) {
  if (!accepted.length) return line

  const sortedAccepted = [...accepted].sort((a, b) => a.start - b.start)
  let cursor = 0
  let rebuilt = ""
  let linkIndex = linkIndexStart

  for (const candidate of sortedAccepted) {
    rebuilt += line.slice(cursor, candidate.start)
    rebuilt += buildLinkNode(
      candidate.href,
      candidate.matchText,
      candidate.canonicalPhrase,
      linkIndex,
    )
    cursor = candidate.end
    linkIndex += 1
  }

  rebuilt += line.slice(cursor)
  return rebuilt
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

export function injectOutboundLinks(content: string, profile: BlogOutboundLinkProfile) {
  if (!content || !profile || !profile.rules?.length) return content

  const maxLinks = Math.max(1, Math.min(profile.maxLinks ?? 6, 8))
  const filteredRules = profile.rules
    .slice(0, maxLinks * 2)
    .filter((rule) => profile.skipIfNotHighConfidence ? rule.confidence === "high" : true)
    .map((rule) => ({
      ...rule,
      confidence: rule.confidence ?? "medium",
    })) as ScoredRule[]

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

      const normalizedLine = line.toLowerCase()
      const lineCandidates = collectCandidatesForLine(line, normalizedLine, filteredRules)
      const acceptedCandidates: OutboundLinkCandidate[] = []
      const usedSpans: Array<{ start: number; end: number }> = []

      while (totalInserted < maxLinks && acceptedCandidates.length < maxLinks && paragraphLinkCount < maxLinks) {
        const candidate = bestCandidateForLine({
          lineCandidates,
          usedRules,
          usedParagraphAnchors,
          usedSpans,
        })

        if (!candidate) break

        const normalizedPhrase = normalizeLinkText(candidate.matchText)

        usedRules.add(candidate.ruleKey)
        usedParagraphAnchors.add(normalizedPhrase)
        usedSpans.push({ start: candidate.start, end: candidate.end })
        acceptedCandidates.push(candidate)
        totalInserted += 1
        paragraphLinkCount += 1
        linkCounter += 1
      }

      if (acceptedCandidates.length > 0) {
        const lineLinkStartIndex = Math.max(0, linkCounter - acceptedCandidates.length)
        rendered.push(buildLineWithLinks(line, acceptedCandidates, lineLinkStartIndex))
      } else {
        rendered.push(line)
      }
      if (lineIndex < lines.length - 1) rendered.push("\n")
    }
  }

  return rendered.join("")
}
