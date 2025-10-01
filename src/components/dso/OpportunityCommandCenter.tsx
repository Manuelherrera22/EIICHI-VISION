'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, TrendingUp, ArrowRight, CheckCircle, Star, AlertTriangle, Clock } from 'lucide-react';
import { OnboardingData, calculateDSOScores, getPersonalizedRecommendations } from '@/utils/dsoCalculator';
import InvestorDashboardV2 from './InvestorDashboardV2';
import MigrationDashboardV2 from './MigrationDashboardV2';
import LifestyleDashboardV2 from './LifestyleDashboardV2';

interface OpportunityCommandCenterProps {
  onboardingData: OnboardingData;
}

const OpportunityCommandCenter: React.FC<OpportunityCommandCenterProps> = ({ onboardingData }) => {
  // Calcular puntuaciones basadas en datos del onboarding
  const scores = calculateDSOScores(onboardingData);
  const recommendations = getPersonalizedRecommendations(scores);

  // Estado para controlar qué dashboard mostrar
  const [activeDashboard, setActiveDashboard] = React.useState<'overview' | 'investment' | 'migration' | 'lifestyle'>('overview');

  // Si hay un dashboard específico activo, mostrarlo
  if (activeDashboard === 'investment') {
    return (
      <div>
        <button
          onClick={() => setActiveDashboard('overview')}
          className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>Volver al Centro de Mando</span>
        </button>
        <InvestorDashboardV2 iviScore={scores.ivi} />
      </div>
    );
  }

  if (activeDashboard === 'migration') {
    return (
      <div>
        <button
          onClick={() => setActiveDashboard('overview')}
          className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>Volver al Centro de Mando</span>
        </button>
        <MigrationDashboardV2 ivmScore={scores.ivm} />
      </div>
    );
  }

  if (activeDashboard === 'lifestyle') {
    return (
      <div>
        <button
          onClick={() => setActiveDashboard('overview')}
          className="mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center space-x-2"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>Volver al Centro de Mando</span>
        </button>
        <LifestyleDashboardV2 iseScore={scores.ise} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/30 to-blue-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Dashboard de Sincronización de Objetivos (DSO)</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-primary mb-6">
              Tu Centro de Mando Inteligente
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Basado en tu perfil del onboarding, hemos calculado tus índices de viabilidad 
              y generado un plan personalizado para tu éxito.
            </p>
          </motion.div>
        </div>

        {/* Resumen de Puntuaciones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
              Tu Diagnóstico Personalizado
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* IVI Score */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{scores.ivi.percentage}%</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Índice de Viabilidad de Inversión</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {scores.ivi.percentage >= 80 ? 'Excelente potencial de inversión' : 
                   scores.ivi.percentage >= 60 ? 'Buen potencial con oportunidades de mejora' : 
                   'Áreas significativas de mejora identificadas'}
                </p>
                <button
                  onClick={() => setActiveDashboard('investment')}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Ver Dashboard
                </button>
              </div>

              {/* IVM Score */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{scores.ivm.percentage}%</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Índice de Viabilidad Migratoria</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {scores.ivm.percentage >= 80 ? 'Excelente preparación para migración' : 
                   scores.ivm.percentage >= 60 ? 'Buen progreso, acciones específicas recomendadas' : 
                   'Plan de acción intensivo requerido'}
                </p>
                <button
                  onClick={() => setActiveDashboard('migration')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver Dashboard
                </button>
              </div>

              {/* ISE Score */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{scores.ise.percentage}%</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Índice de Sincronización de Estilo de Vida</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {scores.ise.percentage >= 80 ? 'Excelente alineación con tu visión' : 
                   scores.ise.percentage >= 60 ? 'Buena base, refinamiento recomendado' : 
                   'Oportunidades significativas de personalización'}
                </p>
                <button
                  onClick={() => setActiveDashboard('lifestyle')}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Ver Dashboard
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recomendaciones Prioritarias */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
                Recomendaciones Prioritarias Basadas en tu Perfil
              </h2>
              
              <div className="space-y-6">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`p-6 rounded-2xl border-2 ${
                      rec.priority === 'high' 
                        ? 'bg-red-50 border-red-200' 
                        : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-full ${
                        rec.priority === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        {rec.priority === 'high' ? (
                          <AlertTriangle className="w-6 h-6 text-red-600" />
                        ) : (
                          <Clock className="w-6 h-6 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {rec.action}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            rec.priority === 'high' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {rec.priority === 'high' ? 'Prioridad Alta' : 'Prioridad Media'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">
                          Dashboard recomendado: <span className="font-semibold capitalize">{rec.dashboard}</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {rec.modules.map((module, moduleIndex) => (
                            <span
                              key={moduleIndex}
                              className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border"
                            >
                              {module}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => setActiveDashboard(rec.dashboard as any)}
                          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors flex items-center space-x-2"
                        >
                          <span>Acceder Ahora</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Concepto Central */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                La Innovación Clave: El Índice de Viabilidad de Proyecto (IVP)
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Es un porcentaje que se convierte en el elemento visual más importante del dashboard. 
                No es una nota de examen, es un diagnóstico que revela fortalezas y áreas donde 
                Tabiji House puede ayudar a mejorar.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Diagnóstico Inteligente</h3>
                <p className="text-gray-600 text-sm">La IA analiza tu perfil y genera un diagnóstico preciso de tu situación actual</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sincronización de Objetivos</h3>
                <p className="text-gray-600 text-sm">Cada acción te acerca más a tu objetivo final con precisión científica</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-200">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gamificación del Progreso</h3>
                <p className="text-gray-600 text-sm">El deseo de mejorar la puntuación se convierte en un motor de progreso</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sección Final */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Selecciona tu Dashboard Estratégico
          </h2>
          <p className="text-gray-600">
            Cada dashboard está diseñado para maximizar tu éxito en tu área específica
          </p>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCommandCenter;
