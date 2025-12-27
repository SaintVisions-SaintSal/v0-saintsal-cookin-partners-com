import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { firstName, lastName, email, phone, company, website, audience, experience, message, referrer } = body

    let applicationId = null
    try {
      const result = await sql`
        INSERT INTO partner_applications (
          first_name, 
          last_name, 
          email, 
          phone, 
          company, 
          audience, 
          experience, 
          source, 
          referrer_partner_id
        ) VALUES (
          ${firstName},
          ${lastName},
          ${email},
          ${phone || null},
          ${company || null},
          ${audience},
          ${experience || null},
          'cookinpartners.com',
          ${referrer || null}
        )
        RETURNING id
      `
      applicationId = result[0]?.id
    } catch (dbError) {
      console.error("Database error:", dbError)
      // Continue even if database fails - we'll still try GHL
    }

    // GHL API Configuration
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || "oRA8vL3OSiCPjpwmEC0V"
    const GHL_API_KEY = process.env.GHL_PRIVATE_TOKEN || "pit-fd2d456a-1439-49a5-a9c7-d0524e4797ad"

    // Step 2: Create/Update Contact in GHL
    const contactPayload = {
      firstName,
      lastName,
      email,
      phone,
      companyName: company,
      website,
      tags: ["Partner Application", "CookinPartners"],
      customFields: [
        { key: "audience_type", value: audience },
        { key: "affiliate_experience", value: experience },
        { key: "application_message", value: message },
        { key: "referred_by", value: referrer || "direct" },
        { key: "neon_app_id", value: applicationId?.toString() || "" },
      ],
      source: "CookinPartners Website",
    }

    // Create contact
    let contactId = null
    try {
      const contactResponse = await fetch(`https://services.leadconnectorhq.com/contacts/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
          "Location-Id": GHL_LOCATION_ID,
        },
        body: JSON.stringify(contactPayload),
      })

      if (contactResponse.ok) {
        const contactData = await contactResponse.json()
        contactId = contactData.contact?.id
      }
    } catch (ghlError) {
      console.error("GHL contact error:", ghlError)
    }

    // Step 3: Try to create affiliate in GHL
    try {
      const affiliatePayload = {
        email,
        firstName,
        lastName,
        phone,
        companyName: company,
        campaignId: "SaintSal™ CookinPartners.com",
        commissionType: "percentage",
        commissionValue: 15,
      }

      const affiliateResponse = await fetch(`https://services.leadconnectorhq.com/affiliates/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
          "Location-Id": GHL_LOCATION_ID,
        },
        body: JSON.stringify(affiliatePayload),
      })

      if (affiliateResponse.ok) {
        const affiliateData = await affiliateResponse.json()
        return NextResponse.json({
          success: true,
          message: "Application submitted successfully",
          applicationId,
          contactId,
          affiliateId: affiliateData.affiliate?.id,
        })
      }
    } catch (affiliateError) {
      console.log("Affiliate API not available, using webhook fallback")
    }

    // Step 4: Fallback webhook
    const webhookUrl =
      process.env.GHL_WEBHOOK_URL ||
      "https://services.leadconnectorhq.com/hooks/oRA8vL3OSiCPjpwmEC0V/webhook-trigger/partner-application"

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        applicationId,
        contactId,
        timestamp: new Date().toISOString(),
        source: "cookinpartners.com",
      }),
    }).catch(() => {})

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId,
      contactId,
    })
  } catch (error) {
    console.error("Partner signup error:", error)
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 })
  }
}
