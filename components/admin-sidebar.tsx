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
    <aside className="w-64 bg-card border-r border-border h-screen flex flex-col sticky top-0">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">Portfolio Admin</h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
