import type { Metadata } from "next"
import TownCentreDentalCaseStudy from "./client-page"

export const metadata: Metadata = {
  title: "Town Centre Dental Case Study — Family Dentistry Growth",
  description:
    "how we helped town centre dental modernize their web presence, streamline booking, and build sustainable acquisition in brentwood, ca.",
  openGraph: {
    title: "Town Centre Dental × Prism — Case Study",
    description:
      "family dentistry growth system: new site, clear services, and measurable acquisition built for brentwood, ca",
    images: [],
  },
  alternates: {
    canonical: "https://www.design-prism.com/case-studies/town-centre-dental",
  },
}

export default function TownCentreDentalCase() {
  return <TownCentreDentalCaseStudy />
}


