import { OrganizationSchema, WebsiteSchema } from "@/components/schema-markup"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import WallOfLoveClientPage from "./client-page"
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })
const Footer = dynamic(() => import("@/components/footer"), { ssr: false })

export const metadata: Metadata = {
  title: "Wall of Love",
  description: "Hear what our clients have to say about Prism. Real testimonials from satisfied customers.",
  openGraph: {
    title: "Wall of Love | Prism",
    description: "Hear what our clients have to say about Prism. Real testimonials from satisfied customers.",
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
    title: "Wall of Love | Prism",
    description: "Hear what our clients have to say about Prism. Real testimonials from satisfied customers.",
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
