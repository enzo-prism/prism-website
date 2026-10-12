import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Teach tailwind-merge the Prism Spectrum utilities (app/globals.css) so
// `cn('text-title text-gradient')` keeps both: one is a type size, the other
// a text fill. Without this both read as text colors and one gets dropped.
const twMerge = extendTailwindMerge<'prism-text-fill'>({
  extend: {
    classGroups: {
      'font-size': [
        'text-display',
        'text-title',
        'text-heading',
        'text-lead',
        'text-eyebrow',
      ],
      'prism-text-fill': ['text-gradient', 'text-spectrum', 'text-refract'],
      'text-color': ['text-subtle'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
