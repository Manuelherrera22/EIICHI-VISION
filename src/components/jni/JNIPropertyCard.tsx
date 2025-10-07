'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { JNIProperty } from '@/lib/jni/jni-integration';
import { 
  MapPin, 
  Home, 
  Calendar, 
  Square, 
  TreePine, 
  ArrowRight,
  Eye,
  Heart,
  Share2,
  Phone,
  Mail,
  Star,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface JNIPropertyCardProps {
  property: JNIProperty;
  onViewDetails?: (property: JNIProperty) => void;
  onContact?: (property: JNIProperty) => void;
  onFavorite?: (propertyId: string) => void;
  isFavorited?: boolean;
}

const JNIPropertyCard: React.FC<JNIPropertyCardProps> = ({
  property,
  onViewDetails,
  onContact,
  onFavorite,
  isFavorited = false
}) => {
  const { t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'JPY') {
      return `¥${(price / 10000).toFixed(0)}万円`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'fair':
        return 'text-yellow-600 bg-yellow-100';
      case 'needs_renovation':
        return 'text-orange-600 bg-orange-100';
      case 'demolition':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return t('jni.conditions.excellent');
      case 'good':
        return t('jni.conditions.good');
      case 'fair':
        return t('jni.conditions.fair');
      case 'needs_renovation':
        return t('jni.conditions.needsRenovation');
      case 'demolition':
        return t('jni.conditions.demolition');
      default:
        return condition;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Imagen de la propiedad */}
      <div className="relative h-48 bg-gray-200">
        {property.images.length > 0 ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse bg-gray-300 w-full h-full" />
              </div>
            )}
            <img
              src={property.images[0]}
              alt={property.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <Home className="w-16 h-16 text-blue-400" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(property.details.condition)}`}>
            {getConditionText(property.details.condition)}
          </span>
          
          {property.type === 'akiya' && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
              {t('jni.badges.akiya')}
            </span>
          )}
        </div>

        {/* Acciones */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button
            onClick={() => onFavorite?.(property.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isFavorited 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          
          <button className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Estado de disponibilidad */}
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            property.status === 'available' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {property.status === 'available' ? (
              <span className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
                {t('jni.status.available')}
              </span>
            ) : (
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {t('jni.status.underContract')}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Título y código */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {property.title}
          </h3>
          <p className="text-sm text-gray-500 font-mono">
            {property.propertyCode}
          </p>
        </div>

        {/* Ubicación */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          <span className="text-sm">
            {property.location.city}, {property.location.prefecture}
          </span>
        </div>

        {/* Detalles de la propiedad */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Square className="w-4 h-4 mr-2 text-gray-400" />
            <span>{property.details.area}m²</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Home className="w-4 h-4 mr-2 text-gray-400" />
            <span>{property.details.rooms} {t('jni.details.rooms')}</span>
          </div>
          
          {property.details.yearBuilt && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <span>{property.details.yearBuilt}</span>
            </div>
          )}
          
          {property.location.nearestStation && (
            <div className="flex items-center text-sm text-gray-600">
              <TreePine className="w-4 h-4 mr-2 text-gray-400" />
              <span>{property.location.walkTimeToStation}min {t('jni.details.toStation')}</span>
            </div>
          )}
        </div>

        {/* Precio */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(property.pricing.askingPrice, property.pricing.currency)}
          </div>
          <div className="text-sm text-gray-600">
            {t('jni.pricing.perSqm')}: {formatPrice(property.pricing.pricePerSqm, property.pricing.currency)}
          </div>
        </div>

        {/* Características destacadas */}
        {property.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {property.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
              {property.features.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  +{property.features.length - 3} {t('jni.more')}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Agente */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {property.agent.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{property.agent.name}</p>
              <p className="text-xs text-gray-500">{t('jni.agent.jniProperties')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">4.9</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex space-x-3">
          <button
            onClick={() => onViewDetails?.(property)}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            {t('jni.actions.viewDetails')}
          </button>
          
          <button
            onClick={() => onContact?.(property)}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Phone className="w-4 h-4 mr-2" />
            {t('jni.actions.contact')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default JNIPropertyCard;

