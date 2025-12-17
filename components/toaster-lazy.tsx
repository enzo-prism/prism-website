"use client"

import dynamic from "next/dynamic"

const Toaster = dynamic(() => import("@/components/ui/sonner").then((mod) => mod.Toaster), {
  ssr: false,
  loading: () => null,
})

export default function ToasterLazy() {
  return <Toaster />
}

