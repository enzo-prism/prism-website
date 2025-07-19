import { Mail, Instagram, CalendarDays, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { ContactPageSchema } from "@/components/schema-markup"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { trackCTAClick, trackNavigation } from "@/utils/analytics"

export const metadata: Metadata = {
  title: "Contact Us | Prism",
  description: "Get in touch with Prism. Find our email, Instagram, and scheduling link.",
  openGraph: {
    title: "Contact Us | Prism",
    description: "Get in touch with Prism. Find our email, Instagram, and scheduling link.",
    url: "https://www.design-prism.com/contact", // Replace with your actual domain
    images: [
      {
        url: "/prism-opengraph.png", // Replace with your actual opengraph image
        width: 1200,
        height: 630,
        alt: "Prism Contact Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Prism",
    description: "Get in touch with Prism. Find our email, Instagram, and scheduling link.",
    images: ["/prism-opengraph.png"], // Replace with your actual opengraph image
  },
}

export default function ContactPage() {
  const contactMethods = [
    {
      name: "Email Us",
      value: "support@design-prism.com",
      href: "mailto:support@design-prism.com",
      icon: <Mail className="h-6 w-6 text-neutral-600" />,
    },
    {
      name: "Follow on Instagram",
      value: "@the_design_prism",
      href: "https://www.instagram.com/the_design_prism/",
      icon: <Instagram className="h-6 w-6 text-neutral-600" />,
      target: "_blank",
    },
    {
      name: "Schedule a Call",
      value: "Book a 30-min discovery call",
      href: "https://calendly.com/enzomarzorati/30min",
      icon: <CalendarDays className="h-6 w-6 text-neutral-600" />,
      target: "_blank",
    },
  ]

  return (
    <>
      <Navbar />
      <ContactPageSchema />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-10 text-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lowercase">get in touch.</h1>
            <p className="mt-4 text-lg text-neutral-600 lowercase">
              we&apos;re here to help. reach out through any of these channels.
            </p>
        </div>

        {/* CTA Alternative */}
        <div className="bg-neutral-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-neutral-900 mb-3 lowercase">ready to start a project?</h2>
          <p className="text-neutral-600 mb-4 lowercase">skip the back-and-forth and get started with a structured consultation.</p>
          <Button size="lg" asChild className="w-full bg-neutral-900 text-white hover:bg-neutral-800 rounded-full min-h-[44px]">
            <Link 
              href="/get-started"
              onClick={() => trackCTAClick("get started", "contact alternative CTA")}
            >
              get started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <p className="text-sm text-neutral-500 mb-6 lowercase">or contact us directly:</p>

        <div className="space-y-6">
          {contactMethods.map((method) => (
            <div key={method.name} className="flex flex-col items-center">
              <Link
                href={method.href}
                target={method.target || "_self"}
                rel={method.target === "_blank" ? "noopener noreferrer" : undefined}
                className="group block w-full max-w-xs p-6 bg-neutral-50 hover:bg-neutral-100 rounded-xl transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
              >
                <div className="flex flex-col items-center space-y-3">
                  {method.icon}
                  <span className="text-lg font-medium text-neutral-800 lowercase group-hover:text-neutral-900">
                    {method.name}
                  </span>
                  <p className="text-sm text-neutral-600 lowercase group-hover:text-neutral-700">{method.value}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 lowercase transition-colors"
            onClick={() => trackNavigation("contact_back_home", "/")}
          >
            &larr; back to home
          </Link>
        </div>
      </div>
    </>
  )
}
