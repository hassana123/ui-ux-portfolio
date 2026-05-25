'use client'

import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BriefcaseBusiness, Eye, EyeOff, LockKeyhole, Mail, Sparkles, UserRound } from 'lucide-react'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback?next=/admin`,
          data: {
            name,
            title,
          },
        },
      })

      if (authError) throw authError
      router.push('/auth/sign-up-success')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0a14] text-white">
      <AuthBackground />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-[520px]">
          <AuthBrand />

          <div className="mt-10 rounded-2xl border border-white/10 bg-[#141322]/85 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <p className="text-[13px] font-extrabold uppercase tracking-[0.3em] text-[#2cbff2]">Create Account</p>
            <h1 className="mt-4 text-[clamp(2rem,5vw,42px)] font-extrabold leading-none tracking-[0]">
              Start your admin access.
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/52">
              Set up a secure account for managing portfolio projects, articles, and profile content.
            </p>

            <form onSubmit={handleSignUp} className="mt-8 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <AuthInput
                  id="name"
                  label="Name"
                  icon={<UserRound className="size-5" strokeWidth={1.8} />}
                  type="text"
                  placeholder="Barakat"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <AuthInput
                  id="title"
                  label="Professional Title"
                  icon={<BriefcaseBusiness className="size-5" strokeWidth={1.8} />}
                  type="text"
                  placeholder="UI/UX Designer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <AuthInput
                id="email"
                label="Email"
                icon={<Mail className="size-5" strokeWidth={1.8} />}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                showPassword={showPassword}
                onToggle={() => setShowPassword((value) => !value)}
              />

              <PasswordInput
                id="repeat-password"
                label="Repeat Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                showPassword={showRepeatPassword}
                onToggle={() => setShowRepeatPassword((value) => !value)}
              />

              {error && (
                <p className="rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="h-14 w-full rounded-lg bg-[linear-gradient(90deg,#956cff_0%,#51c9f6_100%)] text-[15px] font-extrabold text-[#05050c] shadow-[0_0_28px_rgba(81,201,246,0.26)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Creating account...' : 'Sign up'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/52">
              Already have access?{' '}
              <Link href="/auth/login" className="font-bold text-[#2cbff2] hover:text-white">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

function AuthBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#21117a_0%,#11101b_42%,#05050c_100%)]" />
      <div className="absolute inset-0 opacity-35 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_86px,transparent_86px,transparent_172px)]" />
      <div className="absolute left-[-60px] top-[22%] size-44 rounded-full border border-white/10" />
      <div className="absolute right-[-70px] top-[18%] h-24 w-32 rounded-[50%] border border-white/15 opacity-60" />
    </>
  )
}

function AuthBrand() {
  return (
    <Link href="/" className="mx-auto flex w-max items-center gap-3 text-white">
      <span className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
        <Sparkles className="size-5" strokeWidth={1.6} />
      </span>
      <span className="text-[22px] font-extrabold tracking-[0]">EWATECHIE</span>
    </Link>
  )
}

function AuthInput({
  id,
  label,
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label: string
  icon: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-3 block text-[12px] font-extrabold uppercase tracking-[0.08em] text-white/42">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2cbff2]">{icon}</span>
        <input
          id={id}
          required
          className="h-14 w-full rounded-lg border border-[#2a283c] bg-[#1b1a2a] pl-12 pr-4 text-[15px] text-white outline-none transition placeholder:text-white/34 focus:border-[#2cbff2] focus:ring-4 focus:ring-[#2cbff2]/10"
          {...props}
        />
      </div>
    </div>
  )
}

function PasswordInput({
  id,
  label,
  value,
  onChange,
  showPassword,
  onToggle,
}: {
  id: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  showPassword: boolean
  onToggle: () => void
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-3 block text-[12px] font-extrabold uppercase tracking-[0.08em] text-white/42">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2cbff2]">
          <LockKeyhole className="size-5" strokeWidth={1.8} />
        </span>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          required
          value={value}
          onChange={onChange}
          className="h-14 w-full rounded-lg border border-[#2a283c] bg-[#1b1a2a] pl-12 pr-12 text-[15px] text-white outline-none transition placeholder:text-white/34 focus:border-[#2cbff2] focus:ring-4 focus:ring-[#2cbff2]/10"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/42 transition hover:text-white"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      </div>
    </div>
  )
}
