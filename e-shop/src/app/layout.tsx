import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { RootWrapper } from "../../components/root-wrapper"
const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Shop",
  description: "Modern eCommerce platform",
  generator: "E-shop",
  icons: {
    icon: [
      {
        url: "/elogo1.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/elogo1.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/elogo1.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <RootWrapper>{children}</RootWrapper>
        <Analytics />
      </body>
    </html>
  )
}
