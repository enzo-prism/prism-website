import type { Metadata } from "next"
import ExquisiteDentistryCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "exquisite dentistry case study — aligning digital excellence",
  description:
    "how prism elevated beverly hills’ exquisite dentistry’s online presence to match their premium in-person experience.",
  alternates: {
    canonical:
      "https://www.design-prism.com/case-studies/exquisite-dentistry",
  },
  openGraph: {
    title: "exquisite dentistry case study — aligning digital excellence",
    description:
      "how prism elevated beverly hills’ exquisite dentistry’s online presence to match their premium in-person experience.",
    images: [
      {
        url: "/exquisite-dentistry-consultation.png",
        width: 800,
        height: 450,
        alt: "exquisite dentistry consultation",
      },
    ],
  },
}

export default function ExquisiteDentistryCaseStudyPage() {
  return <ExquisiteDentistryCaseStudy />
}
