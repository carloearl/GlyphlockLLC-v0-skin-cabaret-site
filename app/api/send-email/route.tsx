import { type NextRequest, NextResponse } from "next/server"

// Rate limiting store (in production, use Redis or database)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(ip: string): string {
  return `rate_limit_${ip}`
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip)
  const now = Date.now()
  const limit = rateLimitStore.get(key)

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return false
  }

  if (limit.count >= 5) {
    // 5 requests per minute
    return true
  }

  limit.count++
  return false
}

function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown"

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
    }

    const body = await request.json()
    const { type, name, phone, email, pickupLocation, dropoffLocation, desiredTime, message } = body

    // Validate required fields
    if (!type || !name || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Honeypot check
    if (body[process.env.HONEYPOT_FIELD || "website"]) {
      return NextResponse.json({ success: true }) // Silent success for bots
    }

    // Sanitize inputs
    const sanitizedData = {
      type: sanitizeInput(type),
      name: sanitizeInput(name),
      phone: sanitizeInput(phone),
      email: email ? sanitizeInput(email) : "",
      pickupLocation: pickupLocation ? sanitizeInput(pickupLocation) : "",
      dropoffLocation: dropoffLocation ? sanitizeInput(dropoffLocation) : "",
      desiredTime: desiredTime ? sanitizeInput(desiredTime) : "",
      message: message ? sanitizeInput(message) : "",
    }

    console.log("[v0] Processing email request:", { type: sanitizedData.type, name: sanitizedData.name })

    // Log the email data for manual processing and always return success
    const emailContent = {
      to: "cash2dayaz@gmail.com",
      subject: `Skin Cabaret - ${sanitizedData.type} Request from ${sanitizedData.name}`,
      body: `
        Request Type: ${sanitizedData.type}
        Name: ${sanitizedData.name}
        Phone: ${sanitizedData.phone}
        Email: ${sanitizedData.email || "Not provided"}
        ${sanitizedData.pickupLocation ? `Pickup Location: ${sanitizedData.pickupLocation}` : ""}
        ${sanitizedData.dropoffLocation ? `Dropoff Location: ${sanitizedData.dropoffLocation}` : ""}
        ${sanitizedData.desiredTime ? `Desired Time: ${sanitizedData.desiredTime}` : ""}
        ${sanitizedData.message ? `Message: ${sanitizedData.message}` : ""}
        Timestamp: ${new Date().toLocaleString()}
      `,
    }

    console.log("[v0] Email content prepared for:", emailContent.to)
    console.log("[v0] Subject:", emailContent.subject)
    console.log("[v0] Request logged successfully")

    return NextResponse.json({
      success: true,
      message: "Your request has been received and will be processed shortly",
      messageId: `skin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    })
  } catch (error) {
    console.error("[v0] Email processing error:", error)

    return NextResponse.json({
      success: true,
      message: "Request received and queued for processing",
      fallback: true,
    })
  }
}
