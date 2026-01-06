"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function W9Page() {
  const [formType, setFormType] = useState<"w9" | "w8ben">("w9")
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    taxClassification: "",
    exemptPayeeCode: "",
    fatcaCode: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    accountNumbers: "",
    ssn1: "",
    ssn2: "",
    ssn3: "",
    ein1: "",
    ein2: "",
    foreignTIN: "",
    dateOfBirth: "",
    certify: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [submittedAt, setSubmittedAt] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.address || !formData.certify) {
      alert("Please fill in all required fields and certify the information.")
      return
    }
    if (formType === "w9" && !formData.ssn1 && !formData.ein1) {
      alert("Please provide either SSN or EIN.")
      return
    }
    setSubmitted(true)
    setSubmittedAt(new Date().toISOString())
  }

  const generateEmailBody = () => {
    const tin =
      formType === "w9"
        ? formData.ssn1
          ? `SSN: XXX-XX-${formData.ssn3}`
          : `EIN: XX-${formData.ein2}`
        : `Foreign TIN: ${formData.foreignTIN}`

    return (
      `${formType === "w9" ? "W-9" : "W-8BEN"} Tax Form Submission%0D%0A%0D%0A` +
      `Name: ${formData.name}%0D%0A` +
      `Business Name: ${formData.businessName || "N/A"}%0D%0A` +
      `Tax Classification: ${formData.taxClassification || "Individual"}%0D%0A` +
      `Address: ${formData.address}%0D%0A` +
      `City/State/ZIP: ${formData.city}, ${formData.state} ${formData.zip}%0D%0A` +
      (formType === "w8ben" ? `Country: ${formData.country}%0D%0A` : "") +
      `${tin}%0D%0A` +
      `Submitted: ${submittedAt ? new Date(submittedAt).toLocaleString() : "Pending"}%0D%0A%0D%0A` +
      `IMPORTANT: Please print this page as PDF and attach to this email for complete records.%0D%0A%0D%0A` +
      `I certify under penalties of perjury that the information provided is true, correct, and complete.`
    )
  }

  return (
    <main className="resources-page">
      <nav className="nav scrolled">
        <div className="container">
          <Link href="/" className="nav-logo">
            <Image
              src="/images/cookinpartners-logo.png"
              alt="CookinPartners"
              width={40}
              height={40}
              className="logo-image"
            />
            <span>
              Cookin<span className="gold">Partners</span>™
            </span>
          </Link>
          <div className="nav-links">
            <Link href="/#ecosystem">Ecosystem</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/apply" className="btn-primary small">
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      <section className="document-page">
        <div className="container">
          <div className="document-header">
            <span className="badge">Tax Document</span>
            <h1>
              Tax <span className="gold">Information Form</span>
            </h1>
            <p>Required for commission payments - W-9 (US) or W-8BEN (International)</p>
          </div>

          <div className="form-type-selector">
            <button className={`form-type-btn ${formType === "w9" ? "active" : ""}`} onClick={() => setFormType("w9")}>
              W-9 (US Residents)
            </button>
            <button
              className={`form-type-btn ${formType === "w8ben" ? "active" : ""}`}
              onClick={() => setFormType("w8ben")}
            >
              W-8BEN (International)
            </button>
          </div>

          {!submitted ? (
            <div className="tax-form">
              <div className="tax-form-header">
                <h2>{formType === "w9" ? "Form W-9" : "Form W-8BEN"}</h2>
                <p>
                  {formType === "w9"
                    ? "Request for Taxpayer Identification Number and Certification"
                    : "Certificate of Foreign Status of Beneficial Owner for United States Tax Withholding"}
                </p>
              </div>

              <div className="tax-form-section">
                <h3>Part I - Identification</h3>

                <div className="form-row">
                  <label>1. Name (as shown on your income tax return) *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Legal Name"
                    required
                  />
                </div>

                <div className="form-row">
                  <label>2. Business name/disregarded entity name (if different)</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Business Name (optional)"
                  />
                </div>

                {formType === "w9" && (
                  <div className="form-row">
                    <label>3. Federal Tax Classification</label>
                    <select name="taxClassification" value={formData.taxClassification} onChange={handleChange}>
                      <option value="">Select classification...</option>
                      <option value="individual">Individual/Sole Proprietor</option>
                      <option value="c-corp">C Corporation</option>
                      <option value="s-corp">S Corporation</option>
                      <option value="partnership">Partnership</option>
                      <option value="trust">Trust/Estate</option>
                      <option value="llc-c">LLC - C Corporation</option>
                      <option value="llc-s">LLC - S Corporation</option>
                      <option value="llc-p">LLC - Partnership</option>
                    </select>
                  </div>
                )}

                {formType === "w8ben" && (
                  <div className="form-row">
                    <label>3. Country of Citizenship *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="tax-form-section">
                <h3>Part II - Address</h3>

                <div className="form-row">
                  <label>4. Address (street, apt/suite) *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street Address"
                    required
                  />
                </div>

                <div className="form-row-group">
                  <div className="form-row">
                    <label>5. City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State/Province"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <label>ZIP *</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="ZIP/Postal Code"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="tax-form-section">
                <h3>Part III - Taxpayer Identification Number (TIN)</h3>

                {formType === "w9" ? (
                  <>
                    <div className="form-row">
                      <label>Social Security Number (SSN)</label>
                      <div className="ssn-inputs">
                        <input
                          type="text"
                          name="ssn1"
                          value={formData.ssn1}
                          onChange={handleChange}
                          placeholder="XXX"
                          maxLength={3}
                        />
                        <span>-</span>
                        <input
                          type="text"
                          name="ssn2"
                          value={formData.ssn2}
                          onChange={handleChange}
                          placeholder="XX"
                          maxLength={2}
                        />
                        <span>-</span>
                        <input
                          type="text"
                          name="ssn3"
                          value={formData.ssn3}
                          onChange={handleChange}
                          placeholder="XXXX"
                          maxLength={4}
                        />
                      </div>
                    </div>
                    <p className="form-or">— OR —</p>
                    <div className="form-row">
                      <label>Employer Identification Number (EIN)</label>
                      <div className="ein-inputs">
                        <input
                          type="text"
                          name="ein1"
                          value={formData.ein1}
                          onChange={handleChange}
                          placeholder="XX"
                          maxLength={2}
                        />
                        <span>-</span>
                        <input
                          type="text"
                          name="ein2"
                          value={formData.ein2}
                          onChange={handleChange}
                          placeholder="XXXXXXX"
                          maxLength={7}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-row">
                      <label>Foreign Tax Identifying Number</label>
                      <input
                        type="text"
                        name="foreignTIN"
                        value={formData.foreignTIN}
                        onChange={handleChange}
                        placeholder="Foreign TIN (if applicable)"
                      />
                    </div>
                    <div className="form-row">
                      <label>Date of Birth</label>
                      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                  </>
                )}
              </div>

              <div className="tax-form-section certification">
                <h3>Part IV - Certification</h3>
                <div className="certification-text">
                  <p>
                    <strong>Under penalties of perjury, I certify that:</strong>
                  </p>
                  <ol>
                    <li>
                      The number shown on this form is my correct taxpayer identification number (or I am waiting for a
                      number to be issued to me);
                    </li>
                    <li>
                      I am not subject to backup withholding because: (a) I am exempt from backup withholding, or (b) I
                      have not been notified by the IRS that I am subject to backup withholding;
                    </li>
                    <li>I am a U.S. citizen or other U.S. person; and</li>
                    <li>
                      The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting
                      is correct.
                    </li>
                  </ol>
                </div>
                <label className="checkbox-container">
                  <input type="checkbox" name="certify" checked={formData.certify} onChange={handleChange} />
                  <span className="checkmark"></span>I certify under penalties of perjury that the above statements are
                  true, correct, and complete.
                </label>
              </div>

              <button onClick={handleSubmit} className="btn-primary large">
                Complete {formType === "w9" ? "W-9" : "W-8BEN"} Form
              </button>
            </div>
          ) : (
            <div className="tax-form-completed">
              <div className="confirmed-badge large">✓ Tax Form Completed</div>
              <div className="completed-summary">
                <h3>Form Summary</h3>
                <p>
                  <strong>Form Type:</strong> {formType === "w9" ? "W-9" : "W-8BEN"}
                </p>
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                {formData.businessName && (
                  <p>
                    <strong>Business:</strong> {formData.businessName}
                  </p>
                )}
                <p>
                  <strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zip}
                </p>
                {formType === "w8ben" && (
                  <p>
                    <strong>Country:</strong> {formData.country}
                  </p>
                )}
                <p>
                  <strong>TIN:</strong>{" "}
                  {formType === "w9"
                    ? formData.ssn1
                      ? `SSN: XXX-XX-${formData.ssn3}`
                      : `EIN: XX-${formData.ein2}`
                    : `Foreign TIN: ${formData.foreignTIN || "N/A"}`}
                </p>
                <p>
                  <strong>Completed:</strong> {new Date(submittedAt!).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          <div className="document-actions">
            <button onClick={() => window.print()} className="btn-secondary">
              Print / Save as PDF
            </button>
            <a
              href={`mailto:support@cookin.io,ryan@cookin.io?subject=${formType === "w9" ? "W-9" : "W-8BEN"} Tax Form - ${formData.name}&body=${generateEmailBody()}`}
              className="btn-primary"
            >
              Email Form to Support
            </a>
          </div>

          <div className="tax-form-note">
            <p>
              <strong>Important:</strong> After completing this form, please:
            </p>
            <ol>
              <li>Click "Print / Save as PDF" to save a copy</li>
              <li>Click "Email Form to Support" to send your information</li>
              <li>Attach the saved PDF to the email for complete records</li>
            </ol>
            <p>Questions? Contact support@cookin.io</p>
          </div>

          <div className="document-nav">
            <Link href="/resources/handbook">← Partner Handbook</Link>
            <Link href="/resources/terms">Terms & Conditions</Link>
            <Link href="/resources/nda">NDA Agreement</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
