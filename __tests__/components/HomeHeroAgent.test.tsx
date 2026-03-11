import { render } from "@testing-library/react"

import HomeHeroAgent from "@/components/home/HomeHeroAgent"

describe("HomeHeroAgent", () => {
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
})
