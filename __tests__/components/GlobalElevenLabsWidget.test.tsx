import { render } from "@testing-library/react"

import GlobalElevenLabsWidget from "@/components/global-elevenlabs-widget"

const usePathname = jest.fn()

jest.mock("next/navigation", () => ({
  usePathname: () => usePathname(),
}))

describe("GlobalElevenLabsWidget", () => {
  beforeEach(() => {
    document.body.innerHTML = ""
    usePathname.mockReset()
  })

  it("renders the stock floating ElevenLabs widget on inner pages", () => {
    usePathname.mockReturnValue("/about")

    const { container } = render(<GlobalElevenLabsWidget />)
    const widget = container.querySelector("elevenlabs-convai")

    expect(widget).toBeInTheDocument()
    expect(widget).toHaveAttribute("agent-id", "agent_4701kkcyc4efefkv5x4awhysjyrh")
    expect(widget).toHaveAttribute(
      "markdown-link-allowed-hosts",
      "calendar.notion.so,notion.so,www.notion.so,cal.com,www.cal.com,design-prism.com,www.design-prism.com",
    )
    expect(widget).not.toHaveAttribute("variant")
  })

  it("skips the homepage so the hero remains the dedicated primary experience", () => {
    usePathname.mockReturnValue("/")

    const { container } = render(<GlobalElevenLabsWidget />)

    expect(container.querySelector("elevenlabs-convai")).not.toBeInTheDocument()
  })

  it("renders on get-started so the stock floating widget owns the page assistant experience", () => {
    usePathname.mockReturnValue("/get-started")

    const { container } = render(<GlobalElevenLabsWidget />)

    expect(container.querySelector("elevenlabs-convai")).toBeInTheDocument()
  })
})
