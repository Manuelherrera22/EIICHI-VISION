'use client'

import React, { useState, useEffect } from 'react'
import { Bell, X, Eye, Heart, TrendingUp, Calendar, MessageSquare, Sparkles, ArrowRight } from 'lucide-react'

interface IntelligentNotification {
  id: string
  type: 'match' | 'inspiration' | 'progress' | 'milestone' | 'exclusive'
  title: string
  message: string
  action?: {
    label: string
    href: string
  }
  priority: 'high' | 'medium' | 'low'
  createdAt: Date
  read: boolean
}

interface NotificationSystemProps {
  userProfile: any
  dashboardType: 'invertir' | 'migrar' | 'vivir'
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ userProfile, dashboardType }) => {
  const [notifications, setNotifications] = useState<IntelligentNotification[]>([])
  const [showNotifications, setShowNotifications] = useState(false)

  // Generar notificaciones inteligentes basadas en el perfil del usuario
  useEffect(() => {
    const generateIntelligentNotifications = () => {
      const newNotifications: IntelligentNotification[] = []

      // Notificaciones específicas por tipo de dashboard
      switch (dashboardType) {
        case 'invertir':
          newNotifications.push(
            {
              id: 'inv-1',
              type: 'match',
              title: '¡Nueva Oportunidad Detectada!',
              message: `Mientras no estabas, entró al sistema una propiedad en Kusatsu que coincide en un 95% con tu perfil de inversión. Potencial ROI: 18.5%.`,
              action: {
                label: 'Ver Análisis Completo',
                href: '/dashboard/properties/new-match'
              },
              priority: 'high',
              createdAt: new Date(),
              read: false
            },
            {
              id: 'inv-2',
              type: 'inspiration',
              title: 'Sabiduría Financiera',
              message: `"La diversificación no es solo entre activos, sino entre geografías." Nuevo artículo sobre estrategias de inversión en Japón.`,
              action: {
                label: 'Leer Artículo',
                href: '/journal/investment-strategies'
              },
              priority: 'medium',
              createdAt: new Date(),
              read: false
            }
          )
          break

        case 'migrar':
          newNotifications.push(
            {
              id: 'mig-1',
              type: 'progress',
              title: '¡Progreso en tu Visa!',
              message: `Tu documento de contrato de trabajo ha sido aprobado por nuestro equipo legal. Solo faltan 2 documentos para completar la fase de recolección.`,
              action: {
                label: 'Ver Estado Completo',
                href: '/dashboard/visa-timeline'
              },
              priority: 'high',
              createdAt: new Date(),
              read: false
            },
            {
              id: 'mig-2',
              type: 'inspiration',
              title: 'Historia Inspiradora',
              message: `Conoce a la familia Rodríguez, que se mudó desde México hace un año. Así es un día en su vida en Kusatsu.`,
              action: {
                label: 'Ver Testimonial',
                href: '/stories/family-rodriguez'
              },
              priority: 'medium',
              createdAt: new Date(),
              read: false
            }
          )
          break

        case 'vivir':
          newNotifications.push(
            {
              id: 'viv-1',
              type: 'milestone',
              title: 'Tu Render Personalizado',
              message: `Nuestro equipo de arquitectos vio que guardaste la 'Kawaakari House' en tus favoritos. Crearon un render con tu estilo minimalista preferido.`,
              action: {
                label: 'Ver Render',
                href: '/dashboard/3d-viewer/personalized'
              },
              priority: 'high',
              createdAt: new Date(),
              read: false
            },
            {
              id: 'viv-2',
              type: 'inspiration',
              title: 'Momento de Calma',
              message: `Una nueva paleta de materiales sostenibles inspirada en los bosques de Gunma ha sido añadida a tu Mesa de Diseño.`,
              action: {
                label: 'Explorar Materiales',
                href: '/dashboard/materials/sustainable'
              },
              priority: 'medium',
              createdAt: new Date(),
              read: false
            }
          )
          break
      }

      // Notificación universal de progreso
      newNotifications.push({
        id: 'universal-1',
        type: 'progress',
        title: '¡Felicidades!',
        message: `Tu 'Blueprint' inicial está completo. El siguiente paso es agendar una charla exploratoria de 15 minutos con nuestro equipo.`,
        action: {
          label: 'Agendar Charla',
          href: '/schedule/exploratory-call'
        },
        priority: 'medium',
        createdAt: new Date(),
        read: false
      })

      setNotifications(newNotifications)
    }

    generateIntelligentNotifications()
  }, [dashboardType, userProfile])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'inspiration':
        return <Sparkles className="w-4 h-4 text-blue-600" />
      case 'progress':
        return <Heart className="w-4 h-4 text-purple-600" />
      case 'milestone':
        return <Eye className="w-4 h-4 text-orange-600" />
      case 'exclusive':
        return <Calendar className="w-4 h-4 text-red-600" />
      default:
        return <Bell className="w-4 h-4 text-gray-600" />
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

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <>
      {/* Botón de Notificaciones */}
      <button 
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Panel de Notificaciones */}
      {showNotifications && (
        <div className="absolute top-12 right-0 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">Notificaciones Inteligentes</h3>
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => setShowNotifications(false)}
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Tu acompañamiento personalizado
            </p>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                <p>No hay notificaciones nuevas</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${getPriorityColor(notification.priority)} ${!notification.read ? 'bg-blue-50' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        {notification.action && (
                          <button className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center">
                            {notification.action.label}
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </button>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          {notification.createdAt.toLocaleTimeString()}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium">
              Ver Todas las Notificaciones
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default NotificationSystem


