'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plane, FileText, Home, Clock, CheckCircle, ArrowRight, BookOpen, Users, Star, AlertCircle, Calendar, ExternalLink } from 'lucide-react';
import { useModal } from '@/contexts/ModalContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface MigrationDashboardV2Props {
  ivmScore?: {
    percentage: number;
    strengths: string[];
    opportunities: string[];
    lastUpdated: Date;
    trend: 'up' | 'down' | 'stable';
    documentationComplete: number;
    professionDemand: number;
    educationLevel: number;
    accommodationPlan: number;
    visaEligibility?: { type: string; score: number; status: string }[];
    timelineEstimate?: string;
  };
}

const MigrationDashboardV2: React.FC<MigrationDashboardV2Props> = ({ ivmScore }) => {
  const { openModal } = useModal();
  const { t } = useLanguage();

  // Datos por defecto si no se proporcionan
  const defaultScore = {
    percentage: 60,
    strengths: [
      'Profesión en alta demanda en Japón',
      'Nivel educativo cumple los requisitos'
    ],
    opportunities: [
      'Documentación clave faltante (3 de 7)',
      'Plan de alojamiento a largo plazo no definido'
    ],
    lastUpdated: new Date(),
    trend: 'stable' as const,
    documentationComplete: 40,
    professionDemand: 85,
    educationLevel: 90,
    accommodationPlan: 30,
    visaEligibility: [
      { type: 'Work Visa', score: 75, status: 'Eligible' },
      { type: 'Investor Visa', score: 45, status: 'Requires more capital' },
      { type: 'Student Visa', score: 80, status: 'Eligible' }
    ],
    timelineEstimate: '8 meses'
  };

  const score = ivmScore || defaultScore;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 to-cyan-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
              <Plane className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">{t('migration.migrationAccelerator')}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
              {t('migration.optimizedPathToJapan')}
            </h1>
          </motion.div>
        </div>

        {/* Widget Central IVM */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header del Widget */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{t('migration.migrationViabilityIndex')}</h2>
                  <p className="text-blue-100">{t('migration.migrationViabilityScore')}</p>
                </div>
                <div className="text-right">
                  <div className="text-6xl font-bold">{ivmScore?.percentage || 0}%</div>
                  <div className="text-blue-100 text-sm flex items-center justify-end mt-2">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{t('migration.inProgress')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenido del Widget */}
            <div className="p-8">
              {/* Puntos Fuertes */}
              {ivmScore?.strengths && ivmScore.strengths.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    {t('migration.strengths')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ivmScore?.strengths?.map((strength, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Áreas de Oportunidad */}
              {ivmScore?.opportunities && ivmScore.opportunities.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                    {t('migration.opportunityAreas')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ivmScore?.opportunities?.map((opportunity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl border border-orange-200">
                        <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
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
              {t('migration.strategicModules')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('migration.keySteps')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Módulo 1: Acelera tu Documentación */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('migration.accelerateDocumentation')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('migration.intelligentDocumentManager')}
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{t('migration.intelligentDocumentManagerFeature')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{t('migration.ocrValidation')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{t('migration.instantFeedback')}</span>
                </div>
              </div>

              <button 
                onClick={() => openModal('open-document-checklist')}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>{t('migration.documentChecklist')}</span>
              </button>
            </motion.div>

            {/* Módulo 2: Define tu Hogar Base */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('migration.defineHomeBase')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('migration.findAndDesignResidence')}
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{t('migration.integratedPropertySearch')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{t('migration.design3DAR')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{t('migration.businessPlanAnnex')}</span>
                </div>
              </div>

              <button 
                onClick={() => window.location.href = '/projects'}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>{t('migration.viewProperties')}</span>
              </button>
            </motion.div>

            {/* Módulo 3: Línea de Tiempo Migratoria */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('migration.migrationTimeline')}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {t('migration.visualizeProgress')}
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{t('migration.visualProcessTracker')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{t('migration.actionImpactOnIVM')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">{t('migration.intelligentReminders')}</span>
                </div>
              </div>

              <button 
                onClick={() => openModal('open-migration-timeline')}
                className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Clock className="w-4 h-4" />
                <span>{t('migration.migrationTimelineButton')}</span>
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
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              {t('migration.readyToAccelerateMigration')}
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              {t('migration.everyModuleDesigned')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">{t('migration.intelligentDocumentation')}</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">{t('migration.gamifiedProgress')}</span>
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">{t('migration.absoluteConfidence')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MigrationDashboardV2;
