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

    // Check if this is a waitlist application
    if (data.source === 'waitlist') {
      // Handle waitlist application
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

      // Store the waitlist application
      prismLeads.push(waitlistData)
      
      // Log for monitoring
      console.log("New waitlist application:", waitlistData)

      return NextResponse.json({
        success: true,
        message: "Waitlist application received successfully"
      })
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