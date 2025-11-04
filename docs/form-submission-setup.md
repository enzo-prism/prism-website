# Form Submission Setup Guide

This guide explains how to set up the backend storage and email notifications for the `/get-started` form. If you’re configuring HIPAA-safe dental intake flows with Google Workspace, see our companion guide: [`google/dental-patient-forms`](../app/google/dental-patient-forms/page.tsx).

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Resend Account**: Sign up at [resend.com](https://resend.com)

## Environment Variables

Add the following to your `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ibjqwvkcjdgdifujfnpb.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
```

## Step 1: Supabase Setup

### Get Your Service Role Key

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (`ibjqwvkcjdgdifujfnpb`)
3. Navigate to Settings → API
4. Copy the `service_role` key (starts with `eyJ...`)
5. Add it to `SUPABASE_SERVICE_ROLE_KEY` in your `.env.local`

### Create the Database Table

Run the following SQL in your Supabase SQL editor:

```sql
-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  website TEXT,
  phone TEXT,
  message TEXT NOT NULL,
  why_prism_excites TEXT NOT NULL,
  source TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'converted')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_email ON form_submissions(email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);

-- Enable Row Level Security
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserting new submissions
CREATE POLICY "Allow public inserts" ON form_submissions
  FOR INSERT TO anon
  WITH CHECK (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_form_submissions_updated_at
  BEFORE UPDATE ON form_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

## Step 2: Resend Setup

### Get Your API Key

1. Sign up at [resend.com](https://resend.com)
2. Navigate to API Keys
3. Create a new API key
4. Add it to `RESEND_API_KEY` in your `.env.local`

### Configure Email Domain

1. Add and verify your domain in Resend (e.g., `design-prism.com`)
2. Update DNS records as instructed
3. Once verified, you can send from `notifications@design-prism.com`

**Note**: For testing, you can use Resend's test API key which doesn't require domain verification.

## Step 3: Test the Integration

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to `/get-started`

3. Fill out and submit the form

4. Check:
   - Supabase dashboard for the new record
   - Your email inbox for the notification
   - Browser console for any errors

## Viewing Submissions in Supabase

1. Go to your Supabase Dashboard
2. Navigate to Table Editor
3. Select the `form_submissions` table
4. You'll see all submissions with their status

## Email Template

The email notification includes:
- Formatted HTML email with all form fields
- Direct reply-to link
- Submission timestamp
- Professional design matching Prism's brand

## Troubleshooting

### Form submission fails
- Check browser console for errors
- Verify environment variables are set
- Ensure Supabase table exists

### Email not received
- Check Resend dashboard for delivery status
- Verify domain is properly configured
- Check spam folder
- Ensure `RESEND_API_KEY` is valid

### Database connection errors
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
- Check Supabase service status
- Ensure table was created successfully

## Production Considerations

1. **Rate Limiting**: Add rate limiting to prevent spam submissions
2. **CAPTCHA**: Consider adding reCAPTCHA for bot protection
3. **Backup**: Set up regular database backups in Supabase
4. **Monitoring**: Set up alerts for failed submissions
5. **Email Queue**: For high volume, implement a queue system

## API Endpoint

The form submits to `/api/prism-leads` with the following payload:

```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "company": "Acme Inc",
  "website": "https://acme.com",
  "message": "Our growth challenge...",
  "whyPrismExcites": "What excites me...",
  "source": "exclusive-waitlist",
  "timestamp": "2025-01-27T12:00:00Z"
}
```

The API:
1. Validates all required fields
2. Stores in Supabase database
3. Sends email notification
4. Returns success response 
