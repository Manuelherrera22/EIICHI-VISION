'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  TrendingUp, 
  Home, 
  Palette, 
  Calendar,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  MapPin,
  Camera
} from 'lucide-react';
import IVPWidget from './IVPWidget';
import { ISE, StrategicModule, calculateISE } from '@/types/dso';

const LifestyleDashboard: React.FC = () => {
  const [iseScore, setIseScore] = useState<ISE | null>(null);
  const [strategicModules, setStrategicModules] = useState<StrategicModule[]>([]);

  useEffect(() => {
    // Simular datos del usuario (en producción vendrían del backend)
    const userData = {
      designPreference: 90, // Muy claro (Wabi-Sabi)
      renovationBudget: 85, // Definido
      propertySelection: 35, // Aún por seleccionar
      culturalExperiences: 40 // No definidas
    };

    const calculatedISE = calculateISE(userData);
    setIseScore(calculatedISE);

    // Módulos estratégicos basados en las oportunidades detectadas
    const modules: StrategicModule[] = [
      {
        id: 'discover-property',
        title: 'Descubre tu Propiedad Ideal',
        description: 'Motor de Recomendación que presenta las 3 mejores casas sincronizadas con tu perfil de santuario',
        priority: 'high',
        isActive: calculatedISE.opportunities.some(opp => opp.includes('Propiedad ideal')),
        impactOnScore: 30,
        category: 'lifestyle',
        technologies: ['Algoritmo de Recomendación', 'Machine Learning', 'Análisis de Preferencias'],
        actions: [
          {
            id: 'property-recommendations',
            title: 'Recomendaciones Personalizadas',
            description: 'Las 3 mejores casas que se sincronizan con tu perfil Wabi-Sabi',
            completed: false,
            impact: 20
          },
          {
            id: 'property-matching',
            title: 'Motor de Compatibilidad',
            description: 'Algoritmo similar a Netflix que aprende de tus preferencias',
            completed: false,
            impact: 10
          }
        ]
      },
      {
        id: 'design-space',
        title: 'Diseña tu Espacio',
        description: 'Acceso directo a la Mesa de Diseño 3D con gamificación del proceso creativo',
        priority: 'high',
        isActive: true,
        impactOnScore: 25,
        category: 'lifestyle',
        technologies: ['Renderizado Fotorrealista', 'Gamificación', 'Cloud Computing'],
        actions: [
          {
            id: '3d-design-studio',
            title: 'Estudio de Diseño 3D',
            description: 'Diseña tu futuro hogar con herramientas profesionales',
            completed: false,
            impact: 15
          },
          {
            id: 'design-gamification',
            title: 'Gamificación del Diseño',
            description: 'Cada diseño guardado aumenta tu ISE',
            completed: false,
            impact: 10
          },
          {
            id: 'photorealistic-rendering',
            title: 'Renderizado Premium',
            description: 'Recompensa por alcanzar hitos de diseño',
            completed: false,
            impact: 5
          }
        ]
      },
      {
        id: 'create-life-itinerary',
        title: 'Crea tu Itinerario de Vida',
        description: 'Concierge de Experiencias para completar tu visión de estilo de vida',
        priority: 'medium',
        isActive: calculatedISE.opportunities.some(opp => opp.includes('Experiencias culturales')),
        impactOnScore: 20,
        category: 'lifestyle',
        technologies: ['Agenda Inteligente', 'Análisis de Gustos', 'Clima en Tiempo Real'],
        actions: [
          {
            id: 'experience-concierge',
            title: 'Concierge de Experiencias',
            description: 'Actividades personalizadas basadas en tus gustos',
            completed: false,
            impact: 12
          },
          {
            id: 'smart-agenda',
            title: 'Agenda Inteligente',
            description: 'Sugerencias basadas en clima y preferencias',
            completed: false,
            impact: 8
          }
        ]
      }
    ];

    setStrategicModules(modules);
  }, []);

  if (!iseScore) {
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
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5 text-purple-600" />
              <span className="text-purple-600 font-medium">El Taller de tu Santuario</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-primary mb-6">
              Dashboard de Estilo de Vida
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sincroniza tu visión de vida con tu santuario japonés perfecto
            </p>
          </motion.div>
        </div>

        {/* ISE Widget Principal */}
        <div className="mb-12">
          <IVPWidget
            score={iseScore}
            title="Índice de Sincronización de Estilo de Vida (ISE)"
            subtitle="Tu puntuación de alineación con tu visión de santuario"
          />
        </div>

        {/* Módulos Estratégicos */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              Módulos Estratégicos
            </h2>
            <p className="text-gray-600">
              Organizados para AUMENTAR tu ISE y completar tu visión de vida
            </p>
          </div>

          {strategicModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`bg-white rounded-2xl shadow-lg border-2 ${
                module.isActive ? 'border-purple-500/20 shadow-purple-500/10' : 'border-gray-200'
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
                       module.priority === 'medium' ? <Sparkles className="w-6 h-6" /> :
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
                    <div className="text-2xl font-bold text-purple-600">
                      +{module.impactOnScore}%
                    </div>
                    <div className="text-sm text-gray-500">Impacto en ISE</div>
                  </div>
                </div>

                {/* Tecnologías */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Tecnologías Avanzadas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
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
                          <span className="text-sm text-purple-600 font-medium">
                            +{action.impact}%
                          </span>
                          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-1">
                            <span>Iniciar</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Función del módulo */}
                <div className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 p-4 rounded-xl">
                  <h4 className="font-semibold text-purple-600 mb-2">Función:</h4>
                  <p className="text-gray-700">
                    {module.isActive 
                      ? `Este módulo se activa porque el ISE detectó oportunidades específicas. ${module.description}`
                      : `Módulo disponible para completar tu visión de estilo de vida.`
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progreso de Estilo de Vida */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
              <Palette className="w-6 h-6 mr-2" />
              Progreso de tu Visión de Vida
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
                <div className="text-sm text-gray-600">Preferencia de Diseño</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                <div className="text-sm text-gray-600">Presupuesto de Renovación</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">35%</div>
                <div className="text-sm text-gray-600">Selección de Propiedad</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">40%</div>
                <div className="text-sm text-gray-600">Experiencias Culturales</div>
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
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              ¿Listo para Crear tu Santuario Perfecto?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Cada acción que tomes en estos módulos aumentará tu ISE y te acercará a tu visión de estilo de vida en Japón.
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Comenzar Journey de Estilo de Vida
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LifestyleDashboard;






