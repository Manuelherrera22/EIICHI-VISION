'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import DashboardFramework from './DashboardFramework'
import WeeklyPulseWidget from './WeeklyPulseWidget'
import DocumentManager from './DocumentManager'
import SupabaseConfigChecker from './SupabaseConfigChecker'
import UserDebugInfo from './UserDebugInfo'
import { useLanguage } from '@/contexts/LanguageContext'
import { Clock, MapPin, Calculator, Users, MessageSquare } from 'lucide-react'

interface MigrationDashboardProps {
  userProfile: any
}

const MigrationDashboard: React.FC<MigrationDashboardProps> = ({ userProfile }) => {
  const router = useRouter()
  const { t } = useLanguage()

  const nextSteps = [
    {
      id: 'step-1',
      title: 'Completar Documentos de Visa',
      description: 'Sube los documentos requeridos para tu visa de trabajo',
      status: 'in_progress' as const,
      priority: 'high' as const,
      dueDate: '2024-02-15'
    },
    {
      id: 'step-2',
      title: 'Agendar Charla Exploratoria',
      description: 'Reserva una sesión de 15 minutos con nuestro equipo',
      status: 'pending' as const,
      priority: 'medium' as const,
      dueDate: '2024-02-20'
    },
    {
      id: 'step-3',
      title: 'Revisar Timeline de Visa',
      description: 'Consulta el progreso de tu proceso de migración',
      status: 'pending' as const,
      priority: 'low' as const,
      dueDate: '2024-02-25'
    }
  ]

  return (
    <DashboardFramework
      userProfile={userProfile}
      nextSteps={nextSteps}
      dashboardType="migrar"
    >
      <div className="space-y-8">
        {/* Tu Pulso Semanal */}
        <WeeklyPulseWidget 
          userProfile={userProfile} 
          dashboardType="migrar" 
        />

        {/* Debug Info (Solo en desarrollo) */}
        <UserDebugInfo />

        {/* Configuración de Supabase */}
        <SupabaseConfigChecker />

        {/* Gestor de Documentos Inteligente */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <DocumentManager userId={userProfile.id || userProfile.email || 'demo-user'} />
        </div>

        {/* Simulador de Vida en Japón */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Calculator className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{t('dashboard.migration.simulator.title')}</h3>
                <p className="text-sm text-gray-600">{t('dashboard.migration.simulator.description')}</p>
              </div>
            </div>
            <button 
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              onClick={() => router.push('/dashboard/visa-timeline')}
            >
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{t('dashboard.migration.simulator.viewTimeline')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calculadora de Costos */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">{t('dashboard.migration.simulator.costCalculator')}</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Alquiler (Kusatsu)</span>
                  <span className="font-semibold text-gray-900">¥85,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Comida y Supermercado</span>
                  <span className="font-semibold text-gray-900">¥45,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Transporte</span>
                  <span className="font-semibold text-gray-900">¥15,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Servicios Básicos</span>
                  <span className="font-semibold text-gray-900">¥25,000</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">Seguro de Salud</span>
                  <span className="font-semibold text-gray-900">¥8,000</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                  <span className="text-sm font-semibold text-primary">Total Mensual Estimado</span>
                  <span className="text-lg font-bold text-primary">¥178,000</span>
                </div>
              </div>
            </div>

            {/* Mapa de Integración */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">{t('dashboard.migration.simulator.integrationMap')}</h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Aprender Japonés Básico</span>
                  <span className="text-xs text-green-600 font-medium">Completado</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Conocer la Cultura Local</span>
                  <span className="text-xs text-yellow-600 font-medium">En Progreso</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-700">Hacer Amigos Locales</span>
                  <span className="text-xs text-gray-600 font-medium">Pendiente</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-700">Encontrar Trabajo</span>
                  <span className="text-xs text-gray-600 font-medium">Pendiente</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-700">Establecer Red Social</span>
                  <span className="text-xs text-gray-600 font-medium">Pendiente</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Tu Equipo de Apoyo</span>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Conecta con otros migrantes y recibe apoyo personalizado
                </p>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  Ver Comunidad →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Información de Contacto */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Necesitas Ayuda?</h3>
              <p className="text-gray-600 mb-4">
                Nuestro equipo de expertos en migración está disponible para ayudarte en cada paso del proceso.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat en Vivo</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  <Clock className="w-4 h-4" />
                  <span>Agendar Consulta</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardFramework>
  )
}

export default MigrationDashboard