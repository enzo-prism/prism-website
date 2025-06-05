import type { Metadata } from "next"
import WeSaplingsPage from "./client-page"

export const metadata: Metadata = {
  title: "we are saplings case study | prism",
  description:
    "How Prism helped We Are Saplings launch a digital platform to give kids playful tools for understanding and managing emotions.",
}

export default function WeSaplings() {
  return <WeSaplingsPage />
}
