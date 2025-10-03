'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  Search, 
  Filter, 
  Info, 
  X, 
  Star,
  Clock,
  Train,
  Car,
  Plane,
  Mountain,
  Waves,
  Building,
  Home,
  Camera,
  Share2,
  Download,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Property {
  id: string;
  name: string;
  position: { lat: number; lng: number };
  price: number;
  size: number;
  rooms: number;
  status: 'available' | 'sold' | 'under-renovation';
  images: string[];
  description: string;
  features: string[];
  distance: {
    tokyo: number;
    airport: number;
    station: number;
  };
}

interface MapMarker {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  info: string;
  type: 'property' | 'landmark' | 'transport';
  icon?: string;
}

interface InteractiveGoogleMapProps {
  properties?: Property[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  showFilters?: boolean;
  onPropertySelect?: (property: Property) => void;
}

const InteractiveGoogleMap: React.FC<InteractiveGoogleMapProps> = ({
  properties = [],
  center = { lat: 36.6211, lng: 138.5925 }, // Kusatsu coordinates
  zoom = 10,
  height = '600px',
  showFilters = true,
  onPropertySelect
}) => {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 50000000],
    status: 'all' as 'all' | 'available' | 'sold' | 'under-renovation',
    propertyType: 'all' as 'all' | 'house' | 'apartment' | 'land'
  });
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  // Sample properties data
  const sampleProperties: Property[] = [
    {
      id: '1',
      name: 'Traditional Kusatsu House',
      position: { lat: 36.6211, lng: 138.5925 },
      price: 8500000,
      size: 120,
      rooms: 4,
      status: 'available',
      images: ['/images/property1.jpg'],
      description: 'Beautiful traditional Japanese house in the heart of Kusatsu',
      features: ['Traditional Architecture', 'Hot Spring Access', 'Mountain View'],
      distance: { tokyo: 150, airport: 120, station: 5 }
    },
    {
      id: '2',
      name: 'Modern Renovated Villa',
      position: { lat: 36.6311, lng: 138.6025 },
      price: 12000000,
      size: 180,
      rooms: 5,
      status: 'under-renovation',
      images: ['/images/property2.jpg'],
      description: 'Recently renovated villa with modern amenities',
      features: ['Modern Kitchen', 'Garden', 'Parking'],
      distance: { tokyo: 155, airport: 125, station: 8 }
    },
    {
      id: '3',
      name: 'Mountain Retreat',
      position: { lat: 36.6111, lng: 138.5825 },
      price: 6500000,
      size: 95,
      rooms: 3,
      status: 'available',
      images: ['/images/property3.jpg'],
      description: 'Cozy mountain retreat perfect for weekend getaways',
      features: ['Mountain View', 'Fireplace', 'Private Garden'],
      distance: { tokyo: 145, airport: 115, station: 12 }
    }
  ];

  // Landmarks and transport markers
  const landmarks: MapMarker[] = [
    {
      id: 'kusatsu-onsen',
      position: { lat: 36.6211, lng: 138.5925 },
      title: t('map.kusatsuOnsen'),
      info: t('map.kusatsuOnsenInfo'),
      type: 'landmark'
    },
    {
      id: 'tokyo',
      position: { lat: 35.6762, lng: 139.6503 },
      title: t('map.tokyo'),
      info: t('map.tokyoInfo'),
      type: 'landmark'
    },
    {
      id: 'narita-airport',
      position: { lat: 35.7720, lng: 140.3928 },
      title: t('map.naritaAirport'),
      info: t('map.naritaAirportInfo'),
      type: 'transport'
    },
    {
      id: 'takasaki-station',
      position: { lat: 36.3227, lng: 139.0039 },
      title: t('map.takasakiStation'),
      info: t('map.takasakiStationInfo'),
      type: 'transport'
    }
  ];

  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>(landmarks);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(sampleProperties);

  // Filter properties based on search and filters
  useEffect(() => {
    let filtered = sampleProperties;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(property => property.status === filters.status);
    }

    // Price filter
    filtered = filtered.filter(property => 
      property.price >= filters.priceRange[0] && 
      property.price <= filters.priceRange[1]
    );

    setFilteredProperties(filtered);
  }, [searchQuery, filters]);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setShowInfoPanel(true);
    onPropertySelect?.(property);
  };

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
    setShowInfoPanel(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-red-100 text-red-800';
      case 'under-renovation': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return t('map.available');
      case 'sold': return t('map.sold');
      case 'under-renovation': return t('map.underRenovation');
      default: return status;
    }
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Map Container */}
      <div 
        ref={mapRef}
        className={`relative bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 ${
          isFullscreen ? 'h-screen' : ''
        }`}
        style={{ height: isFullscreen ? '100vh' : height }}
      >
        {/* Map Placeholder - In a real implementation, this would be Google Maps */}
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 flex items-center justify-center relative">
          {/* Simulated map background */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800"></div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 left-4 z-10 space-y-2">
            {/* Search */}
            {showFilters && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t('map.searchProperties')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-64 text-sm border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Zoom Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-1">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <Navigation size={16} className="text-gray-600 dark:text-gray-400" />
              </button>
              <div className="border-t border-gray-200 dark:border-gray-600"></div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">+</span>
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                <span className="text-sm font-bold text-gray-600 dark:text-gray-400">-</span>
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isFullscreen ? <Minimize2 size={16} className="text-gray-600 dark:text-gray-400" /> : <Maximize2 size={16} className="text-gray-600 dark:text-gray-400" />}
            </button>
          </div>

          {/* Property Markers */}
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${50 + (property.position.lng - center.lng) * 100}%`,
                top: `${50 - (property.position.lat - center.lat) * 100}%`
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePropertyClick(property)}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <Home size={14} className="text-white" />
                </div>
                <div className={`absolute -top-2 -right-2 px-1 py-0.5 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                  {getStatusText(property.status)}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Landmark Markers */}
          {mapMarkers.map((marker) => (
            <motion.div
              key={marker.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${50 + (marker.position.lng - center.lng) * 100}%`,
                top: `${50 - (marker.position.lat - center.lat) * 100}%`
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMarkerClick(marker)}
            >
              <div className="w-6 h-6 bg-accent rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                {marker.type === 'landmark' ? <Star size={12} className="text-white" /> : <Train size={12} className="text-white" />}
              </div>
            </motion.div>
          ))}

          {/* Map Info */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin size={14} />
                <span>{t('map.kusatsuGunma')}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {filteredProperties.length} {t('map.propertiesFound')}
              </div>
            </div>
          </div>
        </div>

        {/* Property List Sidebar */}
        {showFilters && (
          <div className="absolute top-4 right-4 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t('map.properties')} ({filteredProperties.length})
              </h3>
            </div>
            <div className="p-2 space-y-2">
              {filteredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border border-gray-100 dark:border-gray-600"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handlePropertyClick(property)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                      <Home size={20} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {property.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatPrice(property.price)}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                          {getStatusText(property.status)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {property.size}m² • {property.rooms} {t('map.rooms')}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <AnimatePresence>
        {showInfoPanel && (selectedProperty || selectedMarker) && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-4 right-4 w-96 max-h-[calc(100vh-2rem)] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {selectedProperty ? selectedProperty.name : selectedMarker?.title}
              </h3>
              <button
                onClick={() => {
                  setShowInfoPanel(false);
                  setSelectedProperty(null);
                  setSelectedMarker(null);
                }}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X size={16} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-4">
              {selectedProperty ? (
                <div className="space-y-4">
                  {/* Property Image */}
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                    <Camera size={32} className="text-gray-400" />
                  </div>

                  {/* Property Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary dark:text-white">
                        {formatPrice(selectedProperty.price)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedProperty.status)}`}>
                        {getStatusText(selectedProperty.status)}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedProperty.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {selectedProperty.size}m²
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t('map.size')}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {selectedProperty.rooms}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t('map.rooms')}
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {t('map.features')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProperty.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Distances */}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {t('map.distances')}
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Train size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t('map.nearestStation')}: {selectedProperty.distance.station}km
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Plane size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t('map.nearestAirport')}: {selectedProperty.distance.airport}km
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building size={16} className="text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {t('map.tokyo')}: {selectedProperty.distance.tokyo}km
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-4">
                      <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors">
                        {t('map.viewDetails')}
                      </button>
                      <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Share2 size={16} className="text-gray-600 dark:text-gray-400" />
                      </button>
                      <button className="p-2 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Download size={16} className="text-gray-600 dark:text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : selectedMarker ? (
                <div className="space-y-4">
                  <div className="w-full h-32 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                    <MapPin size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedMarker.info}
                  </p>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveGoogleMap;
