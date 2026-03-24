import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

async function signInWithGoogle() {
  'use server'

  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/auth/callback`,
    },
  })

  if (error || !data.url) {
    redirect('/login?error=oauth_failed')
  }

  redirect(data.url)
}

export default function LoginPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#F7F3ED' }}
    >
      <div className="w-full" style={{ maxWidth: '420px' }}>
        {/* Logo */}
        <h1
          className="text-4xl font-bold mb-3"
          style={{ color: '#E07A5F' }}
        >
          Pipeline
        </h1>

        {/* Tagline */}
        <p className="text-base mb-8" style={{ color: '#2F2F2F' }}>
          Turn your dream into real progress.
        </p>

        {/* Google OAuth button */}
        <form action={signInWithGoogle}>
          <button
            type="submit"
            className="w-full font-medium text-white cursor-pointer"
            style={{
              backgroundColor: '#E07A5F',
              height: '48px',
              borderRadius: '14px',
            }}
          >
            Continue with Google
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ backgroundColor: '#D1CBC3' }} />
          <span className="text-sm" style={{ color: '#999999' }}>
            or
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#D1CBC3' }} />
        </div>

        {/* Email fallback link */}
        <p className="text-center text-sm" style={{ color: '#666666' }}>
          <a href="/login/email">Use email instead</a>
        </p>
      </div>
    </main>
  )
}
