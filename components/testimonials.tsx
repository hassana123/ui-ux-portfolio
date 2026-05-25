'use client'

interface Testimonial {
  id: string
  quote: string
  clientName: string
  clientRole?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section>
      <h2>What Clients Say</h2>
      {testimonials.length > 0 && (
        <blockquote>
          <p>{testimonials[0].quote}</p>
          <footer>
            <strong>{testimonials[0].clientName}</strong>
            {testimonials[0].clientRole && <span>{testimonials[0].clientRole}</span>}
          </footer>
        </blockquote>
      )}
    </section>
  )
}
