"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ThankYouContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get("type") || "partner"
  const affiliateLink = searchParams.get("affiliateLink") || ""
  const [copied, setCopied] = useState(false)

  const isVP = type === "vp"

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6 py-24">
      <div className="max-w-lg mx-auto text-center">
        <div
          className={`w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center ${isVP ? "bg-purple-500/20" : "bg-[#D4AF37]/20"}`}
        >
          <CheckCircle2 className={`h-10 w-10 ${isVP ? "text-purple-400" : "text-[#D4AF37]"}`} />
        </div>

        {isVP ? (
          <>
            <h1 className="text-3xl font-light text-white mb-4">
              Application <span className="text-purple-400">Received</span>
            </h1>
            <p className="text-white/50 mb-8">
              Thank you for your interest in our VP program. Your application is under review. Our team will contact you
              within 48 hours to discuss next steps.
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-8">
              <p className="text-sm text-purple-300">
                VP applications receive priority review and include access to CookinCapital fund investment
                opportunities.
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-light text-white mb-4">
              Welcome to <span className="gold-gradient">CookinPartners</span>
            </h1>
            <p className="text-white/50 mb-8">
              Your partner application has been approved. Here is your unique affiliate link to start earning
              commissions.
            </p>

            {affiliateLink && (
              <div className="bg-[#1a1a1a] border border-[#D4AF37]/30 rounded-xl p-6 mb-8">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Your Affiliate Link</p>
                <div className="flex items-center gap-2 bg-[#0a0a0a] rounded-lg p-3 mb-4">
                  <code className="flex-1 text-sm text-[#D4AF37] break-all text-left">{affiliateLink}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCopy}
                    className="shrink-0 text-white/50 hover:text-[#D4AF37]"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                {copied && <p className="text-green-400 text-sm">Copied to clipboard!</p>}
                <p className="text-xs text-white/40 mt-4">
                  Share this link with your network. When someone signs up for SaintSal through your link, you earn
                  recurring commission.
                </p>
              </div>
            )}
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] bg-transparent"
            >
              Back to Home
            </Button>
          </Link>
          <a href="https://saintsal.tech" target="_blank" rel="noopener noreferrer">
            <Button className={isVP ? "bg-purple-500 hover:bg-purple-600" : "btn-gold"}>
              Visit SaintSal.tech <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>
    </main>
  )
}
