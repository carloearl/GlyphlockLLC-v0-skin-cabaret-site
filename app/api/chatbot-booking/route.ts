import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { type, data, timestamp } = await request.json()

    console.log("[v0] Chatbot booking received:", { type, data, timestamp })

    // Process different types of bookings
    switch (type) {
      case "party_booking":
        await processPartyBooking(data)
        break
      case "ride_booking":
        await processRideBooking(data)
        break
      case "waste_management_inquiry":
        await processWasteManagementInquiry(data)
        break
      default:
        console.log("[v0] Unknown booking type:", type)
    }

    // In a real implementation, you would:
    // 1. Save to database
    // 2. Send notifications to staff
    // 3. Integrate with booking management system
    // 4. Send confirmation emails/SMS

    return NextResponse.json({
      success: true,
      message: "Booking processed successfully",
      bookingId: `CB-${Date.now()}`,
    })
  } catch (error) {
    console.error("[v0] Chatbot booking error:", error)
    return NextResponse.json({ success: false, message: "Failed to process booking" }, { status: 500 })
  }
}

async function processPartyBooking(data: any) {
  console.log("[v0] Processing party booking:", data)

  // Send SMS to venue staff
  await fetch("/api/send-sms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: "+14804257546",
      message: `🎉 CHATBOT PARTY BOOKING 🎉
Name: ${data.name}
Phone: ${data.phone}
Event: ${data.eventType}
Party Size: ${data.partySize}
Date: ${data.date}
Time: ${data.time}
Special Requests: ${data.specialRequests || "None"}

Please call customer within 30 minutes!`,
    }),
  })

  // Send confirmation to customer
  if (data.phone) {
    await fetch("/api/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: data.phone,
        message: `Hi ${data.name}! Your party booking request has been received. Our team will call you within 30 minutes to confirm details. Skin Cabaret - (480) 425-7546`,
      }),
    })
  }
}

async function processRideBooking(data: any) {
  console.log("[v0] Processing ride booking:", data)

  // Send SMS to shuttle coordinator
  await fetch("/api/send-sms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: "+14804257546",
      message: `🚐 SHUTTLE REQUEST 🚐
Name: ${data.name}
Phone: ${data.phone}
Pickup: ${data.pickupLocation}
Time: ${data.pickupTime}
Group Size: ${data.partySize}

Dispatch shuttle and call customer 15 min before pickup!`,
    }),
  })

  // Send confirmation to customer
  if (data.phone) {
    await fetch("/api/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: data.phone,
        message: `Hi ${data.name}! Your FREE shuttle is confirmed for ${data.pickupTime} at ${data.pickupLocation}. Driver will call 15 min before pickup. Skin Cabaret`,
      }),
    })
  }
}

async function processWasteManagementInquiry(data: any) {
  console.log("[v0] Processing waste management inquiry:", data)

  // Send high-priority notification for waste management events
  await fetch("/api/send-sms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: "+14804257546",
      message: `🏆 WASTE MANAGEMENT EVENT INQUIRY 🏆
HIGH PRIORITY - Annual corporate event
Contact: ${data.name || "Not provided"}
Phone: ${data.phone || "Not provided"}
Inquiry Type: ${data.inquiryType || "General"}

Route to event coordinator immediately!`,
    }),
  })
}
