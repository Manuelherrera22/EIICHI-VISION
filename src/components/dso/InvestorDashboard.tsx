'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  TrendingUp, 
  BarChart3, 
  MapPin, 
  Calculator,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import IVPWidget from './IVPWidget';
import { IVI, StrategicModule, calculateIVI } from '@/types/dso';

const InvestorDashboard: React.FC = () => {
  const [iviScore, setIviScore] = useState<IVI | null>(null);
  const [strategicModules, setStrategicModules] = useState<StrategicModule[]>([]);

  useEffect(() => {
    // Simular datos del usuario (en producción vendrían del backend)
    const userData = {
      capitalAdequacy: 75,
      riskTolerance: 60,
      marketKnowledge: 45,
      diversificationStrategy: 30
    };

    const calculatedIVI = calculateIVI(userData);
    setIviScore(calculatedIVI);

    // Módulos estratégicos basados en las oportunidades detectadas
    const modules: StrategicModule[] = [
      {
        id: 'elevate-strategy',
        title: 'Eleva tu Estrategia',
        description: 'Herramientas avanzadas para definir y optimizar tu estrategia de inversión',
        priority: 'high',
        isActive: calculatedIVI.opportunities.some(opp => opp.includes('diversificación')),
        impactOnScore: 25,
        category: 'investment',
        technologies: ['Machine Learning', 'Análisis de Mercado', 'IA Predictiva'],
        actions: [
          {
            id: 'market-analysis',
            title: 'Análisis de Mercado IA',
            description: 'Informes de mercado generados por IA para Gunma',
            completed: false,
            impact: 10
          },
          {
            id: 'franchise-marketplace',
            title: 'Marketplace de Franquicias',
            description: 'Explora oportunidades de diversificación',
            completed: false,
            impact: 15
          }
        ]
      },
      {
        id: 'market-simulator',
        title: 'Simulador de Mercado IA',
        description: 'Aprende cómo funciona el mercado japonés con simulaciones interactivas',
        priority: 'high',
        isActive: calculatedIVI.opportunities.some(opp => opp.includes('conocimiento')),
        impactOnScore: 20,
        category: 'investment',
        technologies: ['Simulaciones Monte Carlo', 'Machine Learning', 'Análisis de Riesgo'],
        actions: [
          {
            id: 'roi-calculator',
            title: 'Calculadora de ROI Avanzada',
            description: 'Simula múltiples escenarios de rentabilidad',
            completed: false,
            impact: 12
          },
          {
            id: 'market-education',
            title: 'Academia de Mercado',
            description: 'Curso interactivo sobre el mercado inmobiliario japonés',
            completed: false,
            impact: 8
          }
        ]
      },
      {
        id: 'portfolio-opportunities',
        title: 'Portafolio de Oportunidades Activas',
        description: 'Propiedades seleccionadas con Índice de Compatibilidad personalizado',
        priority: 'medium',
        isActive: true,
        impactOnScore: 15,
        category: 'investment',
        technologies: ['Algoritmos de Recomendación', 'Análisis de Compatibilidad'],
        actions: [
          {
            id: 'property-matching',
            title: 'Motor de Recomendación',
            description: 'Propiedades compatibles con tu perfil de inversor',
            completed: false,
            impact: 15
          }
        ]
      }
    ];

    setStrategicModules(modules);
  }, []);

  if (!iviScore) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">Centro de Mando del Inversionista</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
              Tu Dashboard de Inversión Inteligente
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sincroniza tu estado actual con tu objetivo final usando la IA como guía
            </p>
          </motion.div>
        </div>

        {/* IVI Widget Principal */}
        <div className="mb-12">
          <IVPWidget
            score={iviScore}
            title="Índice de Viabilidad de Inversión (IVI)"
            subtitle="Tu puntuación de sincronización con el éxito en inversiones japonesas"
          />
        </div>

        {/* Módulos Estratégicos */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Módulos Estratégicos
            </h2>
            <p className="text-gray-600">
              Organizados para AUMENTAR tu IVI y acercarte a tu objetivo
            </p>
          </div>

          {strategicModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`bg-white rounded-2xl shadow-lg border-2 ${
                module.isActive ? 'border-primary/20 shadow-primary/10' : 'border-gray-200'
              } overflow-hidden`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${
                      module.priority === 'high' ? 'bg-red-100 text-red-600' :
                      module.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {module.priority === 'high' ? <Star className="w-6 h-6" /> :
                       module.priority === 'medium' ? <Clock className="w-6 h-6" /> :
                       <CheckCircle className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-1">
                        Módulo {index + 1}: {module.title}
                      </h3>
                      <p className="text-gray-600">{module.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      +{module.impactOnScore}%
                    </div>
                    <div className="text-sm text-gray-500">Impacto en IVI</div>
                  </div>
                </div>

                {/* Tecnologías */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Tecnologías Avanzadas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Acciones */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Acciones Disponibles:</h4>
                  <div className="space-y-3">
                    {module.actions.map((action) => (
                      <div
                        key={action.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            action.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                          }`}>
                            {action.completed && <CheckCircle className="w-4 h-4 text-white" />}
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800">{action.title}</h5>
                            <p className="text-sm text-gray-600">{action.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-green-600 font-medium">
                            +{action.impact}%
                          </span>
                          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-1">
                            <span>Iniciar</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Función del módulo */}
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-xl">
                  <h4 className="font-semibold text-primary mb-2">Función:</h4>
                  <p className="text-gray-700">
                    {module.isActive 
                      ? `Este módulo se activa porque el IVI detectó oportunidades específicas. ${module.description}`
                      : `Módulo disponible para optimizar tu estrategia de inversión.`
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para Maximizar tu IVI?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Cada acción que tomes en estos módulos aumentará tu puntuación y te acercará a tu objetivo de inversión en Japón.
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Comenzar Journey de Inversión
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InvestorDashboard;






