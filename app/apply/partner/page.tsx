"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function PartnerApplicationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    audience: "",
    experience: "",
    payoutMethod: "",
    payoutDetails: "",
    taxId: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/partner-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          applicationType: "partner",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push(`/thank-you?affiliateId=${data.affiliateId}&name=${formData.firstName}`)
      } else {
        alert(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="apply-page">
      <section className="apply-hero-compact">
        <div className="container">
          <Link href="/apply" className="back-link">
            ← Back to Partnership Options
          </Link>
          <div className="hero-content-compact">
            <div className="tier-badge-hero">Partner Application</div>
            <h1>Join the CookinPartners Network</h1>
            <p>Start earning 15% recurring commissions with instant approval</p>
          </div>
        </div>
      </section>

      <section className="application-form-page">
        <div className="container-narrow">
          <div className="application-form-container">
            <div className="form-header">
              <h2>Partner Application Form</h2>
              <p>Fill out the form below to get your instant affiliate link and start earning today</p>
            </div>

            <form onSubmit={handleSubmit} className="application-form">
              {/* Personal Information */}
              <div className="form-section">
                <h3 className="form-section-title">Personal Information</h3>
                <div className="form-grid">
                  <div className="form-field">
                    <label>First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  <div className="form-field">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-field">
                    <label>Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="form-field">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company name"
                  />
                </div>
              </div>

              {/* Business Information */}
              <div className="form-section">
                <h3 className="form-section-title">Business Information</h3>
                <div className="form-field">
                  <label>Industry / Audience *</label>
                  <select
                    required
                    value={formData.audience}
                    onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                  >
                    <option value="">Select your primary audience...</option>
                    <option value="real-estate">Real Estate Professionals</option>
                    <option value="finance">Finance & Lending</option>
                    <option value="business">Business Owners / Entrepreneurs</option>
                    <option value="marketing">Marketing & Sales</option>
                    <option value="tech">Technology / SaaS</option>
                    <option value="coaching">Coaching & Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Affiliate Experience</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  >
                    <option value="">Select experience level...</option>
                    <option value="none">New to Affiliate Marketing</option>
                    <option value="some">Some Experience (1-2 years)</option>
                    <option value="experienced">Experienced (3+ years)</option>
                    <option value="professional">Professional Affiliate</option>
                  </select>
                </div>
              </div>

              {/* Payout Information */}
              <div className="form-section">
                <h3 className="form-section-title">Payout Information</h3>
                <p className="form-section-description">How would you like to receive your commissions?</p>

                <div className="form-field">
                  <label>Preferred Payout Method *</label>
                  <select
                    required
                    value={formData.payoutMethod}
                    onChange={(e) => setFormData({ ...formData, payoutMethod: e.target.value })}
                  >
                    <option value="">Select payout method...</option>
                    <option value="paypal">PayPal</option>
                    <option value="venmo">Venmo</option>
                    <option value="cashapp">Cash App</option>
                    <option value="bank">Bank Transfer (ACH)</option>
                    <option value="check">Check (Mail)</option>
                  </select>
                </div>

                {formData.payoutMethod && (
                  <div className="form-field">
                    <label>
                      {formData.payoutMethod === "paypal" && "PayPal Email Address *"}
                      {formData.payoutMethod === "venmo" && "Venmo Username *"}
                      {formData.payoutMethod === "cashapp" && "Cash App Tag *"}
                      {formData.payoutMethod === "bank" && "Bank Account Details *"}
                      {formData.payoutMethod === "check" && "Mailing Address *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.payoutDetails}
                      onChange={(e) => setFormData({ ...formData, payoutDetails: e.target.value })}
                      placeholder={
                        formData.payoutMethod === "paypal"
                          ? "your@email.com"
                          : formData.payoutMethod === "venmo"
                            ? "@username"
                            : formData.payoutMethod === "cashapp"
                              ? "$username"
                              : formData.payoutMethod === "bank"
                                ? "Account & routing number"
                                : "Street address, City, State ZIP"
                      }
                    />
                  </div>
                )}

                <div className="form-field">
                  <label>Tax ID / SSN (Optional)</label>
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    placeholder="For 1099 tax reporting (US partners earning over $600/year)"
                  />
                  <p className="field-note">Required for US partners earning over $600/year</p>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn-main" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Get My Affiliate Link →"}
              </button>

              <p className="form-footer-note">
                Partner accounts are approved instantly. You'll receive your affiliate link immediately!
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
