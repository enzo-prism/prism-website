"use client"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"

const DEFAULT_FORM_ENDPOINT = "https://formspree.io/f/mwpwwjek"
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_SCHOLARSHIP_FORM_ENDPOINT || DEFAULT_FORM_ENDPOINT
const BASE_APPLICATIONS = 1

const REFERRAL_OPTIONS = [
  "instagram",
  "tiktok",
  "youtube",
  "linkedin",
  "friend or client",
  "search",
  "event or meetup",
  "other",
]

type CountdownState = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

function getNextSelectionDate() {
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1, 17, 0, 0)
  return next
}

function formatCountdown(target: Date): CountdownState {
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" }
  }
  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  }
}

export default function ScholarshipPageClient() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [countdownTarget] = useState(() => getNextSelectionDate())
  const [countdown, setCountdown] = useState<CountdownState>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  })
  const [applicationsCount, setApplicationsCount] = useState(BASE_APPLICATIONS)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    setCountdown(formatCountdown(countdownTarget))
    const timer = setInterval(() => setCountdown(formatCountdown(countdownTarget)), 1000)
    return () => clearInterval(timer)
  }, [countdownTarget])

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem("prism-scholarship-applications")
    if (stored) {
      setApplicationsCount(Number(stored))
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    window.localStorage.setItem("prism-scholarship-applications", String(applicationsCount))
  }, [applicationsCount])

  useEffect(() => {
    const hero = document.getElementById("static-scholarship-hero")
    if (hero) {
      hero.setAttribute("data-hydrated-hidden", "true")
      hero.setAttribute("aria-hidden", "true")
      hero.style.display = "none"
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")
    setErrorMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = new FormData()
    payload.append("first_name", String(formData.get("firstName") || ""))
    payload.append("last_name", String(formData.get("lastName") || ""))
    payload.append("email", String(formData.get("email") || ""))
    payload.append("heard_about", String(formData.get("referral") || ""))
    payload.append("project_description", String(formData.get("project") || ""))
    payload.append("page", "scholarship")

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      })

      if (!response.ok) {
        throw new Error("could not submit your application. please try again in a moment.")
      }

      setStatus("success")
      setApplicationsCount((previous) => previous + 1)
      form.reset()
      const textArea = form.querySelector<HTMLTextAreaElement>("textarea")
      textArea?.blur()
    } catch (error) {
      console.error("scholarship form submission failed", error)
      setErrorMessage(error instanceof Error ? error.message : "something went wrong. please try again.")
      setStatus("error")
    }
  }

  const countdownBlocks = useMemo(
    () => [
      { label: "days", value: countdown.days },
      { label: "hours", value: countdown.hours },
      { label: "minutes", value: countdown.minutes },
      { label: "seconds", value: countdown.seconds },
    ],
    [countdown],
  )

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <Navbar />
      <main className="flex-1">
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.28em] text-neutral-500">monthly pick</p>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">one founder, one free website each month.</h2>
                <p className="text-base leading-relaxed text-neutral-600">tell us your idea.</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {countdownBlocks.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-5 text-center"
                    >
                      <div className="text-3xl font-semibold tracking-tight text-neutral-900">
                        {item.value}
                      </div>
                      <div className="text-xs uppercase tracking-[0.32em] text-neutral-500">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid gap-3 rounded-3xl border border-neutral-200 bg-neutral-50 px-5 py-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">applications submitted</p>
                    <p className="mt-2 text-2xl font-semibold text-neutral-900">{applicationsCount}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">portfolio examples</p>
                    <Link
                      href="/websites"
                      className="mt-2 inline-flex items-center text-sm font-semibold lowercase text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
                    >
                      see how we approach websites
                    </Link>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-neutral-200 bg-white/80 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.35)] backdrop-blur">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium lowercase text-neutral-600">
                        first name
                      </label>
                      <Input id="firstName" name="firstName" required autoComplete="given-name" placeholder="alex" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium lowercase text-neutral-600">
                        last name
                      </label>
                      <Input id="lastName" name="lastName" required autoComplete="family-name" placeholder="rivera" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium lowercase text-neutral-600">
                      email
                    </label>
                    <Input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="referral" className="text-sm font-medium lowercase text-neutral-600">
                      how did you first hear about prism?
                    </label>
                    <select
                      id="referral"
                      name="referral"
                      required
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-ring focus:outline-hidden focus:ring-1 focus:ring-ring"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        choose an option
                      </option>
                      {REFERRAL_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="project" className="text-sm font-medium lowercase text-neutral-600">
                      tell us about the website you would like us to build
                    </label>
                    <Textarea
                      id="project"
                      name="project"
                      minLength={24}
                      required
                      rows={5}
                      placeholder="share what you are building, who it serves, and what the site should help you achieve."
                    />
                  </div>
                  {status === "success" ? (
                    <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      thanks for applying. we will review your submission before the next pick and follow up via email.
                    </p>
                  ) : null}
                  {status === "error" && errorMessage ? (
                    <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                      {errorMessage}
                    </p>
                  ) : null}
                  <Button
                    type="submit"
                    className="w-full rounded-full bg-neutral-900 py-3 text-base lowercase text-white hover:bg-neutral-800"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "submitting…" : "submit application"}
                  </Button>
                  <p className="text-xs text-neutral-400">
                    we review every entry manually and reach out via email if you are selected. submitting an application does not guarantee selection.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
