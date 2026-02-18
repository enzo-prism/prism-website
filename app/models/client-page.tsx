"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PixelishImg from "@/components/pixelish/PixelishImg"
import { pixelishForEmoji } from "@/lib/pixelish-emoji"
import { trackCTAClick } from "@/utils/analytics"

const offerHighlights = [
  {
    icon: "🦷",
    title: "free whitening",
    description: "get a professional whitening treatment from one of our trusted partner dentists.",
    note: "a $300-$1,000+ value",
  },
  {
    icon: "📸",
    title: "professional photos & video",
    description: "work with prism’s creative team on real projects for local dental brands.",
  },
  {
    icon: "💵",
    title: "paid shoots",
    description: "get compensated for your time and receive professional content for your own portfolio.",
  },
  {
    icon: "📅",
    title: "flexible bookings",
    description:
      "get alerts when opportunities pop up, pass on the ones that don’t fit, and lock in sessions that work for you.",
  },
]

const howItWorks = [
  {
    icon: "1",
    title: "apply online",
    description: "fill out the short application form to get started.",
  },
  {
    icon: "2",
    title: "get approved",
    description: "if you’re a good fit, we’ll add you to the prism models list.",
  },
  {
    icon: "3",
    title: "choose your session",
    description: "view available whitening appointments and pick one that fits your schedule.",
  },
  {
    icon: "4",
    title: "whitening day",
    description: "attend your appointment and enjoy your professional teeth whitening.",
  },
  {
    icon: "5",
    title: "get paid",
    description: "receive payment from prism after your session.",
  },
  {
    icon: "6",
    title: "come back anytime",
    description: "check the list again whenever you’re ready for your next whitening.",
  },
]

const dentalPartners = [
  {
    name: "exquisite dentistry",
    location: "beverly hills, ca",
    doctor: "dr. alexie aguil",
    url: "https://exquisitedentistryla.com",
  },
  {
    name: "laguna beach dental arts",
    location: "laguna beach, ca",
    doctor: "dr. teagan willes",
    url: "https://lagunabeachdentalarts.com",
  },
  {
    name: "dr. christopher b. wong",
    location: "palo alto, ca",
    doctor: "dr. christopher b. wong",
    url: "https://www.chriswongdds.com",
  },
  {
    name: "family first smile care",
    location: "los gatos, ca",
    doctor: "dr. tim j. chuang",
    url: "https://famfirstsmile.com",
  },
  {
    name: "town centre dental",
    location: "brentwood, ca",
    doctor: "dr. gerard banaga",
    url: "https://www.towncentredental.net",
  },
  {
    name: "grace dental santa rosa",
    location: "santa rosa, ca",
    doctor: "dr. tingjen ji",
    url: "https://www.tingjenjidds.com",
  },
]

export default function ModelsPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contactMethod, setContactMethod] = useState<"email" | "text" | "">("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSuccess(false)

    const form = event.currentTarget
    const formData = new FormData(form)

    const selectedContactMethod = (
      contactMethod || (formData.get("preferred_contact_method")?.toString() ?? "")
    ).toLowerCase() as "email" | "text" | ""

    if (selectedContactMethod !== "email" && selectedContactMethod !== "text") {
      setError("please choose how we should contact you.")
      return
    }

    if (selectedContactMethod === "email") {
      const emailValue = (formData.get("email")?.toString() ?? "").trim()
      if (!emailValue) {
        setError("please enter your email address.")
        return
      }
    }

    if (selectedContactMethod === "text") {
      const phoneValue = (formData.get("phone")?.toString() ?? "").trim()
      if (!phoneValue) {
        setError("please enter your mobile number.")
        return
      }
    }

    formData.set("preferred_contact_method", selectedContactMethod)

    try {
      setIsSubmitting(true)
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        form.reset()
        setContactMethod("")
        setError(null)
        setIsSuccess(true)
        return
      }

      const body = await response.json().catch(() => null)
      const message =
        (body && (body.error || body.message)) ||
        "we couldn't submit your application. please try again or email support@design-prism.com."
      setError(
        typeof message === "string"
          ? message.toLowerCase()
          : "we couldn't submit your application. please try again or email support@design-prism.com."
      )
    } catch (submissionError) {
      console.error("error submitting models application:", submissionError)
      setError("we couldn't submit your application. please try again or email support@design-prism.com.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContactMethodChange = (value: "email" | "text") => {
    setContactMethod(value)
    setError(null)
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <section className="bg-white py-12 sm:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-xl">
                <h2 className="text-2xl font-semibold lowercase text-neutral-900 sm:text-3xl">
                  dentists you can model for
                </h2>
              </div>
            </div>
            <div className="relative mt-8">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/70 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/70 to-transparent" />
              <div
                className="flex gap-6 overflow-x-auto px-1 pb-4 sm:gap-7 sm:pb-6 [mask-image:linear-gradient(90deg,transparent,black 6%,black 94%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none" }}
              >
                {dentalPartners.map((partner) => (
                  <a
                    key={partner.name}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`visit ${partner.name} website`}
                    onClick={() => trackCTAClick("models_dental_partner", partner.name)}
                    className="group block min-w-[240px] shrink-0 rounded-3xl border border-neutral-200/70 bg-neutral-50/75 p-6 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:bg-white hover:shadow-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="space-y-2 text-left">
                      <p className="text-sm font-semibold lowercase text-neutral-900">
                        {partner.name}
                      </p>
                      <p className="text-xs lowercase text-neutral-500">{partner.location}</p>
                      <p className="text-xs lowercase text-neutral-500">
                        lead dentist: <span className="font-medium text-neutral-700">{partner.doctor}</span>
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-neutral-200 bg-neutral-50 py-14 sm:py-20" id="offer">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-semibold lowercase sm:text-4xl">why join prism models</h2>
            </div>
            <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 md:gap-8">
              {offerHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-8"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50" aria-hidden="true">
                    <PixelishImg src={pixelishForEmoji(highlight.icon).src} alt="" size={26} invert={false} aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold lowercase text-neutral-900 sm:mt-4 sm:text-xl">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 sm:mt-3">{highlight.description}</p>
                  {highlight.note ? (
                    <p className="mt-auto pt-4 text-xs lowercase text-neutral-400">{highlight.note}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 sm:py-20">
          <div className="container mx-auto flex flex-col px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold lowercase sm:text-4xl">how it works</h2>
              <p className="mt-3 text-sm text-neutral-500 sm:text-base">
                we make it simple from start to finish.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:gap-6 md:mt-12 md:grid-cols-2 xl:grid-cols-3">
              {howItWorks.map((step) => (
                <div
                  key={step.title}
                  className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg sm:p-8"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white to-neutral-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex h-full flex-col gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-neutral-800 sm:h-12 sm:w-12">
                      {step.icon}
                    </span>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg font-semibold lowercase text-neutral-900 sm:text-xl">{step.title}</h3>
                      <p className="text-sm text-neutral-600 sm:text-base">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
              >
                <Link href="#apply" onClick={() => trackCTAClick("models_how_it_works_apply", "#apply")}>
                  → apply today
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="apply" className="bg-neutral-50 py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-7 shadow-md sm:rounded-[40px] sm:p-12 lg:p-14">
              <div className="space-y-3 text-center sm:space-y-4">
                <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">ready to be featured?</h2>
                <p className="text-sm text-neutral-600 sm:text-base">
                  join hundreds of real people who’ve worked with prism to create authentic, confident, and professional
                  content — no modeling agency required.
                </p>
              </div>
              <form
                className="mt-9 flex flex-col gap-6 sm:mt-12 sm:gap-8"
                action="https://formspree.io/f/mrbyvoqo"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
                  <FormField label="name" name="name">
                    <Input id="models-name" name="name" placeholder="first and last name" required className="h-11" />
                  </FormField>
                  <FormField label="city / state" name="location">
                    <Input id="models-location" name="location" placeholder="beverly hills, ca" required className="h-11" />
                  </FormField>
                  <div className="sm:col-span-2">
                    <FormField label="instagram username" name="social" optional>
                      <Input id="models-social" name="social" placeholder="@yourhandle" className="h-11" />
                    </FormField>
                  </div>
                  <div className="sm:col-span-2">
                    <fieldset className="rounded-3xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
                      <legend className="text-sm font-semibold lowercase text-neutral-900">preferred contact method</legend>
                      <p className="mt-2 text-xs text-neutral-500">
                        choose the best way to reach you.
                      </p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <label
                          className={`flex flex-col gap-2 rounded-2xl border px-4 py-3 text-sm font-medium lowercase transition hover:border-neutral-300 focus-within:border-neutral-900 focus-within:shadow-sm ${
                            contactMethod === "email" ? "border-neutral-900 bg-white shadow-sm" : "border-neutral-200 bg-white/70"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
                                contactMethod === "email"
                                  ? "border-neutral-900 bg-neutral-900 text-white"
                                  : "border-neutral-300 bg-white text-transparent"
                              }`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  contactMethod === "email" ? "bg-white" : "bg-transparent"
                                }`}
                              />
                            </span>
                            email
                          </span>
                          <span className="text-xs font-normal text-neutral-500">
                            quick replies straight to your inbox.
                          </span>
                          <input
                            type="radio"
                            name="preferred_contact_method"
                            value="email"
                            className="sr-only"
                            checked={contactMethod === "email"}
                            onChange={() => handleContactMethodChange("email")}
                            required
                          />
                        </label>
                        <label
                          className={`flex flex-col gap-2 rounded-2xl border px-4 py-3 text-sm font-medium lowercase transition hover:border-neutral-300 focus-within:border-neutral-900 focus-within:shadow-sm ${
                            contactMethod === "text" ? "border-neutral-900 bg-white shadow-sm" : "border-neutral-200 bg-white/70"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
                                contactMethod === "text"
                                  ? "border-neutral-900 bg-neutral-900 text-white"
                                  : "border-neutral-300 bg-white text-transparent"
                              }`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  contactMethod === "text" ? "bg-white" : "bg-transparent"
                                }`}
                              />
                            </span>
                            text message
                          </span>
                          <span className="text-xs font-normal text-neutral-500">
                            get updates by text — no phone calls.
                          </span>
                          <input
                            type="radio"
                            name="preferred_contact_method"
                            value="text"
                            className="sr-only"
                            checked={contactMethod === "text"}
                            onChange={() => handleContactMethodChange("text")}
                            required
                          />
                        </label>
                      </div>
                      <div className="mt-6 space-y-4">
                        {contactMethod === "email" ? (
                          <div className="flex flex-col gap-2">
                            <label htmlFor="models-email" className="text-xs font-medium lowercase text-neutral-600">
                              email address
                            </label>
                            <Input
                              id="models-email"
                              type="email"
                              name="email"
                              placeholder="you@example.com"
                              autoComplete="email"
                              className="h-11"
                              required
                              onChange={() => setError(null)}
                            />
                          </div>
                        ) : null}
                        {contactMethod === "text" ? (
                          <div className="flex flex-col gap-2">
                            <label htmlFor="models-phone" className="text-xs font-medium lowercase text-neutral-600">
                              mobile number for texts
                            </label>
                            <Input
                              id="models-phone"
                              type="tel"
                              name="phone"
                              placeholder="(555) 555-5555"
                              autoComplete="tel"
                              className="h-11"
                              required
                              onChange={() => setError(null)}
                            />
                            <p className="text-xs text-neutral-400">we only text with shoot updates and reminders.</p>
                          </div>
                        ) : null}
                      </div>
                    </fieldset>
                  </div>
                </div>
                {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
                {isSuccess ? (
                  <p className="rounded-2xl bg-green-50 p-4 text-sm font-medium text-green-700">
                    thanks! we’ll reach out soon if we have a shoot opportunity near you.
                  </p>
                ) : null}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <Button type="submit" size="lg" className="rounded-full px-10" disabled={isSubmitting}>
                    {isSubmitting ? "sending…" : "→ apply now"}
                  </Button>
                  <p className="text-xs text-neutral-500 sm:max-w-xs">
                    we review all applications and reach out when there’s a great match in your area.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white py-14 sm:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col gap-6 rounded-3xl border border-neutral-200 bg-neutral-900 px-6 py-8 text-white shadow-sm sm:px-8 sm:py-10 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs tracking-[0.35em] text-neutral-400">
                  for dental practices
                </p>
                <h3 className="mt-3 text-2xl font-semibold lowercase">
                  want custom photo and video content for your marketing?
                </h3>
              </div>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="rounded-full bg-white text-neutral-900 hover:bg-neutral-100"
              >
                <Link href="/services" onClick={() => trackCTAClick("dental_cta_models_footer", "/services")}>
                  explore prism services →
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-neutral-900 py-14 text-white sm:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-semibold lowercase sm:text-4xl">
                real people. real smiles. real opportunities.
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-neutral-300">
                join prism models for free whitening, professional photos, and paid creative work that helps dental
                practices share authentic stories.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 rounded-full bg-white text-neutral-900 hover:bg-neutral-100"
              >
                <Link href="#apply" onClick={() => trackCTAClick("models_footer_apply", "#apply")}>
                  → apply now
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-50 text-neutral-900">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761853323/thumbnail_yscklx.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <video
          className="hero-loop-video pointer-events-none hidden h-full w-full object-cover sm:block"
          src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1761852734/models_2_x9gxtj.mp4"
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          x-webkit-airplay="deny"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          draggable={false}
          poster="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761853323/thumbnail_yscklx.webp"
          aria-hidden="true"
          data-hero-loop="true"
        />
        <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]" />
      </div>
      <div className="relative">
        <div className="container mx-auto flex min-h-[60vh] flex-col justify-center gap-8 px-4 py-16 sm:gap-12 sm:py-20 md:px-6">
          <div className="max-w-3xl space-y-5 sm:space-y-6">
            <h1 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-5xl">prism models</h1>
            <p className="text-lg font-medium text-neutral-700 sm:text-xl">
              elite models for cosmetic dental practice ads
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-neutral-900 text-white shadow-sm hover:bg-neutral-800"
              >
                <Link href="#apply" onClick={() => trackCTAClick("models_hero_apply", "#apply")}>
                  → apply now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


function FormField({
  label,
  name,
  children,
  optional,
}: {
  label: string
  name: string
  children: React.ReactNode
  optional?: boolean
}) {
  return (
    <label className="flex flex-col gap-2.5 text-sm text-neutral-700 sm:gap-3" htmlFor={`models-${name}`}>
      <span className="flex items-center justify-between font-medium lowercase">
        {label}
        {optional ? <span className="text-xs tracking-[0.2em] text-neutral-300">optional</span> : null}
      </span>
      {children}
    </label>
  )
}
