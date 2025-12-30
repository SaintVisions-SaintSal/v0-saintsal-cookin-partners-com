"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PartnerApplicationPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    affiliateExperience: "",
    payoutMethod: "",
    taxId: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/partner-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          applicationType: "partner",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application")
      }

      router.push(`/thank-you?type=partner&affiliateLink=${encodeURIComponent(data.affiliateLink || "")}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/apply" className="inline-flex items-center gap-2 text-white/50 hover:text-[#D4AF37] text-sm">
            <ArrowLeft className="h-4 w-4" /> Back to Partnership Options
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Logo and Header */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4 px-4 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37]">Partner Application</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-white mb-3">
            Join the <span className="text-[#D4AF37]">CookinPartners</span> Network
          </h1>
          <p className="text-white/60">Start earning 15% recurring commissions with instant approval</p>
        </div>

        {/* Form Card */}
        <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
          <h2 className="text-lg font-medium text-white mb-6">Partner Application Form</h2>
          <p className="text-white/50 text-sm mb-8">
            Fill out the form below to get your instant affiliate link and start earning today
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-4 uppercase tracking-wider">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white/70">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-[#1a1a1a] border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white/70">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="bg-[#1a1a1a] border-white/10 text-white"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/70">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-[#1a1a1a] border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white/70">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-[#1a1a1a] border-white/10 text-white"
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Label htmlFor="company" className="text-white/70">
                  Company / Organization *
                </Label>
                <Input
                  id="company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-[#1a1a1a] border-white/10 text-white"
                />
              </div>
            </div>

            {/* Business Information */}
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-4 uppercase tracking-wider">Business Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-white/70">
                    Industry / Audience *
                  </Label>
                  <Select value={formData.industry} onValueChange={(v) => setFormData({ ...formData, industry: v })}>
                    <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-white">
                      <SelectValue placeholder="Select your primary audience..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-estate">Real Estate Professionals</SelectItem>
                      <SelectItem value="finance">Finance & Lending</SelectItem>
                      <SelectItem value="business">Business Owners / Entrepreneurs</SelectItem>
                      <SelectItem value="marketing">Marketing & Sales</SelectItem>
                      <SelectItem value="technology">Technology / SaaS</SelectItem>
                      <SelectItem value="coaching">Coaching & Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="affiliateExperience" className="text-white/70">
                    Affiliate Experience
                  </Label>
                  <Select
                    value={formData.affiliateExperience}
                    onValueChange={(v) => setFormData({ ...formData, affiliateExperience: v })}
                  >
                    <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-white">
                      <SelectValue placeholder="Select experience level..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New to Affiliate Marketing</SelectItem>
                      <SelectItem value="some">Some Experience (1-2 years)</SelectItem>
                      <SelectItem value="experienced">Experienced (3+ years)</SelectItem>
                      <SelectItem value="professional">Professional Affiliate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Payout Information */}
            <div>
              <h3 className="text-sm font-medium text-white/70 mb-4 uppercase tracking-wider">Payout Information</h3>
              <p className="text-white/40 text-sm mb-4">How would you like to receive your commissions?</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payoutMethod" className="text-white/70">
                    Preferred Payout Method *
                  </Label>
                  <Select
                    value={formData.payoutMethod}
                    onValueChange={(v) => setFormData({ ...formData, payoutMethod: v })}
                  >
                    <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-white">
                      <SelectValue placeholder="Select payout method..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="venmo">Venmo</SelectItem>
                      <SelectItem value="cashapp">Cash App</SelectItem>
                      <SelectItem value="ach">Bank Transfer (ACH)</SelectItem>
                      <SelectItem value="check">Check (Mail)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId" className="text-white/70">
                    Tax ID / SSN (Optional)
                  </Label>
                  <Input
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    className="bg-[#1a1a1a] border-white/10 text-white"
                    placeholder="XXX-XX-XXXX"
                  />
                  <p className="text-white/30 text-xs">Required for US partners earning over $600/year</p>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D4AF37] hover:bg-[#F4D03F] text-black py-6 text-base font-semibold rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Get My Affiliate Link →"
              )}
            </Button>

            <p className="text-center text-xs text-white/40">
              Partner accounts are approved instantly. You'll receive your affiliate link immediately!
            </p>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <Image
            src="https://www.cookinpartners.com/images/cookinpartners-logo.png"
            alt="SaintSal AI"
            width={120}
            height={40}
            className="mx-auto opacity-50"
          />
        </div>
      </div>
    </main>
  )
}
