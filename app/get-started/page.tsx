import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Apply to Work with Prism | Prism",
  description: "Apply to work with Prism. We take on a limited number of clients to protect quality. Start with a short application; we respond within 24 hours on weekdays.",
  alternates: {
    canonical: "https://www.design-prism.com/get-started",
  },
}

export default function GetStartedPage() {
  return (
    <>
      <ClientGetStartedPage heroOnly />
      {/* Embedded Typeform */}
      <section className="px-4 py-8">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div data-tf-live="01K4GCKJ7ZVE7WMZAQ0N02Z6QB" />
        </div>
      </section>
      <Script src="https://embed.typeform.com/next/embed.js" strategy="afterInteractive" />
    </>
  )
}
