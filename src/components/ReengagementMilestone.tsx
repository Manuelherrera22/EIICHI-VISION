'use client'

import React, { useState, useEffect } from 'react'
import { 
  Gift, 
  Calendar, 
  Eye, 
  Sparkles, 
  ArrowRight, 
  X,
  Clock,
  Star,
  Heart
} from 'lucide-react'

interface ReengagementMilestoneProps {
  userProfile: any
  inactivityDays: number
  onDismiss?: () => void
}

const ReengagementMilestone: React.FC<ReengagementMilestoneProps> = ({ 
  userProfile, 
  inactivityDays, 
  onDismiss 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [milestoneType, setMilestoneType] = useState<'render' | 'webinar' | 'exclusive' | null>(null)

  useEffect(() => {
    // Simular detección de inactividad y mostrar milestone apropiado
    if (inactivityDays >= 30) {
      setIsVisible(true)
      // Determinar tipo de milestone basado en el perfil del usuario
      if (userProfile.primaryGoal === 'vivir') {
        setMilestoneType('render')
      } else if (userProfile.primaryGoal === 'invertir') {
        setMilestoneType('webinar')
      } else {
        setMilestoneType('exclusive')
      }
    }
  }, [inactivityDays, userProfile])

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  const getMilestoneContent = () => {
    switch (milestoneType) {
      case 'render':
        return {
          icon: <Eye className="w-8 h-8 text-purple-600" />,
          title: 'Tu Render Personalizado',
          subtitle: 'Un regalo inesperado de nuestro equipo',
          description: 'Nuestro equipo de arquitectos vio que guardaste la "Kawaakari House" en tus favoritos. Crearon un render con tu estilo minimalista preferido.',
          action: {
            label: 'Ver Mi Render Personalizado',
            href: '/dashboard/3d-viewer/personalized'
          },
          bgColor: 'from-purple-50 to-pink-50',
          borderColor: 'border-purple-200',
          textColor: 'text-purple-800'
        }
      
      case 'webinar':
        return {
          icon: <Calendar className="w-8 h-8 text-blue-600" />,
          title: 'Invitación Exclusiva',
          subtitle: 'Webinar privado para inversores',
          description: 'Te invitamos a un webinar exclusivo sobre "Estrategias de Inversión en Propiedades Rurales Japonesas" con nuestro CEO y un inversor exitoso.',
          action: {
            label: 'Reservar Mi Lugar',
            href: '/webinar/investment-strategies'
          },
          bgColor: 'from-blue-50 to-indigo-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800'
        }
      
      case 'exclusive':
        return {
          icon: <Gift className="w-8 h-8 text-green-600" />,
          title: 'Oportunidad Exclusiva',
          subtitle: 'Acceso anticipado a nueva propiedad',
          description: 'Tenemos una propiedad en Kusatsu que coincide perfectamente con tu perfil de migración. Te damos acceso anticipado antes del lanzamiento público.',
          action: {
            label: 'Ver Propiedad Exclusiva',
            href: '/properties/exclusive/kusatsu'
          },
          bgColor: 'from-green-50 to-emerald-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800'
        }
      
      default:
        return null
    }
  }

  const content = getMilestoneContent()

  if (!isVisible || !content) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full border-2 ${content.borderColor} overflow-hidden`}>
        {/* Header con gradiente */}
        <div className={`bg-gradient-to-r ${content.bgColor} p-6 relative`}>
          <button 
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            onClick={handleDismiss}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              {content.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {content.title}
            </h2>
            <p className={`text-sm font-medium ${content.textColor}`}>
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <p className="text-gray-600 mb-6 leading-relaxed">
            {content.description}
          </p>

          {/* Información adicional */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Disponible por tiempo limitado</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">Exclusivo para tu perfil</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
              <span>{content.action.label}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button 
              className="w-full text-gray-500 hover:text-gray-700 py-2 px-6 rounded-lg transition-colors text-sm"
              onClick={handleDismiss}
            >
              Tal vez más tarde
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-xs text-gray-600">
              Tu equipo de Tabiji House te está esperando
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReengagementMilestone


