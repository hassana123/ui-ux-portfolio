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
    bio: '',
    avatar_url: '',
    newsletter_email: '',
    social_github: '',
    social_twitter: '',
    social_linkedin: '',
    social_instagram: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (settings && profile) {
      setFormData({
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
        newsletter_email: settings.newsletter_email || '',
        social_github: settings.social_github || '',
        social_twitter: settings.social_twitter || '',
        social_linkedin: settings.social_linkedin || '',
        social_instagram: settings.social_instagram || '',
      })
    }
  }, [settings, profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (profile) {
        await supabase.from('profiles').update({
          bio: formData.bio,
          avatar_url: formData.avatar_url,
        }).eq('id', profile.id)
      }

      if (settings) {
        await supabase.from('settings').update({
          newsletter_email: formData.newsletter_email,
          social_github: formData.social_github,
          social_twitter: formData.social_twitter,
          social_linkedin: formData.social_linkedin,
          social_instagram: formData.social_instagram,
        }).eq('id', settings.id)
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact & Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="newsletter_email">Newsletter Email</Label>
              <Input
                id="newsletter_email"
                type="email"
                value={formData.newsletter_email}
                onChange={(e) => setFormData({ ...formData, newsletter_email: e.target.value })}
                placeholder="hello@example.com"
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
