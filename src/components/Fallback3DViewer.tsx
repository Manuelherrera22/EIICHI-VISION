'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

const Fallback3DViewer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const resetView = () => {
    setRotation(0);
    setZoom(1);
  };

  return (
    <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-muted to-white rounded-2xl overflow-hidden shadow-2xl">
      {/* Canvas 3D Simulado */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-green-100"></div>
        
        {/* Casa 3D Simulada */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
          style={{
            transform: `translate(-50%, -50%) rotateY(${rotation}deg) scale(${zoom})`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Base */}
          <div className="relative w-32 h-8 bg-amber-800 rounded-lg shadow-lg"></div>
          
          {/* Paredes */}
          <div className="absolute top-0 left-2 w-28 h-16 bg-stone-100 rounded-t-lg shadow-md"></div>
          
          {/* Techo */}
          <div className="absolute -top-4 left-1 w-30 h-8 bg-red-800 transform rotate-45 origin-bottom shadow-lg"></div>
          
          {/* Puerta */}
          <div className="absolute top-2 left-1/2 w-6 h-8 bg-amber-700 transform -translate-x-1/2 rounded-t-lg shadow-md"></div>
          
          {/* Ventanas */}
          <div className="absolute top-4 left-2 w-4 h-3 bg-blue-200 rounded shadow-sm"></div>
          <div className="absolute top-4 right-2 w-4 h-3 bg-blue-200 rounded shadow-sm"></div>
          
          {/* Jardín */}
          <div className="absolute top-8 left-1/2 w-16 h-4 bg-green-300 transform -translate-x-1/2 rounded-full shadow-md"></div>
          
          {/* Árbol */}
          <div className="absolute top-6 left-1/2 w-1 h-4 bg-amber-900 transform -translate-x-1/2"></div>
          <div className="absolute top-4 left-1/2 w-6 h-6 bg-green-500 transform -translate-x-1/2 rounded-full shadow-md"></div>
        </div>

        {/* Efectos de profundidad */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-yellow-200 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-yellow-100 rounded-full opacity-30 animate-pulse delay-2000"></div>
      </div>

      {/* Controles */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
        <h3 className="font-serif font-bold text-primary text-sm mb-2">Controles 3D</h3>
        <div className="space-y-1 text-xs text-secondary">
          <p>🖱️ Click + arrastrar: Rotar</p>
          <p>🔍 Scroll: Zoom</p>
          <p>🖱️ Click derecho: Pan</p>
        </div>
      </div>

      {/* Controles de reproducción */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border">
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            {isPlaying ? <Pause size={16} className="text-primary" /> : <Play size={16} className="text-primary" />}
          </button>
          <button
            onClick={resetView}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <RotateCcw size={16} className="text-primary" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <ZoomIn size={16} className="text-primary" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <ZoomOut size={16} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Información */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border max-w-sm">
        <h3 className="font-serif font-bold text-primary text-sm mb-2">Casa Tradicional Kusatsu</h3>
        <div className="space-y-1 text-xs text-secondary">
          <p>📍 Ubicación: Kusatsu, Gunma</p>
          <p>🏠 Área: 120 m²</p>
          <p>📅 Año: 1925</p>
          <p>💰 Precio: ¥8,500,000</p>
        </div>
      </div>

      {/* Botón de acción */}
      <div className="absolute bottom-4 right-4">
        <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors font-semibold text-sm shadow-lg">
          Ver Detalles
        </button>
      </div>

      {/* Indicador de rotación */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <div className="w-8 h-8 border-2 border-primary/30 rounded-full flex items-center justify-center">
          <div 
            className="w-2 h-2 bg-primary rounded-full"
            style={{ transform: `rotate(${rotation}deg)` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Fallback3DViewer;
