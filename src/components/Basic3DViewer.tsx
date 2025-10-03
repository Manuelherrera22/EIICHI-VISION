'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '@/contexts/LanguageContext';

// Componente básico de casa japonesa
const BasicHouse = () => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Base */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[4, 1, 3]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Paredes */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3.8, 2, 2.8]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>

      {/* Techo */}
      <mesh position={[0, 2.2, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3, 1.5, 4]} />
        <meshStandardMaterial color="#8B0000" />
      </mesh>

      {/* Puerta */}
      <mesh position={[0, 0.2, 1.41]}>
        <boxGeometry args={[0.8, 1.6, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>

      {/* Ventanas */}
      <mesh position={[-1, 0.5, 1.41]}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>
      <mesh position={[1, 0.5, 1.41]}>
        <boxGeometry args={[0.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
      </mesh>

      {/* Jardín */}
      <mesh position={[0, -0.4, -2]}>
        <cylinderGeometry args={[2, 2, 0.2, 8]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>

      {/* Árbol */}
      <mesh position={[0, 0.2, -1.5]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 1, -1.5]}>
        <sphereGeometry args={[0.8, 8, 6]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
};

const Basic3DViewer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-muted to-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-secondary font-medium">Cargando experiencia 3D...</p>
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-muted to-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-primary mb-2">Error al cargar 3D</h3>
            <p className="text-secondary">No se pudo cargar la experiencia 3D</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-96 lg:h-[600px] bg-gradient-to-br from-muted to-white rounded-2xl overflow-hidden shadow-2xl">
      <Canvas
        camera={{ position: [8, 5, 8], fov: 50 }}
        style={{ background: 'linear-gradient(135deg, #f7fafc 0%, #ffffff 100%)' }}
        onError={() => setHasError(true)}
      >
        {/* Iluminación */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Casa japonesa */}
        <BasicHouse />

        {/* Controles */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={15}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Controles de UI */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border">
        <h3 className="font-serif font-bold text-primary text-sm mb-2">Controles 3D</h3>
        <div className="space-y-1 text-xs text-secondary">
          <p>🖱️ Click + arrastrar: Rotar</p>
          <p>🔍 Scroll: Zoom</p>
          <p>🖱️ Click derecho: Pan</p>
        </div>
      </div>

      {/* Información */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-border max-w-sm">
        <h3 className="font-serif font-bold text-primary text-sm mb-2">Casa Tradicional Kusatsu</h3>
        <div className="space-y-1 text-xs text-secondary">
          <p>📍 {t('basic3d.location')}</p>
          <p>🏠 {t('basic3d.area')}</p>
          <p>📅 {t('basic3d.year')}</p>
          <p>💰 {t('basic3d.price')}</p>
        </div>
      </div>

      {/* Botón de acción */}
      <div className="absolute bottom-4 right-4">
        <button className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors font-semibold text-sm shadow-lg">
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default Basic3DViewer;
