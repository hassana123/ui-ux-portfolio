'use client'

import { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const supabase = createClient()

async function fetchSettings() {
  const { data } = await supabase.from('settings').select('*').limit(1).single()
  return data
}

async function fetchProfile() {
  const { data } = await supabase.from('profiles').select('*').limit(1).single()
  return data
}

export default function SettingsPage() {
  const { data: settings, isLoading: settingsLoading } = useSWR('admin-settings', fetchSettings)
  const { data: profile, isLoading: profileLoading } = useSWR('admin-profile', fetchProfile)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    avatar_url: '',
    experience: '',
    projects: '',
    resume_url: '',
    newsletter_email: '',
    social_github: '',
    social_twitter: '',
    social_linkedin: '',
    social_instagram: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  useEffect(() => {
    if (settings || profile) {
      setFormData((current) => ({
        ...current,
        name: profile?.name || '',
        title: profile?.title || '',
        bio: profile?.bio || '',
        avatar_url: profile?.avatar_url || '',
        experience: profile?.experience || '',
        projects: profile?.projects || '',
        resume_url: profile?.resume_url || '',
        newsletter_email: settings?.newsletter_email || '',
        social_github: settings?.social_github || '',
        social_twitter: settings?.social_twitter || '',
        social_linkedin: settings?.social_linkedin || '',
        social_instagram: settings?.social_instagram || '',
      }))
    }
  }, [settings, profile])

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setUploadError(null)

    try {
      const extension = file.name.split('.').pop() || 'pdf'
      const filePath = `resume-${Date.now()}.${extension}`
      const { error } = await supabase.storage.from('resumes').upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

      if (error) throw error

      const {
        data: { publicUrl },
      } = supabase.storage.from('resumes').getPublicUrl(filePath)

      setFormData((current) => ({ ...current, resume_url: publicUrl }))
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : 'Could not upload resume. Make sure a public Supabase Storage bucket named "resumes" exists.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (profile) {
        await supabase.from('profiles').update({
          name: formData.name,
          title: formData.title,
          bio: formData.bio,
          avatar_url: formData.avatar_url,
          experience: formData.experience,
          projects: formData.projects,
          resume_url: formData.resume_url,
        }).eq('id', profile.id)
      } else {
        await supabase.from('profiles').insert([{
          name: formData.name,
          title: formData.title,
          bio: formData.bio,
          avatar_url: formData.avatar_url,
          experience: formData.experience,
          projects: formData.projects,
          resume_url: formData.resume_url,
        }])
      }

      if (settings) {
        await supabase.from('settings').update({
          newsletter_email: formData.newsletter_email,
          social_github: formData.social_github,
          social_twitter: formData.social_twitter,
          social_linkedin: formData.social_linkedin,
          social_instagram: formData.social_instagram,
        }).eq('id', settings.id)
      } else {
        await supabase.from('settings').insert([{
          newsletter_email: formData.newsletter_email,
          social_github: formData.social_github,
          social_twitter: formData.social_twitter,
          social_linkedin: formData.social_linkedin,
          social_instagram: formData.social_instagram,
        }])
      }

      mutate('admin-settings')
      mutate('admin-profile')
    } catch (error) {
      console.log('[v0] Error saving settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (settingsLoading || profileLoading) return <p className="text-muted-foreground">Loading...</p>

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your portfolio profile and links</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Barakat O. Abdulhakeem"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="UI/UX Designer"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                rows={4}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="avatar_url">Avatar URL</Label>
              <Input
                id="avatar_url"
                value={formData.avatar_url}
                onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div className="grid gap-2">
                <Label htmlFor="experience">Experience Label</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="3+ years"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="projects">Project Count Label</Label>
                <Input
                  id="projects"
                  value={formData.projects}
                  onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
                  placeholder="28 +"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="resume_file">Resume Upload</Label>
              <Input id="resume_file" type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
              <Input
                id="resume_url"
                value={formData.resume_url}
                onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                placeholder="https://example.com/resume.pdf"
              />
              {uploadError && <p className="text-sm text-red-200">{uploadError}</p>}
              {formData.resume_url && (
                <a
                  href={formData.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#2cbff2] hover:text-white"
                >
                  Preview current resume
                </a>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact & Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="newsletter_email">Public Contact Email</Label>
              <Input
                id="newsletter_email"
                type="email"
                value={formData.newsletter_email}
                onChange={(e) => setFormData({ ...formData, newsletter_email: e.target.value })}
                placeholder="ewatechie001@gmail.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="social_github">GitHub URL</Label>
              <Input
                id="social_github"
                value={formData.social_github}
                onChange={(e) => setFormData({ ...formData, social_github: e.target.value })}
                placeholder="https://github.com/username"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="social_twitter">Twitter URL</Label>
              <Input
                id="social_twitter"
                value={formData.social_twitter}
                onChange={(e) => setFormData({ ...formData, social_twitter: e.target.value })}
                placeholder="https://twitter.com/username"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="social_linkedin">LinkedIn URL</Label>
              <Input
                id="social_linkedin"
                value={formData.social_linkedin}
                onChange={(e) => setFormData({ ...formData, social_linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="social_instagram">Instagram URL</Label>
              <Input
                id="social_instagram"
                value={formData.social_instagram}
                onChange={(e) => setFormData({ ...formData, social_instagram: e.target.value })}
                placeholder="https://instagram.com/username"
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Saving...' : 'Save Settings'}
        </Button>
      </form>
    </div>
  )
}
