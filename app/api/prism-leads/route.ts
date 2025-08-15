import { sendFormSubmissionEmail } from "@/lib/email"
import { supabaseAdmin, type FormSubmission } from "@/lib/supabase"
import { NextResponse } from "next/server"

interface PrismLeadData {
  websiteName: string
  websiteGoal: string
  styleReferences?: string
  numberOfPages: number
  companyName: string
  email: string
  phoneNumber: string
}

interface WaitlistApplication {
  name: string
  email: string
  company: string
  website?: string
  message: string
  source: string
  timestamp: string
}

// In-memory storage for demonstration
// In production, this should use a database
const prismLeads: (PrismLeadData | WaitlistApplication)[] = []

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Checkout flow from /get-started
    if (data.source === 'get-started-checkout') {
      const {
        plan,
        addon_search_surge,
        monthly_price,
        name,
        email,
        company,
        website,
        phone
      } = data as Record<string, unknown>

      // Basic validation
      const validPlan = plan === 'CORE' || plan === 'PLUS'
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!validPlan) {
        return NextResponse.json({ error: 'Invalid plan selection' }, { status: 400 })
      }
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
      }
      if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
        return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
      }
      if (!company || typeof company !== 'string' || company.trim().length < 2) {
        return NextResponse.json({ error: 'Invalid company' }, { status: 400 })
      }
      if (!website || typeof website !== 'string') {
        return NextResponse.json({ error: 'Website is required' }, { status: 400 })
      }

      // Create a concise message that captures the selections
      const selectionSummary = [
        `Plan: ${plan}`,
        `Add-on: Search Surge ${addon_search_surge ? 'ON (+$1.5k/mo)' : 'OFF'}`,
        `Monthly price: $${Number(monthly_price || 0).toLocaleString()}/mo`,
        phone && `Phone: ${phone}`,
      ]
        .filter(Boolean)
        .join('\n')

      try {
        // Store in Supabase (reuse existing table columns)
        const submission: Partial<FormSubmission> = {
          name: String(name),
          email: String(email).toLowerCase(),
          company: String(company),
          website: String(website),
          ...(phone ? { phone: String(phone) } : {}),
          message: selectionSummary,
          why_prism_excites: 'get-started-checkout',
          source: 'get-started-checkout',
        }

        let insertedData = null

        if (supabaseAdmin) {
          const { data: dbData, error: dbError } = await supabaseAdmin
            .from('form_submissions')
            .insert([submission])
            .select()
            .single()

          if (dbError) {
            console.error('Database error:', dbError)
            throw dbError
          }

          insertedData = dbData
        } else {
          console.warn('Database not configured. Storing in memory only.')
          insertedData = { id: 'memory-' + Date.now(), ...submission, created_at: new Date().toISOString() }
        }

        // Email notification
        try {
          await sendFormSubmissionEmail({
            name: String(name),
            email: String(email),
            company: String(company),
            website: String(website),
            message: selectionSummary,
            whyPrismExcites: 'get-started-checkout',
            submittedAt: insertedData.created_at || new Date().toISOString(),
          })
          console.log('Email notification sent successfully')
        } catch (emailError) {
          console.error('Email sending failed:', emailError)
        }

        // Also store in memory for debugging parity
        prismLeads.push({
          name: String(name),
          email: String(email),
          company: String(company),
          website: String(website),
          message: selectionSummary,
          source: 'get-started-checkout',
          timestamp: new Date().toISOString(),
        } as any)

        return NextResponse.json({
          success: true,
          message: 'Checkout submission received successfully',
          id: insertedData.id,
        })
      } catch (error) {
        console.error('Error storing checkout submission:', error)
        return NextResponse.json({ error: 'Failed to process submission' }, { status: 500 })
      }
    }

    // Check if this is a waitlist application or legacy get-started form
    if (data.source === 'waitlist' || data.source === 'exclusive-waitlist') {
      // Handle waitlist/get-started application
      const waitlistData = data as WaitlistApplication
      
      // Validate required fields for waitlist
      const requiredFields = ["name", "email", "company", "message"]
      for (const field of requiredFields) {
        if (!waitlistData[field as keyof WaitlistApplication]) {
          return NextResponse.json(
            { error: `Missing required field: ${field}` },
            { status: 400 }
          )
        }
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(waitlistData.email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        )
      }

      // For get-started form, we need the additional field
      if (data.source === 'exclusive-waitlist' && !data.whyPrismExcites) {
        return NextResponse.json(
          { error: "Missing required field: whyPrismExcites" },
          { status: 400 }
        )
      }

      try {
        // Store in Supabase
        const submission: Partial<FormSubmission> = {
          name: waitlistData.name,
          email: waitlistData.email.toLowerCase(),
          company: waitlistData.company,
          ...(waitlistData.website && { website: waitlistData.website }),
          message: waitlistData.message,
          why_prism_excites: data.whyPrismExcites || '',
          source: waitlistData.source,
        }

        let insertedData = null
        
        if (supabaseAdmin) {
          const { data, error: dbError } = await supabaseAdmin
            .from('form_submissions')
            .insert([submission])
            .select()
            .single()

          if (dbError) {
            console.error('Database error:', dbError)
            throw dbError
          }
          
          insertedData = data
        } else {
          console.warn('Database not configured. Storing in memory only.')
          insertedData = { id: 'memory-' + Date.now(), ...submission, created_at: new Date().toISOString() }
        }

        // Send email notification for exclusive-waitlist submissions
        if (data.source === 'exclusive-waitlist') {
          try {
            await sendFormSubmissionEmail({
              name: waitlistData.name,
              email: waitlistData.email,
              company: waitlistData.company,
              website: waitlistData.website,
              message: waitlistData.message,
              whyPrismExcites: data.whyPrismExcites,
              submittedAt: insertedData.created_at || new Date().toISOString(),
            })
            console.log('Email notification sent successfully')
          } catch (emailError) {
            // Log email error but don't fail the submission
            console.error('Email sending failed:', emailError)
            // You might want to set up a retry queue here
          }
        }

        // Still store in memory for backward compatibility
        prismLeads.push(waitlistData)
        
        // Log for monitoring
        console.log("New form submission stored:", insertedData)

        return NextResponse.json({
          success: true,
          message: "Application received successfully",
          id: insertedData.id
        })
      } catch (error) {
        console.error('Error storing submission:', error)
        // Fall back to in-memory storage if database fails
        prismLeads.push(waitlistData)
        
        return NextResponse.json({
          success: true,
          message: "Application received (backup mode)"
        })
      }
    } else {
      // Handle original Prism AI lead format
      const leadData = data as PrismLeadData
      
      // Validate required fields
      const requiredFields = ["websiteName", "websiteGoal", "companyName", "email", "phoneNumber", "numberOfPages"]
      for (const field of requiredFields) {
        if (!leadData[field as keyof PrismLeadData]) {
          return NextResponse.json(
            { error: `Missing required field: ${field}` },
            { status: 400 }
          )
        }
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(leadData.email)) {
        return NextResponse.json(
          { error: "Invalid email format" },
          { status: 400 }
        )
      }

      // Validate phone number (basic validation)
      const phoneRegex = /^[\d\s\-\+\(\)]+$/
      if (!leadData.phoneNumber || !phoneRegex.test(leadData.phoneNumber)) {
        return NextResponse.json(
          { error: "Invalid phone number format" },
          { status: 400 }
        )
      }

      // Validate number of pages
      if (leadData.numberOfPages < 1 || leadData.numberOfPages > 50) {
        return NextResponse.json(
          { error: "Number of pages must be between 1 and 50" },
          { status: 400 }
        )
      }

      // Sanitize data
      const sanitizedData: PrismLeadData = {
        websiteName: leadData.websiteName.trim().slice(0, 100),
        websiteGoal: leadData.websiteGoal.trim().slice(0, 500),
        styleReferences: leadData.styleReferences?.trim().slice(0, 500) || "",
        numberOfPages: Math.floor(leadData.numberOfPages),
        companyName: leadData.companyName.trim().slice(0, 100),
        email: leadData.email.trim().toLowerCase(),
        phoneNumber: leadData.phoneNumber.trim().slice(0, 20)
      }

      // Store the lead
      prismLeads.push(sanitizedData)
      
      // Log for monitoring
      console.log("New Prism AI lead:", {
        ...sanitizedData,
        timestamp: new Date().toISOString()
      })

      return NextResponse.json({
        success: true,
        message: "Lead captured successfully"
      })
    }

  } catch (error) {
    console.error("Error processing lead:", error)
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    )
  }
}

// For demonstration/debugging only - remove in production
export async function GET() {
  const waitlistCount = prismLeads.filter(lead => 'source' in lead && lead.source === 'waitlist').length
  const aiLeadsCount = prismLeads.filter(lead => 'websiteName' in lead).length
  
  return NextResponse.json({
    totalLeads: prismLeads.length,
    waitlistApplications: waitlistCount,
    aiLeads: aiLeadsCount,
    message: "Prism lead generation endpoint is active"
  })
}