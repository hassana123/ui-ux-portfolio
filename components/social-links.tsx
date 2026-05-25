'use client'

import { Instagram, Linkedin } from 'lucide-react'

interface SocialLinks {
  linktree?: string
  medium?: string
  twitter?: string
  linkedin?: string
  instagram?: string
}

interface SocialIconRowProps {
  links?: SocialLinks
  className?: string
}

export function SocialIconRow({ links, className = '' }: SocialIconRowProps) {
  const socials = [
    { label: 'Linktree', href: links?.linktree || '#', icon: LinktreeIcon },
    { label: 'Medium', href: links?.medium || '#', icon: MediumIcon },
    { label: 'LinkedIn', href: links?.linkedin || '#', icon: Linkedin },
    { label: 'Instagram', href: links?.instagram || '#', icon: Instagram },
    { label: 'X', href: links?.twitter || '#', icon: XIcon },
  ]

  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socials.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            className="grid size-12 place-items-center rounded-full border border-[#2c2942] bg-[#1a192b] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:border-[#8e87ff] hover:text-[#8e87ff] md:size-9"
            aria-label={label}
          >
            <Icon className="size-5 md:size-4" />
          </a>
        </li>
      ))}
    </ul>
  )
}

function LinktreeIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M10.85 3h2.3v5.05l3.58-3.58 1.63 1.63-3.6 3.6H20v2.3h-5.24l3.6 3.6-1.63 1.63-3.58-3.58V21h-2.3v-7.35l-3.58 3.58-1.63-1.63 3.6-3.6H4V9.7h5.24l-3.6-3.6 1.63-1.63 3.58 3.58V3Z" />
    </svg>
  )
}

function MediumIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11Zm3.1 9.7h1.4V8.6H7.1v7.6Zm2.8 0h1.25v-4.65l1.95 4.65h.86l1.94-4.65v4.65h1.25V8.6h-1.55l-2.07 4.98L11.46 8.6H9.9v7.6Z" />
    </svg>
  )
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m5 5 14 14M19 5 5 19" />
    </svg>
  )
}
