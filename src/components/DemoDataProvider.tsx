'use client'

import React, { useState, useEffect } from 'react'
import { TrendingUp, Building, DollarSign, Calendar, Users, FileText } from 'lucide-react'

interface DemoDataProviderProps {
  children: React.ReactNode
  userProfile: any
}

const DemoDataProvider: React.FC<DemoDataProviderProps> = ({ children, userProfile }) => {
  const [demoData, setDemoData] = useState<any>({})

  useEffect(() => {
    // Generar datos de demostración basados en el perfil del usuario
    const generateDemoData = () => {
      const baseData = {
        properties: [
          {
            id: 'prop-1',
            title: 'Casa Tradicional Kusatsu',
            location: 'Kusatsu, Gunma',
            price: 45000000,
            area: 120,
            year: 1985,
            roi: 12.5,
            status: 'available',
            image: '/images/kusatsu-house.jpg',
            description: 'Casa tradicional japonesa completamente renovada con baños termales privados.'
          },
          {
            id: 'prop-2',
            title: 'Minka Rural Tsumagoi',
            location: 'Tsumagoi, Gunma',
            price: 32000000,
            area: 95,
            year: 1972,
            roi: 15.2,
            status: 'under_analysis',
            image: '/images/tsumagoi-minka.jpg',
            description: 'Minka tradicional con potencial de conversión a ryokan turístico.'
          },
          {
            id: 'prop-3',
            title: 'Villa Moderna Minakami',
            location: 'Minakami, Gunma',
            price: 68000000,
            area: 180,
            year: 2020,
            roi: 8.7,
            status: 'exclusive',
            image: '/images/minakami-villa.jpg',
            description: 'Villa moderna con diseño contemporáneo y vistas panorámicas.'
          }
        ],
        notifications: [
          {
            id: 'notif-1',
            type: 'match',
            title: '¡Nueva Oportunidad!',
            message: 'Propiedad en Kusatsu coincide 95% con tu perfil',
            priority: 'high',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
            read: false
          },
          {
            id: 'notif-2',
            type: 'progress',
            title: 'Documento Aprobado',
            message: 'Tu contrato de trabajo ha sido validado',
            priority: 'medium',
            createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 horas atrás
            read: false
          }
        ],
        nextSteps: [
          {
            id: 'step-1',
            title: 'Completar Documentos de Visa',
            description: 'Faltan 2 documentos para completar la fase de recolección',
            status: 'in_progress',
            priority: 'high',
            dueDate: '2024-02-15'
          },
          {
            id: 'step-2',
            title: 'Agendar Charla Exploratoria',
            description: 'Reserva una sesión de 15 minutos con nuestro equipo',
            status: 'pending',
            priority: 'medium',
            dueDate: '2024-02-20'
          },
          {
            id: 'step-3',
            title: 'Revisar Análisis de Propiedad',
            description: 'Nueva propiedad disponible para análisis detallado',
            status: 'pending',
            priority: 'low',
            dueDate: '2024-02-25'
          }
        ],
        portfolio: {
          totalValue: 125000000,
          totalROI: 14.2,
          propertiesCount: 3,
          monthlyIncome: 850000
        },
        visaTimeline: [
          {
            id: 'visa-1',
            title: 'Recolección de Documentos',
            status: 'in_progress',
            progress: 75,
            description: 'Documentos básicos recolectados',
            dueDate: '2024-02-15'
          },
          {
            id: 'visa-2',
            title: 'Validación Legal',
            status: 'pending',
            progress: 0,
            description: 'Revisión por equipo legal',
            dueDate: '2024-03-01'
          },
          {
            id: 'visa-3',
            title: 'Envío a Inmigración',
            status: 'pending',
            progress: 0,
            description: 'Presentación oficial',
            dueDate: '2024-03-15'
          }
        ],
        materials: [
          {
            id: 'mat-1',
            name: 'Madera de Ciprés Japonés',
            category: 'Natural',
            color: '#8B4513',
            texture: '/textures/cypress.jpg',
            price: 15000,
            sustainability: 'A+'
          },
          {
            id: 'mat-2',
            name: 'Piedra Volcánica Kusatsu',
            category: 'Natural',
            color: '#696969',
            texture: '/textures/volcanic-stone.jpg',
            price: 22000,
            sustainability: 'A+'
          },
          {
            id: 'mat-3',
            name: 'Papel Washi Tradicional',
            category: 'Decorativo',
            color: '#F5F5DC',
            texture: '/textures/washi.jpg',
            price: 8000,
            sustainability: 'A'
          }
        ]
      }

      // Personalizar datos según el tipo de usuario
      switch (userProfile.primaryGoal) {
        case 'invertir':
          return {
            ...baseData,
            focus: 'investment',
            metrics: {
              totalROI: 14.2,
              monthlyIncome: 850000,
              propertiesAnalyzed: 12,
              opportunitiesPending: 3
            }
          }
        
        case 'migrar':
          return {
            ...baseData,
            focus: 'migration',
            metrics: {
              documentsCompleted: 8,
              documentsRemaining: 2,
              estimatedTimeline: '4-6 meses',
              successRate: 95
            }
          }
        
        case 'vivir':
          return {
            ...baseData,
            focus: 'lifestyle',
            metrics: {
              designsCreated: 5,
              materialsSelected: 12,
              inspirationSaved: 28,
              collaborationsActive: 2
            }
          }
        
        default:
          return baseData
      }
    }

    setDemoData(generateDemoData())
  }, [userProfile])

  // Proporcionar datos de demostración a través de contexto
  return (
    <div className="demo-data-provider">
      {React.cloneElement(children as React.ReactElement, { demoData })}
    </div>
  )
}

export default DemoDataProvider

