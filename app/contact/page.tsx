import type { Metadata } from "next"

import ContactForm from "@/components/forms/ContactForm"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import RevealOnScroll from "@/components/reveal-on-scroll"
import { Button } from "@/components/ui/button"
import { ContactPageSchema } from "@/components/schema-markup"

export const metadata: Metadata = {
  title: "Contact | prism",
  description: "Reach Prism to talk through the right plan for your AI-powered website and growth goals.",
  openGraph: {
    title: "Contact | prism",
    description: "Reach Prism to talk through the right plan for your AI-powered website and growth goals.",
    url: "https://www.design-prism.com/contact",
    images: ["/prism-opengraph.png"],
  },
  alternates: {
    canonical: "https://www.design-prism.com/contact",
  },
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PageViewTracker title="Contact" />
      <Navbar />
      <main className="flex-1" style={{ textTransform: "none" }}>
        <section className="px-6 py-16 sm:py-24">
          <div className="mx-auto flex max-w-2xl flex-col gap-10">
            <RevealOnScroll>
              <div className="space-y-4 text-center">
                <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">Contact Prism</h1>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <ContactForm />
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">book a call</p>
                <p className="mt-2 text-base text-slate-900">15-minute Prism kickoff call</p>
                <Button
                  asChild
                  className="mt-4 w-full rounded-full border border-black bg-black px-6 py-3 text-base font-semibold text-white hover:bg-black/90 sm:w-auto"
                >
                  <a
                    href="https://calendar.notion.so/meet/enzosison/sfux4ogo"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book a 15-minute Prism kickoff call"
                  >
                    Book now →
                  </a>
                </Button>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.25}>
              <div className="space-y-2 text-center text-sm text-slate-600">
                <a href="mailto:support@design-prism.com" className="font-semibold text-slate-900 underline-offset-4 hover:underline">
                  support@design-prism.com
                </a>
                <p>based in silicon valley, ca</p>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
      <ContactPageSchema />
    </div>
  )
}
