"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function HandbookPage() {
  const [agreed, setAgreed] = useState(false)
  const [agreedAt, setAgreedAt] = useState<string | null>(null)

  const handleAgree = () => {
    setAgreed(true)
    setAgreedAt(new Date().toISOString())
  }

  return (
    <main className="resources-page">
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
            <Link href="/resources">Resources</Link>
            <Link href="/apply" className="btn-primary small">
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      <section className="document-page">
        <div className="container">
          <div className="document-header">
            <span className="badge">Partner Document</span>
            <h1>
              Independent Contractor <span className="gold">Partner Handbook</span>
            </h1>
            <p>CookinPartners™ Affiliate Program Guidelines & Policies</p>
          </div>

          <div className="document-content">
            <div className="document-section">
              <h2>1. Welcome to CookinPartners™</h2>
              <p>
                Welcome to the CookinPartners™ Affiliate Program! As an independent contractor partner, you are joining
                an elite network of professionals who represent the Saint Vision Technologies LLC ecosystem of
                AI-powered platforms.
              </p>
              <p>
                This handbook outlines the terms, expectations, and best practices for your success as a CookinPartner.
              </p>
            </div>

            <div className="document-section">
              <h2>2. Partner Status & Relationship</h2>
              <p>
                <strong>Independent Contractor Status:</strong> As a CookinPartner, you are an independent contractor,
                NOT an employee of Saint Vision Technologies LLC or any affiliated company. You are responsible for:
              </p>
              <ul>
                <li>Your own taxes, including self-employment tax</li>
                <li>Your own business expenses</li>
                <li>Your own health insurance and benefits</li>
                <li>Compliance with all applicable laws in your jurisdiction</li>
              </ul>
            </div>

            <div className="document-section">
              <h2>3. Commission Structure</h2>
              <p>
                <strong>Partner Tier (15% Commission):</strong>
              </p>
              <ul>
                <li>Entry-level tier for all new partners</li>
                <li>15% recurring commission on all referred subscriptions</li>
                <li>Instant approval and affiliate link generation</li>
                <li>Access to marketing materials and resources</li>
              </ul>
              <p>
                <strong>VP Tier (25% Commission):</strong>
              </p>
              <ul>
                <li>Advanced tier for high-performing partners</li>
                <li>25% recurring commission on all referred subscriptions</li>
                <li>Requires application review (72-hour processing)</li>
                <li>Priority support and exclusive opportunities</li>
              </ul>
            </div>

            <div className="document-section">
              <h2>4. Commission Payments</h2>
              <ul>
                <li>Commissions are calculated monthly</li>
                <li>Payment is made by the 15th of the following month</li>
                <li>Minimum payout threshold: $50 USD</li>
                <li>Payment methods: PayPal, Venmo, Cash App, or Direct Deposit</li>
                <li>W-9 (US) or W-8BEN (International) required before first payment</li>
              </ul>
            </div>

            <div className="document-section">
              <h2>5. Marketing Guidelines</h2>
              <p>
                <strong>Approved Activities:</strong>
              </p>
              <ul>
                <li>Sharing your affiliate link on social media</li>
                <li>Email marketing to your own opt-in list</li>
                <li>Content creation (blogs, videos, podcasts)</li>
                <li>Direct referrals to colleagues and contacts</li>
                <li>Using provided marketing materials</li>
              </ul>
              <p>
                <strong>Prohibited Activities:</strong>
              </p>
              <ul>
                <li>Spam or unsolicited bulk messaging</li>
                <li>False or misleading claims about products</li>
                <li>Paid advertising on brand terms without approval</li>
                <li>Creating fake reviews or testimonials</li>
                <li>Violating any platform's terms of service</li>
              </ul>
            </div>

            <div className="document-section">
              <h2>6. Intellectual Property</h2>
              <p>
                All trademarks, logos, and branding materials are property of Saint Vision Technologies LLC. Partners
                are granted a limited license to use approved marketing materials for promotional purposes only.
              </p>
              <p>
                <strong>Protected Marks:</strong>
              </p>
              <ul>
                <li>SaintSal™ and SaintSal.ai</li>
                <li>CookinPartners™</li>
                <li>HACP™ (Human-AI Connection Protocol)</li>
                <li>US Patent #10,290,222</li>
                <li>All Cookin' Enterprise brands</li>
              </ul>
            </div>

            <div className="document-section">
              <h2>7. Confidentiality</h2>
              <p>Partners agree to maintain confidentiality regarding:</p>
              <ul>
                <li>Commission rates and structures (except as publicly stated)</li>
                <li>Internal business processes and strategies</li>
                <li>Customer data and information</li>
                <li>Proprietary technology and trade secrets</li>
              </ul>
            </div>

            <div className="document-section">
              <h2>8. Termination</h2>
              <p>Either party may terminate this partnership at any time with written notice. Upon termination:</p>
              <ul>
                <li>All earned commissions will be paid according to schedule</li>
                <li>Access to partner portal will be revoked</li>
                <li>Use of marketing materials must cease immediately</li>
                <li>Any unpaid commissions under $50 will be forfeited</li>
              </ul>
            </div>

            <div className="document-section">
              <h2>9. Support & Resources</h2>
              <p>Partners have access to:</p>
              <ul>
                <li>Partner Resource Center at cookinpartners.com/resources</li>
                <li>Marketing materials and brand assets</li>
                <li>GoHighLevel dashboard for tracking and CRM</li>
                <li>Email support at support@cookin.io</li>
                <li>Partner community and training materials</li>
              </ul>
            </div>

            <div className="document-section">
              <h2>10. Contact Information</h2>
              <p>
                <strong>Saint Vision Technologies LLC</strong>
              </p>
              <p>Partner Support: support@cookin.io</p>
              <p>Partner Relations: partners@cookin.io</p>
              <p>Executive Contact: ryan@cookin.io</p>
            </div>
          </div>

          <div className="document-agreement">
            {!agreed ? (
              <>
                <label className="checkbox-container">
                  <input type="checkbox" checked={agreed} onChange={handleAgree} />
                  <span className="checkmark"></span>I have read, understand, and agree to the terms outlined in this
                  Partner Handbook
                </label>
                <button onClick={handleAgree} className="btn-primary" disabled={agreed}>
                  Accept & Continue
                </button>
              </>
            ) : (
              <div className="agreement-confirmed">
                <div className="confirmed-badge">✓ Acknowledged</div>
                <p>You acknowledged this handbook on:</p>
                <p className="timestamp">{new Date(agreedAt!).toLocaleString()}</p>
              </div>
            )}
          </div>

          <div className="document-actions">
            <button onClick={() => window.print()} className="btn-secondary">
              Print / Save as PDF
            </button>
            <a
              href={`mailto:support@cookin.io,ryan@cookin.io?subject=Partner Handbook Acknowledgment&body=I have read and acknowledge the CookinPartners Independent Contractor Partner Handbook.%0D%0A%0D%0AAcknowledged: ${agreedAt ? new Date(agreedAt).toLocaleString() : "Pending"}%0D%0A%0D%0APartner Name: [Your Name]%0D%0APartner Email: [Your Email]`}
              className="btn-primary"
            >
              Email Acknowledgment to Support
            </a>
          </div>

          <div className="document-nav">
            <Link href="/resources/terms">Terms & Conditions →</Link>
            <Link href="/resources/nda">NDA Agreement →</Link>
            <Link href="/resources/w9">W-9 Tax Form →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
