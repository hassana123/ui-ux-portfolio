'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface TestimonialFormProps {
  onSuccess: () => void
  onCancel: () => void
  initialData?: any
}

export function TestimonialForm({ onSuccess, onCancel, initialData }: TestimonialFormProps) {
  const [formData, setFormData] = useState({
    quote: initialData?.quote || '',
    clientName: initialData?.client_name || '',
    clientRole: initialData?.client_role || '',
    clientAvatarUrl: initialData?.client_avatar_url || '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const supabase = createClient()

    try {
      const data = {
        quote: formData.quote,
        client_name: formData.clientName,
        client_role: formData.clientRole,
        client_avatar_url: formData.clientAvatarUrl,
      }

      if (initialData) {
        await supabase.from('testimonials').update(data).eq('id', initialData.id)
      } else {
        await supabase.from('testimonials').insert([data])
      }
      onSuccess()
    } catch (error) {
      console.log('[v0] Error saving testimonial:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Testimonial' : 'Add New Testimonial'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="quote">Quote</Label>
            <textarea
              id="quote"
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              placeholder="Client testimonial"
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              rows={4}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              placeholder="Full name"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="clientRole">Client Role</Label>
            <Input
              id="clientRole"
              value={formData.clientRole}
              onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
              placeholder="Job title or company"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="clientAvatarUrl">Avatar URL</Label>
            <Input
              id="clientAvatarUrl"
              value={formData.clientAvatarUrl}
              onChange={(e) => setFormData({ ...formData, clientAvatarUrl: e.target.value })}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Testimonial'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
