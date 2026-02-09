"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import PixelishImg from "@/components/pixelish/PixelishImg"
import { cn } from "@/lib/utils"

interface CheckoutFormProps {
  plan: "launch" | "grow" | "scale"
}

export default function CheckoutForm({ plan }: CheckoutFormProps) {
  const router = useRouter()
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

    const formEndpoints = {
      launch: "https://formspree.io/f/xdkjweov",
      grow: "https://formspree.io/f/mqajypqo",
      scale: "https://formspree.io/f/mzzwjeap",
    }

    try {
      const response = await fetch(formEndpoints[plan], {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          plan: plan,
          ...formData,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        const error = data.errors?.map((e: any) => e.message).join(", ") || "Something went wrong"
        throw new Error(error)
      }

      setStatus("success")
      router.push(`/checkout/${plan}/thank-you`)
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

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
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
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Ideal Contact Method</Label>
          <div className="flex gap-4">
            <label className={cn(
              "flex-1 cursor-pointer rounded-md border p-4 text-center text-xs font-semibold uppercase font-pixel tracking-[0.14em] transition-[background-color,border-color,color,box-shadow] duration-200",
              formData.preferredContact === "email" 
                ? "border-primary bg-primary text-primary-foreground ring-2 ring-ring/50 ring-offset-2 ring-offset-background" 
                : "border-border/60 bg-card/30 text-muted-foreground hover:bg-card/45 hover:text-foreground"
            )}>
              <input
                type="radio"
                name="preferredContact"
                value="email"
                className="sr-only"
                checked={formData.preferredContact === "email"}
                onChange={() => setFormData(prev => ({ ...prev, preferredContact: "email" }))}
              />
              <span className="inline-flex items-center justify-center gap-2">
                <PixelishImg
                  src="/pixelish/mail.svg"
                  alt=""
                  size={16}
                  invert={formData.preferredContact !== "email"}
                  aria-hidden="true"
                />
                <span>Email</span>
              </span>
            </label>
            <label className={cn(
              "flex-1 cursor-pointer rounded-md border p-4 text-center text-xs font-semibold uppercase font-pixel tracking-[0.14em] transition-[background-color,border-color,color,box-shadow] duration-200",
              formData.preferredContact === "phone" 
                ? "border-primary bg-primary text-primary-foreground ring-2 ring-ring/50 ring-offset-2 ring-offset-background" 
                : "border-border/60 bg-card/30 text-muted-foreground hover:bg-card/45 hover:text-foreground"
            )}>
              <input
                type="radio"
                name="preferredContact"
                value="phone"
                className="sr-only"
                checked={formData.preferredContact === "phone"}
                onChange={() => setFormData(prev => ({ ...prev, preferredContact: "phone" }))}
              />
              <span className="inline-flex items-center justify-center gap-2">
                <PixelishImg
                  src="/pixelish/device-phone.svg"
                  alt=""
                  size={16}
                  invert={formData.preferredContact !== "phone"}
                  aria-hidden="true"
                />
                <span>iMessage</span>
              </span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Anything else we should know? (Optional)</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us a bit about your project or timeline…"
            value={formData.message}
            onChange={handleChange}
            className="min-h-[120px] resize-none"
          />
        </div>

        <AnimatePresence>
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Alert variant="destructive" className="bg-destructive/10">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          disabled={status === "submitting"}
          size="lg"
          className="w-full rounded-md"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Securing Spot...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </div>
  )
}
