"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

const socialPosts = [
  {
    id: 1,
    platform: "all",
    title: "The First Human-AI Protocol",
    image: "/images/saintsal-promo-1.png",
    caption: `The AI That Actually Helps. 🚀

Introducing SaintSal™ - powered by HACP™ (Human-AI Connection Protocol), the FIRST patented technology ensuring AI works WITH you, not against you.

US Patent #10,290,222

✅ 1 Million+ Users
✅ Enterprise Ready (GDPR, CCPA, SOC 2)
✅ Faith-Guided AI - Technology with purpose

Download now and experience the future of responsible AI.

@saintsal.ai @ryancapatosto

#SaintSal™ #SaintVisionTechnologies #HACP #AIThatHelps #FaithBasedAI #ResponsibleAI #PatentedTechnology`,
    hashtags: ["#SaintSal™", "#SaintVisionTechnologies", "#HACP", "#AIThatHelps", "#FaithBasedAI"],
  },
  {
    id: 2,
    platform: "all",
    title: "Every AI Model In One",
    image: "/images/saintsal-promo-2.png",
    caption: `Every AI Model In One! 🤖

Why switch between ChatGPT, Claude, and Gemini when you can have them ALL in SaintSal™?

One subscription. Every major AI model. Zero hassle.

🎮 Works on Desktop, Tablet & Mobile
📱 Available on App Store & Google Play
🧠 SAINTSAL™ AI, Enterprise Finance, Custom Agents & More

The first platform to unite AI under one roof - powered by our patented HACP™ protocol.

Discover what AI should be.

@saintsal.ai @ryancapatosto

#SaintSal™ #SaintVisionTechnologies #AIRevolution #EveryAIModel #OneSubscription #PatentedAI`,
    hashtags: ["#SaintSal™", "#SaintVisionTechnologies", "#AIRevolution", "#EveryAIModel"],
  },
  {
    id: 3,
    platform: "all",
    title: "Transform Docs Into Intelligence",
    image: "/images/saintsal-promo-3.png",
    caption: `Execute. Transform Docs Into Intelligence. 📄➡️🧠

SaintSal™ doesn't just read your documents - it UNDERSTANDS them.

🏆 App of the Day... 7x
🔒 GoHighLevel PREMIUM Integration
💼 WarRoom - Your AI War Strategy Center
📊 Why SaintVision? Because AI should work FOR you.

The first faith-based AI software that combines cutting-edge technology with responsible innovation.

Available now. Transform how you work.

@saintsal.ai @ryancapatosto

#SaintSal™ #SaintVisionTechnologies #DocumentAI #WarRoom #FaithBasedSoftware #AIProductivity`,
    hashtags: ["#SaintSal™", "#SaintVisionTechnologies", "#DocumentAI", "#WarRoom"],
  },
  {
    id: 4,
    platform: "all",
    title: "Dominate Finance, Legal & Tech",
    image: "/images/saintsal-promo-4.png",
    caption: `Crush It. Dominate Finance • Legal • Tech 💪

SaintSal™ isn't just another AI chatbot. It's your competitive advantage.

🏛️ Built for Professionals Who Mean Business
⚖️ Legal Research & Document Analysis
💰 Financial Modeling & Strategy
🔬 Technical Problem Solving

The FIRST Human-AI Protocol agents in the world. The FIRST faith-based AI software in the industry.

When others use AI, you'll COMMAND it.

@saintsal.ai @ryancapatosto

#SaintSal™ #SaintVisionTechnologies #FinanceAI #LegalTech #ProfessionalAI #HACPProtocol`,
    hashtags: ["#SaintSal™", "#SaintVisionTechnologies", "#FinanceAI", "#LegalTech"],
  },
  {
    id: 5,
    platform: "all",
    title: "Faith-Based AI Revolution",
    image: "/images/saintsal-cookin-knowledge.png",
    caption: `Cookin' Knowledge with SaintSal™ 🌟

In a world of soulless AI, we chose a different path.

SaintSal™ is the FIRST and ONLY faith-based AI software - where technology meets divine purpose.

🙏 Responsible Intelligence First
✝️ Faith-Guided Development
🛡️ HACP™ Patented Protocol (US Patent #10,290,222)
💎 Premium Quality, Ethical AI

"Where artificial intelligence meets divine purpose."

Join 1 million+ users who chose AI with a soul.

@saintsal.ai @ryancapatosto

#SaintSal™ #SaintVisionTechnologies #FaithBasedAI #ResponsibleAI #CookinKnowledge #AIWithPurpose`,
    hashtags: ["#SaintSal™", "#SaintVisionTechnologies", "#FaithBasedAI", "#ResponsibleAI"],
  },
]

const platformIcons: Record<string, string> = {
  linkedin: "💼",
  facebook: "📘",
  instagram: "📸",
  tiktok: "🎵",
  twitter: "𝕏",
}

export default function MarketingMaterialsPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all")

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const downloadImage = async (imageUrl: string, filename: string) => {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <main className="marketing-page">
      <div className="marketing-header">
        <Link href="/" className="back-link">
          ← Back to Home
        </Link>
        <Image
          src="/images/cookinpartners-logo.png"
          alt="CookinPartners"
          width={80}
          height={80}
          className="marketing-logo"
        />
        <h1>Partner Marketing Materials</h1>
        <p className="marketing-subtitle">
          Ready-to-post content for LinkedIn, Facebook, Instagram, TikTok & X (Twitter).
          <br />
          Copy the caption, download the image, and start promoting SaintSal™!
        </p>
      </div>

      <div className="platform-filter">
        <span>Filter by platform:</span>
        <div className="platform-buttons">
          <button
            className={`platform-btn ${selectedPlatform === "all" ? "active" : ""}`}
            onClick={() => setSelectedPlatform("all")}
          >
            All Platforms
          </button>
          {Object.entries(platformIcons).map(([platform, icon]) => (
            <button
              key={platform}
              className={`platform-btn ${selectedPlatform === platform ? "active" : ""}`}
              onClick={() => setSelectedPlatform(platform)}
            >
              {icon} {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="posts-grid">
        {socialPosts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-image-container">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={400}
                height={500}
                className="post-image"
              />
              <button
                className="download-btn"
                onClick={() => downloadImage(post.image, `saintsal-post-${post.id}.png`)}
              >
                Download Image
              </button>
            </div>

            <div className="post-content">
              <h3>{post.title}</h3>

              <div className="platform-tags">
                {Object.entries(platformIcons).map(([platform, icon]) => (
                  <span key={platform} className="platform-tag">
                    {icon}
                  </span>
                ))}
              </div>

              <div className="caption-box">
                <pre className="caption-text">{post.caption}</pre>
              </div>

              <div className="hashtags">
                {post.hashtags.map((tag) => (
                  <span key={tag} className="hashtag">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                className={`copy-btn ${copiedId === post.id ? "copied" : ""}`}
                onClick={() => copyToClipboard(post.caption, post.id)}
              >
                {copiedId === post.id ? "Copied!" : "Copy Caption"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="video-section">
        <h2>Partner Promo Video</h2>
        <p>Download and share this video on your social channels</p>
        <video controls className="promo-video" poster="/images/saintsal-cookin-knowledge.png">
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ai%20Partner%20clip-GOfuuvBezuWyqPh7m6JogrfEEGI6bp.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <a href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ai%20Partner%20clip-GOfuuvBezuWyqPh7m6JogrfEEGI6bp.mp4" download="saintsal-partner-promo.mp4" className="video-download-btn">
          Download Video
        </a>
      </div>

      <div className="cta-section">
        <h2>Ready to Create Your Partner Card?</h2>
        <p>Generate your personalized QR code and digital business card</p>
        <Link href="/resources/card-builder" className="cta-btn">
          Build Your Partner Card →
        </Link>
      </div>
    </main>
  )
}
