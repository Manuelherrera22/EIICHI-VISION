'use client';

import React, { useState } from 'react';
import { Eye, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface VirtualTourProps {
  propertyId: string;
  className?: string;
}

const VirtualTour: React.FC<VirtualTourProps> = ({ propertyId, className = '' }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(0);
  const { t } = useLanguage();

  const rooms = [
    {
      name: 'Entrada Principal',
      image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
      description: 'Entrada tradicional japonesa con genkan'
    },
    {
      name: 'Sala Principal',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Sala de tatami con vistas al jardín'
    },
    {
      name: 'Cocina Moderna',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: 'Cocina completamente equipada'
    },
    {
      name: 'Jardín Zen',
      image: 'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
      description: 'Jardín tradicional con elementos zen'
    }
  ];

  const nextRoom = () => {
    setCurrentRoom((prev) => (prev + 1) % rooms.length);
  };

  const prevRoom = () => {
    setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main Tour Container */}
      <div className={`relative bg-black rounded-2xl overflow-hidden shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-96 lg:h-[500px]'
      }`}>
        {/* 360° View */}
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
            style={{ backgroundImage: `url(${rooms[currentRoom].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          {/* Room Info Overlay */}
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-serif font-bold mb-1">{rooms[currentRoom].name}</h3>
            <p className="text-sm opacity-90">{rooms[currentRoom].description}</p>
          </div>

          {/* Navigation Controls */}
          <div className="absolute bottom-6 right-6 flex space-x-2">
            <button
              onClick={prevRoom}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <RotateCcw size={20} className="text-white" />
            </button>
            <button
              onClick={nextRoom}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <RotateCcw size={20} className="text-white rotate-180" />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
          >
            {isFullscreen ? <Minimize2 size={20} className="text-white" /> : <Maximize2 size={20} className="text-white" />}
          </button>

          {/* Room Indicators */}
          <div className="absolute top-6 left-6 flex space-x-2">
            {rooms.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentRoom(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentRoom ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Interactive Hotspots */}
          <div className="absolute inset-0">
            {/* Hotspot 1 - Kitchen */}
            <button className="absolute top-1/2 left-1/4 w-4 h-4 bg-accent rounded-full animate-pulse hover:scale-125 transition-transform duration-300">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Cocina
              </div>
            </button>
            
            {/* Hotspot 2 - Garden */}
            <button className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-accent rounded-full animate-pulse hover:scale-125 transition-transform duration-300">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                Jardín
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Room Thumbnails */}
      {!isFullscreen && (
        <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
          {rooms.map((room, index) => (
            <button
              key={index}
              onClick={() => setCurrentRoom(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentRoom ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-80'
              }`}
            >
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${room.image})` }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Tour Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Eye size={20} className="text-primary" />
          <span className="text-sm font-medium text-primary">Tour Virtual 360°</span>
        </div>
        
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm">
            Reservar Visita
          </button>
          <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-200 text-sm">
            {t('virtualTour.moreInfo')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
