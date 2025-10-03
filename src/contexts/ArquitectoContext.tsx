'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { UserProfile, ONBOARDING_QUESTIONS, generateUserBlueprint, getEnabledModules } from '@/lib/arquitecto-types'
import { useAuth } from './AuthContext'

interface ArquitectoContextType {
  userProfile: UserProfile
  setUserProfile: (profile: UserProfile | ((prev: UserProfile) => UserProfile)) => void
  onboardingStep: number
  setOnboardingStep: (step: number) => void
  isOnboardingComplete: boolean
  blueprint: string
  enabledModules: any[]
  completeOnboarding: () => void
  resetOnboarding: () => void
  updateUserProfile: (updates: Partial<UserProfile>) => void
  isProfileComplete: () => boolean
}

const ArquitectoContext = createContext<ArquitectoContextType | undefined>(undefined)

const initialProfile: UserProfile = {
  primaryGoal: null,
  onboardingCompleted: false,
  onboardingStep: 0,
  blueprintGenerated: false
}

export function ArquitectoProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile)
  const [onboardingStep, setOnboardingStep] = useState(0)

  // Generar blueprint cuando se complete el perfil
  const blueprint = userProfile.primaryGoal ? generateUserBlueprint(userProfile) : ''
  
  // Obtener módulos habilitados
  const enabledModules = getEnabledModules(userProfile)

  const isOnboardingComplete = userProfile.onboardingCompleted

  // Cargar datos guardados del localStorage al inicializar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tabiji-user-profile')
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          setUserProfile(prev => ({
            ...prev,
            ...parsed,
            // Mantener datos de autenticación si están disponibles
            id: user?.id || parsed.id,
            email: user?.email || parsed.email,
            name: user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split('@')[0] || parsed.name || 'Usuario'
          }))
          setOnboardingStep(parsed.onboardingStep || 0)
        } catch (error) {
          console.error('Error parsing saved profile:', error)
        }
      }
    }
  }, []) // Solo ejecutar una vez al montar el componente

  // Sincronizar con datos de autenticación sin sobrescribir datos guardados
  useEffect(() => {
    if (user) {
      setUserProfile(prev => {
        // Solo actualizar si no hay datos guardados o si los datos de auth son más recientes
        const saved = localStorage.getItem('tabiji-user-profile')
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            // Si ya hay datos guardados, solo actualizar campos de autenticación
            return {
              ...prev,
              id: user.id,
              email: user.email || prev.email,
              name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || prev.name
            }
          } catch (error) {
            console.error('Error parsing saved profile:', error)
          }
        }
        
        // Si no hay datos guardados, usar datos de autenticación
        return {
          ...prev,
          id: user.id,
          email: user.email || '',
          name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Usuario'
        }
      })
    }
  }, [user])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tabiji-user-profile', JSON.stringify(userProfile))
    }
  }, [userProfile])

  const completeOnboarding = () => {
    setUserProfile(prev => ({
      ...prev,
      onboardingCompleted: true,
      blueprintGenerated: true
    }))
    setOnboardingStep(0)
  }

  const resetOnboarding = () => {
    setUserProfile(initialProfile)
    setOnboardingStep(0)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tabiji-user-profile')
    }
  }

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...updates
    }))
  }

  const isProfileComplete = () => {
    return userProfile.onboardingCompleted && userProfile.primaryGoal !== null
  }

  const value: ArquitectoContextType = {
    userProfile,
    setUserProfile,
    onboardingStep,
    setOnboardingStep,
    isOnboardingComplete,
    blueprint,
    enabledModules,
    completeOnboarding,
    resetOnboarding,
    updateUserProfile,
    isProfileComplete
  }

  return (
    <ArquitectoContext.Provider value={value}>
      {children}
    </ArquitectoContext.Provider>
  )
}

export function useArquitecto() {
  const context = useContext(ArquitectoContext)
  if (context === undefined) {
    throw new Error('useArquitecto must be used within an ArquitectoProvider')
  }
  return context
}

