'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Layout from '@/components/Layout';
import PropertyMap from '@/components/map/PropertyMap';
import { 
  Search, 
  Heart, 
  MapPin, 
  Filter,
  Grid,
  List,
  Map as MapIcon,
  X,
  Phone,
  Calendar,
  Share2,
  Bookmark,
  TrendingUp,
  Home,
  Building2,
  CheckCircle,
  Zap
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { realProperties, type RealProperty, formatPrice } from '@/data/realProperties';
import { getMapProperties } from '@/lib/data/property-map-converter';

// Modern Button component
const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}> = ({ children, onClick, className = '', variant = 'primary', size = 'md', disabled = false }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 focus:ring-gray-500 shadow-md hover:shadow-lg',
    outline: 'border-2 border-blue-600 text-blue-600 bg-white hover:bg-blue-50 focus:ring-blue-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Modern Badge component
const Badge: React.FC<{
  children: React.ReactNode;
  className?: string;
  variant?: 'success' | 'info' | 'warning' | 'error' | 'premium' | 'featured';
}> = ({ children, className = '', variant = 'info' }) => {
  const variants = {
    success: 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-sm',
    info: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300 shadow-sm',
    warning: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300 shadow-sm',
    error: 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300 shadow-sm',
    premium: 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300 shadow-sm',
    featured: 'bg-gradient-to-r from-yellow-100 to-orange-200 text-orange-800 border border-orange-300 shadow-sm',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const PropertiesPage: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<RealProperty | null>(null);
  const [properties] = useState<RealProperty[]>(realProperties);
  const [mapProperties] = useState(getMapProperties(realProperties));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('map');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { t } = useLanguage();

  // Calculate stats
  const stats = {
    total: properties.length,
    available: properties.filter(p => p.status === 'available').length,
    featured: properties.filter(p => p.isFeatured).length,
    totalValue: properties.reduce((sum, p) => sum + p.price, 0),
    averagePrice: properties.reduce((sum, p) => sum + p.price, 0) / properties.length,
    highROI: properties.filter(p => p.roi > 8).length,
  };

  // Filter and sort properties
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    return b.price - a.price; // Sort by price descending
  });

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      }
      return [...prev, propertyId];
    });
  };

  return (
    <Layout>
      {/* Hero Section - Simplified */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
            >
              {t('tabiji_properties')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-blue-100 mb-8 font-light"
            >
              {t('discover_your_opportunity_in_japan')}
            </motion.p>
            
            {/* Simple Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center space-x-8 mb-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">{stats.total}</div>
                <div className="text-sm text-blue-300">{t('properties.title')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">{stats.available}</div>
                <div className="text-sm text-blue-300">{t('properties.available')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-200">{stats.featured}</div>
                <div className="text-sm text-blue-300">{t('properties.featured')}</div>
              </div>
            </motion.div>

            {/* Simple Search */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder={t('properties.search')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-0 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none bg-white text-gray-900 placeholder-gray-500"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {t('properties.filters')}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content - Map with Sidebar */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 h-[75vh]">
          {/* Map Section - Takes most of the space */}
          <div className="flex-1 h-[50vh] lg:h-full">
            <div className="h-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              <PropertyMap
                properties={mapProperties}
                onSelectProperty={setSelectedProperty}
                selectedPropertyId={selectedProperty?.id}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Properties Sidebar */}
          <div className="w-full lg:w-96 h-[25vh] lg:h-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Sidebar Header */}
            <div className="p-4 lg:p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between mb-2 lg:mb-4">
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                    {t('properties.title')}
                  </h2>
                  <p className="text-xs lg:text-sm text-gray-600">
                    {sortedProperties.length} {t('properties.found')}
                  </p>
                </div>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-2 lg:px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List className="w-3 h-3 mr-1 inline" />
                    <span className="hidden sm:inline">{t('properties.list')}</span>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-2 lg:px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid className="w-3 h-3 mr-1 inline" />
                    <span className="hidden sm:inline">{t('properties.grid')}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Properties List */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {viewMode === 'list' && (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-2 lg:p-4 space-y-2 lg:space-y-3"
                  >
                    {sortedProperties.map((property, index) => (
                      <motion.div
                        key={property.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group cursor-pointer rounded-xl border-2 transition-all duration-200 ${
                          selectedProperty?.id === property.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                        onClick={() => setSelectedProperty(property)}
                      >
                        <div className="p-2 lg:p-4">
                          <div className="flex gap-3">
                            <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=center'}
                                alt={property.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-1 left-1">
                                {(property as any).isFeatured && (
                                  <Badge variant="featured" className="text-xs px-1 py-0.5">★</Badge>
                                )}
                                {(property as any).isSponsored && (
                                  <Badge variant="premium" className="text-xs px-1 py-0.5">●</Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors truncate">
                                {property.name}
                              </h3>
                              <div className="flex items-center text-gray-600 text-xs mt-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span className="truncate">{property.location.address}</span>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <div className="text-lg font-bold text-blue-600">
                                  {formatPrice(property.price)}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  <span>{property.investment?.roi || 8}%</span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center space-x-3 text-xs text-gray-500">
                                  <div className="flex items-center">
                                    <Home className="w-3 h-3 mr-1" />
                                    <span>{property.floorArea}m²</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Building2 className="w-3 h-3 mr-1" />
                                    <span>{property.age} {t('years')}</span>
                                  </div>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(property.id);
                                  }}
                                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                                >
                                  <Heart 
                                    className={`w-3 h-3 ${
                                      favorites.includes(property.id) 
                                        ? 'text-red-500 fill-current' 
                                        : 'text-gray-400'
                                    }`} 
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {viewMode === 'grid' && (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-2 lg:p-4 space-y-2 lg:space-y-3"
                  >
                    {sortedProperties.map((property, index) => (
                      <motion.div
                        key={property.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`group cursor-pointer rounded-xl border-2 transition-all duration-200 ${
                          selectedProperty?.id === property.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                        onClick={() => setSelectedProperty(property)}
                      >
                        <div className="relative h-32 rounded-t-xl overflow-hidden">
                          <Image
                            src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=center'}
                            alt={property.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                                {(property as any).isFeatured && (
                                  <Badge variant="featured" className="text-xs px-1 py-0.5">★</Badge>
                                )}
                                {(property as any).isSponsored && (
                                  <Badge variant="premium" className="text-xs px-1 py-0.5">●</Badge>
                                )}
                              </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(property.id);
                            }}
                            className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                          >
                            <Heart 
                              className={`w-3 h-3 ${
                                favorites.includes(property.id) 
                                  ? 'text-red-500 fill-current' 
                                  : 'text-gray-600'
                              }`} 
                            />
                          </button>
                        </div>
                        
                        <div className="p-2 lg:p-3">
                          <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors mb-1">
                            {property.name}
                          </h3>
                          <div className="flex items-center text-gray-600 text-xs mb-2">
                            <MapPin className="w-3 h-3 mr-1" />
                            <span className="truncate">{property.location.address}</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-lg font-bold text-blue-600">
                              {formatPrice(property.price)}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              <span>{property.investment.roi || 8}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <Home className="w-3 h-3 mr-1" />
                              <span>{property.floorArea}m²</span>
                            </div>
                            <div className="flex items-center">
                              <Building2 className="w-3 h-3 mr-1" />
                              <span>{property.age} {t('years')}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Property Details Modal */}
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProperty(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedProperty.name}</h2>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{selectedProperty.location.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleFavorite(selectedProperty.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Heart 
                        className={`w-5 h-5 ${
                          favorites.includes(selectedProperty.id) 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </button>
                    <button
                      onClick={() => setSelectedProperty(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="p-6">
                  {/* Image Gallery */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                      <Image
                        src={selectedProperty.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=center'}
                        alt={selectedProperty.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="text-3xl font-bold text-blue-600">
                        {formatPrice(selectedProperty.price)}
                      </div>
                      <div className="text-lg text-gray-600">
                        ¥{selectedProperty.price.toLocaleString()}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-gray-600">
                          <Home className="w-5 h-5 mr-2" />
                          <span>{selectedProperty.floorArea}m²</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Building2 className="w-5 h-5 mr-2" />
                          <span>{selectedProperty.age} {t('years')}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        <span>{t('estimated_roi')}: {selectedProperty.investment.roi || 8}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">{t('properties.characteristics')}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>{t('built_area')}:</span>
                          <span>{selectedProperty.floorArea}m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('land_area')}:</span>
                          <span>{selectedProperty.landArea}m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('construction')}:</span>
                          <span>{selectedProperty.completion?.year || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('type')}:</span>
                          <span>{selectedProperty.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">{t('investment_potential')}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>ROI:</span>
                          <span className="text-green-600 font-semibold">{selectedProperty.investment?.roi || 8}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('rental_potential')}:</span>
                          <span>{selectedProperty.investment?.rentalPotential || t('high')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('appreciation')}:</span>
                          <span className="text-green-600">{selectedProperty.investment?.appreciation || '+8% ' + t('annual')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">{t('access')}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        {selectedProperty.access?.stations?.map((station, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{t('station')} {index + 1}:</span>
                            <span>{station.name} - {station.distance}</span>
                          </div>
                        )) || (
                          <div className="flex justify-between">
                            <span>{t('station')}:</span>
                            <span>{t('info_not_available')}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>{t('structure')}:</span>
                          <span>{selectedProperty.structure || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t('parking')}:</span>
                          <span>{selectedProperty.parking?.spaces || 0} {t('spaces')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('properties.featuredCharacteristics')}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(selectedProperty.features || []).map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Renovations */}
                  {selectedProperty.renovations && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Renovaciones Recomendadas</h3>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-gray-900">Renovaciones Realizadas</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Fecha: {selectedProperty.renovations.date}
                        </p>
                        <div className="text-sm text-gray-700">
                          <strong>Items renovados:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {(selectedProperty.renovations.items || []).map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="primary" size="lg" className="flex-1">
                      <Phone className="w-5 h-5 mr-2" />
                      {t('contact_agent')}
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      <Calendar className="w-5 h-5 mr-2" />
                      {t('schedule_visit')}
                    </Button>
                    <Button variant="secondary" size="lg">
                      <Share2 className="w-5 h-5 mr-2" />
                      {t('share')}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default PropertiesPage;