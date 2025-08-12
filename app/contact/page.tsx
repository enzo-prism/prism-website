import SeoTextSection from "@/components/seo-text-section"
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
  return (
    <>
      <section className="px-4 pt-8">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="prose prose-neutral max-w-none mb-6">
            <h2 className="text-xl font-semibold lowercase">talk to us</h2>
            <p>
              questions, projects, or partnerships—drop a note and we’ll get back within one business
              day. prefer social? instagram and x dms are open.
            </p>
          </div>
        </div>
      </section>
      <ContactPageClient />

      {/* SEO supporting copy */}
      <SeoTextSection title="how to work with prism">
        <p>
          have a project in mind? we typically begin with a short discovery call to align on goals,
          timelines, and scope. after that, we propose a plan with clear milestones—design, build,
          content, and launch—so you always know what comes next.
        </p>
      </SeoTextSection>
    </>
  )
}
