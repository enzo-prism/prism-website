import type { Metadata } from "next"
import ClientGetStartedPage from "./ClientGetStartedPage"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Apply for Prism | Prism",
  description: "Apply for Prism. Fill out the Typeform below; our team will review your application and get back to you within 24 hours.",
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
