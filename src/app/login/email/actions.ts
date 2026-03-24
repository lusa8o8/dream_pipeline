'use server'

import { createClient } from '@/lib/supabase/server'

export type MagicLinkState = { sent: boolean; error: string | null }

export async function sendMagicLink(
  _prev: MagicLinkState,
  formData: FormData
): Promise<MagicLinkState> {
  const email = formData.get('email')?.toString().trim() ?? ''
  if (!email) return { sent: false, error: 'Please enter your email.' }

  const supabase = await createClient()
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${appUrl}/auth/callback`,
    },
  })

  if (error) return { sent: false, error: error.message }
  return { sent: true, error: null }
}
