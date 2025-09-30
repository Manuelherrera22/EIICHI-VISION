'use client'

import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { ArrowLeft, CheckCircle, Clock, AlertCircle, FileText, Upload, Calendar, Users, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function VisaTimelinePage() {
  const [activeStep, setActiveStep] = useState(0)

  const visaSteps = [
    {
      id: 'documents',
      title: 'Recolección de Documentos',
      status: 'in_progress',
      progress: 75,
      description: 'Recopilación de documentos necesarios para la visa de trabajo',
      dueDate: '2024-02-15',
      completedDate: null,
      documents: [
        { name: 'Pasaporte válido', status: 'completed', uploaded: true },
        { name: 'Certificado de antecedentes penales', status: 'completed', uploaded: true },
        { name: 'Título universitario apostillado', status: 'completed', uploaded: true },
        { name: 'Contrato de trabajo', status: 'completed', uploaded: true },
        { name: 'Certificado médico', status: 'in_progress', uploaded: false },
        { name: 'Fotografías tamaño pasaporte', status: 'pending', uploaded: false }
      ]
    },
    {
      id: 'validation',
      title: 'Validación Legal',
      status: 'pending',
      progress: 0,
      description: 'Revisión y validación de documentos por nuestro equipo legal',
      dueDate: '2024-03-01',
      completedDate: null,
      documents: []
    },
    {
      id: 'submission',
      title: 'Envío a Inmigración',
      status: 'pending',
      progress: 0,
      description: 'Presentación oficial de la solicitud de visa',
      dueDate: '2024-03-15',
      completedDate: null,
      documents: []
    },
    {
      id: 'processing',
      title: 'Procesamiento',
      status: 'pending',
      progress: 0,
      description: 'Revisión por parte de las autoridades de inmigración japonesas',
      dueDate: '2024-04-15',
      completedDate: null,
      documents: []
    },
    {
      id: 'approval',
      title: 'Aprobación',
      status: 'pending',
      progress: 0,
      description: 'Aprobación final y emisión de la visa',
      dueDate: '2024-05-01',
      completedDate: null,
      documents: []
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />
      case 'in_progress':
        return <Clock className="w-6 h-6 text-yellow-600" />
      case 'pending':
        return <AlertCircle className="w-6 h-6 text-gray-400" />
      default:
        return <AlertCircle className="w-6 h-6 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50'
      case 'in_progress':
        return 'border-yellow-500 bg-yellow-50'
      case 'pending':
        return 'border-gray-300 bg-gray-50'
      default:
        return 'border-gray-300 bg-gray-50'
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Volver al Dashboard</span>
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-2xl font-bold text-gray-900">Línea de Tiempo de Visa</h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>Contactar Equipo</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Consulta</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Resumen del Progreso */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Progreso General</h2>
              <div className="text-right">
                <p className="text-sm text-gray-600">Tiempo estimado restante</p>
                <p className="text-lg font-semibold text-gray-900">2-3 meses</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Progreso Total</span>
                <span className="text-sm font-medium text-gray-700">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-primary h-3 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {visaSteps.map((step, index) => (
              <div key={step.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className={`p-6 border-l-4 ${getStatusColor(step.status)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                            Paso {index + 1}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{step.description}</p>
                        
                        {/* Barra de Progreso */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Progreso</span>
                            <span className="text-sm font-medium text-gray-700">{step.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                step.status === 'completed' ? 'bg-green-500' : 
                                step.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-300'
                              }`}
                              style={{ width: `${step.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Fecha de Vencimiento */}
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Vence: {step.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setActiveStep(index)}
                        className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Ver Detalles
                      </button>
                    </div>
                  </div>
                </div>

                {/* Detalles Expandibles */}
                {activeStep === index && step.documents.length > 0 && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Documentos Requeridos</h4>
                    <div className="space-y-3">
                      {step.documents.map((doc, docIndex) => (
                        <div key={docIndex} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-900">{doc.name}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              doc.status === 'completed' ? 'bg-green-100 text-green-800' :
                              doc.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {doc.status === 'completed' ? 'Completado' :
                               doc.status === 'in_progress' ? 'En Progreso' : 'Pendiente'}
                            </span>
                            {!doc.uploaded && (
                              <button className="flex items-center space-x-1 px-3 py-1 text-sm text-primary hover:text-primary/80 transition-colors">
                                <Upload className="w-4 h-4" />
                                <span>Subir</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Información de Contacto */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mt-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Necesitas Ayuda?</h3>
                <p className="text-gray-600 mb-4">
                  Nuestro equipo de expertos en inmigración está disponible para ayudarte en cada paso del proceso.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat en Vivo</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <Calendar className="w-4 h-4" />
                    <span>Agendar Consulta</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

