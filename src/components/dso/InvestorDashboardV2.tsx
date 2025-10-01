'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, BarChart3, TrendingUp, Home, Landmark, BookOpen, Zap, Users, ArrowRight, CheckCircle, Star, Calculator, Calendar, ExternalLink } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';
import { getHighPriorityActions } from '@/utils/dashboardActions';

interface InvestorDashboardV2Props {
  iviScore?: {
    percentage: number;
    strengths: string[];
    opportunities: string[];
    lastUpdated: Date;
    trend: 'up' | 'down' | 'stable';
    capitalAdequacy: number;
    riskTolerance: number;
    marketKnowledge: number;
    diversificationStrategy: number;
  };
}

const InvestorDashboardV2: React.FC<InvestorDashboardV2Props> = ({ iviScore }) => {
  const { openModal } = useModal();
  const highPriorityActions = getHighPriorityActions('investment');

  // Datos por defecto si no se proporcionan
  const defaultScore = {
    percentage: 75,
    strengths: [
      'Capital inicial adecuado para tus objetivos',
      'Tolerancia al riesgo claramente definida'
    ],
    opportunities: [
      'Estrategia de diversificación por definir',
      'Conocimiento del mercado inmobiliario de Gunma: Básico'
    ],
    lastUpdated: new Date(),
    trend: 'up' as const,
    capitalAdequacy: 80,
    riskTolerance: 70,
    marketKnowledge: 60,
    diversificationStrategy: 50
  };

  const score = iviScore || defaultScore;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/30 to-emerald-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full mb-6">
              <Target className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">Centro de Mando del Inversionista</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
              Tu Estrategia de Inversión
              <br />
              <span className="text-green-600">Sincronizada</span>
            </h1>
          </motion.div>
        </div>

        {/* Widget Central IVI */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header del Widget */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Índice de Viabilidad de Inversión (IVI)</h2>
                  <p className="text-green-100">Tu puntuación de sincronización con el éxito en inversiones</p>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-bold">{score.percentage}%</div>
                  <div className="text-green-100 text-sm flex items-center justify-end mt-2">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>Tendencia Positiva</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido del Widget */}
            <div className="p-8">
              {/* Puntos Fuertes */}
              {score.strengths.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    Puntos Fuertes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {score.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Áreas de Oportunidad */}
              {score.opportunities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                    Áreas de Oportunidad para Mejorar tu IVI
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {score.opportunities.map((opportunity, index) => (
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
              Módulos Estratégicos para Elevar tu IVI
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Acciones personalizadas para fortalecer tu perfil de inversión y maximizar tu potencial
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Módulo 1: Eleva tu Estrategia */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Eleva tu Estrategia</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Accede a informes de mercado generados por IA y análisis de tendencias para definir tu estrategia de diversificación
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Informes de Mercado IA</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Análisis de Tendencias (Kusatsu)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Marketplace de Franquicias</span>
                </div>
              </div>

              <button 
                onClick={() => openModal('open-investment-calculator')}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Calculadora de Inversión</span>
              </button>
            </motion.div>

            {/* Módulo 2: Simulador de Mercado IA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Simulador de Mercado IA</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Juega con variables en nuestra calculadora de ROI para entender el mercado japonés y aumentar tu confianza
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Calculadora de ROI Avanzada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Proyecciones de Monte Carlo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Escenarios Económicos</span>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = '/projects'}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Ver Propiedades</span>
              </button>
            </motion.div>

            {/* Módulo 3: Portafolio de Oportunidades Activas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Portafolio de Oportunidades Activas</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explora propiedades con un "Índice de Compatibilidad" personalizado basado en tu perfil de inversor
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Propiedades con IA Match</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Filtros Avanzados</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Alertas de Nuevas Oportunidades</span>
                </div>
              </div>

              <button 
                onClick={() => window.open('https://calendly.com/tabiji-house/investment-consultation', '_blank')}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consultoría</span>
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
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para Optimizar tu IVI?
            </h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Cada módulo está diseñado para aumentar tu puntuación de viabilidad de inversión. 
              La IA trabaja activamente para asegurar tu éxito y tu total confianza.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Claridad Inmediata</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Gamificación Inteligente</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">Confianza Absoluta</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvestorDashboardV2;
