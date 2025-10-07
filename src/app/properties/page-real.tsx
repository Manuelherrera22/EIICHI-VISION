'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyMap from '@/components/map/PropertyMap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Map, 
  List, 
  Filter, 
  Search, 
  Heart, 
  Eye, 
  MapPin, 
  Calendar,
  Users,
  TrendingUp,
  Star,
  Phone,
  Mail
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllRealProperties, realPropertiesStats, type RealProperty } from '@/lib/data/real-properties';

// Simple Button component
const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'sm' | 'lg' | 'default';
}> = ({ children, onClick, className = '', variant = 'default', size = 'default' }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    default: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Simple Badge component
const Badge: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'secondary';
}> = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    secondary: 'bg-purple-100 text-purple-800',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Simple Card components
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// Simple Tabs components
const Tabs: React.FC<{ children: React.ReactNode; value: string; onValueChange: (value: string) => void; className?: string }> = 
  ({ children, value, onValueChange, className = '' }) => (
    <div className={className}>
      {React.Children.map(children, child => 
        React.cloneElement(child as React.ReactElement, { value, onValueChange })
      )}
    </div>
  );

const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`flex space-x-1 bg-gray-100 p-1 rounded-lg ${className}`}>
    {children}
  </div>
);

const TabsTrigger: React.FC<{ 
  children: React.ReactNode; 
  value: string; 
  className?: string;
}> = ({ children, value, className = '' }) => (
  <button className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${className}`}>
    {children}
  </button>
);

const TabsContent: React.FC<{ 
  children: React.ReactNode; 
  value: string; 
  className?: string;
}> = ({ children, value, className = '' }) => (
  <div className={className}>
    {children}
  </div>
);

// Format price in JPY
const formatPriceJPY = (price: number): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const PropertiesPage: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<RealProperty | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [properties, setProperties] = useState<RealProperty[]>(getAllRealProperties());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const { t } = useLanguage();

  // Estadísticas reales
  const stats = realPropertiesStats;

  // Filter properties based on search and filters
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handlePropertySelect = (property: RealProperty) => {
    setSelectedProperty(property);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('tabiji_properties')}</h1>
              <p className="text-gray-600 mt-1">{t('discover_your_opportunity_in_japan')}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                onClick={() => setViewMode('map')}
              >
                <Map className="h-4 w-4 mr-2" />
                {t('map_view')}
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4 mr-2" />
                {t('list_view')}
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">{t('total_properties')}</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">{t('total_value')}</p>
                  <p className="text-2xl font-bold text-gray-900">¥{(stats.totalValue / 1000000).toFixed(0)}M</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">{t('avg_price')}</p>
                  <p className="text-2xl font-bold text-gray-900">¥{(stats.averagePrice / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">{t('featured')}</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.featured}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('search_properties_by_name_or_location')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('all_types')}</option>
              <option value="akiya">Akiya (Vacant House)</option>
              <option value="mansion">Mansion</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
              <option value="renovation">Renovation</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              {t('more_filters')}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 lg:h-[600px]">
              <PropertyMap
                properties={filteredProperties}
                onSelectProperty={handlePropertySelect}
                selectedPropertyId={selectedProperty?.id}
              />
            </div>
          </div>

          {/* Property List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 lg:h-[600px] overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{t('tabiji_properties')}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {t('showing_results', { count: filteredProperties.length })}
                </p>
              </div>
              
              <div className="overflow-y-auto h-full">
                {filteredProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      selectedProperty?.id === property.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handlePropertySelect(property)}
                  >
                    <div className="relative mb-3">
                      <img
                        src={property.images[0]}
                        alt={property.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      {property.isSponsored && (
                        <Badge variant="secondary" className="absolute top-2 left-2">
                          {t('sponsored')}
                        </Badge>
                      )}
                      {property.isFeatured && (
                        <Badge className="absolute top-2 right-2 bg-yellow-100 text-yellow-800">
                          ⭐ {t('featured')}
                        </Badge>
                      )}
                      <button className="absolute bottom-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
                        <Heart className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-1">{property.name}</h4>
                    <p className="text-lg font-bold text-blue-600 mb-2">
                      {formatPriceJPY(property.price)}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location.city}, {property.location.prefecture}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="capitalize">{property.type}</span>
                      {property.builtYear > 0 && (
                        <span> • {t('built_in_year', { year: property.builtYear })}</span>
                      )}
                      {property.size > 0 && (
                        <span> • {property.size}m²</span>
                      )}
                      {property.bedrooms && (
                        <span> • {property.bedrooms} {t('bedrooms')}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {property.views.toLocaleString()} {t('views')}
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {property.likes} {t('likes')}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Property Details Modal */}
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedProperty.name}</h2>
                    <p className="text-gray-600">{selectedProperty.location.address}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Images */}
                  <div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {selectedProperty.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedProperty.name} ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <div className="mb-4">
                      <h3 className="text-3xl font-bold text-blue-600 mb-2">
                        {formatPriceJPY(selectedProperty.price)}
                      </h3>
                      <div className="flex space-x-2 mb-4">
                        <Badge variant="secondary" className="capitalize">
                          {selectedProperty.type}
                        </Badge>
                        {selectedProperty.isSponsored && (
                          <Badge variant="secondary">{t('sponsored')}</Badge>
                        )}
                        {selectedProperty.isFeatured && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            ⭐ {t('featured')}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium">{selectedProperty.size}m²</span>
                      </div>
                      {selectedProperty.bedrooms && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bedrooms:</span>
                          <span className="font-medium">{selectedProperty.bedrooms}</span>
                        </div>
                      )}
                      {selectedProperty.bathrooms && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bathrooms:</span>
                          <span className="font-medium">{selectedProperty.bathrooms}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Built Year:</span>
                        <span className="font-medium">{selectedProperty.builtYear || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Condition:</span>
                        <span className="font-medium capitalize">{selectedProperty.condition}</span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="border-t pt-4 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm">{selectedProperty.contactInfo.agent}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm">{selectedProperty.contactInfo.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm">{selectedProperty.contactInfo.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Investment Info */}
                    {selectedProperty.investment && (
                      <div className="border-t pt-4 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Investment Potential</h4>
                        <div className="space-y-2">
                          {selectedProperty.investment.rentalPotential && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Rental Potential:</span>
                              <span className="font-medium">
                                {formatPriceJPY(selectedProperty.investment.rentalPotential)}/month
                              </span>
                            </div>
                          )}
                          {selectedProperty.investment.roi && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Expected ROI:</span>
                              <span className="font-medium">{selectedProperty.investment.roi}%/year</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <Button className="w-full" size="lg">
                      {t('schedule_consultation')}
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProperty.description}</p>
                </div>

                {/* Features */}
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.features.map((feature, index) => (
                      <Badge key={index}>{feature}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('ready_to_invest_in_japan')}</h2>
          <p className="text-xl mb-8">{t('join_hundreds_of_successful_investors')}</p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              {t('schedule_consultation')}
            </Button>
            <Button variant="outline" size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              {t('download_guide')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;

