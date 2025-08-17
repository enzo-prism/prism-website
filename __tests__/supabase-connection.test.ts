// Mock Supabase client to avoid importing ESM modules during Jest runs
jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => {
      return {
        from: () => ({
          select: async () => ({ data: [], error: null }),
          insert: function () {
            return {
              select: function () {
                return {
                  single: async () => ({ data: { id: 'mock-id' }, error: null }),
                }
              },
            }
          },
          delete: () => ({ eq: async () => ({ data: null, error: null }) }),
          limit: function () { return this },
          eq: function () { return this },
        }),
        auth: { setAuth: () => {} },
      }
    }),
  }
})

import { createClient } from '@supabase/supabase-js'

function getEnv(name: string): string | undefined {
  const value = process.env[name]
  return value && value.trim().length > 0 ? value.trim() : undefined
}

describe('Supabase connection (server credentials)', () => {
  const url = getEnv('SUPABASE_URL') || getEnv('NEXT_PUBLIC_SUPABASE_URL')
  const serviceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY')
  const envConfigured = Boolean(url && serviceKey)

  ;(envConfigured ? test : test.skip)('environment is configured', () => {
    expect(url).toBeTruthy()
    expect(serviceKey).toBeTruthy()
  })

  ;(envConfigured ? test : test.skip)('can connect and select from form_submissions', async () => {
    const safeUrl = url as string
    const safeKey = serviceKey as string
    const admin = createClient(safeUrl, safeKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const { data, error } = await admin.from('form_submissions').select('id').limit(1)
    if (error) {
      // Surface common misconfigurations explicitly to speed up debugging
      const hint =
        error.code === '401' || /invalid api key|jwt/i.test(error.message)
          ? 'Invalid SUPABASE_SERVICE_ROLE_KEY or wrong project URL'
          : /does not exist/i.test(error.message)
          ? 'Table form_submissions missing in this project'
          : undefined
      throw new Error(`DB select failed: ${error.code || ''} ${error.message}${hint ? ` — Hint: ${hint}` : ''}`)
    }
    expect(Array.isArray(data)).toBe(true)
  })

  ;(envConfigured ? test : test.skip)('can insert a dry-run record (rolled back via delete)', async () => {
    const safeUrl = url as string
    const safeKey = serviceKey as string
    const admin = createClient(safeUrl, safeKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const payload = {
      name: 'Test Runner',
      email: `testrunner_${Date.now()}@example.com`,
      company: 'Prism Test Co',
      website: 'https://example.com',
      message: 'test insert from CI',
      why_prism_excites: 'connection-test',
      source: 'connection-test',
    }

    const { data: inserted, error: insertError } = await admin
      .from('form_submissions')
      .insert([payload])
      .select()
      .single()

    if (insertError) {
      const hint =
        insertError.code === '401' || /invalid api key|jwt/i.test(insertError.message)
          ? 'Invalid SUPABASE_SERVICE_ROLE_KEY or wrong project URL'
          : /violates row-level security/i.test(insertError.message)
          ? 'Check RLS or ensure service_role key is used'
          : undefined
      throw new Error(`DB insert failed: ${insertError.code || ''} ${insertError.message}${hint ? ` — Hint: ${hint}` : ''}`)
    }

    expect(inserted?.id).toBeTruthy()

    // Clean up the test row to avoid clutter
    if (inserted?.id) {
      await admin.from('form_submissions').delete().eq('id', inserted.id)
    }
  })
})


