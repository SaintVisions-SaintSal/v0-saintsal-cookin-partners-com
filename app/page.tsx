"use client"
import { useState, useEffect } from "react"
import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { captureGHLParams, storeGHLParams, retrieveGHLParams } from "@/lib/ghl-tracking"

function CommissionCalculator() {
  const [tier, setTier] = useState("partner")
  const [product, setProduct] = useState(97)
  const [referrals, setReferrals] = useState(10)
  const rates: Record<string, number> = { partner: 0.15, vp: 0.25, president: 0.35 }
  const monthly = product * rates[tier] * referrals
  const yearly = monthly * 12
  return (
    <div className="calc-container">
      <h3>💰 Commission Calculator</h3>
      <div className="calc-grid">
        <div className="calc-field">
          <label>Your Tier</label>
          <select value={tier} onChange={(e) => setTier(e.target.value)}>
            <option value="partner">Partner (15%)</option>
            <option value="vp">VP Partner (25%)</option>
            <option value="president">President (35%)</option>
          </select>
        </div>
        <div className="calc-field">
          <label>Product Price</label>
          <select value={product} onChange={(e) => setProduct(Number(e.target.value))}>
            <option value={27}>Starter - $27/mo</option>
            <option value={97}>PRO - $97/mo</option>
            <option value={297}>Teams - $297/mo</option>
            <option value={497}>Enterprise - $497/mo</option>
          </select>
        </div>
        <div className="calc-field">
          <label>Monthly Referrals</label>
          <input
            type="number"
            value={referrals}
            onChange={(e) => setReferrals(Number(e.target.value))}
            min="1"
            max="1000"
          />
        </div>
      </div>
      <div className="calc-results">
        <div className="calc-result">
          <span>Monthly Recurring</span>
          <strong>${monthly.toLocaleString()}</strong>
        </div>
        <div className="calc-result">
          <span>Annual Earnings</span>
          <strong>${yearly.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  )
}

function PartnerSignupForm() {
  const [applicationType, setApplicationType] = useState<"partner" | "vp" | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    audience: "",
    experience: "",
    payoutMethod: "",
    paypalEmail: "",
    venmoHandle: "",
    cashappHandle: "",
    bankAccountName: "",
    bankRoutingNumber: "",
    bankAccountNumber: "",
    taxId: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    tiktok: "",
    youtube: "",
    followerCount: "",
    portfolioUrl: "",
    socialExperience: "",
    marketingStrategy: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const params = captureGHLParams()
    if (Object.keys(params).length > 0) {
      console.log("[v0] Captured GHL tracking params:", params)
      storeGHLParams(params)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const trackingParams = retrieveGHLParams()

    try {
      const response = await fetch("/api/partner-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          applicationType,
          tracking: trackingParams, // Include tracking data
        }),
      })
      const data = await response.json()
      if (data.success) {
        const params = new URLSearchParams()
        params.set("type", applicationType || "partner")
        if (data.affiliateLink) {
          params.set("affiliateLink", data.affiliateLink)
        }
        window.location.href = `/thank-you?${params.toString()}`
      } else {
        setError(data.message || "Something went wrong. Please try again.")
      }
    } catch (e) {
      console.error("[v0] Signup error:", e)
      setError("Network error. Please try again.")
    }
    setLoading(false)
  }

  const renderApplicationTypeSelector = () => {
    return (
      <div className="application-type-selector">
        <h3 className="selector-title">Choose Your Partnership Level</h3>
        <p className="selector-subtitle">Select the tier that matches your goals and experience</p>
        <div className="type-cards">
          <div
            className={`type-card ${applicationType === "partner" ? "selected" : ""}`}
            onClick={() => setApplicationType("partner")}
          >
            <div className="type-icon">🤝</div>
            <h4>Partner</h4>
            <div className="commission-badge">15% Commission</div>
            <p className="type-description">Perfect for getting started quickly</p>
            <ul className="type-features">
              <li>
                <span className="checkmark">✓</span> Instant approval & affiliate link
              </li>
              <li>
                <span className="checkmark">✓</span> 15% recurring commissions
              </li>
              <li>
                <span className="checkmark">✓</span> Marketing materials provided
              </li>
              <li>
                <span className="checkmark">✓</span> Monthly payouts (Net-15)
              </li>
            </ul>
            <button
              type="button"
              className="btn-select"
              onClick={(e) => {
                e.stopPropagation()
                setApplicationType("partner")
              }}
            >
              {applicationType === "partner" ? "Selected ✓" : "Select Partner"}
            </button>
          </div>

          <div
            className={`type-card featured ${applicationType === "vp" ? "selected" : ""}`}
            onClick={() => setApplicationType("vp")}
          >
            <div className="premium-badge">Premium Tier</div>
            <div className="type-icon">👑</div>
            <h4>VP Position</h4>
            <div className="commission-badge gold">25-35% Commission</div>
            <p className="type-description">Leadership role with maximum earnings</p>
            <ul className="type-features">
              <li>
                <span className="checkmark">✓</span> 25-35% recurring commissions
              </li>
              <li>
                <span className="checkmark">✓</span> Dedicated support manager
              </li>
              <li>
                <span className="checkmark">✓</span> Custom co-branded materials
              </li>
              <li>
                <span className="checkmark">✓</span> Priority payouts & bonuses
              </li>
            </ul>
            <button
              type="button"
              className="btn-select gold"
              onClick={(e) => {
                e.stopPropagation()
                setApplicationType("vp")
              }}
            >
              {applicationType === "vp" ? "Selected ✓" : "Select VP Role"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!applicationType) {
    return renderApplicationTypeSelector()
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <button type="button" onClick={() => setApplicationType(null)} className="back-button">
        ← Change Application Type
      </button>

      <h3>{applicationType === "vp" ? "VP Position Application" : "Partner Application"}</h3>

      <div className="form-row">
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
      <div className="form-row">
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
        <select value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })}>
          <option value="">Select experience level...</option>
          <option value="none">New to Affiliate Marketing</option>
          <option value="some">Some Experience (1-2 years)</option>
          <option value="experienced">Experienced (3+ years)</option>
          <option value="professional">Professional Affiliate</option>
        </select>
      </div>

      <div className="section-divider">
        <h4>💳 Payout Information</h4>
        <p className="small-text">How would you like to receive your commissions?</p>
      </div>

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
          <option value="bank">Direct Deposit (ACH)</option>
          <option value="check">Check (Mail)</option>
        </select>
      </div>

      {formData.payoutMethod === "paypal" && (
        <div className="form-field">
          <label>PayPal Email *</label>
          <input
            type="email"
            required
            value={formData.paypalEmail}
            onChange={(e) => setFormData({ ...formData, paypalEmail: e.target.value })}
            placeholder="your@paypal.com"
          />
        </div>
      )}

      {formData.payoutMethod === "venmo" && (
        <div className="form-field">
          <label>Venmo Username *</label>
          <input
            type="text"
            required
            value={formData.venmoHandle}
            onChange={(e) => setFormData({ ...formData, venmoHandle: e.target.value })}
            placeholder="@yourvenmo"
          />
        </div>
      )}

      {formData.payoutMethod === "cashapp" && (
        <div className="form-field">
          <label>Cash App Username *</label>
          <input
            type="text"
            required
            value={formData.cashappHandle}
            onChange={(e) => setFormData({ ...formData, cashappHandle: e.target.value })}
            placeholder="$yourcashapp"
          />
        </div>
      )}

      {formData.payoutMethod === "bank" && (
        <>
          <div className="form-field">
            <label>Account Holder Name *</label>
            <input
              type="text"
              required
              value={formData.bankAccountName}
              onChange={(e) => setFormData({ ...formData, bankAccountName: e.target.value })}
              placeholder="Full name on account"
            />
          </div>
          <div className="form-row">
            <div className="form-field">
              <label>Routing Number *</label>
              <input
                type="text"
                required
                pattern="[0-9]{9}"
                value={formData.bankRoutingNumber}
                onChange={(e) => setFormData({ ...formData, bankRoutingNumber: e.target.value })}
                placeholder="123456789"
              />
            </div>
            <div className="form-field">
              <label>Account Number *</label>
              <input
                type="text"
                required
                value={formData.bankAccountNumber}
                onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                placeholder="Account number"
              />
            </div>
          </div>
        </>
      )}

      <div className="form-field">
        <label>Tax ID / SSN (Optional)</label>
        <input
          type="text"
          value={formData.taxId}
          onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
          placeholder="For 1099 tax reporting (US only)"
        />
        <p className="field-note">Required for US partners earning over $600/year</p>
      </div>

      {applicationType === "vp" && (
        <>
          <div className="section-divider">
            <h4>Social Media Presence</h4>
            <p className="small-text">Provide your social media profiles and experience</p>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>Instagram Handle</label>
              <input
                type="text"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="@yourusername"
              />
            </div>
            <div className="form-field">
              <label>Facebook Profile/Page</label>
              <input
                type="text"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                placeholder="facebook.com/yourpage"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>LinkedIn Profile</label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="linkedin.com/in/yourname"
              />
            </div>
            <div className="form-field">
              <label>Twitter/X Handle</label>
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                placeholder="@yourusername"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label>TikTok Handle</label>
              <input
                type="text"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                placeholder="@yourusername"
              />
            </div>
            <div className="form-field">
              <label>YouTube Channel</label>
              <input
                type="text"
                value={formData.youtube}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                placeholder="youtube.com/@channel"
              />
            </div>
          </div>

          <div className="form-field">
            <label>Total Combined Followers/Reach *</label>
            <select
              required
              value={formData.followerCount}
              onChange={(e) => setFormData({ ...formData, followerCount: e.target.value })}
            >
              <option value="">Select your reach...</option>
              <option value="1k-10k">1,000 - 10,000</option>
              <option value="10k-50k">10,000 - 50,000</option>
              <option value="50k-100k">50,000 - 100,000</option>
              <option value="100k-500k">100,000 - 500,000</option>
              <option value="500k+">500,000+</option>
            </select>
          </div>

          <div className="form-field">
            <label>Portfolio/Website URL</label>
            <input
              type="url"
              value={formData.portfolioUrl}
              onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div className="form-field">
            <label>Social Media Marketing Experience *</label>
            <textarea
              required
              value={formData.socialExperience}
              onChange={(e) => setFormData({ ...formData, socialExperience: e.target.value })}
              placeholder="Describe your experience with social media marketing, influencer partnerships, brand collaborations, etc."
              rows={4}
            />
          </div>

          <div className="form-field">
            <label>How Will You Promote SaintSal™? *</label>
            <textarea
              required
              value={formData.marketingStrategy}
              onChange={(e) => setFormData({ ...formData, marketingStrategy: e.target.value })}
              placeholder="Share your strategy for promoting SaintSal™ products to your audience..."
              rows={4}
            />
          </div>
        </>
      )}

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="btn-primary full-width" disabled={loading}>
        {loading ? "Submitting..." : applicationType === "vp" ? "Submit VP Application →" : "Get My Affiliate Link →"}
      </button>
      <p className="form-note">
        {applicationType === "vp"
          ? "VP applications are reviewed by our team and sent to support@cookin.io. You'll hear back within 24-48 hours."
          : "Partner accounts are approved instantly. You'll receive your affiliate link immediately!"}
      </p>
    </form>
  )
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const platforms = [
    { name: "SaintSal™ AI", desc: "Multi-model AI orchestration platform", icon: "🤖", color: "#D4AF37" },
    { name: "CookinBiz", desc: "Business automation & tools", icon: "💼", color: "#3b82f6" },
    { name: "CookinCapital", desc: "Commercial lending brokerage", icon: "💰", color: "#22c55e" },
    { name: "CookinTraining", desc: "Professional education courses", icon: "📚", color: "#9333ea" },
    { name: "FlipEffective", desc: "Real estate investment tools", icon: "🏠", color: "#ef4444" },
    { name: "AthenAI Legal", desc: "AI-powered legal assistance", icon: "⚖️", color: "#06b6d4" },
  ]
  const tiers = [
    {
      name: "Partner",
      rate: "15%",
      desc: "Entry level • Start earning immediately",
      features: ["Unique affiliate link", "90-day cookie tracking", "Net-15 payouts", "Marketing materials"],
      featured: false,
    },
    {
      name: "VP Partner",
      rate: "25%",
      desc: "Leadership tier • Recruit sub-affiliates",
      features: ["Everything in Partner", "Sub-affiliate recruitment", "Priority support", "Exclusive training"],
      featured: true,
    },
    {
      name: "President",
      rate: "35%",
      desc: "Invite only • Inner circle",
      features: ["Everything in VP", "Highest commission", "Direct founder access", "Custom deals"],
      featured: false,
    },
  ]
  const products = [
    {
      name: "FREE",
      price: "$0",
      annualPrice: "$0",
      period: "/mo",
      c15: "$0",
      c25: "$0",
      c35: "$0",
      pop: false,
      payLink: "https://cookinpartners.com/cookinpartnerscom?am_id={{affiliate_id}}&product=free",
      annualPayLink: "https://cookinpartners.com/cookinpartnerscom?am_id={{affiliate_id}}&product=free",
      btnText: "Get Started Free",
    },
    {
      name: "Starter",
      price: "$27",
      annualPrice: "$270",
      period: "/mo",
      c15: "$4.05",
      c25: "$6.75",
      c35: "$9.45",
      pop: false,
      payLink: "https://cookinpartners.com/cookinpartnerscom?am_id={{affiliate_id}}&product=starter-monthly",
      annualPayLink: "https://cookinpartners.com/cookinpartnerscom?am_id={{affiliate_id}}&product=starter-annual",
      btnText: "Subscribe Now",
    },
    {
      name: "PRO",
      price: "$97",
      annualPrice: "$970",
      period: "/mo",
      c15: "$14.55",
      c25: "$24.25",
      c35: "$33.95",
      pop: true,
      payLink: "https://cookinpartners.com/cookinpartnerscom?am_id={{affiliate_id}}&product=pro-monthly",
      annualPayLink: "https://cookinpartners.com/cookinpartnerscom?am_id={{affiliate_id}}&product=pro-annual",
      btnText: "Subscribe Now",
    },
    {
      name: "Teams",
      price: "$297",
      annualPrice: "$2,970",
      period: "/mo",
      c15: "$44.55",
      c25: "$74.25",
      c35: "$103.95",
      pop: false,
      payLink: "https://cookinpartners.com/cookinpartnerscom?am_id={{affiliate_id}}&product=teams-monthly",
      annualPayLink: "https://cookinpartners.com/cookinpartnerscom?am_id={{affiliate_id}}&product=teams-annual",
      btnText: "Subscribe Now",
    },
    {
      name: "Enterprise",
      price: "$497",
      annualPrice: "$4,970",
      period: "/mo",
      c15: "$74.55",
      c25: "$124.25",
      c35: "$173.95",
      pop: false,
      payLink: "https://cookinpartners.com/cookinpartnerscom?am_id={{affiliate_id}}&product=enterprise-monthly",
      annualPayLink: "https://cookinpartners.com/cookinpartnerscom?am_id={{affiliate_id}}&product=enterprise-annual",
      btnText: "Contact Sales",
      credits: "$100 Complimentary Credits",
    },
  ]

  return (
    <main className="main">
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          <Image
            src="/images/cookinpartners-logo.png"
            alt="CookinPartners Logo"
            width={50}
            height={50}
            className="logo-image"
          />
          <span>
            Cookin<span className="gold">Partners</span>™
          </span>
        </div>
        <div className="nav-links">
          <a href="#ecosystem">Ecosystem</a>
          <a href="#commissions">Commissions</a>
          <a href="#products">Products</a>
          <Link href="/apply" className="btn-primary">
            Apply Now
          </Link>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-logo">
            <Image src="/images/cookinpartnerslogo.jpeg" alt="CookinPartners Logo" width={120} height={120} priority />
          </div>

          <div className="hero-badge">US Patent #10,290,222 | HACP™ Technology</div>

          <h1>
            <span className="gold">CookinPartners™</span>
          </h1>
          <p className="hero-tagline">Partner with the Saint Vision ecosystem</p>
          <p className="hero-sub">
            Join an elite network of professionals earning recurring commissions while promoting cutting-edge AI
            technology. Partner program for Real Estate Brokers, Fund Managers, Realtors, Loan Officers. Powered by US
            Patent #10,290,222.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <strong>15-35%</strong>
              <span>Commission</span>
            </div>
            <div className="stat">
              <strong>Recurring</strong>
              <span>Revenue</span>
            </div>
            <div className="stat">
              <strong>9</strong>
              <span>Products</span>
            </div>
          </div>

          <div className="hero-cta">
            <Link href="/apply" className="btn-primary">
              Apply Now →
            </Link>
            <Link href="#ecosystem" className="btn-secondary">
              Explore Ecosystem
            </Link>
          </div>

          <p className="hero-ip">
            Protected by{" "}
            <a href="https://patents.google.com/patent/US10290222B2" target="_blank" rel="noopener noreferrer">
              US Patent #10,290,222
            </a>
            <br />
            The HACP™ (Hyperlocal Automated Cross Platform) technology powers the entire Saint Vision ecosystem
          </p>
        </div>
      </section>
      <section id="ecosystem" className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge">The Ecosystem</span>
            <h2>
              What You&apos;ll <span className="gold">Represent</span>
            </h2>
            <p>Six integrated platforms serving entrepreneurs, investors, and professionals worldwide.</p>
          </div>
          <div className="platforms-grid">
            {platforms.map((p, i) => (
              <div key={i} className="platform-card" style={{ "--accent": p.color } as React.CSSProperties}>
                <div className="platform-icon">{p.icon}</div>
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="commissions" className="section dark">
        <div className="container">
          <div className="section-header">
            <span className="badge">Partner Tiers</span>
            <h2>
              Earn <span className="gold">Recurring</span> Commissions
            </h2>
            <p>Three tiers designed to reward growth and leadership.</p>
          </div>
          <div className="tiers-grid">
            {tiers.map((t, i) => (
              <div key={i} className={`tier-card ${t.featured ? "featured" : ""}`}>
                {t.featured && <div className="tier-badge">Most Popular</div>}
                <h3>{t.name}</h3>
                <div className="tier-rate">{t.rate}</div>
                <p className="tier-desc">{t.desc}</p>
                <ul>
                  {t.features.map((f, j) => (
                    <li key={j}>✓ {f}</li>
                  ))}
                </ul>
                <Link href="/apply" className="btn-primary">
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <CommissionCalculator />
        </div>
      </section>
      <section id="products" className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge">Products</span>
            <h2>
              What You&apos;ll <span className="gold">Promote</span>
            </h2>
            <p>SaintSal™ AI Platform - Five tiers for every customer.</p>
          </div>
          <div className="products-table">
            <div className="products-header">
              <div>Product</div>
              <div>Monthly Price</div>
              <div>Annual Price</div>
              <div>Partner (15%)</div>
              <div>VP (25%)</div>
              <div>President (35%)</div>
              <div>Action</div>
            </div>
            {products.map((p, i) => (
              <div key={i} className={`products-row ${p.pop ? "popular" : ""}`}>
                <div>
                  <strong>SaintSal™ {p.name}</strong>
                  {p.credits && <div className="credits-badge">{p.credits}</div>}
                </div>
                <div>
                  {p.price}
                  <span>{p.period}</span>
                </div>
                <div>
                  {p.annualPrice}
                  <span>/yr</span>
                </div>
                <div className="commission">{p.c15}</div>
                <div className="commission">{p.c25}</div>
                <div className="commission gold">{p.c35}</div>
                <div>
                  <div className="payment-buttons">
                    <a
                      href={p.payLink}
                      className="btn-product btn-product-monthly"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Monthly →
                    </a>
                    {p.name !== "FREE" && (
                      <a
                        href={p.annualPayLink}
                        className="btn-product btn-product-annual"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Annual →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="products-note">
            All commissions are <strong>recurring</strong> - you earn every month your referral stays subscribed!
          </p>
        </div>
      </section>
      {/* Apply Section - Simplified CTA */}
      <section id="apply" className="section">
        <div className="container">
          <div className="products-cta">
            <h3>Ready to Start Earning?</h3>
            <p>Join the CookinPartners program today and get instant access to your affiliate link</p>
            <div className="products-cta-buttons">
              <Link href="/apply" className="btn-primary">
                Apply Now - Get Instant Link →
              </Link>
              <a
                href="https://cookinpartners.com/portal"
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Partner Login
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="footer-logo-container">
                <Image src="/images/cookinpartners-logo.png" alt="CookinPartners Logo" width={60} height={60} />
                <div className="nav-logo">
                  Cookin<span className="gold">Partners</span>™
                </div>
              </div>
              <p>The official partner program of Saint Vision Technologies LLC.</p>
              <div className="footer-ip">
                <strong>HACP™</strong> Human-AI Connection Protocol
                <br />
                US Patent #10,290,222 • TM Serial #99329797
                <br />
                <a href="https://hacpglobal.info">hacpglobal.info</a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4>Platforms</h4>
                <a href="https://saintsal.ai">SaintSal™ AI</a>
                <a href="https://cookinbiz.com">CookinBiz</a>
                <a href="https://cookincapital.com">CookinCapital</a>
                <a href="https://cookintraining.com">CookinTraining</a>
              </div>
              <div className="footer-col">
                <h4>Resources</h4>
                <a href="#">Partner Handbook</a>
                <a href="#">Marketing Materials</a>
                <a href="#">Terms & Conditions</a>
              </div>
              <div className="footer-col">
                <h4>Contact</h4>
                <a href="mailto:partners@cookin.io">partners@cookin.io</a>
                <a href="mailto:support@saintvision.io">support@saintvision.io</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 Saint Vision Technologies LLC. All rights reserved.</p>
            <p>Responsible Intelligence First — Faith-Based Software</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
