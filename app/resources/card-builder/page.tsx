"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { QRCodeSVG } from "qrcode.react"

interface CardData {
  firstName: string
  lastName: string
  title: string
  company: string
  email: string
  phone: string
  website: string
  affiliateLink: string
  linkedin: string
  facebook: string
  instagram: string
  twitter: string
  tiktok: string
  photo: string | null
}

const ecosystemLinks = [
  { name: "SaintSal.ai", url: "https://saintsal.ai" },
  { name: "CookinCapital", url: "https://cookincapital.com" },
  { name: "SaintCardX", url: "https://saintcardx.com" },
  { name: "CookinSaints", url: "https://cookinsaints.com" },
  { name: "CookinFlips", url: "https://cookinflips.com" },
  { name: "Athena.AI", url: "https://athena-ai.com" },
]

export default function CardBuilderPage() {
  const [cardData, setCardData] = useState<CardData>({
    firstName: "",
    lastName: "",
    title: "SaintSal™ Partner",
    company: "",
    email: "",
    phone: "",
    website: "",
    affiliateLink: "",
    linkedin: "",
    facebook: "",
    instagram: "",
    twitter: "",
    tiktok: "",
    photo: null,
  })

  const [showCard, setShowCard] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value })
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCardData({ ...cardData, photo: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const generateCard = () => {
    if (!cardData.firstName || !cardData.affiliateLink) {
      alert("Please enter at least your first name and affiliate link")
      return
    }
    setShowCard(true)
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const downloadCard = useCallback(async () => {
    if (!cardRef.current) return

    const html2canvas = (await import("html2canvas")).default
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: "#000",
      scale: 2,
      useCORS: true,
    })

    const link = document.createElement("a")
    link.download = `${cardData.firstName}-${cardData.lastName}-saintsal-partner-card.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }, [cardData.firstName, cardData.lastName])

  return (
    <main className="card-builder-page">
      <div className="card-builder-header">
        <Link href="/resources/marketing" className="back-link">
          ← Back to Marketing Materials
        </Link>
        <Image
          src="/images/transparentsaintsallogo-202.png"
          alt="SaintSal"
          width={100}
          height={100}
          className="builder-logo"
        />
        <h1>Partner Card Builder</h1>
        <p className="builder-subtitle">
          Create your personalized digital business card with QR code.
          <br />
          Share your affiliate link and start earning!
        </p>
      </div>

      <div className="card-builder-container">
        <div className="card-form-section">
          <h2>Your Information</h2>

          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={cardData.firstName}
                onChange={handleChange}
                placeholder="John"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastName" value={cardData.lastName} onChange={handleChange} placeholder="Doe" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={cardData.title}
                onChange={handleChange}
                placeholder="SaintSal™ Partner"
              />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                name="company"
                value={cardData.company}
                onChange={handleChange}
                placeholder="Your Company"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Affiliate Link *</label>
            <input
              type="url"
              name="affiliateLink"
              value={cardData.affiliateLink}
              onChange={handleChange}
              placeholder="https://saintsal.ai/?via=yourname"
            />
            <span className="helper-text">
              Get your link at{" "}
              <a
                href="https://saint-vision-technologies-llc.getrewardful.com/signup?campaign=affiliates-of-our-gotta-guy-saintsal"
                target="_blank"
                rel="noopener noreferrer"
              >
                Rewardful
              </a>
            </span>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={cardData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={cardData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label>Website</label>
            <input
              type="url"
              name="website"
              value={cardData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <h3>Social Media (Optional)</h3>

          <div className="form-row">
            <div className="form-group">
              <label>LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={cardData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div className="form-group">
              <label>Facebook</label>
              <input
                type="url"
                name="facebook"
                value={cardData.facebook}
                onChange={handleChange}
                placeholder="https://facebook.com/yourprofile"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Instagram</label>
              <input
                type="url"
                name="instagram"
                value={cardData.instagram}
                onChange={handleChange}
                placeholder="https://instagram.com/yourprofile"
              />
            </div>
            <div className="form-group">
              <label>X (Twitter)</label>
              <input
                type="url"
                name="twitter"
                value={cardData.twitter}
                onChange={handleChange}
                placeholder="https://x.com/yourprofile"
              />
            </div>
          </div>

          <div className="form-group">
            <label>TikTok</label>
            <input
              type="url"
              name="tiktok"
              value={cardData.tiktok}
              onChange={handleChange}
              placeholder="https://tiktok.com/@yourprofile"
            />
          </div>

          <div className="form-group full-width">
            <label>Profile Photo</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handlePhotoUpload}
              className="file-input"
            />
            <button type="button" className="upload-btn" onClick={() => fileInputRef.current?.click()}>
              {cardData.photo ? "Change Photo" : "Upload Photo"}
            </button>
            {cardData.photo && (
              <div className="photo-preview">
                <Image
                  src={cardData.photo || "/placeholder.svg"}
                  alt="Preview"
                  width={60}
                  height={60}
                  className="preview-img"
                />
              </div>
            )}
          </div>

          <button className="generate-btn" onClick={generateCard}>
            Generate My Partner Card
          </button>
        </div>

        {showCard && (
          <div className="card-preview-section">
            <h2>Your Partner Card</h2>

            <div className="partner-card" ref={cardRef}>
              <div className="card-header-bg">
                <Image
                  src="/images/transparentsaintsallogo-202.png"
                  alt="SaintSal"
                  width={60}
                  height={60}
                  className="card-logo"
                />
                <span className="card-badge">Official Partner</span>
              </div>

              <div className="card-body">
                <div className="card-profile">
                  {cardData.photo ? (
                    <Image
                      src={cardData.photo || "/placeholder.svg"}
                      alt={cardData.firstName}
                      width={80}
                      height={80}
                      className="card-photo"
                    />
                  ) : (
                    <div className="card-photo-placeholder">
                      {cardData.firstName.charAt(0)}
                      {cardData.lastName.charAt(0)}
                    </div>
                  )}
                  <div className="card-name">
                    {cardData.firstName} {cardData.lastName}
                  </div>
                  <div className="card-title">{cardData.title}</div>
                  {cardData.company && <div className="card-company">{cardData.company}</div>}
                </div>

                <div className="card-qr">
                  <QRCodeSVG
                    value={cardData.affiliateLink}
                    size={100}
                    bgColor="#000000"
                    fgColor="#D4AF37"
                    level="H"
                    includeMargin={false}
                  />
                  <span className="qr-label">Scan to Try SaintSal™</span>
                </div>

                <div className="card-contact">
                  {cardData.email && (
                    <div className="contact-item">
                      <span className="contact-icon">✉</span>
                      <span>{cardData.email}</span>
                    </div>
                  )}
                  {cardData.phone && (
                    <div className="contact-item">
                      <span className="contact-icon">☎</span>
                      <span>{cardData.phone}</span>
                    </div>
                  )}
                  {cardData.website && (
                    <div className="contact-item">
                      <span className="contact-icon">🌐</span>
                      <span>{cardData.website}</span>
                    </div>
                  )}
                </div>

                <div className="card-socials">
                  {cardData.linkedin && <span className="social-icon">in</span>}
                  {cardData.facebook && <span className="social-icon">f</span>}
                  {cardData.instagram && <span className="social-icon">ig</span>}
                  {cardData.twitter && <span className="social-icon">𝕏</span>}
                  {cardData.tiktok && <span className="social-icon">♪</span>}
                </div>

                <div className="card-ecosystem">
                  <span className="eco-label">SaintSal™ Ecosystem</span>
                  <div className="eco-links">
                    {ecosystemLinks.slice(0, 3).map((link) => (
                      <span key={link.name} className="eco-link">
                        {link.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <span className="affiliate-url">{cardData.affiliateLink}</span>
              </div>
            </div>

            <div className="card-actions">
              <button className="download-card-btn" onClick={downloadCard}>
                Download Card as PNG
              </button>
              <button
                className={`copy-link-btn ${copied === "link" ? "copied" : ""}`}
                onClick={() => copyToClipboard(cardData.affiliateLink, "link")}
              >
                {copied === "link" ? "Copied!" : "Copy Affiliate Link"}
              </button>
            </div>

            <div className="qr-standalone">
              <h3>Your QR Code</h3>
              <div className="qr-large">
                <QRCodeSVG
                  value={cardData.affiliateLink}
                  size={200}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p>Save or screenshot this QR code to share anywhere!</p>
              <button
                className={`copy-link-btn ${copied === "qr" ? "copied" : ""}`}
                onClick={() => copyToClipboard(cardData.affiliateLink, "qr")}
              >
                {copied === "qr" ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
