import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Shield,
  Users,
  TrendingUp,
  Building2,
  Briefcase,
  Home,
  DollarSign,
  Percent,
  Award,
  Star,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex justify-between items-center bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-[#D4AF37]/10">
        <div className="flex items-center gap-3">
          <Image
            src="https://www.cookinpartners.com/images/cookinpartnerslogo.jpeg"
            alt="CookinPartners"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-semibold text-white">
            CookinPartners<span className="text-[#D4AF37]">™</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#ecosystem" className="text-sm text-white/60 hover:text-[#D4AF37] transition-colors">
            Ecosystem
          </Link>
          <Link href="#tiers" className="text-sm text-white/60 hover:text-[#D4AF37] transition-colors">
            Commission Tiers
          </Link>
          <Link href="#about" className="text-sm text-white/60 hover:text-[#D4AF37] transition-colors">
            About
          </Link>
        </div>
        <Link href="/apply">
          <Button className="btn-gold rounded-lg font-semibold">Become a Partner</Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-32 pb-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(212,175,55,0.12),transparent_50%)]" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">
              Partner Program Active
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6">
            <span className="text-white">Join the</span> <span className="gold-gradient">SaintSal™</span>{" "}
            <span className="text-white">Ecosystem</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 font-light mb-4 max-w-2xl mx-auto">
            Premium AI-powered business solutions. Your gateway to the future.
          </p>

          <p className="text-[#D4AF37] font-medium tracking-wide mb-10">
            "The earth is the LORD's, and everything in it" — Psalm 24:1
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link href="/apply/partner">
              <Button size="lg" className="btn-gold rounded-xl px-8 py-6 text-base font-semibold">
                Apply as Partner <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/apply/vp">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl px-8 py-6 text-base border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] bg-transparent"
              >
                VP & Investors
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 pt-8 border-t border-white/5">
            <div className="text-center">
              <div className="text-3xl font-light text-white">30%</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Max Commission</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-white">9</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-light text-white">Recurring</div>
              <div className="text-xs text-white/40 uppercase tracking-wider mt-1">Commissions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section id="ecosystem" className="py-24 px-6 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">The Ecosystem</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-white mb-4">
              Three Platforms, <span className="gold-gradient">One Vision</span>
            </h2>
            <p className="text-lg text-white/50 font-light max-w-xl mx-auto">
              Comprehensive solutions for real estate and business professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all group">
              <div className="text-4xl mb-5">🤖</div>
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-2">SaintSal.ai</h3>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">
                AI-powered business companion. Automate workflows, generate content, and scale your operations.
              </p>
              <span className="text-[#D4AF37] text-sm font-medium flex items-center gap-1 group-hover:underline">
                Primary Product <ArrowRight className="h-4 w-4" />
              </span>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all group">
              <div className="text-4xl mb-5">💰</div>
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-2">CookinCapital</h3>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">
                Investment fund focused on AI and real estate technology. Exclusive access for qualified partners.
              </p>
              <span className="text-[#D4AF37] text-sm font-medium flex items-center gap-1 group-hover:underline">
                VP Access <ArrowRight className="h-4 w-4" />
              </span>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all group">
              <div className="text-4xl mb-5">🏠</div>
              <h3 className="text-xl font-semibold text-[#D4AF37] mb-2">CookinFlips</h3>
              <p className="text-sm text-white/60 mb-4 leading-relaxed">
                Real estate investment opportunities. Fix & flip, rental properties, and development projects.
              </p>
              <span className="text-[#D4AF37] text-sm font-medium flex items-center gap-1 group-hover:underline">
                Coming Soon <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Ideal Partners</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-white">
              Who This Is <span className="gold-gradient">For</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Building2, title: "Real Estate Brokers", desc: "Team leaders" },
              { icon: Briefcase, title: "Fund Managers", desc: "Capital allocators" },
              { icon: Home, title: "Realtors", desc: "Licensed agents" },
              { icon: DollarSign, title: "Loan Officers", desc: "Mortgage pros" },
              { icon: Users, title: "Influencers", desc: "Content creators" },
              { icon: TrendingUp, title: "Coaches", desc: "Business mentors" },
              { icon: Shield, title: "Consultants", desc: "Industry experts" },
              { icon: Star, title: "Entrepreneurs", desc: "Business owners" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#1a1a1a] border border-white/5 rounded-xl p-6 text-center hover:border-[#D4AF37]/30 transition-all"
              >
                <item.icon className="h-8 w-8 text-[#D4AF37] mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Tiers */}
      <section id="tiers" className="py-24 px-6 bg-[#111]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Earn More</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-white mb-4">
              Commission <span className="gold-gradient">Tiers</span>
            </h2>
            <p className="text-lg text-white/50 font-light">Recurring commissions on all SaintSal™ subscriptions.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Partner Tier */}
            <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/10 rounded-full text-xs font-bold tracking-wide text-white/60 uppercase">
                Entry
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mt-4 mb-2">Partner</p>
              <div className="text-5xl font-extralight text-white mb-2">20%</div>
              <p className="text-sm text-white/50 mb-8">Recurring Commission</p>
              <ul className="text-left space-y-3 mb-8">
                {["Unique affiliate link", "Real-time dashboard", "Marketing materials", "Email support"].map(
                  (f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-white/60 pb-3 border-b border-white/5 last:border-0"
                    >
                      <Percent className="h-4 w-4 text-[#D4AF37] mt-0.5" />
                      {f}
                    </li>
                  ),
                )}
              </ul>
              <Link
                href="/apply/partner"
                className="block w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-semibold text-sm text-center"
              >
                Apply Now
              </Link>
            </div>

            {/* Leader Tier */}
            <div className="bg-gradient-to-b from-[#D4AF37]/10 to-[#1a1a1a] border border-[#D4AF37] rounded-3xl p-8 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full text-xs font-bold tracking-wide text-black uppercase">
                Leadership
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mt-4 mb-2">Leader</p>
              <div className="text-5xl font-extralight text-white mb-2">25%</div>
              <p className="text-sm text-white/50 mb-8">Recurring Commission</p>
              <ul className="text-left space-y-3 mb-8">
                {["Everything in Partner", "Priority support", "Co-branded materials", "Quarterly strategy calls"].map(
                  (f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-white/60 pb-3 border-b border-white/5 last:border-0"
                    >
                      <Award className="h-4 w-4 text-[#D4AF37] mt-0.5" />
                      {f}
                    </li>
                  ),
                )}
              </ul>
              <Link
                href="/apply/partner"
                className="block w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-semibold text-sm text-center"
              >
                Apply Now
              </Link>
            </div>

            {/* VP Tier */}
            <div className="bg-gradient-to-b from-purple-500/10 to-[#1a1a1a] border border-purple-500/50 rounded-3xl p-8 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full text-xs font-bold tracking-wide text-white uppercase">
                Invite Only
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mt-4 mb-2">VP Partner</p>
              <div className="text-5xl font-extralight text-white mb-2">30%</div>
              <p className="text-sm text-white/50 mb-8">Recurring Commission</p>
              <ul className="text-left space-y-3 mb-8">
                {["Everything in Leader", "Fund investment access", "Board advisory role", "Revenue share options"].map(
                  (f, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-white/60 pb-3 border-b border-white/5 last:border-0"
                    >
                      <Zap className="h-4 w-4 text-purple-400 mt-0.5" />
                      {f}
                    </li>
                  ),
                )}
              </ul>
              <Link
                href="/apply/vp"
                className="block w-full py-3 rounded-xl bg-white/5 text-white/40 font-semibold text-sm text-center"
              >
                Request Invite
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About / IP */}
      <section id="about" className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D4AF37] mb-4">Foundation</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-white mb-4">
              Protected <span className="gold-gradient">Innovation</span>
            </h2>
            <p className="text-lg text-white/50 font-light max-w-xl mx-auto">
              Built on patented technology and years of industry expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold tracking-wide uppercase text-white/40">US Patent</span>
                <span className="px-2 py-1 rounded-full text-xs font-semibold uppercase bg-green-500/15 text-green-500">
                  Granted
                </span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Patent #10,290,222</h4>
              <p className="text-xl font-light text-[#D4AF37]">May 14, 2019</p>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold tracking-wide uppercase text-white/40">Trademark</span>
                <span className="px-2 py-1 rounded-full text-xs font-semibold uppercase bg-green-500/15 text-green-500">
                  Active
                </span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">SaintSal™</h4>
              <p className="text-xl font-light text-[#D4AF37]">Registered</p>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold tracking-wide uppercase text-white/40">Platform</span>
                <span className="px-2 py-1 rounded-full text-xs font-semibold uppercase bg-blue-500/15 text-blue-500">
                  Live
                </span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">SaintSal.ai</h4>
              <p className="text-xl font-light text-[#D4AF37]">2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#0a0a0a] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,175,55,0.1),transparent_60%)]" />
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extralight text-white mb-6">
            Ready to <span className="gold-gradient">Partner</span>?
          </h2>
          <p className="text-lg text-white/50 mb-10">
            Join the Saint Vision ecosystem and start earning recurring commissions today.
          </p>
          <Link href="/apply">
            <Button size="lg" className="btn-gold rounded-xl px-10 py-6 text-base font-semibold">
              Start Your Application <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#111] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="https://www.cookinpartners.com/images/cookinpartnerslogo.jpeg"
                alt="CookinPartners"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-sm text-white/60">CookinPartners™ by Saint Vision Technologies</span>
            </div>
            <div className="flex gap-6 text-sm text-white/40">
              <Link href="#" className="hover:text-[#D4AF37]">
                Privacy
              </Link>
              <Link href="#" className="hover:text-[#D4AF37]">
                Terms
              </Link>
              <span>US Patent #10,290,222</span>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-white/30">
            © 2025 Saint Vision Technologies LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
