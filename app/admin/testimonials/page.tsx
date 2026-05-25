'use client'

import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trash2, Plus } from 'lucide-react'
import { TestimonialForm } from '@/components/admin/testimonial-form'

const supabase = createClient()

async function fetchTestimonials() {
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

export default function TestimonialsPage() {
  const { data: testimonials, isLoading } = useSWR('admin-testimonials', fetchTestimonials)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    mutate('admin-testimonials')
  }

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>
          <p className="text-muted-foreground mt-2">Manage client testimonials</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Testimonial
        </Button>
      </div>

      {showForm && (
        <TestimonialForm
          onSuccess={() => {
            setShowForm(false)
            mutate('admin-testimonials')
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid gap-6">
        {testimonials?.map((testimonial) => (
          <Card key={testimonial.id}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="flex-1">
                <p className="text-muted-foreground italic mb-3">{`"${testimonial.quote}"`}</p>
                <div>
                  <p className="font-semibold">{testimonial.client_name}</p>
                  {testimonial.client_role && (
                    <p className="text-sm text-muted-foreground">{testimonial.client_role}</p>
                  )}
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDelete(testimonial.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>

      {!testimonials?.length && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No testimonials yet. Add your first one!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
