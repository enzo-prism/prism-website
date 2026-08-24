'use client'

import { usePathname } from 'next/navigation'
import { useLayoutEffect } from 'react'

import { routeSurfaceForPath } from '@/lib/route-surface'

export default function RouteSurfaceController() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    const surface = routeSurfaceForPath(pathname)

    document.documentElement.dataset.routeSurface = surface
    document.body.dataset.routeSurface = surface

    return () => {
      delete document.documentElement.dataset.routeSurface
      delete document.body.dataset.routeSurface
    }
  }, [pathname])

  return null
}
