import { NextResponse } from "next/server"

// This is a simple in-memory store for demonstration
// In a real application, you would use a database
const emailStore: string[] = []

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Store email (in a real app, this would be a database operation)
    if (!emailStore.includes(email)) {
      emailStore.push(email)
      console.log(`Stored email: ${email}. Total emails: ${emailStore.length}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error storing email:", error)
    return NextResponse.json({ error: "Failed to store email" }, { status: 500 })
  }
}

// For demonstration purposes only - in a real app you would not expose this
export async function GET() {
  return NextResponse.json({
    count: emailStore.length,
    // Don't return actual emails in production!
    // This is just for demonstration
    sample: emailStore.length > 0 ? `${emailStore[0].split("@")[0].slice(0, 3)}...@...` : null,
  })
}
