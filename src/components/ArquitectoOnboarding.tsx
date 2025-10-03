'use client'

import React, { useState } from 'react'
import { useArquitecto } from '@/contexts/ArquitectoContext'
import { ONBOARDING_QUESTIONS, generateUserBlueprint } from '@/lib/arquitecto-types'
import { useSafeLanguage } from '@/hooks/useSafeLanguage'
import ClientOnly from './ClientOnly'
import FundamentalDataOnboarding from './FundamentalDataOnboarding'
import { 
  Building, 
  Users, 
  Home, 
  TrendingUp, 
  Briefcase, 
  DollarSign, 
  BarChart, 
  PieChart,
  Laptop,
  Rocket,
  Heart,
  Code,
  Palette,
  MoreHorizontal,
  Shield,
  TreePine,
  MapPin,
  Mountain,
  Sun,
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Building,
  Users,
  Home,
  TrendingUp,
  Briefcase,
  DollarSign,
  BarChart,
  PieChart,
  Laptop,
  Rocket,
  Heart,
  Code,
  Palette,
  MoreHorizontal,
  Shield,
  TreePine,
  MapPin,
  Mountain,
  Sun,
  Clock
}

export default function ArquitectoOnboarding() {
  const { userProfile, setUserProfile, onboardingStep, setOnboardingStep, completeOnboarding } = useArquitecto()
  const { t } = useSafeLanguage()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Paso 0: La Gran Bienvenida
  if (onboardingStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse border border-gray-200">
              <Building className="w-12 h-12 text-gray-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {t('onboarding.welcome.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('onboarding.welcome.description')}
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                console.log('Botón clickeado, avanzando al paso 1')
                setOnboardingStep(1)
              }}
              className="group bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-12 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-semibold text-lg hover:scale-105 relative overflow-hidden border border-gray-200 hover:border-gray-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                {t('onboarding.welcome.startButton')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <p className="text-sm text-gray-500 animate-pulse">
              {t('onboarding.welcome.instruction')}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Paso 1: La Gran Bifurcación
  if (onboardingStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t('keyQuestion.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('keyQuestion.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* INVERTIR */}
            <button
              onClick={() => {
                setUserProfile(prev => ({ ...prev, primaryGoal: 'invertir' }))
                setOnboardingStep(2.5) // Ir directamente a datos fundamentales
              }}
              className="group bg-gray-50 hover:bg-gray-100 p-8 rounded-3xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-105 text-left"
            >
              <div className="w-20 h-20 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                <TrendingUp className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="font-bold text-gray-800 text-2xl mb-4 text-center">{t('keyQuestion.invest.title')}</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {t('keyQuestion.invest.description')}
              </p>
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-500 font-medium">{t('keyQuestion.invest.audience')}</span>
              </div>
            </button>

            {/* MIGRAR */}
            <button
              onClick={() => {
                setUserProfile(prev => ({ ...prev, primaryGoal: 'migrar' }))
                setOnboardingStep(2.5) // Ir directamente a datos fundamentales
              }}
              className="group bg-gray-50 hover:bg-gray-100 p-8 rounded-3xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-105 text-left"
            >
              <div className="w-20 h-20 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                <Users className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="font-bold text-gray-800 text-2xl mb-4 text-center">{t('keyQuestion.migrate.title')}</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {t('keyQuestion.migrate.description')}
              </p>
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-500 font-medium">{t('keyQuestion.migrate.audience')}</span>
              </div>
            </button>

            {/* VIVIR */}
            <button
              onClick={() => {
                setUserProfile(prev => ({ ...prev, primaryGoal: 'vivir' }))
                setOnboardingStep(2.5) // Ir directamente a datos fundamentales
              }}
              className="group bg-gray-50 hover:bg-gray-100 p-8 rounded-3xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-105 text-left"
            >
              <div className="w-20 h-20 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-pulse">
                <Home className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="font-bold text-gray-800 text-2xl mb-4 text-center">{t('keyQuestion.live.title')}</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {t('keyQuestion.live.description')}
              </p>
              <div className="mt-4 text-center">
                <span className="text-sm text-gray-500 font-medium">{t('keyQuestion.live.audience')}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Paso 2: Cuestionario Dinámico
  if (onboardingStep === 2 && userProfile.primaryGoal) {
    const questions = ONBOARDING_QUESTIONS[userProfile.primaryGoal]
    const currentQuestion = questions[currentQuestionIndex]

    if (!currentQuestion) {
      // Todas las preguntas respondidas, mostrar transición a datos fundamentales
      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <CheckCircle className="w-12 h-12 text-gray-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                ¡Excelente! Cuestionario Básico Completado
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Ahora necesitamos algunos datos adicionales para crear tu perfil inteligente personalizado
              </p>
              <div className="bg-gray-100 p-6 rounded-2xl mb-8 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Blueprint Generado:</h3>
                <p className="text-gray-600">{generateUserBlueprint(userProfile)}</p>
              </div>
            </div>
            
            <button
              onClick={() => setOnboardingStep(2.5)} // Ir a datos fundamentales
              className="group bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-12 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-semibold text-lg hover:scale-105 relative overflow-hidden border border-gray-200 hover:border-gray-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                Continuar con Datos Fundamentales
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-gray-800 font-bold text-xl">{currentQuestionIndex + 1}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t(currentQuestion.questionKey)}
            </h2>
            <div className="w-24 h-1 bg-gray-300 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQuestion.options.map((option) => {
              const IconComponent = iconMap[option.icon] || MoreHorizontal
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    setUserProfile(prev => ({
                      ...prev,
                      [currentQuestion.id]: option.value
                    }))
                    
                    if (currentQuestionIndex < questions.length - 1) {
                      setCurrentQuestionIndex(prev => prev + 1)
                    } else {
                      // Última pregunta completada, avanzar al resultado
                      console.log('Última pregunta completada, avanzando al resultado')
                      setCurrentQuestionIndex(prev => prev + 1)
                    }
                  }}
                  className="group p-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 hover:scale-105 text-left bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center group-hover:bg-gray-300 transition-all">
                      <IconComponent className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {t(option.labelKey)}
                      </h3>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                if (currentQuestionIndex > 0) {
                  setCurrentQuestionIndex(prev => prev - 1)
                } else {
                  setOnboardingStep(1)
                }
              }}
              className="flex items-center gap-2 px-6 py-3 text-secondary hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <ClientOnly fallback="Back">
                {t('common.back')}
              </ClientOnly>
            </button>
            
            <div className="text-sm text-secondary">
              {t('onboarding.question.progress', { current: String(currentQuestionIndex + 1), total: String(questions.length) })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Paso 2.5: Datos Fundamentales
  if (onboardingStep === 2.5) {
    return <FundamentalDataOnboarding />
  }

  // Paso 3: Completar Onboarding
  if (onboardingStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t('profileComplete.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('profileComplete.subtitle')}
            </p>
            {userProfile.intelligentScores && (
              <div className="bg-gray-100 p-6 rounded-2xl mb-8 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('profileComplete.summary')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{userProfile.intelligentScores.IVI?.score || 0}</div>
                    <div className="text-sm text-gray-600">{t('profileComplete.iviScore')}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{userProfile.intelligentScores.IVM?.score || 0}</div>
                    <div className="text-sm text-gray-600">{t('profileComplete.ivmScore')}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{userProfile.intelligentScores.ISE?.score || 0}</div>
                    <div className="text-sm text-gray-600">{t('profileComplete.iseScore')}</div>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-600">{t('profileComplete.recommendation')} </span>
                  <span className="font-semibold text-gray-800 capitalize">
                    {userProfile.intelligentScores.recommendation || 'Moderada'}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={completeOnboarding}
            className="group bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-12 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-semibold text-lg hover:scale-105 relative overflow-hidden border border-gray-200 hover:border-gray-300"
          >
            <span className="relative z-10 flex items-center gap-3">
              {t('profileComplete.accessDashboard')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    )
  }

  return null
}
