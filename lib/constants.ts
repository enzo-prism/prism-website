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

// Updated primary navigation (flat list) to match recent design
export const NAV_ITEMS: NavItem[] = [
  { emoji: "🏠", label: "home", href: "/" },
  { emoji: "🖥️", label: "websites", href: "/websites" },
  { emoji: "📱", label: "apps", href: "/apps" },
  { emoji: "🎨", label: "designs", href: "/designs" },
  { emoji: "🎁", label: "offers", href: "/offers" },
  { emoji: "✍️", label: "blog", href: "/blog" },
  { emoji: "🎙️", label: "podcast", href: "/podcast" },
  { emoji: "❤️", label: "wall of love", href: "/wall-of-love" },
  { emoji: "🚀", label: "apply", href: "/get-started" },
]
