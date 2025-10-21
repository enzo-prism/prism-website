import type { Metadata } from "next"
import InstagramLandingPage from "./instagram-landing-page"

export const metadata: Metadata = {
  title: "Instagram Growth Playbook | Prism",
  description: "Get more views and customers with Prism’s proven Instagram growth strategies and community support.",
}

export default function IGPage() {
  return <InstagramLandingPage />
}
