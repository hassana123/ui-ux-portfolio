'use client'

import Navbar from '@/components/navbar'
import { About } from '@/components/about'
import { Footer } from '@/components/footer'
import { BriefcaseBusiness, CalendarCheck2, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'

const skills = ['Product Design', 'UI Systems', 'Prototyping', 'Brand', 'Motion', 'Research']

const experiences = [
  { role: 'Senior Product Designer', meta: 'Linear - 2023 - Present', current: true },
  { role: 'Senior Product Designer', meta: 'Linear - 2023 - Present' },
  { role: 'Senior Product Designer', meta: 'Linear - 2023 - Present' },
  { role: 'Senior Product Designer', meta: 'Linear - 2023 - Present' },
]

export default function AboutPage() {
  return (
    <main className="bg-[#05050c] text-white">
      <Navbar active="about" />

      <section className="relative overflow-hidden px-6 pb-24 pt-40 sm:px-10">
        <div className="absolute right-[-32px] top-[180px] hidden h-20 w-28 rounded-[50%] border border-white/15 opacity-50 lg:block before:absolute before:inset-3 before:rounded-[50%] before:border before:border-white/15 after:absolute after:left-9 after:top-[-12px] after:h-12 after:w-20 after:rounded-[50%] after:border after:border-white/15" />
        <div className="absolute left-[-34px] top-[520px] hidden h-20 w-28 rounded-[50%] border border-white/15 opacity-50 lg:block before:absolute before:inset-3 before:rounded-[50%] before:border before:border-white/15 after:absolute after:left-9 after:top-[-12px] after:h-12 after:w-20 after:rounded-[50%] after:border after:border-white/15" />

        <div className="mx-auto max-w-[1210px]">
          <div className="mx-auto max-w-[570px]">
            <p className="text-[13px] text-white/40">/About Me</p>
            <h1 className="mt-6 text-[clamp(1.8rem,4vw,34px)] font-extrabold leading-tight tracking-[0]">
              Hello, I&apos;m <span className="text-[#2cbff2]">Barakat O. Abdulhakeem.</span>
            </h1>
            <p className="mt-3 text-[15px] text-white/52">UI/UX Designer based in Nigeria · 3+ years</p>
            <p className="mt-2 flex items-center gap-2 text-[12px] text-white/55">
              <span className="size-1.5 rounded-full bg-[#2cbff2]" />
              Available for select projects
            </p>

            <p className="mt-10 text-[15px] leading-relaxed text-white/48">
              I help early-stage teams turn complex problems into clear, considered interfaces. My work blends
              product strategy, UI craft, and a quiet sense of motion.
            </p>

            <div className="mt-8">
              <h2 className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white">
                <ShieldCheck className="size-4 text-[#2cbff2]" />
                Skills & Craft
              </h2>
              <ul className="mt-4 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <li key={skill} className="rounded-full bg-white/[0.07] px-4 py-2 text-[12px] font-medium text-white/68">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-[620px] overflow-hidden">
            <img src="/about.jpg" alt="Barakat holding a flower" className="h-[275px] w-full object-cover object-center" />
          </div>

          <div className="mx-auto mt-10 max-w-[570px]">
            <h2 className="mb-5 flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.08em] text-white">
              <span className="text-[#2cbff2]">⌘</span>
              Experience
            </h2>
            <div className="space-y-4">
              {experiences.map((experience, index) => (
                <article key={`${experience.role}-${index}`} className="flex items-center justify-between rounded-lg bg-[#11111d] px-8 py-6">
                  <div>
                    <h3 className="text-[17px] font-extrabold tracking-[0]">{experience.role}</h3>
                    <p className="mt-2 text-[11px] text-white/42">{experience.meta}</p>
                  </div>
                  {experience.current && (
                    <span className="rounded-full bg-[#403a75] px-4 py-1.5 text-[11px] text-[#b8c8ff]">Now</span>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 rounded-[5px] border border-white/12 bg-[#11101d]/90 px-5 py-6">
              <div className="flex items-center gap-4">
                <span className="grid size-[43px] shrink-0 place-items-center rounded-full bg-white/12 text-[#52c7f5]">
                  <BriefcaseBusiness className="size-5" fill="currentColor" strokeWidth={1.8} />
                </span>
                <span>
                  <strong className="block text-xl font-extrabold leading-none">3+ years</strong>
                  <span className="mt-2 block text-sm text-white/48">crafting product experiences</span>
                </span>
              </div>
              <div className="flex items-center gap-4 pl-5">
                <span className="grid size-[43px] shrink-0 place-items-center rounded-full bg-white/12 text-[#52c7f5]">
                  <CalendarCheck2 className="size-5" fill="currentColor" strokeWidth={1.8} />
                </span>
                <span>
                  <strong className="block text-xl font-extrabold leading-none">28 +</strong>
                  <span className="mt-2 block text-sm text-white/48">Projects Done</span>
                </span>
              </div>
            </div>
          </div>

          <section className="mx-auto mt-24 max-w-[620px]">
            <p className="text-[16px] font-bold text-[#2cbff2]">· My design philosophy</p>
            <div className="relative mt-10">
              <span className="absolute right-12 top-[-40px] text-[110px] font-extrabold leading-none text-white/10">”</span>
              <blockquote className="max-w-[540px] text-[clamp(2rem,4vw,42px)] font-extrabold leading-[1.18] tracking-[0]">
                Design is the quiet conversation between a product and the person using it.&quot;
              </blockquote>
            </div>
            <p className="mt-10 text-[18px] font-semibold">Ewatechie</p>
            <p className="mt-2 text-[13px] text-white/44">UI/UX Designer</p>
          </section>

          <section className="mx-auto mt-28 grid max-w-[1070px] grid-cols-1 border border-[#24213d] md:grid-cols-3">
            <ContactCard icon={Phone} label="Phone" value="+234-906-819-5400" href="tel:+2349068195400" />
            <ContactCard icon={Mail} label="Email" value="ewatechie001@gmail.com" href="mailto:ewatechie001@gmail.com" highlighted />
            <ContactCard icon={MapPin} label="Location" value="Kaduna, Nigeria." />
          </section>
        </div>
      </section>

      <About bio="" />
      <Footer />
    </main>
  )
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  highlighted = false,
}: {
  icon: typeof Phone
  label: string
  value: string
  href?: string
  highlighted?: boolean
}) {
  const content = <span className="text-[16px] text-white/82">{value}</span>

  return (
    <div className={`px-12 py-10 ${highlighted ? 'bg-[#222133]' : 'bg-transparent'}`}>
      <div className="flex items-center gap-5">
        <span className={`grid size-12 place-items-center rounded-full ${highlighted ? 'bg-[#52c7f5]' : 'bg-white/12'}`}>
          <Icon className="size-5 text-white" fill="currentColor" strokeWidth={1.8} />
        </span>
        <h2 className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-white/72">{label}</h2>
      </div>
      <div className="mt-8">
        {href ? (
          <a href={href} className="text-[16px] text-white/82 transition hover:text-[#2cbff2]">
            {value}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  )
}
