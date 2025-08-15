import { createClient } from '@supabase/supabase-js'

// Prefer server-only URL; fall back to public only if necessary
const supabaseUrl = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
const supabaseServiceKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()

if (!supabaseUrl) {
  console.warn('[supabase] SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL is not set; database writes will be disabled')
}
if (!supabaseServiceKey) {
  console.warn('[supabase] SUPABASE_SERVICE_ROLE_KEY is not set; database writes will be disabled')
}

// Create a Supabase client with the service role key for server-side operations
export const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null

// Types for our form submission
export interface FormSubmission {
  id?: string
  name: string
  email: string
  company: string
  website?: string
  phone?: string
  message: string
  why_prism_excites: string
  source: string
  created_at?: string
  status?: 'pending' | 'contacted' | 'converted'
} 