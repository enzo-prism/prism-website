export const BRAND_NAME = "Prism"
export const BRAND_SUFFIX = " | Prism"

export const TITLE_MIN_LENGTH = 10
export const TITLE_MAX_LENGTH = 60
export const DESCRIPTION_MIN_LENGTH = 24
export const DESCRIPTION_MAX_LENGTH = 155

export const DEFAULT_OG_IMAGE = "/prism-opengraph.png"

export const BLOG_MANUAL_OVERRIDE_KEYWORDS = /(dental|seo|ads|local|website|agency|consultant|checklist|playbook)/i

const TERMINAL_BRAND_PATTERN = /\s*(?:\||-|–|—|:)\s*(?:design\s+)?prism(?:\s+((?:agency|blog|careers|podcast|services|openai\s+guide|case\s+study)))?\s*$/i
const LEADING_BRAND_PATTERN = /^\s*(?:design\s+)?prism(?:\s+((?:ai|blog|careers|podcast|services|openai\s+guide)))?\s*(?:\||-|–|—|:)\s*/i
const REPEATED_PIPE_PATTERN = /\|{2,}/g
const TRAILING_TITLE_JOINER_PATTERN = /\s+(?:and|or|for|to|with|in|on|at|by|of|the|a|an)$/i
const TRAILING_TITLE_PUNCTUATION_PATTERN = /[\s,:;+&/-]+$/g
const TRAILING_DESCRIPTION_JOINER_PATTERN = /\s+(?:and|or|for|to|with|in|on|at|by|of|the|a|an|but)$/i
const TRAILING_DESCRIPTION_PUNCTUATION_PATTERN = /[\s,:;+–—-]+$/g
const SENTENCE_END_PATTERN = /[.!?](?=\s|$)/g

const COMMON_TERM_REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bai\b/gi, "AI"],
  [/\bseo\b/gi, "SEO"],
  [/\bppc\b/gi, "PPC"],
  [/\bcro\b/gi, "CRO"],
  [/\bui\b/gi, "UI"],
  [/\bux\b/gi, "UX"],
  [/\bga4\b/gi, "GA4"],
  [/\bgbp\b/gi, "GBP"],
  [/\bcta\b/gi, "CTA"],
  [/\bctas\b/gi, "CTAs"],
  [/\bfaq\b/gi, "FAQ"],
  [/\bfaqs\b/gi, "FAQs"],
  [/\bcms\b/gi, "CMS"],
  [/\bcrm\b/gi, "CRM"],
  [/\bhipaa\b/gi, "HIPAA"],
  [/\bada\b/gi, "ADA"],
  [/\bdns\b/gi, "DNS"],
  [/\bapi\b/gi, "API"],
  [/\broi\b/gi, "ROI"],
  [/\bgoogle maps\b/gi, "Google Maps"],
  [/\bapple maps\b/gi, "Apple Maps"],
  [/\bgoogle business profile\b/gi, "Google Business Profile"],
  [/\bgoogle ads\b/gi, "Google Ads"],
  [/\bchatgpt\b/gi, "ChatGPT"],
  [/\bopenai\b/gi, "OpenAI"],
  [/\btiktok\b/gi, "TikTok"],
  [/\byoutube\b/gi, "YouTube"],
  [/\bwordpress\b/gi, "WordPress"],
  [/\bshopify\b/gi, "Shopify"],
  [/\bmeta\b/gi, "Meta"],
  [/\byelp\b/gi, "Yelp"],
  [/\bprism\b/gi, "Prism"],
]

export function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim()
}

export function sentenceCaseIfNeeded(value: string): string {
  const collapsed = collapseWhitespace(value)
  if (!collapsed) return ""
  const hasLetters = /[a-zA-Z]/.test(collapsed)
  if (!hasLetters) return collapsed

  // If authoring is all lowercase, normalize to sentence case.
  if (collapsed === collapsed.toLowerCase()) {
    return collapsed.charAt(0).toUpperCase() + collapsed.slice(1)
  }

  return collapsed
}

function normalizeCommonSeoTerms(value: string): string {
  return COMMON_TERM_REPLACEMENTS.reduce(
    (output, [pattern, replacement]) => output.replace(pattern, replacement),
    value,
  )
}

function capitalizeLeadingLetter(value: string): string {
  const match = value.match(/[A-Za-z]/)
  if (!match || typeof match.index !== "number") return value

  const index = match.index
  return `${value.slice(0, index)}${value.charAt(index).toUpperCase()}${value.slice(index + 1)}`
}

export function trimToWordBoundary(value: string, maxLength: number): string {
  if (maxLength <= 0) return ""
  const collapsed = collapseWhitespace(value)
  if (collapsed.length <= maxLength) return collapsed

  const hardSlice = collapsed.slice(0, maxLength)
  const boundary = hardSlice.lastIndexOf(" ")
  if (boundary >= Math.floor(maxLength * 0.6)) {
    return hardSlice.slice(0, boundary).trim()
  }

  return hardSlice.trim()
}

export function cleanTrimmedTitle(value: string): string {
  let output = collapseWhitespace(value)

  while (output.length > 0) {
    const withoutPunctuation = output.replace(TRAILING_TITLE_PUNCTUATION_PATTERN, "").trim()
    if (withoutPunctuation !== output) {
      output = withoutPunctuation
      continue
    }

    const withoutJoiner = output.replace(TRAILING_TITLE_JOINER_PATTERN, "").trim()
    if (withoutJoiner !== output) {
      output = withoutJoiner
      continue
    }

    break
  }

  return output
}

function cleanTrimmedDescription(value: string): string {
  let output = collapseWhitespace(value)

  while (output.length > 0) {
    const withoutPunctuation = output.replace(TRAILING_DESCRIPTION_PUNCTUATION_PATTERN, "").trim()
    if (withoutPunctuation !== output) {
      output = withoutPunctuation
      continue
    }

    const withoutJoiner = output.replace(TRAILING_DESCRIPTION_JOINER_PATTERN, "").trim()
    if (withoutJoiner !== output) {
      output = withoutJoiner
      continue
    }

    break
  }

  return output
}

function formatBrandDescriptor(descriptor?: string): string | null {
  if (!descriptor) return null

  switch (descriptor.toLowerCase()) {
    case "blog":
      return "Blog"
    case "careers":
      return "Careers"
    case "podcast":
      return "Podcast"
    case "services":
      return "Services"
    case "openai guide":
      return "OpenAI Guide"
    case "case study":
      return "Case Study"
    default:
      return null
  }
}

export function stripTerminalBrand(input: string): string {
  let output = collapseWhitespace(input).replace(REPEATED_PIPE_PATTERN, "|")
  let match = output.match(TERMINAL_BRAND_PATTERN)

  while (match) {
    const descriptor = formatBrandDescriptor(match[1])
    const prefix = output
      .slice(0, match.index)
      .replace(/\s*(?:\||-|–|—|:)\s*$/, "")
      .trim()

    output = descriptor && prefix ? `${prefix} | ${descriptor}` : prefix
    match = output.match(TERMINAL_BRAND_PATTERN)
  }

  return output.replace(/\s*(?:\||-|–|—|:)\s*$/, "").trim()
}

export function stripLeadingBrand(input: string): string {
  const collapsed = collapseWhitespace(input)
  const match = collapsed.match(LEADING_BRAND_PATTERN)
  if (!match) return collapsed

  const label = formatBrandDescriptor(match[1]?.trim()) ?? normalizeCommonSeoTerms(sentenceCaseIfNeeded(match[1]?.trim() ?? ""))
  const rest = collapsed.slice(match[0].length).trim()
  if (!rest) return BRAND_NAME
  if (!label) return rest

  return `${label}: ${rest}`
}

export function normalizeTitleStem(input: string): string {
  const withoutBrand = stripTerminalBrand(stripLeadingBrand(input))
  const cased = capitalizeLeadingLetter(
    normalizeCommonSeoTerms(sentenceCaseIfNeeded(withoutBrand)),
  )
  return cased || BRAND_NAME
}

export function buildAbsoluteTitle(stem: string): string {
  const normalizedStem = normalizeTitleStem(stem)
  const maxStemLength = TITLE_MAX_LENGTH - BRAND_SUFFIX.length
  const trimmedStem = cleanTrimmedTitle(trimToWordBoundary(normalizedStem, maxStemLength))
  return `${trimmedStem || BRAND_NAME}${BRAND_SUFFIX}`
}

export function normalizeDescription(input: string): string {
  const cased = normalizeCommonSeoTerms(sentenceCaseIfNeeded(input))
  const collapsed = collapseWhitespace(cased)
  if (collapsed.length <= DESCRIPTION_MAX_LENGTH) {
    return cleanTrimmedDescription(collapsed)
  }

  const hardSlice = collapsed.slice(0, DESCRIPTION_MAX_LENGTH)
  const sentenceEndings = Array.from(hardSlice.matchAll(SENTENCE_END_PATTERN))
  const lastSentenceEnd = sentenceEndings.at(-1)?.index

  if (
    typeof lastSentenceEnd === "number" &&
    lastSentenceEnd >= Math.floor(DESCRIPTION_MAX_LENGTH * 0.6)
  ) {
    return hardSlice.slice(0, lastSentenceEnd + 1).trim()
  }

  return cleanTrimmedDescription(trimToWordBoundary(collapsed, DESCRIPTION_MAX_LENGTH))
}

export function requiresManualBlogSeo(slug: string, title: string): boolean {
  return title.length > TITLE_MAX_LENGTH || BLOG_MANUAL_OVERRIDE_KEYWORDS.test(slug)
}

export function computeSeoIssueFlags(
  value: string,
  kind: "title" | "description",
): string[] {
  const length = value.trim().length
  const issues: string[] = []

  if (length === 0) {
    issues.push("missing")
    return issues
  }

  if (kind === "title") {
    if (length < TITLE_MIN_LENGTH) issues.push("too_short")
    if (length > TITLE_MAX_LENGTH) issues.push("too_long")
  } else {
    if (length < DESCRIPTION_MIN_LENGTH) issues.push("too_short")
    if (length > DESCRIPTION_MAX_LENGTH) issues.push("too_long")
  }

  return issues
}
