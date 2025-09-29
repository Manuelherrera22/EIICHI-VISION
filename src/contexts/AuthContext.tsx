'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { auth } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName?: string) => Promise<{ data: any; error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ data: any; error: AuthError | null }>
  signOut: () => Promise<{ error: AuthError | null }>
  resetPassword: (email: string) => Promise<{ data: any; error: AuthError | null }>
  updatePassword: (newPassword: string) => Promise<{ data: any; error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener sesión inicial
    const getInitialSession = async () => {
      try {
        const { user, session, error } = await auth.getCurrentUser()
        if (error) {
          console.error('Error getting initial session:', error)
        } else {
          console.log('Initial session:', user?.email, 'Session exists:', !!session)
          setSession(session)
          setUser(user)
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Escuchar cambios de autenticación
    const { data: { subscription } } = auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email, 'Session exists:', !!session)
        setSession(session)
        setUser(session?.user ?? null)
        // No cambiar loading aquí para evitar loops
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const result = await auth.signUp(email, password, fullName)
      
      // Create CRM lead when user registers
      if (result.data?.user && !result.error) {
        try {
          const { CRMService } = await import('@/lib/crm')
          await CRMService.createLeadFromUser(result.data.user)
        } catch (crmError) {
          console.error('CRM integration error:', crmError)
          // Don't fail the signup if CRM fails
        }
      }
      
      return result
    } catch (error) {
      console.error('Sign up error:', error)
      return { data: null, error: error as AuthError }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const result = await auth.signIn(email, password)
      return result
    } catch (error) {
      console.error('Sign in error:', error)
      return { data: null, error: error as AuthError }
    }
  }

  const signOut = async () => {
    try {
      const result = await auth.signOut()
      return result
    } catch (error) {
      console.error('Sign out error:', error)
      return { error: error as AuthError }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const result = await auth.resetPassword(email)
      return result
    } catch (error) {
      console.error('Reset password error:', error)
      return { data: null, error: error as AuthError }
    }
  }

  const updatePassword = async (newPassword: string) => {
    try {
      const result = await auth.updatePassword(newPassword)
      return result
    } catch (error) {
      console.error('Update password error:', error)
      return { data: null, error: error as AuthError }
    }
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
