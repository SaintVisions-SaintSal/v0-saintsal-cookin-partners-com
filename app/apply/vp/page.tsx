"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

export default function VPApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    linkedIn: "",
    yearsExperience: "",
    industryExpertise: [] as string[],
    currentPortfolioSize: "",
    investmentCapacity: "",
    partnershipGoals: "",
    teamSize: "",
    audienceSize: "",
    referralStrategy: "",
    referredBy: "",
    additionalNotes: "",
    payoutMethod: "",
    payoutDetails: "",
    taxId: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send email with form data to support@cookin.io
      const emailBody = `
NEW VP PARTNER APPLICATION

PERSONAL INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}

PROFESSIONAL BACKGROUND:
Role: ${formData.role}
LinkedIn: ${formData.linkedIn}
Years of Experience: ${formData.yearsExperience}
Industry Expertise: ${formData.industryExpertise.join(", ")}

PORTFOLIO & EXPERIENCE:
Portfolio Size: ${formData.currentPortfolioSize}
Investment Capacity: ${formData.investmentCapacity}

PARTNERSHIP GOALS:
${formData.partnershipGoals}

TEAM & REACH:
Team Size: ${formData.teamSize}
Audience Size: ${formData.audienceSize}

PROMOTION STRATEGY:
${formData.referralStrategy}

ADDITIONAL:
Referred By: ${formData.referredBy}
Notes: ${formData.additionalNotes}

PAYOUT INFORMATION:
Method: ${formData.payoutMethod}
Details: ${formData.payoutDetails}
Tax ID: ${formData.taxId}
      `.trim()

      const response = await fetch("/api/partner-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          applicationType: "vp",
          emailBody,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Show simple thank you message
        alert(
          `Thank you ${formData.firstName}! Your VP application has been sent to support@cookin.io. We'll review and contact you within 24-48 hours.`,
        )
        window.location.href = "/apply"
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
            <h1>Apply for VP Partner Consideration</h1>
            <p>Earn 25% commissions with dedicated support and exclusive benefits</p>
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
            <p className="notice-footer">
              Your application will be sent to support@cookin.io for manual review. Very limited positions available.
            </p>
          </div>

          <div className="application-form-container">
            <div className="form-header">
              <h2>VP Partner Application Form</h2>
              <p>Submit your application for VP consideration</p>
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

              {/* Professional Background */}
              <div className="form-section">
                <h3 className="form-section-title">Professional Background</h3>
                <div className="form-field">
                  <label>Current Role / Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Real Estate Broker, Fund Manager"
                  />
                </div>

                <div className="form-field">
                  <label>LinkedIn Profile URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.linkedIn}
                    onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </div>

              {/* Portfolio & Experience */}
              <div className="form-section">
                <h3 className="form-section-title">Portfolio & Experience</h3>
                <div className="form-field">
                  <label>Years of Experience *</label>
                  <select
                    required
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                  >
                    <option value="">Select experience level...</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Industry Expertise * (select all that apply)</label>
                  <div className="checkbox-group">
                    {["Real Estate", "Finance", "Tech", "Healthcare", "Legal", "Other"].map((industry) => (
                      <label key={industry} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.industryExpertise.includes(industry)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                industryExpertise: [...formData.industryExpertise, industry],
                              })
                            } else {
                              setFormData({
                                ...formData,
                                industryExpertise: formData.industryExpertise.filter((i) => i !== industry),
                              })
                            }
                          }}
                        />
                        {industry}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label>Current Portfolio Size *</label>
                  <select
                    required
                    value={formData.currentPortfolioSize}
                    onChange={(e) => setFormData({ ...formData, currentPortfolioSize: e.target.value })}
                  >
                    <option value="">Select portfolio size...</option>
                    <option value="<$100k">{"<"}$100k</option>
                    <option value="$100k-$500k">$100k - $500k</option>
                    <option value="$500k-$1M">$500k - $1M</option>
                    <option value="$1M+">$1M+</option>
                  </select>
                </div>
              </div>

              {/* Investment & Partnership Goals */}
              <div className="form-section">
                <h3 className="form-section-title">Investment & Partnership Goals</h3>
                <div className="form-field">
                  <label>Investment Capacity *</label>
                  <select
                    required
                    value={formData.investmentCapacity}
                    onChange={(e) => setFormData({ ...formData, investmentCapacity: e.target.value })}
                  >
                    <option value="">Select investment range...</option>
                    <option value="$5k-$25k">$5k - $25k</option>
                    <option value="$25k-$50k">$25k - $50k</option>
                    <option value="$50k-$100k">$50k - $100k</option>
                    <option value="$100k+">$100k+</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Why do you want to be a VP Partner? *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.partnershipGoals}
                    onChange={(e) => setFormData({ ...formData, partnershipGoals: e.target.value })}
                    placeholder="Tell us about your goals, experience, and why you're interested in the VP Partner tier..."
                  />
                </div>
              </div>

              {/* Team & Reach */}
              <div className="form-section">
                <h3 className="form-section-title">Team & Reach</h3>
                <div className="form-grid">
                  <div className="form-field">
                    <label>Team Size (optional)</label>
                    <input
                      type="text"
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      placeholder="e.g. 5 people"
                    />
                  </div>
                  <div className="form-field">
                    <label>Audience Size (optional)</label>
                    <input
                      type="text"
                      value={formData.audienceSize}
                      onChange={(e) => setFormData({ ...formData, audienceSize: e.target.value })}
                      placeholder="Social following, email list, network"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>How will you promote SaintSal? *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.referralStrategy}
                    onChange={(e) => setFormData({ ...formData, referralStrategy: e.target.value })}
                    placeholder="Describe your strategy for promoting SaintSal products to your network..."
                  />
                </div>
              </div>

              {/* Additional */}
              <div className="form-section">
                <h3 className="form-section-title">Additional Information</h3>
                <div className="form-field">
                  <label>Referred By (optional)</label>
                  <input
                    type="text"
                    value={formData.referredBy}
                    onChange={(e) => setFormData({ ...formData, referredBy: e.target.value })}
                    placeholder="Who referred you to this program?"
                  />
                </div>

                <div className="form-field">
                  <label>Additional Notes (optional)</label>
                  <textarea
                    rows={3}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="Anything else you'd like us to know?"
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
                {isSubmitting ? "Sending Application..." : "Submit for VP Consideration →"}
              </button>

              <p className="form-footer-note">
                Your application will be sent to support@cookin.io for manual review. We'll contact you within 24-48
                hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
