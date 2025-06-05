import type { Metadata } from "next"
import ChristopherWongCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "powering a seamless transition for dr. christopher wong | prism",
  description:
    "how we helped a palo alto dental practice achieve 100% patient retention and sustainable growth through a multi-phase digital strategy.",
  openGraph: {
    title: "powering a seamless transition for dr. christopher wong | prism",
    description:
      "how we helped a palo alto dental practice achieve 100% patient retention and sustainable growth through a multi-phase digital strategy.",
    images: [
      {
        url: "/dr-wong-polaroids.png",
        width: 800,
        height: 450,
        alt: "polaroid photos of dr. christopher wong in his dental practice",
      },
    ],
  },
}

export default function ChristopherWongCaseStudyPage() {
  return <ChristopherWongCaseStudy />
}
