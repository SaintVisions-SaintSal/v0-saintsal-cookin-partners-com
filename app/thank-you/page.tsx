"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ThankYouContent() {
  const searchParams = useSearchParams()
  const affiliateLink = searchParams.get("affiliateLink")
  const portalLink = searchParams.get("portalLink") || "https://cookinpartners.com/portal"
  const applicationType = searchParams.get("type")
  const isVP = applicationType === "vp"

  return (
    <main className="thank-you">
      <div className="container">
        <div className="success-icon">🎉</div>
        <h1>
          Welcome to the <span className="gold">Family</span>!
        </h1>

        {isVP ? (
          <>
            <p className="lead">Your VP application has been submitted to support@cookin.io</p>
            <div className="next-steps">
              <h2>What Happens Next?</h2>
              <div className="steps">
                <div className="step">
                  <span className="step-num">1</span>
                  <div>
                    <strong>Application Review</strong>
                    <p>Our executive team reviews your VP application within 24-48 hours</p>
                  </div>
                </div>
                <div className="step">
                  <span className="step-num">2</span>
                  <div>
                    <strong>Strategy Call</strong>
                    <p>We'll schedule a call to discuss your partnership strategy</p>
                  </div>
                </div>
                <div className="step">
                  <span className="step-num">3</span>
                  <div>
                    <strong>Custom Agreement</strong>
                    <p>Receive your custom VP agreement with 25-35% commission structure</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="lead">Your partner account is ready! Check your email for your affiliate link.</p>

            {affiliateLink && (
              <div className="affiliate-box">
                <h3>Your Affiliate Link</h3>
                <div className="link-display">
                  <code>{affiliateLink}</code>
                  <button onClick={() => navigator.clipboard.writeText(affiliateLink)} className="copy-btn">
                    📋 Copy
                  </button>
                </div>
                <p className="commission-note">💰 Earn 15% recurring commission on every sale!</p>
                <p className="share-note">Share this link everywhere - social media, email, website, etc.</p>
              </div>
            )}

            <div className="next-steps">
              <h2>Access Your Partner Portal</h2>
              <p>Login to track earnings, add bank info, and access marketing materials:</p>
              <a href={portalLink} className="portal-btn" target="_blank" rel="noopener noreferrer">
                🚀 Access Your Dashboard
              </a>
              <div className="steps">
                <div className="step">
                  <span className="step-num">1</span>
                  <div>
                    <strong>Track Your Earnings</strong>
                    <p>Real-time commission tracking and referral stats</p>
                  </div>
                </div>
                <div className="step">
                  <span className="step-num">2</span>
                  <div>
                    <strong>Add Bank Account</strong>
                    <p>Set up direct deposit for your monthly payouts (Net-15)</p>
                  </div>
                </div>
                <div className="step">
                  <span className="step-num">3</span>
                  <div>
                    <strong>Marketing Materials</strong>
                    <p>Download banners, email templates, and social media content</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <a href="/" className="btn-primary">
          ← Back to Home
        </a>
      </div>

      <style jsx>{`
        .thank-you { min-height: 100vh; background: #050505; display: flex; align-items: center; justify-content: center; padding: 80px 24px; text-align: center; }
        .container { max-width: 700px; }
        .success-icon { font-size: 5rem; margin-bottom: 24px; }
        h1 { font-family: 'Playfair Display', serif; font-size: 3rem; margin-bottom: 16px; }
        .gold { background: linear-gradient(135deg, #D4AF37, #F4E4BA, #D4AF37); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .lead { font-size: 1.25rem; color: rgba(255,255,255,0.7); margin-bottom: 48px; }
        
        .affiliate-box { background: #0a0a0a; border: 2px solid #D4AF37; border-radius: 16px; padding: 32px; margin-bottom: 32px; }
        .affiliate-box h3 { font-size: 1.25rem; margin-bottom: 16px; color: #D4AF37; }
        .link-display { display: flex; gap: 12px; align-items: center; background: #000; padding: 12px; border-radius: 8px; margin-bottom: 16px; }
        .link-display code { flex: 1; color: #fff; font-size: 14px; overflow-x: auto; white-space: nowrap; }
        .copy-btn { padding: 8px 16px; background: #D4AF37; color: #000; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
        .copy-btn:hover { background: #F4D03F; }
        .commission-note { color: #D4AF37; font-weight: 600; margin: 0; }
        .share-note { font-size: 14px; color: rgba(255,255,255,0.5); margin: 8px 0 0 0; }
        
        .portal-btn { display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #D4AF37, #F4D03F); color: #000; font-weight: 700; font-size: 1.125rem; text-decoration: none; border-radius: 12px; margin: 24px 0; transition: transform 0.2s; }
        .portal-btn:hover { transform: scale(1.05); }
        
        .next-steps { background: #0a0a0a; border: 1px solid rgba(212,175,55,0.2); border-radius: 16px; padding: 40px; margin-bottom: 32px; text-align: left; }
        .next-steps h2 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 8px; text-align: center; }
        .next-steps > p { text-align: center; color: rgba(255,255,255,0.6); margin-bottom: 24px; }
        .steps { display: flex; flex-direction: column; gap: 24px; }
        .step { display: flex; gap: 16px; align-items: flex-start; }
        .step-num { width: 40px; height: 40px; background: linear-gradient(135deg, #D4AF37, #F4D03F); color: #0a0a0a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
        .step strong { display: block; margin-bottom: 4px; }
        .step p { font-size: 14px; color: rgba(255,255,255,0.5); margin: 0; }
        .btn-primary { display: inline-flex; padding: 14px 28px; background: linear-gradient(135deg, #D4AF37, #F4D03F); color: #0a0a0a; font-weight: 600; text-decoration: none; border-radius: 8px; margin-top: 16px; }
      `}</style>
    </main>
  )
}

export default function ThankYou() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  )
}
