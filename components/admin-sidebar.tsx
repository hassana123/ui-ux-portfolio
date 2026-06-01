'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Briefcase,
  MessageSquare,
  FileText,
  Code2,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react'

interface AdminSidebarProps {
  onLogout: () => void
}

export function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Projects', icon: Briefcase },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '/admin/articles', label: 'Articles', icon: FileText },
    { href: '/admin/tech-stack', label: 'Tech Stack', icon: Code2 },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="sticky top-0 z-40 flex w-full flex-col border-b border-[#24213d] bg-[#0d0c18]/95 backdrop-blur-xl lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 border-b border-[#24213d] px-4 py-4 sm:px-6 lg:h-24">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-[#1b1a2a] text-[#2cbff2]">
          <Sparkles className="size-5" strokeWidth={1.6} />
        </span>
        <div>
          <h1 className="text-base font-extrabold tracking-[0] text-white">EWATECHIE</h1>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">Admin Studio</p>
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto p-3 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                isActive(item.href)
                  ? 'bg-[#2cbff2] text-[#05050c]'
                  : 'text-white/58 hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <Icon className="size-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-[#24213d] p-3 lg:p-4">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-white/58 hover:bg-white/[0.06] hover:text-white"
        >
          <LogOut className="mr-3 size-5" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
