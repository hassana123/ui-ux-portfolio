'use client'

import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'
import { TechStackForm } from '@/components/admin/tech-stack-form'

const supabase = createClient()

async function fetchTechStack() {
  const { data } = await supabase
    .from('tech_stack')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

export default function TechStackPage() {
  const { data: items, isLoading } = useSWR('admin-tech-stack', fetchTechStack)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    await supabase.from('tech_stack').delete().eq('id', id)
    mutate('admin-tech-stack')
  }

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tech Stack</h1>
          <p className="text-muted-foreground mt-2">Manage technologies and tools</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Technology
        </Button>
      </div>

      {showForm && (
        <TechStackForm
          onSuccess={() => {
            setShowForm(false)
            mutate('admin-tech-stack')
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items?.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
              <div>
                <CardTitle className="text-base">{item.name}</CardTitle>
                {item.category && (
                  <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                )}
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={() => handleDelete(item.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>

      {!items?.length && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No tech stack items yet. Add your first one!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
