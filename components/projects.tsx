'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface Project {
  id: string
  title: string
  description?: string
  imageUrl?: string
  projectUrl?: string
  category?: string
  year?: string
}

interface ProjectsProps {
  projects: Project[]
}

// Figma fallback cards. Real Supabase project data replaces these when available.
const fallbackProjects: Project[] = Array.from({ length: 4 }, (_, index) => ({
  id: `fallback-project-${index + 1}`,
  title: 'Lumen Banking',
  description: 'Reimagining a calm, focused banking app.',
  category: 'Mobile - Fintech',
  year: '2025',
}))

const filters = [
  { label: 'Show All', count: '14' },
  { label: 'Design', count: '6' },
  { label: 'Case-Study', count: '4' },
  { label: 'Illustration', count: '2' },
  { label: 'Animation', count: '1' },
]

export function Projects({ projects }: ProjectsProps) {
  const displayedProjects = projects.length > 0 ? projects.slice(0, 4) : fallbackProjects

  return (
    <section id="work" className="relative overflow-hidden bg-[#05050c] py-16 text-white">
      {/* Shared page rails, continuing the Figma guide lines from previous sections. */}
      <div className="pointer-events-none absolute inset-y-0 left-[max(16px,calc((100%_-_1210px)/2_+_40px))] w-px bg-[#302b50]/90 max-lg:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-[max(16px,calc((100%_-_1210px)/2_+_40px))] w-px bg-[#302b50]/90 max-lg:hidden" />

      <div className="mx-auto max-w-[1210px] px-4 sm:px-8 lg:px-10">
        {/* Section heading area from the Figma frame. */}
        <div className="text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.32em] text-[#2cbff2]">Portfolio</p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,44px)] font-extrabold leading-none tracking-[0]">
            Featured Projects
          </h2>
        </div>

        {/* Small project filter labels. These are visual for now, matching the static Figma section. */}
        <ul className="mx-auto mt-8 flex max-w-[520px] flex-wrap items-center justify-center gap-x-9 gap-y-3 text-[11px] font-medium text-white/42">
          {filters.map((filter) => (
            <li key={filter.label} className="relative">
              <span>{filter.label}</span>
              <sup className="absolute -right-3 -top-2 text-[9px] text-white/38">{filter.count}</sup>
            </li>
          ))}
        </ul>

        {/* Two-column featured project grid. */}
        <ul className="mx-auto mt-12 grid max-w-[990px] grid-cols-1 gap-7 md:grid-cols-2">
          {displayedProjects.map((project) => {
            const projectHref = project.projectUrl || '/work'
            const category = project.category || 'Mobile - Fintech'
            const description = project.description || 'Reimagining a calm, focused banking app.'

            return (
              <li key={project.id}>
                <article className="group overflow-hidden rounded-[24px] bg-[#171527] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                  {/* Top preview area. Figma shows a pale placeholder when no project image is present. */}
                  <div className="relative h-[220px] overflow-hidden rounded-t-[24px] bg-[#d7d7d7]">
                    {project.imageUrl && (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    )}

                    <span className="absolute left-5 top-5 rounded-full bg-[#8c8f96] px-3 py-1.5 text-[10px] font-extrabold text-white/88">
                      {project.year || '2025'}
                    </span>

                    <a
                      href={projectHref}
                      className="absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-[#11111d] text-white transition group-hover:bg-[#2cbff2] group-hover:text-[#05050c]"
                      aria-label={`Open ${project.title}`}
                    >
                      <ArrowUpRight className="size-5" strokeWidth={2.4} />
                    </a>
                  </div>

                  {/* Bottom project metadata panel. */}
                  <div className="rounded-b-[24px] bg-[linear-gradient(135deg,#1c1a2d_0%,#151424_100%)] px-6 py-6">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#2cbff2]/80">
                      {category}
                    </p>
                    <h3 className="mt-2 text-[22px] font-extrabold leading-none tracking-[0] text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-1 text-[13px] leading-relaxed text-white/48">{description}</p>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>

        {/* Explore button under the grid. */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/work"
            className="inline-flex h-12 min-w-[178px] items-center justify-center rounded-[5px] border border-[#2b2748] bg-transparent px-7 text-[12px] font-extrabold uppercase tracking-[0] text-white/82 transition hover:border-[#2cbff2] hover:text-[#2cbff2]"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  )
}
