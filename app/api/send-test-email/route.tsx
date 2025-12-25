import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function GET() {
  try {
    console.log("[v0] Testing email configuration...")

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        {
          error: "Email credentials not configured",
          details: "EMAIL_USER and EMAIL_PASS environment variables are required",
        },
        { status: 500 },
      )
    }

    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.verify()
    console.log("[v0] Email transporter verified successfully")

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "cash2dayaz@gmail.com",
      subject: "Skin Cabaret - Email Test",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Email Configuration Test</h2>
          <p>This is a test email to confirm the email system is working properly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Status:</strong> ✅ Email system is operational</p>
        </div>
      `,
    })

    console.log("[v0] Test email sent successfully:", result.messageId)

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
      messageId: result.messageId,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Email test failed:", error)
    return NextResponse.json(
      {
        error: "Email test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
