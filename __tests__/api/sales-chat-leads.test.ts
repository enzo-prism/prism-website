const mockDispatchSalesChatLead = jest.fn()

jest.mock("@/lib/sales-chat/lead-dispatch", () => ({
  dispatchSalesChatLead: (...args: Array<unknown>) => mockDispatchSalesChatLead(...args),
}))

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
  beforeEach(() => {
    jest.clearAllMocks()
    mockDispatchSalesChatLead.mockResolvedValue(undefined)
  })

  it("forwards valid payload to lead dispatcher", async () => {
    const { POST } = await import("@/app/api/sales-chat/leads/route")

    const response = await POST(new Request("https://example.com/api/sales-chat/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(freeAuditPayload),
    }))

    expect(response.status).toBe(202)
    expect(mockDispatchSalesChatLead).toHaveBeenCalledTimes(1)
    expect(mockDispatchSalesChatLead).toHaveBeenCalledWith(freeAuditPayload)
  })

  it("returns 400 for invalid payload", async () => {
    const { POST } = await import("@/app/api/sales-chat/leads/route")

    const response = await POST(new Request("https://example.com/api/sales-chat/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lead_type: "free_audit" }),
    }))

    expect(response.status).toBe(400)
    expect(mockDispatchSalesChatLead).not.toHaveBeenCalled()
  })

  it("returns 503 when lead dispatcher fails", async () => {
    mockDispatchSalesChatLead.mockRejectedValueOnce(new Error("webhook down"))
    const { POST } = await import("@/app/api/sales-chat/leads/route")

    const response = await POST(new Request("https://example.com/api/sales-chat/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(freeAuditPayload),
    }))

    expect(response.status).toBe(503)
  })
})
