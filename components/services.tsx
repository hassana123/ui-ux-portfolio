import { Code2, Layers3, Palette, SlidersHorizontal, Zap } from 'lucide-react'

// Service cards shown directly below the hero section.
const services = [
  { label: 'UI Design', icon: Palette },
  { label: 'UX Strategy', icon: SlidersHorizontal },
  { label: 'Motion', icon: Zap },
  { label: 'Design System', icon: Layers3 },
  { label: 'Prototype', icon: Code2 },
]

export default function Services() {
  return (
    <section className="relative overflow-hidden border-b border-[#23203d] bg-[#05050c] text-white">
      {/* Shared page rails, continuing the Figma guide lines from the hero. */}
      <div className="pointer-events-none absolute inset-y-0 left-[max(16px,calc((100%_-_1210px)/2_+_40px))] w-px bg-[#302b50]/90 max-lg:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-[max(16px,calc((100%_-_1210px)/2_+_40px))] w-px bg-[#302b50]/90 max-lg:hidden" />

      <div className="mx-auto max-w-[1210px] px-4 py-8 sm:px-8 lg:px-10">
        {/* Section title, with the second phrase styled like a selected Figma text layer. */}
        <h2 className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center text-[clamp(1.35rem,3vw,28px)] font-extrabold uppercase leading-none tracking-[0]">
          <span>What I Can</span>
          <span className="relative inline-block px-3 py-1 text-[#2cbff2]">
            Do For You
            <span className="pointer-events-none absolute inset-0 border border-[#6c7eb8]" />
            <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2cbff2]" />
            <span className="absolute -left-1.5 -top-1.5 size-2 bg-[#52c7f5]" />
            <span className="absolute -right-1.5 -top-1.5 size-2 bg-[#52c7f5]" />
            <span className="absolute -bottom-1.5 -left-1.5 size-2 bg-[#52c7f5]" />
            <span className="absolute -bottom-1.5 -right-1.5 size-2 bg-[#52c7f5]" />
          </span>
        </h2>

        {/* Responsive service grid: 5 columns on desktop, then wraps cleanly on smaller screens. */}
        <ul className="mx-auto mt-12 grid max-w-[900px] grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {services.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="flex h-[116px] flex-col items-center justify-center rounded-xl border border-[#24213d] bg-[#12111e] text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <span className="grid size-11 place-items-center rounded-xl border border-[#262546] bg-[#151426] text-[#2cbff2]">
                <Icon className="size-5" strokeWidth={1.9} />
              </span>
              <span className="mt-5 text-sm font-bold text-white/88">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
