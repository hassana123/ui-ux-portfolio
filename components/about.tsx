'use client'

import Link from 'next/link'
import { UserRound } from 'lucide-react'

interface AboutProps {
  bio: string
}

export function About({ bio }: AboutProps) {
  const fallbackCopy =
    "Have a project in mind or an idea you've been thinking about? Let's turn it into something real, simple, and impactful. I'm ready to help you bring it to life."

  return (
    <section id="about" className="relative overflow-hidden bg-[#202031] text-white">
      <div className="mx-auto grid min-h-[360px] max-w-[1210px] grid-cols-1 items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_520px] lg:px-10 lg:py-20">
        <div className="max-w-[470px]">
          <h2 className="text-[clamp(2.5rem,5vw,58px)] font-extrabold leading-[1.1] tracking-[0] text-white">
            Let Me Help
            <br />
            To Build Your
            <br />
            Dream Project
          </h2>
          <p className="mt-8 text-[19px] leading-[1.65] text-white/72">{bio || fallbackCopy}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-[66px] min-w-[228px] items-center justify-center rounded-md bg-white px-10 text-[20px] font-extrabold uppercase tracking-[0] text-[#3b1b0c] transition hover:-translate-y-0.5 hover:bg-[#f2f2f2]"
          >
            Hire Me
          </Link>
        </div>

        <div className="relative mx-auto h-[340px] w-full max-w-[520px] lg:mr-0">
          <div className="absolute bottom-0 right-[38px] size-[300px] rounded-full bg-[#2036a3]" />
          <div className="absolute right-0 top-0 h-[305px] w-[245px] overflow-hidden rounded-t-full bg-[#69bced]">
            <img src="/barakat.png" alt="Barakat" className="absolute bottom-0 h-full w-full object-cover object-center" />
          </div>

          <div className="absolute left-[88px] top-0 grid size-[140px] place-items-center bg-[#b8e0ff] [clip-path:polygon(50%_0%,61%_31%,88%_12%,72%_42%,100%_50%,72%_58%,88%_88%,61%_69%,50%_100%,39%_69%,12%_88%,28%_58%,0%_50%,28%_42%,12%_12%,39%_31%)]">
            <UserRound className="size-12 text-white" fill="currentColor" strokeWidth={0} />
          </div>

          <div className="absolute left-[88px] top-[198px] h-[112px] w-[214px] rounded-md bg-white shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
            <span className="absolute left-5 top-9 size-11 rounded-full bg-[#adbdf9]" />
            <span className="absolute left-[84px] top-6 h-4 w-[62px] rounded-sm bg-[#bce0fb]" />
            <span className="absolute bottom-5 left-[84px] h-8 w-1.5 rounded-full bg-[#bce0fb]" />
            <span className="absolute bottom-5 left-[102px] h-5 w-1.5 rounded-full bg-[#bce0fb]" />
            <span className="absolute bottom-5 left-[120px] h-10 w-1.5 rounded-full bg-[#bce0fb]" />
            <span className="absolute bottom-5 left-[138px] h-7 w-1.5 rounded-full bg-[#bce0fb]" />
            <span className="absolute bottom-5 left-[156px] h-5 w-1.5 rounded-full bg-[#bce0fb]" />
            <span className="absolute bottom-5 left-[174px] h-8 w-1.5 rounded-full bg-[#bce0fb]" />
          </div>

          <div className="absolute left-[190px] top-[98px] h-24 w-28 rotate-[-18deg] border-l-2 border-t-2 border-dashed border-[#ffd8ce]" />
          <div className="absolute bottom-8 left-[220px] h-16 w-24 rounded-br-full border-b-2 border-r-2 border-[#ffd8ce]" />
        </div>
      </div>
    </section>
  )
}
