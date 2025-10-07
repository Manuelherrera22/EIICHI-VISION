'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyMap from '@/components/map/PropertyMap';
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
  Star
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
    secondary: 'bg-blue-100 text-blue-800',
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Simple Card component
const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

// Mock data - will be replaced with real data from Supabase
const mockProperties = [
  {
    id: '1',
    name: 'Traditional Kusatsu Retreat',
    price: 35000000,
    currency: 'JPY',
    location: {
      lat: 36.6188,
      lng: 138.5905,
      address: 'Kusatsu, Gunma Prefecture',
      prefecture: 'Gunma'
    },
    images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'],
    builtYear: 1962,
    views: 2255,
    likes: 46,
    type: 'akiya' as const,
    size: 120,
    bedrooms: 4,
    bathrooms: 2,
    isSponsored: true
  },
  {
    id: '2',
    name: 'Modern Apartment in Maebashi',
    price: 28000000,
    currency: 'JPY',
    location: {
      lat: 36.3911,
      lng: 139.0608,
      address: 'Maebashi, Gunma Prefecture',
      prefecture: 'Gunma'
    },
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'],
    builtYear: 1902,
    views: 36987,
    likes: 440,
    type: 'commercial' as const,
    size: 80,
    bedrooms: 2,
    bathrooms: 1,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Scenic Land Plot in Minakami',
    price: 15000000,
    currency: 'JPY',
    location: {
      lat: 36.6769,
      lng: 139.0315,
      address: 'Minakami, Gunma Prefecture',
      prefecture: 'Gunma'
    },
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'],
    builtYear: 0,
    views: 1234,
    likes: 89,
    type: 'land' as const,
    size: 300
  },
  {
    id: '4',
    name: 'Traditional House in Takasaki',
    price: 22000000,
    currency: 'JPY',
    location: {
      lat: 36.3229,
      lng: 139.0030,
      address: 'Takasaki, Gunma Prefecture',
      prefecture: 'Gunma'
    },
    images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop'],
    builtYear: 1975,
    views: 4567,
    likes: 123,
    type: 'renovation' as const,
    size: 95,
    bedrooms: 3,
    bathrooms: 1
  },
  {
    id: '5',
    name: 'Commercial Space in Tokyo',
    price: 85000000,
    currency: 'JPY',
    location: {
      lat: 35.6762,
      lng: 139.6503,
      address: 'Shibuya, Tokyo',
      prefecture: 'Tokyo'
    },
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'],
    builtYear: 1995,
    views: 15678,
    likes: 567,
    type: 'commercial' as const,
    size: 200
  }
];

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
    const matchesType = filterType === 'all' || property.type === filterType;
    return matchesSearch && matchesType;
  });

  const handlePropertySelect = (property: any) => {
    setSelectedProperty(property);
  };

  const handlePropertyLike = (propertyId: string) => {
    setProperties(prev => prev.map(prop => 
      prop.id === propertyId 
        ? { ...prop, likes: prop.likes + 1 }
        : prop
    ));
  };

  const getPropertyStats = () => {
    return {
      total: properties.length,
      totalValue: properties.reduce((sum, prop) => sum + prop.price, 0),
      avgPrice: properties.reduce((sum, prop) => sum + prop.price, 0) / properties.length,
      featured: properties.filter(p => p.isFeatured).length,
      sponsored: properties.filter(p => p.isSponsored).length
    };
  };

  const stats = getPropertyStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {t('tabiji_properties')}
              </h1>
              <p className="text-sm text-gray-600">
                {t('discover_your_opportunity_in_japan')}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  <Map className="w-4 h-4 mr-2" />
                  {t('map_view')}
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4 mr-2" />
                  {t('list_view')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('total_properties')}</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('total_value')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ¥{(stats.totalValue / 1000000).toFixed(0)}M
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('avg_price')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ¥{(stats.avgPrice / 1000000).toFixed(1)}M
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('featured')}</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.featured}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('search_properties_by_name_or_location')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('all_types')}</option>
              <option value="akiya">{t('property_type_akiya')}</option>
              <option value="commercial">{t('property_type_commercial')}</option>
              <option value="land">{t('property_type_land')}</option>
              <option value="renovation">{t('property_type_renovation')}</option>
            </select>
            
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              {t('more_filters')}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {viewMode === 'map' ? (
            <div className="h-[600px]">
              <PropertyMap
                properties={filteredProperties}
                selectedProperty={selectedProperty}
                onPropertySelect={handlePropertySelect}
                onPropertyLike={handlePropertyLike}
              />
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="cursor-pointer"
                    onClick={() => handlePropertySelect(property)}
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        {property.isSponsored && (
                          <Badge className="absolute top-2 left-2 bg-gray-800 text-white z-10">
                            {t('sponsored')}
                          </Badge>
                        )}
                        {property.isFeatured && (
                          <div className="absolute top-2 left-2 w-3 h-3 bg-red-500 rounded-full z-10" />
                        )}
                        <img
                          src={property.images[0] || '/images/placeholder-property.jpg'}
                          alt={property.name}
                          className="w-full h-48 object-cover"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePropertyLike(property.id);
                          }}
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg text-purple-600">
                            ¥{(property.price / 1000000).toFixed(1)}M
                          </h3>
                          <Badge variant="secondary">
                            {t(`property_type_${property.type}`)}
                          </Badge>
                        </div>
                        
                        <h4 className="font-medium text-gray-900 mb-1">
                          {property.name}
                        </h4>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{property.location.address}</span>
                        </div>
                        
                        <div className="text-sm text-gray-500 mb-3">
                          {property.builtYear > 0 && `${t('built_in')} ${property.builtYear}`}
                          {property.builtYear > 0 && ' • '}
                          {property.size}m²
                          {property.bedrooms && ` • ${property.bedrooms} ${t('bedrooms')}`}
                          {property.bathrooms && ` • ${property.bathrooms} ${t('bathrooms')}`}
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            <span>{property.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            <span>{property.likes}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {t('ready_to_invest_in_japan')}
          </h2>
          <p className="text-lg mb-6 opacity-90">
            {t('join_hundreds_of_successful_investors')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              {t('schedule_consultation')}
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              {t('download_guide')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;
