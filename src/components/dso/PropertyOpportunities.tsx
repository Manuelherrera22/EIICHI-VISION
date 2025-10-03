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
import PropertyAnalysis from '@/components/PropertyAnalysis';
import PhotoGallery from '@/components/PhotoGallery';

const PropertyOpportunities: React.FC = () => {
  const { userProfile } = useArquitecto();
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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Property Opportunities</h3>
            <p className="text-gray-600">AI-analyzed properties matching your profile</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BarChart3 className="w-4 h-4" />
            <span>Real-time analysis</span>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image with Photo Count */}
              <div className="relative h-48 overflow-hidden group">
                <Image
                  src={property.images[0]}
                  alt={property.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    AI Matched
                  </div>
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreColor(property.compatibilityScore)}`}>
                    {property.compatibilityScore}% Match
                  </div>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {property.images.length} photos
                  </div>
                </div>
                
                {/* Hover overlay with gallery preview */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleGalleryClick(property.id)}
                    className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-semibold hover:bg-white transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View All Photos</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {property.name}
                    </h4>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
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
                    <span className="text-sm font-medium text-gray-700">Profile Compatibility</span>
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

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-bold text-green-600">{property.roi}%</div>
                    <div className="text-xs text-gray-600">ROI</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-bold text-blue-600">{property.rentalYield}%</div>
                    <div className="text-xs text-gray-600">Rental</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-sm font-bold text-purple-600">{property.breakEvenYears}y</div>
                    <div className="text-xs text-gray-600">Break-even</div>
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
                        +{property.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAnalysisClick(property.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <Target className="w-4 h-4" />
                    Analyze
                  </button>
                  <button
                    onClick={() => handleGalleryClick(property.id)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors text-sm flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    {property.images.length} Photos
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-gray-600">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">4.0%</div>
              <div className="text-sm text-gray-600">Avg ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">8.5y</div>
              <div className="text-sm text-gray-600">Avg Break-even</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">85%</div>
              <div className="text-sm text-gray-600">Avg Match</div>
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
