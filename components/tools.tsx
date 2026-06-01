import { Box, Figma, Framer, Gem, SquareTerminal } from 'lucide-react'

interface TechStackItem {
  id?: string
  name?: string
  label?: string
  category?: string
  icon_url?: string
  iconUrl?: string
}

// Tool row shown after the services cards.
const tools = [
  { label: 'Figma', icon: Figma },
  { label: 'Framer', icon: Framer },
  { label: 'Sketch', icon: Gem },
  { label: 'After Effects', icon: SquareTerminal },
  { label: 'Miro', icon: Box },
]

const fallbackIconMap = [Figma, Framer, Gem, SquareTerminal, Box]

export default function Tools({ techStack = [] }: { techStack?: TechStackItem[] }) {
  const displayedTools =
    techStack.length > 0
      ? techStack.slice(0, 5).map((item, index) => ({
          label: item.name || item.label || item.category || 'Tool',
          iconUrl: item.icon_url || item.iconUrl,
          icon: fallbackIconMap[index % fallbackIconMap.length],
        }))
      : tools

  return (
    <section className="relative overflow-hidden bg-[#05050c] text-white">
      {/* Shared page rails, matching the hero/services alignment. */}
      <div className="pointer-events-none absolute inset-y-0 left-[max(16px,calc((100%_-_1210px)/2_+_40px))] w-px bg-[#302b50]/90 max-lg:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-[max(16px,calc((100%_-_1210px)/2_+_40px))] w-px bg-[#302b50]/90 max-lg:hidden" />

      <div className="mx-auto max-w-[1210px] px-4 pb-10 sm:px-8 lg:px-10">
        {/* Horizontal dividers frame the tool logos like the Figma reference. */}
        <div className="mx-auto max-w-[990px] border-y border-[#17162a] py-12">
          <h2 className="sr-only">Tools and Technologies</h2>
          {/* Tool list wraps from five desktop columns down to two mobile columns. */}
          <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
            {displayedTools.map(({ label, icon: Icon, iconUrl }) => (
              <li key={label} className="flex items-center justify-center gap-3 text-[#a5a4ab]">
                {iconUrl ? (
                  <img src={iconUrl} alt="" className="size-8 shrink-0 object-contain" />
                ) : (
                  <Icon className="size-8 shrink-0" strokeWidth={1.8} />
                )}
                <span className="text-[clamp(0.8rem,2vw,22px)] font-extrabold tracking-[0]">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
