'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'

interface NavbarProps {
  active?: 'home' | 'work' | 'about' | 'articles' | 'contact'
}

export default function Navbar({ active = 'home' }: NavbarProps) {
  const links = [
    { label: 'HOME', href: '/', id: 'home' },
    { label: 'WORK', href: '/#work', id: 'work' },
    { label: 'ABOUT ME', href: '/about', id: 'about' },
    { label: 'ARTICLES', href: '/#articles', id: 'articles' },
    { label: 'CONTACT ME', href: '/contact', id: 'contact' },
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-transparent">
      <nav className="mx-auto flex h-24 max-w-[1210px] items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-[20px] font-bold tracking-wider text-white">
          <span className="grid size-8 place-items-center rounded-full border border-white/10 bg-[#1B1A2A] text-white/70">
            <Sparkles className="size-4" strokeWidth={1.6} />
          </span>
          <span className="font-black tracking-widest text-white">EWATECHIE</span>
        </Link>

        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative block text-[13px] font-bold tracking-widest transition-colors ${
                  active === link.id ? 'text-[#2cbff2]' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                {active === link.id && (
                  <span className="absolute -bottom-4 left-1/2 h-[2px] w-12 -translate-x-1/2 bg-[#2cbff2]">
                    <span className="absolute left-0 top-1/2 size-1 -translate-y-1/2 rounded-full bg-[#2cbff2]" />
                    <span className="absolute right-0 top-1/2 size-1 -translate-y-1/2 rounded-full bg-[#2cbff2]" />
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/resume"
          className="hidden h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-medium text-white/90 backdrop-blur-md transition hover:border-white/20 hover:bg-white/[0.08] md:flex"
        >
          My Resume
        </Link>
      </nav>
    </header>
  )
}
