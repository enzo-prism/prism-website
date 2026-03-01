import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

import type { ConversationState, LeadProfile, RequestedAction } from "@/lib/sales-chat/types"

type BuildPromptInput = {
  sourcePage: string
  playbook: string
  knownFacts: string
  policyDirectives: string
  leadProfile?: LeadProfile
  conversationState?: ConversationState
  requestedAction?: RequestedAction
}

const PLAYBOOK_CACHE = new Map<string, string>()
const PLAYBOOK_FALLBACK = `
# Prism Sales Playbook (Fallback)
- Program: Online Presence Transformation.
- Core services: website, design, SEO/maps, ads, analytics/attribution.
- ICP examples: dentists, consulting firms, online communities, nonprofits.
- Pricing policy: share honest bands only, never guarantees.
- Conversion rule: answer clearly, then suggest booking when fit is likely.
`

function sanitize(value: string, maxChars: number): string {
  return value
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/\s+/g, " ")
    .slice(0, maxChars)
}

function formatLeadContext(profile?: LeadProfile): string {
  if (!profile) {
    return "Lead profile: not captured yet."
  }

  const parts = [
    profile.role ? `role=${sanitize(profile.role, 50)}` : null,
    profile.businessType ? `businessType=${sanitize(profile.businessType, 80)}` : null,
    profile.goal ? `goal=${sanitize(profile.goal, 120)}` : null,
    profile.timeline ? `timeline=${sanitize(profile.timeline, 50)}` : null,
    profile.budgetBand ? `budgetBand=${sanitize(profile.budgetBand, 50)}` : null,
    profile.company ? `company=${sanitize(profile.company, 100)}` : null,
    profile.email ? `email=${sanitize(profile.email, 120)}` : null,
    profile.name ? `name=${sanitize(profile.name, 80)}` : null,
  ].filter(Boolean)

  return parts.length > 0 ? `Lead profile: ${parts.join(", ")}` : "Lead profile: not captured yet."
}

function formatConversationContext(conversationState?: ConversationState, requestedAction?: RequestedAction): string {
  const turns =
    typeof conversationState?.turns === "number" && Number.isFinite(conversationState.turns)
      ? conversationState.turns
      : 0

  return [
    `Conversation state: turns=${turns}, fitFlowStarted=${Boolean(conversationState?.fitFlowStarted)}, fitFlowCompleted=${Boolean(conversationState?.fitFlowCompleted)}, lastIntent=${conversationState?.lastIntent ?? "unknown"}`,
    `Requested action: ${requestedAction ?? "faq"}`,
  ].join("\n")
}

export function getSalesPlaybook(version: string): string {
  if (PLAYBOOK_CACHE.has(version)) {
    return PLAYBOOK_CACHE.get(version) ?? PLAYBOOK_FALLBACK
  }

  const playbookPath = join(process.cwd(), "content", "sales-chat", "playbook.md")
  if (!existsSync(playbookPath)) {
    PLAYBOOK_CACHE.set(version, PLAYBOOK_FALLBACK)
    return PLAYBOOK_FALLBACK
  }

  const content = readFileSync(playbookPath, "utf8").trim()
  const normalized = content.length > 0 ? content : PLAYBOOK_FALLBACK
  PLAYBOOK_CACHE.set(version, normalized)
  return normalized
}

export function buildSalesSystemPrompt({
  sourcePage,
  playbook,
  knownFacts,
  policyDirectives,
  leadProfile,
  conversationState,
  requestedAction,
}: BuildPromptInput): string {
  const safeSourcePage = sanitize(sourcePage, 120)

  return [
    "You are Prism's sales assistant for the Online Presence Transformation program.",
    "Primary goal: get qualified prospects to book a Prism demo.",
    "Secondary goal: answer pre-sales questions clearly and briefly.",
    "",
    "Response style contract:",
    "1) Keep every response to 3-4 sentences max (never over 6).",
    "2) Structure each response as direct answer -> one proof/example -> next action.",
    "3) If unsure: say \"I'm not sure about that detail; the team can cover it on a demo.\" then offer booking.",
    "4) Never invent guarantees, exact outcomes, or hidden pricing claims.",
    "5) Keep language plain, practical, and conversion-focused.",
    "",
    formatLeadContext(leadProfile),
    formatConversationContext(conversationState, requestedAction),
    "",
    `Source page context: ${safeSourcePage}`,
    "",
    "Prism known facts from runtime context:",
    knownFacts,
    "",
    "Playbook content:",
    playbook,
    "",
    policyDirectives,
    "",
    "Linking rules:",
    "- Use [Book a 30-min demo](#book-call) for booking CTA.",
    "- Use /case-studies when user asks for proof before booking.",
  ].join("\n")
}
