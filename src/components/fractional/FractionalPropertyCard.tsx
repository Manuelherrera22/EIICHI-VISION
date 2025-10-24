'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowRight,
  Eye,
  Download,
  Star,
  Building2,
  Landmark
} from 'lucide-react';
import { FractionalProperty } from '@/types/fractional';
import { useLanguage } from '@/contexts/LanguageContext';

interface FractionalPropertyCardProps {
  property: FractionalProperty;
  onSelect: () => void;
  onInvest: () => void;
}

export default function FractionalPropertyCard({ 
  property, 
  onSelect, 
  onInvest 
}: FractionalPropertyCardProps) {
  const { t } = useLanguage();
  const [imageIndex, setImageIndex] = useState(0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'funding':
        return 'bg-yellow-100 text-yellow-800';
      case 'funded':
        return 'bg-green-100 text-green-800';
      case 'renovating':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'funding':
        return t('fractional.status.funding');
      case 'funded':
        return t('fractional.status.funded');
      case 'renovating':
        return t('fractional.status.renovating');
      case 'completed':
        return t('fractional.status.completed');
      default:
        return t('fractional.status.available');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      {/* Image Gallery */}
      <div className="relative h-64 bg-gray-100">
        {property.images && property.images.length > 0 ? (
          <div className="relative w-full h-full">
            <img
              src={property.images[imageIndex]}
              alt={property.name}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {property.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === imageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(property.status)}`}>
                {getStatusText(property.status)}
              </span>
            </div>

            {/* Funding Progress */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className="text-sm font-semibold text-gray-900">
                {formatPercentage(property.fundingProgress)}
              </div>
              <div className="text-xs text-gray-600">{t('fractional.status.completed')}</div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Building2 className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {property.name}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <DollarSign className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-gray-600">{t('fractional.property.pricePerShare')}</span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(property.pricePerShare)}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-sm font-medium text-gray-600">{t('fractional.property.expectedROI')}</span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {formatPercentage(property.estimatedROI)}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <Users className="w-4 h-4 text-purple-600 mr-1" />
              <span className="text-sm font-medium text-gray-600">{t('fractional.property.sharesAvailable')}</span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {property.availableShares} {t('fractional.property.of')} {property.totalShares}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center mb-1">
              <Calendar className="w-4 h-4 text-orange-600 mr-1" />
              <span className="text-sm font-medium text-gray-600">{t('fractional.property.completed')}</span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {property.expectedCompletionDate ? 
                new Date(property.expectedCompletionDate).toLocaleDateString('es-ES', { 
                  month: 'short', 
                  year: 'numeric' 
                }) : t('fractional.property.tbd')
              }
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">{t('fractional.property.characteristics')}</h4>
          <div className="flex flex-wrap gap-2">
            {property.features.map((feature, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Funding Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{t('fractional.property.fundingProgress')}</span>
            <span>{formatCurrency(property.currentFunding)} / {formatCurrency(property.fundingGoal)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${property.fundingProgress}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelect}
            className="flex-1 px-4 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            {t('fractional.property.viewDetails')}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onInvest}
            disabled={property.availableShares === 0}
            className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            {t('fractional.property.invest')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.button>
        </div>

        {/* Documents */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{t('fractional.property.documentsAvailable')}</span>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center">
              <Download className="w-4 h-4 mr-1" />
              {t('fractional.property.download')}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
