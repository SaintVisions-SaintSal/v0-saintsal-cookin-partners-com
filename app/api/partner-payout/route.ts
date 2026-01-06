import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

// VP Partners with 25% commission
const VP_PARTNERS = [
  "justin@saintbiz.io",
  "darinrahm@gmail.com",
  "trusttheofficial@gmail.com",
  "zeenbyreem@gmail.com",
  "richard@cookinbiz.com",
  "snpkdy@gmail.com",
  "simon@simonpolito.com",
  "david-esq@hacpglobal.ai",
  "ritikdps@gmail.com",
  "eaw333@gmail.com",
  "graciewarner@gmail.com",
  "conner@rydecustom.com",
  "ntheodory@gmail.com",
  "nicole@saintbiz.io",
  "jean@saintbiz.io",
  "ayden@rydecustom.com",
  "lalie@hacpglobal.ai",
  "jr@hacpglobal.ai",
  "darren@cookin.io",
  "ryan@cookin.io",
]

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    // Check VP status
    const isVP = VP_PARTNERS.includes(data.email?.toLowerCase().trim())
    const commissionRate = isVP ? 25 : 15

    // Store payout info in database
    await sql`
      INSERT INTO partner_payouts (
        first_name, last_name, email, phone,
        rewardful_id, account_type, business_name, ein,
        tax_id, country, address, city, state, zip,
        payout_method, paypal_email, venmo_handle, cashapp_handle,
        bank_name, routing_number, account_number,
        commission_rate, is_vp, created_at
      ) VALUES (
        ${data.firstName}, ${data.lastName}, ${data.email}, ${data.phone || null},
        ${data.rewardfulId || null}, ${data.accountType}, ${data.businessName || null}, ${data.ein || null},
        ${data.taxId}, ${data.country}, ${data.address}, ${data.city}, ${data.state}, ${data.zip},
        ${data.payoutMethod}, ${data.paypalEmail || null}, ${data.venmoHandle || null}, ${data.cashappHandle || null},
        ${data.bankName || null}, ${data.routingNumber || null}, ${data.accountNumber || null},
        ${commissionRate}, ${isVP}, NOW()
      )
      ON CONFLICT (email) DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        phone = EXCLUDED.phone,
        rewardful_id = EXCLUDED.rewardful_id,
        account_type = EXCLUDED.account_type,
        business_name = EXCLUDED.business_name,
        ein = EXCLUDED.ein,
        tax_id = EXCLUDED.tax_id,
        country = EXCLUDED.country,
        address = EXCLUDED.address,
        city = EXCLUDED.city,
        state = EXCLUDED.state,
        zip = EXCLUDED.zip,
        payout_method = EXCLUDED.payout_method,
        paypal_email = EXCLUDED.paypal_email,
        venmo_handle = EXCLUDED.venmo_handle,
        cashapp_handle = EXCLUDED.cashapp_handle,
        bank_name = EXCLUDED.bank_name,
        routing_number = EXCLUDED.routing_number,
        account_number = EXCLUDED.account_number,
        commission_rate = EXCLUDED.commission_rate,
        is_vp = EXCLUDED.is_vp,
        updated_at = NOW()
    `

    // Update GHL contact with payout info
    if (process.env.GHL_PRIVATE_TOKEN && process.env.GHL_LOCATION_ID) {
      try {
        // Search for existing contact
        const searchResponse = await fetch(
          `https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=${process.env.GHL_LOCATION_ID}&email=${encodeURIComponent(data.email)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.GHL_PRIVATE_TOKEN}`,
              Version: "2021-07-28",
            },
          },
        )

        if (searchResponse.ok) {
          const searchData = await searchResponse.json()
          const contactId = searchData.contact?.id

          if (contactId) {
            // Update contact with payout info
            await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${process.env.GHL_PRIVATE_TOKEN}`,
                Version: "2021-07-28",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                customFields: [
                  { key: "payout_method", value: data.payoutMethod },
                  { key: "commission_rate", value: `${commissionRate}%` },
                  { key: "payout_setup_complete", value: "true" },
                  { key: "is_vp_partner", value: isVP ? "true" : "false" },
                ],
                tags: isVP
                  ? ["VP Partner", "25% Commission", "Payout Setup Complete"]
                  : ["Partner", "15% Commission", "Payout Setup Complete"],
              }),
            })
          }
        }
      } catch (ghlError) {
        console.error("GHL update error:", ghlError)
      }
    }

    return NextResponse.json({
      success: true,
      commissionRate,
      isVP,
      message: "Payout information saved successfully",
    })
  } catch (error) {
    console.error("Payout setup error:", error)
    return NextResponse.json({ error: "Failed to save payout information" }, { status: 500 })
  }
}
