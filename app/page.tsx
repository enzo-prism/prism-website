import type { Metadata } from "next"
import { buildRouteMetadata } from "@/lib/seo/metadata"
export const metadata: Metadata = buildRouteMetadata({
  titleStem: 'Small business growth team',
  description:
    'Meet the designers, engineers and marketers behind Prism. See what we built for independent businesses, how we measure results and how to work with us.',
  path: "/",
})

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
