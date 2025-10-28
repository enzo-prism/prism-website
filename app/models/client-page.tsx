"use client"

import { FormEvent, useState } from "react"
import Link from "next/link"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import PageViewTracker from "@/components/page-view-tracker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { trackCTAClick } from "@/utils/analytics"

const offerHighlights = [
  {
    icon: "🦷",
    title: "Free Whitening",
    description: "Get a professional whitening treatment from one of our trusted partner dentists.",
  },
  {
    icon: "📸",
    title: "Professional Photos & Video",
    description: "Work with Prism’s creative team on real projects for local dental brands.",
  },
  {
    icon: "💵",
    title: "Paid Shoots",
    description: "Get compensated for your time and receive professional content for your own portfolio.",
  },
]

const howItWorks = [
  {
    icon: "1️⃣",
    title: "Apply Online",
    description: "Tell us a bit about yourself and upload a few photos.",
  },
  {
    icon: "2️⃣",
    title: "Get Matched",
    description: "We’ll connect you with a local dental office for your session.",
  },
  {
    icon: "3️⃣",
    title: "Whitening + Shoot Day",
    description: "Enjoy your complimentary whitening and a relaxed photoshoot.",
  },
  {
    icon: "4️⃣",
    title: "Get Paid & Featured",
    description: "Earn cash and see your smile in real Prism campaigns.",
  },
]

const fromShootHighlights = [
  {
    icon: "🖼️",
    title: "Studio Laughs",
    description: "Candid moments that convert.",
  },
  {
    icon: "💺",
    title: "Chairside Confidence",
    description: "Capture real patient experiences.",
  },
  {
    icon: "✨",
    title: "After-Glow Portraits",
    description: "Highlight whitening results.",
  },
  {
    icon: "🌿",
    title: "Lifestyle Moments",
    description: "Show natural, everyday smiles.",
  },
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
              <h2 className="text-3xl font-semibold lowercase sm:text-4xl">Why Join Prism Models</h2>
              <p className="mt-3 text-sm text-neutral-600 sm:mt-4 sm:text-base">
                Bring your smile to life — and get rewarded for it.
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
                <h2 className="text-3xl font-semibold lowercase sm:text-4xl">How It Works</h2>
                <p className="mt-3 text-sm text-neutral-500 sm:text-base">
                  We make it simple from start to finish.
                </p>
                <div className="mt-8 space-y-4 sm:space-y-5 md:mt-10">
                  {howItWorks.map((step) => (
                    <div
                      key={step.title}
                      className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-lg sm:h-9 sm:w-9">
                        {step.icon}
                      </span>
                      <div>
                        <h3 className="text-base font-medium lowercase text-neutral-900 sm:text-lg">{step.title}</h3>
                        <p className="mt-2 text-sm text-neutral-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800"
                  >
                    <Link href="#apply" onClick={() => trackCTAClick("models_how_it_works_apply", "#apply")}>
                      → Apply Today
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <div className="rounded-3xl border border-neutral-200 bg-neutral-900/90 p-4 text-white shadow-lg backdrop-blur sm:p-6">
                  <h3 className="text-xl font-semibold lowercase">From Shoot to Screen</h3>
                  <p className="mt-3 text-sm text-neutral-200">
                    Your photos and videos are featured across real Prism campaigns — helping practices grow while
                    showcasing confident, authentic smiles.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {fromShootHighlights.map((item) => (
                      <li
                        key={item.title}
                        className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 text-sm text-neutral-100"
                      >
                        <span className="mt-0.5 text-lg">{item.icon}</span>
                        <span>
                          <span className="font-semibold text-white">{item.title}</span> — {item.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="apply" className="bg-neutral-50 py-16 sm:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-7 shadow-md sm:rounded-[40px] sm:p-12 lg:p-14">
              <div className="space-y-3 text-center sm:space-y-4">
                <h2 className="text-3xl font-semibold lowercase text-neutral-900 sm:text-4xl">Ready to Be Featured?</h2>
                <p className="text-sm text-neutral-600 sm:text-base">
                  Join hundreds of real people who’ve worked with Prism to create authentic, confident, and professional
                  content — no modeling agency required.
                </p>
                <p className="text-sm font-semibold text-neutral-900 sm:text-base">→ Apply Now</p>
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
                    {isSubmitting ? "sending..." : "→ Apply Now"}
                  </Button>
                  <p className="text-xs text-neutral-500 sm:max-w-xs">
                    We review all applications and reach out when there’s a great match in your area.
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
                  For Dental Practices
                </p>
                <h3 className="mt-3 text-2xl font-semibold lowercase">
                  Want custom photo and video content for your marketing?
                </h3>
              </div>
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="rounded-full bg-white text-neutral-900 hover:bg-neutral-100"
              >
                <Link href="/services" onClick={() => trackCTAClick("dental_cta_models_footer", "/services")}>
                  Explore Prism Services →
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-neutral-900 py-14 text-white sm:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-3xl font-semibold lowercase sm:text-4xl">
                Real People. Real Smiles. Real Opportunities.
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-neutral-300">
                Join Prism Models for free whitening, professional photos, and paid creative work that helps dental
                practices share authentic stories.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 rounded-full bg-white text-neutral-900 hover:bg-neutral-100"
              >
                <Link href="#apply" onClick={() => trackCTAClick("models_footer_apply", "#apply")}>
                  → Apply Now
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
            <h1 className="text-3xl font-semibold lowercase sm:text-5xl">Prism Models</h1>
            <p className="text-lg font-medium text-neutral-200 sm:text-xl">
              Real People. Real Smiles. Real Opportunities.
            </p>
            <p className="text-sm text-neutral-200 sm:text-base">
              We work with everyday people who love being on camera to help our dental clients tell real stories.
            </p>
            <p className="text-sm text-neutral-200 sm:text-base">
              Join Prism Models for free whitening, professional photos, and paid creative work that makes a real impact.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-neutral-900 hover:bg-neutral-100"
              >
                <Link href="#apply" onClick={() => trackCTAClick("models_hero_apply", "#apply")}>
                  → Apply Now
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
