'use client'

import React from 'react'
import { useArquitecto } from '@/contexts/ArquitectoContext'
import InvestorDashboard from './InvestorDashboard'
import MigrationDashboard from './MigrationDashboard'
import LifestyleDashboard from './LifestyleDashboard'

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

  // Renderizar dashboard especializado según el objetivo
  switch (userProfile.primaryGoal) {
    case 'invertir':
      return <InvestorDashboard userProfile={userProfile} />
    case 'migrar':
      return <MigrationDashboard userProfile={userProfile} />
    case 'vivir':
      return <LifestyleDashboard userProfile={userProfile} />
    default:
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-primary mb-2">Objetivo no reconocido</h2>
            <p className="text-secondary">Por favor, completa el onboarding nuevamente.</p>
          </div>
        </div>
      )
  }
}