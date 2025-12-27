import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Script from "next/script"

export const metadata: Metadata = {
  title: "CookinPartners™ | Saint Vision Technologies Partner Program",
  description:
    "Earn 15-35% recurring commissions promoting AI-powered business tools. Partner with SaintSal™ AI, CookinCapital, CookinBiz. Powered by HACP™ and US Patent #10,290,222.",
  keywords: "affiliate program, partner program, SaintSal, AI, business tools, commercial lending, real estate, HACP",
  openGraph: {
    title: "CookinPartners™ | Earn 15-35% Recurring Commissions",
    description: "Partner with Saint Vision Technologies. Promote SaintSal™ AI and earn recurring commissions.",
    type: "website",
    url: "https://cookinpartners.com",
  },
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
        <Script
          src="https://link.msgsndr.com/js/external-tracking.js?id=tk_536af3445cba47f7bccd6946e71526bc"
          data-tracking-id="tk_536af3445cba47f7bccd6946e71526bc"
          strategy="afterInteractive"
        />
        {/* Apollo */}
        <Script id="apollo-tracking" strategy="afterInteractive">{`
          (function(){var w=window,d=document,s=d.createElement('script');s.async=1;
          s.src='https://assets.apollo.io/micro/website-tracker/tracker.iife.js';
          s.onload=function(){w.trackingFunctions.onLoad({appId:"67f847b15d4e8f0011b44c34"})};
          d.head.appendChild(s);})();
        `}</Script>
      </body>
    </html>
  )
}
