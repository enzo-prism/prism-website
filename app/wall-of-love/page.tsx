import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import SeoTextSection from "@/components/seo-text-section"
import { OrganizationSchema, WebsiteSchema } from "@/components/schema-markup"
import type { Metadata } from "next"
import WallOfLoveClientPage from "./client-page"

export const metadata: Metadata = {
  title: "Testimonials | Dentists & Local Brands Working with Prism",
  description:
    "Explore feedback from dental practices, nonprofits, and local retailers that partner with Prism for high-performing websites and growth systems.",
  openGraph: {
    title: "Testimonials | Dentists & Local Brands Working with Prism",
    description:
      "Explore feedback from dental practices, nonprofits, and local retailers that partner with Prism for high-performing websites and growth systems.",
    url: "https://design-prism.com/wall-of-love",
    images: [
      {
        url: "/prism-opengraph.png", // Using existing opengraph image
        width: 1200,
        height: 630,
        alt: "Prism Client Testimonials",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonials | Dentists & Local Brands Working with Prism",
    description:
      "Explore feedback from dental practices, nonprofits, and local retailers that partner with Prism for high-performing websites and growth systems.",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://design-prism.com/wall-of-love",
  },
}

export default function WallOfLovePage() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <Navbar />
      <SeoTextSection
        title="voices from the operators we serve"
        subtitle="these notes and videos come from dentists, nonprofits, and founders who partnered with prism to rebuild their digital presence."
        variant="compact"
        showDivider={false}
      >
        <p>
          Clients lean on us when they need more than a polished interface—they need measurable results. The testimonials highlight what changed in their day-to-day: faster launches, more qualified leads, smoother onboarding, and marketing that finally compounds.
        </p>
        <ul>
          <li><strong>Healthcare:</strong> multi-location dental teams increasing treatment acceptance and recall.</li>
          <li><strong>Community & nonprofit:</strong> organizations translating mission into digital experiences that drive action.</li>
          <li><strong>Retail & services:</strong> specialty shops and consultants building trust and demand online.</li>
        </ul>
      </SeoTextSection>
      <WallOfLoveClientPage />
      <Footer />
    </>
  )
}
