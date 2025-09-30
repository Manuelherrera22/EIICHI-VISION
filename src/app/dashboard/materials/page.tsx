'use client'

import React, { useState } from 'react'
import Layout from '@/components/Layout'
import { ArrowLeft, Search, Filter, Heart, Eye, Download, Palette, Leaf, Star } from 'lucide-react'
import Link from 'next/link'

export default function MaterialsCatalogPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])

  const categories = [
    { id: 'all', name: 'Todos', count: 24 },
    { id: 'natural', name: 'Naturales', count: 12 },
    { id: 'sustainable', name: 'Sostenibles', count: 8 },
    { id: 'traditional', name: 'Tradicionales', count: 6 },
    { id: 'modern', name: 'Modernos', count: 4 }
  ]

  const materials = [
    {
      id: 'cypress-wood',
      name: 'Madera de Ciprés Japonés',
      category: 'natural',
      color: '#8B4513',
      texture: '/textures/cypress.jpg',
      price: 15000,
      sustainability: 'A+',
      description: 'Madera tradicional japonesa con propiedades naturales antibacterianas y aromáticas.',
      features: ['Antibacteriano', 'Aromático', 'Duradero', 'Resistente a humedad'],
      applications: ['Pisos', 'Paredes', 'Muebles', 'Baños'],
      isNew: true
    },
    {
      id: 'volcanic-stone',
      name: 'Piedra Volcánica Kusatsu',
      category: 'natural',
      color: '#696969',
      texture: '/textures/volcanic-stone.jpg',
      price: 22000,
      sustainability: 'A+',
      description: 'Piedra volcánica local con propiedades termales naturales.',
      features: ['Termal', 'Resistente', 'Natural', 'Local'],
      applications: ['Baños', 'Paredes exteriores', 'Jardines', 'Pisos'],
      isNew: false
    },
    {
      id: 'washi-paper',
      name: 'Papel Washi Tradicional',
      category: 'traditional',
      color: '#F5F5DC',
      texture: '/textures/washi.jpg',
      price: 8000,
      sustainability: 'A',
      description: 'Papel tradicional japonés hecho a mano con fibras naturales.',
      features: ['Transparente', 'Resistente', 'Tradicional', 'Decorativo'],
      applications: ['Pantallas', 'Decoración', 'Iluminación', 'Paredes'],
      isNew: true
    },
    {
      id: 'bamboo-flooring',
      name: 'Piso de Bambú Sostenible',
      category: 'sustainable',
      color: '#DAA520',
      texture: '/textures/bamboo.jpg',
      price: 12000,
      sustainability: 'A+',
      description: 'Piso de bambú de rápido crecimiento con certificación sostenible.',
      features: ['Sostenible', 'Rápido crecimiento', 'Duradero', 'Renovable'],
      applications: ['Pisos', 'Paredes', 'Muebles', 'Decoración'],
      isNew: false
    },
    {
      id: 'recycled-glass',
      name: 'Vidrio Reciclado',
      category: 'sustainable',
      color: '#87CEEB',
      texture: '/textures/recycled-glass.jpg',
      price: 18000,
      sustainability: 'A+',
      description: 'Vidrio reciclado con acabado mate para privacidad.',
      features: ['Reciclado', 'Privacidad', 'Moderno', 'Transparente'],
      applications: ['Paredes', 'Divisiones', 'Baños', 'Fachadas'],
      isNew: true
    },
    {
      id: 'clay-plaster',
      name: 'Estuco de Arcilla Natural',
      category: 'natural',
      color: '#CD853F',
      texture: '/textures/clay-plaster.jpg',
      price: 9500,
      sustainability: 'A+',
      description: 'Estuco natural de arcilla con propiedades reguladoras de humedad.',
      features: ['Regulador humedad', 'Natural', 'Respirable', 'Antialérgico'],
      applications: ['Paredes interiores', 'Baños', 'Dormitorios', 'Salas'],
      isNew: false
    }
  ]

  const filteredMaterials = materials.filter(material => {
    const matchesCategory = activeCategory === 'all' || material.category === activeCategory
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFavorite = (materialId: string) => {
    setFavorites(prev => 
      prev.includes(materialId) 
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    )
  }

  const getSustainabilityColor = (rating: string) => {
    switch (rating) {
      case 'A+': return 'text-green-600 bg-green-100'
      case 'A': return 'text-blue-600 bg-blue-100'
      case 'B': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
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
                <h1 className="text-2xl font-bold text-gray-900">Catálogo de Materiales</h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <Heart className="w-4 h-4" />
                  <span>Favoritos ({favorites.length})</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Descargar Catálogo</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Barra de Búsqueda y Filtros */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Búsqueda */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Buscar materiales..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filtros de Categoría */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid de Materiales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMaterials.map((material) => (
              <div key={material.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {/* Imagen del Material */}
                <div className="aspect-video bg-gray-200 relative">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <Palette className="w-16 h-16 text-gray-400" />
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex space-x-2">
                    {material.isNew && (
                      <span className="px-2 py-1 text-xs font-medium bg-green-500 text-white rounded-full">
                        Nuevo
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSustainabilityColor(material.sustainability)}`}>
                      {material.sustainability}
                    </span>
                  </div>

                  {/* Botón de Favorito */}
                  <button
                    onClick={() => toggleFavorite(material.id)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                      favorites.includes(material.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {/* Información del Material */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{material.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Leaf className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{material.sustainability}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{material.description}</p>

                  {/* Color y Precio */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-6 h-6 rounded border border-gray-300"
                        style={{ backgroundColor: material.color }}
                      ></div>
                      <span className="text-sm text-gray-600">Color</span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">¥{material.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">por m²</p>
                    </div>
                  </div>

                  {/* Características */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Características</h4>
                    <div className="flex flex-wrap gap-1">
                      {material.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {feature}
                        </span>
                      ))}
                      {material.features.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          +{material.features.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Aplicaciones */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Aplicaciones</h4>
                    <div className="flex flex-wrap gap-1">
                      {material.applications.map((app, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Acciones */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      Ver Detalles
                    </button>
                    <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Información Adicional */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Materiales Sostenibles</h3>
                <p className="text-gray-600 mb-4">
                  Todos nuestros materiales están certificados por su sostenibilidad y origen ético. 
                  Trabajamos directamente con proveedores locales para garantizar la calidad y reducir la huella de carbono.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Ver Certificaciones
                  </button>
                  <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                    Conocer Proveedores
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

