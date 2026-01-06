"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

export default function PartnerApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [affiliateData, setAffiliateData] = useState<{
    affiliateLink: string
    portalLink: string
  } | null>(null)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
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
        setAffiliateData({
          affiliateLink: data.affiliateLink || `https://saintsal.ai/?ref=${formData.email.split("@")[0]}`,
          portalLink: data.portalLink || "https://cookinpartners.com/portal",
        })
        setShowSuccess(true)
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

  if (showSuccess && affiliateData) {
    return (
      <div className="apply-page">
        <section className="partner-success-section">
          <div className="container">
            <div className="success-container">
              <div className="success-icon-large">🎉</div>
              <h1>
                You're In, <span className="gold">{formData.firstName}</span>!
              </h1>
              <p className="success-subtitle">Welcome to the CookinPartners family. Start earning immediately!</p>

              {/* Affiliate Link Box */}
              <div className="affiliate-link-box">
                <h2>🔗 Your Affiliate Link</h2>
                <div className="link-container">
                  <code className="affiliate-link">{affiliateData.affiliateLink}</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(affiliateData.affiliateLink)
                      alert("Link copied!")
                    }}
                    className="copy-btn"
                  >
                    📋 Copy
                  </button>
                </div>
                <p className="commission-highlight">
                  💰 You earn <strong>15% recurring commission</strong> on every sale!
                </p>
              </div>

              {/* Quick Start Steps */}
              <div className="quick-start-box">
                <h3>🚀 Start Earning Now</h3>
                <div className="quick-steps">
                  <div className="quick-step">
                    <span className="step-number">1</span>
                    <div>
                      <strong>Share Your Link Everywhere</strong>
                      <p>Social media, email signature, website, conversations</p>
                    </div>
                  </div>
                  <div className="quick-step">
                    <span className="step-number">2</span>
                    <div>
                      <strong>Track Your Progress</strong>
                      <p>Access your dashboard to see clicks, signups & earnings</p>
                    </div>
                  </div>
                  <div className="quick-step">
                    <span className="step-number">3</span>
                    <div>
                      <strong>Get Paid Every 15 Days</strong>
                      <p>Net-15 payouts directly to your preferred method</p>
                    </div>
                  </div>
                </div>
                <a
                  href={affiliateData.portalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portal-btn-main"
                >
                  🚀 Access Partner Dashboard
                </a>
              </div>

              {/* VP Upgrade Path */}
              <div className="vp-upgrade-box">
                <div className="vp-badge">👑 WANT MORE?</div>
                <h3>Apply for VP Status — Earn 25%</h3>
                <p>
                  As we process applications within <strong>72 hours</strong>, we review performance and can upgrade
                  qualified partners to VP status with <strong>25% commissions</strong>. Don't wait — start earning at
                  15% now while we evaluate your VP potential!
                </p>
                <div className="vp-benefits-mini">
                  <span>✓ 25% recurring commissions</span>
                  <span>✓ Sub-affiliate recruitment</span>
                  <span>✓ Priority support</span>
                  <span>✓ Exclusive training</span>
                </div>
                <Link href="/apply/vp" className="vp-apply-btn">
                  Apply for VP Status →
                </Link>
              </div>

              {/* Resources */}
              <div className="resources-box">
                <h3>📦 Marketing Resources</h3>
                <p>Get banners, email templates, and social media content to boost your promotions:</p>
                <Link href="/resources" className="resources-link">
                  Access Marketing Materials →
                </Link>
              </div>

              <Link href="/" className="back-home-link">
                ← Back to Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="apply-page">
      <section className="apply-hero-compact">
        <div className="container">
          <Link href="/apply" className="back-link">
            ← Back to Partnership Options
          </Link>
          <div className="hero-content-compact">
            <div className="tier-badge-hero partner-badge">⚡ INSTANT APPROVAL</div>
            <h1>Get Your Affiliate Link Now</h1>
            <p>Start earning 15% recurring commissions in under 2 minutes</p>
          </div>
        </div>
      </section>

      <section className="application-form-page">
        <div className="container-narrow">
          <div className="application-form-container streamlined">
            <div className="form-header">
              <h2>🚀 Quick Sign Up</h2>
              <p>Just the basics — get your link and start earning immediately</p>
            </div>

            <form onSubmit={handleSubmit} className="application-form simple-form">
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
                <label>Phone (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="form-field">
                <label>Company / Organization (Optional)</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your company name"
                />
              </div>

              {/* What You Get */}
              <div className="instant-benefits">
                <h4>What You Get Instantly:</h4>
                <ul>
                  <li>✓ Your unique affiliate tracking link</li>
                  <li>✓ 15% recurring commission on all referrals</li>
                  <li>✓ 90-day cookie tracking</li>
                  <li>✓ Access to partner dashboard</li>
                  <li>✓ Marketing materials & resources</li>
                </ul>
              </div>

              <button type="submit" className="submit-btn-main pulsing-btn" disabled={isSubmitting}>
                {isSubmitting ? "Creating Your Account..." : "Get My Affiliate Link →"}
              </button>

              <p className="form-footer-note">
                ✓ No approval wait • ✓ Start earning immediately • ✓ Upgrade to VP anytime
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
