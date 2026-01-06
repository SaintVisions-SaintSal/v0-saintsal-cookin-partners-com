"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

type FormType = "w9" | "w8ben"

interface SignatureData {
  signature: string
  signedAt: string
  ipAddress: string
}

export default function TaxFormsPage() {
  const searchParams = useSearchParams()
  const partnerEmail = searchParams.get("email") || ""
  const partnerName = searchParams.get("name") || ""

  const [formType, setFormType] = useState<FormType>("w9")
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)

  // W-9 Form Data
  const [w9Data, setW9Data] = useState({
    name: partnerName,
    businessName: "",
    federalTaxClassification: "individual",
    exemptPayeeCode: "",
    fatcaCode: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    accountNumbers: "",
    ssn: "",
    ein: "",
  })

  // W-8BEN Form Data
  const [w8benData, setW8benData] = useState({
    name: partnerName,
    countryOfCitizenship: "",
    permanentAddress: "",
    permanentCity: "",
    permanentCountry: "",
    mailingAddress: "",
    mailingCity: "",
    mailingCountry: "",
    foreignTaxId: "",
    dateOfBirth: "",
    referenceNumbers: "",
    treatyCountry: "",
    treatyArticle: "",
    treatyRate: "",
    treatyConditions: "",
  })

  // Signature handling
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    setIsDrawing(true)
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    let x, y

    if ("touches" in e) {
      x = e.touches[0].clientX - rect.left
      y = e.touches[0].clientY - rect.top
    } else {
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    }

    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.strokeStyle = "#d4af37"
    ctx.lineTo(x, y)
    ctx.stroke()
    setHasSignature(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  const handleSubmit = async () => {
    if (!hasSignature) {
      alert("Please sign the form before submitting")
      return
    }

    setSubmitting(true)

    try {
      const canvas = canvasRef.current
      const signatureData = canvas?.toDataURL("image/png") || ""

      const signatureInfo: SignatureData = {
        signature: signatureData,
        signedAt: new Date().toISOString(),
        ipAddress: "", // Will be captured server-side
      }

      const res = await fetch("/api/tax-forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          formData: formType === "w9" ? w9Data : w8benData,
          signature: signatureInfo,
          partnerEmail,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        alert(data.error || "Submission failed")
      }
    } catch {
      alert("Failed to submit form")
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <main className="tax-form-page">
        <div className="tax-form-container">
          <div className="tax-form-success">
            <div className="success-icon">✓</div>
            <h1>Tax Form Submitted</h1>
            <p>
              Your {formType === "w9" ? "W-9" : "W-8BEN"} has been submitted and digitally signed. A copy has been sent
              to support@cookin.io.
            </p>
            <div className="success-details">
              <p>
                <strong>Signed:</strong> {new Date().toLocaleString()}
              </p>
              <p>
                <strong>Document ID:</strong> TAX-{Date.now()}
              </p>
            </div>
            <Link href="/get-paid" className="btn-primary">
              Continue to Payout Setup
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="tax-form-page">
      <div className="tax-form-container">
        <div className="tax-form-header">
          <Link href="/" className="tax-form-logo">
            <Image src="/images/cookinpartners-logo.png" alt="CookinPartners" width={64} height={64} />
          </Link>
          <h1>Tax Documentation</h1>
          <p>Required for commission payments over $600/year</p>
        </div>

        {/* Form Type Selection */}
        {step === 1 && (
          <div className="tax-form-card">
            <h2>Select Your Tax Form</h2>
            <p className="form-description">
              Choose the appropriate form based on your tax residency status. This is required by the IRS for 1099
              reporting.
            </p>

            <div className="form-type-cards">
              <div
                className={`form-type-card ${formType === "w9" ? "selected" : ""}`}
                onClick={() => setFormType("w9")}
              >
                <h3>Form W-9</h3>
                <p className="form-type-subtitle">For U.S. Persons</p>
                <ul>
                  <li>U.S. Citizens</li>
                  <li>U.S. Residents</li>
                  <li>U.S. Businesses</li>
                </ul>
                <div className="form-type-check">{formType === "w9" && "✓"}</div>
              </div>

              <div
                className={`form-type-card ${formType === "w8ben" ? "selected" : ""}`}
                onClick={() => setFormType("w8ben")}
              >
                <h3>Form W-8BEN</h3>
                <p className="form-type-subtitle">For Non-U.S. Persons</p>
                <ul>
                  <li>Foreign Individuals</li>
                  <li>Non-Resident Aliens</li>
                  <li>Foreign Nationals</li>
                </ul>
                <div className="form-type-check">{formType === "w8ben" && "✓"}</div>
              </div>
            </div>

            <button onClick={() => setStep(2)} className="btn-primary full-width">
              Continue with {formType === "w9" ? "W-9" : "W-8BEN"} →
            </button>
          </div>
        )}

        {/* W-9 Form */}
        {step === 2 && formType === "w9" && (
          <div className="tax-form-card">
            <div className="form-header-official">
              <div className="form-badge">Form W-9</div>
              <h2>Request for Taxpayer Identification Number and Certification</h2>
              <p>Department of the Treasury - Internal Revenue Service</p>
            </div>

            <div className="form-section">
              <h3>Part I - Identification</h3>

              <div className="form-field">
                <label>1. Name (as shown on your income tax return)</label>
                <input
                  type="text"
                  value={w9Data.name}
                  onChange={(e) => setW9Data((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="form-field">
                <label>2. Business name/disregarded entity name (if different from above)</label>
                <input
                  type="text"
                  value={w9Data.businessName}
                  onChange={(e) => setW9Data((prev) => ({ ...prev, businessName: e.target.value }))}
                />
              </div>

              <div className="form-field">
                <label>3. Federal tax classification</label>
                <select
                  value={w9Data.federalTaxClassification}
                  onChange={(e) => setW9Data((prev) => ({ ...prev, federalTaxClassification: e.target.value }))}
                >
                  <option value="individual">Individual/sole proprietor or single-member LLC</option>
                  <option value="c-corp">C Corporation</option>
                  <option value="s-corp">S Corporation</option>
                  <option value="partnership">Partnership</option>
                  <option value="trust">Trust/estate</option>
                  <option value="llc-c">LLC taxed as C corporation</option>
                  <option value="llc-s">LLC taxed as S corporation</option>
                  <option value="llc-p">LLC taxed as partnership</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>4. Exemptions (if applicable)</label>
                  <input
                    type="text"
                    value={w9Data.exemptPayeeCode}
                    onChange={(e) => setW9Data((prev) => ({ ...prev, exemptPayeeCode: e.target.value }))}
                    placeholder="Exempt payee code"
                  />
                </div>
                <div className="form-field">
                  <label>FATCA exemption code</label>
                  <input
                    type="text"
                    value={w9Data.fatcaCode}
                    onChange={(e) => setW9Data((prev) => ({ ...prev, fatcaCode: e.target.value }))}
                    placeholder="FATCA code"
                  />
                </div>
              </div>

              <div className="form-field">
                <label>5. Address (number, street, and apt. or suite no.)</label>
                <input
                  type="text"
                  value={w9Data.address}
                  onChange={(e) => setW9Data((prev) => ({ ...prev, address: e.target.value }))}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>6. City</label>
                  <input
                    type="text"
                    value={w9Data.city}
                    onChange={(e) => setW9Data((prev) => ({ ...prev, city: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>State</label>
                  <input
                    type="text"
                    value={w9Data.state}
                    onChange={(e) => setW9Data((prev) => ({ ...prev, state: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>ZIP</label>
                  <input
                    type="text"
                    value={w9Data.zip}
                    onChange={(e) => setW9Data((prev) => ({ ...prev, zip: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label>7. List account number(s) here (optional)</label>
                <input
                  type="text"
                  value={w9Data.accountNumbers}
                  onChange={(e) => setW9Data((prev) => ({ ...prev, accountNumbers: e.target.value }))}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Part II - Taxpayer Identification Number (TIN)</h3>
              <p className="form-note">
                Enter your TIN in the appropriate box. For individuals, this is generally your SSN.
              </p>

              <div className="form-row">
                <div className="form-field">
                  <label>Social Security Number (SSN)</label>
                  <input
                    type="text"
                    value={w9Data.ssn}
                    onChange={(e) => setW9Data((prev) => ({ ...prev, ssn: e.target.value }))}
                    placeholder="XXX-XX-XXXX"
                    maxLength={11}
                  />
                </div>
                <div className="form-field">
                  <label>OR Employer Identification Number (EIN)</label>
                  <input
                    type="text"
                    value={w9Data.ein}
                    onChange={(e) => setW9Data((prev) => ({ ...prev, ein: e.target.value }))}
                    placeholder="XX-XXXXXXX"
                    maxLength={10}
                  />
                </div>
              </div>
            </div>

            <div className="form-buttons">
              <button onClick={() => setStep(1)} className="btn-secondary">
                ← Back
              </button>
              <button onClick={() => setStep(3)} className="btn-primary" disabled={!w9Data.name || !w9Data.address}>
                Continue to Sign →
              </button>
            </div>
          </div>
        )}

        {/* W-8BEN Form */}
        {step === 2 && formType === "w8ben" && (
          <div className="tax-form-card">
            <div className="form-header-official">
              <div className="form-badge">Form W-8BEN</div>
              <h2>Certificate of Foreign Status of Beneficial Owner</h2>
              <p>Department of the Treasury - Internal Revenue Service</p>
            </div>

            <div className="form-section">
              <h3>Part I - Identification of Beneficial Owner</h3>

              <div className="form-field">
                <label>1. Name of individual who is the beneficial owner</label>
                <input
                  type="text"
                  value={w8benData.name}
                  onChange={(e) => setW8benData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="form-field">
                <label>2. Country of citizenship</label>
                <input
                  type="text"
                  value={w8benData.countryOfCitizenship}
                  onChange={(e) => setW8benData((prev) => ({ ...prev, countryOfCitizenship: e.target.value }))}
                  required
                />
              </div>

              <div className="form-field">
                <label>3. Permanent residence address (street, apt. or suite no., or rural route)</label>
                <input
                  type="text"
                  value={w8benData.permanentAddress}
                  onChange={(e) => setW8benData((prev) => ({ ...prev, permanentAddress: e.target.value }))}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>City or town</label>
                  <input
                    type="text"
                    value={w8benData.permanentCity}
                    onChange={(e) => setW8benData((prev) => ({ ...prev, permanentCity: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-field">
                  <label>Country</label>
                  <input
                    type="text"
                    value={w8benData.permanentCountry}
                    onChange={(e) => setW8benData((prev) => ({ ...prev, permanentCountry: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label>4. Mailing address (if different from above)</label>
                <input
                  type="text"
                  value={w8benData.mailingAddress}
                  onChange={(e) => setW8benData((prev) => ({ ...prev, mailingAddress: e.target.value }))}
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>5. Foreign tax identifying number</label>
                  <input
                    type="text"
                    value={w8benData.foreignTaxId}
                    onChange={(e) => setW8benData((prev) => ({ ...prev, foreignTaxId: e.target.value }))}
                  />
                </div>
                <div className="form-field">
                  <label>8. Date of birth (MM-DD-YYYY)</label>
                  <input
                    type="date"
                    value={w8benData.dateOfBirth}
                    onChange={(e) => setW8benData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Part II - Claim of Tax Treaty Benefits (if applicable)</h3>

              <div className="form-row">
                <div className="form-field">
                  <label>9. Treaty country</label>
                  <input
                    type="text"
                    value={w8benData.treatyCountry}
                    onChange={(e) => setW8benData((prev) => ({ ...prev, treatyCountry: e.target.value }))}
                  />
                </div>
                <div className="form-field">
                  <label>Article number</label>
                  <input
                    type="text"
                    value={w8benData.treatyArticle}
                    onChange={(e) => setW8benData((prev) => ({ ...prev, treatyArticle: e.target.value }))}
                  />
                </div>
                <div className="form-field">
                  <label>Rate (%)</label>
                  <input
                    type="text"
                    value={w8benData.treatyRate}
                    onChange={(e) => setW8benData((prev) => ({ ...prev, treatyRate: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <div className="form-buttons">
              <button onClick={() => setStep(1)} className="btn-secondary">
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="btn-primary"
                disabled={!w8benData.name || !w8benData.countryOfCitizenship}
              >
                Continue to Sign →
              </button>
            </div>
          </div>
        )}

        {/* Signature Step */}
        {step === 3 && (
          <div className="tax-form-card">
            <div className="form-header-official">
              <div className="form-badge">{formType === "w9" ? "W-9" : "W-8BEN"} Certification</div>
              <h2>Digital Signature</h2>
              <p>Sign below to certify this form</p>
            </div>

            <div className="certification-text">
              <h4>Certification</h4>
              {formType === "w9" ? (
                <p>
                  Under penalties of perjury, I certify that:
                  <br />
                  <br />
                  1. The number shown on this form is my correct taxpayer identification number, and
                  <br />
                  2. I am not subject to backup withholding because: (a) I am exempt from backup withholding, or (b) I
                  have not been notified by the IRS that I am subject to backup withholding, and
                  <br />
                  3. I am a U.S. citizen or other U.S. person, and
                  <br />
                  4. The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is
                  correct.
                </p>
              ) : (
                <p>
                  Under penalties of perjury, I declare that I have examined the information on this form and to the
                  best of my knowledge and belief it is true, correct, and complete. I further certify under penalties
                  of perjury that:
                  <br />
                  <br />
                  1. I am the individual that is the beneficial owner of all the income to which this form relates,
                  <br />
                  2. The person named on line 1 of this form is not a U.S. person,
                  <br />
                  3. I am not acting as an agent or nominee for any other person to whom such income relates.
                </p>
              )}
            </div>

            <div className="signature-section">
              <label>Sign Here (draw your signature)</label>
              <div className="signature-canvas-container">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={150}
                  className="signature-canvas"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
                <button type="button" onClick={clearSignature} className="clear-signature-btn">
                  Clear
                </button>
              </div>

              <div className="signature-timestamp">
                <p>
                  <strong>Date:</strong> {new Date().toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {new Date().toLocaleTimeString()}
                </p>
                <p className="timestamp-note">
                  Your IP address and timestamp will be recorded for verification purposes.
                </p>
              </div>
            </div>

            <div className="form-buttons">
              <button onClick={() => setStep(2)} className="btn-secondary">
                ← Back to Form
              </button>
              <button onClick={handleSubmit} className="btn-primary" disabled={!hasSignature || submitting}>
                {submitting ? "Submitting..." : "Submit Signed Form"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
