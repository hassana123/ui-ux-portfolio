'use client'

import { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const supabase = createClient()
const RESUME_BUCKET = 'resumes'
const MAX_RESUME_SIZE_MB = 20
const MAX_RESUME_SIZE_BYTES = MAX_RESUME_SIZE_MB * 1024 * 1024

async function fetchSettings() {
  const { data } = await supabase.from('settings').select('*').limit(1).maybeSingle()
  return data
}

async function fetchProfile() {
  const { data } = await supabase.from('profiles').select('*').limit(1).maybeSingle()
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
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const saveProfile = async (updates: Partial<typeof formData>) => {
    const profileData = {
      name: updates.name ?? formData.name,
      title: updates.title ?? formData.title,
      bio: updates.bio ?? formData.bio,
      avatar_url: updates.avatar_url ?? formData.avatar_url,
      experience: updates.experience ?? formData.experience,
      projects: updates.projects ?? formData.projects,
      resume_url: updates.resume_url ?? formData.resume_url,
    }

    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)
      .maybeSingle()

    if (fetchError) throw fetchError

    if (existingProfile?.id) {
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', existingProfile.id)
        .select()
        .single()

      if (error) throw error
      return data
    }

    const { data, error } = await supabase
      .from('profiles')
      .insert([{ id: crypto.randomUUID(), ...profileData }])
      .select()
      .single()

    if (error) throw error
    return data
  }

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

    if (file.size > MAX_RESUME_SIZE_BYTES) {
      setUploadError(`Resume must be ${MAX_RESUME_SIZE_MB} MB or smaller.`)
      event.target.value = ''
      return
    }

    setIsLoading(true)
    setUploadError(null)
    setStatusMessage(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('You must be logged in before uploading a resume.')
      }

      const extension = file.name.split('.').pop() || 'pdf'
      const filePath = `${user.id}/resume-${Date.now()}.${extension}`
      const { error } = await supabase.storage.from(RESUME_BUCKET).upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

      if (error) throw error

      const {
        data: { publicUrl },
      } = supabase.storage.from(RESUME_BUCKET).getPublicUrl(filePath)

      setFormData((current) => ({ ...current, resume_url: publicUrl }))

      const savedProfile = await saveProfile({ resume_url: publicUrl })

      mutate('admin-profile')
      setFormData((current) => ({ ...current, ...savedProfile }))
      setStatusMessage('Resume uploaded and saved to your profile.')
    } catch (error) {
      setUploadError(
        error instanceof Error
          ? error.message
          : 'Could not upload resume. Check the Supabase Storage policy for the "resumes" bucket.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setUploadError(null)
    setStatusMessage(null)

    try {
      await saveProfile({})

      if (settings) {
        const { error } = await supabase.from('settings').update({
          newsletter_email: formData.newsletter_email,
          social_github: formData.social_github,
          social_twitter: formData.social_twitter,
          social_linkedin: formData.social_linkedin,
          social_instagram: formData.social_instagram,
        }).eq('id', settings.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from('settings').insert([{
          id: crypto.randomUUID(),
          newsletter_email: formData.newsletter_email,
          social_github: formData.social_github,
          social_twitter: formData.social_twitter,
          social_linkedin: formData.social_linkedin,
          social_instagram: formData.social_instagram,
        }])

        if (error) throw error
      }

      mutate('admin-settings')
      mutate('admin-profile')
      setStatusMessage('Settings saved successfully.')
    } catch (error) {
      console.log('[v0] Error saving settings:', error)
      setUploadError(error instanceof Error ? error.message : 'Could not save settings.')
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
              <p className="text-sm text-white/52">
                Upload a PDF, DOC, or DOCX file. Maximum size: {MAX_RESUME_SIZE_MB} MB.
              </p>
              <Input
                id="resume_url"
                value={formData.resume_url}
                onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
                placeholder="https://example.com/resume.pdf"
              />
              {uploadError && <p className="text-sm text-red-200">{uploadError}</p>}
              {statusMessage && <p className="text-sm text-[#2cbff2]">{statusMessage}</p>}
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
