import type { Metadata } from "next"
export const metadata: Metadata = {
  title: {
    absolute: "prism | websites, google maps seo + ads (done-for-you)",
  },
  description:
    "prism runs your website, local seo, and ads so customers find you — without you managing tools, freelancers, or campaigns. white-glove, custom, and built for ai search.",
  alternates: {
    canonical: "/",
  },
}

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
