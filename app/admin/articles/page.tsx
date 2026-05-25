'use client'

import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'
import { ArticleForm } from '@/components/admin/article-form'

const supabase = createClient()

async function fetchArticles() {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

export default function ArticlesPage() {
  const { data: articles, isLoading } = useSWR('admin-articles', fetchArticles)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    await supabase.from('articles').delete().eq('id', id)
    mutate('admin-articles')
  }

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Articles</h1>
          <p className="text-muted-foreground mt-2">Manage your blog articles</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Article
        </Button>
      </div>

      {showForm && (
        <ArticleForm
          onSuccess={() => {
            setShowForm(false)
            mutate('admin-articles')
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid gap-6">
        {articles?.map((article) => (
          <Card key={article.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex-1">
                <CardTitle className="text-xl">{article.title}</CardTitle>
                {article.content && (
                  <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                    {article.content}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-3">
                  {new Date(article.created_at).toLocaleDateString()}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(article.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>

      {!articles?.length && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No articles yet. Write your first one!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
