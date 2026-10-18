import type { Metadata } from "next"
import { buildRouteMetadata } from "@/lib/seo/metadata"
export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Your website, content, ads and AEO team',
  description:
    'Websites, content, ads, and AEO for small businesses. One team to plan, build, and improve your marketing, on Google and in AI answers.',
  path: "/",
})

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
