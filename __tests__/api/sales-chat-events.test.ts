const webhookFetch = jest.fn()

jest.mock("@/lib/supabase", () => ({
  supabaseAdmin: null,
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

describe("/api/sales-chat/events route", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    process.env.SALES_CHAT_EVENTS_WEBHOOK_URL = "https://hooks.example.com/events"
    process.env.SALES_CHAT_EVENTS_WEBHOOK_SECRET = "events-secret"
    webhookFetch.mockResolvedValue(new Response("ok", { status: 200 }))
    global.fetch = webhookFetch as unknown as typeof fetch
  })

  it("accepts deterministic spec event and signs webhook payload", async () => {
    const { POST } = await import("@/app/api/sales-chat/events/route")
    const response = await POST(new Request("https://example.com/api/sales-chat/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        eventName: "sales_chat_spec_node_entered",
        eventTs: "2026-03-01T00:00:00.000Z",
        metadata: { nodeId: "welcome" },
      }),
    }))

    expect(response.status).toBe(202)
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(webhookFetch).toHaveBeenCalledTimes(1)
    const [, init] = webhookFetch.mock.calls[0] as [string, RequestInit]
    const headers = new Headers(init.headers as HeadersInit)
    expect(headers.get("x-sales-chat-signature")).toBeTruthy()
  })

  it("accepts lead dispatch failure telemetry events", async () => {
    const { POST } = await import("@/app/api/sales-chat/events/route")
    const response = await POST(new Request("https://example.com/api/sales-chat/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        eventName: "sales_chat_lead_payload_failed",
        eventTs: "2026-03-01T00:00:00.000Z",
        metadata: { terminalAction: "emit_free_audit", leadDispatchCode: "webhook_http_error" },
      }),
    }))

    expect(response.status).toBe(202)
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(webhookFetch).toHaveBeenCalledTimes(1)
  })

  it("accepts quick-reply click telemetry events", async () => {
    const { POST } = await import("@/app/api/sales-chat/events/route")
    const response = await POST(new Request("https://example.com/api/sales-chat/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        eventName: "sales_chat_quick_reply_clicked",
        eventTs: "2026-03-01T00:00:00.000Z",
        metadata: {
          replyId: "starter_help_choose",
          replyLabel: "Help me figure out what's best",
          actionType: "reply",
        },
      }),
    }))

    expect(response.status).toBe(202)
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(webhookFetch).toHaveBeenCalledTimes(1)
  })

  it("returns 400 for invalid payload", async () => {
    const { POST } = await import("@/app/api/sales-chat/events/route")
    const response = await POST(new Request("https://example.com/api/sales-chat/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId: "short",
      }),
    }))

    expect(response.status).toBe(400)
  })
})
