'use client'

import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { ArrowLeft, TrendingUp, MapPin, Calendar, DollarSign, Home, BarChart3, Eye, Heart, Share, Download } from 'lucide-react'
import Link from 'next/link'

export default function PropertyAnalysisPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'gallery' | 'location'>('overview')

  const property = {
    id: 'kusatsu-house-001',
    title: 'Casa Tradicional Kusatsu',
    location: 'Kusatsu, Gunma, Japón',
    price: 45000000,
    area: 120,
    year: 1985,
    roi: 12.5,
    monthlyIncome: 450000,
    description: 'Casa tradicional japonesa completamente renovada con baños termales privados y jardín zen. Perfecta para inversión turística o residencia de lujo.',
    features: [
      'Baños termales privados',
      'Jardín zen tradicional',
      'Cocina moderna integrada',
      'Sistema de calefacción renovado',
      'Estacionamiento para 2 autos'
    ],
    images: [
      '/images/kusatsu-house-1.jpg',
      '/images/kusatsu-house-2.jpg',
      '/images/kusatsu-house-3.jpg'
    ],
    analysis: {
      marketValue: 45000000,
      rentalPotential: 450000,
      occupancyRate: 85,
      maintenanceCosts: 50000,
      netROI: 12.5,
      paybackPeriod: '8 años'
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
                <h1 className="text-2xl font-bold text-gray-900">{property.title}</h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>Guardar</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <Share className="w-4 h-4" />
                  <span>Compartir</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Descargar Análisis</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Información Principal */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Imagen Principal */}
              <div className="space-y-4">
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <Eye className="w-16 h-16 text-gray-400" />
                  </div>
                </div>
                
                {/* Miniaturas */}
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Información */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h2>
                  <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <MapPin className="w-5 h-5" />
                    <span>{property.location}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{property.description}</p>
                </div>

                {/* Métricas Principales */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">ROI Estimado</span>
                    </div>
                    <p className="text-2xl font-bold text-green-900">{property.roi}%</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Ingreso Mensual</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">¥{property.monthlyIncome.toLocaleString()}</p>
                  </div>
                </div>

                {/* Precio */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Precio de Venta</p>
                      <p className="text-3xl font-bold text-gray-900">¥{property.price.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Área</p>
                      <p className="text-xl font-semibold text-gray-900">{property.area}m²</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs de Navegación */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Resumen', icon: Home },
                  { id: 'analysis', label: 'Análisis Financiero', icon: BarChart3 },
                  { id: 'gallery', label: 'Galería', icon: Eye },
                  { id: 'location', label: 'Ubicación', icon: MapPin }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Contenido de Tabs */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Características Principales</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'analysis' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Análisis Financiero Detallado</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Valor de Mercado</p>
                      <p className="text-xl font-bold text-gray-900">¥{property.analysis.marketValue.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Potencial de Renta</p>
                      <p className="text-xl font-bold text-gray-900">¥{property.analysis.rentalPotential.toLocaleString()}/mes</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Tasa de Ocupación</p>
                      <p className="text-xl font-bold text-gray-900">{property.analysis.occupancyRate}%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Costos de Mantenimiento</p>
                      <p className="text-xl font-bold text-gray-900">¥{property.analysis.maintenanceCosts.toLocaleString()}/mes</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">ROI Neto</p>
                      <p className="text-xl font-bold text-gray-900">{property.analysis.netROI}%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Período de Recuperación</p>
                      <p className="text-xl font-bold text-gray-900">{property.analysis.paybackPeriod}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Galería de Imágenes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <Eye className="w-12 h-12 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'location' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Ubicación y Entorno</h3>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <MapPin className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Cercanías</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Estación de Kusatsu: 5 min caminando</li>
                        <li>• Onsen Yubatake: 3 min caminando</li>
                        <li>• Supermercado: 8 min caminando</li>
                        <li>• Hospital: 15 min en auto</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Atracciones</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Parque Nacional Joshin'etsu: 20 min</li>
                        <li>• Monte Shirane: 30 min</li>
                        <li>• Ski Resort: 25 min</li>
                        <li>• Tokio: 2.5 horas en tren</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">¿Interesado en esta propiedad?</h3>
            <p className="text-lg mb-6 opacity-90">
              Agenda una consulta personalizada con nuestro equipo de expertos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Agendar Consulta
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Solicitar Más Información
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

