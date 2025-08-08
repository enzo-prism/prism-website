import type { Metadata } from "next"
import ExquisiteDentistryCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "Exquisite Dentistry Case Study — Aligning Digital Excellence",
  description:
    "how prism elevated beverly hills’ exquisite dentistry’s online presence to match their premium in-person experience.",
  openGraph: {
    title: "Exquisite Dentistry Case Study — Aligning Digital Excellence",
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
