import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title:
    "Prism | Websites, Ads & Local Listing Optimization for Small Businesses",
  description:
    "Prism builds revenue-generating websites, runs paid ads, and optimizes local listings so small businesses get found, trusted, and chosen in their market.",
}

export default function Home() {
  return (
    <ClientPage />
  )
}
