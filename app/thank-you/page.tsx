import { Suspense } from "react"
import ThankYouContent from "./thank-you-content"

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-white/50">Loading...</div>
        </main>
      }
    >
      <ThankYouContent />
    </Suspense>
  )
}
