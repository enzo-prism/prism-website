import localFont from 'next/font/local'

// The GeistPixel display fonts are decorative (eyebrows, mono labels, pixel
// accents) and render below the LCP. Importing `geist/font/pixel` is a barrel
// that instantiates all FIVE pixel variants with `preload: true`, forcing every
// page to preload ~130 KB of woff2 — even the three variants we never use.
//
// We instead declare only the two variants referenced in globals.css
// (`--font-geist-pixel-square` and `--font-geist-pixel-grid`) and set
// `preload: false` so they load lazily and never compete with Geist Sans/Mono
// or the hero LCP. Variable names match the originals so globals.css is
// unchanged.
export const geistPixelSquare = localFont({
  src: './GeistPixel-Square.woff2',
  variable: '--font-geist-pixel-square',
  weight: '500',
  display: 'swap',
  preload: false,
  fallback: [
    'Geist Mono',
    'ui-monospace',
    'SFMono-Regular',
    'Roboto Mono',
    'Menlo',
    'monospace',
  ],
  adjustFontFallback: false,
})

export const geistPixelGrid = localFont({
  src: './GeistPixel-Grid.woff2',
  variable: '--font-geist-pixel-grid',
  weight: '500',
  display: 'swap',
  preload: false,
  fallback: [
    'Geist Mono',
    'ui-monospace',
    'SFMono-Regular',
    'Roboto Mono',
    'Menlo',
    'monospace',
  ],
  adjustFontFallback: false,
})
