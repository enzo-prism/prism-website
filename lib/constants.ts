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

// Primary navigation items (shared by top navbar and mobile tab bar)
export const PRIMARY_NAV_ITEMS: Array<{ emoji: string; label: string; href: string }> = [
  { emoji: "🏠", label: "home", href: "/" },
  { emoji: "🖥️", label: "websites", href: "/websites" },
  { emoji: "📱", label: "apps", href: "/apps" },
  { emoji: "🎨", label: "designs", href: "/designs" },
  { emoji: "⚙️", label: "flywheel", href: "/prism-flywheel" },
  { emoji: "❤️", label: "wall of love", href: "/wall-of-love" },
]