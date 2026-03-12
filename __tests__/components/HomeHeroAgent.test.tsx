import { render } from "@testing-library/react"

import HomeHeroAgent from "@/components/home/HomeHeroAgent"

describe("HomeHeroAgent", () => {
  const originalWidgetDisabled = process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED
  })

  afterAll(() => {
    if (originalWidgetDisabled === undefined) {
      delete process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED
      return
    }

    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED = originalWidgetDisabled
  })

  it("renders the stock expanded ElevenLabs widget inside the hero wrapper", () => {
    const { container } = render(<HomeHeroAgent />)

    const widget = container.querySelector("elevenlabs-convai")

    expect(widget).toBeInTheDocument()
    expect(widget).toHaveAttribute("agent-id", "agent_4701kkcyc4efefkv5x4awhysjyrh")
    expect(widget).toHaveAttribute("variant", "expanded")
    expect(widget).toHaveAttribute(
      "markdown-link-allowed-hosts",
      "calendar.notion.so,notion.so,www.notion.so,cal.com,www.cal.com,design-prism.com,www.design-prism.com",
    )
    expect(widget?.closest(".home-hero-agent")).toBeInTheDocument()
  })

  it("skips the homepage widget entirely when the explicit public kill switch is set", () => {
    process.env.NEXT_PUBLIC_ELEVENLABS_WIDGET_DISABLED = "true"

    const { container } = render(<HomeHeroAgent />)

    expect(container.querySelector(".home-hero-agent")).not.toBeInTheDocument()
    expect(container.querySelector("elevenlabs-convai")).not.toBeInTheDocument()
  })
})
