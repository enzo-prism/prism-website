import { fireEvent, render, screen } from "@testing-library/react"

import WgetCommandBuilder from "@/components/wget-command-builder"

describe("WgetCommandBuilder", () => {
  it("updates the wget command when the user types a URL", () => {
    render(<WgetCommandBuilder />)

    const input = screen.getByLabelText(/enter your website url/i)
    fireEvent.change(input, { target: { value: "https://www.design-prism.com" } })

    expect(
      screen.getByText("wget -r -l inf -p -E -k -nc https://www.design-prism.com")
    ).toBeInTheDocument()
  })

  it("adds https:// when the user types a domain without scheme", () => {
    render(<WgetCommandBuilder />)

    const input = screen.getByLabelText(/enter your website url/i)
    fireEvent.change(input, { target: { value: "design-prism.com" } })

    expect(
      screen.getByText("wget -r -l inf -p -E -k -nc https://design-prism.com")
    ).toBeInTheDocument()
  })
})

