'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code')
        const error = searchParams.get('error')

        console.log('Callback page received:', { code, error })

        if (error) {
          console.error('OAuth error:', error)
          router.push('/auth?error=oauth_error')
          return
        }

        if (code) {
          console.log('Exchanging code for session...')
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
          
          if (exchangeError) {
            console.error('Error exchanging code:', exchangeError)
            router.push('/auth?error=exchange_failed')
            return
          }

          console.log('Session created successfully:', data.user?.email)
          router.push('/dashboard')
        } else {
          console.log('No code provided')
          router.push('/auth?error=no_code')
        }
      } catch (error) {
        console.error('Callback error:', error)
        router.push('/auth?error=callback_error')
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-primary mb-2">Procesando autenticación...</h2>
        <p className="text-secondary">Por favor espera mientras completamos tu inicio de sesión.</p>
      </div>
    </div>
  )
}
