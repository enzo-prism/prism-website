"use client"

import { useState } from "react"
import { trackFormSubmission } from "@/utils/analytics"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const FORM_ENDPOINT = "https://formspree.io/f/xvgvvnrj"

export default function BlogEmailSignup() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus("submitting")
    setMessage(null)

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("something went wrong. please try again soon.")
      }

      form.reset()
      setStatus("success")
      setMessage("thanks! we’ll keep you in the loop.")
      trackFormSubmission("blog_updates", "blog_email_signup")
    } catch (error) {
      console.error("[BlogEmailSignup] submission failed", error)
      setStatus("error")
      setMessage("couldn’t submit right now. try again?")
    }
  }

  return (
    <section className="bg-neutral-50 px-4 py-12 sm:py-14">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 md:max-w-sm">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-neutral-500">stay in the loop</p>
          <h2 className="text-xl font-semibold text-neutral-900 sm:text-2xl">get fresh prism notes via email</h2>
          <p className="text-sm leading-relaxed text-neutral-600">
            when we publish new experiments or playbooks, we’ll send you the highlights so you can apply them faster.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 md:max-w-sm">
          <label htmlFor="blog-email" className="sr-only">
            email address
          </label>
          <Input
            id="blog-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className="h-auto w-full rounded-full border-neutral-200 bg-white px-5 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus-visible:ring-neutral-900"
          />
          <Button
            type="submit"
            className="h-auto w-full rounded-full px-5 py-3 text-sm font-semibold"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "sending..." : "send me updates"}
          </Button>
          {message ? (
            <p
              className={`text-xs ${
                status === "success" ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}
