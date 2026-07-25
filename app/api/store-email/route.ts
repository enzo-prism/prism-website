const RETIRED_RESPONSE = {
  error: 'This endpoint is retired. Use a supported Prism form.',
}

function retiredResponse() {
  return new Response(JSON.stringify(RETIRED_RESPONSE), {
    status: 410,
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'application/json',
    },
  })
}

// The old implementation accepted personal data into process memory, where it
// was lost whenever a serverless instance recycled. Keep an explicit 410 so
// stale callers fail honestly without collecting or logging email addresses.
export async function POST() {
  return retiredResponse()
}

export async function GET() {
  return retiredResponse()
}
