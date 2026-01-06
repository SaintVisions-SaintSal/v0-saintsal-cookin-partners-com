import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

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

      // Send email to support@cookin.io via Resend
      try {
        await resend.emails.send({
          from: "CookinPartners <noreply@cookinpartners.com>",
          to: ["support@cookin.io"],
          subject: `New VP Partner Application - ${firstName} ${lastName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px;">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #d4af37; font-size: 28px; margin: 0;">New VP Partner Application</h1>
                <p style="color: #888888; margin-top: 8px;">25% Commission Tier - Manual Review Required</p>
              </div>
              
              <div style="background: #141414; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #d4af37; font-size: 18px; margin: 0 0 16px;">Applicant Information</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #888;">Name:</td><td style="padding: 8px 0; color: #fff;">${firstName} ${lastName}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Email:</td><td style="padding: 8px 0; color: #fff;"><a href="mailto:${email}" style="color: #d4af37;">${email}</a></td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Phone:</td><td style="padding: 8px 0; color: #fff;">${phone || "N/A"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Company:</td><td style="padding: 8px 0; color: #fff;">${company || "N/A"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Role:</td><td style="padding: 8px 0; color: #fff;">${role || "N/A"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">LinkedIn:</td><td style="padding: 8px 0; color: #fff;"><a href="${linkedIn}" style="color: #d4af37;">${linkedIn || "N/A"}</a></td></tr>
                </table>
              </div>

              <div style="background: #141414; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #d4af37; font-size: 18px; margin: 0 0 16px;">Professional Background</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #888;">Years Experience:</td><td style="padding: 8px 0; color: #fff;">${yearsExperience || "N/A"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Industries:</td><td style="padding: 8px 0; color: #fff;">${Array.isArray(industryExpertise) ? industryExpertise.join(", ") : industryExpertise || "N/A"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Portfolio Size:</td><td style="padding: 8px 0; color: #fff;">${currentPortfolioSize || "N/A"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Investment Capacity:</td><td style="padding: 8px 0; color: #fff;">${investmentCapacity || "N/A"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Team Size:</td><td style="padding: 8px 0; color: #fff;">${teamSize || "N/A"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Audience Size:</td><td style="padding: 8px 0; color: #fff;">${audienceSize || "N/A"}</td></tr>
                </table>
              </div>

              <div style="background: #141414; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
                <h2 style="color: #d4af37; font-size: 18px; margin: 0 0 16px;">Partnership Goals</h2>
                <p style="color: #fff; line-height: 1.6;">${partnershipGoals || "Not provided"}</p>
                
                <h3 style="color: #d4af37; font-size: 16px; margin: 24px 0 8px;">Referral Strategy</h3>
                <p style="color: #fff; line-height: 1.6;">${referralStrategy || "Not provided"}</p>
                
                ${
                  additionalNotes
                    ? `
                <h3 style="color: #d4af37; font-size: 16px; margin: 24px 0 8px;">Additional Notes</h3>
                <p style="color: #fff; line-height: 1.6;">${additionalNotes}</p>
                `
                    : ""
                }
              </div>

              <div style="background: #141414; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; padding: 24px;">
                <h2 style="color: #d4af37; font-size: 18px; margin: 0 0 16px;">Payout Information</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #888;">Method:</td><td style="padding: 8px 0; color: #fff;">${payoutMethod || "Not specified"}</td></tr>
                  <tr><td style="padding: 8px 0; color: #888;">Tax ID:</td><td style="padding: 8px 0; color: #fff;">${taxId ? "Provided" : "Not provided"}</td></tr>
                </table>
              </div>

              <div style="text-align: center; margin-top: 32px; padding: 24px; border-top: 1px solid rgba(212, 175, 55, 0.2);">
                <p style="color: #888; font-size: 14px;">Application ID: ${applicationId || "N/A"}</p>
                <p style="color: #888; font-size: 14px;">Submitted: ${new Date().toLocaleString()}</p>
                <a href="https://app.gohighlevel.com" style="display: inline-block; margin-top: 16px; padding: 12px 24px; background: #d4af37; color: #0a0a0a; text-decoration: none; border-radius: 8px; font-weight: bold;">Review in GHL</a>
              </div>
            </div>
          `,
        })
        console.log("[v0] VP application email sent to support@cookin.io")
      } catch (emailError) {
        console.error("[v0] Email send error:", emailError)
      }

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
              subject: `New VP Partner Application - ${firstName} ${lastName}`,
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

    // Send notification email for new partner signup
    try {
      await resend.emails.send({
        from: "CookinPartners <noreply@cookinpartners.com>",
        to: ["support@cookin.io"],
        subject: `New Partner Signup - ${firstName} ${lastName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #22c55e; font-size: 28px; margin: 0;">New Partner Signup</h1>
              <p style="color: #888888; margin-top: 8px;">15% Commission - Auto-Approved</p>
            </div>
            
            <div style="background: #141414; border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 12px; padding: 24px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #888;">Name:</td><td style="padding: 8px 0; color: #fff;">${firstName} ${lastName}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Email:</td><td style="padding: 8px 0; color: #fff;"><a href="mailto:${email}" style="color: #d4af37;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Phone:</td><td style="padding: 8px 0; color: #fff;">${phone || "N/A"}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Company:</td><td style="padding: 8px 0; color: #fff;">${company || "N/A"}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Industry:</td><td style="padding: 8px 0; color: #fff;">${audience || "N/A"}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Experience:</td><td style="padding: 8px 0; color: #fff;">${experience || "N/A"}</td></tr>
              </table>
            </div>

            <div style="text-align: center; margin-top: 32px;">
              <p style="color: #888; font-size: 14px;">Application ID: ${applicationId || "N/A"}</p>
              <p style="color: #888; font-size: 14px;">Submitted: ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `,
      })
      console.log("[v0] Partner signup email sent to support@cookin.io")
    } catch (emailError) {
      console.error("[v0] Email send error:", emailError)
    }

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
