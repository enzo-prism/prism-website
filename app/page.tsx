import type { Metadata } from "next"
import ClientPage from "./client-page"

export const metadata: Metadata = {
  title: "prism",
  description: "digital agency creating websites, apps, and designs that shatter revenue goals and delight customers.",
}

export default function Home() {
  return <ClientPage />
}
