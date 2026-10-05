export type PrismProduct = {
  id: 'midas' | 'zread'
  name: string
  href: string
  description: string
  navDescription: string
}

/** Free, open-source tools built by Prism for our own workflow and shared publicly. */
export const PRISM_PRODUCTS: readonly PrismProduct[] = [
  {
    id: 'midas',
    name: 'Midas',
    href: 'https://midas-ai.dev',
    navDescription: 'Your AI usage, at a glance.',
    description:
      'See AI usage, estimated value, and remaining limits from your Mac’s menu bar.',
  },
  {
    id: 'zread',
    name: 'zRead',
    href: 'https://zread.dev',
    navDescription: 'Your Mac, read aloud.',
    description:
      'Turn selected text into speech with a shortcut. Listen with Mac Voice or your own ElevenLabs voices.',
  },
] as const
