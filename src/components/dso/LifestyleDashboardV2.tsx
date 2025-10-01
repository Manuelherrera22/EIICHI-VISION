'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Home, Palette, Calendar, CheckCircle, ArrowRight, Sparkles, BookOpen, Star, Target, Search, Users, ExternalLink } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';

interface LifestyleDashboardV2Props {
  iseScore?: {
    percentage: number;
    strengths: string[];
    opportunities: string[];
    lastUpdated: Date;
    trend: 'up' | 'down' | 'stable';
    designPreference: number;
    renovationBudget: number;
    propertySelection: number;
    culturalExperiences: number;
  };
}

const LifestyleDashboardV2: React.FC<LifestyleDashboardV2Props> = ({ iseScore }) => {
  const { openModal } = useModal();

  // Datos por defecto si no se proporcionan
  const defaultScore = {
    percentage: 85,
    strengths: [
      'Preferencia de diseño muy clara (Wabi-Sabi)',
      'Presupuesto de renovación definido'
    ],
    opportunities: [
      'Propiedad ideal aún por seleccionar',
      'Experiencias culturales clave no definidas'
    ],
    lastUpdated: new Date(),
    trend: 'up' as const,
    designPreference: 90,
    renovationBudget: 80,
    propertySelection: 40,
    culturalExperiences: 60
  };

  const score = iseScore || defaultScore;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 to-pink-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700 font-medium">El Taller de tu Santuario</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
              Tu Santuario Japonés
              <br />
              <span className="text-purple-600">Personalizado</span>
            </h1>
          </motion.div>
        </div>

        {/* Widget Central ISE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header del Widget */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Índice de Sincronización de Estilo de Vida (ISE)</h2>
                  <p className="text-purple-100">Tu puntuación de alineación con tu visión de santuario</p>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-bold">{iseScore.percentage}%</div>
                  <div className="text-purple-100 text-sm flex items-center justify-end mt-2">
                    <Target className="w-4 h-4 mr-1" />
                    <span>Excelente Progreso</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido del Widget */}
            <div className="p-8">
              {/* Puntos Fuertes */}
              {iseScore.strengths.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    Puntos Fuertes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {iseScore.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Áreas de Oportunidad */}
              {iseScore.opportunities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                    Áreas de Oportunidad para llegar al 100%
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {iseScore.opportunities.map((opportunity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                        <Star className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{opportunity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Módulos Estratégicos */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Módulos Estratégicos para Aumentar tu ISE
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Herramientas y recursos para crear el santuario japonés de tus sueños
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Módulo 1: Descubre tu Propiedad Ideal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Descubre tu Propiedad Ideal</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Nuestro motor de recomendación te presenta las mejores casas que se sincronizan con tu perfil
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Motor de Recomendación IA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Top 3 Propiedades Compatibles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Aprendizaje de Preferencias</span>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = '/projects'}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Buscar Propiedades</span>
              </button>
            </motion.div>

            {/* Módulo 2: Diseña tu Espacio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Diseña tu Espacio</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Accede a la Mesa de Diseño 3D y gamifica el proceso creativo de tu futuro hogar
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Mesa de Diseño 3D Interactiva</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Gamificación del Diseño</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Renderizado Fotorrealista</span>
                </div>
              </div>

              <button 
                onClick={() => openModal('open-design-consultation')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Palette className="w-4 h-4" />
                <span>Consultoría de Diseño</span>
              </button>
            </motion.div>

            {/* Módulo 3: Crea tu Itinerario de Vida */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Crea tu Itinerario de Vida</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Define tus experiencias culturales y actividades para completar tu visión de estilo de vida
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Concierge de Experiencias</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Agenda Inteligente (Clima Real)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Recomendaciones Personalizadas</span>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = '/services'}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Heart className="w-4 h-4" />
                <span>Experiencias Culturales</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para Perfeccionar tu Santuario?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Cada módulo está diseñado para aumentar tu puntuación de sincronización de estilo de vida. 
              La IA trabaja activamente para crear el santuario japonés perfecto para ti.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Diseño Personalizado</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Experiencias Únicas</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Santuario Perfecto</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LifestyleDashboardV2;
