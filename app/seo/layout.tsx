import type { ReactNode } from "react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function SeoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
