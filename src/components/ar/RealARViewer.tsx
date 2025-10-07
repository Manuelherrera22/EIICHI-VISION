'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
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
  RotateCw,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

interface ARViewerProps {
  property: {
    id: string;
    title: string;
    images: string[];
    modelUrl?: string;
  };
  onClose: () => void;
}

const RealARViewer: React.FC<ARViewerProps> = ({ property, onClose }) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isARActive, setIsARActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [currentMode, setCurrentMode] = useState<'detection' | 'placement' | 'interaction'>('detection');
  const [isPlaced, setIsPlaced] = useState(false);
  const [modelScale, setModelScale] = useState(1);
  const [modelRotation, setModelRotation] = useState(0);

  // Verificar soporte de AR
  const checkARSupport = useCallback(async () => {
    try {
      // Verificar si el navegador soporta WebXR
      if (!navigator.xr) {
        throw new Error('WebXR not supported');
      }

      // Verificar si el dispositivo soporta AR
      const isSupported = await navigator.xr.isSessionSupported('immersive-ar');
      if (!isSupported) {
        throw new Error('AR not supported on this device');
      }

      return true;
    } catch (error) {
      console.error('AR support check failed:', error);
      return false;
    }
  }, []);

  // Inicializar cámara
  const initializeCamera = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Verificar permisos de cámara
      const permissionStatus = await navigator.permissions.query({ name: 'camera' as PermissionName });
      setPermissions(permissionStatus.state);

      if (permissionStatus.state === 'denied') {
        throw new Error('Camera permission denied');
      }

      // Obtener stream de la cámara
      const mediaStream = await navigator.getUserMedia({
        video: {
          facingMode: 'environment', // Cámara trasera
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Camera initialization failed:', error);
      setError(error instanceof Error ? error.message : 'Failed to initialize camera');
      setIsLoading(false);
    }
  }, []);

  // Inicializar AR
  const initializeAR = useCallback(async () => {
    if (!stream) return;

    try {
      const arSupported = await checkARSupport();
      if (!arSupported) {
        // Fallback a detección de superficie simple
        startSurfaceDetection();
        return;
      }

      // Implementar WebXR AR (requiere HTTPS y dispositivo compatible)
      const session = await navigator.xr!.requestSession('immersive-ar', {
        requiredFeatures: ['local'],
        optionalFeatures: ['hit-test', 'dom-overlay'],
      });

      // Configurar renderizado AR
      setupARRendering(session);
      setIsARActive(true);
    } catch (error) {
      console.error('AR initialization failed:', error);
      // Fallback a detección simple
      startSurfaceDetection();
    }
  }, [stream, checkARSupport]);

  // Detección de superficie simple (fallback)
  const startSurfaceDetection = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Simular detección de superficie con análisis de imagen
    const detectSurface = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      ctx.drawImage(video, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
      // Análisis simple de bordes para detectar superficies
      const edges = detectEdges(imageData);
      
      // Dibujar indicadores de superficie
      drawSurfaceIndicators(ctx, edges);
      
      if (currentMode === 'detection') {
        requestAnimationFrame(detectSurface);
      }
    };

    video.addEventListener('loadedmetadata', detectSurface);
  }, [currentMode]);

  // Detectar bordes en la imagen
  const detectEdges = (imageData: ImageData): number[][] => {
    const { data, width, height } = imageData;
    const edges: number[][] = [];

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        
        // Calcular gradiente
        const gx = Math.abs(
          data[idx + 4] - data[idx - 4] + // R
          2 * (data[idx + width * 4] - data[idx - width * 4]) + // G
          data[idx + (width + 1) * 4] - data[idx - (width + 1) * 4] // B
        );

        if (gx > 50) { // Umbral de detección
          edges.push([x, y]);
        }
      }
    }

    return edges;
  };

  // Dibujar indicadores de superficie
  const drawSurfaceIndicators = (ctx: CanvasRenderingContext2D, edges: number[][]) => {
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;

    // Dibujar puntos de superficie detectados
    edges.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.stroke();
    });

    // Dibujar área de colocación sugerida
    if (edges.length > 100) {
      ctx.strokeStyle = '#ff0000';
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(canvasRef.current!.width / 2 - 100, canvasRef.current!.height / 2 - 100, 200, 200);
      ctx.setLineDash([]);
    }
  };

  // Configurar renderizado AR (WebXR)
  const setupARRendering = (session: XRSession) => {
    // Implementar renderizado AR con WebXR
    // Esto requiere una implementación más compleja con WebGL
    console.log('Setting up AR rendering with WebXR session:', session);
  };

  // Colocar modelo 3D
  const placeModel = useCallback((x: number, y: number) => {
    setIsPlaced(true);
    setCurrentMode('interaction');
  }, []);

  // Interactuar con el modelo
  const interactWithModel = useCallback((action: 'rotate' | 'scale' | 'move') => {
    switch (action) {
      case 'rotate':
        setModelRotation(prev => prev + 45);
        break;
      case 'scale':
        setModelScale(prev => Math.min(prev + 0.1, 3));
        break;
      case 'move':
        // Implementar movimiento del modelo
        break;
    }
  }, []);

  // Limpiar recursos
  const cleanup = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsARActive(false);
  }, [stream]);

  useEffect(() => {
    initializeCamera();

    return () => {
      cleanup();
    };
  }, [initializeCamera, cleanup]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (currentMode === 'detection') {
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      placeModel(x, y);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onClose}
            className="flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            {t('ar.back')}
          </button>
          
          <h2 className="text-white font-semibold text-lg">{property.title}</h2>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-white hover:text-gray-300 transition-colors">
              <Share className="w-5 h-5" />
            </button>
            <button className="p-2 text-white hover:text-gray-300 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative w-full h-full">
        {/* Video de la cámara */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
        />

        {/* Canvas para overlay AR */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-auto"
          onClick={handleCanvasClick}
        />

        {/* Indicadores de estado */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50"
            >
              <div className="text-center text-white">
                <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4" />
                <p>{t('ar.initializing')}</p>
              </div>
            </motion.div>
          )}

          {permissions === 'denied' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Info className="w-5 h-5 mr-2" />
              {t('ar.permissionRequired')}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instrucciones */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center text-white">
          <AnimatePresence>
            {currentMode === 'detection' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2"
              >
                <p className="text-sm">{t('ar.instructions.detectSurface')}</p>
              </motion.div>
            )}

            {currentMode === 'placement' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2"
              >
                <p className="text-sm">{t('ar.instructions.placeModel')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controles */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
            {currentMode === 'detection' && (
              <button
                onClick={() => initializeAR()}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                {t('ar.startAR')}
              </button>
            )}

            {currentMode === 'interaction' && (
              <>
                <button
                  onClick={() => interactWithModel('rotate')}
                  className="p-2 text-white hover:text-gray-300 transition-colors"
                >
                  <RotateCw className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => interactWithModel('scale')}
                  className="p-2 text-white hover:text-gray-300 transition-colors"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setCurrentMode('detection')}
                  className="p-2 text-white hover:text-gray-300 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealARViewer;

