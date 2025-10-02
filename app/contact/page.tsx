import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Prism | Schedule a Discovery Call or DM the Team",
  description:
    "Reach Prism via email, Instagram, or calendar to discuss website rebuilds, AI workflows, and growth projects, with replies in one business day.",
  openGraph: {
    title: "Contact Prism | Schedule a Discovery Call or DM the Team",
    description:
      "Reach Prism via email, Instagram, or calendar to discuss website rebuilds, AI workflows, and growth projects, with replies in one business day.",
    url: "https://www.design-prism.com/contact",
    images: [
      {
        url: "/prism-opengraph.png", // Replace with your actual opengraph image
        width: 1200,
        height: 630,
        alt: "Prism Contact Page",
      },
    ],
  },
  alternates: {
    canonical: "https://www.design-prism.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Prism | Schedule a Discovery Call or DM the Team",
    description:
      "Reach Prism via email, Instagram, or calendar to discuss website rebuilds, AI workflows, and growth projects, with replies in one business day.",
    images: ["/prism-opengraph.png"], // Replace with your actual opengraph image
  },
}

export default function ContactPage() {
  return (
    <ContactPageClient />
  )
}
