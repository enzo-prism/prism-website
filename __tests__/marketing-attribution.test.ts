import {
  appendAttributionToFormData,
  getAttributionContext,
  syncFormAttributionFields,
} from '@/lib/marketing-attribution'

describe('marketing attribution helpers', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.history.replaceState({}, '', '/')
    document.body.innerHTML = ''
    Object.defineProperty(document, 'referrer', { configurable: true, value: '' })
  })

  it('stores first-touch attribution from the current URL', () => {
    window.history.replaceState(
      {},
      '',
      '/pricing?utm_source=google&utm_medium=cpc&utm_campaign=spring&utm_content=hero&utm_term=dental',
    )

    expect(getAttributionContext()).toMatchObject({
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'spring',
      utm_content: 'hero',
      utm_term: 'dental',
      landing_path: '/pricing',
      first_touch_source: 'google',
      first_touch_medium: 'cpc',
      first_touch_campaign: 'spring',
    })
  })

  it('stores a landing path for direct entries without inventing a source', () => {
    window.history.replaceState({}, '', '/pricing')

    expect(getAttributionContext()).toMatchObject({
      landing_path: '/pricing',
    })
    expect(getAttributionContext().utm_source).toBeUndefined()
    expect(getAttributionContext().first_touch_source).toBeUndefined()
  })

  it('syncs hidden attribution inputs into forms before submission', () => {
    window.history.replaceState(
      {},
      '',
      '/contact?utm_source=linkedin&utm_campaign=q2-pipeline',
    )

    const form = document.createElement('form')
    document.body.appendChild(form)

    syncFormAttributionFields(form)

    expect(
      form.querySelector<HTMLInputElement>('input[name="utm_source"]')?.value,
    ).toBe('linkedin')
    expect(
      form.querySelector<HTMLInputElement>('input[name="utm_campaign"]')?.value,
    ).toBe('q2-pipeline')
    expect(
      form.querySelector<HTMLInputElement>('input[name="submission_path"]')
        ?.value,
    ).toBe('/contact')
  })

  it('appends attribution fields to FormData payloads', () => {
    window.history.replaceState(
      {},
      '',
      '/get-started?utm_source=google&utm_medium=cpc&gclid=test-click-id',
    )

    const formData = new FormData()
    formData.set('email', 'test@example.com')

    appendAttributionToFormData(formData)

    expect(formData.get('utm_source')).toBe('google')
    expect(formData.get('utm_medium')).toBe('cpc')
    expect(formData.get('gclid')).toBe('test-click-id')
    expect(formData.get('submission_path')).toBe('/get-started')
    expect(formData.get('device_type')).toBe('desktop')
    expect(formData.get('timestamp')).toEqual(expect.any(String))
  })

  it('keeps the original external hostname after internal navigation and a later campaign', () => {
    Object.defineProperty(document, 'referrer', {
      configurable: true,
      value: 'https://chatgpt.com/c/private-conversation?email=private@example.com',
    })
    window.history.replaceState({}, '', '/blog/prism-approach-small-business-growth')
    expect(getAttributionContext().first_touch_referrer_host).toBe('chatgpt.com')

    Object.defineProperty(document, 'referrer', {
      configurable: true,
      value: 'https://www.design-prism.com/services',
    })
    window.history.replaceState({}, '', '/waitlist?utm_source=instagram&utm_medium=social')
    const payload = appendAttributionToFormData(new FormData())
    expect(payload.get('first_touch_referrer_host')).toBe('chatgpt.com')
    expect(payload.get('landing_path')).toBe('/blog/prism-approach-small-business-growth')
    expect(payload.get('utm_source')).toBe('instagram')
    expect(payload.has('first_touch_source')).toBe(false)
    expect(JSON.stringify(getAttributionContext())).not.toContain('private-conversation')
    expect(JSON.stringify(getAttributionContext())).not.toContain('private@example.com')
  })

  it.each(['https://design-prism.com/about', 'https://www.design-prism.com/about', 'invalid', 'javascript:alert(1)', ''])('does not invent an external referrer from %s', (referrer) => {
    Object.defineProperty(document, 'referrer', { configurable: true, value: referrer })
    expect(getAttributionContext().first_touch_referrer_host).toBeUndefined()
  })

  it('does not assign a later visit referrer to legacy attribution', () => {
    window.localStorage.setItem('prism_attribution_v1', JSON.stringify({
      savedAt: Date.now(), landing_path: '/pricing', first_touch_source: 'google',
    }))
    Object.defineProperty(document, 'referrer', { configurable: true, value: 'https://chatgpt.com/' })
    window.history.replaceState({}, '', '/waitlist?utm_source=instagram')
    expect(getAttributionContext()).toMatchObject({ landing_path: '/pricing', first_touch_source: 'google' })
    expect(getAttributionContext().first_touch_referrer_host).toBeUndefined()
  })

  it('captures a new entry after attribution expires', () => {
    window.localStorage.setItem('prism_attribution_v1', JSON.stringify({
      savedAt: Date.now() - 31 * 24 * 60 * 60 * 1000, landing_path: '/old',
    }))
    Object.defineProperty(document, 'referrer', { configurable: true, value: 'https://www.google.com/search?q=private' })
    window.history.replaceState({}, '', '/ads')
    expect(getAttributionContext()).toMatchObject({ landing_path: '/ads', first_touch_referrer_host: 'www.google.com' })
  })
})
