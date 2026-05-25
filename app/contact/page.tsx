'use client'

import Navbar from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SocialIconRow } from '@/components/social-links'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <main className="min-h-screen bg-[#11101b] text-white">
      <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_17%_20%,rgba(37,49,94,0.28)_0%,transparent_24%),#11101b]">
        <Navbar active="contact" />

        <div className="mx-auto flex min-h-screen max-w-[1210px] items-center justify-center px-6 pb-20 pt-32 sm:px-10">
          <div className="w-full max-w-[620px]">
            <p className="text-[17px] text-white/32">Contact Me</p>
            <h1 className="mt-5 text-[clamp(2.8rem,5vw,56px)] font-extrabold leading-none tracking-[0]">
              Let&apos;s <span className="text-[#2cbff2]">talk.</span>
            </h1>
            <p className="mt-6 max-w-[430px] text-[18px] leading-[1.45] text-white/52">
              Have a project in mind, or just want to say Hi?
              <br />
              Drop a note - I reply within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-12 space-y-8">
              <FormField label="NAME">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Jordan Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-[62px] w-full rounded-lg border border-[#2a283c] bg-[#1b1a2a] px-5 text-[15px] text-white outline-none transition placeholder:text-white/60 focus:border-[#746cff] focus:ring-4 focus:ring-[#746cff]/10"
                />
              </FormField>

              <FormField label="EMAIL">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="jordan@studio.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-[62px] w-full rounded-lg border border-[#2a283c] bg-[#1b1a2a] px-5 text-[15px] text-white outline-none transition placeholder:text-white/38 focus:border-[#746cff] focus:ring-4 focus:ring-[#746cff]/10"
                />
              </FormField>

              <FormField label="MESSAGE">
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me a little about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[126px] w-full resize-none rounded-lg border border-[#2a283c] bg-[#1b1a2a] px-5 py-5 text-[15px] text-white outline-none transition placeholder:text-white/38 focus:border-[#746cff] focus:ring-4 focus:ring-[#746cff]/10"
                />
              </FormField>

              <button
                type="submit"
                className="mt-5 h-[66px] w-full rounded-lg bg-[linear-gradient(90deg,#956cff_0%,#51c9f6_100%)] text-[16px] font-extrabold text-[#070711] shadow-[0_0_28px_rgba(81,201,246,0.36),0_0_34px_rgba(149,108,255,0.28)] transition hover:-translate-y-0.5"
              >
                Send message -&gt;
              </button>
            </form>

            <div className="mt-20 text-center">
              <h2 className="text-[13px] font-medium uppercase tracking-[0.08em] text-white/34">Or Find Me On</h2>
              <nav aria-label="Social links" className="mt-5 flex justify-center">
                <SocialIconRow />
              </nav>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  const id = label.toLowerCase()

  return (
    <div>
      <label htmlFor={id} className="mb-4 block text-[16px] font-medium uppercase tracking-[0] text-white/30">
        {label}
      </label>
      {children}
    </div>
  )
}
