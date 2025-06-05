import type { Metadata } from "next"
import InstagramLandingPage from "./instagram-landing-page"

export const metadata: Metadata = {
  title: "instagram growth",
  description: "get more views and more customers with our proven strategies. join our community today.",
}

export default function IGPage() {
  return <InstagramLandingPage />
}
