'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { sendMagicLink, type MagicLinkState } from './actions'

const initialState: MagicLinkState = { sent: false, error: null }

export default function EmailLoginPage() {
  const [state, action, pending] = useActionState(sendMagicLink, initialState)

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#F7F3ED' }}
    >
      <div className="w-full" style={{ maxWidth: '420px' }}>
        {/* Back arrow */}
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-sm mb-8"
          style={{ color: '#666666' }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 12L6 8l4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </Link>

        {/* Heading */}
        <h1
          className="text-2xl font-bold mb-6"
          style={{ color: '#2F2F2F' }}
        >
          Sign in with email
        </h1>

        {state.sent ? (
          <p className="text-sm" style={{ color: '#2F2F2F' }}>
            Check your email for a sign in link
          </p>
        ) : (
          <form action={action} className="flex flex-col gap-4">
            {/* Email input */}
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 text-sm outline-none"
              style={{
                height: '48px',
                borderRadius: '12px',
                border: '1px solid #ECECEC',
                backgroundColor: '#FFFFFF',
                color: '#2F2F2F',
              }}
            />

            {state.error && (
              <p className="text-sm" style={{ color: '#E07A5F' }}>
                {state.error}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={pending}
              className="w-full font-medium text-white cursor-pointer disabled:opacity-60"
              style={{
                backgroundColor: '#E07A5F',
                height: '48px',
                borderRadius: '14px',
              }}
            >
              {pending ? 'Sending…' : 'Send magic link'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
