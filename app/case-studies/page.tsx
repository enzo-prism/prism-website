import type { Metadata } from "next"
import CaseStudiesPage from "./client-page"

export const metadata: Metadata = {
  title: "case studies: dental & local business growth wins | prism",
  description:
    "discover how prism lifts patient acquisition, retention, and online revenue through strategic redesigns, content systems, and analytics for real clients.",
  alternates: {
    canonical: "https://www.design-prism.com/case-studies",
  },
  openGraph: {
    title: "case studies: dental & local business growth wins | prism",
    description:
      "discover how prism lifts patient acquisition, retention, and online revenue through strategic redesigns, content systems, and analytics for real clients.",
    url: "https://www.design-prism.com/case-studies",
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism case studies",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "case studies: dental & local business growth wins | prism",
    description:
      "discover how prism lifts patient acquisition, retention, and online revenue through strategic redesigns, content systems, and analytics for real clients.",
    images: ["/prism-opengraph.png"],
  },
}

export default function CaseStudies() {
  return <CaseStudiesPage />
}
