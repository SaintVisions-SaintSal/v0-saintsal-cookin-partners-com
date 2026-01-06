"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export default function NDAPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [signed, setSigned] = useState(false)
  const [signedAt, setSignedAt] = useState<string | null>(null)
  const [signatureData, setSignatureData] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top

    ctx.lineTo(x, y)
    ctx.strokeStyle = "#d4af37"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      setSignatureData(canvas.toDataURL())
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setSignatureData(null)
  }

  const handleSign = () => {
    if (!name || !email || !signatureData) {
      alert("Please fill in your name, email, and provide your signature.")
      return
    }
    setSigned(true)
    setSignedAt(new Date().toISOString())
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
              Non-Disclosure <span className="gold">Agreement</span>
            </h1>
            <p>CookinPartners™ Confidentiality Agreement</p>
          </div>

          <div className="document-content">
            <div className="document-section">
              <h2>MUTUAL NON-DISCLOSURE AGREEMENT</h2>
              <p>
                <em>Effective upon signature</em>
              </p>
              <p>
                This Non-Disclosure Agreement ("Agreement") is entered into between Saint Vision Technologies LLC, a
                Florida limited liability company ("Company"), and the undersigned party ("Partner").
              </p>
            </div>

            <div className="document-section">
              <h2>1. PURPOSE</h2>
              <p>
                The parties wish to explore a business opportunity of mutual interest (the "Purpose") and in connection
                with the Purpose, each party may disclose to the other certain confidential technical and business
                information.
              </p>
            </div>

            <div className="document-section">
              <h2>2. DEFINITION OF CONFIDENTIAL INFORMATION</h2>
              <p>
                "Confidential Information" means any information disclosed by either party to the other party, either
                directly or indirectly, in writing, orally, or by inspection of tangible objects, that is designated as
                "Confidential," "Proprietary," or some similar designation, or that reasonably should be understood to
                be confidential given the nature of the information and circumstances of disclosure.
              </p>
              <p>Confidential Information includes, but is not limited to:</p>
              <ul>
                <li>Trade secrets, inventions, and proprietary technology</li>
                <li>Business plans, strategies, and financial information</li>
                <li>Customer lists, data, and information</li>
                <li>Commission structures and partner compensation details</li>
                <li>Marketing strategies and materials not publicly available</li>
                <li>Software, algorithms, and technical specifications</li>
                <li>Information relating to US Patent #10,290,222 (HACP™)</li>
              </ul>
            </div>

            <div className="document-section">
              <h2>3. NON-DISCLOSURE OBLIGATIONS</h2>
              <p>
                3.1. The receiving party shall not disclose any Confidential Information to third parties without prior
                written consent.
              </p>
              <p>
                3.2. The receiving party shall protect Confidential Information using the same degree of care used to
                protect its own confidential information, but no less than reasonable care.
              </p>
              <p>3.3. The receiving party shall use Confidential Information only for the Purpose.</p>
              <p>
                3.4. The receiving party shall limit disclosure of Confidential Information to employees, agents, or
                contractors who have a need to know and are bound by confidentiality obligations.
              </p>
            </div>

            <div className="document-section">
              <h2>4. EXCLUSIONS</h2>
              <p>Confidential Information does not include information that:</p>
              <ul>
                <li>Is or becomes publicly available through no fault of the receiving party</li>
                <li>Was rightfully known prior to disclosure</li>
                <li>Is rightfully obtained from a third party without restriction</li>
                <li>Is independently developed without use of Confidential Information</li>
                <li>Is required to be disclosed by law or court order</li>
              </ul>
            </div>

            <div className="document-section">
              <h2>5. TERM</h2>
              <p>
                This Agreement shall remain in effect for three (3) years from the date of signature. The obligations of
                confidentiality shall survive termination of this Agreement for a period of two (2) years.
              </p>
            </div>

            <div className="document-section">
              <h2>6. RETURN OF MATERIALS</h2>
              <p>
                Upon termination of this Agreement or upon request, the receiving party shall promptly return or destroy
                all Confidential Information and any copies thereof.
              </p>
            </div>

            <div className="document-section">
              <h2>7. NO LICENSE</h2>
              <p>
                Nothing in this Agreement grants any rights to either party under any patent, copyright, trade secret,
                or other intellectual property right.
              </p>
            </div>

            <div className="document-section">
              <h2>8. REMEDIES</h2>
              <p>
                The parties acknowledge that breach of this Agreement may cause irreparable harm for which monetary
                damages may be inadequate. The non-breaching party shall be entitled to seek equitable relief, including
                injunction and specific performance, in addition to any other remedies available at law.
              </p>
            </div>

            <div className="document-section">
              <h2>9. GOVERNING LAW</h2>
              <p>This Agreement shall be governed by the laws of the State of Florida, USA.</p>
            </div>

            <div className="document-section">
              <h2>10. ENTIRE AGREEMENT</h2>
              <p>
                This Agreement constitutes the entire agreement between the parties concerning the subject matter hereof
                and supersedes all prior agreements.
              </p>
            </div>
          </div>

          <div className="document-signature-section">
            <h3>Signature</h3>
            {!signed ? (
              <>
                <div className="signature-inputs">
                  <input
                    type="text"
                    placeholder="Full Legal Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Company Name (Optional)"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="signature-pad">
                  <label>Sign Below (Draw with mouse or finger)</label>
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={150}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="signature-canvas"
                  />
                  <button onClick={clearSignature} className="btn-secondary small">
                    Clear Signature
                  </button>
                </div>
                <button onClick={handleSign} className="btn-primary">
                  Sign NDA Agreement
                </button>
              </>
            ) : (
              <div className="agreement-confirmed">
                <div className="confirmed-badge">✓ NDA Signed</div>
                <p>
                  <strong>Name:</strong> {name}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                {company && (
                  <p>
                    <strong>Company:</strong> {company}
                  </p>
                )}
                <p>
                  <strong>Signed On:</strong> {new Date(signedAt!).toLocaleString()}
                </p>
                {signatureData && (
                  <div className="signature-preview">
                    <p>
                      <strong>Signature:</strong>
                    </p>
                    <img src={signatureData || "/placeholder.svg"} alt="Signature" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="document-actions">
            <button onClick={() => window.print()} className="btn-secondary">
              Print / Save as PDF
            </button>
            <a
              href={`mailto:support@cookin.io,ryan@cookin.io?subject=Signed NDA - ${name}&body=I have signed the CookinPartners Non-Disclosure Agreement.%0D%0A%0D%0AFull Name: ${name}%0D%0AEmail: ${email}%0D%0ACompany: ${company || "N/A"}%0D%0ASigned On: ${signedAt ? new Date(signedAt).toLocaleString() : "Pending"}%0D%0A%0D%0APlease find attached the signed NDA (print this page to PDF and attach).%0D%0A%0D%0APlease confirm receipt of this agreement.`}
              className="btn-primary"
            >
              Email Signed NDA to Support
            </a>
          </div>

          <div className="document-nav">
            <Link href="/resources/handbook">← Partner Handbook</Link>
            <Link href="/resources/terms">Terms & Conditions</Link>
            <Link href="/resources/w9">W-9 Tax Form →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
