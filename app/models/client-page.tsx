"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import CoreImage from "@/components/core-image"
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
  { title: "Studio Laughs", caption: "Candid energy that converts." },
  { title: "Chairside Confidence", caption: "Showcase the treatment experience." },
  { title: "After-Glow Portraits", caption: "Highlight the whitening results." },
  { title: "Lifestyle Moments", caption: "Smiles that feel real and relatable." },
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

        <section className="border-b border-neutral-200 bg-neutral-50 py-20" id="offer">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-3xl font-semibold lowercase sm:text-4xl">what prism models receive</h2>
              <p className="mt-4 text-neutral-600">
                Real perks for real people who bring confident smiles to life.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {offerHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="text-3xl">{highlight.icon}</div>
                  <h3 className="mt-4 text-xl font-semibold lowercase text-neutral-900">{highlight.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
              <div>
                <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">how it works</span>
                <h2 className="mt-4 text-3xl font-semibold lowercase sm:text-4xl">
                  from application to campaign-ready in four steps
                </h2>
                <div className="mt-10 space-y-6">
                  {howItWorks.map((step, index) => (
                    <div
                      key={step.title}
                      className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-sm font-semibold uppercase tracking-wide text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-medium lowercase text-neutral-900">{step.title}</h3>
                        <p className="mt-2 text-sm text-neutral-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-3xl border border-neutral-200 bg-neutral-900/90 p-6 text-white shadow-lg backdrop-blur">
                  <h3 className="text-xl font-semibold lowercase">from shoot to screen</h3>
                  <p className="mt-3 text-sm text-neutral-200">
                    See how your session turns into scroll-stopping content across Prism campaigns.
                  </p>
                  <div className="mt-6 overflow-x-auto">
                    <div className="flex gap-4">
                      {exampleShots.map((shot) => (
                        <div
                          key={shot.title}
                          className="min-w-[220px] rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur"
                        >
                          <div className="relative h-40 w-full overflow-hidden rounded-xl bg-neutral-800">
                            <CoreImage
                              src="/prism-opengraph.png"
                              alt={shot.title}
                              fill
                              className="object-cover opacity-70"
                              sizes="220px"
                              priority={false}
                              fallbackSrc="/prism-opengraph.png"
                              trackingId={`models_example_${shot.title.replace(/\s+/g, "_").toLowerCase()}`}
                            />
                          </div>
                          <h4 className="mt-3 text-sm font-semibold lowercase text-white">{shot.title}</h4>
                          <p className="text-xs text-neutral-300">{shot.caption}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-3xl border border-dashed border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
                  📥 Bonus: New applicants automatically flow into our internal Notion database, so the right
                  opportunities reach the right talent fast.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-neutral-200 bg-white py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">real results</span>
                <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                  real smiles. real campaigns. measurable lift.
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <ResultCard
                    title="before → after"
                    description="Natural whitening transformation that keeps authenticity intact."
                    emphatic="Verified consent on all smile showcases."
                  />
                  <ResultCard
                    title="client spotlight"
                    description="“It was such a fun experience — and my smile’s never looked better.”"
                    emphatic="— Sofia, Prism Model & dental patient"
                  />
                </div>
                <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 text-sm text-neutral-600">
                  <p>
                    Prism Models appear in website hero sections, paid ads, in-practice signage, and social campaigns
                    across the country — giving dental teams fresh, authentic creative that converts.
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-neutral-900/95 p-6 text-white shadow-lg">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                  <CoreImage
                    src="/prism-opengraph.png"
                    alt="Before and after whitening"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover opacity-80"
                    fallbackSrc="/prism-opengraph.png"
                    trackingId="models_real_results"
                  />
                </div>
                <p className="mt-4 text-sm text-neutral-200">
                  Tap into Prism’s creative engine — we handle casting, glam, production, and post, so every smile feels
                  trustworthy and every story lands.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="apply" className="bg-neutral-50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm sm:p-12">
              <div className="text-center">
                <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">apply to join</span>
                <h2 className="mt-3 text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">
                  become the face of confident smiles
                </h2>
                <p className="mt-3 text-sm text-neutral-600">
                  Fill out the application below. We review every submission and reach out when there’s an opportunity in
                  your area.
                </p>
              </div>
              <form
                className="mt-10 space-y-6"
                action="https://formspree.io/f/mrbyvoqo"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField label="Name" name="name" required>
                    <Input id="models-name" name="name" placeholder="First and last name" required />
                  </FormField>
                  <FormField label="Email" name="email" required>
                    <Input
                      id="models-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </FormField>
                  <FormField label="Phone (optional)" name="phone">
                    <Input id="models-phone" type="tel" name="phone" placeholder="(555) 555-5555" />
                  </FormField>
                  <FormField label="City / ZIP" name="location" required>
                    <Input id="models-location" name="location" placeholder="San Jose, 95131" required />
                  </FormField>
                  <FormField label="Instagram / TikTok handle (optional)" name="social">
                    <Input id="models-social" name="social" placeholder="@yourhandle" />
                  </FormField>
                  <FormField label="Availability" name="availability" required>
                    <select
                      id="models-availability"
                      name="availability"
                      className="h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm text-neutral-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
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

                <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
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
                    className="cursor-pointer"
                  />
                </FormField>

                <FormField label="How did you hear about Prism Models?" name="referral">
                  <Textarea
                    id="models-referral"
                    name="referral"
                    rows={3}
                    placeholder="Friend, social media, dental practice, etc."
                    className="resize-none"
                  />
                </FormField>

                {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
                {isSuccess ? (
                  <p className="rounded-2xl bg-green-50 p-4 text-sm font-medium text-green-700">
                    Thanks! We’ll reach out soon if we have a shoot opportunity near you.
                  </p>
                ) : null}

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" size="lg" className="rounded-full px-8" disabled={isSubmitting}>
                    {isSubmitting ? "sending..." : "apply now"}
                  </Button>
                  <p className="text-xs text-neutral-500">
                    We review every application and respond within 7 business days when there’s a great fit.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 bg-white py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col gap-6 rounded-3xl border border-neutral-200 bg-neutral-900 px-8 py-10 text-white shadow-sm md:flex-row md:items-center md:justify-between">
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
                  see how we help practices grow
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-neutral-900 py-16 text-white">
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
        <div className="container mx-auto grid min-h-[70vh] items-center gap-12 px-4 py-20 md:grid-cols-[1.1fr,0.9fr] md:px-6">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.35em] text-neutral-400">prism models</span>
            <h1 className="text-4xl font-semibold lowercase sm:text-5xl">
              Prism Models — Real People. Real Smiles. Real Growth.
            </h1>
            <p className="text-sm text-neutral-200 sm:text-base">
              We partner with real people who love being on camera to help our dental clients tell authentic stories.
              Join Prism Models to get complimentary whitening, professional photos, and paid creative opportunities.
            </p>
            <div className="flex flex-wrap gap-3">
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
          <div className="relative">
            <div className="rounded-[36px] border border-white/20 bg-white/10 p-4 backdrop-blur">
              <div className="relative h-full min-h-[320px] overflow-hidden rounded-[28px] border border-white/20">
                <CoreImage
                  src="/prism-opengraph.png"
                  alt="Prism models shoot"
                  width={900}
                  height={1200}
                  className="h-full w-full object-cover opacity-80"
                  fallbackSrc="/prism-opengraph.png"
                  trackingId="models_hero_image"
                />
              </div>
              <div className="mt-4 space-y-2 text-sm text-neutral-200">
                <p>Be the face of confident smiles.</p>
                <p className="text-neutral-400">Complimentary whitening + paid shoots for local talent.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResultCard({ title, description, emphatic }: { title: string; description: string; emphatic: string }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold lowercase text-neutral-900">{title}</h3>
      <p className="mt-2 text-sm text-neutral-600">{description}</p>
      <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">{emphatic}</p>
    </div>
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
    <label className="space-y-2 text-sm text-neutral-700" htmlFor={`models-${name}`}>
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
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        id={id}
        name={name}
        required={required}
        className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-2 focus:ring-neutral-900"
      />
      <label htmlFor={id} className={cn("text-sm text-neutral-700", required ? "font-medium" : undefined)}>
        {label}
      </label>
    </div>
  )
}
