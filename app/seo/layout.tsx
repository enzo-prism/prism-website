import type { ReactNode } from "react"

import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

export default function SeoLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="bg-white text-neutral-900">{children}</main>
      <Footer />
    </>
  )
}
