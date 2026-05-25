import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Barakat O. Abdulhakeem',
  description:
    'Learn about Barakat O. Abdulhakeem, Ewatechie, a UI/UX designer based in Nigeria with 3+ years of experience crafting product experiences across UI systems, prototyping, research, brand, and motion.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: '/about',
    title: 'About Barakat O. Abdulhakeem | Ewatechie',
    description:
      'Meet Ewatechie, a Nigeria-based UI/UX designer helping early-stage teams turn complex problems into clear, considered interfaces.',
    images: [
      {
        url: '/about.jpg',
        width: 1200,
        height: 630,
        alt: 'Barakat O. Abdulhakeem, Ewatechie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Barakat O. Abdulhakeem | Ewatechie',
    description:
      'UI/UX designer in Nigeria focused on product strategy, UI craft, prototyping, design systems, research, brand, and motion.',
    images: ['/about.jpg'],
  },
}

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
