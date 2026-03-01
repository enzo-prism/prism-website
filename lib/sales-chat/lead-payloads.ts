import type { SalesChatConversationState, TerminalAction } from "@/lib/sales-chat/spec-v1-types"

type RoutingMetadata = {
  slackChannel: string
  notionCategory: string
  priority: "high" | "medium" | "low"
  emailTarget: string
}

type BaseLeadPayload = {
  source_page: string
  timestamp: string
  routing: RoutingMetadata
}

export type FreeAuditLeadPayload = BaseLeadPayload & {
  lead_type: "free_audit"
  website_url: string
  business_type: string
  pain_point: string
  email: string
  also_booked_call: boolean
  chat_transcript_summary: string
}

export type WebsiteOverhaulLeadPayload = BaseLeadPayload & {
  lead_type: "website_overhaul_purchase"
  payment_status: "pending" | "completed"
  has_existing_site: boolean
  existing_url: string
  estimated_pages: string
  primary_goal: string
  business_name: string
  brand_assets: string
  email: string
  chat_transcript_summary: string
}

export type GrowthPartnershipLeadPayload = BaseLeadPayload & {
  lead_type: "growth_partnership"
  action_taken: "booked_call" | "direct_signup"
  business_type: string
  website_url: string
  primary_goal: string
  timeline: string
  email: string
  chat_transcript_summary: string
}

export type SalesChatLeadPayload =
  | FreeAuditLeadPayload
  | WebsiteOverhaulLeadPayload
  | GrowthPartnershipLeadPayload

type BuildLeadPayloadInput = {
  terminalAction: TerminalAction
  state: SalesChatConversationState
  sourcePage: string
  nowIso: string
  latestUserInput: string
}

function buildTranscriptSummary(input: BuildLeadPayloadInput): string {
  const { memory } = input.state
  const parts = [
    memory.businessType ? `business_type=${memory.businessType}` : "",
    memory.websiteUrl ? `website=${memory.websiteUrl}` : "",
    memory.primaryGoal ? `goal=${memory.primaryGoal}` : "",
    memory.painPoint ? `pain=${memory.painPoint}` : "",
    input.latestUserInput ? `latest_input=${input.latestUserInput}` : "",
  ].filter(Boolean)
  return parts.join(" | ").slice(0, 1200)
}

function basePayload(input: BuildLeadPayloadInput, notionCategory: string, priority: RoutingMetadata["priority"]): BaseLeadPayload {
  return {
    source_page: input.sourcePage,
    timestamp: input.nowIso,
    routing: {
      slackChannel: "#sales-leads",
      notionCategory,
      priority,
      emailTarget: "team@design-prism.com",
    },
  }
}

export function buildLeadPayload(input: BuildLeadPayloadInput): SalesChatLeadPayload | null {
  const { terminalAction, state } = input
  const memory = state.memory
  const summary = buildTranscriptSummary(input)

  if (terminalAction === "emit_free_audit") {
    return {
      ...basePayload(input, "free_audit", "low"),
      lead_type: "free_audit",
      website_url: memory.websiteUrl ?? "",
      business_type: memory.businessType ?? "",
      pain_point: memory.painPoint ?? "",
      email: memory.email ?? "",
      also_booked_call: Boolean(memory.alsoBookedCall),
      chat_transcript_summary: summary,
    }
  }

  if (terminalAction === "emit_website_overhaul") {
    return {
      ...basePayload(input, "website_overhaul", "medium"),
      lead_type: "website_overhaul_purchase",
      payment_status: memory.actionTaken === "pay_now" ? "completed" : "pending",
      has_existing_site: Boolean(memory.hasExistingSite),
      existing_url: memory.existingUrl ?? memory.websiteUrl ?? "",
      estimated_pages: memory.estimatedPages ?? "",
      primary_goal: memory.primaryGoal ?? "",
      business_name: memory.businessName ?? "",
      brand_assets: memory.brandAssets ?? "",
      email: memory.email ?? "",
      chat_transcript_summary: summary,
    }
  }

  if (terminalAction === "emit_growth_partnership") {
    return {
      ...basePayload(input, "growth_partnership", "high"),
      lead_type: "growth_partnership",
      action_taken: memory.actionTaken === "direct_signup" ? "direct_signup" : "booked_call",
      business_type: memory.businessType ?? "",
      website_url: memory.websiteUrl ?? "",
      primary_goal: memory.primaryGoal ?? "",
      timeline: memory.timeline ?? "",
      email: memory.email ?? "",
      chat_transcript_summary: summary,
    }
  }

  return null
}
