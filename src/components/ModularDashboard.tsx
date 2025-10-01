'use client'

import React from 'react'
import { useArquitecto } from '@/contexts/ArquitectoContext'
import IntelligentDashboardBridge from './IntelligentDashboardBridge'

export default function ModularDashboard() {
  const { userProfile } = useArquitecto()

  if (!userProfile.primaryGoal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary mb-2">Perfil no encontrado</h2>
          <p className="text-secondary">Por favor, completa el onboarding primero.</p>
        </div>
      </div>
    )
  }

  // Usar el dashboard inteligente unificado
  return <IntelligentDashboardBridge />
}