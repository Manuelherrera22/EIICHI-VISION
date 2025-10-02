'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  TrendingUp, 
  Shield, 
  Star, 
  MapPin, 
  Calendar,
  DollarSign,
  Users,
  Home,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PropertyAnalysisProps {
  property: {
    id: string;
    name: string;
    price: number;
    location: string;
    area: number;
    age: number;
    layout: string;
    landArea: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

const PropertyAnalysis: React.FC<PropertyAnalysisProps> = ({ property, isOpen, onClose }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'investment' | 'risks' | 'opportunities'>('overview');

  // Análisis IA simulado basado en datos reales
  const analysis = {
    investmentScore: property.id === 'property-a' ? 87 : 82,
    culturalFit: property.id === 'property-a' ? 92 : 78,
    lifestyleScore: property.id === 'property-a' ? 89 : 85,
    overallScore: property.id === 'property-a' ? 89 : 82,
    recommendation: property.id === 'property-a' ? 'excellent' : 'good',
    roi: property.id === 'property-a' ? 4.2 : 3.8,
    appreciationRate: property.id === 'property-a' ? 3.5 : 3.2,
    rentalYield: property.id === 'property-a' ? 5.1 : 4.7,
    breakEvenYears: property.id === 'property-a' ? 8 : 9,
    marketTrend: 'rising',
    demandLevel: 'high',
    competitionLevel: 'low'
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  const tabs = [
    { id: 'overview', label: t('propertyAnalysis.overview'), icon: Target },
    { id: 'investment', label: t('propertyAnalysis.investmentTab'), icon: TrendingUp },
    { id: 'risks', label: t('propertyAnalysis.risks'), icon: AlertTriangle },
    { id: 'opportunities', label: t('propertyAnalysis.opportunities'), icon: CheckCircle }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {t('propertyAnalysis.title', { propertyName: property.name })}
                </h3>
                <p className="text-gray-600">{property.location}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* AI Scores */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className={`p-4 rounded-xl text-center ${getScoreColor(analysis.investmentScore)}`}>
                <div className="text-2xl font-bold">{analysis.investmentScore}</div>
                <div className="text-sm">{t('propertyAnalysis.investment')}</div>
              </div>
              <div className={`p-4 rounded-xl text-center ${getScoreColor(analysis.culturalFit)}`}>
                <div className="text-2xl font-bold">{analysis.culturalFit}</div>
                <div className="text-sm">{t('propertyAnalysis.culturalFit')}</div>
              </div>
              <div className={`p-4 rounded-xl text-center ${getScoreColor(analysis.lifestyleScore)}`}>
                <div className="text-2xl font-bold">{analysis.lifestyleScore}</div>
                <div className="text-sm">{t('propertyAnalysis.lifestyle')}</div>
              </div>
              <div className={`p-4 rounded-xl text-center ${getScoreColor(analysis.overallScore)}`}>
                <div className="text-2xl font-bold">{analysis.overallScore}</div>
                <div className="text-sm">{t('propertyAnalysis.overall')}</div>
              </div>
            </div>

            {/* Recommendation */}
            <div className={`p-4 rounded-xl mb-6 ${getRecommendationColor(analysis.recommendation)}`}>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">{t('propertyAnalysis.aiRecommendation')}: {t(`propertyAnalysis.${analysis.recommendation}`)}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
{t('propertyAnalysis.financialProjections')}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>{t('propertyAnalysis.expectedROI')}:</span>
                          <span className="font-semibold">{analysis.roi}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('propertyAnalysis.rentalYield')}:</span>
                          <span className="font-semibold">{analysis.rentalYield}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('propertyAnalysis.appreciationRate')}:</span>
                          <span className="font-semibold">{analysis.appreciationRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('propertyAnalysis.breakEvenYears')}:</span>
                          <span className="font-semibold">{analysis.breakEvenYears}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
{t('propertyAnalysis.marketAnalysis')}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>{t('propertyAnalysis.marketTrend')}:</span>
                          <span className="font-semibold text-green-600">{t(`propertyAnalysis.${analysis.marketTrend}`)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('propertyAnalysis.demandLevel')}:</span>
                          <span className="font-semibold text-blue-600">{t(`propertyAnalysis.${analysis.demandLevel}`)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('propertyAnalysis.competition')}:</span>
                          <span className="font-semibold text-green-600">{t(`propertyAnalysis.${analysis.competitionLevel}`)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'investment' && (
                <div className="space-y-6">
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-green-800 mb-4">{t('propertyAnalysis.investmentStrengths')}</h4>
                    <ul className="space-y-2 text-green-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5" />
                        {t('propertyAnalysis.rentalPotential')}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5" />
                        {t('propertyAnalysis.culturalHeritage')}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5" />
                        {t('propertyAnalysis.foreignInterest')}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5" />
                        {t('propertyAnalysis.governmentIncentives')}
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'risks' && (
                <div className="space-y-6">
                  <div className="bg-orange-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-orange-800 mb-4">{t('propertyAnalysis.riskFactors')}</h4>
                    <ul className="space-y-2 text-orange-700">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 mt-0.5" />
                        {t('propertyAnalysis.remoteLocation')}
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 mt-0.5" />
                        {t('propertyAnalysis.weatherMaintenance')}
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 mt-0.5" />
                        {t('propertyAnalysis.englishServices')}
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 mt-0.5" />
                        {t('propertyAnalysis.managementComplexity')}
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'opportunities' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-blue-800 mb-4">{t('propertyAnalysis.growthOpportunities')}</h4>
                    <ul className="space-y-2 text-blue-700">
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 mt-0.5" />
                        {t('propertyAnalysis.tourismIndustry')}
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 mt-0.5" />
                        {t('propertyAnalysis.ruralInterest')}
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 mt-0.5" />
                        {t('propertyAnalysis.culturalTourism')}
                      </li>
                      <li className="flex items-start gap-2">
                        <Star className="w-4 h-4 mt-0.5" />
                        {t('propertyAnalysis.heritageValue')}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyAnalysis;
