"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function VPApplicationPage() {
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
    linkedinUrl: "",
    websiteUrl: "",
    monthlyReach: "",
    whyVP: "",
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
          applicationType: "vp",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push(`/thank-you?affiliateId=${data.affiliateId}&name=${formData.firstName}&vp=true`)
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
      <section className="apply-hero-compact vp-hero">
        <div className="container">
          <Link href="/apply" className="back-link">
            ← Back to Partnership Options
          </Link>
          <div className="hero-content-compact">
            <div className="tier-badge-hero vp">VP Partner Application</div>
            <h1>Join the Elite VP Partner Tier</h1>
            <p>Earn 25-35% commissions with dedicated support and exclusive benefits</p>
          </div>
        </div>
      </section>

      <section className="application-form-page">
        <div className="container-narrow">
          <div className="vp-requirements-notice">
            <h3>VP Partner Requirements</h3>
            <ul>
              <li>Established audience or network (5,000+ contacts recommended)</li>
              <li>Professional online presence (LinkedIn, website, or social media)</li>
              <li>Affiliate marketing experience preferred</li>
              <li>Commitment to monthly promotion and sub-affiliate recruitment</li>
            </ul>
            <p className="notice-footer">Applications are reviewed within 24-48 hours. Limited positions available.</p>
          </div>

          <div className="application-form-container">
            <div className="form-header">
              <h2>VP Partner Application Form</h2>
              <p>Complete application with additional qualification information</p>
            </div>

            <form onSubmit={handleSubmit} className="application-form">
              {/* Personal Information - Same as Partner */}
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
                  <label>Affiliate Experience *</label>
                  <select
                    required
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  >
                    <option value="">Select experience level...</option>
                    <option value="some">Some Experience (1-2 years)</option>
                    <option value="experienced">Experienced (3+ years)</option>
                    <option value="professional">Professional Affiliate</option>
                  </select>
                </div>
              </div>

              {/* VP Qualification Section */}
              <div className="form-section vp-section">
                <h3 className="form-section-title">VP Qualification</h3>
                <div className="form-grid">
                  <div className="form-field">
                    <label>LinkedIn Profile URL *</label>
                    <input
                      type="url"
                      required
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div className="form-field">
                    <label>Website / Portfolio URL</label>
                    <input
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Estimated Monthly Reach *</label>
                  <select
                    required
                    value={formData.monthlyReach}
                    onChange={(e) => setFormData({ ...formData, monthlyReach: e.target.value })}
                  >
                    <option value="">Select your reach...</option>
                    <option value="5k-10k">5,000 - 10,000 contacts</option>
                    <option value="10k-25k">10,000 - 25,000 contacts</option>
                    <option value="25k-50k">25,000 - 50,000 contacts</option>
                    <option value="50k+">50,000+ contacts</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Why are you interested in the VP Partner tier? *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.whyVP}
                    onChange={(e) => setFormData({ ...formData, whyVP: e.target.value })}
                    placeholder="Tell us about your experience, network, and why you'd be a great VP Partner..."
                  />
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
                  <label>Tax ID / SSN *</label>
                  <input
                    type="text"
                    required
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    placeholder="For 1099 tax reporting (required for VP tier)"
                  />
                  <p className="field-note">Required for all VP Partners for tax compliance</p>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn-main vp-submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting Application..." : "Submit VP Application →"}
              </button>

              <p className="form-footer-note">
                VP applications are reviewed within 24-48 hours. We'll email you with next steps.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
