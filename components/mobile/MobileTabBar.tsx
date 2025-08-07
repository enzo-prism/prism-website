"use client"

import { useMobile } from "@/hooks/use-mobile"
import { PRIMARY_NAV_ITEMS } from "@/lib/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MobileTabBar() {
  const isMobile = useMobile()
  const pathname = usePathname()

  if (!isMobile) return null

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <ul className="grid grid-cols-5 gap-1 px-2 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))]">
        {PRIMARY_NAV_ITEMS.slice(0, 5).map((item) => {
          const active = pathname === item.href
          return (
            <li key={item.href} className="flex items-center justify-center">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-2 py-1.5 rounded-md text-xs lowercase transition-colors min-h-[44px] ${
                  active ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-base leading-none">{item.emoji}</span>
                <span className="leading-none">{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}


