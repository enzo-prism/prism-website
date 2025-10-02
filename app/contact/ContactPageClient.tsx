"use client"

import { ContactPageSchema } from "@/components/schema-markup"
import { trackNavigation } from "@/utils/analytics"
import dynamic from "next/dynamic"
import Link from "next/link"

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
    detail: "submit an application",
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