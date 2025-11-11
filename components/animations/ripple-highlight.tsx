"use client"

import { Slot } from "@radix-ui/react-slot"
import { motion, useReducedMotion } from "framer-motion"
import type { PropsWithChildren } from "react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface RippleHighlightProps extends PropsWithChildren {
  className?: string
  asChild?: boolean
  color?: string
  fullWidth?: boolean
}

export default function RippleHighlight({
  className,
  children,
  asChild = false,
  color = "rgba(255,255,255,0.3)",
  fullWidth = false,
}: RippleHighlightProps) {
  const Comp = asChild ? Slot : "div"
  const prefersReducedMotion = useReducedMotion()
  const [isTouch, setIsTouch] = useState(false)
  const [isFocusWithin, setIsFocusWithin] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const query = window.matchMedia("(pointer: coarse)")
    setIsTouch(query.matches)
    const handleChange = (event: MediaQueryListEvent) => setIsTouch(event.matches)
    query.addEventListener?.("change", handleChange)
    return () => query.removeEventListener?.("change", handleChange)
  }, [])

  const disableEffect = prefersReducedMotion || isTouch

  return (
    <motion.div
      className={cn(
        "group relative inline-flex overflow-visible rounded-full",
        fullWidth && "w-full",
        className
      )}
      initial="rest"
      whileHover={disableEffect ? undefined : "hover"}
      animate={disableEffect ? "rest" : isFocusWithin ? "hover" : "rest"}
      onFocusCapture={() => {
        if (!disableEffect) setIsFocusWithin(true)
      }}
      onBlurCapture={(event) => {
        if (!disableEffect && !event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsFocusWithin(false)
        }
      }}
    >
      {!disableEffect ? (
        <>
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full blur-xl"
            variants={{
              rest: { opacity: 0, scale: 0.8 },
              hover: { opacity: 1, scale: 1.15 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ background: color }}
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border"
            style={{ borderColor: color }}
            variants={{
              rest: { opacity: 0, scale: 0.8 },
              hover: { opacity: 0, scale: 1.4 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </>
      ) : null}
      <Comp className={cn("relative z-[1]", fullWidth && "w-full")}>{children}</Comp>
    </motion.div>
  )
}
