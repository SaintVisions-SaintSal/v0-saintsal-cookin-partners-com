import Link from "next/link"
import { ArrowRight, Users, Crown } from "lucide-react"

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(212,175,55,0.08),transparent_50%)]" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-8">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">Applications Open</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extralight text-white mb-4">
          Choose Your <span className="gold-gradient">Path</span>
        </h1>
        <p className="text-lg text-white/50 mb-12">Select the partnership tier that best fits your goals.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Partner Application */}
          <Link href="/apply/partner" className="group">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 text-left hover:border-[#D4AF37]/50 transition-all h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F4D03F] flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Partner Program</h3>
              <p className="text-sm text-white/50 mb-4">
                20-25% recurring commission. For realtors, brokers, loan officers, influencers, and entrepreneurs.
              </p>
              <div className="flex items-center gap-2 text-[#D4AF37] font-medium text-sm group-hover:underline">
                Apply Now <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* VP Application */}
          <Link href="/apply/vp" className="group">
            <div className="bg-gradient-to-b from-purple-500/5 to-[#1a1a1a] border border-purple-500/30 rounded-2xl p-8 text-left hover:border-purple-500/60 transition-all h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-400 flex items-center justify-center mb-6">
                <Crown className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">VP & Investors</h3>
              <p className="text-sm text-white/50 mb-4">
                30% commission + fund access. For fund managers, institutional investors, and strategic partners.
              </p>
              <div className="flex items-center gap-2 text-purple-400 font-medium text-sm group-hover:underline">
                Request Invite <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>

        <p className="mt-12 text-sm text-white/30">
          Already a partner?{" "}
          <Link href="https://saintsal.ai" className="text-[#D4AF37] hover:underline">
            Access your dashboard
          </Link>
        </p>
      </div>
    </main>
  )
}
