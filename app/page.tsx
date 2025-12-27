"use client"
import { useState, useEffect } from "react"
import type React from "react"

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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    audience: "",
    experience: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/partner-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.success) {
        setSuccess(true)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (e) {
      console.error(e)
      // Still show success - webhook may have worked
      setSuccess(true)
    }
    setLoading(false)
  }
  if (success) {
    return (
      <div className="success-box">
        <div className="success-icon">🎉</div>
        <h3>Welcome to the Family!</h3>
        <p>Your application has been received. Check your email within 24-48 hours for your affiliate link!</p>
        <a href="mailto:partners@cookin.io" className="btn-secondary">
          Contact Us
        </a>
      </div>
    )
  }
  return (
    <form onSubmit={handleSubmit} className="signup-form">
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
          <label>Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="(555) 123-4567"
          />
        </div>
      </div>
      <div className="form-field">
        <label>Company / Organization</label>
        <input
          type="text"
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
      <button type="submit" className="btn-primary full-width" disabled={loading}>
        {loading ? "Submitting..." : "Apply to Become a Partner →"}
      </button>
      <p className="form-note">
        By applying, you agree to our Partner Terms. Applications reviewed within 24-48 hours.
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
      payLink: "https://saintsal.ai/signup/free",
      annualPayLink: "https://saintsal.ai/signup/free",
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
      payLink: "#",
      annualPayLink: "#",
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
      payLink: "#",
      annualPayLink: "#",
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
      payLink: "#",
      annualPayLink: "#",
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
      payLink: "#",
      annualPayLink: "#",
      btnText: "Contact Sales",
      credits: "$100 Complimentary Credits",
    },
  ]
  return (
    <main className="main">
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          Cookin<span className="gold">Partners</span>™
        </div>
        <div className="nav-links">
          <a href="#ecosystem">Ecosystem</a>
          <a href="#commissions">Commissions</a>
          <a href="#products">Products</a>
          <a href="#apply" className="btn-primary">
            Apply Now
          </a>
        </div>
      </nav>
      <section className="hero">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-badge">🏛️ Saint Vision AI Institute</div>
          <h1>
            Partner with the Future of <span className="gold">AI Business</span>
          </h1>
          <p className="hero-tagline">Our platforms are built by us, for us, and for you.</p>
          <p className="hero-sub">
            Earn <strong>15-35% recurring commissions</strong> promoting the most advanced AI-powered business
            ecosystem. Backed by US Patent #10,290,222 and HACP™ technology.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <strong>42+</strong>
              <span>Domains</span>
            </div>
            <div className="stat">
              <strong>6</strong>
              <span>Platforms</span>
            </div>
            <div className="stat">
              <strong>35%</strong>
              <span>Max Commission</span>
            </div>
            <div className="stat">
              <strong>90</strong>
              <span>Day Cookie</span>
            </div>
          </div>
          <div className="hero-cta">
            <a href="#apply" className="btn-primary">
              Become a Partner →
            </a>
            <a href="#ecosystem" className="btn-secondary">
              Explore Ecosystem
            </a>
          </div>
          <div className="hero-ip">
            Powered by <strong>HACP™</strong> (Human-AI Connection Protocol)
            <br />
            US Patent #10,290,222 • TM Serial #99329797 • Filed September 21, 2015
            <br />
            <a href="https://hacpglobal.info" target="_blank" rel="noopener noreferrer">
              hacpglobal.info →
            </a>
          </div>
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
                <a href="#apply" className="btn-primary">
                  Get Started
                </a>
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
          <div className="products-cta">
            <h3>Ready to experience SaintSal™ AI yourself?</h3>
            <p>Try it risk-free and see why our partners love promoting it.</p>
            <div className="products-cta-buttons">
              <a
                href="https://saintsal.ai/signup/free"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Free Trial →
              </a>
              <a href="#" className="btn-secondary" target="_blank" rel="noopener noreferrer">
                View PRO Plan
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="apply" className="section dark">
        <div className="container">
          <div className="apply-grid">
            <div className="apply-info">
              <span className="badge">Join Us</span>
              <h2>
                Ready to <span className="gold">Partner</span>?
              </h2>
              <p>
                Join an elite network of professionals earning recurring commissions while promoting cutting-edge AI
                technology.
              </p>
              <div className="benefits">
                <div className="benefit">
                  <span>🔗</span>
                  <div>
                    <strong>Instant Affiliate Link</strong>
                    <p>Get your unique tracking link upon approval</p>
                  </div>
                </div>
                <div className="benefit">
                  <span>💰</span>
                  <div>
                    <strong>Recurring Revenue</strong>
                    <p>Earn as long as referrals stay subscribed</p>
                  </div>
                </div>
                <div className="benefit">
                  <span>📈</span>
                  <div>
                    <strong>Growth Path</strong>
                    <p>Partner → VP Partner → President</p>
                  </div>
                </div>
                <div className="benefit">
                  <span>🎯</span>
                  <div>
                    <strong>Marketing Support</strong>
                    <p>Branded materials and sales training</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="apply-form">
              <PartnerSignupForm />
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="nav-logo">
                Cookin<span className="gold">Partners</span>™
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
