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

const MONTH_NAMES_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

function formatMonthKeyLong(monthKey: string) {
  const [yearRaw, monthRaw] = monthKey.split("-")
  const year = Number.parseInt(yearRaw ?? "", 10)
  const month = Number.parseInt(monthRaw ?? "", 10)
  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
    return monthKey
  }
  return `${MONTH_NAMES_LONG[month - 1]} ${year}`
}

describe("HeroMonthlyLeadsPill", () => {
  it("renders a link to /case-studies with the latest stat", () => {
    render(<HeroMonthlyLeadsPill />)

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/case-studies")

    const latest = HOME_HERO_MONTHLY_LEADS_STATS[0]
    expect(latest).toBeTruthy()

    expect(link).toHaveTextContent(latest.leads.toLocaleString("en-US"))
    expect(link).toHaveTextContent(formatMonthKeyLong(latest.month))
  })
})

