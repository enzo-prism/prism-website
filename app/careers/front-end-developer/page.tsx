import type { Metadata } from "next"
import FrontEndDeveloperPage from "./client-page"

export const metadata: Metadata = {
  title: "contract front-end developer | prism careers",
  description:
    "join our lean team building modern web apps with ai-first tooling. work with cursor, replit, vercel v0, and lovable.dev. remote, part-time contract position.",
  openGraph: {
    title: "contract front-end developer | prism careers",
    description:
      "join our lean team building modern web apps with ai-first tooling. work with cursor, replit, vercel v0, and lovable.dev. remote, part-time contract position.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://design-prism.com/careers/front-end-developer",
  },
}

export default function FrontEndDeveloperJobPage() {
  return <FrontEndDeveloperPage />
}