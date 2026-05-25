'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface TechStackFormProps {
  onSuccess: () => void
  onCancel: () => void
  initialData?: any
}

export function TechStackForm({ onSuccess, onCancel, initialData }: TechStackFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || '',
    iconUrl: initialData?.icon_url || '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const supabase = createClient()

    try {
      const data = {
        name: formData.name,
        category: formData.category || null,
        icon_url: formData.iconUrl || null,
      }

      if (initialData) {
        await supabase.from('tech_stack').update(data).eq('id', initialData.id)
      } else {
        await supabase.from('tech_stack').insert([data])
      }
      onSuccess()
    } catch (error) {
      console.log('[v0] Error saving tech stack:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData ? 'Edit Technology' : 'Add New Technology'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Technology Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., React, Figma, Tailwind CSS"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g., Frontend, Design, CSS"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="iconUrl">Icon URL</Label>
            <Input
              id="iconUrl"
              value={formData.iconUrl}
              onChange={(e) => setFormData({ ...formData, iconUrl: e.target.value })}
              placeholder="https://example.com/icon.png"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Technology'}
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
