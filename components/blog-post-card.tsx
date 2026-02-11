"use client"

import React, { useState, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { trackCTAClick } from "@/utils/analytics"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { blogCardHover3D, blogCardPerspective } from "@/utils/animation-variants"

interface BlogPostCardProps {
  title: string
  category: string
  date: string
  description: string
  slug: string
  image: string // Blog post thumbnail image
  featured?: boolean
  compact?: boolean
  gradientClass: string // New prop for gradient class
}

export default function BlogPostCard({
  title,
  category,
  date,
  description,
  slug,
  image,
  featured = false,
  compact = false,
  gradientClass,
}: BlogPostCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Mouse position tracking for 3D tilt effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Spring animations for smooth tilt
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 })
  
  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])
  
  // Handle mouse movement for 3D tilt
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    const mouseX = (event.clientX - rect.left) / width - 0.5
    const mouseY = (event.clientY - rect.top) / height - 0.5
    
    x.set(mouseX)
    y.set(mouseY)
  }
  
  // Reset tilt on mouse leave
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <Link href={`/blog/${slug}`} onClick={() => trackCTAClick(`View blog post`, title)} className="block">
      <motion.div
        ref={ref}
        className="relative h-full cursor-pointer group"
        variants={blogCardHover3D}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: "1000px",
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
      >
        <Card className="h-full overflow-hidden border-neutral-200">
          {featured && (
            <Badge
              asChild
              className="absolute left-3 top-3 z-10 rounded-full bg-black/80 px-3 py-1 text-xs text-white"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                Featured
              </motion.div>
            </Badge>
          )}
          {/* Enhanced gradient thumbnail with shimmer effect */}
          <motion.div 
            className={cn("relative w-full aspect-[4/3] overflow-hidden", gradientClass)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              animate={{ x: ["0%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear"
              }}
            />
          </motion.div>
          <CardContent
            className="space-y-3 border-t border-neutral-100 p-5 pt-5"
            style={{ transform: "translateZ(20px)" }}
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: "rgb(229, 229, 229)" }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
                >
                  {category}
                </Badge>
              </motion.div>
              <div className="text-sm text-neutral-500">{date}</div>
            </div>
            <motion.h3 
              className="text-lg font-bold"
              style={{ transform: "translateZ(30px)" }}
            >
              {title}
            </motion.h3>
            {!compact && (
              <motion.p 
                className="text-neutral-600"
                style={{ transform: "translateZ(20px)" }}
              >
                {description}
              </motion.p>
            )}
            <motion.div 
              className="flex items-center pt-2 text-sm font-medium text-neutral-900"
              style={{ transform: "translateZ(40px)" }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              Read post 
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="ml-1 h-4 w-4" />
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}
