import type { ComponentProps } from "react"

import { render } from "@testing-library/react"

import HomeHeroAgent from "@/components/home/HomeHeroAgent"

jest.mock("next/script", () => ({
  __esModule: true,
  default: function MockNextScript({
    strategy: _strategy,
    ...props
  }: ComponentProps<"script"> & { strategy?: string }) {
    return <script {...props} />
  },
}))

describe("HomeHeroAgent", () => {
  it("loads the ElevenLabs widget embed with a minimal supported configuration", () => {
    render(<HomeHeroAgent />)

    const script = document.querySelector(
      'script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]',
    )

    expect(script).toBeInTheDocument()

    const widget = document.querySelector("elevenlabs-convai")
    expect(widget).toBeInTheDocument()
    expect(widget).toHaveAttribute("agent-id", "agent_4701kkcyc4efefkv5x4awhysjyrh")

    expect(widget).not.toHaveAttribute("variant")
    expect(widget).not.toHaveAttribute("dismissible")
    expect(widget).not.toHaveAttribute("avatar-image-url")
    expect(widget).not.toHaveAttribute("action-text")
    expect(widget).not.toHaveAttribute("start-call-text")
    expect(widget).not.toHaveAttribute("expand-text")
    expect(widget?.closest(".home-hero-agent")).toBeInTheDocument()
    expect(widget?.parentElement).toHaveClass("min-h-[35rem]")
  })
})
