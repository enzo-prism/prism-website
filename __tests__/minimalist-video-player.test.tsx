import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import MinimalistVideoPlayer from '@/components/minimalist-video-player'

jest.mock('@/utils/analytics', () => ({ trackVideoInteraction: jest.fn() }))
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, ...props }: any) => <img {...props} />,
}))

let observers: any[]
let players: any[]
let rejectPlay = false
let readyResolvers: (() => void)[] | null = null
class Player {
  handlers: Record<string, Function> = {}
  on = jest.fn((event, fn) => {
    this.handlers[event] = fn
  })
  ready = jest.fn(() =>
    readyResolvers
      ? new Promise<void>((resolve) => readyResolvers!.push(resolve))
      : Promise.resolve(),
  )
  play = jest.fn(() => {
    if (rejectPlay) return Promise.reject(new Error('Autoplay blocked'))
    this.handlers.play?.()
    return Promise.resolve()
  })
  pause = jest.fn(() => {
    this.handlers.pause?.()
    return Promise.resolve()
  })
  setVolume = jest.fn(() => Promise.resolve())
  destroy = jest.fn(() => Promise.resolve())
  constructor() {
    players.push(this)
  }
}
const props = { videoId: '1116465370', thumbnailSrc: '/white.svg' }
async function enterViewport() {
  await act(async () => {
    observers[1].callback([{ isIntersecting: true }])
    observers[0].callback([{ isIntersecting: true }])
  })
}
beforeEach(() => {
  observers = []
  players = []
  rejectPlay = false
  readyResolvers = null
  window.Vimeo = { Player } as any
  window.matchMedia = jest.fn().mockReturnValue({ matches: false })
  Object.defineProperty(navigator, 'connection', {
    configurable: true,
    value: {},
  })
  Object.defineProperty(document, 'hidden', {
    configurable: true,
    value: false,
  })
  window.IntersectionObserver = class {
    constructor(public callback: Function) {
      observers.push(this)
    }
    observe() {}
    disconnect() {}
    unobserve() {}
    takeRecords() {
      return []
    }
  } as any
})
afterEach(() => {
  document.getElementById('vimeo-player-api')?.remove()
})

test('waits for proximity and offers manual Play after rejected autoplay', async () => {
  rejectPlay = true
  render(<MinimalistVideoPlayer {...props} />)
  expect(players).toHaveLength(0)
  await enterViewport()
  expect(players[0].play).toHaveBeenCalledTimes(1)
  expect(screen.getByRole('button', { name: 'Play' })).toBeVisible()
  rejectPlay = false
  fireEvent.click(screen.getByRole('button', { name: 'Play' }))
  expect(
    await screen.findByRole('button', { name: 'Pause' }),
  ).toBeInTheDocument()
})

test.each(['motion', 'data'])(
  'respects %s preference but permits explicit playback',
  async (preference) => {
    if (preference === 'motion')
      window.matchMedia = jest.fn().mockReturnValue({ matches: true })
    else
      Object.defineProperty(navigator, 'connection', {
        configurable: true,
        value: { saveData: true },
      })
    render(<MinimalistVideoPlayer {...props} />)
    await enterViewport()
    expect(players[0].play).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Play' }))
    expect(
      await screen.findByRole('button', { name: 'Pause' }),
    ).toBeInTheDocument()
  },
)

test('pauses outside viewport and when the document becomes hidden', async () => {
  render(<MinimalistVideoPlayer {...props} />)
  await enterViewport()
  await act(async () => observers[1].callback([{ isIntersecting: false }]))
  expect(players[0].pause).toHaveBeenCalledTimes(1)
  Object.defineProperty(document, 'hidden', { configurable: true, value: true })
  await act(async () => document.dispatchEvent(new Event('visibilitychange')))
  expect(players[0].pause).toHaveBeenCalledTimes(2)
})

test('ignores a previous clip finishing initialization after a selection change', async () => {
  readyResolvers = []
  const view = render(<MinimalistVideoPlayer {...props} />)
  await enterViewport()
  view.rerender(<MinimalistVideoPlayer {...props} videoId="1116465409" />)
  await act(async () => readyResolvers![0]())
  expect(players[0].destroy).toHaveBeenCalled()
  expect(players[0].play).not.toHaveBeenCalled()
  await act(async () => readyResolvers![1]())
  expect(players[1].play).toHaveBeenCalledTimes(1)
})

test('shows a functional retry after script failure and removes stale load listeners', async () => {
  delete (window as any).Vimeo
  const view = render(<MinimalistVideoPlayer {...props} />)
  await enterViewport()
  const script = document.getElementById('vimeo-player-api')!
  fireEvent.error(script)
  fireEvent.click(screen.getByRole('button', { name: 'Retry video' }))
  const retryScript = document.getElementById('vimeo-player-api')!
  expect(retryScript).not.toBe(script)
  window.Vimeo = { Player } as any
  await act(async () => retryScript.dispatchEvent(new Event('load')))
  await waitFor(() => expect(players).toHaveLength(1))
  view.unmount()
  fireEvent.load(script)
  expect(players).toHaveLength(1)
})

test('starts only when a preloaded player actually enters the viewport', async () => {
  render(<MinimalistVideoPlayer {...props} />)
  await act(async () => observers[0].callback([{ isIntersecting: true }]))
  expect(players[0].play).not.toHaveBeenCalled()
  await act(async () => observers[1].callback([{ isIntersecting: true }]))
  expect(players[0].play).toHaveBeenCalledTimes(1)
})

test('offers retry if the Vimeo script never answers', async () => {
  jest.useFakeTimers()
  delete (window as any).Vimeo
  const view = render(<MinimalistVideoPlayer {...props} />)
  await enterViewport()
  act(() => jest.advanceTimersByTime(20000))
  expect(screen.getByRole('button', { name: 'Retry video' })).toBeVisible()
  expect(document.getElementById('vimeo-player-api')).toBeNull()
  view.unmount()
  jest.useRealTimers()
})

test('keeps a timed-out player stopped and offers its exact Vimeo fallback', async () => {
  jest.useFakeTimers()
  readyResolvers = []
  const view = render(<MinimalistVideoPlayer {...props} />)
  await enterViewport()
  act(() => jest.advanceTimersByTime(20000))
  expect(players[0].pause).toHaveBeenCalled()
  expect(screen.getByRole('link', { name: 'watch on Vimeo' })).toHaveAttribute(
    'href',
    `https://vimeo.com/${props.videoId}`,
  )
  await act(async () => readyResolvers![0]())
  expect(players[0].play).not.toHaveBeenCalled()
  expect(screen.getByRole('button', { name: 'Retry video' })).toBeVisible()
  view.unmount()
  jest.useRealTimers()
})
