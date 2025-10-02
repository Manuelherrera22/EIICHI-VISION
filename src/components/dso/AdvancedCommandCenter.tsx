'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Users, 
  User, 
  TrendingUp, 
  ArrowRight, 
  BookOpen, 
  Building, 
  DollarSign,
  Calendar,
  CheckCircle,
  MessageCircle,
  Plus,
  Search,
  Filter,
  Heart,
  Target,
  Zap,
  Clock,
  Star,
  Home,
  Coffee,
  ShoppingBag
} from 'lucide-react';
import { OnboardingData, calculateDSOScores } from '@/utils/dsoCalculator';

interface AdvancedCommandCenterProps {
  onboardingData: OnboardingData;
  userName?: string;
  userEmail?: string;
}

const AdvancedCommandCenter: React.FC<AdvancedCommandCenterProps> = ({ 
  onboardingData, 
  userName = "Manuel Felipe Herrera",
  userEmail = "albumcova123@gmail.com"
}) => {
  const scores = calculateDSOScores(onboardingData);
  const [simulatedDays, setSimulatedDays] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [lastActivity] = useState(new Date('2025-09-30T13:14:11'));

  const nextSteps = [
    {
      title: "Revisar Análisis 3D",
      description: "Casa Tradicional Kusatsu - Análisis completo disponible",
      dueDate: "Hoy",
      priority: "high"
    },
    {
      title: "Calcular ROI Combinado",
      description: "Simular sinergia con franquicia de café",
      dueDate: "Mañana",
      priority: "medium"
    },
    {
      title: "Reunión con Analista",
      description: "Sesión con María Tanaka sobre nuevas oportunidades",
      dueDate: "Viernes",
      priority: "high"
    }
  ];

  const weeklyPulse = {
    opportunity: {
      title: "Casa Tradicional Renovada en Tsumagoi",
      description: "Esta semana analizamos una propiedad con potencial de ROI del 12% gracias a la nueva línea de transporte que conectará la región con Tokio en 2026.",
      location: "Tsumagoi, Gunma",
      roi: "12%"
    },
    wisdom: {
      quote: "La diversificación no es solo entre activos, sino entre geografías.",
      description: "Japón ofrece una estabilidad única en el panorama global actual. Mientras otros mercados fluctúan, el mercado inmobiliario japonés mantiene una tendencia constante de crecimiento."
    }
  };

  const portfolioProperties = [
    {
      stage: "En Análisis (3D/AR)",
      properties: [
        {
          name: "Casa Tradicional Kusatsu",
          score: 85,
          location: "Kusatsu, Gunma",
          price: "¥45.0M",
          analysts: ["María Tanaka", "Chat"]
        }
      ]
    },
    {
      stage: "Simulación ROI",
      properties: [
        {
          name: "Apartamento Moderno Takasaki",
          score: 72,
          location: "Takasaki, Gunma",
          price: "¥32.0M",
          analysts: ["Carlos Sato", "Chat"]
        }
      ]
    }
  ];

  const businessOpportunities = [
    {
      type: "Franquicia",
      title: "Franquicia de Café Artesanal",
      description: "Café especializado en el centro de Kusatsu",
      investment: "¥15.0M",
      roi: "18%",
      category: "Café"
    },
    {
      type: "Retail",
      title: "Tienda de Artesanías Locales",
      description: "Venta de productos tradicionales japoneses",
      investment: "¥8.0M",
      roi: "22%",
      category: "Artesanías"
    }
  ];

  const financialMetrics = {
    totalBudget: "¥150M",
    averageROI: "18.5%",
    monthlyFlow: "¥2.3M"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TH</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Centro de Mando de Oportunidades</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">1</span>
            </div>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <Users className="w-5 h-5" />
              <span className="text-sm">Mi Equipo</span>
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">
              Buenos días, {userName}
            </h2>
            <p className="text-white/90 text-lg">
              Aquí está el resumen de tu Proyecto de Inversión. Tu experiencia personalizada está lista. 
              Explora los módulos especializados para tu objetivo.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Simulador de Actividad */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Simulador de Actividad</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Prueba el sistema de re-engagement</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estado Real:</span>
                  <span className={`font-medium ${isActive ? 'text-green-600' : 'text-red-600'}`}>
                    {isActive ? 'Usuario activo' : 'Usuario inactivo'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Días Simulados:</span>
                  <span className="font-medium">{simulatedDays} días</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Última actividad real:</span>
                  <span className="font-medium">{lastActivity.toLocaleDateString('es-ES')}, {lastActivity.toLocaleTimeString('es-ES')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Días de inactividad real:</span>
                  <span className="font-medium">0</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setSimulatedDays(30)}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  Simular 30 días de inactividad
                </button>
                <button
                  onClick={() => setIsActive(true)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Marcar como Activo
                </button>
                <button
                  onClick={() => {setSimulatedDays(0); setIsActive(true);}}
                  className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Resetear Simulación
                </button>
              </div>
            </motion.div>

            {/* Perfil del Usuario */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Perfil del Usuario</h3>
              
              <div className="space-y-3 mb-4">
                <div>
                  <span className="text-gray-600 text-sm">Objetivo:</span>
                  <span className="ml-2 font-medium text-primary">Invertir</span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Nombre:</span>
                  <span className="ml-2 font-medium">{userName}</span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">Email:</span>
                  <span className="ml-2 font-medium">{userEmail}</span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-900 mb-2">Instrucciones:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Usa 'Simular inactividad' para probar el modelo de re-engagement</li>
                  <li>• 'Marcar como Activo' resetea el contador de inactividad</li>
                  <li>• El sistema detecta automáticamente la actividad real del usuario</li>
                  <li>• Después de 30 días de inactividad se activa el re-engagement</li>
                </ul>
              </div>
            </motion.div>

            {/* Próximos Pasos Clave */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                <ArrowRight className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Próximos Pasos Clave</h3>
              </div>
              
              <div className="space-y-4">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-4 h-4 rounded-full mt-1 ${
                      step.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      <span className="text-xs text-gray-500">Vence: {step.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Ver Todos los Pasos
              </button>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tu Pulso Semanal */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Heart className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Tu Pulso Semanal</h3>
                </div>
                <span className="text-sm text-gray-500">Esta semana</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-6">Contenido personalizado para tu viaje</p>
              
              <div className="space-y-6">
                {/* La Oportunidad de la Semana */}
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <h4 className="font-medium text-gray-900">La Oportunidad de la Semana</h4>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <h5 className="font-semibold text-gray-900 mb-2">{weeklyPulse.opportunity.title}</h5>
                    <p className="text-sm text-gray-600 mb-3">{weeklyPulse.opportunity.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{weeklyPulse.opportunity.location} ROI: {weeklyPulse.opportunity.roi}</span>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Ver Análisis Completo
                      </button>
                    </div>
                  </div>
                </div>

                {/* Píldora de Sabiduría Financiera */}
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Píldora de Sabiduría Financiera</h4>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <blockquote className="text-sm font-medium text-gray-900 mb-2">
                      "{weeklyPulse.wisdom.quote}"
                    </blockquote>
                    <p className="text-sm text-gray-600 mb-3">{weeklyPulse.wisdom.description}</p>
                    <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Leer más en el Journal
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Contenido personalizado basado en tu perfil y actividad</span>
                  <a href="#" className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                    Configurar Preferencias
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Mi Portafolio de Oportunidades */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Building className="w-6 h-6 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Mi Portafolio de Oportunidades</h3>
                </div>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Agregar Propiedad</span>
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mb-6">Pipeline visual de propiedades en análisis</p>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-gray-100 rounded-lg p-3 mb-2">
                    <span className="text-sm font-medium text-gray-600">Explorando</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 rounded-lg p-3 mb-2">
                    <span className="text-sm font-medium text-blue-600">En Análisis (3D/AR)</span>
                  </div>
                  {portfolioProperties[0].properties.map((property, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 mb-2">
                      <div className="text-sm font-medium text-gray-900">{property.name}</div>
                      <div className="text-xs text-gray-600">{property.score}</div>
                      <div className="text-xs text-gray-600">{property.location}</div>
                      <div className="text-sm font-semibold text-gray-900">{property.price}</div>
                      <div className="flex justify-between mt-2">
                        <div className="flex space-x-1">
                          <input type="checkbox" className="rounded" />
                          <span className="text-xs text-gray-600">{property.analysts[0]}</span>
                        </div>
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <div className="bg-yellow-100 rounded-lg p-3 mb-2">
                    <span className="text-sm font-medium text-yellow-600">Simulación ROI</span>
                  </div>
                  {portfolioProperties[1].properties.map((property, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 mb-2">
                      <div className="text-sm font-medium text-gray-900">{property.name}</div>
                      <div className="text-xs text-gray-600">{property.score}</div>
                      <div className="text-xs text-gray-600">{property.location}</div>
                      <div className="text-sm font-semibold text-gray-900">{property.price}</div>
                      <div className="flex justify-between mt-2">
                        <div className="flex space-x-1">
                          <input type="checkbox" className="rounded" />
                          <span className="text-xs text-gray-600">{property.analysts[0]}</span>
                        </div>
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-lg p-3 mb-2">
                    <span className="text-sm font-medium text-green-600">Listo para Oferta</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Marketplace de Negocios */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Building className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Marketplace de Negocios</h3>
                </div>
                <div className="flex space-x-2">
                  <Search className="w-5 h-5 text-gray-400" />
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-6">Oportunidades de negocio y franquicias</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {businessOpportunities.map((opportunity, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                        {opportunity.type}
                      </span>
                      <span className="text-xs text-gray-500">{opportunity.category}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{opportunity.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{opportunity.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Inversión:</span>
                        <span className="font-semibold">{opportunity.investment}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">ROI Proyectado:</span>
                        <span className="font-semibold text-green-600">{opportunity.roi}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                        Ver Detalles
                      </button>
                      <button className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                        Simular Sinergia
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Centro Financiero */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Centro Financiero</h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-6">Presupuesto y proyecciones de flujo de caja</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">{financialMetrics.totalBudget}</div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Presupuesto Total</div>
                  <div className="text-xs text-gray-500">Disponible para inversión</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{financialMetrics.averageROI}</div>
                  <div className="text-sm font-medium text-gray-600 mb-1">ROI Promedio</div>
                  <div className="text-xs text-gray-500">Retorno anual proyectado</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{financialMetrics.monthlyFlow}</div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Flujo Mensual</div>
                  <div className="text-xs text-gray-500">Ingresos por alquileres</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCommandCenter;




