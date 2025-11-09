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

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget
      setHasSubmitted(true)
      if (!form.checkValidity()) {
        const newErrors: ErrorMap = {}
        Array.from(form.elements).forEach((element) => {
          if (isFieldElement(element) && element.name) {
            newErrors[element.name] = element.validity.valid ? "" : element.validationMessage
          }
        })
        setErrors((prev) => ({ ...prev, ...newErrors }))
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
    [onValidSubmit]
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
  }
}
