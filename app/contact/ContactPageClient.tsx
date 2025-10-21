"use client"

import { ContactPageSchema } from "@/components/schema-markup"
import { trackNavigation } from "@/utils/analytics"
import dynamic from "next/dynamic"
import Link from "next/link"

import { Button } from "@/components/ui/button"

const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false })

const primaryActions = [
  {
    id: "contact_email",
    label: "email",
    detail: "support@design-prism.com",
    href: "mailto:support@design-prism.com",
  },
  {
    id: "contact_text",
    label: "text",
    detail: "650 862 4069",
    href: "sms:+16508624069",
  },
  {
    id: "contact_apply",
    label: "hire prism",
    detail: "claim your free audit & report",
    href: "/get-started",
  },
]

const socialLinks = [
  {
    id: "contact_social_instagram",
    label: "instagram",
    href: "https://www.instagram.com/the_design_prism/",
  },
  {
    id: "contact_social_youtube",
    label: "youtube",
    href: "https://www.youtube.com/@the_design_prism",
  },
  {
    id: "contact_social_tiktok",
    label: "tiktok",
    href: "https://www.tiktok.com/@the_design_prism?lang=en",
  },
  {
    id: "contact_social_linkedin",
    label: "linkedin",
    href: "https://www.linkedin.com/company/web-prism/?viewAsMember=true",
  },
]

const demoBooking = {
  id: "contact_book_demo",
  href: "https://calendar.notion.so/meet/enzosison/client-meeting",
}

export default function ContactPageClient() {
  return (
    <>
      <Navbar />
      <ContactPageSchema />
      <main className="min-h-screen bg-white text-neutral-900">
        <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col justify-center gap-16 px-6 py-24 sm:py-32">
          <header className="space-y-5 text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">based in silicon valley, california</p>
            <h1 className="text-4xl font-light lowercase sm:text-5xl">contact prism</h1>
            <p className="max-w-xl text-base text-neutral-500 lowercase">
              choose the channel that works best for you. we respond quickly to every message.
            </p>
          </header>

          <div className="space-y-4">
            {primaryActions.map((action) => {
              const isInternal = action.href.startsWith("/")
              const commonProps = {
                className:
                  "group flex flex-col gap-1 border-b border-neutral-200 pb-4 text-left transition-colors last:border-b-0",
                onClick: () => trackNavigation(action.id, action.href),
              }

              if (isInternal) {
                return (
                  <Link key={action.id} href={action.href} {...commonProps}>
                    <span className="text-sm uppercase tracking-[0.2em] text-neutral-400">{action.label}</span>
                    <span className="text-2xl font-light lowercase text-neutral-900 transition-colors group-hover:text-neutral-700">
                      {action.detail}
                    </span>
                  </Link>
                )
              }

              return (
                <a key={action.id} href={action.href} {...commonProps}>
                  <span className="text-sm uppercase tracking-[0.2em] text-neutral-400">{action.label}</span>
                  <span className="text-2xl font-light lowercase text-neutral-900 transition-colors group-hover:text-neutral-700">
                    {action.detail}
                  </span>
                </a>
              )
            })}
          </div>

          <div className="space-y-4 rounded-3xl border border-neutral-200 bg-neutral-50 px-6 py-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">book a demo</span>
              <h2 className="text-3xl font-light lowercase text-neutral-900 sm:text-4xl">see prism in action</h2>
              <p className="text-sm text-neutral-600 sm:text-base">
                Grab a short Zoom session with the Prism team. We walk through our offering, answer every question, and
                help you map next steps — no commitments required.
              </p>
            </div>
            <Button asChild className="w-full rounded-full sm:w-auto" size="lg">
              <a
                href={demoBooking.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackNavigation(demoBooking.id, demoBooking.href)}
              >
                book a demo on zoom
              </a>
            </Button>
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">connect</span>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm lowercase text-neutral-500">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-neutral-900"
                    onClick={() => trackNavigation(link.id, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}
