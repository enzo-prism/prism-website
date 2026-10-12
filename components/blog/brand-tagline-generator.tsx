"use client"

import { useId, useState } from "react"
import { Sparkles, Copy, Check, RefreshCw, Target } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TaglineData {
  business: string
  specialty: string
  audience: string
  value: string
}

const templates = [
  "{business}: {specialty} for {audience}",
  "{business}: {value} {specialty}",
  "{specialty} {business} for {audience}",
  "{value} {specialty} by {business}",
  "{business} - {specialty} that {value}",
  "{audience}'s {value} {specialty} source"
]

const suggestions = {
  business: ["studio", "co", "collective", "lab", "works", "craft", "forge", "house"],
  specialty: ["artisan", "custom", "premium", "boutique", "handcrafted", "fresh", "organic", "expert"],
  audience: ["busy families", "health-conscious", "modern professionals", "local community", "small businesses", "eco-minded"],
  value: ["reliable", "affordable", "quick", "sustainable", "innovative", "trusted", "quality", "personalized"]
}

const FIELDS: Array<{
  key: keyof TaglineData
  label: string
  placeholder: string
  appendSuggestion?: boolean
}> = [
  { key: "business", label: "Business Name *", placeholder: "e.g., Sweet Haven", appendSuggestion: true },
  { key: "specialty", label: "Specialty/Product *", placeholder: "e.g., artisan sourdough" },
  { key: "audience", label: "Target Audience *", placeholder: "e.g., busy families" },
  { key: "value", label: "Value Proposition (Optional)", placeholder: "e.g., reliable, affordable, quick" },
]

export default function BrandTaglineGenerator() {
  const idPrefix = useId()
  const [formData, setFormData] = useState<TaglineData>({
    business: "",
    specialty: "",
    audience: "",
    value: ""
  })
  const [generatedTaglines, setGeneratedTaglines] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (field: keyof TaglineData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateTaglines = () => {
    if (!formData.business || !formData.specialty || !formData.audience) {
      return
    }

    setIsGenerating(true)

    setTimeout(() => {
      const taglines = templates.map(template =>
        template
          .replace("{business}", formData.business)
          .replace("{specialty}", formData.specialty)
          .replace("{audience}", formData.audience)
          .replace("{value}", formData.value || "premium")
      ).filter(tagline => tagline.split(" ").length <= 8)

      setGeneratedTaglines(taglines)
      setIsGenerating(false)
    }, 1500)
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      toast.success("tagline copied")
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (error) {
      console.error("[BrandTaglineGenerator] failed to copy tagline", error)
      toast.error("couldn't copy tagline")
    }
  }

  const addSuggestion = (field: keyof TaglineData, suggestion: string) => {
    setFormData(prev => ({ ...prev, [field]: suggestion }))
  }

  const isFormValid = formData.business && formData.specialty && formData.audience

  return (
    <TooltipProvider delayDuration={250}>
      <div className="my-10 w-full rounded-3xl border border-white/[0.08] bg-card p-5 shadow-[0_1px_0_0_oklch(1_0_0/5%)_inset] sm:p-8">
        <div className="mb-6 flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
            <Sparkles className="size-5 text-foreground/85" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-eyebrow mb-2! mt-0! text-subtle">Interactive</p>
            <h3 className="mb-1! mt-0! text-xl! text-foreground">Brand Tagline Generator</h3>
            <p className="my-0! text-sm leading-6 text-muted-foreground">Create your memorable 5-7 word tagline</p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-6">
          <div className="space-y-5">
            {FIELDS.map((field) => {
              const inputId = `${idPrefix}-${field.key}`
              return (
                <div key={field.key}>
                  <Label htmlFor={inputId} className="mb-2 text-muted-foreground">
                    {field.label}
                  </Label>
                  <Input
                    id={inputId}
                    type="text"
                    value={formData[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                  />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {suggestions[field.key].map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() =>
                          addSuggestion(
                            field.key,
                            field.appendSuggestion
                              ? `${formData.business} ${suggestion}`.trim()
                              : suggestion,
                          )
                        }
                        className="inline-flex h-7 items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 text-xs text-muted-foreground transition-colors hover:border-white/20 hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}

            <Button
              onClick={generateTaglines}
              disabled={!isFormValid || isGenerating}
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                  Generating...
                </>
              ) : (
                <>
                  <Target className="size-4" aria-hidden="true" />
                  Generate Taglines
                </>
              )}
            </Button>
          </div>

          <div className="space-y-4" aria-live="polite">
            <p className="text-eyebrow my-0! text-subtle">Generated Taglines</p>

            {generatedTaglines.length > 0 ? (
              <ul className="my-0! flex list-none! flex-col gap-2 pl-0!">
                {generatedTaglines.map((tagline, index) => (
                  <li
                    key={index}
                    className="my-0! flex items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-background/50 p-3 pl-4! transition-colors hover:border-white/15"
                  >
                    <span className="text-sm font-medium text-foreground">{tagline}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(tagline, index)}
                          className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                          aria-label="Copy tagline"
                        >
                          {copiedIndex === index ? (
                            <Check className="size-4 text-live" aria-hidden="true" />
                          ) : (
                            <Copy className="size-4" aria-hidden="true" />
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">{copiedIndex === index ? "copied" : "copy"}</TooltipContent>
                    </Tooltip>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid min-h-48 place-items-center rounded-2xl border border-dashed border-white/[0.12] px-6 py-10 text-center">
                <div>
                  <Target className="mx-auto mb-3 size-8 text-subtle" strokeWidth={1.5} aria-hidden="true" />
                  <p className="my-0! text-sm text-muted-foreground">Fill in the form to generate your taglines</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-background/50 p-4 pl-5">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-spectrum-blue" />
          <p className="my-0! text-sm leading-6 text-muted-foreground">
            <strong>Pro Tip:</strong> Test your tagline by using it consistently across your website,
            social profiles, and directories. Aim for 20-30 mentions in the first month to help AI
            models associate it with your brand.
          </p>
        </div>
      </div>
    </TooltipProvider>
  )
}
