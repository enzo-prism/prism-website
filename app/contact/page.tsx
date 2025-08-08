import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us | Prism",
  description: "Get in touch with Prism. Find our email, Instagram, and scheduling link.",
  openGraph: {
    title: "Contact Us | Prism",
    description: "Get in touch with Prism. Find our email, Instagram, and scheduling link.",
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
    title: "Contact Us | Prism",
    description: "Get in touch with Prism. Find our email, Instagram, and scheduling link.",
    images: ["/prism-opengraph.png"], // Replace with your actual opengraph image
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
