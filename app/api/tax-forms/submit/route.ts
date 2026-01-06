import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { formType, formData, signature, partnerEmail } = await request.json()

    // Get IP address for audit trail
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] || request.headers.get("x-real-ip") || "Unknown"

    const documentId = `TAX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Store in database
    try {
      await sql`
        INSERT INTO tax_documents (
          document_id, form_type, partner_email, form_data, signature_data,
          signed_at, ip_address, created_at
        ) VALUES (
          ${documentId}, ${formType}, ${partnerEmail}, ${JSON.stringify(formData)},
          ${signature.signature}, ${signature.signedAt}, ${ipAddress}, NOW()
        )
      `
      console.log("[v0] Tax document saved:", documentId)
    } catch (dbError) {
      console.error("[v0] Database error:", dbError)
    }

    // Send email to support@cookin.io with form details
    try {
      const formName = formType === "w9" ? "W-9" : "W-8BEN"
      const taxId = formType === "w9" ? formData.ssn || formData.ein : formData.foreignTaxId

      await resend.emails.send({
        from: "CookinPartners <noreply@cookinpartners.com>",
        to: ["support@cookin.io"],
        subject: `Tax Form Submitted - ${formName} - ${formData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; padding: 40px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #d4af37; font-size: 28px; margin: 0;">Tax Document Submitted</h1>
              <p style="color: #888888; margin-top: 8px;">Form ${formName} - Digitally Signed</p>
            </div>
            
            <div style="background: #141414; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: #d4af37; font-size: 18px; margin: 0 0 16px;">Document Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #888;">Document ID:</td><td style="padding: 8px 0; color: #fff;">${documentId}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Form Type:</td><td style="padding: 8px 0; color: #fff;">${formName}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Partner Email:</td><td style="padding: 8px 0; color: #fff;">${partnerEmail || "Not provided"}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Signed At:</td><td style="padding: 8px 0; color: #fff;">${new Date(signature.signedAt).toLocaleString()}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">IP Address:</td><td style="padding: 8px 0; color: #fff;">${ipAddress}</td></tr>
              </table>
            </div>

            <div style="background: #141414; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
              <h2 style="color: #d4af37; font-size: 18px; margin: 0 0 16px;">Taxpayer Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #888;">Name:</td><td style="padding: 8px 0; color: #fff;">${formData.name}</td></tr>
                ${
                  formType === "w9"
                    ? `
                <tr><td style="padding: 8px 0; color: #888;">Business Name:</td><td style="padding: 8px 0; color: #fff;">${formData.businessName || "N/A"}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Tax Classification:</td><td style="padding: 8px 0; color: #fff;">${formData.federalTaxClassification}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Address:</td><td style="padding: 8px 0; color: #fff;">${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">TIN:</td><td style="padding: 8px 0; color: #fff;">${taxId ? "Provided (***)" : "Not provided"}</td></tr>
                `
                    : `
                <tr><td style="padding: 8px 0; color: #888;">Country of Citizenship:</td><td style="padding: 8px 0; color: #fff;">${formData.countryOfCitizenship}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Permanent Address:</td><td style="padding: 8px 0; color: #fff;">${formData.permanentAddress}, ${formData.permanentCity}, ${formData.permanentCountry}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Date of Birth:</td><td style="padding: 8px 0; color: #fff;">${formData.dateOfBirth}</td></tr>
                <tr><td style="padding: 8px 0; color: #888;">Foreign Tax ID:</td><td style="padding: 8px 0; color: #fff;">${formData.foreignTaxId || "Not provided"}</td></tr>
                `
                }
              </table>
            </div>

            <div style="background: #141414; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 12px; padding: 24px;">
              <h2 style="color: #d4af37; font-size: 18px; margin: 0 0 16px;">Digital Signature</h2>
              <p style="color: #888; margin-bottom: 16px;">The taxpayer has digitally signed this document.</p>
              <img src="${signature.signature}" alt="Digital Signature" style="max-width: 100%; border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 8px; background: #0a0a0a;" />
            </div>

            <div style="text-align: center; margin-top: 32px; padding: 24px; border-top: 1px solid rgba(212, 175, 55, 0.2);">
              <p style="color: #888; font-size: 12px;">This is an official tax document. Store securely for IRS compliance.</p>
              <p style="color: #d4af37; font-size: 12px;">CookinPartners™ | US Patent #10,290,222</p>
            </div>
          </div>
        `,
      })
      console.log("[v0] Tax form email sent to support@cookin.io")
    } catch (emailError) {
      console.error("[v0] Email error:", emailError)
    }

    return NextResponse.json({
      success: true,
      documentId,
      message: "Tax form submitted successfully",
    })
  } catch (error) {
    console.error("[v0] Tax form submission error:", error)
    return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 })
  }
}
