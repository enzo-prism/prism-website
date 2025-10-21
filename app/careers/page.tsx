import type { Metadata } from "next"
import CareersClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Careers at Prism | Open Roles",
  description:
    "Join our team at Prism. Explore career opportunities at our digital agency creating websites, apps, and designs that drive results.",
  openGraph: {
    title: "Careers at Prism | Open Roles",
    description:
      "Join our team at Prism. Explore career opportunities at our digital agency creating websites, apps, and designs that drive results.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://design-prism.com/careers",
  },
}

export default function CareersPage() {
  return <CareersClientPage />
}
