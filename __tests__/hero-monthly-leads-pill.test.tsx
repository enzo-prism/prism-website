import { render, screen } from "@testing-library/react"

import HeroMonthlyLeadsPill from "@/components/home/HeroMonthlyLeadsPill"
import { HOME_HERO_MONTHLY_LEADS_STATS } from "@/content/home-hero-leads"

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => {
    const hrefString =
      typeof href === "string" ? href : (href?.pathname as string | undefined) ?? ""
    return (
      <a href={hrefString} {...props}>
        {children}
      </a>
    )
  },
}))

describe("HeroMonthlyLeadsPill", () => {
  it("renders a link to /case-studies with simplified monthly stat copy", () => {
    render(<HeroMonthlyLeadsPill />)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/case-studies")

    const latest = HOME_HERO_MONTHLY_LEADS_STATS[0]
    expect(latest).toBeTruthy()

    expect(link).toHaveTextContent(`${latest.leads.toLocaleString("en-US")} leads delivered to clients last month 🥳`)
    expect(link).toHaveTextContent(`${latest.leads.toLocaleString("en-US")} leads delivered to clients in last month 🥳`)
    expect(link).toHaveTextContent("stat updated monthly")
  })
})

