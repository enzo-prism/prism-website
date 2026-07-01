"use client"

import type React from "react"
import { FormEvent, useCallback, useState } from "react"

type ValidFieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
type ErrorMap = Record<string, string>

const isFieldElement = (element: Element): element is ValidFieldElement => {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  )
}

type UseFormValidationOptions = {
  onValidSubmit?: (form: HTMLFormElement) => Promise<void> | void
}

export function useFormValidation(options?: UseFormValidationOptions) {
  const onValidSubmit = options?.onValidSubmit
  const [errors, setErrors] = useState<ErrorMap>({})
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFieldError = useCallback((field: ValidFieldElement) => {
    const { name } = field
    if (!name) return
    setErrors((prev) => ({
      ...prev,
      [name]: field.validity.valid ? "" : field.validationMessage,
    }))
  }, [])

  const handleBlur = useCallback(
    (event: React.FocusEvent<ValidFieldElement>) => {
      updateFieldError(event.target)
    },
    [updateFieldError]
  )

  const handleInput = useCallback(
    (event: FormEvent<ValidFieldElement>) => {
      if (!hasSubmitted) return
      updateFieldError(event.currentTarget)
    },
    [hasSubmitted, updateFieldError]
  )

  const validateFields = useCallback((fields: ValidFieldElement[]) => {
    setHasSubmitted(true)
    const newErrors: ErrorMap = {}
    let isValid = true
    let firstInvalidField: ValidFieldElement | null = null

    fields.forEach((field) => {
      if (!field.name) return
      const fieldError = field.validity.valid ? "" : field.validationMessage
      newErrors[field.name] = fieldError
      if (fieldError) {
        isValid = false
        firstInvalidField ??= field
      }
    })

    setErrors((prev) => ({ ...prev, ...newErrors }))

    // On long forms the submit button sits below the fold of the first
    // error; without this, a failed submit on mobile looks like nothing
    // happened. Bring the first invalid field into view and focus it.
    if (firstInvalidField) {
      const field = firstInvalidField as ValidFieldElement
      if (typeof field.scrollIntoView === "function") {
        const prefersReducedMotion =
          typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
        field.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "center",
        })
      }
      field.focus({ preventScroll: true })
    }

    return isValid
  }, [])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget
      if (!validateFields(Array.from(form.elements).filter(isFieldElement))) {
        setIsSubmitting(false)
        return
      }

      if (!onValidSubmit) {
        form.submit()
        return
      }

      setIsSubmitting(true)
      try {
        await onValidSubmit(form)
      } finally {
        setIsSubmitting(false)
      }
    },
    [onValidSubmit, validateFields]
  )

  const getError = useCallback(
    (name: string) => {
      return errors[name] ?? ""
    },
    [errors]
  )

  return {
    errors,
    getError,
    handleBlur,
    handleInput,
    handleSubmit,
    isSubmitting,
    validateFields,
  }
}
