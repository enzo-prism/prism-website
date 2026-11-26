/**
 * @jest-environment jsdom
 * @jest-environment-options {"url":"https://www.design-prism.com/waitlist"}
 */
import { scheduleHotjar, trackHotjarMilestone } from '@/lib/hotjar'

jest.mock('@/lib/constants', () => ({ IS_PRODUCTION_ENV: true }))

afterEach(() => {
  jest.useRealTimers()
  window.localStorage.clear()
  window.history.replaceState(null, '', '/waitlist')
  delete window.hj
  delete window._hjSettings
  document.querySelectorAll('script[src*="hotjar.com"]').forEach(script => script.remove())
})

it('queues only fixed funnel names before loading the recorder once', () => {
  jest.useFakeTimers()
  trackHotjarMilestone('waitlist_step_view', 'contact')
  trackHotjarMilestone('waitlist_step_view', 'private@example.com')
  trackHotjarMilestone('waitlist_submit_success')
  trackHotjarMilestone('generate_lead')
  expect(window.hj?.q).toEqual([
    ['event', 'waitlist_step_contact'],
    ['event', 'waitlist_submit_success'],
  ])
  const cleanup = scheduleHotjar()
  window.dispatchEvent(new Event('pointerdown'))
  window.dispatchEvent(new Event('scroll'))
  expect(window._hjSettings).toBeUndefined()
  jest.runAllTimers()
  expect(document.querySelectorAll('script[src*="hotjar.com"]')).toHaveLength(1)
  cleanup?.()
})

it('rechecks the internal opt-out before a delayed load or event', () => {
  jest.useFakeTimers()
  const cleanup = scheduleHotjar()
  window.history.replaceState(null, '', '?internal=1')
  trackHotjarMilestone('waitlist_form_start')
  jest.runAllTimers()
  expect(window.hj).toBeUndefined()
  expect(window._hjSettings).toBeUndefined()
  cleanup?.()
})

it('cancels a pending load on unmount', () => {
  jest.useFakeTimers()
  const cleanup = scheduleHotjar()
  window.dispatchEvent(new Event('keydown'))
  cleanup?.()
  jest.runAllTimers()
  expect(window._hjSettings).toBeUndefined()
})
