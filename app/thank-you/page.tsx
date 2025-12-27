'use client'
export default function ThankYou() {
  return (
    <main className="thank-you">
      <div className="container">
        <div className="success-icon">🎉</div>
        <h1>Welcome to the <span className="gold">Family</span>!</h1>
        <p className="lead">Your partner application has been received and is being reviewed.</p>
        <div className="next-steps">
          <h2>What Happens Next?</h2>
          <div className="steps">
            <div className="step"><span className="step-num">1</span><div><strong>Application Review</strong><p>Our team reviews your application within 24-48 hours</p></div></div>
            <div className="step"><span className="step-num">2</span><div><strong>Approval Email</strong><p>You&apos;ll receive an email with your unique affiliate link</p></div></div>
            <div className="step"><span className="step-num">3</span><div><strong>Start Earning</strong><p>Share your link and earn 15-35% recurring commissions</p></div></div>
          </div>
        </div>
        <a href="/" className="btn-primary">← Back to Home</a>
      </div>
      <style jsx>{`
        .thank-you { min-height: 100vh; background: #050505; display: flex; align-items: center; justify-content: center; padding: 80px 24px; text-align: center; }
        .container { max-width: 700px; }
        .success-icon { font-size: 5rem; margin-bottom: 24px; }
        h1 { font-family: 'Playfair Display', serif; font-size: 3rem; margin-bottom: 16px; }
        .gold { background: linear-gradient(135deg, #D4AF37, #F4E4BA, #D4AF37); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .lead { font-size: 1.25rem; color: rgba(255,255,255,0.7); margin-bottom: 48px; }
        .next-steps { background: #0a0a0a; border: 1px solid rgba(212,175,55,0.2); border-radius: 16px; padding: 40px; margin-bottom: 32px; text-align: left; }
        .next-steps h2 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 24px; text-align: center; }
        .steps { display: flex; flex-direction: column; gap: 24px; }
        .step { display: flex; gap: 16px; align-items: flex-start; }
        .step-num { width: 40px; height: 40px; background: linear-gradient(135deg, #D4AF37, #F4D03F); color: #0a0a0a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
        .step strong { display: block; margin-bottom: 4px; }
        .step p { font-size: 14px; color: rgba(255,255,255,0.5); margin: 0; }
        .btn-primary { display: inline-flex; padding: 14px 28px; background: linear-gradient(135deg, #D4AF37, #F4D03F); color: #0a0a0a; font-weight: 600; text-decoration: none; border-radius: 8px; }
      `}</style>
    </main>
  )
}
