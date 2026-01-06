"use client"

import { createElement, forwardRef, HTMLAttributes } from "react"

type LordIconProps = HTMLAttributes<HTMLElement> & {
  src?: string
  trigger?: string
  delay?: string
  state?: string
  colors?: string
}

const LordIcon = forwardRef<HTMLElement, LordIconProps>(({ children, ...props }, ref) => {
  return createElement("lord-icon", { ...props, ref }, children)
})

LordIcon.displayName = "LordIcon"

export default LordIcon
