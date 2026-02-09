"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import styles from "./prism-ai.module.css"

interface FormData {
  websiteName: string
  websiteGoal: string
  styleReferences: string
  numberOfPages: number
  companyName: string
  email: string
  phoneNumber: string
}

export default function PrismAIClient() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<FormData>({
    websiteName: "",
    websiteGoal: "",
    styleReferences: "",
    numberOfPages: 5,
    companyName: "",
    email: "",
    phoneNumber: ""
  })

  const formRef = useRef<HTMLFormElement>(null)

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(false)
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.websiteName.trim()) {
          newErrors.websiteName = "Website name is required"
        }
        if (!formData.websiteGoal.trim()) {
          newErrors.websiteGoal = "Website goal is required"
        }
        break
      case 2:
        if (formData.numberOfPages < 1 || formData.numberOfPages > 50) {
          newErrors.numberOfPages = "Number of pages must be between 1 and 50"
        }
        break
      case 3:
        if (!formData.companyName.trim()) {
          newErrors.companyName = "Company name is required"
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Valid email is required"
        }
        if (!formData.phoneNumber.trim() || !/^[\d\s\-\+\(\)]+$/.test(formData.phoneNumber)) {
          newErrors.phoneNumber = "Valid phone number is required"
        }
        break
    }

    setErrors(newErrors)

    const errorKeys = Object.keys(newErrors)
    if (errorKeys.length > 0) {
      const firstFieldName = errorKeys[0]
      const field = formRef.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>(
        `[name="${firstFieldName}"]`
      )

      if (field) {
        field.focus()
        field.scrollIntoView({
          block: "center",
          behavior: prefersReducedMotion.current ? "auto" : "smooth",
        })
      }
    }

    return errorKeys.length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep(3)) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/prism-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        throw new Error("Failed to submit form")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrors({ submit: "Failed to submit. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className={styles["prism-ai-container"]}>
        <div className={styles["prism-ai-form-wrapper"]}>
          <div className={styles["prism-ai-triangle-complete"]} aria-label="Process complete">
            <svg viewBox="0 0 70 60" xmlns="http://www.w3.org/2000/svg">
              <path d="M35 5 L65 55 L5 55 Z" fill="url(#prism-gradient-complete)" stroke="none" />
              <defs>
                <linearGradient id="prism-gradient-complete" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF006E" />
                  <stop offset="25%" stopColor="#FB5607" />
                  <stop offset="50%" stopColor="#FFBE0B" />
                  <stop offset="75%" stopColor="#8338EC" />
                  <stop offset="100%" stopColor="#3A86FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className={styles["prism-ai-success-title"]}>Success!</h1>
          <p className={styles["prism-ai-success-message"]}>
            We'll text you updates as Prism builds your site!
          </p>
          <Link href="/" className={styles["prism-ai-back-link"]}>
            ← Back to Design Prism
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles["prism-ai-container"]}>
      <Link href="/" className={styles["prism-ai-nav-link"]}>
        ← Back to Design Prism
      </Link>
      
      <div className={styles["prism-ai-form-wrapper"]}>
        <div className={styles["prism-ai-progress"]}>
          <svg 
            viewBox="0 0 70 60" 
            xmlns="http://www.w3.org/2000/svg"
            className={styles["prism-ai-triangle"]}
            aria-label={`Step ${currentStep} of 3`}
          >
            {/* Triangle segments */}
            <defs>
              <linearGradient id="prism-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF006E" className={styles["prism-ai-gradient-stop-1"]} />
                <stop offset="25%" stopColor="#FB5607" className={styles["prism-ai-gradient-stop-2"]} />
                <stop offset="50%" stopColor="#FFBE0B" className={styles["prism-ai-gradient-stop-3"]} />
                <stop offset="75%" stopColor="#8338EC" className={styles["prism-ai-gradient-stop-4"]} />
                <stop offset="100%" stopColor="#3A86FF" className={styles["prism-ai-gradient-stop-5"]} />
              </linearGradient>
            </defs>
            
            {/* Base triangle outline */}
            <path d="M35 5 L65 55 L5 55 Z" fill="none" stroke="#E5E5E5" strokeWidth="1" />
            
            {/* Segment 1 - Top */}
            <path 
              d="M35 5 L50 30 L20 30 Z" 
              fill={currentStep >= 1 ? "url(#prism-gradient)" : "transparent"}
              className={`${styles["prism-ai-segment"]} ${currentStep >= 1 ? styles["prism-ai-segment-active"] : ""}`}
            />
            
            {/* Segment 2 - Bottom Left */}
            <path 
              d="M20 30 L5 55 L35 55 Z" 
              fill={currentStep >= 2 ? "url(#prism-gradient)" : "transparent"}
              className={`${styles["prism-ai-segment"]} ${currentStep >= 2 ? styles["prism-ai-segment-active"] : ""}`}
            />
            
            {/* Segment 3 - Bottom Right */}
            <path 
              d="M50 30 L65 55 L35 55 Z" 
              fill={currentStep >= 3 ? "url(#prism-gradient)" : "transparent"}
              className={`${styles["prism-ai-segment"]} ${currentStep >= 3 ? styles["prism-ai-segment-active"] : ""}`}
            />
          </svg>
        </div>

        <h1 className={styles["prism-ai-title"]}>Prism AI Engine</h1>
        <p className={styles["prism-ai-subtitle"]}>Build your website with AI</p>

        <form ref={formRef} onSubmit={handleSubmit} className={styles["prism-ai-form"]}>
          <div className={`${styles["prism-ai-step"]} ${currentStep === 1 ? styles["prism-ai-step-active"] : ""}`}>
            {currentStep === 1 && (
              <>
                <div className={styles["prism-ai-field"]}>
                  <label htmlFor="websiteName" className={styles["prism-ai-label"]}>
                    Website Name
                  </label>
                  <input
                    type="text"
                    id="websiteName"
                    name="websiteName"
                    value={formData.websiteName}
                    onChange={handleInputChange}
                    className={`${styles["prism-ai-input"]} ${errors.websiteName ? styles["prism-ai-input-error"] : ""}`}
                    placeholder="e.g., Acme Corporation…"
                    autoComplete="off"
                    aria-invalid={!!errors.websiteName}
                    aria-describedby={errors.websiteName ? "websiteName-error" : undefined}
                  />
                  {errors.websiteName && (
                    <span id="websiteName-error" className={styles["prism-ai-error"]} aria-live="polite">
                      {errors.websiteName}
                    </span>
                  )}
                </div>

                <div className={styles["prism-ai-field"]}>
                  <label htmlFor="websiteGoal" className={styles["prism-ai-label"]}>
                    Website Goal
                  </label>
                  <input
                    type="text"
                    id="websiteGoal"
                    name="websiteGoal"
                    value={formData.websiteGoal}
                    onChange={handleInputChange}
                    className={`${styles["prism-ai-input"]} ${errors.websiteGoal ? styles["prism-ai-input-error"] : ""}`}
                    placeholder="e.g., Showcase our services and generate leads…"
                    autoComplete="off"
                    aria-invalid={!!errors.websiteGoal}
                    aria-describedby={errors.websiteGoal ? "websiteGoal-error" : undefined}
                  />
                  {errors.websiteGoal && (
                    <span id="websiteGoal-error" className={styles["prism-ai-error"]} aria-live="polite">
                      {errors.websiteGoal}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className={styles["prism-ai-button"]}
                >
                  Next
                </button>
              </>
            )}
          </div>

          <div className={`${styles["prism-ai-step"]} ${currentStep === 2 ? styles["prism-ai-step-active"] : ""}`}>
            {currentStep === 2 && (
              <>
                <div className={styles["prism-ai-field"]}>
                  <label htmlFor="styleReferences" className={styles["prism-ai-label"]}>
                    Style References (optional)
                  </label>
                  <input
                    type="text"
                    id="styleReferences"
                    name="styleReferences"
                    value={formData.styleReferences}
                    onChange={handleInputChange}
                    className={styles["prism-ai-input"]}
                    placeholder="e.g., https://example.com, modern, minimal…"
                    autoComplete="off"
                  />
                </div>

                <div className={styles["prism-ai-field"]}>
                  <label htmlFor="numberOfPages" className={styles["prism-ai-label"]}>
                    Number of Pages
                  </label>
                  <input
                    type="number"
                    id="numberOfPages"
                    name="numberOfPages"
                    value={formData.numberOfPages}
                    onChange={handleInputChange}
                    min="1"
                    max="50"
                    className={`${styles["prism-ai-input"]} ${errors.numberOfPages ? styles["prism-ai-input-error"] : ""}`}
                    autoComplete="off"
                    inputMode="numeric"
                    aria-invalid={!!errors.numberOfPages}
                    aria-describedby={errors.numberOfPages ? "numberOfPages-error" : undefined}
                  />
                  {errors.numberOfPages && (
                    <span id="numberOfPages-error" className={styles["prism-ai-error"]} aria-live="polite">
                      {errors.numberOfPages}
                    </span>
                  )}
                </div>

                <div className={styles["prism-ai-button-group"]}>
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className={`${styles["prism-ai-button"]} ${styles["prism-ai-button-secondary"]}`}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className={styles["prism-ai-button"]}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>

          <div className={`${styles["prism-ai-step"]} ${currentStep === 3 ? styles["prism-ai-step-active"] : ""}`}>
            {currentStep === 3 && (
              <>
                <div className={styles["prism-ai-field"]}>
                  <label htmlFor="companyName" className={styles["prism-ai-label"]}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className={`${styles["prism-ai-input"]} ${errors.companyName ? styles["prism-ai-input-error"] : ""}`}
                    placeholder="e.g., Acme Dental…"
                    autoComplete="organization"
                    aria-invalid={!!errors.companyName}
                    aria-describedby={errors.companyName ? "companyName-error" : undefined}
                  />
                  {errors.companyName && (
                    <span id="companyName-error" className={styles["prism-ai-error"]} aria-live="polite">
                      {errors.companyName}
                    </span>
                  )}
                </div>

                <div className={styles["prism-ai-field"]}>
                  <label htmlFor="email" className={styles["prism-ai-label"]}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`${styles["prism-ai-input"]} ${errors.email ? styles["prism-ai-input-error"] : ""}`}
                    placeholder="you@company.com…"
                    autoComplete="email"
                    spellCheck={false}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" className={styles["prism-ai-error"]} aria-live="polite">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className={styles["prism-ai-field"]}>
                  <label htmlFor="phoneNumber" className={styles["prism-ai-label"]}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`${styles["prism-ai-input"]} ${errors.phoneNumber ? styles["prism-ai-input-error"] : ""}`}
                    placeholder="+1 (555) 123-4567…"
                    autoComplete="tel"
                    inputMode="tel"
                    aria-invalid={!!errors.phoneNumber}
                    aria-describedby={errors.phoneNumber ? "phoneNumber-error" : undefined}
                  />
                  {errors.phoneNumber && (
                    <span id="phoneNumber-error" className={styles["prism-ai-error"]} aria-live="polite">
                      {errors.phoneNumber}
                    </span>
                  )}
                  <span className={styles["prism-ai-helper"]}>
                    For SMS updates on your build progress
                  </span>
                </div>

                {errors.submit && (
                  <div className={styles["prism-ai-error"]} role="alert">
                    {errors.submit}
                  </div>
                )}

                <div className={styles["prism-ai-button-group"]}>
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className={`${styles["prism-ai-button"]} ${styles["prism-ai-button-secondary"]}`}
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`${styles["prism-ai-button"]} ${isSubmitting ? styles["prism-ai-button-loading"] : ""}`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles["prism-ai-spinner"]}>
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2 L22 20 L2 20 Z" fill="currentColor" />
                          </svg>
                        </span>
                        Building…
                      </>
                    ) : (
                      "Start Building"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
