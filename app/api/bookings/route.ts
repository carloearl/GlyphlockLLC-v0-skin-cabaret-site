import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json()

    // Log booking data for debugging
    console.log("[v0] New booking received:", bookingData)

    // In a real implementation, you would:
    // 1. Validate the data
    // 2. Save to WordPress database via REST API
    // 3. Send confirmation emails
    // 4. Integrate with booking management system

    // Simulate WordPress REST API call
    const wpResponse = await fetch(`${process.env.WORDPRESS_API_URL}/wp-json/wp/v2/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WORDPRESS_API_TOKEN}`,
      },
      body: JSON.stringify({
        title: `Booking - ${bookingData.firstName} ${bookingData.lastName}`,
        content: JSON.stringify(bookingData),
        status: "publish",
        meta: {
          booking_data: bookingData,
          booking_status: "pending",
          created_at: new Date().toISOString(),
        },
      }),
    })

    if (!wpResponse.ok) {
      throw new Error("WordPress API error")
    }

    return NextResponse.json({
      success: true,
      message: "Booking submitted successfully",
      bookingId: Date.now().toString(),
    })
  } catch (error) {
    console.error("[v0] Booking API error:", error)
    return NextResponse.json({ success: false, message: "Failed to submit booking" }, { status: 500 })
  }
}
