'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const HOME_ROUTE_SURFACE = 'home-black'
const DEFAULT_ROUTE_SURFACE = 'default'

export default function RouteSurfaceController() {
  const pathname = usePathname()

  useEffect(() => {
    const routeSurface =
      pathname === '/' ? HOME_ROUTE_SURFACE : DEFAULT_ROUTE_SURFACE

    document.documentElement.dataset.routeSurface = routeSurface
    document.body.dataset.routeSurface = routeSurface

    return () => {
      delete document.documentElement.dataset.routeSurface
      delete document.body.dataset.routeSurface
    }
  }, [pathname])

  return null
}
