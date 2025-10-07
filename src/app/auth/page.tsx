'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import AuthForm from '@/components/AuthForm'
import Layout from '@/components/Layout'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>('login')
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/')
    }
  }, [user, loading, router])

  const handleSuccess = () => {
    if (mode === 'login') {
      router.push('/')
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-primary">Loading...</span>
          </div>
        </div>
      </Layout>
    )
  }

  if (user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2">Welcome!</h2>
            <p className="text-secondary mb-4">You are already authenticated. Redirecting...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-primary">Tabiji House</h1>
            <p className="text-secondary mt-2">Tu puerta de entrada a Japón</p>
          </div>

          {/* Auth Form */}
          <AuthForm 
            mode={mode} 
            onModeChange={setMode}
            onSuccess={handleSuccess}
          />

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-secondary/70">
              Al registrarte, aceptas nuestros{' '}
              <a href="/terms" className="text-primary hover:underline">
                Términos de Servicio
              </a>{' '}
              y{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Política de Privacidad
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
