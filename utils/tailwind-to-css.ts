// Utility to convert Tailwind gradient classes to CSS gradients for OG image generation

// Tailwind color palette (only colors used in the blog)
const tailwindColors = {
  indigo: {
    300: 'rgb(165, 180, 252)',
  },
  purple: {
    300: 'rgb(196, 181, 253)',
  },
  sky: {
    300: 'rgb(125, 211, 252)',
  },
  blue: {
    300: 'rgb(147, 197, 253)',
  },
  red: {
    300: 'rgb(252, 165, 165)',
  },
  orange: {
    300: 'rgb(253, 186, 116)',
  },
  yellow: {
    300: 'rgb(253, 224, 71)',
  },
  green: {
    300: 'rgb(134, 239, 172)',
  },
  pink: {
    300: 'rgb(249, 168, 212)',
  },
  rose: {
    300: 'rgb(253, 164, 175)',
  },
  amber: {
    200: 'rgb(253, 230, 138)',
    300: 'rgb(252, 211, 77)',
  },
  lime: {
    200: 'rgb(217, 249, 157)',
    300: 'rgb(190, 242, 100)',
  },
  emerald: {
    300: 'rgb(110, 231, 183)',
  },
  teal: {
    300: 'rgb(94, 234, 212)',
  },
  cyan: {
    300: 'rgb(103, 232, 249)',
  },
}

type GradientDirection = {
  [key: string]: string
}

const gradientDirections: GradientDirection = {
  'to-br': 'to bottom right',
  'to-tr': 'to top right',
  'to-bl': 'to bottom left',
  'to-tl': 'to top left',
  'to-b': 'to bottom',
  'to-t': 'to top',
  'to-r': 'to right',
  'to-l': 'to left',
}

export function parseTailwindGradient(gradientClass: string): string {
  // Default gradient if parsing fails
  const defaultGradient = 'linear-gradient(to bottom right, rgb(165, 180, 252), rgb(196, 181, 253), rgb(125, 211, 252))'
  
  try {
    // Extract gradient parts
    const parts = gradientClass.split(' ')
    
    // Find direction
    const directionPart = parts.find(p => p.startsWith('bg-gradient-'))
    if (!directionPart) return defaultGradient
    
    const direction = directionPart.replace('bg-gradient-', '')
    const cssDirection = gradientDirections[direction] || 'to bottom right'
    
    // Extract color stops
    const colorStops: string[] = []
    
    // Find from, via, and to colors
    const fromMatch = parts.find(p => p.startsWith('from-'))
    const viaMatch = parts.find(p => p.startsWith('via-'))
    const toMatch = parts.find(p => p.startsWith('to-'))
    
    if (fromMatch) {
      const color = parseColorWithOpacity(fromMatch.replace('from-', ''))
      if (color) colorStops.push(color)
    }
    
    if (viaMatch) {
      const color = parseColorWithOpacity(viaMatch.replace('via-', ''))
      if (color) colorStops.push(color)
    }
    
    if (toMatch) {
      const color = parseColorWithOpacity(toMatch.replace('to-', ''))
      if (color) colorStops.push(color)
    }
    
    // If we don't have enough colors, return default
    if (colorStops.length < 2) return defaultGradient
    
    return `linear-gradient(${cssDirection}, ${colorStops.join(', ')})`
  } catch (error) {
    console.error('Error parsing Tailwind gradient:', error)
    return defaultGradient
  }
}

function parseColorWithOpacity(colorString: string): string | null {
  // Handle format like "indigo-300/30"
  const [colorPart, opacityPart] = colorString.split('/')
  const [colorName, shade] = colorPart.split('-')
  
  // Get the base color
  const colorGroup = tailwindColors[colorName as keyof typeof tailwindColors]
  if (!colorGroup) return null
  
  const baseColor = colorGroup[shade as keyof typeof colorGroup]
  if (!baseColor) return null
  
  // If there's opacity, convert it
  if (opacityPart) {
    const opacity = parseInt(opacityPart) / 100
    // Convert rgb to rgba
    return baseColor.replace('rgb(', 'rgba(').replace(')', `, ${opacity})`)
  }
  
  return baseColor
}