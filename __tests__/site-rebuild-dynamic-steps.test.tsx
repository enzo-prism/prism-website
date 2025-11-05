import { fireEvent, render, screen } from "@testing-library/react"

import SiteRebuildDynamicSteps from "@/components/site-rebuild-dynamic-steps"

describe("SiteRebuildDynamicSteps", () => {
  it("replaces example.com with the user supplied domain across commands", () => {
    render(<SiteRebuildDynamicSteps />)

    const input = screen.getByLabelText(/enter your website url/i)
    fireEvent.change(input, { target: { value: "https://www.design-prism.com" } })

    expect(
      screen.getByText("wget -r -l inf -p -E -k -nc https://www.design-prism.com")
    ).toBeInTheDocument()

    const folderSnippets = screen.getAllByText((content) => content.includes("├── www.design-prism.com/"))
    expect(folderSnippets.length).toBeGreaterThanOrEqual(1)

    expect(
      screen.getByText((content) => content.includes("rg -o '<p>.*?</p>|<h[1-6]>.*?</h[1-6]>' ./www.design-prism.com"))
    ).toBeInTheDocument()

    expect(
      screen.getByText("curl -O https://www.design-prism.com/sitemap.xml")
    ).toBeInTheDocument()

    expect(
      screen.getByText((content) => content.includes('Website rebuild project for https://www.design-prism.com'))
    ).toBeInTheDocument()
  })
})
