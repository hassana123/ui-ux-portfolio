'use client'

interface Testimonial {
  id: string
  quote: string
  clientName?: string
  client_name?: string
  clientRole?: string
  client_role?: string
  client_avatar_url?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const displayedTestimonials = testimonials.slice(0, 3)

  return (
    <section className="relative overflow-hidden border-y border-[#17162a] bg-[#080812] py-20 text-white">
      <div className="mx-auto max-w-[1210px] px-6 sm:px-10">
        <div className="text-center">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#2cbff2]">Testimonials</p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,44px)] font-extrabold leading-none tracking-[0]">
            What Clients Say
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {displayedTestimonials.map((testimonial) => {
            const clientName = testimonial.clientName || testimonial.client_name || 'Client'
            const clientRole = testimonial.clientRole || testimonial.client_role

            return (
              <li key={testimonial.id}>
                <blockquote className="flex h-full flex-col justify-between rounded-lg border border-[#24213d] bg-[#12111e] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <p className="text-[15px] leading-relaxed text-white/68">{`"${testimonial.quote}"`}</p>
                  <footer className="mt-8 flex items-center gap-3">
                    {testimonial.client_avatar_url ? (
                      <img
                        src={testimonial.client_avatar_url}
                        alt={clientName}
                        className="size-11 rounded-full object-cover"
                      />
                    ) : (
                      <span className="grid size-11 place-items-center rounded-full bg-[#2cbff2]/14 text-sm font-extrabold text-[#2cbff2]">
                        {clientName.slice(0, 1)}
                      </span>
                    )}
                    <span>
                      <strong className="block text-[14px] text-white">{clientName}</strong>
                      {clientRole && <span className="mt-1 block text-[12px] text-white/42">{clientRole}</span>}
                    </span>
                  </footer>
                </blockquote>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
