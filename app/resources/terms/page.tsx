"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function TermsPage() {
  const [agreed, setAgreed] = useState(false)
  const [agreedAt, setAgreedAt] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleAgree = () => {
    if (!name || !email) {
      alert("Please enter your name and email to acknowledge the terms.")
      return
    }
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
            <span className="badge">Legal Document</span>
            <h1>
              Partner <span className="gold">Terms & Conditions</span>
            </h1>
            <p>CookinPartners™ Affiliate Program Agreement</p>
          </div>

          <div className="document-content">
            <div className="document-section">
              <h2>AFFILIATE PROGRAM TERMS AND CONDITIONS</h2>
              <p>
                <em>Last Updated: January 2026</em>
              </p>
              <p>
                These Terms and Conditions ("Agreement") govern your participation in the CookinPartners™ Affiliate
                Program ("Program") operated by Saint Vision Technologies LLC ("Company," "we," "us," or "our").
              </p>
            </div>

            <div className="document-section">
              <h2>1. ACCEPTANCE OF TERMS</h2>
              <p>
                By enrolling in the Program, you ("Affiliate," "Partner," "you," or "your") agree to be bound by these
                Terms and Conditions. If you do not agree to all terms, do not enroll in the Program.
              </p>
            </div>

            <div className="document-section">
              <h2>2. PROGRAM ENROLLMENT</h2>
              <p>2.1. You must be at least 18 years old to participate.</p>
              <p>2.2. You must provide accurate and complete registration information.</p>
              <p>2.3. We reserve the right to accept or reject any application at our sole discretion.</p>
              <p>2.4. You may not enroll if you are a resident of any jurisdiction where the Program is prohibited.</p>
            </div>

            <div className="document-section">
              <h2>3. AFFILIATE LINKS AND TRACKING</h2>
              <p>3.1. Upon acceptance, you will receive unique affiliate tracking links.</p>
              <p>3.2. You are responsible for properly implementing and using your affiliate links.</p>
              <p>3.3. We are not responsible for tracking failures due to your improper link implementation.</p>
              <p>3.4. Cookie duration for tracking is 30 days from initial click.</p>
            </div>

            <div className="document-section">
              <h2>4. COMMISSION STRUCTURE</h2>
              <p>4.1. Partner Tier: 15% recurring commission on qualified sales.</p>
              <p>4.2. VP Tier: 25% recurring commission on qualified sales (by invitation/approval only).</p>
              <p>4.3. Commissions are earned when a referred customer completes a qualifying purchase.</p>
              <p>
                4.4. Recurring commissions continue for as long as the referred customer maintains their subscription.
              </p>
            </div>

            <div className="document-section">
              <h2>5. PAYMENT TERMS</h2>
              <p>5.1. Minimum payout threshold: $50 USD.</p>
              <p>5.2. Payments are processed monthly by the 15th of the following month.</p>
              <p>5.3. Valid W-9 (US residents) or W-8BEN (non-US residents) required before first payment.</p>
              <p>5.4. You are responsible for all applicable taxes on commission earnings.</p>
              <p>5.5. Chargebacks and refunds will result in commission reversal.</p>
            </div>

            <div className="document-section">
              <h2>6. PROMOTIONAL GUIDELINES</h2>
              <p>
                6.1. You may promote through legitimate marketing channels including social media, email marketing (to
                opt-in lists only), content marketing, and direct referrals.
              </p>
              <p>
                6.2. You may NOT engage in spam, misleading advertising, trademark bidding without approval, false
                claims, or any illegal promotional activities.
              </p>
              <p>6.3. All promotional materials must comply with FTC disclosure requirements.</p>
            </div>

            <div className="document-section">
              <h2>7. INTELLECTUAL PROPERTY</h2>
              <p>
                7.1. We grant you a limited, non-exclusive, revocable license to use our approved marketing materials.
              </p>
              <p>
                7.2. You may not modify, alter, or create derivative works of our trademarks or materials without
                written consent.
              </p>
              <p>7.3. All rights not expressly granted are reserved by the Company.</p>
            </div>

            <div className="document-section">
              <h2>8. CONFIDENTIALITY</h2>
              <p>8.1. You agree to keep confidential all non-public information related to the Program.</p>
              <p>
                8.2. This includes but is not limited to: commission rates (except as publicly stated), business
                strategies, customer data, and proprietary technology.
              </p>
            </div>

            <div className="document-section">
              <h2>9. TERMINATION</h2>
              <p>9.1. Either party may terminate this Agreement at any time with written notice.</p>
              <p>9.2. We may terminate immediately for violation of these Terms.</p>
              <p>9.3. Upon termination, all earned commissions meeting the minimum threshold will be paid.</p>
              <p>9.4. Unpaid commissions below the minimum threshold are forfeited upon termination.</p>
            </div>

            <div className="document-section">
              <h2>10. LIMITATION OF LIABILITY</h2>
              <p>
                10.1. THE COMPANY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
                DAMAGES.
              </p>
              <p>
                10.2. Our total liability shall not exceed the total commissions paid to you in the preceding 12 months.
              </p>
            </div>

            <div className="document-section">
              <h2>11. INDEMNIFICATION</h2>
              <p>
                You agree to indemnify and hold harmless the Company, its officers, directors, employees, and agents
                from any claims, damages, or expenses arising from your violation of these Terms or your promotional
                activities.
              </p>
            </div>

            <div className="document-section">
              <h2>12. GOVERNING LAW</h2>
              <p>
                This Agreement shall be governed by the laws of the State of Florida, USA, without regard to conflict of
                law principles.
              </p>
            </div>

            <div className="document-section">
              <h2>13. MODIFICATIONS</h2>
              <p>
                We reserve the right to modify these Terms at any time. Continued participation in the Program
                constitutes acceptance of modified Terms.
              </p>
            </div>

            <div className="document-section">
              <h2>14. ENTIRE AGREEMENT</h2>
              <p>
                These Terms constitute the entire agreement between you and the Company regarding the Program and
                supersede all prior agreements.
              </p>
            </div>

            <div className="document-section contact-section">
              <h2>Contact</h2>
              <p>Saint Vision Technologies LLC</p>
              <p>Email: support@cookin.io</p>
              <p>Partner Relations: partners@cookin.io</p>
            </div>
          </div>

          <div className="document-agreement">
            {!agreed ? (
              <>
                <div className="agreement-inputs">
                  <input
                    type="text"
                    placeholder="Your Full Legal Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <label className="checkbox-container">
                  <input type="checkbox" onChange={handleAgree} />
                  <span className="checkmark"></span>I have read, understand, and agree to the CookinPartners™ Terms &
                  Conditions
                </label>
              </>
            ) : (
              <div className="agreement-confirmed">
                <div className="confirmed-badge">✓ Agreement Accepted</div>
                <p>
                  <strong>Name:</strong> {name}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <p>
                  <strong>Agreed On:</strong> {new Date(agreedAt!).toLocaleString()}
                </p>
                <p>
                  <strong>IP Address:</strong> Logged
                </p>
              </div>
            )}
          </div>

          <div className="document-actions">
            <button onClick={() => window.print()} className="btn-secondary">
              Print / Save as PDF
            </button>
            <a
              href={`mailto:support@cookin.io,ryan@cookin.io?subject=Terms Agreement - ${name}&body=I have read and agree to the CookinPartners Terms and Conditions.%0D%0A%0D%0AFull Name: ${name}%0D%0AEmail: ${email}%0D%0AAgreed On: ${agreedAt ? new Date(agreedAt).toLocaleString() : "Pending"}%0D%0A%0D%0APlease confirm receipt of this agreement.`}
              className="btn-primary"
            >
              Email Agreement to Support
            </a>
          </div>

          <div className="document-nav">
            <Link href="/resources/handbook">← Partner Handbook</Link>
            <Link href="/resources/nda">NDA Agreement →</Link>
            <Link href="/resources/w9">W-9 Tax Form →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
