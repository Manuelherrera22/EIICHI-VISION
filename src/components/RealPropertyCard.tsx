'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Home, 
  Calendar, 
  Car, 
  Star, 
  Eye, 
  Heart, 
  Share,
  ChevronDown,
  ChevronRight,
  Zap,
  Shield,
  Users,
  TreePine,
  Camera
} from 'lucide-react';
import { RealProperty } from '@/data/realProperties';
import { formatPrice } from '@/data/realProperties';
import PhotoGallery from './PhotoGallery';
import { useLanguage } from '@/contexts/LanguageContext';

interface RealPropertyCardProps {
  property: RealProperty;
  onViewDetails?: (property: RealProperty) => void;
  onViewPhotos?: (property: RealProperty) => void;
}

const RealPropertyCard: React.FC<RealPropertyCardProps> = ({ property, onViewDetails, onViewPhotos }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  // Function to translate property features
  const translateFeature = (feature: string) => {
    const featureMap: { [key: string]: string } = {
      'Traditional Architecture': t('property.features.traditionalArchitecture'),
      'Mountain Views': t('property.features.mountainViews'),
      'Private Garden': t('property.features.privateGarden'),
      'Renovated 2025': t('property.features.renovated') + ' 2025',
      'Modern Design': t('property.features.modernDesign'),
      'Large Windows': t('property.features.largeWindows'),
      'Energy Efficient': t('property.features.energyEfficient'),
      'Tennis Courts Access': t('property.features.tennisCourtsAccess'),
      'Villa District': t('property.features.villaDistrict'),
      'Modern system kitchen': t('property.features.modernSystemKitchen'),
      'Premium bidet toilet': t('property.features.premiumBidetToilet'),
      'Roof refurbishment': t('property.features.roofRefurbishment'),
      'New water heater and faucets': t('property.features.newWaterHeater'),
      'Tatami renewal in main Japanese room': t('property.features.tatamiRenewal'),
      'Newly built deck and exterior stairs': t('property.features.newDeck'),
      'Villa community': t('property.features.villaCommunity'),
      'Tennis courts': t('property.features.tennisCourts'),
      'Well-managed surroundings': t('property.features.wellManagedSurroundings'),
      'Private parking': t('property.features.privateParking'),
      'Modern kitchen': t('property.features.modernKitchen'),
      'Premium bathroom': t('property.features.premiumBathroom'),
      'Landscape regulations': t('property.features.landscapeRegulations'),
      'Building ordinances': t('property.features.buildingOrdinances'),
      'Double parking': t('property.features.doubleParking'),
      'Modern structure': t('property.features.modernStructure'),
      'Mountain location': t('property.features.mountainLocation'),
    };
    return featureMap[feature] || feature;
  };

  // Function to translate property name
  const translatePropertyName = (name: string) => {
    if (name.includes('Property A')) {
      return t('property.name.propertyA');
    } else if (name.includes('Property B')) {
      return t('property.name.propertyB');
    }
    return name;
  };

  // Function to translate access information
  const translateAccess = (text: string) => {
    return text.replace('by car', t('property.access.byCar'))
               .replace('by train', t('property.access.byTrain'))
               .replace('by bus', t('property.access.byBus'));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'under_negotiation': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'renovated': return <Zap size={20} className="text-green-600" />;
      case 'traditional': return <Home size={20} className="text-amber-600" />;
      case 'luxury': return <Star size={20} className="text-purple-600" />;
      default: return <Home size={20} className="text-blue-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'renovated': return 'bg-green-100 text-green-800';
      case 'traditional': return 'bg-amber-100 text-amber-800';
      case 'luxury': return 'bg-purple-100 text-purple-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden group">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1).replace('_', ' ')}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(property.category)} flex items-center space-x-1`}>
            {getCategoryIcon(property.category)}
            <span>{property.category.charAt(0).toUpperCase() + property.category.slice(1)}</span>
          </span>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
            <Heart size={16} className="text-gray-600" />
          </button>
          <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
            <Share size={16} className="text-gray-600" />
          </button>
        </div>
        
        {/* Photo Gallery Button */}
        {property.images && property.images.length > 1 && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <button
              onClick={() => setGalleryOpen(true)}
              className="bg-white/90 backdrop-blur-sm text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-white transition-colors flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>{t('projects.viewAllPhotos')} ({property.images.length})</span>
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Price and Title */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-primary mb-1">
            {formatPrice(property.price)}
          </div>
          <h3 className="text-xl font-serif font-bold text-primary leading-tight">
            {translatePropertyName(property.name)}
          </h3>
        </div>

        {/* Layout and Size */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Home size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">{property.layout}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-secondary">
            <span>{t('propertyCard.land')}: {property.landArea}m² ({property.landAreaTsubo}坪)</span>
            <span>{t('propertyCard.floor')}: {property.floorArea}m² ({property.floorAreaTsubo}坪)</span>
          </div>
        </div>

        {/* Location */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-1">
            <MapPin size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">{property.location.area}</span>
          </div>
          <div className="text-sm text-secondary">
            {property.location.village} Village, {property.location.district} District
          </div>
        </div>

        {/* Access Information */}
        <div className="mb-4">
          <div className="text-sm text-secondary">
            {property.access.stations.map((station, index) => (
              <div key={index} className="flex items-center space-x-2 mb-1">
                <span>🚊</span>
                <span>{station.name}</span>
                <span className="text-xs">({station.distance}, {translateAccess(station.timeByCar)})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Age and Structure */}
        <div className="mb-4 flex items-center justify-between text-sm text-secondary">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>{t('propertyCard.built')} {property.completion.year} ({property.age} {t('propertyCard.yearsOld')})</span>
          </div>
          <div className="flex items-center space-x-2">
            <Car size={16} />
            <span>{property.parking.spaces} {t('propertyCard.parking')}</span>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {property.features.slice(0, 4).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-xs rounded-full text-foreground"
              >
                {translateFeature(feature)}
              </span>
            ))}
            {property.features.length > 4 && (
              <span className="px-2 py-1 bg-muted text-xs rounded-full text-foreground">
                +{property.features.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Investment Info */}
        {property.investment.roi && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">{t('propertyCard.projectedROI')}</span>
              <span className="text-lg font-bold text-green-800">{property.investment.roi}%</span>
            </div>
          </div>
        )}

        {/* Expandable Details */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between py-2 text-primary hover:text-primary/80 transition-colors"
        >
          <span className="font-medium">{t('propertyCard.viewDetails')}</span>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-border"
          >
            {/* Structure */}
            <div className="mb-4">
              <h4 className="font-semibold text-primary mb-2">{t('propertyCard.structure')}</h4>
              <p className="text-sm text-foreground">{property.structure}</p>
            </div>

            {/* Recent Renovations */}
            {property.renovations && (
              <div className="mb-4">
                <h4 className="font-semibold text-primary mb-2">{t('propertyCard.recentRenovations')} ({property.renovations.date})</h4>
                <ul className="space-y-1">
                  {property.renovations.items.map((item, index) => (
                    <li key={index} className="text-sm text-foreground flex items-center space-x-2">
                      <span className="w-1 h-1 bg-accent rounded-full"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Highlights */}
            {property.highlights && (
              <div className="mb-4">
                <h4 className="font-semibold text-primary mb-2">{t('propertyCard.highlights')}</h4>
                <ul className="space-y-2">
                  {property.highlights.map((highlight, index) => (
                    <li key={index} className="text-sm text-foreground flex items-start space-x-2">
                      <Star size={12} className="text-accent mt-1 flex-shrink-0" />
                      <span>{translateFeature(highlight)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lifestyle & Services */}
            {property.lifestyle && (
              <div className="mb-4">
                <h4 className="font-semibold text-primary mb-2">{t('propertyCard.lifestyleServices')}</h4>
                <div className="space-y-2">
                  {property.lifestyle.community && (
                    <div>
                      <span className="text-xs font-medium text-secondary">{t('propertyCard.community')}:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {property.lifestyle.community.map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {property.lifestyle.amenities && (
                    <div>
                      <span className="text-xs font-medium text-secondary">{t('propertyCard.amenities')}:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {property.lifestyle.amenities.map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex space-x-3">
          <button
            onClick={() => onViewDetails?.(property)}
            className="flex-1 bg-primary text-white py-3 px-4 rounded-full hover:bg-primary/90 transition-colors font-medium"
          >
{t('propertyCard.viewDetails')}
          </button>
          {property.images && property.images.length > 1 && (
            <button
              onClick={() => setGalleryOpen(true)}
              className="px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary/5 transition-colors font-medium flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
{t('projects.photos')}
            </button>
          )}
          <button className="px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary/5 transition-colors font-medium">
{t('propertyCard.contact')}
          </button>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {property.images && property.images.length > 0 && (
        <PhotoGallery
          property={{
            id: property.id,
            name: translatePropertyName(property.name),
            images: property.images
          }}
          isOpen={galleryOpen}
          onClose={() => setGalleryOpen(false)}
        />
      )}
    </motion.div>
  );
};

export default RealPropertyCard;




