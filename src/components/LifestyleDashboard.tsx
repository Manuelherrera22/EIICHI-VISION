'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardFramework from './DashboardFramework'
import WeeklyPulseWidget from './WeeklyPulseWidget'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Palette, 
  Eye, 
  Calendar, 
  Star, 
  Plus,
  Download,
  Share,
  MessageSquare,
  Camera,
  Home,
  Mountain,
  Coffee,
  Utensils,
  Sparkles,
  ArrowRight,
  Filter,
  Search,
  Clock
} from 'lucide-react'

interface DesignMaterial {
  id: string
  name: string
  category: string
  image: string
  price: number
  sustainability: 'high' | 'medium' | 'low'
  saved: boolean
}

interface Experience {
  id: string
  title: string
  type: string
  date: string
  duration: string
  price: number
  status: 'available' | 'booked' | 'completed'
  description: string
}

const LifestyleDashboard: React.FC<{ userProfile: any }> = ({ userProfile }) => {
  const router = useRouter()
  const { t } = useLanguage()
  const [selectedMaterial, setSelectedMaterial] = useState<DesignMaterial | null>(null)
  const [show3DViewer, setShow3DViewer] = useState(false)

  // Datos de ejemplo
  const materials: DesignMaterial[] = [
    {
      id: '1',
      name: 'Madera de Cedro Japonés',
      category: 'Pisos',
      image: '/api/placeholder/200/150',
      price: 15000,
      sustainability: 'high',
      saved: true
    },
    {
      id: '2',
      name: 'Mármol Carrara',
      category: 'Encimeras',
      image: '/api/placeholder/200/150',
      price: 45000,
      sustainability: 'medium',
      saved: false
    },
    {
      id: '3',
      name: 'Papel Washi Tradicional',
      category: 'Paredes',
      image: '/api/placeholder/200/150',
      price: 8000,
      sustainability: 'high',
      saved: true
    }
  ]

  const experiences: Experience[] = [
    {
      id: '1',
      title: 'Sesión de Ski en Kusatsu',
      type: 'Deportes',
      date: '2024-02-15',
      duration: 'Día completo',
      price: 12000,
      status: 'available',
      description: 'Pases de ski + instructor privado + almuerzo en montaña'
    },
    {
      id: '2',
      title: 'Onsen Privado con Cena',
      type: 'Relajación',
      date: '2024-02-20',
      duration: '3 horas',
      price: 25000,
      status: 'booked',
      description: 'Onsen privado + cena kaiseki + masaje tradicional'
    },
    {
      id: '3',
      title: 'Ceremonia del Té',
      type: 'Cultural',
      date: '2024-02-25',
      duration: '2 horas',
      price: 8000,
      status: 'available',
      description: 'Ceremonia tradicional + degustación de té matcha'
    }
  ]

  const nextSteps = [
    {
      id: '1',
      title: 'Renderizado Fotorrealista',
      description: 'Tu diseño está listo para renderizado cinematográfico',
      status: 'in_progress' as const,
      priority: 'high' as const,
      dueDate: 'En 2 horas'
    },
    {
      id: '2',
      title: 'Sesión AR con Arquitecto',
      description: 'Revisión en tiempo real con el equipo de diseño',
      status: 'pending' as const,
      priority: 'medium' as const,
      dueDate: 'Mañana 10:00'
    },
    {
      id: '3',
      title: 'Reservar Onsen Privado',
      description: 'Confirmar disponibilidad para el 20 de febrero',
      status: 'pending' as const,
      priority: 'low' as const,
      dueDate: 'Esta semana'
    }
  ]

  const getSustainabilityColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-green-600'
      case 'medium':
        return 'text-yellow-600'
      case 'low':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'booked':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return 'Disponible'
      case 'booked':
        return 'Reservado'
      case 'completed':
        return 'Completado'
      default:
        return status
    }
  }

  return (
    <DashboardFramework
      userProfile={userProfile}
      nextSteps={nextSteps}
      dashboardType="vivir"
    >
      <div className="space-y-8">
        {/* Tu Pulso Semanal */}
        <WeeklyPulseWidget 
          userProfile={userProfile} 
          dashboardType="vivir" 
        />

        {/* Módulo Principal: Mi Mesa de Diseño 3D/AR */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{t('dashboard.lifestyle.designTable.title')}</h3>
                <p className="text-sm text-gray-600">{t('dashboard.lifestyle.designTable.description')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                onClick={() => router.push('/dashboard/3d-viewer/personalized')}
              >
                <Eye className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{t('dashboard.lifestyle.designTable.viewRender')}</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                <Camera className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">AR</span>
              </button>
            </div>
          </div>

          {/* Vista Previa 3D */}
          <div className="bg-gray-100 rounded-lg p-8 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Vista Previa de tu Hogar</h4>
              <p className="text-sm text-gray-600 mb-4">
                Tu diseño actual con materiales seleccionados
              </p>
              <div className="flex justify-center space-x-4">
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm font-medium">
                  <Download className="w-4 h-4 inline mr-1" />
                  Descargar Imagen
                </button>
                <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm font-medium">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  Renderizado Cinematográfico
                </button>
              </div>
            </div>
          </div>

          {/* Controles de Diseño */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Materiales Aplicados</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Pisos</span>
                  <span className="text-xs text-gray-800">Madera Cedro</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Paredes</span>
                  <span className="text-xs text-gray-800">Washi Blanco</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Encimeras</span>
                  <span className="text-xs text-gray-800">Pendiente</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Colaboración en Tiempo Real</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Arquitecto: En línea</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600">Diseñador: Disponible</span>
                </div>
                <button className="w-full mt-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-xs font-medium">
                  <MessageSquare className="w-3 h-3 inline mr-1" />
                  Chatear
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Progreso del Diseño</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Planos</span>
                  <span className="text-xs text-green-600">✓</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Materiales</span>
                  <span className="text-xs text-yellow-600">75%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Renderizado</span>
                  <span className="text-xs text-gray-400">Pendiente</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Catálogo de Materiales y Acabados */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Palette className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{t('dashboard.lifestyle.materials.title')}</h3>
                <p className="text-sm text-gray-600">{t('dashboard.lifestyle.materials.description')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Search className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {materials.map((material) => (
              <div key={material.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="relative mb-3">
                  <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Palette className="w-8 h-8 text-gray-400" />
                  </div>
                  <button className={`absolute top-2 right-2 p-1 rounded-full ${material.saved ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}>
                    <Star className={`w-4 h-4 ${material.saved ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">{material.name}</h4>
                    <p className="text-xs text-gray-600">{material.category}</p>
                  </div>
                  <span className={`text-xs font-medium ${getSustainabilityColor(material.sustainability)}`}>
                    {material.sustainability === 'high' ? 'Eco' : 
                     material.sustainability === 'medium' ? 'Medio' : 'Bajo'}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  ¥{material.price.toLocaleString()}/m²
                </p>
                <div className="flex space-x-2">
                  <button 
                    className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-xs font-medium"
                    onClick={() => router.push('/dashboard/materials')}
                  >
                    {t('dashboard.lifestyle.materials.viewCatalog')}
                  </button>
                  <button className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-xs font-medium">
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concierge de Experiencias */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{t('dashboard.lifestyle.concierge.title')}</h3>
              <p className="text-sm text-gray-600">{t('dashboard.lifestyle.concierge.description')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiences.map((experience) => (
              <div key={experience.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{experience.title}</h4>
                    <p className="text-sm text-gray-600">{experience.type}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(experience.status)}`}>
                    {getStatusLabel(experience.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{experience.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{experience.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-600">{experience.duration}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    ¥{experience.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium">
                    Ver Detalles
                  </button>
                  {experience.status === 'available' && (
                    <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm font-medium">
                      Reservar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Notificación Inteligente */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800">Sugerencia Inteligente</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Hemos detectado una nevada fuerte para mañana, es el día perfecto para esquiar. 
                  ¿Quieres que te reservemos los pases de ski en Kusatsu?
                </p>
                <button className="mt-2 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-xs font-medium">
                  Reservar Automáticamente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardFramework>
  )
}

export default LifestyleDashboard
