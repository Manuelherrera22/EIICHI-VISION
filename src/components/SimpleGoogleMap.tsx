'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MAPS_CONFIG } from '@/config/maps';

interface SimpleGoogleMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title: string;
    info?: string;
  }>;
  className?: string;
}

const SimpleGoogleMap: React.FC<SimpleGoogleMapProps> = ({ center, zoom, markers = [], className = '' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: MAPS_CONFIG.GOOGLE_API_KEY,
          version: 'weekly',
          libraries: ['places']
        });

        const google = await loader.load();
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center,
            zoom,
            styles: MAPS_CONFIG.STYLES,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_BOTTOM
            }
          });

          setMap(mapInstance);
          setIsLoaded(true);

          // Add markers
          markers.forEach((marker) => {
            const markerInstance = new google.maps.Marker({
              position: marker.position,
              map: mapInstance,
              title: marker.title,
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#1A365D"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(24, 24),
                anchor: new google.maps.Point(12, 24)
              }
            });

            if (marker.info) {
              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div style="padding: 8px; font-family: Inter, sans-serif;">
                    <h3 style="margin: 0 0 4px 0; color: #1A365D; font-size: 14px; font-weight: 600;">${marker.title}</h3>
                    <p style="margin: 0; color: #4A5568; font-size: 12px;">${marker.info}</p>
                  </div>
                `
              });

              markerInstance.addListener('click', () => {
                infoWindow.open(mapInstance, markerInstance);
              });
            }
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
        setHasError(true);
        setIsLoaded(true);
      }
    };

    initMap();
  }, [center, zoom, markers]);

  return (
    <div className={`relative ${className}`}>
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ minHeight: '400px' }}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-2xl">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm text-secondary">Cargando mapa...</p>
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-2xl">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-primary mb-2">Mapa No Disponible</h3>
            <p className="text-sm text-secondary mb-4">
              Kusatsu se encuentra en la prefectura de Gunma, Japón
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">3h</div>
                <div className="text-xs text-secondary">a Tokio</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">1h</div>
                <div className="text-xs text-secondary">a Nagano</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Distance Info Overlay */}
      <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">3h</div>
            <div className="text-xs text-secondary">a Tokio</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">1h</div>
            <div className="text-xs text-secondary">a Nagano</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleGoogleMap;
