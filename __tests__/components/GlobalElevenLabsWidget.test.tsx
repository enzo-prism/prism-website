import { render, waitFor } from "@testing-library/react"

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
    expect(widget).not.toHaveAttribute("variant")
  })

  it("skips the homepage so the hero remains the dedicated primary experience", () => {
    usePathname.mockReturnValue("/")

    const { container } = render(<GlobalElevenLabsWidget />)

    expect(container.querySelector("elevenlabs-convai")).not.toBeInTheDocument()
  })

  it("steps aside on get-started when the dedicated sales chat launcher is present", async () => {
    usePathname.mockReturnValue("/get-started")
    document.body.innerHTML = '<button aria-label="Open sales chat">Chat with Sales</button>'

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(document.querySelector("elevenlabs-convai")).not.toBeInTheDocument()
    })
  })

  it("acts as the fallback launcher on get-started when the dedicated chat launcher is unavailable", async () => {
    usePathname.mockReturnValue("/get-started")

    render(<GlobalElevenLabsWidget />)

    await waitFor(() => {
      expect(document.querySelector("elevenlabs-convai")).toBeInTheDocument()
    })
  })
})
