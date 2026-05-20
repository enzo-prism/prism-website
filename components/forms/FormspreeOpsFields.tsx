'use client'

import { useEffect, useState } from 'react'

const UTM_FIELDS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const

type FormspreeOpsFieldsProps = {
  formKey: string
}

export function FormspreeOpsFields({ formKey }: FormspreeOpsFieldsProps) {
  const [context, setContext] = useState({
    pagePath: '',
    referrer: '',
    utm: Object.fromEntries(UTM_FIELDS.map((field) => [field, ''])) as Record<
      (typeof UTM_FIELDS)[number],
      string
    >,
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setContext({
      pagePath: window.location.pathname,
      referrer: document.referrer,
      utm: Object.fromEntries(
        UTM_FIELDS.map((field) => [field, params.get(field) ?? '']),
      ) as Record<(typeof UTM_FIELDS)[number], string>,
    })
  }, [])

  return (
    <>
      <input type="hidden" name="site" value="prism-site" />
      <input type="hidden" name="form_key" value={formKey} />
      <input
        type="hidden"
        name="environment"
        value={
          process.env.NEXT_PUBLIC_VERCEL_ENV ??
          process.env.NODE_ENV ??
          'production'
        }
      />
      <input type="hidden" name="_codex_test" value="false" />
      <input type="hidden" name="page_path" value={context.pagePath} />
      <input type="hidden" name="referrer" value={context.referrer} />
      {UTM_FIELDS.map((field) => (
        <input
          key={field}
          type="hidden"
          name={field}
          value={context.utm[field]}
        />
      ))}
    </>
  )
}

export function appendFormspreeOpsMetadata(
  formData: FormData,
  formKey: string,
) {
  formData.set('site', 'prism-site')
  formData.set('form_key', formKey)
  formData.set(
    'environment',
    process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.NODE_ENV ?? 'production',
  )
  formData.set('_codex_test', 'false')

  if (typeof window === 'undefined') {
    return
  }

  const params = new URLSearchParams(window.location.search)
  formData.set('page_path', window.location.pathname)
  formData.set('referrer', document.referrer)
  for (const field of UTM_FIELDS) {
    formData.set(field, params.get(field) ?? '')
  }
}

export function getFormspreeOpsMetadata(formKey: string) {
  const metadata: Record<string, string> = {
    site: 'prism-site',
    form_key: formKey,
    environment:
      process.env.NEXT_PUBLIC_VERCEL_ENV ??
      process.env.NODE_ENV ??
      'production',
    _codex_test: 'false',
    page_path: '',
    referrer: '',
  }

  if (typeof window === 'undefined') {
    for (const field of UTM_FIELDS) {
      metadata[field] = ''
    }
    return metadata
  }

  const params = new URLSearchParams(window.location.search)
  metadata.page_path = window.location.pathname
  metadata.referrer = document.referrer
  for (const field of UTM_FIELDS) {
    metadata[field] = params.get(field) ?? ''
  }
  return metadata
}
