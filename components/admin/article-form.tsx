'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface ArticleFormProps {
  onSuccess: () => void
  onCancel: () => void
  initialData?: any
}

export function ArticleForm({ onSuccess, onCancel, initialData }: ArticleFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    featuredImageUrl: initialData?.featured_image_url || '',
    slug: initialData?.slug || '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const supabase = createClient()

    try {
      const data = {
        title: formData.title,
        content: formData.content,
        featured_image_url: formData.featuredImageUrl,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
      }

      if (initialData) {
        await supabase.from('articles').update(data).eq('id', initialData.id)
      } else {
        await supabase.from('articles').insert([data])
      }
      onSuccess()
    } catch (error) {
      console.log('[v0] Error saving article:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Article' : 'Add New Article'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Article title"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Article content"
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              rows={6}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="featuredImageUrl">Featured Image URL</Label>
            <Input
              id="featuredImageUrl"
              value={formData.featuredImageUrl}
              onChange={(e) => setFormData({ ...formData, featuredImageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Slug (auto-generated if empty)</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="article-slug"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Article'}
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
