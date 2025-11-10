import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { RootWrapper } from "../../components/root-wrapper"
const _geist = Inter({ subsets: ["latin"] })
const _geistMono = Inter({ subsets: ["latin"] })

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
