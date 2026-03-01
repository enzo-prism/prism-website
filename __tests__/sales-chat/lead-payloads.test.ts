import { buildLeadPayload } from "@/lib/sales-chat/lead-payloads"
import type { SalesChatConversationState } from "@/lib/sales-chat/spec-v1-types"

function buildState(overrides?: Partial<SalesChatConversationState>): SalesChatConversationState {
  return {
    nodeId: "intent_b_confirm",
    exchangeCount: 4,
    memory: {
      websiteUrl: "https://example.com",
      businessType: "Dental / medical",
      painPoint: "Need more patient leads",
      email: "owner@example.com",
      hasExistingSite: true,
      estimatedPages: "5-7 pages",
      primaryGoal: "More qualified leads",
      actionTaken: "booked_call",
      ...overrides?.memory,
    },
    convertedAction: overrides?.convertedAction,
    ...overrides,
  }
}

describe("lead payload builders", () => {
  it("builds free audit payload contract", () => {
    const payload = buildLeadPayload({
      terminalAction: "emit_free_audit",
      state: buildState(),
      sourcePage: "/get-started",
      nowIso: "2026-03-01T00:00:00.000Z",
      latestUserInput: "owner@example.com",
    })

    expect(payload).not.toBeNull()
    if (!payload || payload.lead_type !== "free_audit") {
      throw new Error("Expected free_audit payload")
    }

    expect(payload.website_url).toBe("https://example.com")
    expect(payload.business_type).toBe("Dental / medical")
    expect(payload.routing.priority).toBe("low")
    expect(payload.routing.slackChannel).toBe("#sales-leads")
  })

  it("builds website overhaul payload contract", () => {
    const payload = buildLeadPayload({
      terminalAction: "emit_website_overhaul",
      state: buildState({
        memory: {
          actionTaken: "pay_now",
          businessName: "Acme Dental",
          brandAssets: "Has logo + brand colors",
        },
      }),
      sourcePage: "/get-started",
      nowIso: "2026-03-01T00:00:00.000Z",
      latestUserInput: "Payment complete",
    })

    expect(payload).not.toBeNull()
    if (!payload || payload.lead_type !== "website_overhaul_purchase") {
      throw new Error("Expected website_overhaul_purchase payload")
    }

    expect(payload.payment_status).toBe("completed")
    expect(payload.routing.priority).toBe("medium")
    expect(payload.business_name).toBe("Acme Dental")
  })

  it("builds growth partnership payload contract", () => {
    const payload = buildLeadPayload({
      terminalAction: "emit_growth_partnership",
      state: buildState({
        memory: {
          actionTaken: "direct_signup",
          timeline: "next 90 days",
        },
      }),
      sourcePage: "/get-started",
      nowIso: "2026-03-01T00:00:00.000Z",
      latestUserInput: "I want to grow fast.",
    })

    expect(payload).not.toBeNull()
    if (!payload || payload.lead_type !== "growth_partnership") {
      throw new Error("Expected growth_partnership payload")
    }

    expect(payload.action_taken).toBe("direct_signup")
    expect(payload.routing.priority).toBe("high")
    expect(payload.timeline).toBe("next 90 days")
  })
})
