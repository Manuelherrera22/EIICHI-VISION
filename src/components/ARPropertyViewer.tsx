'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Settings, 
  Palette, 
  Home, 
  Lightbulb,
  Eye,
  EyeOff,
  Download,
  Share,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Wand2,
  Layers,
  Move,
  RotateCw
} from 'lucide-react';

interface ARViewerProps {
  property: {
    id: string;
    title: string;
    location: string;
    currentImages: string[];
    renderOptions: {
      id: string;
      name: string;
      description: string;
      image: string;
      features: string[];
    }[];
  };
  onClose: () => void;
}

interface ARState {
  currentView: 'current' | 'render';
  selectedRender: string | null;
  zoom: number;
  rotation: number;
  showOverlay: boolean;
  selectedRoom: string | null;
}

const ARPropertyViewer: React.FC<ARViewerProps> = ({ property, onClose }) => {
  const [arState, setArState] = useState<ARState>({
    currentView: 'current',
    selectedRender: null,
    zoom: 1,
    rotation: 0,
    showOverlay: true,
    selectedRoom: null
  });

  const [isARActive, setIsARActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rooms = [
    { id: 'living', name: 'Sala de Estar', icon: Home },
    { id: 'kitchen', name: 'Cocina', icon: Settings },
    { id: 'bedroom', name: 'Dormitorio', icon: Eye },
    { id: 'bathroom', name: 'Baño', icon: Lightbulb },
    { id: 'garden', name: 'Jardín', icon: Palette }
  ];

  const designOptions = [
    {
      id: 'minimalist',
      name: 'Minimalista',
      color: '#f8fafc',
      accent: '#64748b',
      description: 'Líneas limpias y espacios abiertos'
    },
    {
      id: 'wabi-sabi',
      name: 'Wabi-Sabi',
      color: '#fef3c7',
      accent: '#92400e',
      description: 'Belleza en la imperfección'
    },
    {
      id: 'traditional',
      name: 'Tradicional',
      color: '#fef2f2',
      accent: '#dc2626',
      description: 'Elementos clásicos auténticos'
    },
    {
      id: 'modern',
      name: 'Moderno',
      color: '#f0f9ff',
      accent: '#0284c7',
      description: 'Diseño contemporáneo'
    }
  ];

  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsARActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      // Fallback to simulated AR
      setIsARActive(true);
    }
  };

  const stopAR = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsARActive(false);
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        setCapturedImage(canvas.toDataURL());
      }
    }
  };

  const toggleView = () => {
    setArState(prev => ({
      ...prev,
      currentView: prev.currentView === 'current' ? 'render' : 'current'
    }));
  };

  const selectRender = (renderId: string) => {
    setArState(prev => ({
      ...prev,
      selectedRender: renderId,
      currentView: 'render'
    }));
  };

  const adjustZoom = (delta: number) => {
    setArState(prev => ({
      ...prev,
      zoom: Math.max(0.5, Math.min(3, prev.zoom + delta))
    }));
  };

  const adjustRotation = (delta: number) => {
    setArState(prev => ({
      ...prev,
      rotation: (prev.rotation + delta) % 360
    }));
  };

  const selectedRenderData = property.renderOptions.find(
    option => option.id === arState.selectedRender
  );

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h2 className="text-white font-semibold">{property.title}</h2>
              <p className="text-white/70 text-sm">{property.location}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleView}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                arState.currentView === 'current'
                  ? 'bg-white/20 text-white'
                  : 'bg-yellow-400 text-black'
              }`}
            >
              {arState.currentView === 'current' ? 'Vista Actual' : 'Vista Renderizada'}
            </button>
            
            <button
              onClick={isARActive ? stopAR : startAR}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isARActive
                  ? 'bg-red-500 text-white'
                  : 'bg-green-500 text-white'
              }`}
            >
              {isARActive ? 'Detener AR' : 'Iniciar AR'}
            </button>
          </div>
        </div>
      </div>

      {/* Main AR View */}
      <div className="relative w-full h-full">
        {/* Camera Feed */}
        {isARActive && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {/* AR Overlay */}
        <AnimatePresence>
          {arState.showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              {/* Room Selection Overlay */}
              {arState.currentView === 'current' && (
                <div className="absolute top-20 left-4 space-y-2">
                  {rooms.map((room) => (
                    <motion.button
                      key={room.id}
                      onClick={() => setArState(prev => ({ 
                        ...prev, 
                        selectedRoom: prev.selectedRoom === room.id ? null : room.id 
                      }))}
                      className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                        arState.selectedRoom === room.id
                          ? 'bg-yellow-400 text-black'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {room.icon && <room.icon className="w-5 h-5" />}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Render Options Overlay */}
              {arState.currentView === 'render' && selectedRenderData && (
                <div className="absolute top-20 right-4 bg-black/50 backdrop-blur-sm rounded-2xl p-4 max-w-sm">
                  <h3 className="text-white font-semibold mb-2">
                    {selectedRenderData.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-3">
                    {selectedRenderData.description}
                  </p>
                  <div className="space-y-2">
                    {selectedRenderData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Design Options */}
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2 bg-black/50 backdrop-blur-sm rounded-full p-2">
                  {designOptions.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => selectRender(option.id)}
                      className="p-3 rounded-full transition-all"
                      style={{ backgroundColor: option.color }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: option.accent }}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 right-4 space-y-2">
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => adjustZoom(0.1)}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <ZoomIn className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => adjustZoom(-0.1)}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <ZoomOut className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={() => adjustRotation(15)}
                    className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <RotateCw className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Transform Controls */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4">
                  <h4 className="text-white font-semibold mb-3">Transformar</h4>
                  <div className="space-y-2">
                    <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                      <Move className="w-4 h-4" />
                      <span className="text-sm">Mover</span>
                    </button>
                    <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                      <RotateCcw className="w-4 h-4" />
                      <span className="text-sm">Rotar</span>
                    </button>
                    <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                      <Layers className="w-4 h-4" />
                      <span className="text-sm">Escalar</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fallback Image when AR is not active */}
        {!isARActive && (
          <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <Camera className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 mb-4">
                Inicia la cámara para ver la realidad aumentada
              </p>
              <button
                onClick={startAR}
                className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
              >
                Iniciar AR
              </button>
            </div>
          </div>
        )}

        {/* Captured Image Modal */}
        <AnimatePresence>
          {capturedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 flex items-center justify-center z-20"
            >
              <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
                <h3 className="text-lg font-semibold mb-4">Imagen Capturada</h3>
                <img
                  src={capturedImage}
                  alt="Captured AR view"
                  className="w-full rounded-lg mb-4"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCapturedImage(null)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.download = 'ar-capture.jpg';
                      link.href = capturedImage;
                      link.click();
                    }}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setArState(prev => ({ ...prev, showOverlay: !prev.showOverlay }))}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              {arState.showOverlay ? <EyeOff className="w-5 h-5 text-white" /> : <Eye className="w-5 h-5 text-white" />}
            </button>
            
            <button
              onClick={captureImage}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-white/70 text-sm">
              Zoom: {Math.round(arState.zoom * 100)}%
            </span>
            <span className="text-white/70 text-sm">
              Rotación: {arState.rotation}°
            </span>
          </div>
        </div>
      </div>

      {/* Hidden Canvas for Image Capture */}
      <canvas
        ref={canvasRef}
        className="hidden"
      />
    </div>
  );
};

export default ARPropertyViewer;
