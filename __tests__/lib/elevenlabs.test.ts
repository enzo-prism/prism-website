import {
  getPublicElevenLabsMarkdownLinkAllowedHosts,
  isPublicElevenLabsWidgetEnabled,
  isAllowedElevenLabsExternalUrl,
  registerElevenLabsClientTools,
} from "@/lib/elevenlabs"

describe("elevenlabs link configuration", () => {
  it("uses trusted booking hosts by default", () => {
    expect(getPublicElevenLabsMarkdownLinkAllowedHosts({} as NodeJS.ProcessEnv)).toBe(
      "calendar.notion.so,notion.so,www.notion.so,cal.com,www.cal.com,design-prism.com,www.design-prism.com",
    )
  })

  it("normalizes an explicit public allowlist override", () => {
    expect(
      getPublicElevenLabsMarkdownLinkAllowedHosts({
        NEXT_PUBLIC_ELEVENLABS_MARKDOWN_LINK_ALLOWED_HOSTS:
          " calendar.notion.so , cal.com , www.design-prism.com ",
      } as unknown as NodeJS.ProcessEnv),
    ).toBe("calendar.notion.so,cal.com,www.design-prism.com")
  })

  it("keeps the widget enabled unless the explicit public kill switch is set", () => {
    expect(isPublicElevenLabsWidgetEnabled({} as NodeJS.ProcessEnv)).toBe(true)
    expect(
      isPublicElevenLabsWidgetEnabled({
        NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED: "true",
      } as unknown as NodeJS.ProcessEnv),
    ).toBe(false)
    expect(
      isPublicElevenLabsWidgetEnabled({
        NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED: "no",
      } as unknown as NodeJS.ProcessEnv),
    ).toBe(true)
  })

  it("lets the browser runtime disable the widget before hydration for deterministic visual tests", () => {
    window.__PRISM_DISABLE_ELEVENLABS_WIDGET__ = true

    expect(isPublicElevenLabsWidgetEnabled({} as NodeJS.ProcessEnv)).toBe(false)

    delete window.__PRISM_DISABLE_ELEVENLABS_WIDGET__
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

  it("registers a guarded external redirect client tool for the widget", () => {
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
