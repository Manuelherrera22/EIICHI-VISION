'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { ArquitectoProvider, useArquitecto } from '@/contexts/ArquitectoContext'
import ArquitectoOnboarding from '@/components/ArquitectoOnboarding'
import ModularDashboard from '@/components/ModularDashboard'
import OnboardingStatus from '@/components/OnboardingStatus'
import ProtectedRoute from '@/components/ProtectedRoute'
import Layout from '@/components/Layout'

export default function DashboardPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-primary mb-2">Cargando...</h2>
            <p className="text-secondary">Preparando tu experiencia personalizada</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <ProtectedRoute>
      <ArquitectoProvider>
        <DashboardContent />
      </ArquitectoProvider>
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { userProfile, isOnboardingComplete } = useArquitecto()

  // Si el onboarding no está completo, mostrar el onboarding
  if (!isOnboardingComplete) {
    return <ArquitectoOnboarding />
  }

  // Si el onboarding está completo, mostrar el dashboard modular
  return (
    <>
      <OnboardingStatus />
      <ModularDashboard />
    </>
  )
}