'use client'

import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Edit2, Plus } from 'lucide-react'
import { ProjectForm } from '@/components/admin/project-form'

const supabase = createClient()

async function fetchProjects() {
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
  return data || []
}

export default function ProjectsPage() {
  const { data: projects, isLoading } = useSWR('admin-projects', fetchProjects)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    await supabase.from('projects').delete().eq('id', id)
    mutate('admin-projects')
  }

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      {showForm && (
        <ProjectForm
          onSuccess={() => {
            setShowForm(false)
            mutate('admin-projects')
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid gap-6">
        {projects?.map((project) => (
          <Card key={project.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle>{project.title}</CardTitle>
                {project.description && (
                  <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditingId(project.id)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </CardHeader>
            {project.project_url && (
              <CardContent>
                <a
                  href={project.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  {project.project_url}
                </a>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {!projects?.length && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No projects yet. Create your first one!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
