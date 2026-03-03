import { type IncomingHttpHeaders } from "http"

const mockDispatchSalesChatLead = jest.fn()
const mockGenerateObject = jest.fn()
const mockCreateGateway = jest.fn()
const mockGatewayModelFactory = jest.fn()

jest.mock("@/lib/sales-chat/lead-dispatch", () => ({
  dispatchSalesChatLead: (...args: Array<unknown>) => mockDispatchSalesChatLead(...args),
}))

jest.mock("ai", () => ({
  generateObject: (...args: Array<unknown>) => mockGenerateObject(...args),
  createGateway: (...args: Array<unknown>) => mockCreateGateway(...args),
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
    mockGatewayModelFactory.mockReset()
    mockGenerateObject.mockReset()
    mockCreateGateway.mockReset()
    mockGatewayModelFactory.mockImplementation(() => ({ provider: "gateway-model" }))
    mockCreateGateway.mockImplementation(() => mockGatewayModelFactory)
    process.env.SALES_CHAT_ENABLED = "true"
    process.env.SALES_CHAT_BOOKING_URL = "https://cal.com/prism/demo"
    process.env.SALES_CHAT_WEBSITE_OVERHAUL_CHECKOUT_URL = "https://checkout.example.com/website"
    process.env.SALES_CHAT_GROWTH_PARTNERSHIP_SIGNUP_URL = "https://checkout.example.com/growth"
    process.env.SALES_CHAT_LEADS_WEBHOOK_URL = "https://hooks.example.com/sales"
    process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET = "secret"
    process.env.SALES_CHAT_AI_FALLBACK_ENABLED = "false"
    delete process.env.SALES_CHAT_AI_RESPONSE_MODE
    delete process.env.AI_GATEWAY_FALLBACK_MODELS
    delete process.env.AI_GATEWAY_PROVIDER_ORDER
    delete process.env.AI_GATEWAY_BASE_URL
    delete process.env.AI_GATEWAY_API_KEY
    delete process.env.AI_GATEWAY_MODEL
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

  it("returns 503 when custom lead webhook secret is missing", async () => {
    process.env.SALES_CHAT_LEADS_WEBHOOK_URL = "https://hooks.example.com/sales"
    delete process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET
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
    const payload = (await response.json()) as { errorType: string }
    expect(payload.errorType).toBe("config_missing")
    expect(response.headers.get("x-sales-chat-route")).toBe("config_missing")
  })

  it("allows Formspree lead webhook without secret", async () => {
    process.env.SALES_CHAT_LEADS_WEBHOOK_URL = "https://formspree.io/f/mvzbnydz"
    delete process.env.SALES_CHAT_LEADS_WEBHOOK_SECRET
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
    const payload = (await response.json()) as { nodeId: string }
    expect(payload.nodeId).toBe("welcome")
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
    expect(payload.assistantMessage).toContain("best way to grow your business online")
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
      responseMode: string
      leadDispatchStatus?: string
      conversationState: { convertedAction?: string }
    }

    expect(finalPayload.nodeId).toBe("intent_b_confirm")
    expect(finalPayload.terminalAction).toBe("emit_free_audit")
    expect(finalPayload.responseMode).toBe("deterministic")
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
      responseMode: string
      leadDispatchStatus?: string
      leadDispatchCode?: string
    }

    expect(finalPayload.terminalAction).toBe("emit_free_audit")
    expect(finalPayload.responseMode).toBe("deterministic")
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

  it("uses AI gateway long-tail fallback for unknown free-text prompts when enabled", async () => {
    process.env.SALES_CHAT_AI_FALLBACK_ENABLED = "true"
    process.env.SALES_CHAT_AI_RESPONSE_MODE = "long_tail"
    process.env.AI_GATEWAY_BASE_URL = "https://gateway.vercel.ai/v1"
    process.env.AI_GATEWAY_API_KEY = "gateway-secret"
    process.env.AI_GATEWAY_MODEL = "openai/gpt-5-mini"

    mockGenerateObject.mockResolvedValueOnce({
      object: {
        assistantMessage:
          "Great question. For your situation, the fastest path is a free expert audit so we can pinpoint what is limiting conversions right now. Want me to start that in under a minute?",
        recommendedOffer: "free_audit",
        shouldHandoff: false,
      },
    })

    const { POST } = await withChatRoute()

    const initResponse = await POST(
      makeRequest({
        sessionId: "session-ai-long-tail",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )
    const initPayload = (await initResponse.json()) as { conversationState: unknown }

    const response = await POST(
      makeRequest({
        sessionId: "session-ai-long-tail",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "How should I prioritize conversion fixes for app speed and messaging before paid traffic?",
        conversationState: initPayload.conversationState,
      }),
    )

    expect(response.status).toBe(200)
    expect(response.headers.get("x-sales-chat-route")).toBe("ai_fallback")
    const payload = (await response.json()) as {
      assistantMessage: string
      recommendedOffer?: string
      responseMode: string
      aiDecisionReason?: string
      aiModelUsed?: string
    }
    expect(payload.assistantMessage).toContain("free expert audit")
    expect(payload.recommendedOffer).toBe("free_audit")
    expect(payload.responseMode).toBe("ai_assisted")
    expect(payload.aiDecisionReason).toBe("long_tail_trigger")
    expect(payload.aiModelUsed).toBe("openai/gpt-5-mini")

    expect(mockCreateGateway).toHaveBeenCalledWith({
      baseURL: "https://gateway.vercel.ai/v1",
      apiKey: "gateway-secret",
    })
    expect(mockGatewayModelFactory).toHaveBeenCalledWith("openai/gpt-5-mini")
    expect(mockGenerateObject).toHaveBeenCalledTimes(1)
  })

  it("keeps deterministic fallback when AI output violates pricing guardrails", async () => {
    process.env.SALES_CHAT_AI_FALLBACK_ENABLED = "true"
    process.env.SALES_CHAT_AI_RESPONSE_MODE = "long_tail"
    process.env.AI_GATEWAY_BASE_URL = "https://gateway.vercel.ai/v1"
    process.env.AI_GATEWAY_API_KEY = "gateway-secret"
    process.env.AI_GATEWAY_MODEL = "openai/gpt-5-mini"

    mockGenerateObject.mockResolvedValueOnce({
      object: {
        assistantMessage:
          "We can start at $900/mo and scale later. Want me to send you details for the lower plan?",
        recommendedOffer: "growth_partnership",
        shouldHandoff: false,
      },
    })

    const { POST } = await withChatRoute()

    const initResponse = await POST(
      makeRequest({
        sessionId: "session-ai-guardrail",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )
    const initPayload = (await initResponse.json()) as { conversationState: unknown }

    const response = await POST(
      makeRequest({
        sessionId: "session-ai-guardrail",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "How should I prioritize app instrumentation for event taxonomies?",
        conversationState: initPayload.conversationState,
      }),
    )

    expect(response.status).toBe(200)
    expect(response.headers.get("x-sales-chat-route")).toBe("success")
    const payload = (await response.json()) as {
      assistantMessage: string
      responseMode: string
      aiDecisionReason?: string
    }
    expect(payload.assistantMessage).toContain("Could you rephrase")
    expect(payload.assistantMessage).not.toContain("$900")
    expect(payload.responseMode).toBe("deterministic")
    expect(payload.aiDecisionReason).toBe("guardrail_reject")
  })

  it("repairs pricing drift with a second gateway pass and still returns AI-assisted copy", async () => {
    process.env.SALES_CHAT_AI_FALLBACK_ENABLED = "true"
    process.env.SALES_CHAT_AI_RESPONSE_MODE = "long_tail"
    process.env.AI_GATEWAY_BASE_URL = "https://gateway.vercel.ai/v1"
    process.env.AI_GATEWAY_API_KEY = "gateway-secret"
    process.env.AI_GATEWAY_MODEL = "openai/gpt-5-mini"

    mockGenerateObject
      .mockResolvedValueOnce({
        object: {
          assistantMessage:
            "We can start at $900/mo and move up as needed once campaigns are stable. Want me to send a quick starter plan?",
          recommendedOffer: "growth_partnership",
          shouldHandoff: false,
        },
      })
      .mockResolvedValueOnce({
        object: {
          assistantMessage:
            "Great direction. For ongoing growth support, the Growth Partnership is $2,000/month and includes weekly optimization. Want me to map the first 30 days for you?",
          recommendedOffer: "growth_partnership",
          shouldHandoff: false,
        },
      })

    const { POST } = await withChatRoute()

    const initResponse = await POST(
      makeRequest({
        sessionId: "session-ai-guardrail-repair",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )
    const initPayload = (await initResponse.json()) as { conversationState: unknown }

    const response = await POST(
      makeRequest({
        sessionId: "session-ai-guardrail-repair",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "How should I prioritize app instrumentation for event taxonomies?",
        conversationState: initPayload.conversationState,
      }),
    )

    expect(response.status).toBe(200)
    expect(response.headers.get("x-sales-chat-route")).toBe("ai_fallback")
    const payload = (await response.json()) as {
      assistantMessage: string
      responseMode: string
      aiDecisionReason?: string
    }
    expect(payload.assistantMessage).toContain("$2,000/month")
    expect(payload.assistantMessage).not.toContain("$900")
    expect(payload.responseMode).toBe("ai_assisted")
    expect(payload.aiDecisionReason).toBe("long_tail_trigger")
    expect(mockGenerateObject).toHaveBeenCalledTimes(2)
  })

  it("uses broad mode and forwards gateway fallback/provider-order options", async () => {
    process.env.SALES_CHAT_AI_FALLBACK_ENABLED = "true"
    process.env.SALES_CHAT_AI_RESPONSE_MODE = "broad"
    process.env.AI_GATEWAY_BASE_URL = "https://gateway.vercel.ai/v1"
    process.env.AI_GATEWAY_API_KEY = "gateway-secret"
    process.env.AI_GATEWAY_MODEL = "openai/gpt-5-mini"
    process.env.AI_GATEWAY_FALLBACK_MODELS = "openai/gpt-5, openai/gpt-4.1-mini"
    process.env.AI_GATEWAY_PROVIDER_ORDER = "openai, anthropic"

    mockGenerateObject.mockResolvedValueOnce({
      object: {
        assistantMessage:
          "Great context. The fastest personalized next step is a free expert audit so we can prioritize your conversion bottlenecks before you scale paid traffic. Want me to set that up now?",
        recommendedOffer: "free_audit",
        shouldHandoff: false,
      },
    })

    const { POST } = await withChatRoute()
    const initResponse = await POST(
      makeRequest({
        sessionId: "session-ai-broad",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )
    const initPayload = (await initResponse.json()) as { conversationState: unknown }

    const response = await POST(
      makeRequest({
        sessionId: "session-ai-broad",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "Can you help me prioritize conversion messaging and content sequencing?",
        conversationHistory: [
          { role: "assistant", content: "Welcome to Prism. What are you trying to improve first?" },
          { role: "user", content: "I've been burning money on ads with weak conversion pages." },
        ],
        conversationState: initPayload.conversationState,
      }),
    )

    expect(response.status).toBe(200)
    expect(response.headers.get("x-sales-chat-route")).toBe("ai_fallback")
    const payload = (await response.json()) as {
      responseMode: string
      aiDecisionReason?: string
      aiModelUsed?: string
    }
    expect(payload.responseMode).toBe("ai_assisted")
    expect(payload.aiDecisionReason).toBe("broad_mode")
    expect(payload.aiModelUsed).toBe("openai/gpt-5-mini")

    expect(mockGenerateObject).toHaveBeenCalledTimes(1)
    const generateCall = mockGenerateObject.mock.calls[0]?.[0] as {
      prompt?: string
      providerOptions?: { gateway?: { models?: string[]; order?: string[] } }
    }
    expect(generateCall.prompt).toContain("Recent transcript window:")
    expect(generateCall.prompt).toContain("I've been burning money on ads with weak conversion pages.")
    expect(generateCall.providerOptions?.gateway?.models).toEqual([
      "openai/gpt-5",
      "openai/gpt-4.1-mini",
    ])
    expect(generateCall.providerOptions?.gateway?.order).toEqual(["openai", "anthropic"])
  })

  it("rejects semantic offer mismatch for node intent and exposes semantic guardrail code", async () => {
    process.env.SALES_CHAT_AI_FALLBACK_ENABLED = "true"
    process.env.SALES_CHAT_AI_RESPONSE_MODE = "long_tail"
    process.env.AI_GATEWAY_BASE_URL = "https://gateway.vercel.ai/v1"
    process.env.AI_GATEWAY_API_KEY = "gateway-secret"
    process.env.AI_GATEWAY_MODEL = "openai/gpt-5-mini"

    mockGenerateObject
      .mockResolvedValueOnce({
        object: {
          assistantMessage:
            "Given what you've shared, I'd skip the audit and jump straight to our Growth Partnership at $2,000/month. Want me to send that signup now?",
          recommendedOffer: "growth_partnership",
          shouldHandoff: false,
        },
      })
      .mockResolvedValueOnce({
        object: {
          assistantMessage:
            "Best move is still the Growth Partnership at $2,000/month so we can run everything for you. Should I send the signup link now?",
          recommendedOffer: "growth_partnership",
          shouldHandoff: false,
        },
      })

    const { POST } = await withChatRoute()

    const initResponse = await POST(
      makeRequest({
        sessionId: "session-ai-semantic-guardrail",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )
    const initPayload = (await initResponse.json()) as { conversationState: unknown }

    const response = await POST(
      makeRequest({
        sessionId: "session-ai-semantic-guardrail",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "Can you review my website and tell me what to fix first?",
        conversationState: {
          ...(initPayload.conversationState as Record<string, unknown>),
          nodeId: "intent_b_pitch",
        },
      }),
    )

    expect(response.status).toBe(200)
    expect(response.headers.get("x-sales-chat-route")).toBe("success")
    const payload = (await response.json()) as {
      responseMode: string
      aiDecisionReason?: string
      aiGuardrailCode?: string
      aiPromptVersion?: string
      aiRepairAttempted?: boolean
    }
    expect(payload.responseMode).toBe("deterministic")
    expect(payload.aiDecisionReason).toBe("guardrail_reject")
    expect(payload.aiGuardrailCode).toBe("semantic_mismatch")
    expect(payload.aiPromptVersion).toBe("v3_node_context_history")
    expect(payload.aiRepairAttempted).toBe(true)
    expect(mockGenerateObject).toHaveBeenCalledTimes(2)
  })

  it("keeps deterministic response when gateway call throws and exposes diagnostic reason", async () => {
    process.env.SALES_CHAT_AI_FALLBACK_ENABLED = "true"
    process.env.SALES_CHAT_AI_RESPONSE_MODE = "broad"
    process.env.AI_GATEWAY_BASE_URL = "https://gateway.vercel.ai/v1"
    process.env.AI_GATEWAY_API_KEY = "gateway-secret"
    process.env.AI_GATEWAY_MODEL = "openai/gpt-5-mini"

    mockGenerateObject.mockRejectedValueOnce(new Error("gateway down"))

    const { POST } = await withChatRoute()
    const initResponse = await POST(
      makeRequest({
        sessionId: "session-ai-gateway-error",
        sourcePage: "/get-started",
        inputType: "button",
        inputValue: "",
        buttonId: "__init__",
      }),
    )
    const initPayload = (await initResponse.json()) as { conversationState: unknown }

    const response = await POST(
      makeRequest({
        sessionId: "session-ai-gateway-error",
        sourcePage: "/get-started",
        inputType: "text",
        inputValue: "How would you sequence website fixes vs ad spend?",
        conversationState: initPayload.conversationState,
      }),
    )

    expect(response.status).toBe(200)
    expect(response.headers.get("x-sales-chat-route")).toBe("success")
    const payload = (await response.json()) as {
      responseMode: string
      aiDecisionReason?: string
      aiModelUsed?: string
    }
    expect(payload.responseMode).toBe("deterministic")
    expect(payload.aiDecisionReason).toBe("gateway_error")
    expect(payload.aiModelUsed).toBe("openai/gpt-5-mini")
  })
})
