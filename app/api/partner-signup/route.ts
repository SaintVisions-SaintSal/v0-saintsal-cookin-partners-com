import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      audience,
      experience,
      applicationType,
      tracking,
      payoutMethod,
      paypalEmail,
      venmoHandle,
      cashappHandle,
      bankAccountName,
      bankRoutingNumber,
      bankAccountNumber,
      taxId,
      // VP-specific fields
      instagram,
      facebook,
      linkedin,
      twitter,
      tiktok,
      youtube,
      followerCount,
      portfolioUrl,
      socialExperience,
      marketingStrategy,
    } = body

    console.log(`[v0] ${applicationType === "vp" ? "VP" : "Partner"} signup started for:`, email)
    if (tracking) {
      console.log("[v0] Tracking parameters captured:", tracking)
    }

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
          application_type,
          payout_method,
          payout_details,
          tax_id,
          instagram,
          facebook,
          linkedin,
          twitter,
          tiktok,
          youtube,
          follower_count,
          portfolio_url,
          social_experience,
          marketing_strategy,
          tracking_source,
          tracking_campaign,
          tracking_medium
        ) VALUES (
          ${firstName},
          ${lastName},
          ${email},
          ${phone || null},
          ${company || null},
          ${audience},
          ${experience || null},
          'cookinpartners.com',
          ${applicationType || "partner"},
          ${payoutMethod || null},
          ${JSON.stringify({
            paypal: paypalEmail,
            venmo: venmoHandle,
            cashapp: cashappHandle,
            bankName: bankAccountName,
            bankRouting: bankRoutingNumber,
            bankAccount: bankAccountNumber,
          })},
          ${taxId || null},
          ${instagram || null},
          ${facebook || null},
          ${linkedin || null},
          ${twitter || null},
          ${tiktok || null},
          ${youtube || null},
          ${followerCount || null},
          ${portfolioUrl || null},
          ${socialExperience || null},
          ${marketingStrategy || null},
          ${tracking?.source || tracking?.utm_source || null},
          ${tracking?.campaign || tracking?.utm_campaign || null},
          ${tracking?.medium || tracking?.utm_medium || null}
        )
        RETURNING id
      `
      applicationId = result[0]?.id
      console.log("[v0] Database entry created:", applicationId)
    } catch (dbError) {
      console.error("[v0] Database error:", dbError)
    }

    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID
    const GHL_API_KEY = process.env.GHL_PRIVATE_TOKEN
    const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL

    if (applicationType === "vp") {
      console.log("[v0] Processing VP application...")

      // Create contact in GHL with VP tags
      let contactId = null
      try {
        const contactResponse = await fetch(`https://services.leadconnectorhq.com/contacts/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GHL_API_KEY}`,
            "Content-Type": "application/json",
            Version: "2021-07-28",
          },
          body: JSON.stringify({
            locationId: GHL_LOCATION_ID,
            firstName,
            lastName,
            email,
            phone,
            companyName: company,
            tags: ["VP Application", "Premium Partner", "Pending Review", "25-35% Commission"],
            customFields: [
              { key: "application_type", value: "vp" },
              { key: "follower_count", value: followerCount },
              { key: "instagram", value: instagram },
              { key: "facebook", value: facebook },
              { key: "linkedin", value: linkedin },
              { key: "twitter", value: twitter },
              { key: "tiktok", value: tiktok },
              { key: "youtube", value: youtube },
              { key: "portfolio", value: portfolioUrl },
              { key: "application_id", value: applicationId?.toString() },
              { key: "tracking_source", value: tracking?.source || tracking?.utm_source },
              { key: "tracking_campaign", value: tracking?.campaign || tracking?.utm_campaign },
              { key: "tracking_medium", value: tracking?.medium || tracking?.utm_medium },
              { key: "payout_method", value: payoutMethod },
              { key: "payout_email", value: paypalEmail || venmoHandle || cashappHandle },
              { key: "tax_id", value: taxId },
            ],
            source: tracking?.source || "CookinPartners VP Application",
          }),
        })

        if (contactResponse.ok) {
          const contactData = await contactResponse.json()
          contactId = contactData.contact?.id
          console.log("[v0] VP contact created:", contactId)
        }
      } catch (error) {
        console.error("[v0] VP contact creation error:", error)
      }

      // Trigger webhook to send email to support@cookin.io
      try {
        if (GHL_WEBHOOK_URL) {
          await fetch(GHL_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "vp_application",
              contact: { firstName, lastName, email, phone, company },
              socialMedia: { instagram, facebook, linkedin, twitter, tiktok, youtube },
              details: { followerCount, portfolioUrl, socialExperience, marketingStrategy },
              tracking, // Include tracking data
              applicationId,
              contactId,
              timestamp: new Date().toISOString(),
              payout: {
                method: payoutMethod,
                paypalEmail,
                venmoHandle,
                cashappHandle,
                bankAccountName,
                bankRoutingNumber,
                bankAccountNumber,
                taxId,
              },
            }),
          })
          console.log("[v0] VP application webhook triggered")
        }
      } catch (error) {
        console.error("[v0] Webhook error:", error)
      }

      return NextResponse.json({
        success: true,
        message:
          "VP application submitted successfully! Our team will review your application and contact you within 24-48 hours at support@cookin.io",
        applicationType: "vp",
        applicationId,
      })
    }

    console.log("[v0] Creating partner with auto-approval...")

    // Step 1: Create contact in GHL
    let contactId = null
    try {
      const contactResponse = await fetch(`https://services.leadconnectorhq.com/contacts/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          firstName,
          lastName,
          email,
          phone,
          companyName: company,
          tags: ["Partner", "15% Commission", "Auto-Approved", "Send Welcome Email", "New Partner Signup"],
          customFields: [
            { key: "audience_type", value: audience },
            { key: "affiliate_experience", value: experience },
            { key: "application_id", value: applicationId?.toString() },
            { key: "commission_rate", value: "15%" },
            { key: "application_type", value: "partner" },
            { key: "tracking_source", value: tracking?.source || tracking?.utm_source },
            { key: "tracking_campaign", value: tracking?.campaign || tracking?.utm_campaign },
            { key: "tracking_medium", value: tracking?.medium || tracking?.utm_medium },
            { key: "payout_method", value: payoutMethod },
            { key: "payout_email", value: paypalEmail || venmoHandle || cashappHandle },
            { key: "tax_id", value: taxId },
          ],
          source: tracking?.source || "CookinPartners Website",
        }),
      })

      if (contactResponse.ok) {
        const contactData = await contactResponse.json()
        contactId = contactData.contact?.id
        console.log("[v0] Partner contact created in GHL:", contactId)
      } else {
        const errorText = await contactResponse.text()
        console.error("[v0] Contact creation failed:", errorText)
      }
    } catch (error) {
      console.error("[v0] Contact creation error:", error)
    }

    // Step 2: Create affiliate and get unique affiliate ID
    let affiliateId = null
    let affiliateLink = ""

    try {
      console.log("[v0] Creating affiliate in GHL Affiliate Manager...")

      const affiliateResponse = await fetch(
        `https://services.leadconnectorhq.com/marketing/affiliate-manager/affiliates`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GHL_API_KEY}`,
            "Content-Type": "application/json",
            Version: "2021-07-28",
          },
          body: JSON.stringify({
            locationId: GHL_LOCATION_ID,
            contactId: contactId,
            email: email,
            name: `${firstName} ${lastName}`,
            companyName: company || "",
          }),
        },
      )

      if (affiliateResponse.ok) {
        const affiliateData = await affiliateResponse.json()
        affiliateId = affiliateData.id || affiliateData.affiliateId

        affiliateLink = `https://cookinpartners.com/cookinpartnerscom?am_id=${affiliateId}`

        console.log("[v0] Affiliate created successfully!")
        console.log("[v0] Affiliate ID:", affiliateId)
        console.log("[v0] Affiliate Link:", affiliateLink)
      } else {
        const errorText = await affiliateResponse.text()
        console.error("[v0] Affiliate creation API error:", errorText)

        if (contactId) {
          affiliateId = contactId
          affiliateLink = `https://cookinpartners.com/cookinpartnerscom?am_id=${contactId}`
          console.log("[v0] Using fallback affiliate link with contact ID")
        }
      }
    } catch (affiliateError) {
      console.error("[v0] Affiliate creation error:", affiliateError)

      if (contactId) {
        affiliateId = contactId
        affiliateLink = `https://cookinpartners.com/cookinpartnerscom?am_id=${contactId}`
      }
    }

    // Step 3: Trigger webhook for welcome email automation
    try {
      if (GHL_WEBHOOK_URL) {
        await fetch(GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "partner_signup_confirmation",
            contact: { firstName, lastName, email, phone, company },
            affiliate: { affiliateId, affiliateLink },
            tracking, // Include tracking data
            commissionRate: "15%",
            applicationId,
            contactId,
            timestamp: new Date().toISOString(),
            payout: {
              method: payoutMethod,
              paypalEmail,
              venmoHandle,
              cashappHandle,
              bankAccountName,
              bankRoutingNumber,
              bankAccountNumber,
              taxId,
            },
          }),
        })
        console.log("[v0] Partner signup webhook triggered for welcome email")
      }
    } catch (webhookError) {
      console.error("[v0] Webhook error:", webhookError)
    }

    console.log("[v0] Partner signup completed successfully!")

    return NextResponse.json({
      success: true,
      message: "Welcome to CookinPartners! Your affiliate link is ready.",
      affiliateLink,
      affiliateId,
      contactId,
      applicationId,
      commissionRate: "15%",
      clientPortalUrl: "https://cookinpartners.com/portal",
      payout: {
        method: payoutMethod,
        paypalEmail,
        venmoHandle,
        cashappHandle,
        bankAccountName,
        bankRoutingNumber,
        bankAccountNumber,
        taxId,
      },
    })
  } catch (error) {
    console.error("[v0] Partner signup error:", error)
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 })
  }
}
