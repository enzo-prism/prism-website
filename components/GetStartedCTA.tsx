"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { trackCTAClick } from "@/utils/analytics"
import { fadeInUp, springScale } from "@/utils/animation-variants"

interface GetStartedCTAProps {
  heading: string
  description?: string
  buttonText: string
  analyticsLabel: string
  variant?: "light" | "dark" | "gradient"
  className?: string
}

export default function GetStartedCTA({
  heading,
  description,
  buttonText,
  analyticsLabel,
  variant = "light",
  className = ""
}: GetStartedCTAProps) {
  const getBackgroundClasses = () => {
    switch (variant) {
      case "dark":
        return "bg-neutral-900 text-white"
      case "gradient":
        return "bg-gradient-to-br from-neutral-50 to-white"
      default:
        return "bg-neutral-50"
    }
  }

  return (
    <motion.section 
      className={`py-16 md:py-24 ${getBackgroundClasses()} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          variants={springScale}
        >
          <motion.h2 
            className={`text-3xl font-bold tracking-tighter lowercase sm:text-4xl md:text-5xl mb-6 ${
              variant === "dark" ? "text-white" : "text-neutral-900"
            }`}
            variants={fadeInUp}
          >
            {heading}
          </motion.h2>
          
          {description && (
            <motion.p 
              className={`mx-auto max-w-2xl text-lg lowercase leading-relaxed mb-8 ${
                variant === "dark" ? "text-neutral-200" : "text-neutral-600"
              }`}
              variants={fadeInUp}
            >
              {description}
            </motion.p>
          )}

          <motion.div variants={fadeInUp}>
            <Button 
              size="lg" 
              asChild 
              className={`px-8 py-4 text-lg lowercase min-h-[44px] rounded-full ${
                variant === "dark" 
                  ? "bg-white text-neutral-900 hover:bg-neutral-100" 
                  : "bg-neutral-900 text-white hover:bg-neutral-800"
              }`}
            >
              <Link 
                href="/get-started"
                onClick={() => trackCTAClick(buttonText, analyticsLabel)}
              >
                <motion.div 
                  className="flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {buttonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}