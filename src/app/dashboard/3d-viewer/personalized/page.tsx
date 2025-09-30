'use client'

import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { ArrowLeft, Eye, Download, Share, Heart, RotateCcw, Maximize, Minimize, Settings } from 'lucide-react'
import Link from 'next/link'

export default function Personalized3DViewerPage() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewMode, setViewMode] = useState<'day' | 'night' | 'sunset'>('day')
  const [showSettings, setShowSettings] = useState(false)

  const renderData = {
    title: 'Tu Render Personalizado - Kawaakari House',
    description: 'Nuestro equipo de arquitectos creó este render personalizado basado en tu estilo minimalista preferido y las propiedades que has guardado en favoritos.',
    style: 'Minimalista Japonés',
    materials: [
      { name: 'Madera de Ciprés', color: '#8B4513', applied: true },
      { name: 'Piedra Volcánica', color: '#696969', applied: true },
      { name: 'Papel Washi', color: '#F5F5DC', applied: false }
    ],
    features: [
      'Jardín zen minimalista',
      'Baños termales integrados',
      'Cocina abierta estilo japonés',
      'Ventanas grandes para luz natural',
      'Terraza con vista a la montaña'
    ]
  }

  return (
    <Layout>
      <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gray-900`}>
        {/* Header */}
        <div className="bg-black/50 backdrop-blur-sm border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Volver al Dashboard</span>
                </Link>
                <div className="h-6 w-px bg-gray-600"></div>
                <h1 className="text-xl font-bold text-white">{renderData.title}</h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white">
                  <Heart className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white">
                  <Share className="w-4 h-4" />
                  <span>Compartir</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-primary hover:bg-primary/90 rounded-lg transition-colors text-white">
                  <Download className="w-4 h-4" />
                  <span>Descargar</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-80px)]">
          {/* Visor 3D Principal */}
          <div className="flex-1 relative">
            {/* Canvas 3D Placeholder */}
            <div className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
              <div className="text-center text-white">
                <Eye className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                <h2 className="text-2xl font-bold mb-4">Render 3D Personalizado</h2>
                <p className="text-gray-300 mb-6 max-w-md">
                  {renderData.description}
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <button className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg font-semibold transition-colors">
                    Cargar Render
                  </button>
                  <button className="px-6 py-3 border border-gray-600 hover:bg-gray-800 rounded-lg font-semibold transition-colors">
                    Ver en AR
                  </button>
                </div>
              </div>
            </div>

            {/* Controles de Vista */}
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'day' ? 'bg-white text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Día
              </button>
              <button
                onClick={() => setViewMode('night')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'night' ? 'bg-white text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Noche
              </button>
              <button
                onClick={() => setViewMode('sunset')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'sunset' ? 'bg-white text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                Atardecer
              </button>
            </div>

            {/* Controles de Navegación */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white">
                <RotateCcw className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Panel Lateral */}
          {!isFullscreen && (
            <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
              <div className="p-6">
                {/* Información del Render */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Detalles del Render</h3>
                  <p className="text-sm text-gray-600 mb-4">{renderData.description}</p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Estilo aplicado:</p>
                    <p className="font-semibold text-gray-900">{renderData.style}</p>
                  </div>
                </div>

                {/* Materiales Aplicados */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Materiales Personalizados</h4>
                  <div className="space-y-3">
                    {renderData.materials.map((material, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-6 h-6 rounded border border-gray-300"
                            style={{ backgroundColor: material.color }}
                          ></div>
                          <span className="text-sm text-gray-900">{material.name}</span>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          material.applied ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Características */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Características Incluidas</h4>
                  <div className="space-y-2">
                    {renderData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acciones */}
                <div className="space-y-3">
                  <button className="w-full bg-primary text-white py-3 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                    Solicitar Modificaciones
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Ver Variaciones
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Agendar Consulta con Arquitecto
                  </button>
                </div>

                {/* Información de Contacto */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h5 className="font-semibold text-blue-900 mb-2">¿Te gusta el resultado?</h5>
                  <p className="text-sm text-blue-700 mb-3">
                    Nuestro equipo puede crear variaciones adicionales o ajustar cualquier detalle.
                  </p>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Contactar Arquitecto →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Panel de Configuración */}
        {showSettings && (
          <div className="absolute top-20 right-4 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900 mb-4">Configuración de Vista</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calidad de Render</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                  <option>Alta</option>
                  <option>Media</option>
                  <option>Baja</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Iluminación</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                  <option>Natural</option>
                  <option>Artificial</option>
                  <option>Mixta</option>
                </select>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">Mostrar sombras</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-700">Mostrar texturas</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

