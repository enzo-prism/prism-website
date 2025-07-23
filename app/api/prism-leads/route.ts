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

// In-memory storage for demonstration
// In production, this should use a database
const prismLeads: PrismLeadData[] = []

export async function POST(request: Request) {
  try {
    const data: PrismLeadData = await request.json()

    // Validate required fields
    const requiredFields = ["websiteName", "websiteGoal", "companyName", "email", "phoneNumber", "numberOfPages"]
    for (const field of requiredFields) {
      if (!data[field as keyof PrismLeadData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(data.phoneNumber)) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      )
    }

    // Validate number of pages
    if (data.numberOfPages < 1 || data.numberOfPages > 50) {
      return NextResponse.json(
        { error: "Number of pages must be between 1 and 50" },
        { status: 400 }
      )
    }

    // Sanitize data
    const sanitizedData: PrismLeadData = {
      websiteName: data.websiteName.trim().slice(0, 100),
      websiteGoal: data.websiteGoal.trim().slice(0, 500),
      styleReferences: data.styleReferences?.trim().slice(0, 500) || "",
      numberOfPages: Math.floor(data.numberOfPages),
      companyName: data.companyName.trim().slice(0, 100),
      email: data.email.trim().toLowerCase(),
      phoneNumber: data.phoneNumber.trim().slice(0, 20)
    }

    // Store the lead (in production, save to database)
    prismLeads.push(sanitizedData)
    
    // Log for monitoring
    console.log("New Prism AI lead:", {
      ...sanitizedData,
      timestamp: new Date().toISOString()
    })

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Send SMS notification
    // 4. Trigger AI website generation workflow

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully"
    })

  } catch (error) {
    console.error("Error processing Prism AI lead:", error)
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    )
  }
}

// For demonstration/debugging only - remove in production
export async function GET() {
  return NextResponse.json({
    totalLeads: prismLeads.length,
    message: "Prism AI lead generation endpoint is active"
  })
}