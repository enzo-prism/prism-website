import type { Metadata } from "next"
import ExquisiteDentistryCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "Case Study: Exquisite Dentistry brand relaunch",
  description:
    "Turning a legacy Beverly Hills brand into a modern, trackable growth engine.",
  alternates: {
    canonical:
      "https://www.design-prism.com/case-studies/exquisite-dentistry",
  },
  openGraph: {
    title: "Case Study: Exquisite Dentistry brand relaunch",
    description:
      "Turning a legacy Beverly Hills brand into a modern, trackable growth engine.",
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
