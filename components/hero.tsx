'use client'

import Link from 'next/link'
import { ArrowUpRight, BriefcaseBusiness, CalendarCheck2, Mail } from 'lucide-react'

interface HeroProps {
  name: string
  title: string
  bio: string
  avatarUrl?: string
  experience?: string
  projects?: string
}

export function Hero({ name, title, bio, avatarUrl, experience = '3+ years', projects = '28 +' }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#23203d] bg-[#05050c] pt-28 text-white">

      {/* 1. Base Gradient Layer */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-br from-[#2a14e5] via-[#12075e] to-[#05050c]" />

      {/* 2a. Ultra-subtle diagonal stripe lines — barely visible, Figma-match */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent 0px,
            transparent 38px,
            rgba(255,255,255,0.028) 38px,
            rgba(255,255,255,0.028) 40px
          )`,
        }}
      />

      {/* 2b. Soft glassy band shimmer — the "glass panel" depth layer */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            rgba(255,255,255,0.0)   0px,
            rgba(255,255,255,0.018) 18px,
            rgba(255,255,255,0.032) 20px,
            rgba(255,255,255,0.018) 22px,
            rgba(255,255,255,0.0)   40px
          )`,
        }}
      />

      {/* 2c. Specular top-left glow — single light source impression */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />

      {/* 3. Radial Vignette — dims edges, focuses center */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_70%_at_30%_40%,transparent_30%,#05050c_90%)] opacity-70" />

      {/* 4. Bottom fade to next section */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#05050c] to-transparent" />

      {/* Grid Guide Lines */}
      <div className="pointer-events-none absolute inset-y-0 left-[max(16px,calc((100%-1210px)/2+40px))] z-0 w-px bg-[#2b2748]/25 max-lg:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-[max(16px,calc((100%-1210px)/2+40px))] z-0 w-px bg-[#2b2748]/75 max-lg:hidden" />

      {/* Wireframe Vector Accents */}
      <div className="absolute left-[-31px] top-[56%] hidden h-20 w-24 rounded-[50%] border border-white/15 opacity-60 md:block before:absolute before:inset-4 before:rounded-[50%] before:border before:border-white/15" />
      <div className="absolute right-[-18px] top-[24%] hidden h-20 w-28 rounded-[50%] border border-white/15 opacity-55 lg:block before:absolute before:inset-3 before:rounded-[50%] before:border before:border-white/15 after:absolute after:left-9 after:top-[-12px] after:h-12 after:w-20 after:rounded-[50%] after:border after:border-white/15" />
      <div className="absolute right-[-30px] top-[68%] hidden size-28 rounded-full border border-white/10 opacity-45 lg:block" />

      {/* Main Hero Grid */}
      <div className="relative mx-auto grid min-h-[664px] max-w-[1210px] grid-cols-1 items-end px-4 pb-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_500px] lg:px-10">
        <div className="relative z-10 max-w-[780px] pb-2 lg:pb-[30px]">

          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-[#151429]/80 px-3 py-2 text-base text-white/72 shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur">
            <span className="size-1.5 rounded-full bg-[#f0db4f] shadow-[0_0_12px_rgba(240,219,79,0.8)]" />
            <span>Available</span>
            <span className="text-white/35">-</span>
            <span>to</span>
            <span className="text-white/35">-</span>
            <span>work</span>
          </div>

          {/* Heading */}
          <h1 className="max-w-[790px] text-[clamp(2.35rem,7vw,50px)] font-extrabold leading-[1.18] tracking-[0] text-white">
            I design calm, simple and impactful digital{' '}
            <span className="relative inline-block text-[#2cbff2]">
              experiences
              <span className="pointer-events-none absolute -inset-x-2 inset-y-[0.08em] border border-[#6c7eb8]" />
              <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2cbff2]" />
              <span className="absolute -left-3 -top-2 size-3 bg-white" />
              <span className="absolute -right-3 -top-2 size-3 bg-white" />
              <span className="absolute -bottom-2 -left-3 size-3 bg-white" />
              <span className="absolute -bottom-2 -right-3 size-3 bg-white" />
            </span>
          </h1>

          <div className="mt-7 h-0.5 w-[70px] bg-[#2cbff2]" />

          {/* Bio */}
          <div className="mt-3 max-w-[850px] text-[20px] leading-[1.45] tracking-[0] text-white/86">
            <p className="font-extrabold text-white">
              I&apos;m {name || 'Barakat'} - a {title || 'UI/UX designer'}.
            </p>
            <p>{bio}</p>
          </div>

          {/* CTAs */}
          <div className="mt-11 flex flex-wrap items-center gap-6 sm:gap-8">
            <Link
              href="/#work"
              className="inline-flex h-16 items-center gap-2.5 rounded-lg bg-white px-6 text-sm font-extrabold tracking-[0] text-[#11111a] shadow-[0_16px_36px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5"
            >
              VIEW SELECTED WORKS
              <ArrowUpRight className="size-5" strokeWidth={2.3} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-16 items-center gap-2.5 rounded-lg border border-white/12 bg-white/[0.02] px-7 text-base font-semibold text-white/92 transition hover:border-white/22 hover:bg-white/[0.06]"
            >
              Hire Me
              <Mail className="size-5" strokeWidth={1.8} />
            </Link>
          </div>

          {/* Metrics Cards */}
          <div className="mt-10 grid max-w-[485px] grid-cols-1 gap-5 rounded-[5px] border border-white/12 bg-[#11101d]/70 px-5 py-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur sm:grid-cols-2 sm:gap-0">
            <div className="flex items-center gap-4">
              <span className="grid size-[43px] shrink-0 place-items-center rounded-full bg-white/12 text-[#52c7f5]">
                <BriefcaseBusiness className="size-5" fill="currentColor" strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <strong className="block text-xl font-extrabold leading-none text-white">{experience}</strong>
                <span className="mt-2 block truncate text-sm text-white/48">crafting product experiences</span>
              </span>
            </div>
            <div className="flex items-center gap-4 sm:pl-5">
              <span className="grid size-[43px] shrink-0 place-items-center rounded-full bg-white/12 text-[#52c7f5]">
                <CalendarCheck2 className="size-5" fill="currentColor" strokeWidth={1.8} />
              </span>
              <span>
                <strong className="block text-xl font-extrabold leading-none text-white">{projects}</strong>
                <span className="mt-2 block text-sm text-white/48">Projects Done</span>
              </span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="pointer-events-none relative z-0 mx-auto mt-8 h-[520px] w-full max-w-[520px] self-end max-lg:hidden lg:mt-0 lg:h-[590px]">
          <div className="absolute bottom-0 right-[-10px] h-[88%] w-[90%] rounded-full bg-[#080812]/30 blur-3xl" />
          <img
            src={avatarUrl || '/hero-potrait.png'}
            alt={name || 'Barakat'}
            className="absolute bottom-0 right-[-55px] h-full w-auto max-w-none object-contain grayscale contrast-110"
          />
        </div>
      </div>
    </section>
  )
}