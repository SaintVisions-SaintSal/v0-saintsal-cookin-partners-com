import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// GHL API configuration
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID
const GHL_PRIVATE_TOKEN = process.env.GHL_PRIVATE_TOKEN
const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL

function generateAffiliateId(firstName: string, lastName: string): string {
  const base = `${firstName}${lastName}`.replace(/[^a-zA-Z0-9]/g, "")
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${base}${random}`.substring(0, 16)
}

async function createGHLContact(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
  tags: string[]
  customFields?: Record<string, string>
}) {
  if (!GHL_LOCATION_ID || !GHL_PRIVATE_TOKEN) {
    console.log("[v0] GHL credentials not configured, skipping contact creation")
    return null
  }

  try {
    const response = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GHL_PRIVATE_TOKEN}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify({
        locationId: GHL_LOCATION_ID,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        companyName: data.company || "",
        tags: data.tags,
        customFields: data.customFields
          ? Object.entries(data.customFields).map(([key, value]) => ({
              key,
              field_value: value,
            }))
          : [],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))

      if (errorData.statusCode === 400 && errorData.meta?.contactId) {
        console.log("[v0] Contact already exists, updating:", errorData.meta.contactId)
        return await updateGHLContact(errorData.meta.contactId, data)
      }

      console.error("[v0] GHL contact creation failed:", errorData)
      return null
    }

    const result = await response.json()
    console.log("[v0] GHL contact created:", result.contact?.id)
    return result.contact
  } catch (error) {
    console.error("[v0] GHL contact creation error:", error)
    return null
  }
}

async function updateGHLContact(
  contactId: string,
  data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    company?: string
    tags: string[]
    customFields?: Record<string, string>
  },
) {
  try {
    const response = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${GHL_PRIVATE_TOKEN}`,
        "Content-Type": "application/json",
        Version: "2021-07-28",
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        companyName: data.company || "",
        tags: data.tags,
        customFields: data.customFields
          ? Object.entries(data.customFields).map(([key, value]) => ({
              key,
              field_value: value,
            }))
          : [],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] GHL contact update failed:", errorText)
      return null
    }

    const result = await response.json()
    console.log("[v0] GHL contact updated:", contactId)
    return result.contact
  } catch (error) {
    console.error("[v0] GHL contact update error:", error)
    return null
  }
}

async function sendVPNotificationWebhook(data: Record<string, unknown>) {
  if (!GHL_WEBHOOK_URL) {
    console.log("[v0] GHL_WEBHOOK_URL not configured, skipping VP notification")
    return
  }

  try {
    const response = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "vp_application_notification",
        sendTo: "support@cookin.io",
        ...data,
      }),
    })

    if (!response.ok) {
      console.error("[v0] VP notification webhook failed:", await response.text())
    } else {
      console.log("[v0] VP notification sent successfully")
    }
  } catch (error) {
    console.error("[v0] VP notification error:", error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      applicationType,
      // Partner fields
      industry,
      affiliateExperience,
      payoutMethod,
      taxId,
      // VP-only fields
      linkedinUrl,
      websiteUrl,
      monthlyReach,
      whyVP,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check for existing application
    const existing = await sql`
      SELECT id FROM partner_applications WHERE email = ${email}
    `
    if (existing.length > 0) {
      return NextResponse.json({ error: "An application with this email already exists" }, { status: 400 })
    }

    const isVP = applicationType === "vp"
    const affiliateId = generateAffiliateId(firstName, lastName)
    const affiliateLink = `https://saintsal.tech?am_id=${affiliateId}`
    const status = isVP ? "pending_review" : "approved"

    // Save to database
    await sql`
      INSERT INTO partner_applications (
        first_name, last_name, email, phone, company,
        application_type, audience, experience, instagram, linkedin,
        marketing_strategy, affiliate_id, affiliate_link, status,
        created_at, updated_at
      ) VALUES (
        ${firstName}, ${lastName}, ${email}, ${phone}, ${company || null},
        ${applicationType}, ${industry || null}, ${affiliateExperience || null}, 
        ${null}, ${linkedinUrl || null}, ${whyVP || null},
        ${affiliateId}, ${affiliateLink}, ${status},
        NOW(), NOW()
      )
    `

    // Create GHL contact
    const tags = isVP
      ? ["VP Application", "CookinPartners", "Pending Review"]
      : ["Partner", "CookinPartners", "Send Welcome Email"]

    await createGHLContact({
      firstName,
      lastName,
      email,
      phone,
      company,
      tags,
      customFields: {
        affiliate_id: affiliateId,
        affiliate_link: affiliateLink,
        application_type: applicationType,
        industry: industry || "",
        affiliate_experience: affiliateExperience || "",
        payout_method: payoutMethod || "",
        ...(isVP
          ? {
              linkedin_url: linkedinUrl || "",
              website_url: websiteUrl || "",
              monthly_reach: monthlyReach || "",
              why_vp: whyVP || "",
            }
          : {}),
      },
    })

    // For VP applications, send notification webhook
    if (isVP) {
      await sendVPNotificationWebhook({
        firstName,
        lastName,
        email,
        phone,
        company,
        linkedinUrl,
        websiteUrl,
        monthlyReach,
        whyVP,
        affiliateExperience,
        industry,
        affiliateId,
        submittedAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({
      success: true,
      affiliateId,
      affiliateLink: isVP ? null : affiliateLink, // VP doesn't get link until approved
      status,
    })
  } catch (error) {
    console.error("[v0] Partner signup error:", error)
    return NextResponse.json({ error: "Failed to process application" }, { status: 500 })
  }
}
