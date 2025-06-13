import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Majestic Desk',
  description: 'Peer-to-peer trading platform',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
