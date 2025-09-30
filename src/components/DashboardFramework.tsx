'use client'

import React from 'react'
import { Bell, Users, ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import NotificationSystem from './NotificationSystem'
import ReengagementMilestone from './ReengagementMilestone'
import ActivitySimulator from './ActivitySimulator'
import { useUserActivity } from '@/hooks/useUserActivity'
import { useLanguage } from '@/contexts/LanguageContext'

interface NextStep {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  priority: 'high' | 'medium' | 'low'
  dueDate?: string
}

interface DashboardFrameworkProps {
  userProfile: any
  children: React.ReactNode
  nextSteps: NextStep[]
  dashboardType: 'invertir' | 'migrar' | 'vivir'
}

const DashboardFramework: React.FC<DashboardFrameworkProps> = ({
  userProfile,
  children,
  nextSteps,
  dashboardType
}) => {
  const { activityState, dismissReengagement } = useUserActivity()
  const { t } = useLanguage()
  const getDashboardTitle = () => {
    switch (dashboardType) {
      case 'invertir':
        return t('dashboard.investor.title')
      case 'migrar':
        return t('dashboard.migration.title')
      case 'vivir':
        return t('dashboard.lifestyle.title')
      default:
        return t('dashboard.default.title')
    }
  }

  const getWelcomeMessage = () => {
    const userName = userProfile.name || t('common.user')
    switch (dashboardType) {
      case 'invertir':
        return t('dashboard.investor.welcome', { userName })
      case 'migrar':
        return t('dashboard.migration.welcome', { userName })
      case 'vivir':
        return t('dashboard.lifestyle.welcome', { userName })
      default:
        return t('dashboard.default.welcome', { userName })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-gray-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500'
      case 'medium':
        return 'border-l-yellow-500'
      case 'low':
        return 'border-l-green-500'
      default:
        return 'border-l-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Principal */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y Título */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-600 font-bold text-sm">TH</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-800">
                {getDashboardTitle()}
              </h1>
            </div>

            {/* Acciones del Header */}
            <div className="flex items-center space-x-4">
              {/* Sistema de Notificaciones Inteligentes */}
              <NotificationSystem 
                userProfile={userProfile} 
                dashboardType={dashboardType} 
              />

              {/* Mi Equipo */}
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{t('dashboard.myTeam')}</span>
              </button>

              {/* Foto de Perfil */}
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium text-sm">
                  {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mensaje de Bienvenida */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {getWelcomeMessage()}
          </h2>
          <p className="text-gray-600">
            {t('dashboard.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Widget Próximos Pasos Clave */}
            <div className="lg:col-span-1 space-y-6">
              {/* Simulador de Actividad (solo en desarrollo) */}
              {process.env.NODE_ENV === 'development' && (
                <ActivitySimulator userProfile={userProfile} />
              )}
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{t('dashboard.nextSteps.title')}</h3>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
              
              <div className="space-y-3">
                {nextSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`p-3 rounded-lg border-l-4 ${getPriorityColor(step.priority)} bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer`}
                  >
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(step.status)}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-800 truncate">
                          {step.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {step.description}
                        </p>
                        {step.dueDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            {t('dashboard.nextSteps.dueDate')}: {step.dueDate}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium">
                {t('dashboard.nextSteps.viewAll')}
              </button>
            </div>
          </div>

          {/* Contenido Principal del Dashboard */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>

      {/* Sistema de Re-engagement Proactivo */}
      {activityState.showReengagement && (
        <ReengagementMilestone
          userProfile={userProfile}
          inactivityDays={activityState.inactivityDays}
          onDismiss={dismissReengagement}
        />
      )}
    </div>
  )
}

export default DashboardFramework
