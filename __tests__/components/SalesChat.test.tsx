import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import SalesChat from "@/components/SalesChat"
import { HANDOFF_FALLBACK_MESSAGE } from "@/components/sales-chat/constants"
import type { SalesChatApiResponse } from "@/components/sales-chat/types"

const mockTrackSalesChatOpen = jest.fn()
const mockTrackSalesChatOpenMode = jest.fn()
const mockTrackSalesChatLauncherClick = jest.fn()
const mockTrackSalesChatMessageSent = jest.fn()
const mockTrackSalesChatError = jest.fn()
const mockTrackSalesChatWelcomeSeen = jest.fn()
const mockTrackSalesChatDemoCtaShown = jest.fn()
const mockTrackSalesChatDemoCtaClicked = jest.fn()
const mockTrackSalesChatCalendarOpened = jest.fn()
const mockTrackSalesChatQuickReplyClicked = jest.fn()
const mockTrackSalesChatSpecNodeEntered = jest.fn()
const mockTrackSalesChatOfferRecommended = jest.fn()
const mockTrackSalesChatLeadPayloadAttempted = jest.fn()
const mockTrackSalesChatLeadPayloadEmitted = jest.fn()
const mockTrackSalesChatLeadPayloadFailed = jest.fn()

jest.mock("@/utils/analytics", () => ({
  trackSalesChatOpen: (...args: Array<unknown>) => mockTrackSalesChatOpen(...args),
  trackSalesChatOpenMode: (...args: Array<unknown>) => mockTrackSalesChatOpenMode(...args),
  trackSalesChatLauncherClick: (...args: Array<unknown>) => mockTrackSalesChatLauncherClick(...args),
  trackSalesChatMessageSent: (...args: Array<unknown>) => mockTrackSalesChatMessageSent(...args),
  trackSalesChatError: (...args: Array<unknown>) => mockTrackSalesChatError(...args),
  trackSalesChatWelcomeSeen: (...args: Array<unknown>) => mockTrackSalesChatWelcomeSeen(...args),
  trackSalesChatDemoCtaShown: (...args: Array<unknown>) => mockTrackSalesChatDemoCtaShown(...args),
  trackSalesChatDemoCtaClicked: (...args: Array<unknown>) => mockTrackSalesChatDemoCtaClicked(...args),
  trackSalesChatCalendarOpened: (...args: Array<unknown>) => mockTrackSalesChatCalendarOpened(...args),
  trackSalesChatQuickReplyClicked: (...args: Array<unknown>) => mockTrackSalesChatQuickReplyClicked(...args),
  trackSalesChatSpecNodeEntered: (...args: Array<unknown>) => mockTrackSalesChatSpecNodeEntered(...args),
  trackSalesChatOfferRecommended: (...args: Array<unknown>) => mockTrackSalesChatOfferRecommended(...args),
  trackSalesChatLeadPayloadAttempted: (...args: Array<unknown>) => mockTrackSalesChatLeadPayloadAttempted(...args),
  trackSalesChatLeadPayloadEmitted: (...args: Array<unknown>) => mockTrackSalesChatLeadPayloadEmitted(...args),
  trackSalesChatLeadPayloadFailed: (...args: Array<unknown>) => mockTrackSalesChatLeadPayloadFailed(...args),
}))

jest.mock("next/link", () => ({
  __esModule: true,
  default: function MockNextLink({
    href,
    children,
    ...props
  }: {
    href: string
    children: React.ReactNode
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
}))

jest.mock("@/components/BookDemoEmbed", () => ({
  __esModule: true,
  default: function MockBookDemoEmbed() {
    return <section data-testid="book-demo-embed-inline" />
  },
}))

const fetchSpy = jest.spyOn(global, "fetch")

type MemoryStorage = {
  clear: () => void
  getItem: (key: string) => string | null
  key: (index: number) => string | null
  length: number
  removeItem: (key: string) => void
  setItem: (key: string, value: string) => void
}

const createMemoryStorage = (): MemoryStorage => {
  const store = new Map<string, string>()
  return {
    clear() {
      store.clear()
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null
    },
    get length() {
      return store.size
    },
    removeItem(key: string) {
      store.delete(key)
    },
    setItem(key: string, value: string) {
      store.set(key, String(value))
    },
  }
}

const setViewport = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  })
  window.dispatchEvent(new Event("resize"))
}

const getFetchUrl = (input: RequestInfo | URL): string => {
  if (typeof input === "string") {
    return input
  }
  if (input instanceof URL) {
    return input.toString()
  }
  if ("url" in input && typeof input.url === "string") {
    return input.url
  }
  return String(input)
}

function chatJsonResponse(payload: SalesChatApiResponse, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  })
}

function fallbackJsonResponse(message: string, status = 503) {
  return new Response(
    JSON.stringify({ error: message, fallbackToHuman: true, errorType: "config_missing" }),
    {
      status,
      headers: { "content-type": "application/json" },
    },
  )
}

function buildWelcomePayload(): SalesChatApiResponse {
  return {
    assistantMessage: "Hey, I'm Prism's assistant. What sounds closest to what you need?",
    nodeId: "welcome",
    quickReplies: [
      { id: "starter_free_audit", label: "Get a free audit of my website", actionType: "reply" },
      { id: "starter_website", label: "I need a new or better website", actionType: "reply" },
      { id: "starter_growth_partner", label: "I want a growth partner ($2K/mo)", actionType: "reply" },
      { id: "starter_help_choose", label: "Help me figure out what's best", actionType: "reply" },
      { id: "starter_general_question", label: "I just have a question about Prism", actionType: "reply" },
    ],
    memoryPatch: {},
    terminalAction: "none",
    conversationState: {
      nodeId: "welcome",
      exchangeCount: 0,
      memory: {},
    },
  }
}

describe("SalesChat", () => {
  let memorySessionStorage: MemoryStorage

  beforeEach(() => {
    jest.clearAllMocks()
    fetchSpy.mockReset()
    memorySessionStorage = createMemoryStorage()
    Object.defineProperty(window, "sessionStorage", {
      configurable: true,
      value: memorySessionStorage,
    })
    window.sessionStorage.clear()
    setViewport(1280)
  })

  it("renders deterministic starter chips from API and keeps chip wrapping safe", async () => {
    fetchSpy.mockImplementation(async (input, init) => {
      if (getFetchUrl(input).includes("/api/chat")) {
        const body = JSON.parse(String((init as RequestInit).body ?? "{}")) as { buttonId?: string }
        if (body.buttonId === "__init__") {
          return chatJsonResponse(buildWelcomePayload())
        }
      }

      return new Response(JSON.stringify({ accepted: true }), {
        status: 202,
        headers: { "content-type": "application/json" },
      })
    })

    window.sessionStorage.setItem("chat-opened", "1")
    render(
      <SalesChat
        sourcePage="/get-started"
        bookingHref="#book-call"
        desktopAutoOpenSessionKey="chat-opened"
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: /Open sales chat/i }))

    const longChip = await screen.findByRole("button", { name: /I just have a question about Prism/i })
    expect(longChip.className).toContain("whitespace-normal")
    expect(longChip.className).toContain("h-auto")
    expect(longChip.className).toContain("min-h-10")
  })

  it("progresses through quick replies using deterministic server responses", async () => {
    fetchSpy.mockImplementation(async (input, init) => {
      if (getFetchUrl(input).includes("/api/chat")) {
        const body = JSON.parse(String((init as RequestInit).body ?? "{}")) as {
          buttonId?: string
        }

        if (body.buttonId === "__init__") {
          return chatJsonResponse(buildWelcomePayload())
        }

        if (body.buttonId === "starter_free_audit") {
          return chatJsonResponse({
            assistantMessage: "Great choice. What's your website URL?",
            nodeId: "intent_b_pitch",
            quickReplies: [
              { id: "b_skip_url", label: "I don't have a website yet", actionType: "reply" },
              { id: "book_call", label: "Book a 30-min call instead", actionType: "open_booking" },
            ],
            memoryPatch: {},
            recommendedOffer: "free_audit",
            terminalAction: "none",
            conversationState: {
              nodeId: "intent_b_pitch",
              exchangeCount: 1,
              memory: {},
            },
          })
        }
      }

      return new Response(JSON.stringify({ accepted: true }), {
        status: 202,
        headers: { "content-type": "application/json" },
      })
    })

    window.sessionStorage.setItem("chat-opened", "1")
    render(
      <SalesChat
        sourcePage="/get-started"
        bookingHref="#book-call"
        desktopAutoOpenSessionKey="chat-opened"
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: /Open sales chat/i }))
    fireEvent.click(await screen.findByRole("button", { name: /Get a free audit of my website/i }))

    await waitFor(() => {
      expect(screen.getByText("Great choice. What's your website URL?")).toBeInTheDocument()
    })

    expect(mockTrackSalesChatQuickReplyClicked).toHaveBeenCalled()
    expect(mockTrackSalesChatSpecNodeEntered).toHaveBeenCalled()
    expect(mockTrackSalesChatOfferRecommended).toHaveBeenCalledWith(expect.objectContaining({
      recommendedOffer: "free_audit",
      nodeId: "intent_b_pitch",
    }))
  })

  it("shows a single polished handoff state for handled API fallback", async () => {
    fetchSpy.mockImplementation(async (input, init) => {
      if (getFetchUrl(input).includes("/api/chat")) {
        const body = JSON.parse(String((init as RequestInit).body ?? "{}")) as { buttonId?: string }
        if (body.buttonId === "__init__") {
          return chatJsonResponse(buildWelcomePayload())
        }
        return fallbackJsonResponse("This should not be shown directly")
      }

      return new Response(JSON.stringify({ accepted: true }), {
        status: 202,
        headers: { "content-type": "application/json" },
      })
    })

    window.sessionStorage.setItem("chat-opened", "1")
    render(
      <SalesChat
        sourcePage="/get-started"
        bookingHref="#book-call"
        desktopAutoOpenSessionKey="chat-opened"
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: /Open sales chat/i }))

    const textarea = await screen.findByRole("textbox", { name: /Message sales assistant/i })
    fireEvent.change(textarea, { target: { value: "How long until I see results?" } })
    fireEvent.click(screen.getByRole("button", { name: /Send message/i }))

    await waitFor(() => {
      expect(screen.getByText(HANDOFF_FALLBACK_MESSAGE)).toBeInTheDocument()
    })

    expect(screen.queryByText("This should not be shown directly")).not.toBeInTheDocument()
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    expect(screen.getByRole("heading", { name: /Specialist ready/i })).toBeInTheDocument()
    expect(screen.getByTestId("book-demo-embed-inline")).toBeInTheDocument()
  })

  it("dedupes repeated identical fallback transcript responses", async () => {
    fetchSpy.mockImplementation(async (input, init) => {
      if (getFetchUrl(input).includes("/api/chat")) {
        const body = JSON.parse(String((init as RequestInit).body ?? "{}")) as { buttonId?: string }
        if (body.buttonId === "__init__") {
          return chatJsonResponse(buildWelcomePayload())
        }
        return fallbackJsonResponse("Provider fallback text")
      }

      return new Response(JSON.stringify({ accepted: true }), {
        status: 202,
        headers: { "content-type": "application/json" },
      })
    })

    window.sessionStorage.setItem("chat-opened", "1")
    render(
      <SalesChat
        sourcePage="/get-started"
        bookingHref="#book-call"
        desktopAutoOpenSessionKey="chat-opened"
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: /Open sales chat/i }))

    const textarea = await screen.findByRole("textbox", { name: /Message sales assistant/i })

    fireEvent.change(textarea, { target: { value: "First ask" } })
    fireEvent.click(screen.getByRole("button", { name: /Send message/i }))

    await waitFor(() => {
      expect(screen.getByText(HANDOFF_FALLBACK_MESSAGE)).toBeInTheDocument()
    })

    fireEvent.change(textarea, { target: { value: "Second ask" } })
    fireEvent.click(screen.getByRole("button", { name: /Send message/i }))

    await waitFor(() => {
      expect(screen.getByText("Second ask")).toBeInTheDocument()
    })

    expect(screen.getAllByText(HANDOFF_FALLBACK_MESSAGE)).toHaveLength(1)
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
  })

  it("emits attempted+failed lead telemetry without success emission when dispatch fails", async () => {
    fetchSpy.mockImplementation(async (input, init) => {
      if (getFetchUrl(input).includes("/api/chat")) {
        const body = JSON.parse(String((init as RequestInit).body ?? "{}")) as { buttonId?: string }
        if (body.buttonId === "__init__") {
          return chatJsonResponse(buildWelcomePayload())
        }

        return chatJsonResponse({
          assistantMessage: "You're all set. A specialist will follow up shortly.",
          nodeId: "intent_b_confirm",
          quickReplies: [
            { id: "book_call", label: "Book a 30-min call too", actionType: "open_booking" },
          ],
          memoryPatch: {},
          terminalAction: "emit_free_audit",
          leadDispatchStatus: "failed",
          leadDispatchCode: "webhook_http_error",
          conversationState: {
            nodeId: "intent_b_confirm",
            exchangeCount: 5,
            memory: {},
            convertedAction: "free_audit",
          },
        })
      }

      return new Response(JSON.stringify({ accepted: true }), {
        status: 202,
        headers: { "content-type": "application/json" },
      })
    })

    window.sessionStorage.setItem("chat-opened", "1")
    render(
      <SalesChat
        sourcePage="/get-started"
        bookingHref="#book-call"
        desktopAutoOpenSessionKey="chat-opened"
      />,
    )

    fireEvent.click(screen.getByRole("button", { name: /Open sales chat/i }))

    const textarea = await screen.findByRole("textbox", { name: /Message sales assistant/i })
    fireEvent.change(textarea, { target: { value: "Please send my audit." } })
    fireEvent.click(screen.getByRole("button", { name: /Send message/i }))

    await waitFor(() => {
      expect(screen.getByText("You're all set. A specialist will follow up shortly.")).toBeInTheDocument()
    })

    const eventCalls = fetchSpy.mock.calls
      .filter(([input]) => getFetchUrl(input).includes("/api/sales-chat/events"))
      .map(([, init]) => JSON.parse(String((init as RequestInit).body ?? "{}")) as { eventName?: string })

    const emittedEvents = new Set(eventCalls.map((entry) => entry.eventName))
    expect(emittedEvents.has("sales_chat_lead_payload_attempted")).toBe(true)
    expect(emittedEvents.has("sales_chat_lead_payload_failed")).toBe(true)
    expect(emittedEvents.has("sales_chat_lead_payload_emitted")).toBe(false)
    expect(mockTrackSalesChatLeadPayloadAttempted).toHaveBeenCalled()
    expect(mockTrackSalesChatLeadPayloadFailed).toHaveBeenCalled()
    expect(mockTrackSalesChatLeadPayloadEmitted).not.toHaveBeenCalled()
  })
})
