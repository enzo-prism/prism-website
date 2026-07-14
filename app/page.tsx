import type { Metadata } from "next"
import { buildRouteMetadata } from "@/lib/seo/metadata"
export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Websites, SEO and ads',
  description:
    'Prism builds clear websites, local SEO, and ads that help small businesses get found, trusted, and chosen.',
  path: "/",
})

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
