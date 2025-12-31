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
      // VP-specific fields
      role,
      linkedIn,
      yearsExperience,
      industryExpertise,
      currentPortfolioSize,
      investmentCapacity,
      partnershipGoals,
      teamSize,
      audienceSize,
      referralStrategy,
      referredBy,
      additionalNotes,
      payoutMethod,
      payoutDetails,
      taxId,
    } = body

    console.log(`[v0] ${applicationType === "vp" ? "VP" : "Partner"} signup started for:`, email)

    let applicationId = null
    try {
      const result = await sql`
        INSERT INTO partner_applications (
          first_name, last_name, email, phone, company, audience, experience, 
          application_type, payout_method, payout_details, tax_id,
          linkedin, years_experience, industry_expertise, portfolio_size,
          investment_capacity, partnership_goals, team_size, audience_size,
          referral_strategy, referred_by, additional_notes, source
        ) VALUES (
          ${firstName}, ${lastName}, ${email}, ${phone || null}, ${company || null},
          ${audience || null}, ${experience || null}, ${applicationType || "partner"},
          ${payoutMethod || null}, ${payoutDetails || null}, ${taxId || null},
          ${linkedIn || null}, ${yearsExperience || null}, 
          ${Array.isArray(industryExpertise) ? industryExpertise.join(", ") : null},
          ${currentPortfolioSize || null}, ${investmentCapacity || null},
          ${partnershipGoals || null}, ${teamSize || null}, ${audienceSize || null},
          ${referralStrategy || null}, ${referredBy || null}, ${additionalNotes || null},
          'cookinpartners.com'
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
      console.log("[v0] Processing VP application for manual review...")

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
            tags: ["VP-Application", "Pending-Review", "25% Commission", "Premium Partner"],
            customFields: [
              { key: "application_type", value: "vp" },
              { key: "role", value: role },
              { key: "linkedin", value: linkedIn },
              { key: "years_experience", value: yearsExperience },
              {
                key: "industry_expertise",
                value: Array.isArray(industryExpertise) ? industryExpertise.join(", ") : "",
              },
              { key: "portfolio_size", value: currentPortfolioSize },
              { key: "investment_capacity", value: investmentCapacity },
              { key: "partnership_goals", value: partnershipGoals },
              { key: "team_size", value: teamSize },
              { key: "audience_size", value: audienceSize },
              { key: "referral_strategy", value: referralStrategy },
              { key: "application_id", value: applicationId?.toString() },
              { key: "payout_method", value: payoutMethod },
              { key: "tax_id", value: taxId },
            ],
          }),
        })

        if (contactResponse.ok) {
          const contactData = await contactResponse.json()
          contactId = contactData.contact?.id
          console.log("[v0] VP contact created in GHL:", contactId)
        }
      } catch (error) {
        console.error("[v0] VP contact creation error:", error)
      }

      try {
        if (GHL_WEBHOOK_URL) {
          await fetch(GHL_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "vp_application_review",
              sendTo: "support@cookin.io",
              subject: `🔥 New VP Partner Application - ${firstName} ${lastName}`,
              applicant: {
                name: `${firstName} ${lastName}`,
                email,
                phone,
                company,
                role,
                linkedin: linkedIn,
                yearsExperience,
                industries: industryExpertise,
                portfolioSize: currentPortfolioSize,
                investmentCapacity,
                goals: partnershipGoals,
                teamSize,
                audienceSize,
                strategy: referralStrategy,
                referredBy,
                notes: additionalNotes,
              },
              payout: { method: payoutMethod, details: payoutDetails, taxId },
              contactId,
              applicationId,
              timestamp: new Date().toISOString(),
            }),
          })
          console.log("[v0] VP application notification sent to support@cookin.io")
        }
      } catch (error) {
        console.error("[v0] Webhook error:", error)
      }

      return NextResponse.json({
        success: true,
        message: "VP application submitted! Our team will review and contact you within 24-48 hours.",
        applicationType: "vp",
        applicationId,
        contactId,
      })
    }

    console.log("[v0] Creating partner with auto-approval...")

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
            { key: "payout_method", value: payoutMethod },
            { key: "payout_details", value: payoutDetails },
            { key: "tax_id", value: taxId },
          ],
          source: "CookinPartners Website",
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

    let affiliateId = null
    let affiliateLink = ""
    let portalLink = ""

    try {
      console.log("[v0] Creating affiliate in GHL Affiliate Manager...")

      const GHL_CAMPAIGN_ID = process.env.GHL_CAMPAIGN_ID

      if (!GHL_CAMPAIGN_ID) {
        console.error("[v0] GHL_CAMPAIGN_ID is missing!")
        throw new Error("Campaign ID not configured")
      }

      const affiliateResponse = await fetch(`https://services.leadconnectorhq.com/affiliates/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_KEY}`,
          "Content-Type": "application/json",
          Version: "2021-07-28",
        },
        body: JSON.stringify({
          campaignId: GHL_CAMPAIGN_ID,
          contactId: contactId,
        }),
      })

      if (affiliateResponse.ok) {
        const affiliateData = await affiliateResponse.json()
        affiliateId = affiliateData.affiliate?.id || affiliateData.id
        portalLink = affiliateData.affiliate?.portalLink || `https://cookinpartners.com/portal`

        affiliateLink = `https://saintsal.ai/?am_id=${affiliateId}`

        console.log("[v0] Affiliate created successfully!")
        console.log("[v0] Affiliate Link:", affiliateLink)
      } else {
        const errorText = await affiliateResponse.text()
        console.error("[v0] Affiliate creation error:", errorText)

        if (contactId) {
          affiliateId = contactId
          affiliateLink = `https://saintsal.ai/?am_id=${contactId}`
          portalLink = `https://cookinpartners.com/portal`
        }
      }
    } catch (error) {
      console.error("[v0] Affiliate creation error:", error)

      if (contactId) {
        affiliateId = contactId
        affiliateLink = `https://saintsal.ai/?am_id=${contactId}`
        portalLink = `https://cookinpartners.com/portal`
      }
    }

    try {
      if (GHL_WEBHOOK_URL) {
        await fetch(GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "partner_signup_confirmation",
            contact: { firstName, lastName, email, phone, company },
            affiliate: { affiliateId, affiliateLink },
            commissionRate: "15%",
            applicationId,
            contactId,
            timestamp: new Date().toISOString(),
          }),
        })
        console.log("[v0] Partner welcome email webhook triggered")
      }
    } catch (error) {
      console.error("[v0] Webhook error:", error)
    }

    console.log("[v0] Partner signup completed successfully!")

    return NextResponse.json({
      success: true,
      message: "Welcome to CookinPartners! Your affiliate link is ready.",
      affiliateLink,
      affiliateId,
      portalLink,
      contactId,
      applicationId,
      commissionRate: "15%",
    })
  } catch (error) {
    console.error("[v0] Partner signup error:", error)
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 })
  }
}
