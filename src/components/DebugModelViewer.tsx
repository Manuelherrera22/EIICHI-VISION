'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { AlertCircle, CheckCircle, Loader2, Play, Pause, RotateCcw, Maximize, Minimize, Sun, Moon, Info, Share2, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ModelDebugger = () => {
  const [modelStatus, setModelStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [modelData, setModelData] = useState<any>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDayMode, setIsDayMode] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const testModel = async () => {
      try {
        console.log('🔍', t('debug.testingModelLoad'));
        
        // Probar acceso al archivo
        const response = await fetch('/models/custom/japanese-house.glb');
        console.log('📡', t('debug.serverResponse'), response.status, response.statusText);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const blob = await response.blob();
        console.log('📦', t('debug.fileSize'), blob.size, t('debug.bytes'));
        
        if (blob.size === 0) {
          throw new Error(t('debug.fileEmpty'));
        }
        
        setModelStatus('success');
        setModelData({ size: blob.size, type: blob.type });
        console.log('✅', t('debug.modelLoadedSuccessfully'));
        
      } catch (error) {
        console.error('❌', t('debug.errorLoadingModel'), error);
        setModelStatus('error');
        setErrorMessage(error instanceof Error ? error.message : t('debug.unknownError'));
      }
    };

    testModel();
  }, []);

  const ModelComponent = () => {
    const { scene } = useGLTF('/models/custom/japanese-house.glb');
    return <primitive object={scene} />;
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full">
      {/* Visualizador 3D Simplificado */}
      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        <Canvas camera={{ position: [5, 5, 5], fov: 50 }} shadows>
          <ambientLight intensity={isDayMode ? 0.6 : 0.2} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={isDayMode ? 1.2 : 0.3} 
            castShadow
            shadow-mapSize-width={4096}
            shadow-mapSize-height={4096}
          />
          <pointLight position={[-10, 0, -20]} intensity={isDayMode ? 0.8 : 0.2} />
          <pointLight position={[0, -10, 0]} intensity={isDayMode ? 0.5 : 0.1} />
          
          {modelStatus === 'success' ? (
            <Suspense fallback={
              <Html center>
                <div className="text-center text-blue-600">
                  <Loader2 size={48} className="mx-auto mb-4 animate-spin" />
                  <p className="text-lg font-medium">{t('debug.loading3DModel')}</p>
                </div>
              </Html>
            }>
              <ModelComponent />
            </Suspense>
          ) : (
            <Html center>
              <div className="text-center text-gray-500">
                <AlertCircle size={48} className="mx-auto mb-4" />
                <p className="text-lg">{t('debug.preparingViewer')}</p>
              </div>
            </Html>
          )}
          
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={2}
            maxDistance={15}
            autoRotate={isRotating}
            autoRotateSpeed={0.5}
            dampingFactor={0.05}
          />
          
          {/* Plano de suelo sutil */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[100, 100]} />
            <meshLambertMaterial color="#f8fafc" transparent opacity={0.3} />
          </mesh>
        </Canvas>
        
        {/* Controles interactivos */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 p-2 sm:p-3 bg-white/90 backdrop-blur-md rounded-lg sm:rounded-xl shadow-lg flex flex-col space-y-1 sm:space-y-2">
          <button 
            onClick={() => setIsRotating(!isRotating)} 
            className="p-1.5 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700"
            title={isRotating ? t('debug.pauseRotation') : t('debug.startRotation')}
          >
            {isRotating ? <Pause size={16} className="sm:w-5 sm:h-5" /> : <Play size={16} className="sm:w-5 sm:h-5" />}
          </button>
          <button 
            onClick={() => setIsDayMode(!isDayMode)} 
            className="p-1.5 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700"
            title={isDayMode ? t('debug.nightMode') : t('debug.dayMode')}
          >
            {isDayMode ? <Moon size={16} className="sm:w-5 sm:h-5" /> : <Sun size={16} className="sm:w-5 sm:h-5" />}
          </button>
          <button 
            onClick={toggleFullscreen} 
            className="p-1.5 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-700"
            title={isFullscreen ? t('debug.exitFullscreen') : t('debug.fullscreen')}
          >
            {isFullscreen ? <Minimize size={16} className="sm:w-5 sm:h-5" /> : <Maximize size={16} className="sm:w-5 sm:h-5" />}
          </button>
        </div>

        {/* Información del modelo */}
        <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6 bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg max-w-[calc(100%-1rem)] sm:max-w-none">
          <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
            <span className="text-xs font-mono bg-blue-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">3D</span>
            <span className="text-xs font-mono bg-green-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">GLB</span>
          </div>
          <h3 className="text-sm sm:text-lg font-serif font-bold text-gray-800 mb-0.5 sm:mb-1">{t('debug.traditionalJapaneseHouse')}</h3>
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{t('debug.interactiveExampleModel')}</p>
          
          {/* Acciones rápidas */}
          <div className="flex justify-end space-x-1 sm:space-x-2">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-1.5 sm:p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors text-blue-600"
              title={t('debug.modelInformation')}
            >
              <Info size={14} className="sm:w-4 sm:h-4" />
            </button>
            <button className="p-1.5 sm:p-2 rounded-full bg-green-500/20 hover:bg-green-500/30 transition-colors text-green-600" title={t('debug.share')}>
              <Share2 size={14} className="sm:w-4 sm:h-4" />
            </button>
            <button className="p-1.5 sm:p-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-colors text-red-600" title={t('debug.saveToFavorites')}>
              <Heart size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Panel de información expandible */}
        {showInfo && (
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-lg max-w-[calc(100%-1rem)] sm:max-w-sm">
            <h4 className="font-serif font-bold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">{t('debug.modelDetails')}</h4>
            <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
              <p><strong>{t('debug.location')}</strong> {t('debug.gunmaJapan')}</p>
              <p><strong>{t('debug.type')}</strong> {t('debug.traditionalJapaneseHouseType')}</p>
              <p><strong>{t('debug.material')}</strong> {t('debug.woodAndBamboo')}</p>
              <p><strong>{t('debug.status')}</strong> {t('debug.availableForRestoration')}</p>
              <p><strong>{t('debug.size')}</strong> {t('debug.area80m2')}</p>
            </div>
            <button 
              onClick={() => setShowInfo(false)}
              className="mt-2 sm:mt-3 text-xs text-blue-600 hover:text-blue-800"
            >
              {t('debug.closeInformation')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelDebugger;
