'use client';

import React from 'react';
import GoogleMap from './GoogleMap';
import { MAPS_CONFIG } from '@/config/maps';

const MapTest = () => {
  return (
    <div className="p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-primary mb-6 text-center">
          Mapa de Gunma - Google Maps
        </h2>
        
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">✅ API Key Configurada</h3>
          <p className="text-sm text-green-700">
            API Key: {MAPS_CONFIG.GOOGLE_API_KEY.substring(0, 10)}...
          </p>
        </div>

        <GoogleMap
          center={MAPS_CONFIG.LOCATIONS.KUSATSU}
          zoom={10}
          markers={[
            {
              position: MAPS_CONFIG.LOCATIONS.KUSATSU,
              title: 'Kusatsu Onsen',
              info: 'Famosos baños termales de Kusatsu, reconocidos mundialmente por sus propiedades curativas.'
            },
            {
              position: MAPS_CONFIG.LOCATIONS.TOKYO,
              title: 'Tokio',
              info: 'Capital de Japón - 3 horas en tren desde Kusatsu'
            },
            {
              position: MAPS_CONFIG.LOCATIONS.NAGANO,
              title: 'Nagano',
              info: 'Ciudad histórica - 1 hora en tren desde Kusatsu'
            }
          ]}
          className="h-96 lg:h-[500px]"
        />
        
        <div className="mt-6 text-center">
          <p className="text-sm text-secondary">
            Si el mapa no carga, verifica que la API key tenga permisos para Maps JavaScript API
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapTest;
