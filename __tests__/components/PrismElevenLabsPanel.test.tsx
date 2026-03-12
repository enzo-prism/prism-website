import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"

import PrismElevenLabsPanel from "@/components/elevenlabs/PrismElevenLabsPanel"

type MockConversationConfig = {
  clientTools?: Record<string, (...args: any[]) => unknown>
  onAgentChatResponsePart?: (payload: { text?: string; type: "start" | "delta" | "stop" }) => void
  onDisconnect?: (payload: { reason: string }) => void
  onError?: (error: unknown) => void
  onMessage?: (payload: { message: string; role: "agent" | "user" }) => void
  onStatusChange?: (payload: { status: string }) => void
}

const conversationConfigRef: { current: MockConversationConfig | null } = {
  current: null,
}

const mockConversation = {
  endSession: jest.fn<Promise<void>, []>().mockResolvedValue(undefined),
  isSpeaking: false,
  sendUserActivity: jest.fn<void, []>(),
  sendUserMessage: jest.fn<void, [string]>(),
  startSession: jest.fn<Promise<string>, [Record<string, unknown>]>().mockResolvedValue("session_123"),
  status: "disconnected",
}

jest.mock("@/components/ui/orb", () => ({
  Orb: function MockOrb() {
    return <div data-testid="prism-orb" />
  },
}))

jest.mock("@elevenlabs/react", () => ({
  useConversation: jest.fn((config: MockConversationConfig) => {
    conversationConfigRef.current = config
    return mockConversation
  }),
}))

describe("PrismElevenLabsPanel", () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      configurable: true,
      value: jest.fn(),
      writable: true,
    })

    class ResizeObserverMock {
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    ;(globalThis as typeof globalThis & { ResizeObserver?: typeof ResizeObserver }).ResizeObserver =
      ResizeObserverMock as unknown as typeof ResizeObserver
  })

  beforeEach(() => {
    conversationConfigRef.current = null
    mockConversation.endSession.mockClear()
    mockConversation.isSpeaking = false
    mockConversation.sendUserActivity.mockClear()
    mockConversation.sendUserMessage.mockClear()
    mockConversation.startSession.mockClear()
    mockConversation.status = "disconnected"
  })

  it("keeps a clickable booking link in chat after a voice-started request", async () => {
    render(<PrismElevenLabsPanel />)

    fireEvent.click(screen.getByRole("button", { name: /start voice/i }))

    await waitFor(() => {
      expect(mockConversation.startSession).toHaveBeenCalledWith({
        agentId: "agent_4701kkcyc4efefkv5x4awhysjyrh",
        connectionType: "webrtc",
      })
    })

    await act(async () => {
      conversationConfigRef.current?.onMessage?.({
        message: "I've dropped the booking link in the chat for you.",
        role: "agent",
      })
    })

    expect(screen.getByText(/dropped the booking link in the chat/i)).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /book a 30-min demo/i })).toHaveAttribute(
      "href",
      "/get-started#book-call",
    )
  })

  it("renders booking links pushed by ElevenLabs client tools into the transcript", async () => {
    render(<PrismElevenLabsPanel />)

    await act(async () => {
      const result = conversationConfigRef.current?.clientTools?.shareBookingLink?.({
        label: "Book a strategy call",
        url: "https://cal.com/prism/demo",
      })

      expect(result).toContain("Shared")
    })

    expect(screen.getByRole("link", { name: /book a strategy call/i })).toHaveAttribute(
      "href",
      "https://cal.com/prism/demo",
    )
  })

  it("starts a text-only session when the user messages before connecting", async () => {
    render(<PrismElevenLabsPanel />)

    fireEvent.change(screen.getByLabelText(/message prism assistant/i), {
      target: { value: "Send me the booking link" },
    })
    fireEvent.click(screen.getByRole("button", { name: /send message/i }))

    await waitFor(() => {
      expect(mockConversation.startSession).toHaveBeenCalledWith({
        agentId: "agent_4701kkcyc4efefkv5x4awhysjyrh",
        connectionType: "websocket",
        overrides: {
          conversation: {
            textOnly: true,
          },
        },
        textOnly: true,
      })
    })

    expect(mockConversation.sendUserMessage).toHaveBeenCalledWith("Send me the booking link")
    expect(screen.getByText("Send me the booking link")).toBeInTheDocument()
  })
})
