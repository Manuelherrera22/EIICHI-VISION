'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Filter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Simple Button component
const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'secondary';
  size?: 'sm';
}> = ({ children, onClick, className = '', variant = 'secondary', size = 'sm' }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
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

interface PropertyMapProps {
  properties: any[];
  onSelectProperty?: (property: any) => void;
  selectedPropertyId?: string;
  className?: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  onSelectProperty,
  selectedPropertyId,
  className = ''
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapStyle, setMapStyle] = useState('mapbox://styles/mapbox/streets-v12');
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Set Mapbox access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoibWFudWVsZmVsaXBlaGVycmVyYSIsImEiOiJjbWdlanRpNnUwcmpwMmpwdmVxZTYzaHk3In0.qWh6Dvib5HrcHE9PRvn6lw';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [138.5317, 36.5208], // Tsumagoi Village coordinates
      zoom: 9, // Zoom más cercano para ver mejor las propiedades
      maxZoom: 18,
      minZoom: 5
    });

    map.current.on('load', () => {
      setIsLoaded(true);
      addPropertyMarkers();
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapStyle]);

  // Add property markers to map with improved organization
  const addPropertyMarkers = () => {
    if (!map.current || !isLoaded) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Group properties by proximity for better organization
    const groupedProperties = groupPropertiesByProximity(properties);

    groupedProperties.forEach((group, index) => {
      if (group.length === 1) {
        // Single property - show individual marker
        addSinglePropertyMarker(group[0]);
      } else {
        // Multiple properties - show cluster marker
        addClusterMarker(group, index);
      }
    });
  };

  // Group properties by proximity (within 100m)
  const groupPropertiesByProximity = (props: any[]) => {
    const groups: any[][] = [];
    const processed = new Set<string>();

    props.forEach(property => {
      if (processed.has(property.id)) return;

      const group = [property];
      processed.add(property.id);

      // Find nearby properties
      props.forEach(otherProperty => {
        if (processed.has(otherProperty.id)) return;
        
        const distance = calculateDistance(
          property.location.lat, property.location.lng,
          otherProperty.location.lat, otherProperty.location.lng
        );

        if (distance < 0.001) { // ~100m
          group.push(otherProperty);
          processed.add(otherProperty.id);
        }
      });

      groups.push(group);
    });

    return groups;
  };

  // Calculate distance between two points
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  // Add single property marker
  const addSinglePropertyMarker = (property: any) => {
    const el = document.createElement('div');
    el.className = 'property-marker';
    
    // Determine marker color based on property category
    const getMarkerColor = (category: string) => {
      switch (category) {
        case 'luxury': return '#8b5cf6';
        case 'traditional': return '#f59e0b';
        case 'renovated': return '#10b981';
        case 'villa': return '#3b82f6';
        default: return '#6b7280';
      }
    };

    el.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${getMarkerColor(property.category)}, ${getMarkerColor(property.category)}dd);
      border: 3px solid white;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(0,0,0,0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      color: white;
      z-index: 1000;
      position: relative;
    `;

    // Add property icon based on category
    const getPropertyIcon = (category: string) => {
      switch (category) {
        case 'luxury': return '🏰';
        case 'traditional': return '🏯';
        case 'renovated': return '🏠';
        case 'villa': return '🏡';
        default: return '🏠';
      }
    };

    el.innerHTML = `<div style="font-size: 20px;">${getPropertyIcon(property.category)}</div>`;

    // Add hover effects
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.3)';
      el.style.boxShadow = '0 12px 30px rgba(0,0,0,0.4)';
      el.style.zIndex = '1001';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
      el.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
      el.style.zIndex = '1000';
    });

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('Marker clicked:', property.name);
      
      onSelectProperty?.(property);
      
      map.current?.flyTo({
        center: [property.location.lng, property.location.lat],
        zoom: 14,
        duration: 1500,
        essential: true
      });
    });

    const marker = new mapboxgl.Marker(el)
      .setLngLat([property.location.lng, property.location.lat])
      .addTo(map.current);

    markers.current.push(marker);
  };

  // Add cluster marker for multiple properties
  const addClusterMarker = (properties: any[], index: number) => {
    const el = document.createElement('div');
    el.className = 'cluster-marker';
    
    el.style.cssText = `
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ef4444, #dc2626);
      border: 4px solid white;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      color: white;
      z-index: 1000;
      position: relative;
    `;

    el.innerHTML = `<div style="font-size: 18px;">${properties.length}</div>`;

    // Add hover effects
    el.addEventListener('mouseenter', () => {
      el.style.transform = 'scale(1.2)';
      el.style.boxShadow = '0 15px 35px rgba(0,0,0,0.5)';
      el.style.zIndex = '1001';
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'scale(1)';
      el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
      el.style.zIndex = '1000';
    });

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      console.log('Cluster clicked:', properties.length, 'properties');
      
      // Calculate center of cluster
      const centerLat = properties.reduce((sum, p) => sum + p.location.lat, 0) / properties.length;
      const centerLng = properties.reduce((sum, p) => sum + p.location.lng, 0) / properties.length;
      
      map.current?.flyTo({
        center: [centerLng, centerLat],
        zoom: 12,
        duration: 1500,
        essential: true
      });
    });

    // Calculate center of cluster
    const centerLat = properties.reduce((sum, p) => sum + p.location.lat, 0) / properties.length;
    const centerLng = properties.reduce((sum, p) => sum + p.location.lng, 0) / properties.length;

    const marker = new mapboxgl.Marker(el)
      .setLngLat([centerLng, centerLat])
      .addTo(map.current);

    markers.current.push(marker);
  };

  // Update markers when properties change
  useEffect(() => {
    if (isLoaded) {
      addPropertyMarkers();
    }
  }, [properties, isLoaded]);

  // Fly to selected property
  useEffect(() => {
    if (selectedPropertyId && map.current) {
      const selectedProperty = properties.find(p => p.id === selectedPropertyId);
      if (selectedProperty) {
        console.log('Flying to property:', selectedProperty.name, selectedProperty.location);
        map.current.flyTo({
          center: [selectedProperty.location.lng, selectedProperty.location.lat],
          zoom: 12,
          duration: 1500,
          essential: true
        });
      }
    }
  }, [selectedPropertyId, properties]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full rounded-lg" />

      {/* Map Controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white shadow-lg hover:bg-gray-50"
        >
          <Filter className="w-4 h-4 mr-2" />
          {t('filters')}
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setMapStyle(mapStyle === 'mapbox://styles/mapbox/streets-v12' 
            ? 'mapbox://styles/mapbox/satellite-streets-v12' 
            : 'mapbox://styles/mapbox/streets-v12'
          )}
          className="bg-white shadow-lg hover:bg-gray-50"
        >
          {mapStyle.includes('satellite') ? t('street_view') : t('satellite_view')}
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            if (map.current) {
              map.current.flyTo({
                center: [138.5317, 36.5208],
                zoom: 9,
                duration: 1500,
                essential: true
              });
            }
          }}
          className="bg-white shadow-lg hover:bg-gray-50"
        >
          🏠 {t('properties.viewAll')}
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-10">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm">{t('property_types')}</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span>{t('property_type_luxury')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span>{t('property_type_traditional')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>{t('property_type_renovated')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span>{t('property_type_villa')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>{t('property_type_cluster')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;