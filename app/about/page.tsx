import SeoTextSection from "@/components/seo-text-section"
import type { Metadata } from "next"
import AboutClientPage from "./client-page"

export const metadata: Metadata = {
  title: "about",
  description:
    "learn about prism's journey, mission, and the team behind our digital agency creating websites, apps, and designs that drive results.",
  alternates: {
    canonical: "https://www.design-prism.com/about",
  },
}

export default function AboutPage() {
  return (
    <>
      <section className="px-4 pt-8">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="prose prose-neutral max-w-none mb-6">
            <h2 className="text-xl font-semibold lowercase">who we are</h2>
            <p>
              prism builds beautiful software—websites, apps, and content systems—that compounds into
              revenue. we mix sharp design, clean code, and ai automation to help small teams punch
              above their weight.
            </p>
          </div>
        </div>
      </section>
      <AboutClientPage />

      {/* SEO supporting copy */}
      <SeoTextSection title="about prism">
        <p>
          prism is a design‑led software studio. we build websites, apps, and content systems that look
          beautiful and perform under load. our work spans healthcare, retail, and consumer—always with an
          emphasis on measurable outcomes: faster pages, higher conversion, and clearer storytelling.
        </p>
      </SeoTextSection>
    </>
  )
}
