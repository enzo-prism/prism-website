import type { Metadata } from "next"
import { buildRouteMetadata } from "@/lib/seo/metadata"
export const metadata: Metadata = buildRouteMetadata({
  titleStem: "prism | websites, google maps seo + ads (done-for-you)",
  description: "prism runs your website, local seo, and ads so customers find you—without managing tools or freelancers. white-glove, custom, and built for ai search.",
  path: "/",
})

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
