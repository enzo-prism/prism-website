import {
  createElevenLabsClientTools,
  getPublicElevenLabsBookingUrl,
  getPublicElevenLabsMarkdownLinkAllowedHosts,
  isAllowedElevenLabsExternalUrl,
  registerElevenLabsClientTools,
  resolveElevenLabsConversationUrl,
} from "@/lib/elevenlabs"

describe("elevenlabs link configuration", () => {
  it("uses trusted booking hosts by default", () => {
    expect(getPublicElevenLabsMarkdownLinkAllowedHosts({} as NodeJS.ProcessEnv)).toBe(
      "calendar.notion.so,notion.so,www.notion.so,cal.com,www.cal.com,design-prism.com,www.design-prism.com",
    )
  })

  it("uses the public booking url override when configured", () => {
    expect(
      getPublicElevenLabsBookingUrl({
        NEXT_PUBLIC_ELEVENLABS_BOOKING_URL: "https://calendar.notion.so/prism-demo",
      } as unknown as NodeJS.ProcessEnv),
    ).toBe("https://calendar.notion.so/prism-demo")
  })

  it("normalizes an explicit public allowlist override", () => {
    expect(
      getPublicElevenLabsMarkdownLinkAllowedHosts({
        NEXT_PUBLIC_ELEVENLABS_MARKDOWN_LINK_ALLOWED_HOSTS:
          " calendar.notion.so , cal.com , www.design-prism.com ",
      } as unknown as NodeJS.ProcessEnv),
    ).toBe("calendar.notion.so,cal.com,www.design-prism.com")
  })

  it("only allows trusted https destinations", () => {
    const allowedHosts = "calendar.notion.so,cal.com,www.design-prism.com"

    expect(
      isAllowedElevenLabsExternalUrl("https://calendar.notion.so/demo", allowedHosts),
    ).toBe(true)
    expect(isAllowedElevenLabsExternalUrl("https://www.cal.com/prism/demo", allowedHosts)).toBe(
      true,
    )
    expect(
      isAllowedElevenLabsExternalUrl("https://design-prism.com/get-started", allowedHosts),
    ).toBe(true)
    expect(isAllowedElevenLabsExternalUrl("http://calendar.notion.so/demo", allowedHosts)).toBe(
      false,
    )
    expect(isAllowedElevenLabsExternalUrl("https://evil.example/demo", allowedHosts)).toBe(false)
    expect(isAllowedElevenLabsExternalUrl("not a url", allowedHosts)).toBe(false)
  })

  it("normalizes booking anchors and safe internal paths for transcript rendering", () => {
    expect(resolveElevenLabsConversationUrl("#book-call")).toBe("/get-started#book-call")
    expect(resolveElevenLabsConversationUrl("book-call")).toBe("/get-started#book-call")
    expect(resolveElevenLabsConversationUrl("/pricing")).toBe("/pricing")
    expect(
      resolveElevenLabsConversationUrl("https://cal.com/prism/demo", {
        allowedHosts: "cal.com",
      }),
    ).toBe("https://cal.com/prism/demo")
    expect(
      resolveElevenLabsConversationUrl("https://evil.example/demo", {
        allowedHosts: "cal.com",
      }),
    ).toBeNull()
  })

  it("creates client tools that can share a booking link into chat without opening a new tab", () => {
    const onLinkReady = jest.fn()
    const clientTools = createElevenLabsClientTools({
      allowedHosts: "cal.com",
      onLinkReady,
    })

    const result = clientTools.shareBookingLink({
      label: "Book a strategy call",
      url: "https://cal.com/prism/demo",
    }) as string

    expect(result).toContain("Shared [Book a strategy call](https://cal.com/prism/demo) in the chat.")
    expect(onLinkReady).toHaveBeenCalledWith({
      label: "Book a strategy call",
      url: "https://cal.com/prism/demo",
    })
  })

  it("registers a guarded external redirect client tool for legacy widget hooks", () => {
    const widget = document.createElement("elevenlabs-convai")
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null)
    const cleanup = registerElevenLabsClientTools(widget, "calendar.notion.so,cal.com")
    const detail: {
      config?: {
        clientTools?: Record<string, unknown>
      }
    } = {}

    widget.dispatchEvent(new CustomEvent("elevenlabs-convai:call", { detail }))

    const redirectToExternalURL = detail.config?.clientTools?.redirectToExternalURL

    expect(typeof redirectToExternalURL).toBe("function")

    ;(redirectToExternalURL as ({ url }: { url?: string }) => void)({
      url: "https://cal.com/prism/demo",
    })
    expect(openSpy).toHaveBeenCalledWith(
      "https://cal.com/prism/demo",
      "_blank",
      "noopener,noreferrer",
    )

    openSpy.mockClear()

    ;(redirectToExternalURL as ({ url }: { url?: string }) => void)({
      url: "https://evil.example/demo",
    })
    expect(openSpy).not.toHaveBeenCalled()

    cleanup()
    openSpy.mockRestore()
  })
})
