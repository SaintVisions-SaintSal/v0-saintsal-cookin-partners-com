"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

// VP Partners with 25% commission (pre-approved list)
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

export default function GetPaidPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    rewardfulId: "",
    accountType: "individual",
    businessName: "",
    ein: "",
    taxId: "",
    country: "US",
    address: "",
    city: "",
    state: "",
    zip: "",
    payoutMethod: "",
    paypalEmail: "",
    venmoHandle: "",
    cashappHandle: "",
    bankName: "",
    routingNumber: "",
    accountNumber: "",
    agreeTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [commissionRate, setCommissionRate] = useState(15)

  // Check if email is VP partner
  const checkVPStatus = (email: string) => {
    const isVP = VP_PARTNERS.includes(email.toLowerCase().trim())
    setCommissionRate(isVP ? 25 : 15)
    return isVP
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Check VP status when email changes
    if (name === "email") {
      checkVPStatus(value)
    }
  }

  const nextStep = () => {
    if (step < 4) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Submit payout info to API
      const response = await fetch("/api/partner-payout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          commissionRate,
          isVP: commissionRate === 25,
        }),
      })

      if (response.ok) {
        setIsComplete(true)
        setStep(4)
      }
    } catch (error) {
      console.error("Error submitting payout info:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="get-paid-page">
      <div className="get-paid-container">
        {/* Header */}
        <header className="get-paid-header">
          <Link href="/" className="get-paid-logo">
            <Image
              src="/images/cookinpartners-logo.png"
              alt="CookinPartners"
              width={64}
              height={64}
              className="get-paid-logo-img"
            />
            <div className="get-paid-logo-text">
              <span className="get-paid-logo-title">COOKINPARTNERS</span>
              <span className="get-paid-logo-sub">Partner Program</span>
            </div>
          </Link>
          <div className="get-paid-patent">US PATENT #10,290,222</div>
        </header>

        {/* Hero */}
        <section className="get-paid-hero">
          <Image src="/images/saintsal-logo.png" alt="SaintSal" width={120} height={120} className="get-paid-mascot" />
          <h1>
            GET <span className="gold">PAID</span>
          </h1>
          <p>Set up your payout method to start receiving your commissions. Fast, secure, automated.</p>

          <div className="get-paid-stats">
            <div className="get-paid-stat">
              <div className="get-paid-stat-value">{commissionRate}%</div>
              <div className="get-paid-stat-label">Commission</div>
            </div>
            <div className="get-paid-stat">
              <div className="get-paid-stat-value">$0</div>
              <div className="get-paid-stat-label">Payout Fees</div>
            </div>
            <div className="get-paid-stat">
              <div className="get-paid-stat-value">NET-15</div>
              <div className="get-paid-stat-label">Schedule</div>
            </div>
          </div>
        </section>

        {/* Form Card */}
        <div className="get-paid-card">
          {/* Progress Steps */}
          <div className="get-paid-progress">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`get-paid-step ${step === s ? "active" : ""} ${step > s ? "done" : ""}`}>
                <div className="get-paid-step-num">{step > s ? "✓" : s}</div>
                <div className="get-paid-step-label">
                  {s === 1 ? "Info" : s === 2 ? "Tax" : s === 3 ? "Payout" : "Done"}
                </div>
              </div>
            ))}
          </div>

          {/* Step 1: Info */}
          {step === 1 && (
            <div className="get-paid-section">
              <h2>YOUR INFORMATION</h2>
              <p className="subtitle">{"Let's get your details to set up payouts"}</p>

              <div className="get-paid-row">
                <div className="get-paid-field">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                  />
                </div>
                <div className="get-paid-field">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Smith"
                    required
                  />
                </div>
              </div>

              <div className="get-paid-field">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                />
                {commissionRate === 25 && <div className="vp-badge">VP Partner - 25% Commission</div>}
              </div>

              <div className="get-paid-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="get-paid-field">
                <label>Rewardful Affiliate ID (if you have one)</label>
                <input
                  type="text"
                  name="rewardfulId"
                  value={formData.rewardfulId}
                  onChange={handleInputChange}
                  placeholder="e.g., aff_xxxxx"
                />
              </div>

              <div className="get-paid-btn-group">
                <button className="get-paid-btn get-paid-btn-primary get-paid-btn-full" onClick={nextStep}>
                  Continue <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Tax */}
          {step === 2 && (
            <div className="get-paid-section">
              <h2>TAX INFORMATION</h2>
              <p className="subtitle">Required for 1099 reporting (US partners earning $600+)</p>

              <div className="get-paid-field">
                <label>Account Type *</label>
                <div className="get-paid-radio-grid">
                  <label className="get-paid-radio">
                    <input
                      type="radio"
                      name="accountType"
                      value="individual"
                      checked={formData.accountType === "individual"}
                      onChange={handleInputChange}
                    />
                    <div className="get-paid-radio-card">
                      <div className="get-paid-radio-icon">👤</div>
                      <div className="get-paid-radio-title">Individual</div>
                      <div className="get-paid-radio-desc">Personal account</div>
                    </div>
                  </label>
                  <label className="get-paid-radio">
                    <input
                      type="radio"
                      name="accountType"
                      value="business"
                      checked={formData.accountType === "business"}
                      onChange={handleInputChange}
                    />
                    <div className="get-paid-radio-card">
                      <div className="get-paid-radio-icon">🏢</div>
                      <div className="get-paid-radio-title">Business</div>
                      <div className="get-paid-radio-desc">LLC, Corp, etc.</div>
                    </div>
                  </label>
                </div>
              </div>

              {formData.accountType === "business" && (
                <div className="get-paid-business-fields">
                  <div className="get-paid-field">
                    <label>Business Name *</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      placeholder="Your Business LLC"
                    />
                  </div>
                  <div className="get-paid-field">
                    <label>EIN (Employer ID Number)</label>
                    <input
                      type="text"
                      name="ein"
                      value={formData.ein}
                      onChange={handleInputChange}
                      placeholder="XX-XXXXXXX"
                    />
                  </div>
                </div>
              )}

              <div className="get-paid-field">
                <label>Tax ID / SSN (Last 4 digits) *</label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  placeholder="XXXX"
                  maxLength={4}
                />
              </div>

              <div className="get-paid-field">
                <label>Country *</label>
                <select name="country" value={formData.country} onChange={handleInputChange}>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div className="get-paid-field">
                <label>Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St"
                />
              </div>

              <div className="get-paid-row">
                <div className="get-paid-field">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                  />
                </div>
                <div className="get-paid-field">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="CA"
                  />
                </div>
                <div className="get-paid-field">
                  <label>ZIP *</label>
                  <input type="text" name="zip" value={formData.zip} onChange={handleInputChange} placeholder="90210" />
                </div>
              </div>

              <div className="get-paid-btn-group">
                <button className="get-paid-btn get-paid-btn-secondary" onClick={prevStep}>
                  ← Back
                </button>
                <button className="get-paid-btn get-paid-btn-primary get-paid-btn-full" onClick={nextStep}>
                  Continue <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payout */}
          {step === 3 && (
            <div className="get-paid-section">
              <h2>PAYOUT METHOD</h2>
              <p className="subtitle">Choose how you want to receive your commissions</p>

              <div className="get-paid-field">
                <label>Preferred Payout Method *</label>
                <div className="get-paid-radio-grid">
                  <label className="get-paid-radio">
                    <input
                      type="radio"
                      name="payoutMethod"
                      value="paypal"
                      checked={formData.payoutMethod === "paypal"}
                      onChange={handleInputChange}
                    />
                    <div className="get-paid-radio-card">
                      <div className="get-paid-radio-icon">💳</div>
                      <div className="get-paid-radio-title">PayPal</div>
                      <div className="get-paid-radio-desc">Instant transfer</div>
                    </div>
                  </label>
                  <label className="get-paid-radio">
                    <input
                      type="radio"
                      name="payoutMethod"
                      value="venmo"
                      checked={formData.payoutMethod === "venmo"}
                      onChange={handleInputChange}
                    />
                    <div className="get-paid-radio-card">
                      <div className="get-paid-radio-icon">📱</div>
                      <div className="get-paid-radio-title">Venmo</div>
                      <div className="get-paid-radio-desc">Mobile payments</div>
                    </div>
                  </label>
                  <label className="get-paid-radio">
                    <input
                      type="radio"
                      name="payoutMethod"
                      value="cashapp"
                      checked={formData.payoutMethod === "cashapp"}
                      onChange={handleInputChange}
                    />
                    <div className="get-paid-radio-card">
                      <div className="get-paid-radio-icon">💵</div>
                      <div className="get-paid-radio-title">Cash App</div>
                      <div className="get-paid-radio-desc">Quick cash</div>
                    </div>
                  </label>
                  <label className="get-paid-radio">
                    <input
                      type="radio"
                      name="payoutMethod"
                      value="bank"
                      checked={formData.payoutMethod === "bank"}
                      onChange={handleInputChange}
                    />
                    <div className="get-paid-radio-card">
                      <div className="get-paid-radio-icon">🏦</div>
                      <div className="get-paid-radio-title">Bank Transfer</div>
                      <div className="get-paid-radio-desc">ACH direct deposit</div>
                    </div>
                  </label>
                </div>
              </div>

              {formData.payoutMethod === "paypal" && (
                <div className="get-paid-field">
                  <label>PayPal Email *</label>
                  <input
                    type="email"
                    name="paypalEmail"
                    value={formData.paypalEmail}
                    onChange={handleInputChange}
                    placeholder="your@paypal.com"
                  />
                </div>
              )}

              {formData.payoutMethod === "venmo" && (
                <div className="get-paid-field">
                  <label>Venmo Handle *</label>
                  <input
                    type="text"
                    name="venmoHandle"
                    value={formData.venmoHandle}
                    onChange={handleInputChange}
                    placeholder="@yourhandle"
                  />
                </div>
              )}

              {formData.payoutMethod === "cashapp" && (
                <div className="get-paid-field">
                  <label>Cash App Handle *</label>
                  <input
                    type="text"
                    name="cashappHandle"
                    value={formData.cashappHandle}
                    onChange={handleInputChange}
                    placeholder="$yourhandle"
                  />
                </div>
              )}

              {formData.payoutMethod === "bank" && (
                <>
                  <div className="get-paid-field">
                    <label>Bank Name *</label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      placeholder="Bank of America"
                    />
                  </div>
                  <div className="get-paid-row">
                    <div className="get-paid-field">
                      <label>Routing Number *</label>
                      <input
                        type="text"
                        name="routingNumber"
                        value={formData.routingNumber}
                        onChange={handleInputChange}
                        placeholder="XXXXXXXXX"
                      />
                    </div>
                    <div className="get-paid-field">
                      <label>Account Number *</label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        placeholder="XXXXXXXXXXXX"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="get-paid-info">
                <h4>🔒 Secure & Encrypted</h4>
                <p>
                  Your payment information is securely encrypted and never shared. We use industry-standard security
                  protocols.
                </p>
              </div>

              <div className="get-paid-checkbox">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  id="agreeTerms"
                />
                <label htmlFor="agreeTerms">
                  I agree to the <Link href="/terms">Partner Terms</Link> and{" "}
                  <Link href="/privacy">Privacy Policy</Link>
                </label>
              </div>

              <div className="get-paid-btn-group">
                <button className="get-paid-btn get-paid-btn-secondary" onClick={prevStep}>
                  ← Back
                </button>
                <button
                  className="get-paid-btn get-paid-btn-primary get-paid-btn-full"
                  onClick={handleSubmit}
                  disabled={!formData.agreeTerms || !formData.payoutMethod || isSubmitting}
                >
                  {isSubmitting ? "Setting Up..." : "Complete Setup"} <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && isComplete && (
            <div className="get-paid-success">
              <div className="get-paid-success-icon">✓</div>
              <h3>YOU{"'"}RE ALL SET!</h3>
              <p>
                Your payout method has been configured. You{"'"}ll receive your commissions via {formData.payoutMethod}{" "}
                on NET-15 schedule.
              </p>

              <div className="get-paid-next-steps">
                <h4>Next Steps</h4>
                <ul>
                  <li>Share your affiliate link to start earning</li>
                  <li>Track your referrals in the Partner Portal</li>
                  <li>Commissions are paid out on the 15th of each month</li>
                  <li>Minimum payout threshold: $50</li>
                </ul>
              </div>

              <div className="get-paid-btn-group" style={{ justifyContent: "center", marginTop: "32px" }}>
                <Link href="/" className="get-paid-btn get-paid-btn-primary">
                  Go to Dashboard <span>→</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="get-paid-footer">
          <Image
            src="/images/saintsal-logo.png"
            alt="SaintSal"
            width={48}
            height={48}
            className="get-paid-footer-logo"
          />
          <p>
            CookinPartners™ | <Link href="https://saintsal.ai">SaintSal™</Link> & The Cookin{"'"} Enterprise
            <br />
            Protected by US Patent #10,290,222
          </p>
        </footer>
      </div>
    </div>
  )
}
