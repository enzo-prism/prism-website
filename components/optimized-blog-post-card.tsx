"use client"

import { cn } from "@/lib/utils"
import { trackCTAClick } from "@/utils/analytics"
import { motion, Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRef, useState } from "react"

interface OptimizedBlogPostCardProps {
  title: string
  category: string
  date: string
  description: string
  slug: string
  image: string
  featured?: boolean
  compact?: boolean
  gradientClass: string
  index?: number
}

export default function OptimizedBlogPostCard({
  title,
  category,
  date,
  description,
  slug,
  image,
  featured = false,
  compact = false,
  gradientClass,
  index = 0,
}: OptimizedBlogPostCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Staggered entrance animation
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.05,
        ease: "easeOut" as const,
      }
    }
  }
  
  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link 
        href={`/blog/${slug}`} 
        onClick={() => trackCTAClick(`view blog post`, title)} 
        className="block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className={cn(
            "card-3d border border-neutral-200 rounded-lg overflow-hidden h-full flex flex-col",
            "bg-white shadow-sm",
            isHovered && "shadow-xl"
          )}
        >
          {featured && (
            <div className="absolute top-3 left-3 text-xs text-white bg-black/80 px-3 py-1 rounded-full lowercase z-10 hardware-accelerated">
              featured
            </div>
          )}
          
          {/* Optimized gradient thumbnail */}
          <div 
            className={cn(
              "relative w-full aspect-[4/3] overflow-hidden hardware-accelerated",
              gradientClass
            )}
            style={{
              contentVisibility: 'auto',
              containIntrinsicSize: '0 300px'
            }}
          >
            {/* Parallax effect on hover */}
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 100%)`,
              }}
            />
          </div>
          
          <div className="p-5 space-y-3 border-t border-neutral-100 flex-1 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <motion.div 
                className="inline-block px-3 py-1 bg-neutral-100 rounded-full text-xs lowercase w-fit"
                animate={{
                  scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                {category}
              </motion.div>
              <div className="text-sm text-neutral-500 lowercase">{date}</div>
            </div>
            
            <h3 className="text-lg font-bold lowercase">
              {title}
            </h3>
            
            {!compact && (
              <p className="text-neutral-600 lowercase flex-1">
                {description}
              </p>
            )}
            
            <motion.div 
              className="flex items-center text-sm font-medium text-neutral-900 lowercase pt-2"
              animate={{
                x: isHovered ? 4 : 0
              }}
              transition={{ duration: 0.2 }}
            >
              read post 
              <ArrowRight className="ml-1 h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 
