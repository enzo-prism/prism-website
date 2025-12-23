"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Copy, Check, RefreshCw, Target } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { fadeInUp, springScale, successPop } from "@/utils/animation-variants"

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

export default function BrandTaglineGenerator() {
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
      <motion.div
        className="w-full bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg shadow-sm p-6 mb-8"
        initial="initial"
        animate="animate"
        variants={springScale}
      >
      <motion.div className="mb-6" variants={fadeInUp}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900">Brand Tagline Generator</h3>
            <p className="text-sm text-neutral-600">Create your memorable 5-7 word tagline</p>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div className="space-y-4" variants={fadeInUp}>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Business Name *
            </label>
            <Input
              type="text"
              value={formData.business}
              onChange={(e) => handleInputChange("business", e.target.value)}
              placeholder="e.g., Sweet Haven"
              className="w-full border-neutral-300 px-3 py-2 focus-visible:ring-purple-500"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {suggestions.business.map((suggestion) => (
                <Button
                  key={suggestion}
                  type="button"
                  onClick={() => addSuggestion("business", `${formData.business} ${suggestion}`.trim())}
                  variant="ghost"
                  size="xs"
                  className="h-6 rounded-full bg-neutral-100 px-2 py-1 text-xs hover:bg-neutral-200"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Specialty/Product *
            </label>
            <Input
              type="text"
              value={formData.specialty}
              onChange={(e) => handleInputChange("specialty", e.target.value)}
              placeholder="e.g., artisan sourdough"
              className="w-full border-neutral-300 px-3 py-2 focus-visible:ring-purple-500"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {suggestions.specialty.map((suggestion) => (
                <Button
                  key={suggestion}
                  type="button"
                  onClick={() => addSuggestion("specialty", suggestion)}
                  variant="ghost"
                  size="xs"
                  className="h-6 rounded-full bg-neutral-100 px-2 py-1 text-xs hover:bg-neutral-200"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Target Audience *
            </label>
            <Input
              type="text"
              value={formData.audience}
              onChange={(e) => handleInputChange("audience", e.target.value)}
              placeholder="e.g., busy families"
              className="w-full border-neutral-300 px-3 py-2 focus-visible:ring-purple-500"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {suggestions.audience.map((suggestion) => (
                <Button
                  key={suggestion}
                  type="button"
                  onClick={() => addSuggestion("audience", suggestion)}
                  variant="ghost"
                  size="xs"
                  className="h-6 rounded-full bg-neutral-100 px-2 py-1 text-xs hover:bg-neutral-200"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Value Proposition (Optional)
            </label>
            <Input
              type="text"
              value={formData.value}
              onChange={(e) => handleInputChange("value", e.target.value)}
              placeholder="e.g., reliable, affordable, quick"
              className="w-full border-neutral-300 px-3 py-2 focus-visible:ring-purple-500"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {suggestions.value.map((suggestion) => (
                <Button
                  key={suggestion}
                  type="button"
                  onClick={() => addSuggestion("value", suggestion)}
                  variant="ghost"
                  size="xs"
                  className="h-6 rounded-full bg-neutral-100 px-2 py-1 text-xs hover:bg-neutral-200"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={generateTaglines}
            disabled={!isFormValid || isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Target className="w-4 h-4 mr-2" />
                Generate Taglines
              </>
            )}
          </Button>
        </motion.div>

        <motion.div className="space-y-4" variants={fadeInUp}>
          <h4 className="font-semibold text-neutral-900">Generated Taglines</h4>
          
          <AnimatePresence>
            {generatedTaglines.length > 0 ? (
              <div className="space-y-2">
                {generatedTaglines.map((tagline, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200 hover:border-purple-300 transition-colors"
                  >
                    <span className="text-sm font-medium text-neutral-900">{tagline}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          type="button"
                          onClick={() => copyToClipboard(tagline, index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="rounded-full p-2 transition-colors hover:bg-neutral-100"
                          aria-label="Copy tagline"
                        >
                          <AnimatePresence mode="wait">
                            {copiedIndex === index ? (
                              <motion.div
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                variants={successPop}
                              >
                                <Check className="w-4 h-4 text-green-500" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="copy"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Copy className="w-4 h-4 text-neutral-500" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="top">{copiedIndex === index ? "copied" : "copy"}</TooltipContent>
                    </Tooltip>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-500">
                <Target className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
                <p className="text-sm">Fill in the form to generate your taglines</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div 
        className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500"
        variants={fadeInUp}
      >
        <p className="text-sm text-blue-800">
          <strong>Pro Tip:</strong> Test your tagline by using it consistently across your website, 
          social profiles, and directories. Aim for 20-30 mentions in the first month to help AI 
          models associate it with your brand.
        </p>
      </motion.div>
      </motion.div>
    </TooltipProvider>
  )
}
