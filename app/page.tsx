import type { Metadata } from "next"
export const metadata: Metadata = {
  title: {
    absolute: "prism | websites, google maps seo + ads (done-for-you)",
  },
  description:
    "prism runs your website, local seo, and ads so customers find you—without managing tools or freelancers. white-glove, custom, and built for ai search.",
  alternates: {
    canonical: "https://www.design-prism.com/",
  },
}

import ClientPage from "./client-page"

export default function Home() {
  return <ClientPage />
}
