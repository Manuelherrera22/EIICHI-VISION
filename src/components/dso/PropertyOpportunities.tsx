'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Star, 
  Eye, 
  Heart,
  Share2,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Users,
  Home
} from 'lucide-react';
import { useArquitecto } from '@/contexts/ArquitectoContext';
import { useLanguage } from '@/contexts/LanguageContext';
import PropertyAnalysis from '@/components/PropertyAnalysis';
import PhotoGallery from '@/components/PhotoGallery';

const PropertyOpportunities: React.FC = () => {
  const { userProfile } = useArquitecto();
  const { t } = useLanguage();
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  // Datos de las propiedades reales
  const properties = [
    {
      id: 'property-a',
      name: 'Property A - Traditional Japanese Villa',
      price: 15000000,
      location: 'Kambara, Tsumagoi Village, Gunma',
      area: 74.14,
      landArea: 471,
      age: 36,
      layout: '2LDK',
      images: [
        '/property-a/33239_1.jpg',
        '/property-a/33239_2.gif',
        '/property-a/33239_3.jpg',
        '/property-a/33239_4.jpg',
        '/property-a/33239_5.jpg',
        '/property-a/33239_6.jpg',
        '/property-a/33239_7.jpg',
        '/property-a/33239_8.jpg',
        '/property-a/33239_9.jpg',
        '/property-a/33239_10.jpg'
      ],
      features: ['Traditional Architecture', 'Mountain Views', 'Private Garden', 'Renovated 2025'],
      // Análisis basado en perfil de usuario
      compatibilityScore: calculateCompatibility('property-a', userProfile),
      investmentScore: 87,
      culturalFit: 92,
      lifestyleScore: 89,
      recommendation: 'excellent',
      roi: 4.2,
      rentalYield: 5.1,
      appreciationRate: 3.5,
      breakEvenYears: 8
    },
    {
      id: 'property-b',
      name: 'Property B - Modern Mountain Retreat',
      price: 10000000,
      location: 'Kambara, Tsumagoi Village, Gunma',
      area: 55.48,
      landArea: 307,
      age: 36,
      layout: '2LDK',
      images: [
        '/property-b/33250_1.jpg',
        '/property-b/33250_2.gif',
        '/property-b/33250_3.jpg',
        '/property-b/33250_4.jpg',
        '/property-b/33250_5.jpg',
        '/property-b/33250_6.jpg',
        '/property-b/33250_7.jpg',
        '/property-b/33250_9.jpg',
        '/property-b/33250_10.jpg'
      ],
      features: ['Modern Design', 'Mountain Views', 'Large Windows', 'Energy Efficient'],
      // Análisis basado en perfil de usuario
      compatibilityScore: calculateCompatibility('property-b', userProfile),
      investmentScore: 82,
      culturalFit: 78,
      lifestyleScore: 85,
      recommendation: 'good',
      roi: 3.8,
      rentalYield: 4.7,
      appreciationRate: 3.2,
      breakEvenYears: 9
    }
  ];

  // Función para calcular compatibilidad con perfil de usuario
  function calculateCompatibility(propertyId: string, profile: any): number {
    let score = 70; // Base score

    // Factor presupuesto
    const userBudget = profile.budgetMax || 20000000;
    const propertyPrice = propertyId === 'property-a' ? 15000000 : 10000000;
    const budgetRatio = propertyPrice / userBudget;
    
    if (budgetRatio <= 0.8) score += 20;
    else if (budgetRatio <= 1.0) score += 15;
    else if (budgetRatio <= 1.2) score += 10;
    else score -= 10;

    // Factor objetivo principal
    if (profile.primaryGoal === 'invertir') {
      score += propertyId === 'property-a' ? 15 : 10; // Property A mejor para inversión
    } else if (profile.primaryGoal === 'migrar') {
      score += propertyId === 'property-b' ? 15 : 10; // Property B mejor para migración
    } else if (profile.primaryGoal === 'vivir') {
      score += propertyId === 'property-a' ? 12 : 8; // Property A mejor para vivir
    }

    // Factor experiencia cultural
    if (profile.culturalAffinity?.japanKnowledge === 'avanzado') {
      score += propertyId === 'property-a' ? 10 : 5; // Property A más tradicional
    } else if (profile.culturalAffinity?.japanKnowledge === 'basico' || 
               profile.culturalAffinity?.japanKnowledge === 'ninguno') {
      score += propertyId === 'property-b' ? 10 : 5; // Property B más moderno
    }

    // Factor familia
    const familySize = profile.familySituation?.size;
    if (familySize === 'familia-grande' || familySize === 'familia-pequena') {
      score += propertyId === 'property-a' ? 8 : 5; // Property A más espacio
    } else if (familySize === 'solo' || familySize === 'pareja') {
      score += propertyId === 'property-b' ? 8 : 5; // Property B más eficiente
    }

    return Math.min(100, Math.max(0, Math.round(score)));
  }

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

  const handleAnalysisClick = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setAnalysisOpen(true);
  };

  const handleGalleryClick = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setGalleryOpen(true);
  };

  const selectedPropertyData = properties.find(p => p.id === selectedProperty);

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Header - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{t('propertyOpportunities.title')}</h3>
            <p className="text-sm sm:text-base text-gray-600">{t('propertyOpportunities.subtitle')}</p>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <BarChart3 className="w-4 h-4" />
            <span>{t('propertyOpportunities.realTimeAnalysis')}</span>
          </div>
        </div>

        {/* Properties Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image with Photo Count - Responsive */}
              <div className="relative h-40 sm:h-48 overflow-hidden group">
                <Image
                  src={property.images[0]}
                  alt={property.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                    {t('propertyOpportunities.aiMatched')}
                  </div>
                </div>
                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                  <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(property.compatibilityScore)}`}>
                    {property.compatibilityScore}% {t('propertyOpportunities.match')}
                  </div>
                </div>
                <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3">
                  <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span className="hidden sm:inline">{property.images.length} {t('propertyOpportunities.photos')}</span>
                    <span className="sm:hidden">{property.images.length}</span>
                  </div>
                </div>
                
                {/* Hover overlay with gallery preview */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleGalleryClick(property.id)}
                    className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 sm:px-4 py-2 rounded-full font-semibold hover:bg-white transition-colors flex items-center gap-2 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('propertyOpportunities.viewAllPhotos')}</span>
                    <span className="sm:hidden">{t('propertyOpportunities.photos')}</span>
                  </button>
                </div>
              </div>

              {/* Content - Responsive */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                      {property.name}
                    </h4>
                    <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {property.location}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      ¥{(property.price / 1000000).toFixed(0)}M
                    </div>
                    <div className="text-xs text-gray-500">
                      {property.area}m² • {property.age}y
                    </div>
                  </div>
                </div>

                {/* Compatibility Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{t('propertyOpportunities.profileCompatibility')}</span>
                    <span className="text-sm font-bold text-gray-900">{property.compatibilityScore}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        property.compatibilityScore >= 90 ? 'bg-green-500' :
                        property.compatibilityScore >= 80 ? 'bg-blue-500' :
                        property.compatibilityScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${property.compatibilityScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Key Metrics - Responsive */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-xs sm:text-sm font-bold text-green-600">{property.roi}%</div>
                    <div className="text-xs text-gray-600">{t('propertyOpportunities.roi')}</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-xs sm:text-sm font-bold text-blue-600">{property.rentalYield}%</div>
                    <div className="text-xs text-gray-600">{t('propertyOpportunities.rental')}</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-xs sm:text-sm font-bold text-purple-600">{property.breakEvenYears}y</div>
                    <div className="text-xs text-gray-600">{t('propertyOpportunities.breakEven')}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {property.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                    {property.features.length > 3 && (
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        +{property.features.length - 3} {t('propertyOpportunities.more')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons - Responsive */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleAnalysisClick(property.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors text-xs sm:text-sm flex items-center justify-center gap-1"
                  >
                    <Target className="w-3 h-3 sm:w-4 sm:h-4" />
                    {t('propertyOpportunities.analyze')}
                  </button>
                  <button
                    onClick={() => handleGalleryClick(property.id)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors text-xs sm:text-sm flex items-center justify-center gap-1"
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{property.images.length} {t('propertyOpportunities.photos')}</span>
                    <span className="sm:hidden">{t('propertyOpportunities.photos')}</span>
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats - Responsive */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6">
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{t('propertyOpportunities.investmentSummary')}</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">2</div>
              <div className="text-xs sm:text-sm text-gray-600">{t('propertyOpportunities.properties')}</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600">4.0%</div>
              <div className="text-xs sm:text-sm text-gray-600">{t('propertyOpportunities.avgRoi')}</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-600">8.5y</div>
              <div className="text-xs sm:text-sm text-gray-600">{t('propertyOpportunities.avgBreakEven')}</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-orange-600">85%</div>
              <div className="text-xs sm:text-sm text-gray-600">{t('propertyOpportunities.avgMatch')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis Modal */}
      {selectedPropertyData && (
        <PropertyAnalysis
          property={selectedPropertyData}
          isOpen={analysisOpen}
          onClose={() => setAnalysisOpen(false)}
        />
      )}

      {/* Photo Gallery Modal */}
      {selectedPropertyData && (
        <PhotoGallery
          property={selectedPropertyData}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </>
  );
};

export default PropertyOpportunities;
