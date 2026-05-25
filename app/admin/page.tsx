'use client'

import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, MessageSquare, FileText, Code2 } from 'lucide-react'

const supabase = createClient()

async function fetchStats() {
  try {
    const [projectsRes, testimonialsRes, articlesRes, techStackRes] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact' }),
      supabase.from('testimonials').select('id', { count: 'exact' }),
      supabase.from('articles').select('id', { count: 'exact' }),
      supabase.from('tech_stack').select('id', { count: 'exact' }),
    ])

    return {
      projects: projectsRes.count || 0,
      testimonials: testimonialsRes.count || 0,
      articles: articlesRes.count || 0,
      techStack: techStackRes.count || 0,
    }
  } catch (error) {
    console.log('[v0] Error fetching stats:', error)
    return { projects: 0, testimonials: 0, articles: 0, techStack: 0 }
  }
}

export default function AdminDashboard() {
  const { data, isLoading } = useSWR('admin-stats', fetchStats)

  if (isLoading || !data) {
    return <p className="text-muted-foreground">Loading...</p>
  }

  const stats = [
    {
      title: 'Projects',
      value: data.projects,
      icon: Briefcase,
      href: '/admin/projects',
    },
    {
      title: 'Testimonials',
      value: data.testimonials,
      icon: MessageSquare,
      href: '/admin/testimonials',
    },
    {
      title: 'Articles',
      value: data.articles,
      icon: FileText,
      href: '/admin/articles',
    },
    {
      title: 'Tech Stack Items',
      value: data.techStack,
      icon: Code2,
      href: '/admin/tech-stack',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome to your portfolio admin panel</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <a key={stat.title} href={stat.href}>
              <Card className="cursor-pointer hover:border-primary transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </a>
          )
        })}
      </div>
    </div>
  )
}
