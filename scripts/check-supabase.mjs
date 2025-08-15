import { createClient } from '@supabase/supabase-js'

function env(name) {
  const v = process.env[name]
  return v && v.trim().length ? v.trim() : undefined
}

async function main() {
  const url = env('SUPABASE_URL') || env('NEXT_PUBLIC_SUPABASE_URL')
  const key = env('SUPABASE_SERVICE_ROLE_KEY')

  const report = { env: { hasUrl: !!url, hasServiceRoleKey: !!key }, checks: [] }

  if (!url || !key) {
    console.log(JSON.stringify({ ok: false, ...report, reason: 'Missing env vars' }, null, 2))
    process.exit(1)
  }

  const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })

  // Check select
  try {
    const { data, error } = await admin.from('form_submissions').select('id').limit(1)
    report.checks.push({ step: 'select', ok: !error, error: error ? { code: error.code, message: error.message } : null })
    if (error) throw error
  } catch (e) {
    console.log(JSON.stringify({ ok: false, ...report }, null, 2))
    process.exit(2)
  }

  // Insert + cleanup
  let insertedId
  try {
    const payload = {
      name: 'Diag Runner',
      email: `diag_${Date.now()}@example.com`,
      company: 'Prism Diagnostics',
      website: 'https://example.com',
      message: 'diagnostic insert',
      why_prism_excites: 'diagnostics',
      source: 'diagnostics',
    }
    const { data, error } = await admin.from('form_submissions').insert([payload]).select().single()
    report.checks.push({ step: 'insert', ok: !error, error: error ? { code: error.code, message: error.message } : null })
    if (error) throw error
    insertedId = data?.id
  } catch (e) {
    // Provide quick hints
    const msg = String(e?.message || '')
    if (/invalid api key|jwt/i.test(msg)) report.hint = 'Invalid service role key or wrong project URL'
    if (/does not exist/i.test(msg)) report.hint = 'Table form_submissions missing in this project'
    if (/row-level security/i.test(msg)) report.hint = 'RLS blocked insert; ensure service role key is used'
    console.log(JSON.stringify({ ok: false, ...report, error: { message: e?.message } }, null, 2))
    process.exit(3)
  }

  // Cleanup
  if (insertedId) {
    const { error } = await admin.from('form_submissions').delete().eq('id', insertedId)
    report.checks.push({ step: 'cleanup', ok: !error, error: error ? { code: error.code, message: error.message } : null })
  }

  console.log(JSON.stringify({ ok: true, ...report }, null, 2))
}

main().catch((e) => {
  console.error(e)
  process.exit(99)
})


