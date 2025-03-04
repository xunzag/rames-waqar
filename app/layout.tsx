import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Rames Waqar | Professional Video Editor',
  description: 'Professional video editor with over a decade of experience in cinematic editing, color grading, and visual effects.',
  keywords: ['video editor', 'film editing', 'color grading', 'post-production', 'visual effects'],
  authors: [{ name: 'Rames Waqar' }],
  creator: 'Rames Waqar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Rames Waqar | Professional Video Editor',
    description: 'Professional video editor with over a decade of experience in cinematic editing, color grading, and visual effects.',
    siteName: 'Rames Waqar Portfolio',
    images: [{
      url: '/og-image.jpg', // Add an OG image in public folder
      width: 1200,
      height: 630,
      alt: 'Rames Waqar Portfolio'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rames Waqar | Professional Video Editor',
    description: 'Professional video editor with over a decade of experience in cinematic editing, color grading, and visual effects.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
