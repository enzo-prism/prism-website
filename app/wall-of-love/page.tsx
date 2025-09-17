import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
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
      <WallOfLoveClientPage />
      <Footer />
    </>
  )
}
