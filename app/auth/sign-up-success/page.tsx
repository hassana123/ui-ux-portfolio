import Link from 'next/link'
import { MailCheck, Sparkles } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0a14] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#21117a_0%,#11101b_42%,#05050c_100%)]" />
      <div className="absolute inset-0 opacity-35 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_86px,transparent_86px,transparent_172px)]" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-[500px] rounded-2xl border border-white/10 bg-[#141322]/85 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <Link href="/" className="mx-auto flex w-max items-center gap-3 text-white">
            <span className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
              <Sparkles className="size-5" strokeWidth={1.6} />
            </span>
            <span className="text-[22px] font-extrabold tracking-[0]">EWATECHIE</span>
          </Link>

          <div className="mx-auto mt-10 grid size-16 place-items-center rounded-full bg-[#2cbff2]/15 text-[#2cbff2]">
            <MailCheck className="size-8" strokeWidth={1.8} />
          </div>

          <p className="mt-8 text-[13px] font-extrabold uppercase tracking-[0.3em] text-[#2cbff2]">Check Your Email</p>
          <h1 className="mt-4 text-[clamp(2rem,5vw,42px)] font-extrabold leading-none tracking-[0]">
            Confirm your account.
          </h1>
          <p className="mx-auto mt-5 max-w-[380px] text-[15px] leading-relaxed text-white/56">
            We sent a confirmation link to your email. Open it to finish signup and enter the portfolio admin area.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/login"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-[linear-gradient(90deg,#956cff_0%,#51c9f6_100%)] px-6 text-sm font-extrabold text-[#05050c]"
            >
              Go to Login
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/12 px-6 text-sm font-bold text-white/80 transition hover:border-white/24 hover:text-white"
            >
              Back Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
