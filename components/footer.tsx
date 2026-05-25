'use client'

import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { SocialIconRow } from '@/components/social-links'

interface SocialLinks {
  linktree?: string
  medium?: string
  twitter?: string
  linkedin?: string
  instagram?: string
}

interface FooterProps {
  socialLinks?: SocialLinks
}

const footerLinks = [
  { label: 'HOME', href: '/' },
  { label: 'WORK', href: '/#work' },
  { label: 'ABOUT ME', href: '/about' },
  { label: 'ARTICLES', href: '/#articles' },
  { label: 'CONTACT ME', href: '/contact' },
]

export function Footer({ socialLinks }: FooterProps) {
  return (
    <footer className="border-t border-[#17162a] bg-black text-white">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid min-h-[172px] grid-cols-1 items-center border-b border-[#17162a] px-8 py-10 md:grid-cols-[1fr_1.08fr] lg:px-[88px]">
          <div className="flex flex-col items-start gap-5">
            <span className="grid size-14 place-items-center rounded-full border border-[#37324f] bg-[#1c1b31]">
              <Sparkles className="size-7 text-white" strokeWidth={1.5} />
            </span>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-[32px] font-extrabold tracking-[0]">
                EWATECHIE<sup className="ml-1 align-super text-[9px] font-medium text-white/70">TM</sup>
              </Link>
              <Link
                href="/contact"
                className="grid h-6 w-14 place-items-center rounded-full bg-[linear-gradient(90deg,#8f7cff,#77cbff)] text-[#05050c]"
                aria-label="Contact Ewatechie"
              >
                <ArrowUpRight className="size-4" strokeWidth={2.4} />
              </Link>
            </div>
          </div>

          <div className="mt-10 border-[#17162a] md:mt-0 md:border-l md:pl-[190px]">
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <span className="mr-10 text-[15px] font-bold uppercase text-white/30">Links</span>
              {footerLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[15px] font-bold transition hover:text-[#8e87ff] ${
                    index === 0 ? 'text-[#8e87ff]' : 'text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex min-h-[84px] flex-col items-start justify-between gap-8 px-8 py-6 md:flex-row md:items-center lg:px-[72px]">
          <nav aria-label="Social links">
            <SocialIconRow links={socialLinks} />
          </nav>

          <p className="text-[14px] font-extrabold uppercase tracking-[0.08em] text-white/58">
            &copy; 2026 EWATECHIE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}
