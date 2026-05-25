'use client'

import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import Navbar from '@/components/navbar'
import { Hero } from '@/components/hero'
import Services from '@/components/services'
import Tools from '@/components/tools'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Testimonials } from '@/components/testimonials'
import { Articles } from '@/components/articles'
import { Footer } from '@/components/footer'

const supabase = createClient()

async function fetchPortfolioData() {
  try {
    const [profileRes, projectsRes, testimonialsRes, articlesRes, techStackRes, settingsRes] =
      await Promise.all([
        supabase.from('profiles').select('*').limit(1).single(),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('articles').select('*').order('created_at', { ascending: false }),
        supabase.from('tech_stack').select('*').order('created_at', { ascending: false }),
        supabase.from('settings').select('*').limit(1).single(),
      ])

    return {
      profile: profileRes.data,
      projects: projectsRes.data || [],
      testimonials: testimonialsRes.data || [],
      articles: articlesRes.data || [],
      techStack: techStackRes.data || [],
      settings: settingsRes.data,
    }
  } catch (error) {
    console.log('[v0] Error fetching portfolio data:', error)
    return {
      profile: null,
      projects: [],
      testimonials: [],
      articles: [],
      techStack: [],
      settings: null,
    }
  }
}

export default function Home() {
  const { data } = useSWR('portfolio-data', fetchPortfolioData, {
    revalidateOnFocus: false,
  })

  const profile = data?.profile
  const projects = data?.projects || []
  const testimonials = data?.testimonials || []
  const articles = data?.articles || []
  const settings = data?.settings

  return (
    <main>
      <Navbar />
      <Hero
        name={profile?.name || 'Barakat'}
        title={profile?.title || 'UI/UX Designer'}
        bio={profile?.bio || 'I help businesses and startups turn complex ideas into intuitive, user-friendly products by focusing on clarity, usability, and meaningful user experiences.'}
        avatarUrl={profile?.avatar_url}
      />
      <Services />
      <Tools />
      <Projects projects={projects} />
      {testimonials.length > 0 && <Testimonials testimonials={testimonials} />}
      <About bio={profile?.bio || 'Have a project in mind? Let&apos;s collaborate to create something amazing.'} />
      <Articles articles={articles} />
      <Footer socialLinks={settings} />
    </main>
  )
}
