import type { Metadata } from "next"
import ExquisiteDentistryCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "aligning digital excellence with luxury care | exquisite dentistry case study",
  description:
    "how we elevated beverly hills' exquisite dentistry's online presence to match their premium in-person experience through a complete digital overhaul.",
  openGraph: {
    title: "aligning digital excellence with luxury care | exquisite dentistry case study",
    description:
      "how we elevated beverly hills' exquisite dentistry's online presence to match their premium in-person experience through a complete digital overhaul.",
    images: [
      {
        url: "/exquisite-dentistry-consultation.png",
        width: 800,
        height: 450,
        alt: "exquisite dentistry consultation with patient in beverly hills",
      },
    ],
  },
}

export default function ExquisiteDentistryCaseStudyPage() {
  return <ExquisiteDentistryCaseStudy />
}
