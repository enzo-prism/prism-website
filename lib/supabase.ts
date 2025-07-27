import { createClient } from '@supabase/supabase-js'

// These values should be in your environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ibjqwvkcjdgdifujfnpb.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Create a Supabase client with the service role key for server-side operations
// Only initialize if we have the service key
export const supabaseAdmin = supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

// Types for our form submission
export interface FormSubmission {
  id?: string
  name: string
  email: string
  company: string
  website?: string
  message: string
  why_prism_excites: string
  source: string
  created_at?: string
  status?: 'pending' | 'contacted' | 'converted'
} 