"use client"

import { useEffect, useState } from "react"

export default function AnimatedHighlightText() {
  const phrases = ["get noticed", "grow your following", "boost your sales"]
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    // Rotate through phrases every 3 seconds
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % phrases.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [phrases.length])

  return (
    <span className="inline-flex flex-col md:flex-row md:gap-1 items-center">
      {phrases.map((phrase, index) => (
        <span key={phrase} className="relative">
          {index > 0 && index < phrases.length && <span className="hidden md:inline">,</span>}{" "}
          <span
            className={`relative transition-all duration-300 ${
              activeIndex === index ? "text-black font-semibold" : "text-neutral-500"
            }`}
          >
            {phrase}
            {activeIndex === index && (
              <span
                className="absolute -bottom-1 left-0 h-[2px] bg-black animate-expandUnderline"
                style={{ width: "0%" }}
              ></span>
            )}
          </span>
        </span>
      ))}
    </span>
  )
}
