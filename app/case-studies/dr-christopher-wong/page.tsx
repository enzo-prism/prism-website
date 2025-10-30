import type { Metadata } from "next"
import ChristopherWongCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "dr. christopher wong case study | seamless transition",
  description:
    "how we helped a palo alto dental practice achieve 100% patient retention and sustainable growth through a multi-phase digital strategy.",
  alternates: {
    canonical: "/case-studies/dr-christopher-wong",
  },
  openGraph: {
    title: "dr. christopher wong case study | seamless transition",
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
  return (
    <>
      <h1 className="sr-only">Dr. Christopher Wong Case Study | Seamless Transition</h1>
      <ChristopherWongCaseStudy />
    </>
  )
}
