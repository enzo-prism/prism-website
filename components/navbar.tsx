"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import CoreImage from "./core-image" // Assuming core-image.tsx is in the same components directory
import { trackNavigation } from "@/utils/analytics"

export default function Navbar() {
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { emoji: "🏠", label: "home", href: "/" },
    { emoji: "🖥️", label: "websites", href: "/websites" },
    { emoji: "📱", label: "apps", href: "/apps" },
    { emoji: "🎨", label: "designs", href: "/designs" },
    { emoji: "❤️", label: "wall of love", href: "/wall-of-love" },
    { emoji: "💰", label: "affiliate", href: "/affiliate" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => trackNavigation("logo", "/")}>
          {/* This div provides the dimensions and primary clipping */}
          <div className="relative h-8 w-8 overflow-hidden rounded-lg isolate">
            <CoreImage
              src="/prism-logo.jpeg"
              alt="Prism logo"
              width={32}
              height={32}
              // Pass classes to CoreImage to apply to the NextImage component
              // This ensures the NextImage itself is rounded and clips its content.
              className="object-contain w-full h-full rounded-lg overflow-hidden"
              priority
              fallbackSrc="/favicon-large.png"
              trackingId="navbar_logo"
              quality={90}
            />
          </div>
          <span className="text-2xl font-bold lowercase text-foreground">prism</span>
        </Link>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {isMenuOpen && (
              <div className="absolute left-0 top-16 z-50 w-full bg-background p-4 shadow-md animate-in slide-in-from-top-4 duration-300">
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-2 rounded-md px-3 py-2 text-lg lowercase transition-colors hover:bg-muted ${
                        pathname === item.href
                          ? "font-semibold text-foreground bg-muted"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      onClick={() => {
                        setIsMenuOpen(false)
                        trackNavigation(item.label, item.href)
                      }}
                    >
                      <span className="text-xl">{item.emoji}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-1 text-sm font-medium lowercase transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => trackNavigation(item.label, item.href)}
              >
                <span className="text-base">{item.emoji}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
