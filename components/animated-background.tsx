"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

type PerformanceMode = "auto" | "full" | "lite" | "off"

interface AnimatedBackgroundProps {
  performanceMode?: PerformanceMode
}

export default function AnimatedBackground({ performanceMode = "auto" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const [mode, setMode] = useState<PerformanceMode>(performanceMode)

  useEffect(() => {
    // Determine effective mode based on device capabilities
    if (performanceMode === "auto") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      if (prefersReducedMotion) {
        setMode("off")
      } else {
        const isMobile =
          "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth <= 768
        const deviceMemory = (navigator as any).deviceMemory
        const lowMemory = typeof deviceMemory === "number" && deviceMemory < 3
        const cores = navigator.hardwareConcurrency || 4
        const lowCore = cores < 4
        const connection = (navigator as any).connection
        const slowConn = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g"
        if (isMobile || lowMemory || lowCore || slowConn) {
          setMode("lite")
        } else {
          setMode("full")
        }
      }
    } else {
      setMode(performanceMode)
    }
  }, [performanceMode])

  useEffect(() => {
    if (mode === "off") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Initialize particles
    const particleCount = mode === "lite" ? 14 : 36
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * (mode === "lite" ? 0.25 : 0.5),
      speedY: (Math.random() - 0.5) * (mode === "lite" ? 0.25 : 0.5),
      opacity: Math.random() * 0.5 + 0.2,
    }))

    // Animation loop
    let last = 0
    const targetDelta = mode === "lite" ? 1000 / 24 : 1000 / 45 // ~24fps mobile, ~45fps desktop

    const animate = (ts: number) => {
      if (ts - last < targetDelta) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      last = ts

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`
        ctx.fill()
      })

      // Draw connections (desktop/full only to reduce O(n^2) on mobile)
      if (mode === "full") {
        const len = particlesRef.current.length
        for (let i = 0; i < len; i++) {
          for (let j = i + 1; j < len; j++) {
            const p1 = particlesRef.current[i]
            const p2 = particlesRef.current[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `rgba(0, 0, 0, ${0.1 * (1 - distance / 100)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Pause when canvas not in viewport for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animationRef.current) {
            animationRef.current = requestAnimationFrame(animate)
          }
        } else {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = 0 as unknown as number
          }
        }
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    // Start
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      observer.disconnect()
    }
  }, [mode])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      {mode !== "off" && (
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(120, 120, 120, 0.08) 0%, transparent 50%)",
            willChange: "transform",
          }}
          animate={mode === "lite" ? { rotate: [0, 180, 360] } : { rotate: [0, 120, 240, 360] }}
          transition={{ duration: mode === "lite" ? 30 : 20, repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Particle canvas */}
      {mode !== "off" && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            willChange: "transform",
          }}
        />
      )}

      {/* Floating orbs */}
      {mode === "full" && (
        <>
          <motion.div
            className="absolute w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 70%)",
            left: "10%",
            top: "20%",
          }}
            animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0, 0, 0, 0.03) 0%, transparent 70%)",
            right: "15%",
            bottom: "30%",
          }}
            animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </>
      )}

      {/* Mesh gradient overlay */}
      {mode !== "off" && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%),
              linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)
            `,
            backgroundSize: "200% 200%",
            animation: "gradientShift 10s ease-in-out infinite",
            willChange: "background-position",
          }}
        />
      )}
    </div>
  )
}
