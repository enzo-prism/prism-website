import type { Metadata } from "next"

import ContactForm from "@/components/forms/ContactForm"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PixelishIcon from "@/components/pixelish/PixelishIcon"
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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border/60 bg-background px-6 py-16 sm:py-24">
          <div className="mx-auto flex max-w-2xl flex-col gap-10">
            {/* Header with descriptive content */}
            <div className="space-y-4 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">
                contact
              </p>
              <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">Contact Prism</h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Whether you need a new website, help with SEO, or want to discuss your growth strategy,
                we are here to help you attract more customers and grow your business.
              </p>
            </div>

            {/* Contact form */}
            <ContactForm />

            {/* What to expect section */}
            <div className="rounded-3xl border border-border/60 bg-card/30 p-6 shadow-none backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-foreground mb-4">What to Expect</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <PixelishIcon
                    src="/pixelish/checkmark.svg"
                    alt=""
                    size={16}
                    invert={false}
                    aria-hidden="true"
                    className="mt-0.5 opacity-90 dark:invert"
                  />
                  <span>Response within 24 hours from our team in Silicon Valley</span>
                </li>
                <li className="flex items-start gap-3">
                  <PixelishIcon
                    src="/pixelish/checkmark.svg"
                    alt=""
                    size={16}
                    invert={false}
                    aria-hidden="true"
                    className="mt-0.5 opacity-90 dark:invert"
                  />
                  <span>No-pressure consultation tailored to your business goals</span>
                </li>
                <li className="flex items-start gap-3">
                  <PixelishIcon
                    src="/pixelish/checkmark.svg"
                    alt=""
                    size={16}
                    invert={false}
                    aria-hidden="true"
                    className="mt-0.5 opacity-90 dark:invert"
                  />
                  <span>Custom recommendations for websites, SEO, and digital marketing</span>
                </li>
                <li className="flex items-start gap-3">
                  <PixelishIcon
                    src="/pixelish/checkmark.svg"
                    alt=""
                    size={16}
                    invert={false}
                    aria-hidden="true"
                    className="mt-0.5 opacity-90 dark:invert"
                  />
                  <span>Transparent pricing with no hidden fees or long-term contracts</span>
                </li>
              </ul>
            </div>

            {/* Book a demo section */}
            <div className="rounded-3xl border border-border/60 bg-card/30 p-6 text-center shadow-none backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground font-pixel">
                prefer to see it live?
              </p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Book a demo</h2>
              <p className="mt-2 text-muted-foreground">
                Book a demo to walk through your goals, see how Prism works, and decide on next steps.
              </p>
              <Button asChild size="lg" variant="inverted" className="mt-4 w-full rounded-full sm:w-auto">
                <a
                  href="https://calendar.notion.so/meet/enzosison/oj1fm4o2p"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book a Prism demo"
                >
                  Book a demo →
                </a>
              </Button>
            </div>

            {/* Contact info */}
            <div className="space-y-2 text-center text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Direct Contact</p>
              <a
                href="mailto:support@design-prism.com"
                className="font-semibold text-foreground underline decoration-border/60 underline-offset-4 hover:decoration-border block"
              >
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
