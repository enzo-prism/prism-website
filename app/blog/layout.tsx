import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className={`blog-reading-surface ${inter.className}`}>{children}</div>
}

