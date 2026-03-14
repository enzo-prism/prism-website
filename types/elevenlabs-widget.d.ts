import type { DetailedHTMLProps, HTMLAttributes } from 'react'

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        'agent-id'?: string
        'default-expanded'?: string
        dismissible?: string
        'data-testid'?: string
        'markdown-link-allow-http'?: string
        'markdown-link-allowed-hosts'?: string
        'markdown-link-include-www'?: string
        variant?: 'expanded'
      }
    }
  }
}

export {}
