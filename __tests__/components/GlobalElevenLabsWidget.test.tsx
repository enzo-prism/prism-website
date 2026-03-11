import type { ComponentProps } from "react"

import { render, waitFor } from "@testing-library/react"

import GlobalElevenLabsWidget from "@/components/global-elevenlabs-widget"

const usePathname = jest.fn()

jest.mock("next/navigation", () => ({
  usePathname: () => usePathname(),
}))

jest.mock("next/script", () => ({
  __esModule: true,
  default: function MockNextScript({
    strategy: _strategy,
    ...props
  }: ComponentProps<"script"> & { strategy?: string }) {
    return <script {...props} />
  },
}))

describe("GlobalElevenLabsWidget", () => {
  beforeEach(() => {
    usePathname.mockReset()
    document.body.innerHTML = ""
  })

  it("renders a subtle bottom-right launcher on inner marketing pages", () => {
    usePathname.mockReturnValue("/about")

    render(<GlobalElevenLabsWidget />)

    const script = document.querySelector(
      'script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]',
    )

    expect(script).toBeInTheDocument()

    const widget = document.querySelector("elevenlabs-convai")

    expect(widget).toBeInTheDocument()
    expect(widget).toHaveAttribute("agent-id", "agent_4701kkcyc4efefkv5x4awhysjyrh")
    expect(widget).toHaveAttribute("variant", "tiny")
    expect(widget).toHaveAttribute("placement", "bottom-right")
    expect(widget).toHaveAttribute("dismissible", "true")
    expect(widget).toHaveAttribute("default-expanded", "false")
  })

  it("skips the homepage so the hero remains the dedicated primary experience", () => {
    usePathname.mockReturnValue("/")

    render(<GlobalElevenLabsWidget />)

    expect(document.querySelector("elevenlabs-convai")).not.toBeInTheDocument()
  })

  it("steps aside on get-started when the dedicated sales chat launcher is present", () => {
    usePathname.mockReturnValue("/get-started")
    document.body.innerHTML = '<button aria-label="Open sales chat">Chat with Sales</button>'

    render(<GlobalElevenLabsWidget />)

    const widget = document.querySelector("elevenlabs-convai")

    expect(widget).toBeInTheDocument()
    expect(widget).toHaveAttribute("aria-hidden", "true")
    expect(widget).toHaveStyle({ display: "none" })
  })

  it("acts as the fallback launcher on get-started when the dedicated chat launcher is unavailable", async () => {
    usePathname.mockReturnValue("/get-started")

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      const widget = document.querySelector("elevenlabs-convai")

      expect(widget).toBeInTheDocument()
      expect(widget).toHaveAttribute("variant", "tiny")
      expect(widget).not.toHaveAttribute("aria-hidden")
    })
  })
})
