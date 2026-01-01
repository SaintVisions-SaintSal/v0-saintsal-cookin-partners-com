import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"

// Rewardful API Configuration
const REWARDFUL_API_SECRET = process.env.REWARDFUL_API_SECRET || "bb8181816a718697e769f957830dbdd6"
const REWARDFUL_PARTNER_CAMPAIGN_ID = process.env.REWARDFUL_PARTNER_CAMPAIGN_ID || "67ede31f-90b2-4d6b-91f2-9a0709b9df64"
const REWARDFUL_VP_CAMPAIGN_ID = process.env.REWARDFUL_VP_CAMPAIGN_ID || "9228cd50-3af0-49db-a281-3a8084fdf7c5"

// Helper function to create Rewardful affiliate
async function createRewardfulAffiliate(data: {
  email: string
  firstName: string
  lastName: string
  campaignId: string
}): Promise<{ success: boolean; affiliate?: any; error?: string }> {
  try {
    const response = await fetch("https://api.getrewardful.com/v1/affiliates", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${Buffer.from(REWARDFUL_API_SECRET + ":").toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        campaign_id: data.campaignId,
      }),
    })

    const result = await response.json()

    if (response.ok) {
      console.log("[Rewardful] Affiliate created:", result)
      return { success: true, affiliate: result }
    } else {
      console.error("[Rewardful] API Error:", result)
      return { success: false, error: result.error || "Failed to create affiliate" }
    }
  } catch (error) {
    console.error("[Rewardful] Network error:", error)
    return { success: false, error: "Network error connecting to Rewardful" }
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
      audience,
      experience,
      applicationType,
      // Payout fields
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
      // Tracking
      tracking,
    } = body

    console.log(`[CookinPartners] ${applicationType === "vp" ? "VP" : "Partner"} signup started for:`, email)

    // Combine payout details into one field for storage
    let payoutDetails = ""
    switch (payoutMethod) {
      case "paypal": payoutDetails = paypalEmail; break
      case "venmo": payoutDetails = venmoHandle; break
      case "cashapp": payoutDetails = cashappHandle; break
      case "bank": payoutDetails = JSON.stringify({ name: bankAccountName, routing: bankRoutingNumber, account: bankAccountNumber }); break
      default: payoutDetails = ""
    }

    // 1. Save to Neon Database
    let applicationId = null
    try {
      const result = await sql`
        INSERT INTO partner_applications (
          first_name, last_name, email, phone, company, audience, experience, 
          application_type, payout_method, payout_details, tax_id,
          instagram, facebook, linkedin, twitter, tiktok, youtube,
          follower_count, portfolio_url, social_experience, marketing_strategy,
          source, tracking_data
        ) VALUES (
          ${firstName}, ${lastName}, ${email}, ${phone || null}, ${company || null},
          ${audience || null}, ${experience || null}, ${applicationType || "partner"},
          ${payoutMethod || null}, ${payoutDetails || null}, ${taxId || null},
          ${instagram || null}, ${facebook || null}, ${linkedin || null},
          ${twitter || null}, ${tiktok || null}, ${youtube || null},
          ${followerCount || null}, ${portfolioUrl || null},
          ${socialExperience || null}, ${marketingStrategy || null},
          'cookinpartners.com', ${tracking ? JSON.stringify(tracking) : null}
        )
        RETURNING id
      `
      applicationId = result[0]?.id
      console.log("[DB] Application saved:", applicationId)
    } catch (dbError) {
      console.error("[DB] Database error:", dbError)
      // Continue even if DB fails - we still want to create the Rewardful affiliate
    }

    // 2. Create GHL Contact (for CRM, NOT affiliate tracking)
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID
    const GHL_API_KEY = process.env.GHL_PRIVATE_TOKEN
    let ghlContactId = null

    try {
      const tags = applicationType === "vp" 
        ? ["VP-Application", "Pending-Review", "25% Commission", "Rewardful"]
        : ["Partner", "15% Commission", "Auto-Approved", "Rewardful"]

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
          tags,
          customFields: [
            { key: "application_type", value: applicationType || "partner" },
            { key: "application_id", value: applicationId?.toString() },
            { key: "payout_method", value: payoutMethod },
            { key: "affiliate_system", value: "rewardful" },
          ],
          source: "CookinPartners Website",
        }),
      })

      if (contactResponse.ok) {
        const contactData = await contactResponse.json()
        ghlContactId = contactData.contact?.id
        console.log("[GHL] Contact created:", ghlContactId)
      }
    } catch (error) {
      console.error("[GHL] Contact creation error:", error)
    }

    // 3. Handle VP Applications (manual approval required)
    if (applicationType === "vp") {
      console.log("[CookinPartners] VP application - requires manual approval")

      // Send notification webhook for VP review
      const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL
      if (GHL_WEBHOOK_URL) {
        try {
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
                audience,
                experience,
                socials: { instagram, facebook, linkedin, twitter, tiktok, youtube },
                followerCount,
                portfolioUrl,
                socialExperience,
                marketingStrategy,
              },
              payout: { method: payoutMethod, details: payoutDetails, taxId },
              applicationId,
              ghlContactId,
              instructions: "To approve: Create affiliate in Rewardful VP Campaign (25%) manually",
              rewardfulCampaign: REWARDFUL_VP_CAMPAIGN_ID,
              timestamp: new Date().toISOString(),
            }),
          })
          console.log("[Webhook] VP notification sent")
        } catch (error) {
          console.error("[Webhook] Error:", error)
        }
      }

      return NextResponse.json({
        success: true,
        message: "VP application submitted! Our team will review and contact you within 24-48 hours.",
        applicationType: "vp",
        applicationId,
        contactId: ghlContactId,
      })
    }

    // 4. Partner Applications - Auto-approve via Rewardful API
    console.log("[CookinPartners] Creating Partner in Rewardful (15% campaign)...")

    const rewardfulResult = await createRewardfulAffiliate({
      email,
      firstName,
      lastName,
      campaignId: REWARDFUL_PARTNER_CAMPAIGN_ID,
    })

    if (!rewardfulResult.success) {
      console.error("[Rewardful] Failed to create affiliate:", rewardfulResult.error)
      
      // Check if affiliate already exists
      if (rewardfulResult.error?.includes("already") || rewardfulResult.error?.includes("exists")) {
        return NextResponse.json({
          success: false,
          message: "An affiliate account with this email already exists. Please log in to your existing account or contact support.",
          error: "duplicate_email",
        }, { status: 400 })
      }

      return NextResponse.json({
        success: false,
        message: "Failed to create affiliate account. Please try again or contact support.",
        error: rewardfulResult.error,
      }, { status: 500 })
    }

    const affiliate = rewardfulResult.affiliate
    const affiliateCode = affiliate.links?.[0]?.token || affiliate.token || affiliate.id
    const affiliateLink = `https://saintsal.ai/?via=${affiliateCode}`
    const portalLink = affiliate.auth_token 
      ? `https://saint-vision-technologies-llc.getrewardful.com/login?token=${affiliate.auth_token}`
      : "https://saint-vision-technologies-llc.getrewardful.com/login"

    console.log("[Rewardful] Affiliate created successfully!")
    console.log("[Rewardful] Code:", affiliateCode)
    console.log("[Rewardful] Link:", affiliateLink)

    // 5. Update database with Rewardful info
    if (applicationId) {
      try {
        await sql`
          UPDATE partner_applications 
          SET rewardful_affiliate_id = ${affiliate.id},
              affiliate_code = ${affiliateCode},
              affiliate_link = ${affiliateLink}
          WHERE id = ${applicationId}
        `
        console.log("[DB] Updated with Rewardful info")
      } catch (error) {
        console.error("[DB] Update error:", error)
      }
    }

    // 6. Send welcome webhook
    const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL
    if (GHL_WEBHOOK_URL) {
      try {
        await fetch(GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "partner_signup_confirmation",
            contact: { firstName, lastName, email, phone, company },
            affiliate: { 
              id: affiliate.id,
              code: affiliateCode,
              link: affiliateLink,
              portalLink,
            },
            commissionRate: "15%",
            applicationId,
            ghlContactId,
            timestamp: new Date().toISOString(),
          }),
        })
        console.log("[Webhook] Welcome notification sent")
      } catch (error) {
        console.error("[Webhook] Error:", error)
      }
    }

    // 7. Return success
    return NextResponse.json({
      success: true,
      message: "Welcome to CookinPartners! Your affiliate link is ready.",
      affiliateLink,
      affiliateCode,
      affiliateId: affiliate.id,
      portalLink,
      contactId: ghlContactId,
      applicationId,
      commissionRate: "15%",
    })

  } catch (error) {
    console.error("[CookinPartners] Signup error:", error)
    return NextResponse.json({ 
      success: false, 
      error: "Failed to submit application. Please try again." 
    }, { status: 500 })
  }
}
