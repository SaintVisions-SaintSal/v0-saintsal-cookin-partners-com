"use client"
import Link from "next/link"

export default function ApplyPage() {
  return (
    <div className="apply-page">
      {/* Hero Section */}
      <section className="apply-hero">
        <div className="container">
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
          <div className="hero-content">
            <img src="/images/cookinpartnerslogo.jpeg" alt="CookinPartners Logo" className="hero-logo" />
            <span className="patent-badge">US Patent #10,290,222 | HACP™ Technology</span>
            <h1>
              Cookin<span className="gold">Partners</span>™
            </h1>
            <p className="hero-subtitle-large">Partner with the Saint Vision ecosystem</p>
          </div>
        </div>
      </section>

      {/* Ecosystem Showcase */}
      <section className="ecosystem-showcase">
        <div className="container">
          <div className="showcase-header">
            <span className="showcase-badge">Powered by HACP™ Technology</span>
            <h2 className="section-title">Join the SaintSal™ Revolution</h2>
            <p className="section-subtitle">
              Partner with the most innovative AI-powered ecosystem for Real Estate, Finance, and Business Growth.
              Protected by US Patent #10,290,222.
            </p>
            <p className="section-subtitle-sub">Powered by HACP™ Technology</p>
          </div>

          <div className="showcase-header ecosystem-header">
            <h2 className="section-title-secondary">The Complete SaintSal™ Ecosystem</h2>
            <p className="section-subtitle">
              Six revolutionary platforms unified by AI. One partnership unlocks everything.
            </p>
          </div>

          <div className="platforms-showcase-grid">
            {/* SaintSal AI */}
            <div className="platform-showcase-card primary">
              <div className="platform-badge">Core AI Platform</div>
              <div className="platform-icon-large">🤖</div>
              <h3>SaintSal™ AI</h3>
              <p className="platform-tagline">Your 24/7 AI Business Partner</p>
              <p className="platform-description">
                Next-generation AI assistant that understands real estate, finance, and business operations. Handles
                customer inquiries, generates content, and automates workflows.
              </p>
              <div className="platform-stats">
                <div className="stat">
                  <span className="stat-value">$27-$2,970</span>
                  <span className="stat-label">MONTHLY PLANS</span>
                </div>
                <div className="stat">
                  <span className="stat-value">15-25%</span>
                  <span className="stat-label">YOUR COMMISSION</span>
                </div>
              </div>
              <ul className="platform-features-list">
                <li>✓ CRM & Contact Management</li>
                <li>✓ Project & Task Tracking</li>
                <li>✓ Team Collaboration Tools</li>
                <li>✓ Business Analytics Dashboard</li>
              </ul>
            </div>

            {/* CookinBiz */}
            <div className="platform-showcase-card">
              <div className="platform-icon-large">🏢</div>
              <h3>CookinBiz</h3>
              <p className="platform-tagline">Complete Business Command Center</p>
              <p className="platform-description">
                All-in-one business management suite with CRM, project management, team collaboration, and advanced
                analytics. Built for entrepreneurs who need everything in one place.
              </p>
              <ul className="platform-features-list">
                <li>✓ CRM & Contact Management</li>
                <li>✓ Project & Task Tracking</li>
                <li>✓ Team Collaboration Tools</li>
                <li>✓ Business Analytics Dashboard</li>
              </ul>
            </div>

            {/* CookinCapital */}
            <div className="platform-showcase-card">
              <div className="platform-icon-large">💰</div>
              <h3>CookinCapital</h3>
              <p className="platform-tagline">Revolutionary Lending Platform</p>
              <p className="platform-description">
                Connect borrowers with capital sources instantly. AI-powered loan matching, automated underwriting, and
                instant approval process for real estate and business loans.
              </p>
              <ul className="platform-features-list">
                <li>✓ AI Loan Matching</li>
                <li>✓ Automated Underwriting</li>
                <li>✓ Instant Pre-Approvals</li>
                <li>✓ Multiple Lender Network</li>
              </ul>
            </div>

            {/* CookinHomes */}
            <div className="platform-showcase-card">
              <div className="platform-icon-large">🏘️</div>
              <h3>CookinHomes</h3>
              <p className="platform-tagline">AI-Powered Real Estate Platform</p>
              <p className="platform-description">
                Revolutionary platform for agents and homebuyers with AI-driven property search, market analysis, and
                automated lead generation.
              </p>
              <ul className="platform-features-list">
                <li>✓ AI Property Search</li>
                <li>✓ Market Analysis Tools</li>
                <li>✓ Lead Generation System</li>
                <li>✓ Client Management</li>
              </ul>
            </div>

            {/* CookinLeads */}
            <div className="platform-showcase-card">
              <div className="platform-icon-large">📊</div>
              <h3>CookinLeads</h3>
              <p className="platform-tagline">Intelligent Lead Generation System</p>
              <p className="platform-description">
                AI-powered lead generation, qualification, and nurturing that works 24/7 to convert prospects into
                customers.
              </p>
              <ul className="platform-features-list">
                <li>✓ Automated Lead Capture</li>
                <li>✓ AI Qualification</li>
                <li>✓ Multi-Channel Nurturing</li>
                <li>✓ Conversion Tracking</li>
              </ul>
            </div>

            {/* CookinMarketing */}
            <div className="platform-showcase-card">
              <div className="platform-icon-large">🎯</div>
              <h3>CookinMarketing</h3>
              <p className="platform-tagline">Automated Marketing Engine</p>
              <p className="platform-description">
                Launch professional marketing campaigns in minutes with AI-optimized email, social media, and content
                marketing.
              </p>
              <ul className="platform-features-list">
                <li>✓ Email Campaigns</li>
                <li>✓ Social Media Automation</li>
                <li>✓ Content Generation</li>
                <li>✓ Performance Analytics</li>
              </ul>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="value-proposition">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h4>One Partnership, Six Revenue Streams</h4>
              <p>
                Every customer you refer can use multiple products. More products = more commissions from each sale.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔄</div>
              <h4>Recurring Monthly Revenue</h4>
              <p>Earn 15-25% commissions every single month as long as your referrals stay subscribed.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h4>Market-Leading Technology</h4>
              <p>
                US Patent #10,290,222 protects our HACP™ technology. You're selling innovation that can't be copied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="application-section">
        <div className="container">
          <div className="tier-selection">
            <h2>Choose Your Partnership Level</h2>
            <p className="selection-subtitle">
              Start earning recurring commissions promoting cutting-edge AI technology
            </p>

            <div className="tier-cards-showcase">
              {/* Partner - MOST POPULAR */}
              <div className="tier-card-main featured-partner highlighted">
                <div className="popular-badge pulsing">⭐ MOST POPULAR - Start Today!</div>
                <div className="tier-header">
                  <div className="tier-icon-large">🤝</div>
                  <h2>Partner</h2>
                  <div className="commission-badge-large gold-shimmer">15%</div>
                  <p className="commission-label">recurring commissions</p>
                </div>
                <p className="tier-tagline">Entry level • Start earning immediately</p>

                <ul className="tier-benefits-expanded">
                  <li>
                    <span className="check-icon">✓</span>
                    <div>
                      <strong>Instant affiliate link</strong>
                      <span className="benefit-detail">Get your tracking link immediately</span>
                    </div>
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    <div>
                      <strong>90-day cookie tracking</strong>
                      <span className="benefit-detail">Long attribution window</span>
                    </div>
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    <div>
                      <strong>Net-15 payouts</strong>
                      <span className="benefit-detail">Get paid every 15 days</span>
                    </div>
                  </li>
                  <li>
                    <span className="check-icon">✓</span>
                    <div>
                      <strong>Marketing materials</strong>
                      <span className="benefit-detail">Banners, emails, social content</span>
                    </div>
                  </li>
                </ul>

                <a
                  href="https://saint-vision-technologies-llc.getrewardful.com/signup?campaign=saintsal-labs-partner-prgm-15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tier-btn-main cta-join-now pulsing-btn"
                >
                  Get Your Affiliate Link Now →
                </a>

                <p className="instant-approval-note highlight">✓ Auto-approved • Start earning in 5 minutes</p>
              </div>

              {/* VP Partner - LIMITED */}
              <div className="tier-card-secondary">
                <div className="exclusive-badge">Limited Availability</div>
                <div className="tier-header-compact">
                  <div className="tier-icon">👑</div>
                  <h3>VP Partner</h3>
                  <div className="commission-badge gold">25%</div>
                  <p className="commission-label-small">recurring commissions</p>
                </div>
                <p className="tier-description-compact">Leadership tier • Application required</p>

                <ul className="tier-benefits-compact">
                  <li>
                    <span className="check">✓</span> Everything in Partner
                  </li>
                  <li>
                    <span className="check">✓</span> Sub-affiliate recruitment
                  </li>
                  <li>
                    <span className="check">✓</span> Priority support
                  </li>
                  <li>
                    <span className="check">✓</span> Exclusive training
                  </li>
                </ul>

                <Link href="/apply/vp" className="tier-btn-secondary">
                  Apply for VP Role →
                </Link>

                <p className="limited-note">Manual review required • Very limited spots</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="why-partner">
        <div className="container">
          <h2>Why Partner with SaintSal™?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">💸</div>
              <h3>Recurring Revenue</h3>
              <p>Earn as long as referrals stay subscribed</p>
              <span className="benefit-highlight">15% recurring commissions</span>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📈</div>
              <h3>Growth Path</h3>
              <p>Start as Partner, grow to VP with proven results</p>
              <span className="benefit-highlight">Performance-based advancement</span>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>Marketing Support</h3>
              <p>Branded materials and sales training</p>
              <span className="benefit-highlight">Professional assets provided</span>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">⚡</div>
              <h3>Instant Affiliate Link</h3>
              <p>Get your unique tracking link upon approval</p>
              <span className="benefit-highlight">Start promoting immediately</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-horizontal">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand-compact">
              <div className="footer-logo-text">
                Cookin<span className="gold">Partners</span>™
              </div>
              <p className="footer-tagline">Saint Vision Technologies LLC</p>
            </div>

            <div className="footer-links-horizontal">
              <div className="footer-group">
                <h4>Platforms</h4>
                <a href="https://saintsal.ai" target="_blank" rel="noopener noreferrer">
                  SaintSal AI
                </a>
                <a href="https://cookinbiz.com" target="_blank" rel="noopener noreferrer">
                  CookinBiz
                </a>
                <a href="https://cookincapital.com" target="_blank" rel="noopener noreferrer">
                  CookinCapital
                </a>
              </div>
              <div className="footer-group">
                <h4>Resources</h4>
                <Link href="/apply">Become a Partner</Link>
                <a href="https://cookinpartners.com/portal" target="_blank" rel="noopener noreferrer">
                  Partner Login
                </a>
                <a href="mailto:partners@cookin.io">Contact Us</a>
              </div>
              <div className="footer-group">
                <h4>Contact</h4>
                <a href="mailto:partners@cookin.io">partners@cookin.io</a>
                <a href="mailto:support@saintvision.io">support@saintvision.io</a>
              </div>
            </div>

            <div className="footer-ip-compact">
              <strong>HACP™</strong> US Patent #10,290,222
              <br />
              <a href="https://hacpglobal.info" target="_blank" rel="noopener noreferrer">
                hacpglobal.info
              </a>
            </div>
          </div>
          <div className="footer-bottom-horizontal">
            <p>© 2025 Saint Vision Technologies LLC. All rights reserved.</p>
            <p>Responsible Intelligence First — Faith-Based Software</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
