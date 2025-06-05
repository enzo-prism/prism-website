interface VimeoPlayerOptions {
  id?: string | number
  url?: string
  autopause?: boolean
  autoplay?: boolean
  background?: boolean
  byline?: boolean
  color?: string
  controls?: boolean
  dnt?: boolean
  height?: number
  loop?: boolean
  maxheight?: number
  maxwidth?: number
  muted?: boolean
  playsinline?: boolean
  portrait?: boolean
  responsive?: boolean
  speed?: boolean
  title?: boolean
  transparent?: boolean
  width?: number
}

interface VimeoPlayer {
  play(): Promise<void>
  pause(): Promise<void>
  unload(): Promise<void>
  setVolume(volume: number): Promise<number>
  getVolume(): Promise<number>
  getDuration(): Promise<number>
  getCurrentTime(): Promise<number>
  setCurrentTime(time: number): Promise<number>
  on(event: string, callback: Function): void
  off(event: string, callback?: Function): void
  destroy(): Promise<void>
}

interface VimeoConstructor {
  Player: {
    new (element: HTMLElement | string, options: VimeoPlayerOptions): VimeoPlayer
  }
}

declare global {
  interface Window {
    Vimeo?: VimeoConstructor
  }
}

export {}
