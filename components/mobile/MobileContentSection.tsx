"use client"

import React, { ReactNode } from "react"
import { motion } from "framer-motion"

interface MobileContentSectionProps {
  children: ReactNode
  title?: string
  subtitle?: string
  variant?: "default" | "emphasized" | "compact"
  className?: string
  animationDelay?: number
}

const variantStyles = {
  default: {
    container: "px-4 py-6",
    title: "text-2xl font-bold text-neutral-900 dark:text-white mb-4",
    subtitle: "text-lg text-neutral-600 dark:text-neutral-400 mb-6",
    content: "space-y-4"
  },
  emphasized: {
    container: "px-4 py-8 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl mx-4",
    title: "text-2xl font-bold text-neutral-900 dark:text-white mb-4",
    subtitle: "text-lg text-neutral-600 dark:text-neutral-400 mb-6",
    content: "space-y-6"
  },
  compact: {
    container: "px-4 py-4",
    title: "text-xl font-semibold text-neutral-900 dark:text-white mb-3",
    subtitle: "text-base text-neutral-600 dark:text-neutral-400 mb-4",
    content: "space-y-3"
  }
}

export function MobileContentSection({
  children,
  title,
  subtitle,
  variant = "default",
  className = "",
  animationDelay = 0
}: MobileContentSectionProps) {
  const styles = variantStyles[variant]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: animationDelay, ease: "easeOut" }}
      className={`${styles.container} ${className}`}
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: animationDelay + 0.1 }}
          className={styles.title}
        >
          {title}
        </motion.h2>
      )}
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: animationDelay + 0.2 }}
          className={styles.subtitle}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: animationDelay + 0.3 }}
        className={styles.content}
      >
        {children}
      </motion.div>
    </motion.section>
  )
}

interface MobileParagraphProps {
  children: ReactNode
  className?: string
  emphasized?: boolean
}

export function MobileParagraph({
  children,
  className = "",
  emphasized = false
}: MobileParagraphProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        leading-relaxed text-base
        ${emphasized 
          ? "text-lg font-medium text-neutral-800 dark:text-neutral-200" 
          : "text-neutral-700 dark:text-neutral-300"
        }
        ${className}
      `}
    >
      {children}
    </motion.p>
  )
}

interface MobileListProps {
  items: string[]
  type?: "bullet" | "numbered"
  className?: string
}

export function MobileList({
  items,
  type = "bullet",
  className = ""
}: MobileListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`space-y-3 ${className}`}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="flex items-start gap-3"
        >
          <div className="flex-shrink-0 mt-2">
            {type === "bullet" ? (
              <div className="w-2 h-2 bg-neutral-400 dark:bg-neutral-600 rounded-full" />
            ) : (
              <div className="w-6 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  {index + 1}
                </span>
              </div>
            )}
          </div>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed flex-1">
            {item}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}

interface MobileHeadingProps {
  children: ReactNode
  level?: 1 | 2 | 3 | 4
  className?: string
}

export function MobileHeading({
  children,
  level = 2,
  className = ""
}: MobileHeadingProps) {
  const baseStyles = "font-bold text-neutral-900 dark:text-white leading-tight"
  
  const levelStyles = {
    1: "text-3xl mb-6",
    2: "text-2xl mb-4",
    3: "text-xl mb-3",
    4: "text-lg mb-2"
  }
  
  const Component = `h${level}` as keyof JSX.IntrinsicElements
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Component className={`${baseStyles} ${levelStyles[level]} ${className}`}>
        {children}
      </Component>
    </motion.div>
  )
}