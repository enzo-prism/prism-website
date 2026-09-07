import type { Metadata } from "next"
import { buildRouteMetadata } from "@/lib/seo/metadata"
export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Your website, content and ads team',
  description:
    'Websites, content and ads for small businesses. One team to plan, build and improve your marketing.',
  path: "/",
})

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
