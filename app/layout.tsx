import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-mono' })

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Ewatechie Portfolio',
  title: {
    default: 'Ewatechie | Barakat O. Abdulhakeem - UI/UX Designer in Nigeria',
    template: '%s | Ewatechie',
  },
  description:
    'Explore the portfolio of Barakat O. Abdulhakeem, Ewatechie, a Nigeria-based UI/UX designer creating calm, simple, and impactful digital products through UX strategy, UI design, prototyping, design systems, research, brand, and motion.',
  keywords: [
    'Ewatechie',
    'Barakat O. Abdulhakeem',
    'Barakat UI UX designer',
    'UI/UX designer in Nigeria',
    'Nigeria product designer',
    'Kaduna UI designer',
    'product design portfolio',
    'UX strategy',
    'UI design',
    'design systems',
    'prototyping',
    'user research',
    'motion design',
    'startup product designer',
  ],
  authors: [{ name: 'Barakat O. Abdulhakeem' }],
  creator: 'Barakat O. Abdulhakeem',
  publisher: 'Ewatechie',
  category: 'Design Portfolio',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: '/',
    siteName: 'Ewatechie',
    title: 'Ewatechie | UI/UX Designer in Nigeria',
    description:
      'Barakat O. Abdulhakeem designs user-friendly digital products for startups and businesses, with a focus on clarity, usability, product strategy, and polished interface craft.',
    images: [
      {
        url: '/hero-potrait.png',
        width: 1200,
        height: 630,
        alt: 'Ewatechie UI/UX design portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ewatechie | Barakat O. Abdulhakeem - UI/UX Designer',
    description:
      'Nigeria-based UI/UX designer helping teams turn complex ideas into clear, intuitive, and user-friendly digital products.',
    images: ['/hero-potrait.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
