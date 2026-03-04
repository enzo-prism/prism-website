import { normalizeInput } from "@/lib/sales-chat/spec-v1-validation"

export type RootIntent =
  | "free_audit"
  | "website_overhaul"
  | "growth_partnership"
  | "help_choose"
  | "general_question"
  | "unknown"

export type GlobalIntent =
  | "faq"
  | "objection"
  | "edge_case"
  | "human_handoff"
  | "none"

function hasAny(normalized: string, terms: string[]): boolean {
  return terms.some((term) => normalized.includes(term))
}

export function detectRootIntent(input: string): RootIntent {
  const normalized = normalizeInput(input)

  if (
    hasAny(normalized, ["audit", "review", "analyze my site", "analysis", "look at my site", "what would you change"])
  ) {
    return "free_audit"
  }

  if (
    hasAny(normalized, [
      "new website",
      "better website",
      "website redesign",
      "redesign my site",
      "site rebuild",
      "website overhaul",
      "rebuild my site",
    ])
  ) {
    return "website_overhaul"
  }

  if (hasAny(normalized, ["growth partner", "2k", "2000", "retainer", "monthly", "online presence transformation"])) {
    return "growth_partnership"
  }

  if (hasAny(normalized, ["not sure", "help me choose", "what do you recommend", "what's right for me", "exploring"])) {
    return "help_choose"
  }

  if (hasAny(normalized, ["question", "what is prism", "who is enzo", "pricing", "timeline", "case studies"])) {
    return "general_question"
  }

  return "unknown"
}

export function detectGlobalIntent(input: string): GlobalIntent {
  const normalized = normalizeInput(input)

  if (hasAny(normalized, ["human", "talk to someone", "live person", "representative"])) {
    return "human_handoff"
  }

  if (
    hasAny(normalized, [
      "too expensive",
      "can't afford",
      "need to think",
      "already have an agency",
      "no time for a call",
      "different from",
      "contract",
      "commitment",
      "discount",
    ])
  ) {
    return "objection"
  }

  if (hasAny(normalized, ["support", "career", "job", "press", "vendor", "already a client", "confused", "overwhelmed"])) {
    return "edge_case"
  }

  if (
    hasAny(normalized, [
      "what is prism",
      "who is enzo",
      "types of businesses",
      "pricing",
      "how long",
      "results",
      "case studies",
      "testimonials",
      "stack",
      "platforms",
      "portfolio",
      "after launch",
    ])
  ) {
    return "faq"
  }

  return "none"
}

export function detectFaqTopic(input: string): string {
  const normalized = normalizeInput(input)

  if (hasAny(normalized, ["what is prism", "about prism"])) return "what_is_prism"
  if (hasAny(normalized, ["who is enzo", "enzo sison"])) return "who_is_enzo"
  if (hasAny(normalized, ["types of businesses", "industries", "who do you work with"])) return "business_types"
  if (hasAny(normalized, ["pricing", "cost", "how much"])) return "pricing"
  if (hasAny(normalized, ["how long", "timeline", "website take"])) return "website_timeline"
  if (hasAny(normalized, ["how fast", "results", "see results"])) return "results_timeline"
  if (hasAny(normalized, ["case studies", "testimonials", "proof"])) return "proof"
  if (hasAny(normalized, ["platform", "tech", "stack"])) return "stack"
  if (hasAny(normalized, ["portfolio", "see your website"])) return "portfolio"
  if (hasAny(normalized, ["after launch", "post launch"])) return "post_launch"

  return "unknown"
}
