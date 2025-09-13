import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/auth-provider"
import { AIChatbot } from "@/components/ai-chatbot"
import { Suspense } from "react"
import "./globals.css"

export const metadata = {
  title: "Jharkhand Tourism - Smart Digital Platform",
  description:
    "Discover the beauty of Jharkhand with AI-powered travel planning, cultural experiences, and eco-tourism",
  generator: "v0.app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
        <AIChatbot />
        <Analytics />
      </body>
    </html>
  )
}
