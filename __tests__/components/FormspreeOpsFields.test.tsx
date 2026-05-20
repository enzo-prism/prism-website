import { render, waitFor } from '@testing-library/react'

import {
  appendFormspreeOpsMetadata,
  FormspreeOpsFields,
  getFormspreeOpsMetadata,
} from '@/components/forms/FormspreeOpsFields'

describe('FormspreeOpsFields', () => {
  beforeEach(() => {
    window.history.replaceState(
      {},
      '',
      '/apply?utm_source=google&utm_medium=cpc&utm_campaign=spring&utm_term=dental&utm_content=hero',
    )
  })

  it('renders the standard Formspree ops hidden fields', async () => {
    const { container } = render(
      <form>
        <FormspreeOpsFields formKey="apply" />
      </form>,
    )

    expect(
      container.querySelector<HTMLInputElement>('input[name="site"]')?.value,
    ).toBe('prism-site')
    expect(
      container.querySelector<HTMLInputElement>('input[name="form_key"]')
        ?.value,
    ).toBe('apply')
    expect(
      container.querySelector<HTMLInputElement>('input[name="_codex_test"]')
        ?.value,
    ).toBe('false')

    await waitFor(() => {
      expect(
        container.querySelector<HTMLInputElement>('input[name="page_path"]')
          ?.value,
      ).toBe('/apply')
      expect(
        container.querySelector<HTMLInputElement>('input[name="utm_source"]')
          ?.value,
      ).toBe('google')
      expect(
        container.querySelector<HTMLInputElement>('input[name="utm_medium"]')
          ?.value,
      ).toBe('cpc')
      expect(
        container.querySelector<HTMLInputElement>('input[name="utm_campaign"]')
          ?.value,
      ).toBe('spring')
      expect(
        container.querySelector<HTMLInputElement>('input[name="utm_term"]')
          ?.value,
      ).toBe('dental')
      expect(
        container.querySelector<HTMLInputElement>('input[name="utm_content"]')
          ?.value,
      ).toBe('hero')
    })
  })

  it('appends the same metadata to imperative FormData submissions', () => {
    const formData = new FormData()

    appendFormspreeOpsMetadata(formData, 'prism_ai')

    expect(formData.get('site')).toBe('prism-site')
    expect(formData.get('form_key')).toBe('prism_ai')
    expect(formData.get('_codex_test')).toBe('false')
    expect(formData.get('page_path')).toBe('/apply')
    expect(formData.get('utm_source')).toBe('google')
    expect(formData.get('utm_medium')).toBe('cpc')
    expect(formData.get('utm_campaign')).toBe('spring')
    expect(formData.get('utm_term')).toBe('dental')
    expect(formData.get('utm_content')).toBe('hero')
  })

  it('returns object metadata for JSON Formspree submissions', () => {
    expect(getFormspreeOpsMetadata('checkout_grow')).toMatchObject({
      site: 'prism-site',
      form_key: 'checkout_grow',
      _codex_test: 'false',
      page_path: '/apply',
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'spring',
      utm_term: 'dental',
      utm_content: 'hero',
    })
  })
})
