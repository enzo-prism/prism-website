import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Prism | AI-Powered Web Design for Dental & Local Businesses",
  description:
    "Prism designs conversion-focused websites and AI systems for dental practices and ambitious local brands, driving more patients, leads, and repeat revenue.",
}

export default function Home() {
  return (
    <ClientPage />
  )
}
