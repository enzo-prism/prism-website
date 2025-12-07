import type { Metadata } from "next"
import CareersClientPage from "./client-page"

export const metadata: Metadata = {
  title: "careers at prism | open roles",
  description:
    "join our team at prism. explore career opportunities at our digital agency creating websites, apps, and designs that drive results.",
  openGraph: {
    title: "careers at prism | open roles",
    description:
      "join our team at prism. explore career opportunities at our digital agency creating websites, apps, and designs that drive results.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/careers",
  },
}

export default function CareersPage() {
  return <CareersClientPage />
}
