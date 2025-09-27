'use client';

import React, { useState } from 'react';
import GoogleMap from './GoogleMap';
import { MAPS_CONFIG } from '@/config/maps';

interface SmartMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers?: Array<{
    position: { lat: number; lng: number };
    title: string;
    info?: string;
  }>;
  className?: string;
}

const SmartMap: React.FC<SmartMapProps> = ({ center, zoom, markers = [], className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Google Maps Only */}
      <GoogleMap
        center={center}
        zoom={zoom}
        markers={markers}
        className="h-full"
      />
    </div>
  );
};

export default SmartMap;
