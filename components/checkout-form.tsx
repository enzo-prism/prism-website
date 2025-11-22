"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface CheckoutFormProps {
  plan: "launch" | "grow" | "scale"
}

export default function CheckoutForm({ plan }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    preferredContact: "email" as "email" | "phone",
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    try {
      const response = await fetch("/api/prism-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: `checkout-${plan}`,
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setStatus("success")
    } catch (error) {
      console.error("Submission error:", error)
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit. Please try again.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center space-y-4 py-12"
      >
        <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
          <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-2xl font-semibold">Request Received!</h3>
        <p className="text-muted-foreground max-w-md">
          Thanks for your interest in the {plan.charAt(0).toUpperCase() + plan.slice(1)} plan. We'll be in touch via {formData.preferredContact} shortly to get things moving.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => window.location.href = "/"}>
          Return Home
        </Button>
      </motion.div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="space-y-2 text-center sm:text-left">
        <h2 className="text-3xl font-semibold tracking-tight">Let's Get Started</h2>
        <p className="text-muted-foreground">
          Fill out the details below to secure your {plan.charAt(0).toUpperCase() + plan.slice(1)} build slot.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Jane Doe"
            required
            value={formData.name}
            onChange={handleChange}
            className="bg-zinc-50 border-zinc-200 focus:border-black focus:ring-black transition-all"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jane@company.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-zinc-50 border-zinc-200 focus:border-black focus:ring-black transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone (Optional)</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              className="bg-zinc-50 border-zinc-200 focus:border-black focus:ring-black transition-all"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Ideal Contact Method</Label>
          <div className="flex gap-4">
            <label className={cn(
              "flex-1 cursor-pointer rounded-xl border p-4 text-center text-sm font-medium transition-all",
              formData.preferredContact === "email" 
                ? "border-black bg-black text-white ring-2 ring-black ring-offset-2" 
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
            )}>
              <input
                type="radio"
                name="preferredContact"
                value="email"
                className="sr-only"
                checked={formData.preferredContact === "email"}
                onChange={() => setFormData(prev => ({ ...prev, preferredContact: "email" }))}
              />
              Email
            </label>
            <label className={cn(
              "flex-1 cursor-pointer rounded-xl border p-4 text-center text-sm font-medium transition-all",
              formData.preferredContact === "phone" 
                ? "border-black bg-black text-white ring-2 ring-black ring-offset-2" 
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
            )}>
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                className="sr-only"
                checked={formData.preferredContact === "phone"}
                onChange={() => setFormData(prev => ({ ...prev, preferredContact: "phone" }))}
              />
              Phone Call
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Anything else we should know? (Optional)</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us a bit about your project or timeline..."
            value={formData.message}
            onChange={handleChange}
            className="min-h-[120px] resize-none bg-zinc-50 border-zinc-200 focus:border-black focus:ring-black transition-all"
          />
        </div>

        <AnimatePresence>
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              <AlertCircle className="h-4 w-4" />
              <p>{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full h-12 rounded-full text-base font-semibold bg-black hover:bg-black/90 transition-all shadow-lg shadow-black/5"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Securing Spot...
            </>
          ) : (
            "Confirm & Start Build"
          )}
        </Button>
      </form>
    </div>
  )
}
