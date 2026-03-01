import { createHmac } from "node:crypto"

jest.mock("next/server", () => ({
  NextResponse: {
    json(payload: unknown, init?: ResponseInit) {
      const headers = new Headers(init?.headers)
      if (!headers.has("content-type")) {
        headers.set("content-type", "application/json")
      }
      return new Response(JSON.stringify(payload), {
        status: init?.status ?? 200,
        headers,
      })
    },
  },
}))

const freeAuditPayload = {
  lead_type: "free_audit",
  website_url: "https://example.com",
  business_type: "Dental / medical",
  pain_point: "Need more leads",
  email: "owner@example.com",
  also_booked_call: false,
  chat_transcript_summary: "summary",
  source_page: "/get-started",
  timestamp: "2026-03-01T00:00:00.000Z",
  routing: {
    slackChannel: "#sales-leads",
    notionCategory: "free_audit",
    priority: "low",
    emailTarget: "team@design-prism.com",
  },
} as const

describe("/api/sales-chat/leads route", () => {
  const originalSecret = process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET

  afterEach(() => {
    process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET = originalSecret
  })

  it("accepts valid payload without signature when secret is not configured", async () => {
    delete process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET
    const { POST } = await import("@/app/api/sales-chat/leads/route")

    const response = await POST(new Request("https://example.com/api/sales-chat/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(freeAuditPayload),
    }))

    expect(response.status).toBe(202)
  })

  it("returns 400 for invalid payload", async () => {
    delete process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET
    const { POST } = await import("@/app/api/sales-chat/leads/route")

    const response = await POST(new Request("https://example.com/api/sales-chat/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lead_type: "free_audit" }),
    }))

    expect(response.status).toBe(400)
  })

  it("rejects payload when signature is missing or invalid and secret is configured", async () => {
    process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET = "test-secret"
    const { POST } = await import("@/app/api/sales-chat/leads/route")
    const payload = JSON.stringify(freeAuditPayload)

    const missingSignatureResponse = await POST(new Request("https://example.com/api/sales-chat/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
    }))

    expect(missingSignatureResponse.status).toBe(401)

    const invalidSignatureResponse = await POST(new Request("https://example.com/api/sales-chat/leads", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-sales-chat-signature": "invalid-signature",
      },
      body: payload,
    }))

    expect(invalidSignatureResponse.status).toBe(401)
  })

  it("accepts payload with valid signature when secret is configured", async () => {
    process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET = "test-secret"
    const { POST } = await import("@/app/api/sales-chat/leads/route")
    const payload = JSON.stringify(freeAuditPayload)
    const signature = createHmac("sha256", process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET)
      .update(payload)
      .digest("hex")

    const response = await POST(new Request("https://example.com/api/sales-chat/leads", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-sales-chat-signature": signature,
      },
      body: payload,
    }))

    expect(response.status).toBe(202)
  })
})
