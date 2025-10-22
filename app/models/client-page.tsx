"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { trackCTAClick } from "@/utils/analytics"

const offerHighlights = [
  {
    icon: "🦷",
    title: "Free Whitening",
    description: "Get premium in-office whitening at one of our partner practices.",
  },
  {
    icon: "📸",
    title: "Professional Photos & Video",
    description: "Work with Prism’s creative team on real marketing projects for dental brands.",
  },
  {
    icon: "💵",
    title: "Paid Shoots",
    description: "Receive compensation for your time — plus content you can use in your portfolio.",
  },
]

const howItWorks = [
  {
    title: "Apply Online",
    description: "Fill out a short form with your info and photos.",
  },
  {
    title: "Get Matched",
    description: "We’ll pair you with a local dental practice for your shoot.",
  },
  {
    title: "Whitening & Shoot Day",
    description: "Enjoy complimentary whitening and a relaxed photo/video session.",
  },
  {
    title: "Get Paid & Featured",
    description: "Earn compensation and see your smile featured in Prism campaigns.",
  },
]

const exampleShots = [
  {
    title: "Studio Laughs",
    caption: "Candid energy that converts.",
    image: "/model-studio.webp",
  },
  {
    title: "Chairside Confidence",
    caption: "Showcase the treatment experience.",
    image: "/model-chair.webp",
  },
  {
    title: "After-Glow Portraits",
    caption: "Highlight the whitening results.",
    image: "/model-after-photo.webp",
  },
  {
    title: "Lifestyle Moments",
    caption: "Smiles that feel real and relatable.",
    image: "/model-lifestyle.webp",
  },
]

const dentalPartners = [
  { name: "Dr. Christopher B. Wong", href: "/case-studies/dr-christopher-wong" },
  { name: "Exquisite Dentistry", href: "https://www.exquisitedentistryla.com" },
  { name: "Laguna Beach Dental Arts", href: "https://www.lagunabeachdentalarts.com" },
  { name: "Family First Smile Care", href: "/case-studies/family-first-smile-care" },
  { name: "Town Centre Dental", href: "/case-studies/town-centre-dental" },
  { name: "Grace Dental Santa Rosa", href: "/case-studies/grace-dental-santa-rosa" },
  { name: "Wine Country Root Canal", href: "https://www.winecountryrootcanal.com" },
  { name: "Coast Periodontics & Laser Surgery", href: "https://www.coastperiodontics.com" },
]

export default function ModelsPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsSuccess(false)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      setIsSubmitting(true)
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        form.reset()
        setIsSuccess(true)
        return
      }

      const body = await response.json().catch(() => null)
      const message =
        (body && (body.error || body.message)) ||
        "We couldn't submit your application. Please try again or email support@design-prism.com."
      setError(message)
    } catch (submissionError) {
      console.error("Error submitting models application:", submissionError)
      setError("We couldn't submit your application. Please try again or email support@design-prism.com.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <PageViewTracker title="Prism Models" />
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        <section className="border-b border-neutral-200 bg-neutral-50 py-14 sm:py-20" id="offer">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-semibold lowercase sm:text-4xl">what prism models receive</h2>
              <p className="mt-3 text-sm text-neutral-600 sm:mt-4 sm:text-base">
                Real perks for real people who bring confident smiles to life.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
              {offerHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-8"
                >
                  <div className="text-2xl sm:text-3xl">{highlight.icon}</div>
                  <h3 className="mt-3 text-lg font-semibold lowercase text-neutral-900 sm:mt-4 sm:text-xl">
                    {highlight.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 sm:mt-3">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-start xl:gap-16">
              <div className="flex-1 lg:max-w-xl">
                <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">how it works</span>
                <h2 className="mt-4 text-3xl font-semibold lowercase sm:text-4xl">
                  from application to campaign-ready in four steps
                </h2>
                <p className="mt-3 text-sm text-neutral-500 sm:text-base">
                  A short path from raising your hand to seeing your smile featured in real campaigns.
                </p>
                <div className="mt-8 space-y-4 sm:space-y-5 md:mt-10">
                  {howItWorks.map((step, index) => (
                    <div
                      key={step.title}
                      className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold uppercase tracking-wide text-white sm:h-9 sm:w-9">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-base font-medium lowercase text-neutral-900 sm:text-lg">{step.title}</h3>
                        <p className="mt-2 text-sm text-neutral-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div className="rounded-3xl border border-neutral-200 bg-neutral-900/90 p-4 text-white shadow-lg backdrop-blur sm:p-6">
                  <h3 className="text-xl font-semibold lowercase">from shoot to screen</h3>
                  <p className="mt-3 text-sm text-neutral-200">
                    See how your session turns into scroll-stopping content across Prism campaigns.
                  </p>
                  <div className="mt-6 flex gap-3 overflow-x-auto pb-2 sm:gap-4">
                    {exampleShots.map((shot, index) => (
                      <figure
                        key={shot.title}
                        className="min-w-[180px] rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur sm:min-w-[220px] sm:p-4"
                      >
                        <Image
                          src={shot.image}
                          alt={shot.title}
                          width={220}
                          height={280}
                          priority={index === 0}
                          className="h-40 w-full rounded-lg object-cover sm:h-48"
                        />
                        <figcaption className="mt-3 text-sm font-semibold lowercase text-white">{shot.title}</figcaption>
                        <p className="text-xs text-neutral-300">{shot.caption}</p>
                      </figure>
                    ))}
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-neutral-400">
                    swipe to explore sample frames
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-neutral-50 py-14 sm:py-16" id="partners">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">dental brands</span>
              <h2 className="mt-2 text-xl font-semibold lowercase text-neutral-900 sm:mt-3 sm:text-3xl">
                trusted by practices we support
              </h2>
            </div>
            <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
              {dentalPartners.map((partner) => {
                const partnerId = `partner_${partner.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
                const isExternal = partner.href.startsWith("http")
                const CardContent = (
                  <>
                    <span className="font-medium text-neutral-900 transition group-hover:text-neutral-900">
                      {partner.name}
                    </span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-neutral-400">visit site</span>
                  </>
                )

                if (isExternal) {
                  return (
                    <a
                      key={partner.name}
                      href={partner.href}
                      target="_blank"
                      rel="noreferrer"
                    className="group rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-sm lowercase text-neutral-700 transition hover:-translate-y-1 hover:border-neutral-900 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 sm:px-5"
                    onClick={() => trackCTAClick(partnerId, partner.href)}
                  >
                    {CardContent}
                  </a>
                )
                }

                return (
                  <Link
                    key={partner.name}
                    href={partner.href}
                  className="group rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-sm lowercase text-neutral-700 transition hover:-translate-y-1 hover:border-neutral-900 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 sm:px-5"
                  onClick={() => trackCTAClick(partnerId, partner.href)}
                >
                  {CardContent}
                </Link>
              )
              })}
            </div>
          </div>
        </section>

        <section id="apply" className="bg-neutral-50 py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-7 shadow-md sm:rounded-[40px] sm:p-12 lg:p-14">
              <div className="space-y-3 text-center sm:space-y-4">
                <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">apply to join</span>
                <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                  become the face of confident smiles
                </h2>
                <p className="text-sm text-neutral-600 sm:text-base">
                  Fill out the application below. We review every submission and reach out when there’s an opportunity in
                  your area.
                </p>
              </div>
              <form
                className="mt-9 flex flex-col gap-6 sm:mt-12 sm:gap-8"
                action="https://formspree.io/f/mrbyvoqo"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8">
                  <FormField label="Name" name="name" required>
                    <Input id="models-name" name="name" placeholder="First and last name" required className="h-11" />
                  </FormField>
                  <FormField label="Email" name="email" required>
                    <Input
                      id="models-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="h-11"
                    />
                  </FormField>
                  <FormField label="Phone (optional)" name="phone">
                    <Input id="models-phone" type="tel" name="phone" placeholder="(555) 555-5555" className="h-11" />
                  </FormField>
                  <FormField label="City / ZIP" name="location" required>
                    <Input id="models-location" name="location" placeholder="San Jose, 95131" required className="h-11" />
                  </FormField>
                  <FormField label="Instagram / TikTok handle (optional)" name="social">
                    <Input id="models-social" name="social" placeholder="@yourhandle" className="h-11" />
                  </FormField>
                  <FormField label="Availability" name="availability" required>
                    <select
                      id="models-availability"
                      name="availability"
                      className="h-11 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select availability
                      </option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="flexible">Flexible / both</option>
                    </select>
                  </FormField>
                </div>

                <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:space-y-5 sm:p-6">
                  <CheckboxField
                    id="models-over-18"
                    label="I am 18 or older."
                    name="is_over_18"
                    required
                  />
                  <CheckboxField
                    id="models-open-whitening"
                    label="I'm open to complimentary whitening."
                    name="open_to_whitening"
                  />
                </div>

                <FormField label="Upload 2–3 photos (headshot, smile, full body)" name="photos" required>
                  <Input
                    id="models-photos"
                    type="file"
                    name="photos"
                    accept="image/*"
                    multiple
                    required
                    className="h-11 cursor-pointer"
                  />
                </FormField>

                <FormField label="How did you hear about Prism Models?" name="referral">
                  <Textarea
                    id="models-referral"
                    name="referral"
                    rows={3}
                    placeholder="Friend, social media, dental practice, etc."
                    className="resize-none leading-relaxed"
                  />
                </FormField>

                {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
                {isSuccess ? (
                  <p className="rounded-2xl bg-green-50 p-4 text-sm font-medium text-green-700">
                    Thanks! We’ll reach out soon if we have a shoot opportunity near you.
                  </p>
                ) : null}

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <Button type="submit" size="lg" className="rounded-full px-10" disabled={isSubmitting}>
                    {isSubmitting ? "sending..." : "apply now"}
                  </Button>
                  <p className="text-xs text-neutral-500 sm:max-w-xs">
                    We review every application and respond within 7 business days when there’s a great fit.
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
                <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
                  for dental practices
                </p>
                <h3 className="mt-3 text-2xl font-semibold lowercase">
                  want fresh, authentic marketing content?
                </h3>
                <p className="mt-2 max-w-xl text-sm text-neutral-300">
                  Prism handles casting, creative direction, production, and delivery. We make it effortless to ship
                  campaigns that feel true to your practice.
                </p>
              </div>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="rounded-full bg-white text-neutral-900 hover:bg-neutral-100"
              >
                <Link href="/services" onClick={() => trackCTAClick("dental_cta_models_footer", "/services")}>
                  explore the prism services platform
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-neutral-900 py-14 text-white sm:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-semibold lowercase sm:text-4xl">
                every great smile deserves to be seen
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-neutral-300">
                Showcase your confidence, support local dental teams, and build a portfolio you’re proud of. Prism
                Models puts real people in front of the camera — no agencies required.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 rounded-full bg-white text-neutral-900 hover:bg-neutral-100"
              >
                <Link href="#apply" onClick={() => trackCTAClick("models_footer_apply", "#apply")}>
                  apply to join
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
    <section className="relative overflow-hidden border-b border-neutral-200 bg-neutral-900 text-white">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: "url('/client-gradient.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-900/80 to-neutral-800 opacity-90" />
      </div>
      <div className="relative">
        <div className="container mx-auto flex min-h-[60vh] flex-col justify-center gap-8 px-4 py-16 sm:gap-12 sm:py-20 md:px-6">
          <div className="max-w-3xl space-y-5 sm:space-y-6">
            <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">prism models</span>
            <h1 className="text-3xl font-semibold lowercase sm:text-5xl">
              Prism Models — Real People. Real Smiles. Real Growth.
            </h1>
            <p className="text-sm text-neutral-200 sm:text-base">
              We partner with real people who love being on camera to help our dental clients tell authentic stories.
              Join Prism Models to get complimentary whitening, professional photos, and paid creative opportunities.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-neutral-900 hover:bg-neutral-100"
              >
                <Link href="#apply" onClick={() => trackCTAClick("models_hero_apply", "#apply")}>
                  apply to join
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-full border border-white/40 bg-transparent text-white hover:bg-white/10"
              >
                <Link href="#how-it-works" onClick={() => trackCTAClick("models_hero_how_it_works", "#how-it-works")}>
                  see how it works
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
  required,
}: {
  label: string
  name: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label className="flex flex-col gap-2.5 text-sm text-neutral-700 sm:gap-3" htmlFor={`models-${name}`}>
      <span className="flex items-center justify-between font-medium lowercase">
        {label}
        {required ? <span className="text-xs uppercase tracking-[0.2em] text-neutral-400">required</span> : null}
      </span>
      {children}
    </label>
  )
}

function CheckboxField({
  id,
  label,
  name,
  required,
}: {
  id: string
  label: string
  name: string
  required?: boolean
}) {
  return (
    <div className="flex items-start gap-4">
      <input
        type="checkbox"
        id={id}
        name={name}
        required={required}
        className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-2 focus:ring-neutral-900"
      />
      <label htmlFor={id} className={cn("text-sm leading-relaxed text-neutral-700", required ? "font-medium" : undefined)}>
        {label}
      </label>
    </div>
  )
}
