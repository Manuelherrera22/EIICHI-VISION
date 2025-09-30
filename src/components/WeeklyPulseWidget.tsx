'use client'

import React, { useState } from 'react'
import { useIntelligentContent } from '@/lib/IntelligentContentEngine'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  TrendingUp, 
  BookOpen, 
  Play, 
  CheckCircle, 
  Sparkles, 
  Eye,
  ArrowRight,
  ExternalLink,
  Calendar,
  Heart
} from 'lucide-react'

interface WeeklyPulseWidgetProps {
  userProfile: any
  dashboardType: 'invertir' | 'migrar' | 'vivir'
}

const WeeklyPulseWidget: React.FC<WeeklyPulseWidgetProps> = ({ userProfile, dashboardType }) => {
  const { weeklyPulse } = useIntelligentContent(userProfile, dashboardType)
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<'opportunity' | 'wisdom' | 'story' | 'calm' | 'inspiration'>('opportunity')

  const getTabContent = () => {
    switch (dashboardType) {
      case 'invertir':
        return {
          opportunity: weeklyPulse.opportunityOfTheWeek,
          wisdom: weeklyPulse.wisdomPill
        }
      case 'migrar':
        return {
          story: weeklyPulse.storyOfTheWeek,
          stepByStep: weeklyPulse.stepByStep
        }
      case 'vivir':
        return {
          calm: weeklyPulse.momentOfCalm,
          inspiration: weeklyPulse.inspirationForSanctuary
        }
      default:
        return {}
    }
  }

  const content = getTabContent()

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{t('dashboard.weeklyPulse.title')}</h3>
            <p className="text-sm text-gray-600">{t('dashboard.weeklyPulse.description')}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-500">{t('dashboard.weeklyPulse.thisWeek')}</span>
          <Calendar className="w-3 h-3 text-gray-400" />
        </div>
      </div>

      {/* Contenido específico por tipo de dashboard */}
      {dashboardType === 'invertir' && (
        <div className="space-y-6">
          {/* Oportunidad de la Semana */}
          {content.opportunity && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h4 className="text-sm font-semibold text-green-800">{t('dashboard.weeklyPulse.opportunity.title')}</h4>
              </div>
              <h5 className="text-lg font-semibold text-gray-800 mb-2">
                {content.opportunity.title}
              </h5>
              <p className="text-sm text-gray-600 mb-3">
                {content.opportunity.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    📍 {content.opportunity.location}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    ROI: {content.opportunity.roi}%
                  </span>
                </div>
                <button className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-800 font-medium">
                  <span>{t('dashboard.weeklyPulse.viewAnalysis')}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Píldora de Sabiduría */}
          {content.wisdom && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h4 className="text-sm font-semibold text-blue-800">{t('dashboard.weeklyPulse.wisdom.title')}</h4>
              </div>
              <blockquote className="text-lg font-medium text-gray-800 mb-3 italic">
                "{content.wisdom.quote}"
              </blockquote>
              <p className="text-sm text-gray-600 mb-3">
                {content.wisdom.explanation}
              </p>
              <button className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800 font-medium">
                <span>Leer más en el Journal</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {dashboardType === 'migrar' && (
        <div className="space-y-6">
          {/* Historia de la Semana */}
          {content.story && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center space-x-2 mb-3">
                <Play className="w-5 h-5 text-purple-600" />
                <h4 className="text-sm font-semibold text-purple-800">{t('dashboard.weeklyPulse.story.title')}</h4>
              </div>
              <h5 className="text-lg font-semibold text-gray-800 mb-2">
                {content.story.title}
              </h5>
              <p className="text-sm text-gray-600 mb-3">
                {content.story.description}
              </p>
              <button className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-800 font-medium">
                <Play className="w-3 h-3" />
                <span>{t('dashboard.weeklyPulse.viewTestimonial')}</span>
              </button>
            </div>
          )}

          {/* Paso a Paso */}
          {content.stepByStep && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5 text-yellow-600" />
                <h4 className="text-sm font-semibold text-yellow-800">{t('dashboard.weeklyPulse.stepByStep.title')}</h4>
              </div>
              <h5 className="text-lg font-semibold text-gray-800 mb-2">
                {content.stepByStep.title}
              </h5>
              <p className="text-sm text-gray-600 mb-3">
                {content.stepByStep.description}
              </p>
              <button className="flex items-center space-x-1 text-sm text-yellow-600 hover:text-yellow-800 font-medium">
                <span>Acceder al Gestor de Documentos</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {dashboardType === 'vivir' && (
        <div className="space-y-6">
          {/* Momento de Calma */}
          {content.calm && (
            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles className="w-5 h-5 text-gray-600" />
                <h4 className="text-sm font-semibold text-gray-800">{t('dashboard.weeklyPulse.calm.title')}</h4>
              </div>
              <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-3">
                <Eye className="w-8 h-8 text-gray-400" />
              </div>
              <div className="text-center mb-3">
                <p className="text-lg font-medium text-gray-800 italic mb-2">
                  {content.calm.haiku}
                </p>
                <p className="text-sm text-gray-600">
                  {content.calm.description}
                </p>
              </div>
            </div>
          )}

          {/* Inspiración para tu Santuario */}
          {content.inspiration && (
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <Eye className="w-5 h-5 text-green-600" />
                <h4 className="text-sm font-semibold text-green-800">{t('dashboard.weeklyPulse.inspiration.title')}</h4>
              </div>
              <h5 className="text-lg font-semibold text-gray-800 mb-2">
                {content.inspiration.title}
              </h5>
              <p className="text-sm text-gray-600 mb-3">
                {content.inspiration.description}
              </p>
              <button className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-800 font-medium">
                <span>{t('dashboard.weeklyPulse.exploreMaterials')}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer con información adicional */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Contenido personalizado basado en tu perfil y actividad
          </p>
          <button className="text-xs text-gray-500 hover:text-gray-700">
            Configurar Preferencias
          </button>
        </div>
      </div>
    </div>
  )
}

export default WeeklyPulseWidget

