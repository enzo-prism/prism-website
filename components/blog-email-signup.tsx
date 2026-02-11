"use client"

import { useState } from "react"
import { trackFormSubmission } from "@/utils/analytics"
import { Card, CardContent } from "@/components/ui/card"
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
    <section className="border-t border-border/60 bg-transparent px-4 py-12 sm:py-14">
      <Card className="mx-auto max-w-3xl rounded-md bg-card/40 shadow-none backdrop-blur-sm transition hover:bg-card/55">
        <CardContent className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 md:max-w-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">stay in the loop</p>
            <h2 className="text-2xl font-semibold text-foreground">Get fresh Prism notes via email</h2>
            <p className="text-base leading-7 text-muted-foreground">
              When we publish new experiments or playbooks, we’ll send you the highlights so you can apply them faster.
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
              className="h-auto w-full rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:ring-ring"
            />
            <Button
              type="submit"
              className="h-auto w-full rounded-md px-5 py-3"
              disabled={status === "submitting"}
            >
              {status === "submitting" ? "sending…" : "send me updates"}
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
        </CardContent>
      </Card>
    </section>
  )
}
