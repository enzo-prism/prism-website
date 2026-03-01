import { type IncomingHttpHeaders } from "http"

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

type ChatRouteModule = typeof import("@/app/api/chat/route")

const withChatRoute = async (): Promise<ChatRouteModule> => import("@/app/api/chat/route")

const makeRequest = (body: unknown, headers?: IncomingHttpHeaders) => {
  const headerMap = new Map<string, string>()
  const mergedHeaders = {
    "content-type": "application/json",
    "x-forwarded-for": "203.0.113.55",
    ...headers,
  }

  for (const [key, value] of Object.entries(mergedHeaders)) {
    if (typeof value === "string") {
      headerMap.set(key.toLowerCase(), value)
    }
  }

  return {
    headers: {
      get(name: string) {
        return headerMap.get(name.toLowerCase()) ?? null
      },
    },
    async json() {
      return body
    },
  } as Request
}

describe("/api/chat route (deterministic v2)", () => {
  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    process.env.SALES_CHAT_ENABLED = "true"
    process.env.SALES_CHAT_BOOKING_URL = "https://cal.com/prism/demo"
    process.env.SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL = "https://checkout.example.com/website"
    process.env.SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL = "https://checkout.example.com/growth"
    process.env.SALES_CHAT_LEADS_WEBHOOK_URL = "https://hooks.example.com/sales"
    process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET = "secret"
  })

  it("returns 400 for invalid payload", async () => {
    const { POST } = await withChatRoute()
    const response = await POST(makeRequest({ bad: "payload" }))

    expect(response.status).toBe(400)
    const payload = (await response.json()) as { error: string; fallbackToHuman?: boolean; errorType?: string }
    expect(payload.fallbackToHuman).toBe(true)
    expect(payload.errorType).toBe("invalid_request")
    expect(response.headers.get("x-sales-chat-route")).toBe("invalid_request")
  })

  it("returns 503 when chat is disabled", async () => {
    process.env.SALES_CHAT_ENABLED = "false"
    const { POST } = await withChatRoute()

    const response = await POST(
      makeRequest({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )

    expect(response.status).toBe(503)
    const payload = (await response.json()) as { error: string; errorType: string }
    expect(payload.errorType).toBe("disabled")
    expect(payload.error).not.toContain("Sales chat is not fully configured yet")
    expect(response.headers.get("x-sales-chat-route")).toBe("disabled")
  })

  it("returns 503 when deterministic config is missing", async () => {
    delete process.env.SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL
    const { POST } = await withChatRoute()

    const response = await POST(
      makeRequest({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )

    expect(response.status).toBe(503)
    const payload = (await response.json()) as { error: string; errorType: string }
    expect(payload.errorType).toBe("config_missing")
    expect(payload.error).not.toContain("Sales chat is not fully configured yet")
    expect(response.headers.get("x-sales-chat-route")).toBe("config_missing")
  })

  it("returns welcome payload with starter buttons on init", async () => {
    const { POST } = await withChatRoute()

    const response = await POST(
      makeRequest({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )

    expect(response.status).toBe(200)
    expect(response.headers.get("x-sales-chat-route")).toBe("success")

    const payload = (await response.json()) as {
      nodeId: string
      quickReplies: Array<{ id: string; label: string }>
      assistantMessage: string
      conversationState: { exchangeCount: number }
    }

    expect(payload.nodeId).toBe("welcome")
    expect(payload.quickReplies).toHaveLength(5)
    expect(payload.quickReplies[0]?.id).toBe("starter_free_audit")
    expect(payload.assistantMessage).toContain("fastest way to grow your business online")
    expect(payload.conversationState.exchangeCount).toBe(0)
  })

  it("routes starter buttons deterministically", async () => {
    const { POST } = await withChatRoute()

    const welcomeResponse = await POST(
      makeRequest({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )
    const welcome = (await welcomeResponse.json()) as { conversationState: unknown }

    const response = await POST(
      makeRequest({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "Get a free audit of my website",
        buttonId: "starter_free_audit",
        conversationState: welcome.conversationState,
      }),
    )

    expect(response.status).toBe(200)
    const payload = (await response.json()) as { nodeId: string; recommendedOffer?: string }
    expect(payload.nodeId).toBe("intent_b_pitch")
    expect(payload.recommendedOffer).toBe("free_audit")
  })

  it("emits free audit terminal action and dispatches lead payload", async () => {
    const { POST } = await withChatRoute()

    const step1 = await POST(
      makeRequest({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )
    const state1 = (await step1.json()) as { conversationState: unknown }

    const step2 = await POST(
      makeRequest({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "Get a free audit of my website",
        buttonId: "starter_free_audit",
        conversationState: state1.conversationState,
      }),
    )
    const state2 = (await step2.json()) as { conversationState: unknown }

    const step3 = await POST(
      makeRequest({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "example.com",
        conversationState: state2.conversationState,
      }),
    )
    const state3 = (await step3.json()) as { conversationState: unknown }

    const step4 = await POST(
      makeRequest({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "Dental / medical",
        buttonId: "b_business_dental",
        conversationState: state3.conversationState,
      }),
    )
    const state4 = (await step4.json()) as { conversationState: unknown }

    const step5 = await POST(
      makeRequest({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "Not enough qualified leads.",
        conversationState: state4.conversationState,
      }),
    )
    const state5 = (await step5.json()) as { conversationState: unknown }

    const finalResponse = await POST(
      makeRequest({
        sessionId: "session-12345678",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "owner@example.com",
        conversationState: state5.conversationState,
      }),
    )

    const finalPayload = (await finalResponse.json()) as {
      nodeId: string
      terminalAction: string
      leadDispatchStatus?: string
      conversationState: { convertedAction?: string }
    }

    expect(finalPayload.nodeId).toBe("intent_b_confirm")
    expect(finalPayload.terminalAction).toBe("emit_free_audit")
    expect(finalPayload.leadDispatchStatus).toBe("succeeded")
    expect(finalPayload.conversationState.convertedAction).toBe("free_audit")
    expect(mockDispatchSalesChatLead).toHaveBeenCalledTimes(1)
  })

  it("returns leadDispatchStatus=failed while keeping chat response successful when lead dispatch fails", async () => {
    mockDispatchSalesChatLead.mockRejectedValueOnce(new Error("Lead webhook failed (503): down"))
    const { POST } = await withChatRoute()

    const step1 = await POST(
      makeRequest({
        sessionId: "session-failed-dispatch",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )
    const state1 = (await step1.json()) as { conversationState: unknown }

    const step2 = await POST(
      makeRequest({
        sessionId: "session-failed-dispatch",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "Get a free audit of my website",
        buttonId: "starter_free_audit",
        conversationState: state1.conversationState,
      }),
    )
    const state2 = (await step2.json()) as { conversationState: unknown }

    const step3 = await POST(
      makeRequest({
        sessionId: "session-failed-dispatch",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "example.com",
        conversationState: state2.conversationState,
      }),
    )
    const state3 = (await step3.json()) as { conversationState: unknown }

    const step4 = await POST(
      makeRequest({
        sessionId: "session-failed-dispatch",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "Dental / medical",
        buttonId: "b_business_dental",
        conversationState: state3.conversationState,
      }),
    )
    const state4 = (await step4.json()) as { conversationState: unknown }

    const step5 = await POST(
      makeRequest({
        sessionId: "session-failed-dispatch",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "No consistent qualified leads",
        conversationState: state4.conversationState,
      }),
    )
    const state5 = (await step5.json()) as { conversationState: unknown }

    const finalResponse = await POST(
      makeRequest({
        sessionId: "session-failed-dispatch",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "owner@example.com",
        conversationState: state5.conversationState,
      }),
    )

    expect(finalResponse.status).toBe(200)
    const finalPayload = (await finalResponse.json()) as {
      terminalAction: string
      leadDispatchStatus?: string
      leadDispatchCode?: string
    }

    expect(finalPayload.terminalAction).toBe("emit_free_audit")
    expect(finalPayload.leadDispatchStatus).toBe("failed")
    expect(finalPayload.leadDispatchCode).toBe("webhook_http_error")
    expect(mockDispatchSalesChatLead).toHaveBeenCalledTimes(1)
  })

  it("suppresses duplicate terminal lead dispatch attempts for same state fingerprint", async () => {
    const { POST } = await withChatRoute()

    const step1 = await POST(
      makeRequest({
        sessionId: "session-dedupe",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )
    const state1 = (await step1.json()) as { conversationState: unknown }

    const step2 = await POST(
      makeRequest({
        sessionId: "session-dedupe",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "Get a free audit of my website",
        buttonId: "starter_free_audit",
        conversationState: state1.conversationState,
      }),
    )
    const state2 = (await step2.json()) as { conversationState: unknown }

    const step3 = await POST(
      makeRequest({
        sessionId: "session-dedupe",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "example.com",
        conversationState: state2.conversationState,
      }),
    )
    const state3 = (await step3.json()) as { conversationState: unknown }

    const step4 = await POST(
      makeRequest({
        sessionId: "session-dedupe",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "Dental / medical",
        buttonId: "b_business_dental",
        conversationState: state3.conversationState,
      }),
    )
    const state4 = (await step4.json()) as { conversationState: unknown }

    const step5 = await POST(
      makeRequest({
        sessionId: "session-dedupe",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "Need more conversions",
        conversationState: state4.conversationState,
      }),
    )
    const state5 = (await step5.json()) as { conversationState: unknown }

    const firstFinalResponse = await POST(
      makeRequest({
        sessionId: "session-dedupe",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "owner@example.com",
        conversationState: state5.conversationState,
      }),
    )
    const firstPayload = (await firstFinalResponse.json()) as {
      leadDispatchStatus?: string
      leadDispatchCode?: string
    }

    const secondFinalResponse = await POST(
      makeRequest({
        sessionId: "session-dedupe",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "owner@example.com",
        conversationState: state5.conversationState,
      }),
    )
    const secondPayload = (await secondFinalResponse.json()) as {
      leadDispatchStatus?: string
      leadDispatchCode?: string
    }

    expect(firstPayload.leadDispatchStatus).toBe("succeeded")
    expect(secondPayload.leadDispatchStatus).toBe("none")
    expect(secondPayload.leadDispatchCode).toBe("duplicate_suppressed")
    expect(mockDispatchSalesChatLead).toHaveBeenCalledTimes(1)
  })
})
