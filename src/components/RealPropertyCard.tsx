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
  TreePine
} from 'lucide-react';
import { RealProperty } from '@/data/realProperties';
import { formatPrice } from '@/data/realProperties';

interface RealPropertyCardProps {
  property: RealProperty;
  onViewDetails?: (property: RealProperty) => void;
}

const RealPropertyCard: React.FC<RealPropertyCardProps> = ({ property, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
          alt={property.name}
          className="w-full h-full object-cover"
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
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Price and Title */}
        <div className="mb-4">
          <div className="text-2xl font-bold text-primary mb-1">
            {formatPrice(property.price)}
          </div>
          <h3 className="text-xl font-serif font-bold text-primary leading-tight">
            {property.name}
          </h3>
        </div>

        {/* Layout and Size */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Home size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">{property.layout}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-secondary">
            <span>Land: {property.landArea}m² ({property.landAreaTsubo}坪)</span>
            <span>Floor: {property.floorArea}m² ({property.floorAreaTsubo}坪)</span>
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
                <span className="text-xs">({station.distance}, {station.timeByCar})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Age and Structure */}
        <div className="mb-4 flex items-center justify-between text-sm text-secondary">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>Built {property.completion.year} ({property.age} years old)</span>
          </div>
          <div className="flex items-center space-x-2">
            <Car size={16} />
            <span>{property.parking.spaces} parking</span>
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
                {feature}
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
              <span className="text-sm font-medium text-green-800">Projected ROI</span>
              <span className="text-lg font-bold text-green-800">{property.investment.roi}%</span>
            </div>
          </div>
        )}

        {/* Expandable Details */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between py-2 text-primary hover:text-primary/80 transition-colors"
        >
          <span className="font-medium">View Details</span>
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
              <h4 className="font-semibold text-primary mb-2">Structure</h4>
              <p className="text-sm text-foreground">{property.structure}</p>
            </div>

            {/* Recent Renovations */}
            {property.renovations && (
              <div className="mb-4">
                <h4 className="font-semibold text-primary mb-2">Recent Renovations ({property.renovations.date})</h4>
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
                <h4 className="font-semibold text-primary mb-2">Highlights</h4>
                <ul className="space-y-2">
                  {property.highlights.map((highlight, index) => (
                    <li key={index} className="text-sm text-foreground flex items-start space-x-2">
                      <Star size={12} className="text-accent mt-1 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lifestyle & Services */}
            {property.lifestyle && (
              <div className="mb-4">
                <h4 className="font-semibold text-primary mb-2">Lifestyle & Services</h4>
                <div className="space-y-2">
                  {property.lifestyle.community && (
                    <div>
                      <span className="text-xs font-medium text-secondary">Community:</span>
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
                      <span className="text-xs font-medium text-secondary">Amenities:</span>
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
            View Details
          </button>
          <button className="px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary/5 transition-colors font-medium">
            Contact
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RealPropertyCard;


