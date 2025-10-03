'use client'

import React, { useState } from 'react'
import { useArquitecto } from '@/contexts/ArquitectoContext'
import { calculateIntelligentScores } from '@/lib/arquitecto-types'
import { useSafeLanguage } from '@/hooks/useSafeLanguage'
import ClientOnly from './ClientOnly'
import { 
  User, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  GraduationCap,
  Heart,
  Brain,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Star,
  Target,
  Globe,
  Phone,
  Mail,
  Flag,
  Clock,
  Briefcase,
  Home,
  Shield,
  Zap,
  BookOpen,
  Palette,
  Music,
  Camera,
  Utensils,
  Gamepad2,
  Dumbbell,
  Mountain,
  Car,
  Plane
} from 'lucide-react'

const iconMap: { [key: string]: React.ComponentType<any> } = {
  User, MapPin, Calendar, DollarSign, Users, GraduationCap, Heart, Brain,
  TrendingUp, Star, Target, Globe, Phone, Mail, Flag, Clock, Briefcase,
  Home, Shield, Zap, BookOpen, Palette, Music, Camera, Utensils, Gamepad2,
  Dumbbell, Mountain, Car, Plane
}

interface FundamentalDataStep {
  id: string
  title: string
  description: string
  icon: string
  fields: {
    id: string
    type: 'text' | 'select' | 'number' | 'textarea' | 'slider' | 'multiselect'
    label: string
    placeholder?: string
    options?: { value: string; label: string }[]
    min?: number
    max?: number
    required?: boolean
  }[]
}

const getFundamentalDataSteps = (t: any): FundamentalDataStep[] => [
  {
    id: 'basic-info',
    title: t('onboarding.basicInfo.title'),
    description: t('onboarding.basicInfo.description'),
    icon: 'User',
    fields: [
      { id: 'fullName', type: 'text', label: t('onboarding.basicInfo.fullName'), required: true },
      { id: 'phone', type: 'text', label: t('onboarding.basicInfo.phone'), placeholder: '+1 (555) 123-4567' },
      { id: 'nationality', type: 'select', label: t('onboarding.basicInfo.nationality'), required: true, options: [
        { value: 'mexicana', label: t('onboarding.nationality.mexican') },
        { value: 'estadounidense', label: t('onboarding.nationality.american') },
        { value: 'canadiense', label: t('onboarding.nationality.canadian') },
        { value: 'espanola', label: t('onboarding.nationality.spanish') },
        { value: 'argentina', label: t('onboarding.nationality.argentine') },
        { value: 'colombiana', label: t('onboarding.nationality.colombian') },
        { value: 'otra', label: t('onboarding.nationality.other') }
      ]},
      { id: 'age', type: 'number', label: t('onboarding.basicInfo.age'), min: 18, max: 100, required: true },
      { id: 'gender', type: 'select', label: t('onboarding.basicInfo.gender'), options: [
        { value: 'masculino', label: t('onboarding.gender.male') },
        { value: 'femenino', label: t('onboarding.gender.female') },
        { value: 'otro', label: t('onboarding.gender.other') },
        { value: 'prefiero-no-decir', label: t('onboarding.gender.preferNotToSay') }
      ]},
      { id: 'currentCountry', type: 'text', label: t('onboarding.basicInfo.currentCountry'), required: true },
      { id: 'currentCity', type: 'text', label: t('onboarding.basicInfo.currentCity'), required: true }
    ]
  },
  {
    id: 'intention-details',
    title: t('onboarding.intention.title'),
    description: t('onboarding.intention.description'),
    icon: 'Target',
    fields: [
      { id: 'timeline', type: 'select', label: t('onboarding.intention.timeline'), required: true, options: [
        { value: 'inmediato', label: t('onboarding.timeline.immediate') },
        { value: '6-meses', label: t('onboarding.timeline.sixMonths') },
        { value: '1-ano', label: t('onboarding.timeline.oneYear') },
        { value: 'explorando', label: t('onboarding.timeline.exploring') }
      ]},
      { id: 'motivation', type: 'textarea', label: t('onboarding.intention.motivation'), placeholder: t('onboarding.intention.motivationPlaceholder'), required: true },
      { id: 'previousExperience', type: 'select', label: t('onboarding.intention.previousExperience'), options: [
        { value: 'ninguna', label: t('onboarding.experience.none') },
        { value: 'limitada', label: t('onboarding.experience.limited') },
        { value: 'moderada', label: t('onboarding.experience.moderate') },
        { value: 'extensa', label: t('onboarding.experience.extensive') }
      ]}
    ]
  }
]

// Campos específicos por objetivo
const getGoalSpecificFields = (t: any) => ({
  invertir: [
    {
      id: 'budgetMin',
      type: 'number' as const,
      label: t('onboarding.investment.budgetMin'),
      placeholder: '50000',
      required: true
    },
    {
      id: 'budgetMax',
      type: 'number' as const,
      label: t('onboarding.investment.budgetMax'),
      placeholder: '500000',
      required: true
    },
    {
      id: 'budgetCurrency',
      type: 'select' as const,
      label: t('onboarding.investment.currency'),
      options: [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'JPY', label: 'JPY' },
        { value: 'MXN', label: 'MXN' }
      ],
      required: true
    },
    {
      id: 'annualIncome',
      type: 'number' as const,
      label: t('onboarding.investment.annualIncome'),
      placeholder: '100000'
    },
    {
      id: 'incomeStability',
      type: 'select' as const,
      label: t('onboarding.investment.incomeStability'),
      options: [
        { value: 'inestable', label: t('onboarding.stability.unstable') },
        { value: 'moderada', label: t('onboarding.stability.moderate') },
        { value: 'estable', label: t('onboarding.stability.stable') }
      ]
    },
    {
      id: 'financialExperience',
      type: 'select' as const,
      label: t('onboarding.investment.financialExperience'),
      options: [
        { value: 'ninguna', label: t('onboarding.level.none') },
        { value: 'basica', label: t('onboarding.level.basic') },
        { value: 'intermedia', label: t('onboarding.level.intermediate') },
        { value: 'avanzada', label: t('onboarding.level.advanced') }
      ],
      required: true
    },
    {
      id: 'riskTolerance',
      type: 'select' as const,
      label: t('onboarding.investment.riskTolerance'),
      options: [
        { value: 'conservador', label: t('onboarding.risk.conservative') },
        { value: 'moderado', label: t('onboarding.risk.moderate') },
        { value: 'agresivo', label: t('onboarding.risk.aggressive') }
      ],
      required: true
    }
  ],
  migrar: [
    {
      id: 'familySituation.size',
      type: 'select' as const,
      label: t('onboarding.migration.familySituation'),
      options: [
        { value: 'solo', label: t('onboarding.family.single') },
        { value: 'pareja', label: t('onboarding.family.couple') },
        { value: 'familia-pequena', label: t('onboarding.family.smallFamily') },
        { value: 'familia-grande', label: t('onboarding.family.largeFamily') }
      ],
      required: true
    },
    {
      id: 'professionalSituation.education',
      type: 'select' as const,
      label: t('onboarding.migration.educationLevel'),
      options: [
        { value: 'basica', label: t('onboarding.education.basic') },
        { value: 'media', label: t('onboarding.education.medium') },
        { value: 'universitaria', label: t('onboarding.education.university') },
        { value: 'postgrado', label: t('onboarding.education.postgraduate') }
      ],
      required: true
    },
    {
      id: 'migrationTimeline',
      type: 'select' as const,
      label: t('onboarding.migration.migrationTimeline'),
      options: [
        { value: 'urgente', label: t('onboarding.migrationTimeline.urgent') },
        { value: '6-meses', label: t('onboarding.migrationTimeline.sixMonths') },
        { value: '1-ano', label: t('onboarding.migrationTimeline.oneYear') },
        { value: '2-anos', label: t('onboarding.migrationTimeline.twoYears') }
      ],
      required: true
    }
  ],
  vivir: [
    {
      id: 'housingNeeds.budget',
      type: 'number' as const,
      label: t('onboarding.residence.housingBudget'),
      placeholder: '3000'
    },
    {
      id: 'housingNeeds.duration',
      type: 'select' as const,
      label: t('onboarding.residence.expectedDuration'),
      options: [
        { value: 'temporal', label: t('onboarding.duration.temporary') },
        { value: 'permanente', label: t('onboarding.duration.permanent') }
      ],
      required: true
    }
  ]
})

const getCulturalInterests = (t: any) => [
  { value: 'arte', label: t('onboarding.interest.art'), icon: 'Palette' },
  { value: 'musica', label: t('onboarding.interest.music'), icon: 'Music' },
  { value: 'fotografia', label: t('onboarding.interest.photography'), icon: 'Camera' },
  { value: 'gastronomia', label: t('onboarding.interest.gastronomy'), icon: 'Utensils' },
  { value: 'videojuegos', label: t('onboarding.interest.videoGames'), icon: 'Gamepad2' },
  { value: 'deportes', label: t('onboarding.interest.sports'), icon: 'Dumbbell' },
  { value: 'naturaleza', label: t('onboarding.interest.nature'), icon: 'Mountain' },
  { value: 'viajes', label: t('onboarding.interest.travel'), icon: 'Plane' },
  { value: 'literatura', label: t('onboarding.interest.literature'), icon: 'BookOpen' },
  { value: 'tecnologia', label: t('onboarding.interest.technology'), icon: 'Zap' }
]

export default function FundamentalDataOnboarding() {
  const { userProfile, setUserProfile, setOnboardingStep } = useArquitecto()
  const { t } = useSafeLanguage()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState<any>({})
  const [culturalInterests, setCulturalInterests] = useState<string[]>([])
  const [personalValues, setPersonalValues] = useState({
    harmony: 5,
    respect: 5,
    discipline: 5
  })

  // Crear pasos dinámicos basados en el objetivo seleccionado
  const getStepsForGoal = (goal: string) => {
    const baseSteps = getFundamentalDataSteps(t)

    // Agregar campos específicos según el objetivo
    const goalSpecificFields = getGoalSpecificFields(t)
    const goalSpecificStep = {
      id: 'goal-specific',
      title: goal === 'invertir' ? t('onboarding.investment.title') : goal === 'migrar' ? t('onboarding.migration.title') : t('onboarding.residence.title'),
      description: goal === 'invertir' ? t('onboarding.investment.description') : goal === 'migrar' ? t('onboarding.migration.description') : t('onboarding.residence.description'),
      icon: goal === 'invertir' ? 'DollarSign' : goal === 'migrar' ? 'Users' : 'Home',
      fields: goalSpecificFields[goal as keyof typeof goalSpecificFields] || []
    }

    const culturalStep = {
      id: 'cultural-analysis',
      title: t('onboarding.cultural.title'),
      description: t('onboarding.cultural.description'),
      icon: 'Heart',
      fields: []
    }

    return [...baseSteps, goalSpecificStep, culturalStep]
  }

  const allSteps = getStepsForGoal(userProfile.primaryGoal || 'invertir')

  const getWelcomeMessage = (goal: string) => {
    switch (goal) {
      case 'invertir':
        return {
          title: t('dataCollection.investment.title'),
          subtitle: t('dataCollection.investment.subtitle'),
          description: t('dataCollection.investment.description')
        }
      case 'migrar':
        return {
          title: t('dataCollection.migration.title'),
          subtitle: t('dataCollection.migration.subtitle'),
          description: t('dataCollection.migration.description')
        }
      case 'vivir':
        return {
          title: t('dataCollection.lifestyle.title'),
          subtitle: t('dataCollection.lifestyle.subtitle'),
          description: t('dataCollection.lifestyle.description')
        }
      default:
        return {
          title: t('dataCollection.default.title'),
          subtitle: t('dataCollection.default.subtitle'),
          description: t('dataCollection.default.description')
        }
    }
  }

  const welcomeMessage = getWelcomeMessage(userProfile.primaryGoal || 'invertir')
  const currentStep = allSteps[currentStepIndex]

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const handleNext = () => {
    if (currentStepIndex < allSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1)
    } else {
      // Completar onboarding
      const finalProfile = {
        ...userProfile,
        ...formData,
        culturalAffinity: {
          ...formData.culturalAffinity,
          culturalInterests,
          personalValues
        },
        intelligentScores: calculateIntelligentScores({
          ...userProfile,
          ...formData,
          culturalAffinity: {
            ...formData.culturalAffinity,
            culturalInterests,
            personalValues
          }
        }),
        fundamentalDataCompleted: true
      }
      
      setUserProfile(finalProfile)
      setOnboardingStep(3) // Ir al dashboard
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1)
    } else {
      setOnboardingStep(1) // Volver a selección de objetivo
    }
  }

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={field.required}
          />
        )
      case 'number':
        return (
          <input
            type="number"
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, parseInt(e.target.value))}
            placeholder={field.placeholder}
            min={field.min}
            max={field.max}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={field.required}
          />
        )
      case 'select':
        return (
          <select
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={field.required}
          >
            <option value="">{t('onboarding.selectOption')}</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'textarea':
        return (
          <textarea
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required={field.required}
          />
        )
      default:
        return null
    }
  }

  const renderCulturalAnalysis = () => {
    return (
      <div className="space-y-8">
        {/* Conocimiento de Japón */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('onboarding.cultural.knowledge')}</h3>
          <div className="grid grid-cols-2 gap-4">
            {['ninguno', 'basico', 'intermedio', 'avanzado'].map((level) => (
              <button
                key={level}
                onClick={() => handleFieldChange('culturalAffinity.japanKnowledge', level)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData['culturalAffinity.japanKnowledge'] === level
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium capitalize">
                    {level === 'ninguno' ? t('onboarding.level.none') :
                     level === 'basico' ? t('onboarding.level.basic') :
                     level === 'intermedio' ? t('onboarding.level.intermediate') :
                     level === 'avanzado' ? t('onboarding.level.advanced') :
                     level === 'principiante' ? t('onboarding.level.basic') :
                     level}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Nivel de japonés */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('onboarding.cultural.japaneseLevel')}</h3>
          <div className="grid grid-cols-2 gap-4">
            {['ninguno', 'principiante', 'intermedio', 'avanzado'].map((level) => (
              <button
                key={level}
                onClick={() => handleFieldChange('culturalAffinity.japaneseLevel', level)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData['culturalAffinity.japaneseLevel'] === level
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium capitalize">
                    {level === 'ninguno' ? t('onboarding.level.none') :
                     level === 'basico' ? t('onboarding.level.basic') :
                     level === 'intermedio' ? t('onboarding.level.intermediate') :
                     level === 'avanzado' ? t('onboarding.level.advanced') :
                     level === 'principiante' ? t('onboarding.level.basic') :
                     level}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Valores personales */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('onboarding.cultural.personalValues')}</h3>
          <div className="space-y-4">
            {[
              { key: 'harmony', label: t('onboarding.cultural.harmony') },
              { key: 'respect', label: t('onboarding.cultural.respect') },
              { key: 'discipline', label: t('onboarding.cultural.discipline') }
            ].map((value) => (
              <div key={value.key}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{value.label}</span>
                  <span className="text-blue-600 font-semibold">{personalValues[value.key as keyof typeof personalValues]}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={personalValues[value.key as keyof typeof personalValues]}
                  onChange={(e) => setPersonalValues(prev => ({
                    ...prev,
                    [value.key]: parseInt(e.target.value)
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Intereses culturales */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('onboarding.cultural.culturalInterests')}</h3>
          <div className="grid grid-cols-2 gap-3">
            {getCulturalInterests(t).map((interest) => {
              const IconComponent = iconMap[interest.icon] || Heart
              const isSelected = culturalInterests.includes(interest.value)
              
              return (
                <button
                  key={interest.value}
                  onClick={() => {
                    if (isSelected) {
                      setCulturalInterests(prev => prev.filter(i => i !== interest.value))
                    } else {
                      setCulturalInterests(prev => [...prev, interest.value])
                    }
                  }}
                  className={`p-3 rounded-lg border-2 transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{interest.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Mostrar mensaje de bienvenida en el primer paso
  if (currentStepIndex === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse border border-gray-200">
              <Target className="w-12 h-12 text-gray-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {welcomeMessage.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              {welcomeMessage.subtitle}
            </p>
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              {welcomeMessage.description}
            </p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => setCurrentStepIndex(1)}
              className="group bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-12 py-4 rounded-full hover:shadow-lg transition-all duration-300 font-semibold text-lg hover:scale-105 relative overflow-hidden border border-gray-200 hover:border-gray-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                {t('dataCollection.startButton')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <p className="text-sm text-gray-500 animate-pulse">
              {t('dataCollection.timeEstimate')}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!currentStep) return null

  const IconComponent = iconMap[currentStep.icon] || User

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <IconComponent className="w-8 h-8 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {currentStep.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {currentStep.description}
          </p>
          <div className="w-24 h-1 bg-gray-300 mx-auto rounded-full">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / allSteps.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {t('onboarding.step', { current: currentStepIndex + 1, total: allSteps.length })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          {currentStep.id === 'cultural-analysis' ? (
            renderCulturalAnalysis()
          ) : (
            <div className="space-y-6">
              {currentStep.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <ClientOnly fallback="Back">
              {t('common.back')}
            </ClientOnly>
          </button>
          
          <button
            onClick={handleNext}
            className="group bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-semibold hover:scale-105 relative overflow-hidden border border-gray-200 hover:border-gray-300"
          >
            <span className="relative z-10 flex items-center gap-3">
              {currentStepIndex === allSteps.length - 1 ? t('onboarding.cultural.complete') : t('onboarding.continue')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
