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

const FUNDAMENTAL_DATA_STEPS: FundamentalDataStep[] = [
  {
    id: 'basic-info',
    title: 'Información Básica',
    description: 'Datos personales esenciales',
    icon: 'User',
    fields: [
      { id: 'fullName', type: 'text', label: 'Nombre completo', required: true },
      { id: 'phone', type: 'text', label: 'Teléfono', placeholder: '+1 (555) 123-4567' },
      { id: 'nationality', type: 'select', label: 'Nacionalidad', required: true, options: [
        { value: 'mexicana', label: 'Mexicana' },
        { value: 'estadounidense', label: 'Estadounidense' },
        { value: 'canadiense', label: 'Canadiense' },
        { value: 'espanola', label: 'Española' },
        { value: 'argentina', label: 'Argentina' },
        { value: 'colombiana', label: 'Colombiana' },
        { value: 'otra', label: 'Otra' }
      ]},
      { id: 'age', type: 'number', label: 'Edad', min: 18, max: 100, required: true },
      { id: 'gender', type: 'select', label: 'Género', options: [
        { value: 'masculino', label: 'Masculino' },
        { value: 'femenino', label: 'Femenino' },
        { value: 'otro', label: 'Otro' },
        { value: 'prefiero-no-decir', label: 'Prefiero no decir' }
      ]},
      { id: 'currentCountry', type: 'text', label: 'País actual', required: true },
      { id: 'currentCity', type: 'text', label: 'Ciudad actual', required: true }
    ]
  },
  {
    id: 'intention-details',
    title: 'Detalles de Intención',
    description: 'Información específica sobre tu objetivo',
    icon: 'Target',
    fields: [
      { id: 'timeline', type: 'select', label: 'Timeline', required: true, options: [
        { value: 'inmediato', label: 'Inmediato (0-3 meses)' },
        { value: '6-meses', label: '6 meses' },
        { value: '1-ano', label: '1 año' },
        { value: 'explorando', label: 'Solo explorando' }
      ]},
      { id: 'motivation', type: 'textarea', label: '¿Por qué Japón?', placeholder: 'Cuéntanos qué te motiva a considerar Japón...', required: true },
      { id: 'previousExperience', type: 'select', label: 'Experiencia previa con Japón', options: [
        { value: 'ninguna', label: 'Ninguna' },
        { value: 'limitada', label: 'Limitada (viajes cortos)' },
        { value: 'moderada', label: 'Moderada (varios viajes)' },
        { value: 'extensa', label: 'Extensa (vivido/trabajado)' }
      ]}
    ]
  }
]

// Campos específicos por objetivo
const GOAL_SPECIFIC_FIELDS = {
  invertir: [
    {
      id: 'budgetMin',
      type: 'number' as const,
      label: 'Presupuesto mínimo',
      placeholder: '50000',
      required: true
    },
    {
      id: 'budgetMax',
      type: 'number' as const,
      label: 'Presupuesto máximo',
      placeholder: '500000',
      required: true
    },
    {
      id: 'budgetCurrency',
      type: 'select' as const,
      label: 'Moneda',
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
      label: 'Ingresos anuales',
      placeholder: '100000'
    },
    {
      id: 'incomeStability',
      type: 'select' as const,
      label: 'Estabilidad de ingresos',
      options: [
        { value: 'inestable', label: 'Inestable' },
        { value: 'moderada', label: 'Moderada' },
        { value: 'estable', label: 'Estable' }
      ]
    },
    {
      id: 'financialExperience',
      type: 'select' as const,
      label: 'Experiencia financiera',
      options: [
        { value: 'ninguna', label: 'Ninguna' },
        { value: 'basica', label: 'Básica' },
        { value: 'intermedia', label: 'Intermedia' },
        { value: 'avanzada', label: 'Avanzada' }
      ],
      required: true
    },
    {
      id: 'riskTolerance',
      type: 'select' as const,
      label: 'Tolerancia al riesgo',
      options: [
        { value: 'conservador', label: 'Conservador' },
        { value: 'moderado', label: 'Moderado' },
        { value: 'agresivo', label: 'Agresivo' }
      ],
      required: true
    }
  ],
  migrar: [
    {
      id: 'familySituation.size',
      type: 'select' as const,
      label: 'Situación familiar',
      options: [
        { value: 'solo', label: 'Solo' },
        { value: 'pareja', label: 'Pareja' },
        { value: 'familia-pequena', label: 'Familia pequeña (1-2 hijos)' },
        { value: 'familia-grande', label: 'Familia grande (3+ hijos)' }
      ],
      required: true
    },
    {
      id: 'professionalSituation.education',
      type: 'select' as const,
      label: 'Nivel educativo',
      options: [
        { value: 'basica', label: 'Básica' },
        { value: 'media', label: 'Media' },
        { value: 'universitaria', label: 'Universitaria' },
        { value: 'postgrado', label: 'Postgrado' }
      ],
      required: true
    },
    {
      id: 'migrationTimeline',
      type: 'select' as const,
      label: 'Timeline de migración',
      options: [
        { value: 'urgente', label: 'Urgente (0-6 meses)' },
        { value: '6-meses', label: '6 meses' },
        { value: '1-ano', label: '1 año' },
        { value: '2-anos', label: '2 años' }
      ],
      required: true
    }
  ],
  vivir: [
    {
      id: 'housingNeeds.budget',
      type: 'number' as const,
      label: 'Presupuesto para vivienda',
      placeholder: '3000'
    },
    {
      id: 'housingNeeds.duration',
      type: 'select' as const,
      label: 'Duración esperada',
      options: [
        { value: 'temporal', label: 'Temporal (1-2 años)' },
        { value: 'permanente', label: 'Permanente' }
      ],
      required: true
    }
  ]
}

const CULTURAL_INTERESTS = [
  { value: 'arte', label: 'Arte', icon: 'Palette' },
  { value: 'musica', label: 'Música', icon: 'Music' },
  { value: 'fotografia', label: 'Fotografía', icon: 'Camera' },
  { value: 'gastronomia', label: 'Gastronomía', icon: 'Utensils' },
  { value: 'videojuegos', label: 'Videojuegos', icon: 'Gamepad2' },
  { value: 'deportes', label: 'Deportes', icon: 'Dumbbell' },
  { value: 'naturaleza', label: 'Naturaleza', icon: 'Mountain' },
  { value: 'viajes', label: 'Viajes', icon: 'Plane' },
  { value: 'literatura', label: 'Literatura', icon: 'BookOpen' },
  { value: 'tecnologia', label: 'Tecnología', icon: 'Zap' }
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
    const baseSteps = [
      {
        id: 'basic-info',
        title: 'Información Básica',
        description: 'Datos personales esenciales',
        icon: 'User',
        fields: [
          { id: 'fullName', type: 'text', label: 'Nombre completo', required: true },
          { id: 'phone', type: 'text', label: 'Teléfono', placeholder: '+1 (555) 123-4567' },
          { id: 'nationality', type: 'select', label: 'Nacionalidad', required: true, options: [
            { value: 'mexicana', label: 'Mexicana' },
            { value: 'estadounidense', label: 'Estadounidense' },
            { value: 'canadiense', label: 'Canadiense' },
            { value: 'espanola', label: 'Española' },
            { value: 'argentina', label: 'Argentina' },
            { value: 'colombiana', label: 'Colombiana' },
            { value: 'otra', label: 'Otra' }
          ]},
          { id: 'age', type: 'number', label: 'Edad', min: 18, max: 100, required: true },
          { id: 'currentCountry', type: 'text', label: 'País actual', required: true },
          { id: 'currentCity', type: 'text', label: 'Ciudad actual', required: true }
        ]
      },
      {
        id: 'intention-details',
        title: 'Detalles de Intención',
        description: 'Información específica sobre tu objetivo',
        icon: 'Target',
        fields: [
          { id: 'timeline', type: 'select', label: 'Timeline', required: true, options: [
            { value: 'inmediato', label: 'Inmediato (0-3 meses)' },
            { value: '6-meses', label: '6 meses' },
            { value: '1-ano', label: '1 año' },
            { value: 'explorando', label: 'Solo explorando' }
          ]},
          { id: 'motivation', type: 'textarea', label: '¿Por qué Japón?', placeholder: 'Cuéntanos qué te motiva a considerar Japón...', required: true },
          { id: 'previousExperience', type: 'select', label: 'Experiencia previa con Japón', options: [
            { value: 'ninguna', label: 'Ninguna' },
            { value: 'limitada', label: 'Limitada (viajes cortos)' },
            { value: 'moderada', label: 'Moderada (varios viajes)' },
            { value: 'extensa', label: 'Extensa (vivido/trabajado)' }
          ]}
        ]
      }
    ]

    // Agregar campos específicos según el objetivo
    const goalSpecificStep = {
      id: 'goal-specific',
      title: goal === 'invertir' ? 'Datos de Inversión' : goal === 'migrar' ? 'Datos de Migración' : 'Datos de Residencia',
      description: goal === 'invertir' ? 'Información financiera y de inversión' : goal === 'migrar' ? 'Información familiar y profesional' : 'Información de vivienda',
      icon: goal === 'invertir' ? 'DollarSign' : goal === 'migrar' ? 'Users' : 'Home',
      fields: GOAL_SPECIFIC_FIELDS[goal] || []
    }

    const culturalStep = {
      id: 'cultural-analysis',
      title: 'Análisis Cultural',
      description: 'Tu afinidad con la cultura japonesa',
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
          title: 'Investment Data Collection',
          subtitle: 'Let\'s gather your investment profile information',
          description: 'We need some specific data about your financial situation and investment goals to create your personalized investment analysis.'
        }
      case 'migrar':
        return {
          title: 'Migration Data Collection',
          subtitle: 'Let\'s gather your migration profile information',
          description: 'We need some specific data about your family situation and professional background to create your personalized migration plan.'
        }
      case 'vivir':
        return {
          title: 'Lifestyle Data Collection',
          subtitle: 'Let\'s gather your lifestyle profile information',
          description: 'We need some specific data about your housing needs and lifestyle preferences to create your personalized living experience.'
        }
      default:
        return {
          title: 'Profile Data Collection',
          subtitle: 'Let\'s gather your profile information',
          description: 'We need some specific data to create your personalized analysis.'
        }
    }
  }

  const welcomeMessage = getWelcomeMessage(userProfile.primaryGoal || 'invertir')
  const currentStep = allSteps[currentStepIndex]

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
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
            <option value="">Selecciona una opción</option>
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Conocimiento de Japón</h3>
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
                  <div className="font-medium capitalize">{level}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Nivel de japonés */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Nivel de japonés</h3>
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
                  <div className="font-medium capitalize">{level}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Valores personales */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Valores personales (1-10)</h3>
          <div className="space-y-4">
            {[
              { key: 'harmony', label: 'Armonía' },
              { key: 'respect', label: 'Respeto' },
              { key: 'discipline', label: 'Disciplina' }
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Intereses culturales</h3>
          <div className="grid grid-cols-2 gap-3">
            {CULTURAL_INTERESTS.map((interest) => {
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
                Start Data Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <p className="text-sm text-gray-500 animate-pulse">
              This will take about 5-10 minutes
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
            Paso {currentStepIndex} de {allSteps.length}
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
              {currentStepIndex === allSteps.length - 1 ? 'Completar' : 'Continuar'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
