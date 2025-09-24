// Logo configuration
export const LOGO_CONFIG = {
  src: "/Prism Logo.png",
  fallbackSrc: "/prism-logo.jpeg",
  alt: "Prism logo",
  // Consistent corner radius class for all logo instances
  className: "rounded-lg", // This applies an 8px border-radius
}

// Logo sizes for different use cases
export const LOGO_SIZES = {
  navbar: { width: 48, height: 48 },
  footer: { width: 64, height: 64 },
  hero: { width: 96, height: 96 },
  large: { width: 128, height: 128 },
  small: { width: 40, height: 40 },
} as const 

// New primary navigation structure
export type NavChild = { label: string; href: string }
export type NavItem = { label: string; href?: string; children?: NavChild[]; emoji?: string }

// Updated primary navigation to required structure
export const NAV_ITEMS: NavItem[] = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  {
    label: "product",
    children: [
      { label: "websites", href: "/websites" },
      { label: "design", href: "/design" },
      { label: "ads", href: "/ads" },
      { label: "local listings", href: "/local-listings" },
    ],
  },
  {
    label: "growth guides",
    children: [
      { label: "blog", href: "/blog" },
      { label: "podcast", href: "/podcast" },
    ],
  },
  { label: "wall of love", href: "/wall-of-love" },
  { label: "apply", href: "/get-started" },
]
