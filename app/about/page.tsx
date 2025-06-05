import type { Metadata } from "next"
import AboutClientPage from "./client-page"

export const metadata: Metadata = {
  title: "about",
  description:
    "learn about prism's journey, mission, and the team behind our digital agency creating websites, apps, and designs that drive results.",
}

export default function AboutPage() {
  return <AboutClientPage />
}
