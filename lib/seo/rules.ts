export const BRAND_NAME = "Prism"
export const BRAND_SUFFIX = " | Prism"

export const TITLE_MIN_LENGTH = 25
export const TITLE_MAX_LENGTH = 65
export const DESCRIPTION_MIN_LENGTH = 70
export const DESCRIPTION_MAX_LENGTH = 170

export const DEFAULT_OG_IMAGE = "/prism-opengraph.png"

export const BLOG_MANUAL_OVERRIDE_KEYWORDS = /(dental|seo|ads|local|website|agency|consultant|checklist|playbook)/i

const TERMINAL_BRAND_PATTERN = /\s*(?:\||-|–|—|:)\s*(?:design\s+)?prism(?:\s+(?:agency|careers|podcast|services|openai\s+guide|case\s+study))?\s*$/i
const REPEATED_PIPE_PATTERN = /\|{2,}/g

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

export function stripTerminalBrand(input: string): string {
  let output = collapseWhitespace(input).replace(REPEATED_PIPE_PATTERN, "|")
  while (TERMINAL_BRAND_PATTERN.test(output)) {
    output = output.replace(TERMINAL_BRAND_PATTERN, "").trim()
  }
  return output.replace(/\s*(?:\||-|–|—|:)\s*$/, "").trim()
}

export function normalizeTitleStem(input: string): string {
  const withoutBrand = stripTerminalBrand(input)
  const cased = sentenceCaseIfNeeded(withoutBrand)
  return cased || BRAND_NAME
}

export function buildAbsoluteTitle(stem: string): string {
  const normalizedStem = normalizeTitleStem(stem)
  const maxStemLength = TITLE_MAX_LENGTH - BRAND_SUFFIX.length
  const trimmedStem = trimToWordBoundary(normalizedStem, maxStemLength)
  return `${trimmedStem || BRAND_NAME}${BRAND_SUFFIX}`
}

export function normalizeDescription(input: string): string {
  const cased = sentenceCaseIfNeeded(input)
  const trimmed = trimToWordBoundary(cased, DESCRIPTION_MAX_LENGTH)
  return trimmed
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
