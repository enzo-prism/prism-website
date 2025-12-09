import type { Metadata } from "next"

import ContactForm from "@/components/forms/ContactForm"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
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
            {/* Header with descriptive content */}
            <div className="space-y-4 text-center">
              <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">Contact Prism</h1>
              <p className="text-lg text-slate-600 max-w-xl mx-auto">
                Whether you need a new website, help with SEO, or want to discuss your growth strategy,
                we are here to help you attract more customers and grow your business.
              </p>
            </div>

            {/* Contact form */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <ContactForm />
            </div>

            {/* What to expect section */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">What to Expect</h2>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Response within 24 hours from our team in Silicon Valley</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>No-pressure consultation tailored to your business goals</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Custom recommendations for websites, SEO, and digital marketing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Transparent pricing with no hidden fees or long-term contracts</span>
                </li>
              </ul>
            </div>

            {/* Book a call section */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">prefer to talk?</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Book a 15-Minute Kickoff Call</h2>
              <p className="mt-2 text-slate-600">
                Schedule a quick call to discuss your project, get instant feedback, and see if Prism is the right fit for your business.
              </p>
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

            {/* Contact info */}
            <div className="space-y-2 text-center text-sm text-slate-600">
              <p className="font-medium text-slate-900">Direct Contact</p>
              <a href="mailto:support@design-prism.com" className="font-semibold text-slate-900 underline-offset-4 hover:underline block">
                support@design-prism.com
              </a>
              <p>Based in Silicon Valley, California — serving businesses nationwide</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactPageSchema />
    </div>
  )
}
