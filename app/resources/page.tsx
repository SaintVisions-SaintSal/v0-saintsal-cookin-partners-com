"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

// Marketing assets data
const marketingAssets = [
  {
    id: "logo-dark",
    name: "CookinPartners Logo (Dark)",
    type: "Logo",
    format: "PNG",
    size: "2400x2400",
    url: "/images/cookinpartners-logo.png",
    thumbnail: "/images/cookinpartners-logo.png",
  },
  {
    id: "logo-saintsal",
    name: "SaintSal Logo",
    type: "Logo",
    format: "PNG",
    size: "1200x1200",
    url: "/images/saintsal-logo.png",
    thumbnail: "/images/saintsal-logo.png",
  },
  {
    id: "banner-partner",
    name: "Partner Referral Banner",
    type: "Banner",
    format: "PNG",
    size: "1920x1080",
    url: "/images/partner-banner.png",
    thumbnail: "/gold-partner-referral-banner-cookinpartners.jpg",
  },
  {
    id: "social-square",
    name: "Social Media Square",
    type: "Social",
    format: "PNG",
    size: "1080x1080",
    url: "/images/social-square.png",
    thumbnail: "/gold-social-media-square-saintsal-ai.jpg",
  },
  {
    id: "story-template",
    name: "Instagram Story Template",
    type: "Social",
    format: "PNG",
    size: "1080x1920",
    url: "/images/story-template.png",
    thumbnail: "/instagram-story-template-gold-ai-assistant.jpg",
  },
  {
    id: "email-header",
    name: "Email Header Banner",
    type: "Email",
    format: "PNG",
    size: "600x200",
    url: "/images/email-header.png",
    thumbnail: "/email-header-banner-gold-cookinpartners.jpg",
  },
]

// Pre-built social media post templates
const postTemplates = [
  {
    id: "intro",
    platform: "LinkedIn",
    title: "Partner Introduction",
    content: `🚀 Excited to announce my partnership with @SaintSal - the AI platform revolutionizing real estate, finance, and business operations!

As an official CookinPartner, I'm helping professionals like you access cutting-edge AI technology protected by US Patent #10,290,222.

💰 What SaintSal offers:
• 24/7 AI Business Assistant
• Automated Lead Generation
• Smart Document Processing
• Real-time Market Analysis

Ready to transform your business? Use my link below to get started:
[YOUR AFFILIATE LINK]

#AI #RealEstate #BusinessAutomation #SaintSal #Innovation`,
    hashtags: ["AI", "RealEstate", "BusinessAutomation", "SaintSal", "Innovation"],
  },
  {
    id: "testimonial",
    platform: "Instagram",
    title: "Client Success Story",
    content: `My clients are seeing REAL results with SaintSal AI! 🔥

One agent closed 3 more deals last month using the automated follow-up system.

The AI handles:
✅ Lead nurturing
✅ Appointment scheduling  
✅ Document preparation
✅ Market analysis

This is the future of real estate & business. Don't get left behind.

Link in bio to start your free trial 👆

#RealEstateAgent #AITechnology #BusinessGrowth #SaintSal`,
    hashtags: ["RealEstateAgent", "AITechnology", "BusinessGrowth", "SaintSal"],
  },
  {
    id: "feature",
    platform: "Twitter/X",
    title: "Feature Highlight",
    content: `SaintSal AI just saved me 10+ hours this week 🤯

The automated underwriting feature analyzed 47 loan applications while I focused on closing deals.

This is what happens when you have US Patent #10,290,222 technology working for you.

Try it yourself: [YOUR AFFILIATE LINK]`,
    hashtags: ["AI", "Automation", "Productivity"],
  },
  {
    id: "comparison",
    platform: "Facebook",
    title: "Before vs After",
    content: `BEFORE SaintSal:
❌ 60+ hours/week on admin tasks
❌ Missing leads while busy
❌ Manual document processing
❌ No time for client relationships

AFTER SaintSal:
✅ AI handles 80% of admin work
✅ 24/7 automated lead response
✅ Instant document analysis
✅ More time with clients = More closings

The difference? AI technology that actually works.

Get started with my partner link: [YOUR AFFILIATE LINK]`,
    hashtags: ["BusinessTransformation", "AI", "WorkSmarter"],
  },
]

// Platform info for showcase
const platforms = [
  {
    id: "saintsal",
    name: "SaintSal.ai",
    tagline: "Your 24/7 AI Business Partner",
    description:
      "Next-generation AI assistant that understands real estate, finance, and business operations. Handles customer inquiries, generates content, and automates workflows.",
    features: ["AI-Powered Conversations", "Lead Generation", "Document Analysis", "Market Insights"],
    url: "https://saintsal.ai",
    color: "#d4af37",
    primary: true,
  },
  {
    id: "saintcardx",
    name: "SaintCardX",
    tagline: "Digital Business Cards & Chrome Extension",
    description:
      "Create stunning digital business cards and supercharge your browser with the SaintSal Chrome extension for instant AI assistance anywhere.",
    features: ["Digital Business Cards", "Chrome Extension", "Contact Sharing", "Analytics Dashboard"],
    url: "https://saintcardx.com",
    color: "#9333ea",
    primary: false,
  },
  {
    id: "cookincapital",
    name: "CookinCapital",
    tagline: "AI-Powered Lending Brokerage",
    description:
      "Connect borrowers with capital sources instantly. AI-powered loan matching, automated underwriting, and instant approval process for real estate and business loans.",
    features: ["AI Loan Matching", "Automated Underwriting", "Instant Pre-Approvals", "Multiple Lender Network"],
    url: "https://cookincapital.ai",
    color: "#22c55e",
    primary: false,
  },
  {
    id: "cookinsaints",
    name: "CookinSaints",
    tagline: "Real Estate Investment Community",
    description:
      "Join an exclusive community of real estate investors. Access deals, network with like-minded investors, and grow your portfolio.",
    features: ["Investment Community", "Deal Flow Access", "Networking", "Education Resources"],
    url: "https://cookinsaints.com",
    color: "#3b82f6",
    primary: false,
  },
  {
    id: "cookinflips",
    name: "CookinFlips",
    tagline: "Real Estate Investment Tools",
    description:
      "Find, analyze, and flip properties with AI-powered tools. Access exclusive deals and streamline your investment process.",
    features: ["Deal Analysis", "Property Search", "ROI Calculator", "Market Data"],
    url: "https://cookinflips.com",
    color: "#ef4444",
    primary: false,
  },
  {
    id: "ghl",
    name: "GoHighLevel",
    tagline: "Your Partner Command Center",
    description:
      "All-in-one business management suite with CRM, project management, team collaboration, and advanced analytics. Where all your partner activities and commissions are tracked.",
    features: ["CRM Dashboard", "Commission Tracking", "Automated Workflows", "Client Management"],
    url: "https://app.gohighlevel.com",
    color: "#10b981",
    primary: false,
  },
]

export default function ResourcesPage() {
  const [selectedPost, setSelectedPost] = useState(postTemplates[0])
  const [affiliateLink, setAffiliateLink] = useState("")
  const [generatedPost, setGeneratedPost] = useState("")
  const [copied, setCopied] = useState(false)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const generatePost = () => {
    const post = selectedPost.content.replace("[YOUR AFFILIATE LINK]", affiliateLink || "[YOUR AFFILIATE LINK]")
    setGeneratedPost(post)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedPost || selectedPost.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadAsset = async (asset: (typeof marketingAssets)[0]) => {
    setDownloadingId(asset.id)
    try {
      const response = await fetch(asset.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${asset.name.replace(/\s+/g, "-").toLowerCase()}.${asset.format.toLowerCase()}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Download failed:", error)
    }
    setDownloadingId(null)
  }

  return (
    <main className="resources-page">
      {/* Navigation */}
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
            <Link href="/#commissions">Commissions</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/apply" className="btn-primary small">
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="resources-hero">
        <div className="hero-glow" />
        <div className="container">
          <div className="resources-hero-content">
            <span className="badge">Partner Resources</span>
            <h1>
              Marketing <span className="gold">Toolkit</span>
            </h1>
            <p className="hero-sub">
              Everything you need to promote SaintSal and earn commissions. Download assets, generate posts, and track
              your success.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="section dark">
        <div className="container">
          <div className="section-header">
            <span className="badge">The Ecosystem</span>
            <h2>
              Platforms You're <span className="gold">Promoting</span>
            </h2>
            <p>Understand what you're selling to maximize your conversions</p>
          </div>

          <div className="platforms-showcase">
            {platforms.map((platform) => (
              <div key={platform.id} className={`platform-showcase-card ${platform.primary ? "primary" : ""}`}>
                {platform.primary && <span className="platform-badge">Main Focus</span>}
                <h3 style={{ color: platform.color }}>{platform.name}</h3>
                <p className="platform-tagline">{platform.tagline}</p>
                <p className="platform-description">{platform.description}</p>
                <ul className="platform-features-list">
                  {platform.features.map((feature, i) => (
                    <li key={i}>✓ {feature}</li>
                  ))}
                </ul>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary small"
                  style={{ borderColor: platform.color, color: platform.color }}
                >
                  Visit {platform.name} →
                </a>
              </div>
            ))}
          </div>

          <div className="ghl-callout">
            <div className="ghl-callout-content">
              <h3>Manage Everything in GoHighLevel</h3>
              <p>
                Your partner dashboard, commission tracking, lead management, and automated workflows are all managed
                through GoHighLevel. This is your command center for success.
              </p>
              <ul>
                <li>✓ Track all referrals in real-time</li>
                <li>✓ Automated welcome sequences for your leads</li>
                <li>✓ Commission reports and payout history</li>
                <li>✓ Marketing automation tools</li>
              </ul>
            </div>
            <a
              href="https://app.gohighlevel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ background: "#10b981" }}
            >
              Access Your GHL Dashboard →
            </a>
          </div>
        </div>
      </section>

      {/* Social Media Post Builder */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge">Content Creator</span>
            <h2>
              Social Media <span className="gold">Post Builder</span>
            </h2>
            <p>Generate ready-to-post content with your affiliate link built in</p>
          </div>

          <div className="post-builder">
            <div className="post-builder-sidebar">
              <h4>Select Template</h4>
              <div className="template-list">
                {postTemplates.map((template) => (
                  <button
                    key={template.id}
                    className={`template-btn ${selectedPost.id === template.id ? "active" : ""}`}
                    onClick={() => {
                      setSelectedPost(template)
                      setGeneratedPost("")
                    }}
                  >
                    <span className="template-platform">{template.platform}</span>
                    <span className="template-title">{template.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="post-builder-main">
              <div className="post-builder-header">
                <span className="platform-tag">{selectedPost.platform}</span>
                <h3>{selectedPost.title}</h3>
              </div>

              <div className="affiliate-link-input">
                <label>Your Affiliate Link</label>
                <input
                  type="text"
                  placeholder="https://saintsal.ai/?am_id=YOUR_ID"
                  value={affiliateLink}
                  onChange={(e) => setAffiliateLink(e.target.value)}
                />
                <button onClick={generatePost} className="btn-primary small">
                  Generate Post
                </button>
              </div>

              <div className="post-preview">
                <label>Preview</label>
                <div className="post-content">{generatedPost || selectedPost.content}</div>
                <div className="post-hashtags">
                  {selectedPost.hashtags.map((tag) => (
                    <span key={tag} className="hashtag">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="post-actions">
                <button onClick={copyToClipboard} className="btn-primary">
                  {copied ? "✓ Copied!" : "Copy to Clipboard"}
                </button>
                <button
                  onClick={() => {
                    const text = encodeURIComponent(generatedPost || selectedPost.content)
                    if (selectedPost.platform === "Twitter/X") {
                      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank")
                    } else if (selectedPost.platform === "LinkedIn") {
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${affiliateLink}`, "_blank")
                    }
                  }}
                  className="btn-secondary"
                >
                  Share on {selectedPost.platform} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Assets */}
      <section className="section dark">
        <div className="container">
          <div className="section-header">
            <span className="badge">Brand Assets</span>
            <h2>
              Downloadable <span className="gold">Marketing Materials</span>
            </h2>
            <p>High-quality logos, banners, and social media templates</p>
          </div>

          <div className="assets-grid">
            {marketingAssets.map((asset) => (
              <div key={asset.id} className="asset-card">
                <div className="asset-preview">
                  <Image
                    src={asset.thumbnail || "/placeholder.svg"}
                    alt={asset.name}
                    width={300}
                    height={200}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="asset-info">
                  <h4>{asset.name}</h4>
                  <div className="asset-meta">
                    <span className="asset-type">{asset.type}</span>
                    <span className="asset-format">{asset.format}</span>
                    <span className="asset-size">{asset.size}</span>
                  </div>
                </div>
                <button
                  onClick={() => downloadAsset(asset)}
                  disabled={downloadingId === asset.id}
                  className="btn-primary small full-width"
                >
                  {downloadingId === asset.id ? "Downloading..." : "Download"}
                </button>
              </div>
            ))}
          </div>

          <div className="upload-cta">
            <p>
              Need custom assets or have questions? <Link href="mailto:support@cookin.io">Contact Support</Link>
            </p>
            <p className="admin-note">
              Admin? <Link href="/admin/resources">Upload New Materials</Link>
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge">Partner Documents</span>
            <h2>
              Required <span className="gold">Documents</span>
            </h2>
            <p>Complete these documents to activate your partner account</p>
          </div>
          <div className="quick-links-grid">
            <Link href="/resources/handbook" className="quick-link-card">
              <span className="quick-link-icon">📖</span>
              <h3>Partner Handbook</h3>
              <p>Independent contractor guidelines and policies</p>
            </Link>
            <Link href="/resources/terms" className="quick-link-card">
              <span className="quick-link-icon">📋</span>
              <h3>Terms & Conditions</h3>
              <p>Affiliate program agreement - required to sign</p>
            </Link>
            <Link href="/resources/nda" className="quick-link-card">
              <span className="quick-link-icon">🔒</span>
              <h3>NDA Agreement</h3>
              <p>Confidentiality agreement with digital signature</p>
            </Link>
            <Link href="/resources/w9" className="quick-link-card">
              <span className="quick-link-icon">📝</span>
              <h3>W-9 / W-8BEN</h3>
              <p>Tax form required for commission payments</p>
            </Link>
            <Link href="/get-paid" className="quick-link-card">
              <span className="quick-link-icon">💰</span>
              <h3>Set Up Payouts</h3>
              <p>Configure your payout method</p>
            </Link>
            <a href="https://app.gohighlevel.com" target="_blank" rel="noopener noreferrer" className="quick-link-card">
              <span className="quick-link-icon">📊</span>
              <h3>GHL Dashboard</h3>
              <p>Access your commission tracking and CRM</p>
            </a>
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
              <p className="footer-tagline">Partner with the Saint Vision ecosystem</p>
            </div>
            <div className="footer-links-horizontal">
              <div className="footer-group">
                <h4>Partners</h4>
                <Link href="/apply">Apply Now</Link>
                <Link href="/resources">Resources</Link>
                <Link href="/get-paid">Get Paid</Link>
              </div>
              <div className="footer-group">
                <h4>Ecosystem</h4>
                <a href="https://saintsal.ai" target="_blank" rel="noopener noreferrer">
                  SaintSal.ai
                </a>
                <a href="https://cookincapital.ai" target="_blank" rel="noopener noreferrer">
                  CookinCapital
                </a>
                <a href="https://cookinsaints.com" target="_blank" rel="noopener noreferrer">
                  CookinSaints
                </a>
                <a href="https://cookinflips.com" target="_blank" rel="noopener noreferrer">
                  CookinFlips
                </a>
                <a href="https://app.gohighlevel.com" target="_blank" rel="noopener noreferrer">
                  GHL Dashboard
                </a>
              </div>
            </div>
            <div className="footer-ip-compact">
              <strong>US Patent #10,290,222</strong>
              <br />
              HACP™ Technology
            </div>
          </div>
          <div className="footer-bottom-horizontal">
            <p>© 2026 CookinPartners™ | SaintSal™ & The Cookin' Enterprise</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
