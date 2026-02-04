import type { Metadata } from "next"
import { WebPageSchema } from "@/components/schema-markup"
import ScholarshipPageClient from "./ScholarshipPageClient"

const PAGE_TITLE = "community website scholarship | prism"
const PAGE_DESCRIPTION =
  "each month prism builds a free website for a community member. apply for the scholarship and we'll review your story before the next pick."
const CANONICAL_URL = "https://www.design-prism.com/scholarship"

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: CANONICAL_URL,
    images: [
      {
        url: "/prism-opengraph.png",
        width: 1200,
        height: 630,
        alt: "Prism community scholarship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: ["/prism-opengraph.png"],
  },
}

export default function ScholarshipPage() {
  return (
    <>
      <section id="static-scholarship-hero" className="bg-neutral-900 text-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-16">
          <h1 className="text-4xl font-semibold tracking-tight">prism community website scholarship</h1>
          <p className="text-lg leading-relaxed text-white/80">
            every month we gift a custom website to one founder with a bold idea. tell us what you&apos;re building and we&apos;ll reach out if you&apos;re selected for the next build window.
          </p>
        </div>
      </section>
      <noscript>
        <section className="px-6 py-12">
          <div className="mx-auto max-w-5xl space-y-4 text-neutral-900">
            <h2 className="text-2xl font-semibold tracking-tight">apply without javascript</h2>
            <p>
              email <a href="mailto:support@design-prism.com">support@design-prism.com</a> with your name, how you heard about prism, and a short description of the site you need. we will confirm your submission and include it in the next monthly review.
            </p>
            <p>
              you can also explore example builds at <a href="https://www.design-prism.com/websites">design-prism.com/websites</a>.
            </p>
          </div>
        </section>
      </noscript>
      <ScholarshipPageClient />
      <WebPageSchema
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={CANONICAL_URL}
        image="https://www.design-prism.com/prism-opengraph.png"
        isPartOfId="https://www.design-prism.com/#website"
      />
    </>
  )
}
