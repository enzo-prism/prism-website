export type RouteSurface = 'home-black' | 'chatgpt-ads' | 'default'

export function routeSurfaceForPath(pathname: string | null | undefined): RouteSurface {
  if (!pathname) return 'default'

  const normalized =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname

  if (normalized === '/') return 'home-black'
  if (normalized === '/chatgpt-ads') return 'chatgpt-ads'

  return 'default'
}
