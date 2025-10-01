'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  FileText, 
  Home, 
  Clock,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Star,
  MapPin,
  Calendar
} from 'lucide-react';
import IVPWidget from './IVPWidget';
import { IVM, StrategicModule, calculateIVM } from '@/types/dso';

const MigrationDashboard: React.FC = () => {
  const [ivmScore, setIvmScore] = useState<IVM | null>(null);
  const [strategicModules, setStrategicModules] = useState<StrategicModule[]>([]);

  useEffect(() => {
    // Simular datos del usuario (en producción vendrían del backend)
    const userData = {
      documentationComplete: 40, // 3 de 7 documentos
      professionDemand: 85,
      educationLevel: 90,
      accommodationPlan: 25
    };

    const calculatedIVM = calculateIVM(userData);
    setIvmScore(calculatedIVM);

    // Módulos estratégicos basados en las oportunidades detectadas
    const modules: StrategicModule[] = [
      {
        id: 'accelerate-documentation',
        title: 'Acelera tu Documentación',
        description: 'Gestor de Documentos Inteligente con validación IA y feedback instantáneo',
        priority: 'high',
        isActive: calculatedIVM.opportunities.some(opp => opp.includes('Documentación')),
        impactOnScore: 30,
        category: 'migration',
        technologies: ['OCR con IA', 'Validación Automática', 'Machine Learning'],
        actions: [
          {
            id: 'document-upload',
            title: 'Subir Documentos',
            description: 'Carga tus documentos y recibe feedback instantáneo de la IA',
            completed: false,
            impact: 15
          },
          {
            id: 'document-validation',
            title: 'Validación Automática',
            description: 'La IA verifica si tu título universitario es reconocido y necesita apostilla',
            completed: false,
            impact: 10
          },
          {
            id: 'documentation-checklist',
            title: 'Checklist Inteligente',
            description: 'Lista personalizada de documentos que faltan y por qué son importantes',
            completed: false,
            impact: 5
          }
        ]
      },
      {
        id: 'define-home-base',
        title: 'Define tu Hogar Base',
        description: 'Conecta directamente con la búsqueda de propiedades como paso crítico para tu visa',
        priority: 'high',
        isActive: calculatedIVM.opportunities.some(opp => opp.includes('alojamiento')),
        impactOnScore: 25,
        category: 'migration',
        technologies: ['Sistema 3D/AR', 'Integración con Visas', 'Plan de Negocios'],
        actions: [
          {
            id: 'property-search',
            title: 'Búsqueda de Propiedades',
            description: 'Encuentra tu futuro hogar en Japón',
            completed: false,
            impact: 15
          },
          {
            id: 'design-future-home',
            title: 'Diseña tu Hogar',
            description: 'Usa el sistema 3D/AR para diseñar tu futuro hogar',
            completed: false,
            impact: 10
          },
          {
            id: 'business-plan',
            title: 'Plan de Negocios',
            description: 'Incluye tu plan de alojamiento en tu solicitud de visa',
            completed: false,
            impact: 10
          }
        ]
      },
      {
        id: 'migration-timeline',
        title: 'Línea de Tiempo Migratoria',
        description: 'Tracker visual que muestra cómo cada acción impacta positivamente tu IVM',
        priority: 'medium',
        isActive: true,
        impactOnScore: 15,
        category: 'migration',
        technologies: ['Visualización Interactiva', 'Tracking de Progreso'],
        actions: [
          {
            id: 'progress-tracking',
            title: 'Seguimiento Visual',
            description: 'Ve cómo cada acción aumenta tu IVM',
            completed: false,
            impact: 8
          },
          {
            id: 'milestone-celebration',
            title: 'Celebra Hitos',
            description: 'Reconoce tus logros en el proceso migratorio',
            completed: false,
            impact: 7
          }
        ]
      }
    ];

    setStrategicModules(modules);
  }, []);

  if (!ivmScore) {
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
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 px-4 py-2 rounded-full mb-6">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600 font-medium">Tu Acelerador Migratorio a Japón</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
              Dashboard de Migración Inteligente
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sincroniza tu progreso migratorio con tu objetivo de vivir en Japón
            </p>
          </motion.div>
        </div>

        {/* IVM Widget Principal */}
        <div className="mb-12">
          <IVPWidget
            score={ivmScore}
            title="Índice de Viabilidad Migratoria (IVM)"
            subtitle="Tu puntuación de sincronización con el éxito migratorio"
          />
        </div>

        {/* Módulos Estratégicos */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Módulos Estratégicos
            </h2>
            <p className="text-gray-600">
              Organizados para AUMENTAR tu IVM y acelerar tu migración
            </p>
          </div>

          {strategicModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`bg-white rounded-2xl shadow-lg border-2 ${
                module.isActive ? 'border-blue-500/20 shadow-blue-500/10' : 'border-gray-200'
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
                      {module.priority === 'high' ? <AlertCircle className="w-6 h-6" /> :
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
                    <div className="text-2xl font-bold text-blue-600">
                      +{module.impactOnScore}%
                    </div>
                    <div className="text-sm text-gray-500">Impacto en IVM</div>
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
                          <span className="text-sm text-blue-600 font-medium">
                            +{action.impact}%
                          </span>
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1">
                            <span>Iniciar</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Función del módulo */}
                <div className="bg-gradient-to-r from-blue-500/5 to-cyan-500/5 p-4 rounded-xl">
                  <h4 className="font-semibold text-blue-600 mb-2">Función:</h4>
                  <p className="text-gray-700">
                    {module.isActive 
                      ? `Este módulo se activa porque el IVM detectó áreas específicas de mejora. ${module.description}`
                      : `Módulo disponible para optimizar tu proceso migratorio.`
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progreso de Documentación */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <FileText className="w-6 h-6 mr-2" />
              Progreso de Documentación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">3/7</div>
                <div className="text-sm text-gray-600">Documentos Completados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">4</div>
                <div className="text-sm text-gray-600">Documentos Pendientes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">43%</div>
                <div className="text-sm text-gray-600">Progreso Total</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para Acelerar tu Migración?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Cada acción que tomes en estos módulos aumentará tu IVM y te acercará a tu objetivo de vivir en Japón.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Comenzar Journey Migratorio
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MigrationDashboard;


